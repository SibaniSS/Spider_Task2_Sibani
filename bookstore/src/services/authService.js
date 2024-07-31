import axios from 'axios';

export const login = async (email, password) => {
  const response = await axios.post('/api/login', { email, password });
  return response.data;
};

export const signup = async (email, password) => {
  const response = await axios.post('/api/signup', { email, password });
  return response.data;
};