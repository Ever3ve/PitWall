import axios from 'axios';

const API_URL = 'http://localhost:3001/auth';

export const register = async (data: { username: string; email: string; password: string }) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = async (data: { username: string; password: string }) => {
  return axios.post(`${API_URL}/login`, data);
};
