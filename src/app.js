const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

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
