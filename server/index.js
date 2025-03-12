require('dotenv').config()
const express=require('express')
const cors=require('cors')
const mongoose =require('mongoose')

const router= require('./routes')

const app = express();
app.use(cors())
app.use(express.json());
app.use(router)

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

  app.use("/uploads", express.static("uploads")); // Serve images


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Backend running on http://localhost:${PORT}`));