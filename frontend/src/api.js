import axios from 'axios';

const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";


const API = axios.create({ 
  // ADD THE /api SUFFIX HERE
  baseURL: isLocalhost 
    ? 'http://localhost:5001/api' 
    : 'https://peerforge.onrender.com/api' 
});


API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;