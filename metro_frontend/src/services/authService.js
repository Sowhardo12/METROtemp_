
import api from './api';

const register = (userData) => {
  return api.post('/users/register/', userData); // {name, email, phone_number, nid, password, password2}
};

const login = (credentials) => {
  return api.post('/users/login/', credentials); // {email, password}
};

const logout = () => {
   
    return api.post('/users/logout/');
};

const getCurrentUser = () => {
  return api.get('/users/me/');
};

const authService = {
  register,
  login,
  logout, // Keep if useful
  getCurrentUser,
};

export default authService;