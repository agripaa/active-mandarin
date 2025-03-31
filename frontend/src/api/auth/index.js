import api from "..";

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
export const verifyOTP = (otpData) => api.post("/auth/verify-otp", otpData);

// Get user profile
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// Edit user profile
export const editProfile = async (payload) => {
  try {
    const response = await api.patch("/auth/edit/profile", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error.response ? error.response.data : error.message;
  }
};
