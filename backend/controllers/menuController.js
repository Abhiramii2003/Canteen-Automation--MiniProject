const Menu = require("../models/Menu");

// 🟢 Add Menu Item
exports.addMenuItem = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;
        const newItem = new Menu({ name, price, category, image });
        await newItem.save();
        res.status(201).json({ message: "Menu item added successfully!", newItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to add menu item" });
    }
};

// 🔵 Get All Menu Items
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
};

// 🟠 Update Menu Item
exports.updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ error: "Menu item not found" });
        res.status(200).json({ message: "Menu item updated", updatedItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to update menu item" });
    }
};

// 🔴 Delete Menu Item
exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Menu.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ error: "Menu item not found" });
        res.status(200).json({ message: "Menu item deleted", deletedItem });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete menu item" });
    }
};
