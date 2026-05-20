import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import {
  clearAdminSession,
  setAdminProfile
} from '../utils/adminAuth';
import { apiFetch, parseApiResponse } from '../utils/api';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let ignore = false;

    async function validateSession() {
      try {
        const response = await apiFetch('/api/admin/session');
        const data = await parseApiResponse(response);

        if (!ignore) {
          setAdminProfile(data.admin);
          setStatus('authorized');
        }
      } catch {
        clearAdminSession();
        if (!ignore) setStatus('unauthorized');
      }
    }

    validateSession();

    return () => {
      ignore = true;
    };
  }, [location.pathname]);

  if (status === 'checking') {
    return (
      <section className="admin-auth-page" aria-live="polite">
        <div className="admin-auth-card admin-auth-card--compact sr-reveal">
          <p className="admin-auth-kicker">WebEntra Admin</p>
          <h1 className="admin-auth-title">Checking Session</h1>
          <p className="admin-auth-text">
            Verifying your dashboard access with the FastAPI backend.
          </p>
        </div>
      </section>
    );
  }

  if (status !== 'authorized') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default ProtectedRoute;
