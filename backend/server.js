require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const menuRoutes = require("./routes/menuRoutes"); // Ensure correct path
const orderRoutes = require("./routes/orderRoutes"); // Ensure correct path

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

// Use Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
