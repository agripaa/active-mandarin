const express = require('express');
const usersRoute = require("./users/index");
const faqRoute = require("./faq/index");
const sponsorsRoute = require("./sponsors/index");
const groupclassRoute = require("./groupclass/index");
const feedbackRoute = require("./feedback/index");
const mentorRoute = require("./mentor/index");
const aboutRoute = require("./about/index");
const langRoute = require("./Lang/index");
const postingRoute = require("./Posting/index");


// import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
 
const router = express.Router();
 
router.use("/users", usersRoute);
router.use("/faq", faqRoute);
router.use("/sponsors", sponsorsRoute);
router.use("/groupclass", groupclassRoute);
router.use("/feedback", feedbackRoute);
router.use("/mentor", mentorRoute);
router.use("/about", aboutRoute);
router.use("/lang", langRoute);
router.use("/posting", postingRoute);
router.use('/images/sponsors', express.static(process.env.PATH_IMAGE_SPONSORS));
router.use('/images/posting', express.static(process.env.PATH_IMAGE_POSTING));
router.use('/images/mentor', express.static(process.env.PATH_IMAGE_MENTOR));
router.use('/images/user', express.static(process.env.PATH_IMAGE_USER));
router.use('/images/about', express.static(process.env.PATH_IMAGE_ABOUT));
router.use('/images/courses', express.static(process.env.PATH_IMAGE_COURSES));



 
module.exports = router;