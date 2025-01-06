import axios from 'axios';

const axios_client = axios.create({
  baseURL: 'http://localhost:8762/',
  headers: { 'Content-type': 'application/json' },
});


axios_client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default axios_client;
