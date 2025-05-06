import axios from "axios";

const AxiosInstance = axios.create({
  // Fix the baseURL logic to properly handle environment variables
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/api`
    : "http://localhost:8000/api",
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

// Add a response interceptor for better error handling
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log the error for debugging
    console.error("API Error:", error);

    if (error.response) {
      // The server responded with a status code outside the 2xx range
      console.error("Error response:", error.response.data);
      console.error("Error status:", error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Request error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
