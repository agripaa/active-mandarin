import api from "../";
import * as XLSX from "xlsx";
import { formatRupiah } from "../../utils/rupiahFormat";
import { formatDate } from "../../utils/formatDate";

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

    const transformedData = transactions.map((tx) => ({
      "Buyer Name": tx.User?.name || "-",
      "Phone Number": tx.User?.number || "-",
      "Category": tx.Brand?.category_brand || "-",
      "Variant": tx.Brand?.variant || "-",
      "Type": tx.Brand?.turunan || "-",
      "Price": formatRupiah(tx.Brand.price),
      "Price Discount": formatRupiah(tx.Brand.discount_price),
      "Transaction Date": formatDate(tx.transaction_date),
      "Payment Method": tx.payment_method,
      "Affiliate": tx.Affiliator?.name || "-",
      "Commission": tx.Affiliator ? formatRupiah(tx.Brand?.commission) : "-",
      "Invoice Link": `${process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000"}/invoice/${tx.id}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    XLSX.writeFile(workbook, `Transactions_${new Date().toISOString().slice(0, 10)}.xlsx`);

    return { status: true, message: "Exported successfully!" };
  } catch (error) {
    console.error("Error exporting transactions:", error);
    throw error.response ? error.response.data : error.message;
  }
};
