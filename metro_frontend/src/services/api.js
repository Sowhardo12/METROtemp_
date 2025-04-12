
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Your Django API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if available
// (Alternatively, handle this in AuthContext as shown above)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


export default api;