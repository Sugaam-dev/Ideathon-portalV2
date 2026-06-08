// import axios from 'axios';

// export const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
//   withCredentials: true,
//   // REMOVED: 'Content-Type': 'application/json' 
//   // Axios will automatically set the correct header for JSON requests, 
//   // and FormData requests will correctly override this.
// });

// // Interceptor to catch custom exceptions from your backend cleanly
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // If the error response exists, use the 'detail' field, otherwise fallback
//     const errorMessage = error.response?.data?.detail || 'An unexpected connection error occurred.';
//     return Promise.reject(errorMessage);
//   }
// );



import axios from 'axios';
import toast from 'react-hot-toast';

// https://ideathon.sugaam.in    http://localhost:8000
export const apiClient = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://ideathon.sugaam.in',
  withCredentials: true, // Crucial for sending and receiving HttpOnly cookies
});

// Response interceptor to handle token refresh and profile redirects automatically
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. Force Redirect to /account if profile is incomplete (403 ProfileIncompleteError)
    if (
      error.response?.status === 403 && 
      error.response?.data?.error === 'ProfileIncompleteError'
    ) {
      toast.error('Profile incomplete! Please enter your details to continue.');
      window.location.href = '/account';
      return Promise.reject(error);
    }

    // 2. Refresh Token on 401 Unauthorized
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== '/api/auth/refresh' &&
      originalRequest.url !== '/api/auth/login'
    ) {
      originalRequest._retry = true;

      try {
        // Attempt silent access/refresh token rotation
        await apiClient.post('/api/auth/refresh');
        
        // Retry the original request with the new rotated cookies
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token expired or invalid, session expired
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);