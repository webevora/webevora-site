import React from 'react';
import { getAdminProfile } from '../utils/adminAuth';
import AdminLayout from '../components/AdminLayout';
import useAdminData from '../hooks/useAdminData';

function AdminBlogsManage() {
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
      title="Blog Manage"
      subtitle="View published blog titles and prepare this page for add, edit, or publish workflows."
      badges={[
        `Signed in as ${dashboard.admin?.email || 'Admin'}`,
        `Published Blogs ${blogs.length}`
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
              <h3>Blog List</h3>
              <p>Published blog titles currently coming from your backend content source.</p>
            </div>
          </div>
          <div className="admin-dash-stack">
            {blogs.map((blog) => (
              <div key={blog} className="admin-dash-manage-card">
                <div>
                  <strong>{blog}</strong>
                  <p>Blog record available for next-stage edit and publish flow.</p>
                </div>
                <span className="admin-dash-chip">Published</span>
              </div>
            ))}
          </div>
        </article>
      </div>
    </AdminLayout>
  );
}

export default AdminBlogsManage;
