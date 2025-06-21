const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const newUser = new User({ email, password });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const userId = user._id.toString();

    const token = jwt.sign(
      { userid: userId, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    // console.log(userId);
    const userObjectId = new mongoose.Types.ObjectId(userId);
    // console.log(userObjectId);

    return res
      .status(200)
      .json({ statusCode: 200, message: "Login successfull", token: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
