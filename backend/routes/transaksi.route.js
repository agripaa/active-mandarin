const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaksi.controller');
const verifyAuth = require('../middleware/verifyAuth.middleware');
const verifyAdmin = require('../middleware/verifyAdmin.middleware')

router.post('/', verifyAuth.authenticateUser, transactionController.createTransaction);

router.get('/user', verifyAuth.authenticateUser, transactionController.getTransactionsUser);
router.get('/summary', verifyAuth.authenticateUser,transactionController.getTransactionSummary);
router.get('/monthly-summary-admin', verifyAuth.authenticateUser, transactionController.getTransactionsByMonthAdmin);
router.get('/top-products-programs', verifyAuth.authenticateUser, transactionController.getTopSellingProductsAndPrograms);
router.get('/pending', verifyAuth.authenticateUser, transactionController.getAllTransactionPending);

router.get('/dashboard-data', verifyAuth.authenticateUser, transactionController.getTransactionDashboardData);

router.get('/', verifyAuth.authenticateUser, verifyAdmin.authenticateAdmin, transactionController.getAllTransactions);
router.get('/:id', verifyAuth.authenticateUser, verifyAdmin.authenticateAdmin, transactionController.getTransactionById);

router.patch('/:id', verifyAuth.authenticateUser, verifyAdmin.authenticateAdmin, transactionController.updateTransaction);
router.delete('/:id', verifyAuth.authenticateUser, verifyAdmin.authenticateAdmin, transactionController.deleteTransaction);

module.exports = router;
