const { default: api } = require("..");

export const getAllRecruitment = async () => {
    try {
      const response = await api.get(`/recruitment`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const getByIdRecruitment = async (id) => {
    try {
      const response = await api.get(`/recruitment/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const createRecruitment = async (payload) => {
    try {
      const response = await api.post(`/recruitment`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const updateRecruitment = async (id, payload) => {
    try {
      const response = await api.patch(`/recruitment/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const deleteRecruitment = async (id) => {
    try {
      const response = await api.delete(`/recruitment/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};