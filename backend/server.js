require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("🔥 MongoDB Connected Successfully"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Sample menu data
const menuItems = [
  { id: 1, name: "Burger", price: 100, image: "burger.jpg" },
  { id: 2, name: "Pizza", price: 200, image: "pizza.jpg" },
  { id: 3, name: "Pasta", price: 150, image: "pasta.jpg" }
];

// API Route to get menu items
app.get("/api/menu", (req, res) => {
  res.json(menuItems);
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
