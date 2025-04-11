const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliate.controller');
const middleware = require('../middleware/verifyAuth.middleware')
const verifyAdmin = require('../middleware/verifyAdmin.middleware')

router.get('/false', middleware.authenticateUser, verifyAdmin.authenticateAdmin, affiliateController.getAffiliatorStatusFalse);
router.get('/true', middleware.authenticateUser, verifyAdmin.authenticateAdmin, affiliateController.getAffiliatorStatusTrue);
router.patch('/approve', middleware.authenticateUser, verifyAdmin.authenticateAdmin, affiliateController.approveAffiliator);
router.get('/validate', middleware.authenticateUser, affiliateController.validateReveralCode);
router.patch('/reject/:userId', middleware.authenticateUser, verifyAdmin.authenticateAdmin, affiliateController.rejectAffiliator);
router.get("/total-revenue",  middleware.authenticateUser, verifyAdmin.authenticateAdmin, affiliateController.getTotalAffiliateRevenue);
router.get("/dashboard", middleware.authenticateUser, affiliateController.getUserAffiliateDashboard);
router.get("/transactions", middleware.authenticateUser, affiliateController.getUserTransactions);
router.delete("/delete/:userId", middleware.authenticateUser, affiliateController.deleteAffiliator);

module.exports = router;
