import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api` ||
    "http://localhost:8000/api",
  timeout: 500000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor to include the auth token in requests
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
