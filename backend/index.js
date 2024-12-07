const express = require('express');
require("dotenv").config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const router = require('./routes/index.js');
// import express from "express";

const app = express();

app.use(cors({ credentials:true, origin:true }));
app.use(cookieParser());
app.use(express.json());
app.use("/", router);
 
app.listen(5000, ()=> console.log('Server running at port 5000'));