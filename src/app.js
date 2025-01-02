const express = require("express");
const connectDB = require("./config/database");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRoute = require("./routes/user");

require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRoute);

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  })
  .catch(() => {
    console.log("Database connection failed");
  });
