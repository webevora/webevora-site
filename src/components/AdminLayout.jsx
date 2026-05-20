import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBlog,
  FaClipboardList,
  FaEnvelopeOpenText,
  FaHome,
  FaSyncAlt
} from 'react-icons/fa';

const navItems = [
  { to: '/admin/dashboard', label: 'Overview', icon: <FaHome aria-hidden="true" /> },
  { to: '/admin/leads', label: 'Lead Inbox', icon: <FaEnvelopeOpenText aria-hidden="true" /> },
  { to: '/admin/services', label: 'Services Manage', icon: <FaClipboardList aria-hidden="true" /> },
  { to: '/admin/blogs', label: 'Blog Manage', icon: <FaBlog aria-hidden="true" /> }
];

function AdminLayout({
  admin,
  title,
  subtitle,
  badges = [],
  metaBadges = [],
  refreshing,
  onRefresh,
  onLogout,
  error,
  children
}) {
  return (
    <section className="admin-dash-page sr-reveal">
      <div className="admin-dash-shell sr-reveal">
        <aside className="admin-dash-sidebar sr-reveal">
          <div className="admin-dash-sidebar__brand">
            <p className="admin-dash-kicker">WebEntra Admin</p>
            <h2>Control Center</h2>
            <span>{admin?.email || 'Admin account'}</span>
          </div>

          <nav className="admin-dash-sidebar__nav" aria-label="Admin pages">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (
                  `admin-dash-sidebar__link${isActive ? ' admin-dash-sidebar__link--active' : ''}`
                )}
              >
                <span className="admin-dash-sidebar__icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="admin-dash-sidebar__meta">
            {metaBadges.map((badge) => (
              <span key={badge} className="admin-dash-badge">{badge}</span>
            ))}
          </div>
        </aside>

        <div className="admin-dash-content">
          <header className="admin-dash-hero sr-reveal">
            <div className="admin-dash-hero__copy">
              <p className="admin-dash-kicker">WebEntra Admin Panel</p>
              <h1 className="admin-dash-title">{title}</h1>
              <p className="admin-dash-subtitle">{subtitle}</p>
              <div className="admin-dash-badges">
                {badges.map((badge) => (
                  <span key={badge} className="admin-dash-badge">{badge}</span>
                ))}
              </div>
            </div>

            <div className="admin-dash-hero__actions">
              <button
                type="button"
                className="admin-dash-action admin-dash-action--primary"
                onClick={onRefresh}
                disabled={refreshing}
              >
                <FaSyncAlt aria-hidden="true" />
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
              <button type="button" className="admin-dash-logout" onClick={onLogout}>Logout</button>
            </div>
          </header>

          {error ? <p className="admin-auth-error">{error}</p> : null}

          {children}
        </div>
      </div>
    </section>
  );
}

export default AdminLayout;
