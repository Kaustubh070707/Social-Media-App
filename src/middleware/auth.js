const jwt = require("jsonwebtoken");
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET_KEY;

app.use(cookieParser());
const userAuth = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const { token } = req.cookies;
    console.log(token);
    if (!token) {
      throw new Error("Invalid token");
    }
    const decodedObj = await jwt.verify(token, JWT_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  userAuth,
};
