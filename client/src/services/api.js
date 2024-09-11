import axios from 'axios';

const API_URL = 'http://localhost:5161/api/auth';
const COUPON_API_URL = 'http://localhost:5161/api/coupon';

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

// Update the register function to include the new fields
export const register = (email, password, firstName, lastName, birthday, gender, interests) => {
  return axios.post(`${API_URL}/register`, { 
    email, 
    password,
    firstName,
    lastName,
    birthday,
    gender,
    interests,
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

export const fetchCouponsByInterests = (interests) => {
  return axios.get(COUPON_API_URL, { params: { interests } });
};

export const claimCoupon = (email, couponId) => {
  return axios.post(`${COUPON_API_URL}/claim`, {
    email,
    couponId
  });
};