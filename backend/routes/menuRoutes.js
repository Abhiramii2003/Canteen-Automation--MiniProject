const express = require("express");
const router = express.Router();
const Menu = require("../models/Menu"); // Ensure the correct model is imported

// GET all menu items
router.get("/", async (req, res) => {
    try {
        const menuItems = await Menu.find();
        if (!menuItems.length) {
            return res.status(404).json({ message: "No menu items found" });
        }
        res.json(menuItems);
    } catch (error) {
        console.error("Error fetching menu:", error);
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
});

module.exports = router;
