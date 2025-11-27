import axios from "axios";

const api = axios.create({
  baseURL: "https://masmap.vercel.app/api",   // ✔ Correct API URL
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    if (config.skipAuth) return config;

    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
