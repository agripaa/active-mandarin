import api from "../";
import * as XLSX from "xlsx";

export const getTransactionSummary = async () => {
  try {
    const response = await api.get(`/transactions/summary`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getTransactionsByMonthAdmin = async () => {
  try {
    const response = await api.get(`/transactions/monthly-summary-admin`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getDashboardData = async () => {
  try {
      const response = await api.get(`/transactions/dashboard-data`);
      return response.data;
  } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error.response ? error.response.data : error.message;
  }
};

export const getTopSellingProductsAndPrograms = async () => {
  try {
    const response = await api.get(`/transactions/top-products-programs`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getAllTransactions = async (page = 1, limit = 10) => {
  try {
    const response = await api.get(`/transactions?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const getPendingTransactions = async () => {
  try {
    const response = await api.get(`/transactions/pending`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};
export const getTransactionById = async (id) => {
  try {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const createTransaction = async (formData) => {
  try {
    const response = await api.post(`/transactions`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const updateTransaction = async (id, data) => {
  try {
    const response = await api.patch(`/transactions/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const deleteTransaction = async (id) => {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error.response ? error.response.data : error.message;
  }
};

export const exportTransactionsToExcel = async () => {
  try {
    const response = await api.get(`/transactions?page=1&limit=1000`);
    const transactions = response.data.data;

    if (!transactions || transactions.length === 0) {
      throw new Error("No transactions to export.");
    }

    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, `Transactions_${new Date().toISOString()}.xlsx`);

    return { status: true, message: "Exported successfully!" };
  } catch (error) {
    console.error("Error exporting transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};
