//important library intializations
const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
// models  intializations
const User=require('./model/usermodel')






// api to register a user
router.post("/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("❌ Registration Error:", error);
      res.status(500).json({ error: "Registration failed" });
    }
  });





  // login api used for login a user

  router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });






module.exports = router;