//important library intializations
const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// models  intializations
const User = require("./model/usermodel");
const Order = require("./model/orderSchema");

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
const {
  selectseat,
  getseats,
  updateSeat,
  seatUpdate,
} = require("./controller/seatController");
const {
  confirmOrder,
  getorders,
  getAllOrders,
  updateOrderStatus,
  getLastToken,
} = require("./controller/OrderController");
const authMiddleware = require("./authMiddleware");
const {
  getOrderNotifications,
} = require("./controller/notificationController");
const {
  profile,
  profileimage,
  getUserProfile,
  uploadProfileImage,
  upload,
  getuser,
  updateuserStatus,
} = require("./controller/userController");

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
router.get("/menu",authMiddleware, getmenu);

// Add a new menu item
router.post("/menu",authMiddleware, addmenu);
// Update a menu item
router.put("/menu/:id",authMiddleware, editmenu);

// Delete a menu item
router.delete("/menu/:id",authMiddleware, deletemenu);
//get allmenu item for users
router.get("/user/menu", usermenu);

router.get("/cart/:userId", getCart);
router.post("/cart/add", authMiddleware, addtocart);
router.post("/cart/decrease", decreaseQuantity);
router.post("/cart/remove", removefromCart);
router.post("/clear/clear", clearfromcart);

router.post("/select-seat", selectseat);
router.get("/api/seats", authMiddleware, getseats);
router.post("/update-seat-status", authMiddleware, updateSeat);

router.post("/confirm-order", authMiddleware, confirmOrder);
router.get("/api/orders", authMiddleware, getorders);

router.get("/api/orders/notifications", authMiddleware, getOrderNotifications);

router.post(
  "/user/upload-profile",
  authMiddleware,
  upload.single("profileImage"),
  uploadProfileImage
);

// Route to Get User Profile
router.get("/user/profile", authMiddleware, getUserProfile);

router.get("/orders",authMiddleware, getAllOrders);
router.put("/orders/:id",authMiddleware, updateOrderStatus);

router.get("/orders/last-token", getLastToken);
router.get("/seats", getseats);

router.put("/seats/:id",authMiddleware, seatUpdate);
router.get("/api/admin/orders",authMiddleware, getAllOrders);

router.get("/api/users", getuser);
router.put("/api/users/:id/status",authMiddleware, updateuserStatus);

router.get("/api/admin/stats",authMiddleware, async (req, res) => {
  try {
    // Replace these with actual database queries
    const totalUsers = await User.countDocuments();
    const revenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueData.length ? revenueData[0].total : 0;
    const totalOrders = await Order.countDocuments();
    //const messages = await Message.countDocuments();
    const menuCount = await MenuItem.countDocuments();

    res.json({
      totalUsers,
      revenue: totalRevenue,
      totalOrders,
      menuCount,
      //messages,
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching dashboard stats" });
  }
});
module.exports = router;
