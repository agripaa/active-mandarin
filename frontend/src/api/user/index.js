const { default: api } = require("..");

export const getUserTransactionsByCategory = async (category, page = 1, limit = 5) => {
    try {
        const response = await api.get(`/user?category=${category}&page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        throw error.response ? error.response.data : error.message;
    }
};

export const getAllUserTransactions = async (page = 1, limit = 5) => {
    try {
        const response = await api.get(`/user/status?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        throw error.response ? error.response.data : error.message;
    }
};