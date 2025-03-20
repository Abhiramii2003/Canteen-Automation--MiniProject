const MenuItem =require('../model/menuModel')

exports.usermenu=async (req, res) => {
    try {
      const menuItems = await MenuItem.find();
      res.status(200).json(menuItems);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  };
 
