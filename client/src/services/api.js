import axios from 'axios';

const API_URL = 'http://localhost:5161/api/auth';

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

// Update the register function to include the new fields
export const register = (email, password, firstName, lastName, birthday, gender) => {
  return axios.post(`${API_URL}/register`, { 
    email, 
    password,
    firstName,
    lastName,
    birthday,
    gender
  });
};

export const forgotPassword = (email) => {
  return axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = (email, token, password) => {
  return axios.post(`${API_URL}/reset-password`, { email, token, password });
};

export const getAllUsers = () => {
  return axios.get(`${API_URL}/users`);
};

export const getUserDetails = (email) => {
  return axios.get(`${API_URL}/user-details`, { params: { email } });
};


export const adminSendResetEmail = (email) => {
  return axios.post(`${API_URL}/admin/send-reset-email`, { email });
};

export const updateUser = (email, firstName, lastName) => {
  return axios.put(`${API_URL}/update-user`, { email, firstName, lastName });
};