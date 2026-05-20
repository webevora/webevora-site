import React, { useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { getAdminProfile } from '../utils/adminAuth';
import AdminLayout from '../components/AdminLayout';
import useAdminData from '../hooks/useAdminData';

function formatDate(value) {
  if (!value) {
    return 'No date';
  }

  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function AdminLeads() {
  const {
    dashboard,
    allLeads,
    services,
    blogs,
    serviceOptions,
    refreshing,
    error,
    refreshData,
    logout
  } = useAdminData();
  const [search, setSearch] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();

    return allLeads.filter((lead) => {
      const serviceMatches = serviceFilter === 'all' || lead.service === serviceFilter;
      if (!serviceMatches) {
        return false;
      }

      if (!query) {
        return true;
      }

      return [
        lead.name,
        lead.email,
        lead.phone,
        lead.service,
        lead.message
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [allLeads, search, serviceFilter]);

  return (
    <AdminLayout
      admin={dashboard.admin || getAdminProfile()}
      title="Lead Inbox"
      subtitle="Review and search all enquiries collected from the website contact form."
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
      <div className="admin-dash-layout admin-dash-layout--single">
        <article className="admin-dash-panel admin-dash-panel--wide">
          <div className="admin-dash-panel__head">
            <div>
              <h3>Lead Inbox</h3>
              <p>Search enquiries by name, email, phone, service or message.</p>
            </div>
            <div className="admin-dash-toolbar">
              <label className="admin-dash-search">
                <FaSearch aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, email, phone or message"
                />
              </label>

              <select
                className="admin-dash-filter"
                value={serviceFilter}
                onChange={(event) => setServiceFilter(event.target.value)}
              >
                <option value="all">All Services</option>
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredLeads.length ? (
            <div className="admin-dash-table-wrap">
              <table className="admin-dash-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Service</th>
                    <th>Message</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.name}</strong>
                      </td>
                      <td>
                        <span>{lead.email || 'No email'}</span>
                        <span>{lead.phone || 'No phone'}</span>
                      </td>
                      <td>
                        <span className="admin-dash-chip">{lead.service || 'General enquiry'}</span>
                      </td>
                      <td className="admin-dash-message">{lead.message}</td>
                      <td>{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-dash-empty">
              <h4>No leads found</h4>
              <p>
                {allLeads.length
                  ? 'Try changing the search keyword or selected service filter.'
                  : 'New contact form submissions will appear here automatically.'}
              </p>
            </div>
          )}
        </article>
      </div>
    </AdminLayout>
  );
}

export default AdminLeads;
