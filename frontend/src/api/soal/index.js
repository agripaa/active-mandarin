const { default: api } = require("..");

export const createSoal = async (formData) => {
  try {
    const response = await api.post(`/soal`, formData, {
     headers: {

    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating soal:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getSoalByTipeUjianId = async (tipeUjianId) => {
  try {
    const response = await api.get(`/soal/by-tipe-ujian?tipe_ujian_id=${tipeUjianId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching soal by tipe ujian ID:", error);
    throw error.response ? error.response.data : error.message;
  }
};

// api/soal.js
export const updateSoal = async (id, data) => {
  try {
    const response = await api.put(`/soal/${id}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};
