require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(MONGO_URL);
};

module.exports = connectDB;
