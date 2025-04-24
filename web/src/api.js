// web/src/api.js
import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// attach JWT if present
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
// This code creates an Axios instance with a base URL of '/api' for making HTTP requests. It also sets up an interceptor to attach a JWT token from local storage to the Authorization header of every request, if the token is present. This allows for authenticated requests to be made easily throughout the application.