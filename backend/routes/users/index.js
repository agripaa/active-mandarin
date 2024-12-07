const express = require('express');
const { getUsers, Register, Login, Logout } = require('../../controller/Users.js');
const { verifyToken } = require('../../middleware/VerifyToken.js');
const { refreshToken } = require('../../controller/RefreshToken.js');

// import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/list-user', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
 
module.exports = router;