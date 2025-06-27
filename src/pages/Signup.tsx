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
  const isConfirmValid = values.confirmPassword === values.password && values.confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConfirmValid) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await new Promise(res => setTimeout(res, 1000));
    } catch {
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container">
      <h1 className="auth-title">Sign Up</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            aria-invalid={touched.email && !isEmailValid}
            aria-errormessage="email-error"
          />
          {touched.email && !isEmailValid && (
            <div id="email-error" className="auth-error" role="alert">
              Please enter a valid email.
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
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
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {touched.password && !isPasswordValid && (
            <div id="password-error" className="auth-error" role="alert">
              Password must be at least 8 characters.
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-wrapper">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
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
              onClick={() => setShowConfirmPassword(prev => !prev)}
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {touched.confirmPassword && !isConfirmValid && (
            <div id="confirm-error" className="auth-error" role="alert">
              Passwords do not match.
            </div>
          )}
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" required /> I agree to the Terms and Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !isEmailValid || !isPasswordValid || !isConfirmValid}
          className="auth-button"
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>

        {error && <div className="auth-error" role="alert">{error}</div>}
      </form>
    </main>
  );
}
