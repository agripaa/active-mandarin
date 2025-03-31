const express = require("express");
const router = express.Router();
const userTransactionsController = require("../controllers/user.controller");
const middleware = require("../middleware/verifyAuth.middleware");

router.get("/", middleware.authenticateUser, userTransactionsController.getUserTransactionsByCategory);
router.get("/status", middleware.authenticateUser, userTransactionsController.getAllUserTransactions);


module.exports = router;
