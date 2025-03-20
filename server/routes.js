//important library intializations
const express = require('express');
const router = new express.Router();
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
// models  intializations
const User=require('./model/usermodel')
const MenuItem =require('./model/menuModel')
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { usermenu } = require('./controller/menucontroller');
const Cart = require('./model/cart');
const { getCart, addtocart, removefromCart, clearfromcart, decreaseQuantity } = require('./controller/cartController');





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

      const newUser = new User({ name: username, email, password: hashedPassword });
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
      res.json({ token, user});
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });


// Multer for image upload
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Routes

// Get all menu items
router.get("/menu", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
});

// Add a new menu item
router.post("/menu", upload.single("image"), async (req, res) => {
  console.log(req.body);
  
  try {
    const { name, price, description, category, available } = req.body;
    const newItem = new MenuItem({
      name,
      price,
      description,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : "",
      available,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add menu item" });
  }
});

// Update a menu item
router.put("/menu/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category, available } = req.body;
    let updatedData = { name, price, description, category, available };

    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

// Delete a menu item
router.delete("/menu/:id", async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (deletedItem.image) {
      fs.unlinkSync(`.${deletedItem.image}`); // Remove image file
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});
 router.get('/user/menu',usermenu)

router.get('/cart/:userId',getCart)
router.post('/cart/add',addtocart)
router.post('/cart/decrease',decreaseQuantity)
router.post('/cart/remove',removefromCart)
router.post('/clear/clear',clearfromcart)


module.exports = router;