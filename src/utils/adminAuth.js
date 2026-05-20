let adminProfileCache = null;

export function getAdminProfile() {
  return adminProfileCache;
}

export function setAdminProfile(admin) {
  adminProfileCache = admin;
}

export function clearAdminSession() {
  adminProfileCache = null;
}
