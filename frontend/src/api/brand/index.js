const { default: api } = require("..");

export const softDeleteBrand = async (id) => {
    try {
      const response = await api.delete(`/brand/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
  };

export const getBrandById = async (id) => {
    try {
      const response = await api.get(`/brand/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
  };