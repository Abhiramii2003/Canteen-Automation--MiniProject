
const User = require("../model/usermodel");
exports.profile= async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password"); // Exclude password
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };