const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN ||
  (typeof window !== "undefined"
    ? `http://${window.location.hostname}:4000`
    : "http://127.0.0.1:4000");

const getBackendStatus = async () => {
  let response;

  try {
    response = await fetch(`${API_ORIGIN}/api/health`);
  } catch {
    throw new Error("Backend is offline");
  }

  if (!response.ok) {
    throw new Error("Backend is offline");
  }

  return response.json();
};

export const siteService = {
  getBackendStatus,
};
