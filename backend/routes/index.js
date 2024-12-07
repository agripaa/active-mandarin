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
const path = require('path');


// import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
// import { verifyToken } from "../middleware/VerifyToken.js";
// import { refreshToken } from "../controllers/RefreshToken.js";
 

console.log(path.join(__dirname, process.env.PATH_IMAGE_SPONSORS));

const sponsorsPath = path.resolve(
    __dirname,
    '..',
    process.env.PATH_IMAGE_SPONSORS || 'storage/assets/sponsors/'
);

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
router.use(
    '/images/sponsors',
    express.static(path.resolve(__dirname, '..', process.env.PATH_IMAGE_SPONSORS || 'storage/assets/sponsors/'))
);
router.use(
    '/images/mentor',
    express.static(path.resolve(__dirname, '..', process.env.PATH_IMAGE_MENTOR || 'storage/assets/mentor/'))
);
router.use(
    '/images/user',
    express.static(path.resolve(__dirname, '..', process.env.PATH_IMAGE_USER || 'storage/assets/user/'))
);
router.use(
    '/images/about',
    express.static(path.resolve(__dirname, '..', process.env.PATH_IMAGE_ABOUT || 'storage/assets/about/'))
);
router.use(
    '/images/posting',
    express.static(path.resolve(__dirname, '..', process.env.PATH_IMAGE_POSTING || 'storage/assets/posting/'))
);
// router.use('/images/courses', express.static(path.join(__dirname, process.env.PATH_IMAGE_COURSES)));



 
module.exports = router;