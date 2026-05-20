import React from 'react';
import { getAdminProfile } from '../utils/adminAuth';
import AdminLayout from '../components/AdminLayout';
import useAdminData from '../hooks/useAdminData';

function AdminServicesManage() {
  const {
    dashboard,
    allLeads,
    services,
    blogs,
    refreshing,
    error,
    refreshData,
    logout
  } = useAdminData();

  return (
    <AdminLayout
      admin={dashboard.admin || getAdminProfile()}
      title="Services Manage"
      subtitle="Manage website services from one page and review which services are attracting enquiries."
      badges={[
        `Signed in as ${dashboard.admin?.email || 'Admin'}`,
        `Active Services ${services.length}`
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
      <div className="admin-dash-layout admin-dash-layout--single">
        <article className="admin-dash-panel">
          <div className="admin-dash-panel__head">
            <div>
              <h3>Services List</h3>
              <p>Current service offerings visible on the website.</p>
            </div>
          </div>
          <div className="admin-dash-stack">
            {services.map((service) => (
              <div key={service} className="admin-dash-manage-card">
                <div>
                  <strong>{service}</strong>
                  <p>Service item ready for next-stage CRUD connection.</p>
                </div>
                <span className="admin-dash-chip">Active</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </AdminLayout>
  );
}

export default AdminServicesManage;
