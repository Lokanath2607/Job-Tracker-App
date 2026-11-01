import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // make sure this matches your backend route prefix
});

// Automatically add JWT token to request headers if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // or whatever key name you stored your token under
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;