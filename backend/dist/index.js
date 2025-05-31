"use strict";

var express = require('express');
require("dotenv").config();
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');
var cors = require('cors');
var router = require('./routes/index.js');
var _require = require('./middleware/security.middleware.js'),
  enableCORS = _require.enableCORS,
  setSecurityHeaders = _require.setSecurityHeaders;
var _require2 = require('./config/Database.js'),
  connectDB = _require2.connectDB;
var _require3 = require('./helpers/createFolderIfNotExists.js'),
  createFolderIfNotExists = _require3.createFolderIfNotExists;
var path = require('path');
var app = express();
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  // 25MB limit
  abortOnLimit: true,
  responseOnLimit: "Ukuran file terlalu besar. Maksimum 5MB."
}));
app.use(function (err, req, res, next) {
  if (err && err.message && err.message.includes('File too large')) {
    return res.status(413).json({
      status: false,
      message: "Ukuran file terlalu besar. Maksimum 5MB."
    });
  }
  console.error("Global Error:", err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error: err.message
  });
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/public/brand', express["static"](path.join(__dirname, 'public/brand')));
app.use('/public/products', express["static"](path.join(__dirname, 'public/products')));
app.use('/public/proofs', express["static"](path.join(__dirname, 'public/proofs')));
app.use('/public/cv', express["static"](path.join(__dirname, 'public/cv')));
app.use('/public/proof_donation', express["static"](path.join(__dirname, 'public/proof_donation')));
app.use('/public/profile-user', express["static"](path.join(__dirname, 'public/profile-user')));
createFolderIfNotExists(path.join(__dirname, 'public/brand'));
createFolderIfNotExists(path.join(__dirname, 'public/products'));
createFolderIfNotExists(path.join(__dirname, 'public/proofs'));
createFolderIfNotExists(path.join(__dirname, 'public/cv'));
createFolderIfNotExists(path.join(__dirname, 'public/proof_donation'));
createFolderIfNotExists(path.join(__dirname, 'public/profile-user'));
app.use(cors({
  credentials: true,
  origin: true
}));
app.use(enableCORS);
app.use(setSecurityHeaders);
app.use("/api/v2", router);
app.get("/", function (_, res) {
  res.send("Server API is running...");
});
app.use(function (req, res, next) {
  res.status(404).json({
    status: false,
    message: "API endpoint not found"
  });
});
app.use(function (err, req, res, next) {
  console.error("Global Error:", err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    error: err.message
  });
});
connectDB();
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  return console.log("Server running at port http://localhost:".concat(PORT));
});