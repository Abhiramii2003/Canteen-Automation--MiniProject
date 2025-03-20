//important library intializations
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// models  intializations
const User = require("./model/usermodel");
const MenuItem = require("./model/menuModel");

const {
  usermenu,
  getmenu,
  addmenu,
  editmenu,
  deletemenu,
} = require("./controller/menucontroller");

const {
  getCart,
  addtocart,
  removefromCart,
  clearfromcart,
  decreaseQuantity,
} = require("./controller/cartController");

// api to register a user
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Received Data:", req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Registration Error:", error.message);
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
    res.json({ token, user });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});



// Get all menu items
router.get("/menu", getmenu);

// Add a new menu item
router.post("/menu", addmenu);
// Update a menu item
router.put("/menu/:id", editmenu);

// Delete a menu item
router.delete("/menu/:id", deletemenu);
//get allmenu item for users
router.get("/user/menu", usermenu);

router.get("/cart/:userId", getCart);
router.post("/cart/add", addtocart);
router.post("/cart/decrease", decreaseQuantity);
router.post("/cart/remove", removefromCart);
router.post("/clear/clear", clearfromcart);

module.exports = router;
