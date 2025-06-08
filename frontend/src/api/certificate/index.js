import api from "../";

export const getAllCertificates = async () => {
  try {
    const response = await api.get(`/certificate`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getCertificateById = async (id, examNo) => {
  try {
    const response = await api.get(`/certificate/${id}/${examNo}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate by ID:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getCertificatesByUserId = async (user_id) => {
  try {
    const response = await api.get(`/certificate/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificates by user:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const createCertificate = async (data) => {
  try {
    const response = await api.post(`/certificate`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating certificate:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateCertificate = async (id, data) => {
  try {
    const response = await api.put(`/certificate/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating certificate:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteCertificate = async (id) => {
  try {
    const response = await api.delete(`/certificate/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error.response ? error.response.data : error.message;
  }
};
