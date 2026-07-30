import axios from "axios";

const api = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const skipUrls = [
      "/auth/login",
      "/auth/register",
      "/auth/refresh-token",
    ];

    const shouldSkip = skipUrls.some((url) =>
      originalRequest?.url?.includes(url)
    );

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkip
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token");

        return api(originalRequest);
      } catch (refreshError) {
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;