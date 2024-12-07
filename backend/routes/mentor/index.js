const express = require('express');
const { getMstMentor } = require('../../controller/Mentor');
const { verifyToken } = require('../../middleware/VerifyToken.js');

// import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/list-mentor', getMstMentor);
 
module.exports = router;