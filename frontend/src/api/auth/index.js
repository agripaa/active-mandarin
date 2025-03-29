import api from "..";

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
export const verifyOTP = (otpData) => api.post("/auth/verify-otp", otpData);
export const getProfile = () => api.get("/auth/profile");