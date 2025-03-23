const mongoose = require("mongoose");
const CanteenSeat = require("./model/seatSchema");
require('dotenv').config()


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

const initialSeats = [];
const totalTables = 10;
const seatsPerTable = 4;

for (let table = 1; table <= totalTables; table++) {
  for (let seat = 1; seat <= seatsPerTable; seat++) {
    initialSeats.push({
      table,
      seat,
      status: "available",
    });
  }
}

// Insert seats into database
const seedDatabase = async () => {
  try {
    await CanteenSeat.deleteMany(); // Clear old data
    await CanteenSeat.insertMany(initialSeats);
    console.log("✅ Initial seats added successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting seats:", error);
  }
};

seedDatabase();