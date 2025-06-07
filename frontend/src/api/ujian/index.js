const { default: api } = require("..");

export const getAllUjian = async () => {
  try {
    const response = await api.get(`/ujian`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getUjianById = async (id) => {
  try {
    const response = await api.get(`/ujian/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ujian by ID:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const createUjian = async (formData) => {
  try {
    const response = await api.post(`/ujian`, formData, {
     headers: {

    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateUjian = async (id, formData) => {
  try {
    const response = await api.put(`/ujian/${id}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};


export const deleteUjian = async (id) => {
  try {
    const response = await api.delete(`/ujian/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const submitUjian = async ({soal_id, input_jawaban, user_id}) => {
  try {
    const response = await api.post(`/ujian/jawaban`, {soal_id, input_jawaban, user_id});
    return response.data;
  } catch (error) {
    console.error("Error deleting ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getUjianDetail = async (id) => {
  try {
    const response = await api.get(`/ujian/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getUjianSoal = async (id) => {
  try {
    const response = await api.get(`/ujian/soal/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getJawabanListBySoalId = async (id) => {
  try {
    const response = await api.get(`/list-jawaban/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getUjianBrandsByUjianId = async (ujianId) => {
  try {
    const response = await api.get(`/ujian-brand/by-ujian/${ujianId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ujian brands:", error);
    throw error.response ? error.response.data : error.message;
  }
};
