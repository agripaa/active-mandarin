const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const middleware = require('../middleware/verifyAuth.middleware')

router.post('/register', authController.register);
router.post('/register/admin', authController.registerAdmin);
router.post('/register/affiliate', authController.registerAffiliate);
router.post('/login', authController.login);
router.post('/verify-otp', authController.verifyOTP);
router.get('/profile', middleware.authenticateUser, authController.getProfile);
router.patch('/edit/profile', middleware.authenticateUser, authController.editUser);

module.exports = router;
