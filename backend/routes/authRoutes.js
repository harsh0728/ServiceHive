const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Registration Route
router.post("/register", async (req, res) => {
  const { username, email, password, roles } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      roles, // roles should be an array of role IDs
    });

    await user.save();

    // Create JWT token (optional, can be used after login)
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
        roles: user.roles,
        createdAt: user.createdAt,
        _id: user._id,
      },
      token, // Send token for client-side use
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
