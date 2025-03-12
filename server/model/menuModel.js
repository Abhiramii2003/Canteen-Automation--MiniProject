const mongoose = require('mongoose')
const menuSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String, // Path to image
    available: Boolean,
  });
  
  const MenuItems = mongoose.model("MenuItems", menuSchema);
  module.exports=MenuItems