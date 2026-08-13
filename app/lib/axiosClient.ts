import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const publicApi = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (config.headers) {
      const isPublicEndPoit = config.url?.includes("/auth");
      if (token && !isPublicEndPoit) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers["X-App-Version"] = "1.0.0";
    }
    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    if (
      error.response?.status === 401 &&
      !originalReq._retry &&
      !originalReq.url?.includes("/auth/refresh-token")
    ) {
      // isRefreshing == true
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            originalReq.headers.Authorization = `Bearer ${newToken}`;
            return api(originalReq);
          })
          .catch((error) => Promise.reject(error));
      }
      // isRefreshing == false
      originalReq._retry = true;
      isRefreshing = true;
      try {
        const response = await publicApi.post("/refresh-token");
        const { user, accessToken } = response.data;
        useAuthStore.getState().setAuth(user, accessToken);
        originalReq.headers.Authorization = `Bearer ${accessToken}`;
        processQueue(null, accessToken);
        return api(originalReq);
      } catch (error) {
        processQueue(error, null);
        useAuthStore.getState().clearAuth();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);
