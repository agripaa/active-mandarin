const express = require('express');
const roleRoute = require('./role.route');
const authRoute = require('./auth.route');
const brandRoute = require('./brand.route');
const transaksiRoute = require('./transaksi.route');
const affiliateRoute = require('./affiliate.route');
const recruitmentRoute = require('./recruitment.route');
const donationRoute = require('./donation.route');
const userRoute = require('./user.route');

const router = express.Router();
 
router.use('/role', roleRoute);
router.use('/auth', authRoute);
router.use('/brand', brandRoute);
router.use('/transactions', transaksiRoute);
router.use('/affiliate', affiliateRoute);
router.use('/recruitment', recruitmentRoute);
router.use('/donation', donationRoute);
router.use('/user', userRoute);

module.exports = router;