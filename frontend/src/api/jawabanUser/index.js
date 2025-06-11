const { default: api } = require("..");

export const getEssayJawabanByUserUjianProgress = async (id) => {
  try {
    const response = await api.get(`/jawaban-user/essay/user-ujian-progress/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ujian by ID:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const examineEssayJawaban = async (id, points) => {
  try {
    const response = await api.post(`/jawaban-user/essay/user-ujian-progress/${id}/examine`, { points });
    return response.data;
  } catch (error) {
    console.error("Error examining essay jawaban:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getExamUserResults = async () => {
  try {
    const response = await api.get('/jawaban-user/exam-results');
    return response.data;
  } catch (error) {
    console.error("Error fetching exam user results:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getReviewByUjianId = async (ujianOrProgressId) => {
  const response = await api.get(`/jawaban-user/review/${ujianOrProgressId}`);
  return response.data;
};