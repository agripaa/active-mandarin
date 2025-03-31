const { default: api } = require("..");

export const getAllDonation = async () => {
    try {
      const response = await api.get(`/donation`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const getByIdDonation = async (id) => {
    try {
      const response = await api.get(`/donation/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const createDonation = async (payload) => {
    try {
      const response = await api.post(`/donation`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const updateDonation = async (id, payload) => {
    try {
      const response = await api.patch(`/donation/${id}`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const deleteDonation = async (id) => {
    try {
      const response = await api.delete(`/donation/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};