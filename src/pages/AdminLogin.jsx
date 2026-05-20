import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiFetch, parseApiResponse } from '../utils/api';
import { clearAdminSession, setAdminProfile } from '../utils/adminAuth';

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || '/admin/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await apiFetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: form.email.trim().toLowerCase(),
          password: form.password
        })
      });
      const data = await parseApiResponse(response);
      setAdminProfile(data.admin);
      navigate(redirectTo, { replace: true });
    } catch (requestError) {
      clearAdminSession();
      setError(requestError.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="admin-auth-page" aria-labelledby="admin-login-title">
      <div className="admin-auth-card sr-reveal">
        <p className="admin-auth-kicker">WebEntra Admin</p>
        <h1 id="admin-login-title" className="admin-auth-title">Admin Login</h1>
        <p className="admin-auth-text">
          Use your admin credentials to access dashboard analytics and content controls.
        </p>

        <form className="admin-auth-form" onSubmit={handleSubmit}>
          <label className="admin-auth-field">
            <span>Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@webentra.com"
              autoComplete="username"
              required
            />
          </label>

          <label className="admin-auth-field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="admin-auth-error">{error}</p> : null}

          <button type="submit" className="admin-auth-btn" disabled={submitting}>
            {submitting ? 'Signing In...' : 'Login to Dashboard'}
          </button>
        </form>

        <p className="admin-auth-note">
          This login now uses the FastAPI backend.
          Session cookies are managed by the backend server.
        </p>
        <Link to="/" className="admin-auth-back">Back to Website</Link>
      </div>
    </section>
  );
}

export default AdminLogin;
