const express = require('express');
const { getMstFeedback } = require('../../controller/FeedBack');
const { verifyToken } = require('../../middleware/VerifyToken.js');

// import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.get('/list-feedback', getMstFeedback);
 
module.exports = router;