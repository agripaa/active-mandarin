const express = require('express');
const roleRoute = require('./role.route');
const authRoute = require('./auth.route');
const brandRoute = require('./brand.route');

const router = express.Router();
 
router.use('/role', roleRoute);
router.use('/auth', authRoute);
router.use('/brand', brandRoute);

module.exports = router;