function resolveApiBaseUrl() {
  const configuredUrl = process.env.REACT_APP_API_BASE_URL;
  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
    const { hostname, protocol, origin } = window.location;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return `${protocol}//${hostname}:8000`;
    }
    if (hostname === 'webevora.com') {
      return 'https://api.webevora.com';
    }
    return origin.replace(/\/$/, '');
  }

  return 'http://localhost:8000';
}

const API_BASE_URL = resolveApiBaseUrl();

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}

export async function apiFetch(path, options = {}) {
  const requestUrl = apiUrl(path);

  try {
    return await fetch(requestUrl, {
      credentials: 'include',
      ...options
    });
  } catch {
    const error = new Error(
      `Unable to reach the backend API at ${requestUrl}. Start the FastAPI server or set REACT_APP_API_BASE_URL correctly.`
    );
    error.status = 0;
    throw error;
  }
}

export async function parseApiResponse(response) {
  const text = await response.text();
  let data = {};

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = {};
    }
  }

  if (!response.ok) {
    const apiMessage = data.detail || data.message;
    const fallbackMessage =
      response.status === 405
        ? 'Backend API route not available. Confirm your FastAPI backend is deployed and REACT_APP_API_BASE_URL is set correctly.'
        : `API request failed with status ${response.status} ${response.statusText}.`;

    const error = new Error(apiMessage || fallbackMessage);
    error.status = response.status;
    throw error;
  }

  return data;
}
