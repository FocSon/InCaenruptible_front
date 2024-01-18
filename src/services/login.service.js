import axios from 'axios';
import { API_URL } from './path';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const returnConfig = config;
  if (token) {
    returnConfig.headers.Authorization = `Bearer ${token}`;
  }
  return returnConfig;
});

const login = async (username, password) => axios.post(`${API_URL}login`, {
  username,
  password,
}).then((res) => {
  if (res.data.token) {
    localStorage.setItem('token', res.data.token);
    window.location.reload();
    return null;
  }
  return res.data.errorMessage ?? 'Unknown error';
}).catch((err) => err.response.data.errorMessage);

const isLoggedIn = !!localStorage.getItem('token');

const logout = () => {
  localStorage.removeItem('token');
  window.location.reload();
};

export default {
    login,
    isLoggedIn,
    logout,
};
