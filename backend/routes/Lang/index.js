const express = require('express');
const { getLang} = require('../../controller/Lang');
const { verifyToken } = require('../../middleware/VerifyToken.js');

// import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/list-lang', getLang);
 
module.exports = router;