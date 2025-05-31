const { default: api } = require("..");

export const getAffiliatorStatusFalse = async () => {
    try {
      const response = await api.get(`/affiliate/false`);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const getAffiliatorStatusTrue = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`/affiliate/true?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching approved affiliates:", error);
        throw error.response ? error.response.data : error.message;
    }
};

export const approveAffiliator = async (payload) => {
    try {
      const response = await api.patch(`/affiliate/approve`, payload);
      return response.data;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const rejectAffiliator = async (userId, reason) => {
    try {
      const response = await api.patch(`/affiliate/reject/${userId}`, {
        summary_cancel: reason,
      });
      return response.data;
    } catch (error) {
      console.error("Error rejecting affiliator:", error);
      throw error.response ? error.response.data : error.message;
    }
};

export const getTotalAffiliateRevenue = async () => {
    try {
        const response = await api.get(`/affiliate/total-revenue`);
        return response.data;
    } catch (error) {
        console.error("Error fetching total revenue:", error);
        throw error.response ? error.response.data : error.message;
    }
};

export const getUserAffiliateDashboard = async () => {
  try {
      const response = await api.get(`/affiliate/dashboard`);
      return response.data;
  } catch (error) {
      console.error("Error fetching user dashboard:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const getUserTransactions = async (page = 1, limit = 5) => {
  try {
      const response = await api.get(`/affiliate/transactions?page=${page}&limit=${limit}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
  }
};


export const validateReveralCode = async (reveral_code) => {
  try {
      const response = await api.get(`/affiliate/validate?reveral_code=${encodeURIComponent(reveral_code)}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const deleteAffiliator = async (userId) => {
  try {
      const response = await api.delete(`/affiliate/delete/${userId}`);
      return response.data;
  } catch (error) {
      console.error("Error fetching transactions:", error);
      throw error.response ? error.response.data : error.message;
  }
};
