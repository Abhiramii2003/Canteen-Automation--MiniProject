const MenuItem = require("../model/menuModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer for image storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Get all menu items (for users)
exports.usermenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ available: true });
    res.status(200).json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};


// Get all menu items (admin)
exports.getmenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items" });
  }
};

// Add a menu item
exports.addmenu = [
  upload.single("image"),
  async (req, res) => {
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
  },
];

// Edit a menu item
exports.editmenu = [
  upload.single("image"),
  async (req, res) => {
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
  },
];

// Delete a menu item
exports.deletemenu = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (deletedItem && deletedItem.image) {
      const filePath = `.${deletedItem.image}`;
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Remove image file safely
      }
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
};
