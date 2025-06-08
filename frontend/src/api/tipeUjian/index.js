const { default: api } = require("..");
export const createTipeUjian = async (data) => {
  try {
    const res = await api.post('/tipe-ujian', data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || "Gagal membuat tipe ujian",
      data: null,
    };
  }
};


export const updateTipeUjian = async (id, data) => {
  try {
    const response = await api.put(`/tipe-ujian/${id}`, data);
    return response.data;
  } catch (err) {
    throw err;
  }
};

// api/tipeUjian.js
export const getTipeUjianByUjianId = async (ujianId) => {
  try {
    const response = await api.get(`/tipe-ujian/by-ujian?ujian_id=${ujianId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tipe ujian by ujian ID:", error);
    throw error.response ? error.response.data : error.message;
  }
};
