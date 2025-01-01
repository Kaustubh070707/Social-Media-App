const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("Data saved!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (isValidPassword) {
      const token = await jwt.sign({ _id: user._id }, JWT_SECRET);
      res.cookie("token", token);
      res.send("Login Successful");
    } else {
      throw new Error("Password not valid");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  const { token } = cookies;
  if (!token) {
    res.status(404).send("Invalid token");
  }
  const decodedMessage = jwt.verify(token, JWT_SECRET);
  const user = await User.findById({ _id: decodedMessage._id });
  if (!user) {
    res.status(404).send("Invalid user");
  }
  res.send("Ok");
});

app.get("/user", async (req, res) => {
  try {
    const users = await User.find({ emailId: req.body.emailId });
    if (users.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  const ALLOWED_UPDATES = ["photoUrl", "gender", "age"];
  const isAllowedUpdate = Object.keys(data).every((k) => {
    ALLOWED_UPDATES.includes(k);
  });
  if (!isAllowedUpdate) {
    res.status(400).send("Update not allowed");
  }
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
  } catch (err) {
    res.status(400).send("Updata Failed " + err.message);
  }
});

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
