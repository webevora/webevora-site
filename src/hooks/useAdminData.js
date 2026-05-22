import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAdminSession, setAdminProfile } from '../utils/adminAuth';
import { apiFetch, parseApiResponse } from '../utils/api';

function useAdminData() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState({
    admin: null,
    summary: [],
    recent_leads: []
  });
  const [allLeads, setAllLeads] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const handleUnauthorized = useCallback(() => {
    clearAdminSession();
    navigate('/admin/login', { replace: true, state: { from: '/admin/dashboard' } });
  }, [navigate]);

  const loadAdminData = useCallback(async (silent = false) => {
    if (silent) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError('');

    try {
      const [
        dashboardResponse,
        leadsResponse,
        servicesResponse,
        blogsResponse
      ] = await Promise.all([
        apiFetch('/api/admin/dashboard'),
        apiFetch('/api/leads'),
        apiFetch('/api/services'),
        apiFetch('/api/blogs')
      ]);

      const [
        dashboardData,
        leadsData,
        servicesData,
        blogsData
      ] = await Promise.all([
        parseApiResponse(dashboardResponse),
        parseApiResponse(leadsResponse),
        parseApiResponse(servicesResponse),
        parseApiResponse(blogsResponse)
      ]);

      setDashboard({
        admin: dashboardData?.admin || null,
        summary: dashboardData?.summary || [],
        recent_leads: dashboardData?.recent_leads || []
      });
      setAllLeads(leadsData || []);
      setServices(servicesData || []);
      setBlogs(blogsData || []);

      if (dashboardData.admin) {
        setAdminProfile(dashboardData.admin);
      }
    } catch (requestError) {
      if (requestError.status === 401) {
        handleUnauthorized();
        return;
      }

      setError(requestError.message || 'Unable to load dashboard data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [handleUnauthorized]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const serviceOptions = useMemo(() => {
    const values = Array.from(
      new Set(allLeads.map((lead) => lead.service).filter(Boolean))
    );
    return values.sort((left, right) => left.localeCompare(right));
  }, [allLeads]);

  const logout = useCallback(async () => {
    try {
      await apiFetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Clear local state even if the backend session already expired.
    }

    clearAdminSession();
    navigate('/admin/login', { replace: true });
  }, [navigate]);

  return {
    dashboard,
    allLeads,
    services,
    blogs,
    serviceOptions,
    loading,
    refreshing,
    error,
    refreshData: () => loadAdminData(true),
    logout
  };
}

export default useAdminData;
