import React from 'react';
import { FaBlog, FaClipboardList, FaEnvelopeOpenText, FaUsers } from 'react-icons/fa';
import { getAdminProfile } from '../utils/adminAuth';
import AdminLayout from '../components/AdminLayout';
import useAdminData from '../hooks/useAdminData';

const iconByKey = {
  total_leads: <FaUsers aria-hidden="true" />,
  new_messages: <FaEnvelopeOpenText aria-hidden="true" />,
  active_services: <FaClipboardList aria-hidden="true" />,
  published_blogs: <FaBlog aria-hidden="true" />
};

function AdminDashboard() {
  const {
    dashboard,
    allLeads,
    services,
    blogs,
    refreshing,
    loading,
    error,
    refreshData,
    logout
  } = useAdminData();

  return (
    <AdminLayout
      admin={dashboard.admin || getAdminProfile()}
      title="Admin Dashboard"
      subtitle="Use the admin navigation to move between overview, lead inbox, services manage, and blog manage pages."
      badges={[
        `Signed in as ${dashboard.admin?.email || 'Admin'}`,
        `Total Leads ${allLeads.length}`
      ]}
      metaBadges={[
        `Total Leads ${allLeads.length}`,
        `Services ${services.length}`,
        `Blogs ${blogs.length}`
      ]}
      refreshing={refreshing}
      onRefresh={refreshData}
      onLogout={logout}
      error={error}
    >
      <div className="admin-dash-grid" aria-label="Admin summary cards">
        {(loading ? [] : dashboard.summary).map((item) => (
          <article key={item.title} className="admin-dash-card">
            <span className="admin-dash-card-icon">{iconByKey[item.key] || <FaUsers aria-hidden="true" />}</span>
            <p className="admin-dash-card-title">{item.title}</p>
            <h2 className="admin-dash-card-value">{item.value}</h2>
            <p className="admin-dash-card-meta">Live data from your backend workspace</p>
          </article>
        ))}

        <article className="admin-dash-card admin-dash-card--soft">
          <span className="admin-dash-card-icon"><FaEnvelopeOpenText aria-hidden="true" /></span>
          <p className="admin-dash-card-title">Lead Inbox Ready</p>
          <h2 className="admin-dash-card-value">{allLeads.length}</h2>
          <p className="admin-dash-card-meta">All enquiries are available on the dedicated leads page</p>
        </article>

        <article className="admin-dash-card admin-dash-card--soft">
          <span className="admin-dash-card-icon"><FaClipboardList aria-hidden="true" /></span>
          <p className="admin-dash-card-title">Services Manage</p>
          <h2 className="admin-dash-card-value">{services.length}</h2>
          <p className="admin-dash-card-meta">Manage website services from the services page</p>
        </article>

        <article className="admin-dash-card admin-dash-card--soft">
          <span className="admin-dash-card-icon"><FaBlog aria-hidden="true" /></span>
          <p className="admin-dash-card-title">Blog Manage</p>
          <h2 className="admin-dash-card-value">{blogs.length}</h2>
          <p className="admin-dash-card-meta">Published blog items are listed on the blogs page</p>
        </article>

        {loading ? (
          <article className="admin-dash-card admin-dash-card--full">
            <p className="admin-dash-card-title">Loading dashboard data...</p>
          </article>
        ) : null}
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
