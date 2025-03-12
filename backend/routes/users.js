import express from "express";
import User from "../models/User.js"; // Import the User model
import verifyToken from "../middleware/authMiddleware.js";// Import authentication middleware

const router = express.Router();

// ✅ Test Route - Just to check if it works
router.get("/test", (req, res) => {
    res.send("Users API is working!");
});

// ✅ Get all users (Protected Route)
router.get("/", verifyToken, async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude password field
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

export default router; // ✅ Ensure default export
