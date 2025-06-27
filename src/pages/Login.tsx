import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import '../styles/auth.css';

export default function Login() {
  const { values, touched, handleChange, handleBlur } = useForm({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = values.email.includes('@') && values.email.length > 5;
  const isPasswordValid = values.password.length >= 8;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || 'Failed to login. Please try again.');
      return;
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    console.log('Logged in as:', values.email);
  } catch {
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="auth-container">
      <h1 className="auth-title">Log In</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="input"
            autoComplete="username"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-invalid={touched.email && !isEmailValid}
            aria-errormessage="email-error"
          />
          {touched.email && !isEmailValid && (
            <div id="email-error" className="form-error" role="alert">
              Please enter a valid email.
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              className="input password-field"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-invalid={touched.password && !isPasswordValid}
              aria-errormessage="password-error"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {touched.password && !isPasswordValid && (
            <div id="password-error" className="form-error" role="alert">
              Password must be at least 8 characters.
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isEmailValid || !isPasswordValid}
          className="auth-button"
        >
          {loading ? 'Logging in…' : 'Log In'}
        </button>

        {/* Global Error */}
        {error && <div className="form-error form-error-global" role="alert">{error}</div>}
      </form>
    </main>
  );
}
