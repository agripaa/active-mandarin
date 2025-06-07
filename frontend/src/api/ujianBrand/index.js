const { default: api } = require("..");
export const createUjianBrand = async (data) => {
  try {
    const response = await api.post(`/ujian-brand`, data, {
     headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating ujian-brand:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getUjianBrandByUjianId = async (ujianId) => {
  try {
    const response = await api.get(`/ujian-brand/?ujian_id=${ujianId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ujian:", error);
    throw error.response ? error.response.data : error.message;
  }
};