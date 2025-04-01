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

export const getAllBrands = async () => {
  try {
    const response = await api.get(`/brand`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getBrandCategoryTurunan = async (category_brand, turunan_brand) => {
  try {
    const response = await api.get(`/brand/category?category_brand=${category_brand}&turunan_brand=${turunan_brand}`);
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getGroupedBrands = async () => {
  try {
    const response = await api.get(`/brand/grouped`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getLatestPrograms = async () => {
  try {
    const response = await api.get(`/brand/latest-programs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
}