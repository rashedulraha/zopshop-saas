import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 15000,
});

// Request Interceptor: Attach bearer token and store ID to outgoing requests if available
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("accessToken") || localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Support multi-tenancy: attach active store ID if available
      const storeId = localStorage.getItem("activeStoreId");
      if (storeId) {
        config.headers["x-store-id"] = storeId;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle global errors (e.g., redirect to login on 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;

        // Prevent infinite redirect loops if the user is already on auth pages
        const isAuthPage = ["/login", "/register", "/forgot-password"].some(
          (path) => currentPath.startsWith(path),
        );

        if (!isAuthPage) {
          // Clear local tokens
          localStorage.removeItem("accessToken");
          localStorage.removeItem("token");

          // Redirect user to login with redirect parameter
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
      }
    }
    return Promise.reject(error);
  },
);
