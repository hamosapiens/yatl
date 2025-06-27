import { useState } from 'react';
import { useForm } from '../hooks/useForm';
import '../styles/auth.css';

export default function Signup() {
  const { values, touched, handleChange, handleBlur } = useForm({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEmailValid = values.email.includes('@') && values.email.length > 5;
  const isPasswordValid = values.password.length >= 8;
  const isConfirmValid =
    values.confirmPassword === values.password && values.confirmPassword.length > 0;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!isConfirmValid) {
    setError('Passwords do not match.');
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.message || 'Failed to sign up. Please try again.');
      return;
    }

    const data = await res.json();
    localStorage.setItem('token', data.token);
    console.log('Signed up as:', values.email);
    // Optionally redirect
    // window.location.href = '/dashboard';
  } catch {
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="auth-container">
      <h1 className="auth-title">Sign Up</h1>
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
              autoComplete="new-password"
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
              onClick={() => setShowPassword((prev) => !prev)}
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

        {/* Confirm Password Field */}
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-wrapper">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className="input password-field"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              aria-invalid={touched.confirmPassword && !isConfirmValid}
              aria-errormessage="confirm-error"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {touched.confirmPassword && !isConfirmValid && (
            <div id="confirm-error" className="form-error" role="alert">
              Passwords do not match.
            </div>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="form-group">
          <label className="checkbox-label">
            <input type="checkbox" required /> I agree to the Terms and Privacy Policy
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isEmailValid || !isPasswordValid || !isConfirmValid}
          className="auth-button"
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>

        {/* Global Error */}
        {error && (
          <div className="form-error form-error-global" role="alert">
            {error}
          </div>
        )}
      </form>
    </main>
  );
}
