import axiosInstance from '../../services/axiosInstance';

export const sendEmailCode = (email) =>
  axiosInstance.post('/auth/send-access-code', { email });

export const verifyEmailCode = (email, code) =>
  axiosInstance.post('/auth/verify-access-code', { email, code });

export const sendPhoneCode = (phone) =>
  axiosInstance.post('/phone-auth/send-phone-code', { phone });

export const verifyPhoneCode = (phone, code) =>
  axiosInstance.post('/phone-auth/verify-phone-code', { phone, code });
