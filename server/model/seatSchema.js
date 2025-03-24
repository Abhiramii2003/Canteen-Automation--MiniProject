const mongoose = require('mongoose');

const SeatSchema = new mongoose.Schema({
  table: String,
  seat: Number,
  status: { type: String, default: "available" },
  lastUpdated: { type: Date, default: Date.now }, // Track when the status was last updated
});

// Middleware to handle status updates
SeatSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    this.lastUpdated = Date.now(); // Update the lastUpdated field whenever status changes
  }
  next();
});

const Seat = mongoose.model("Seat", SeatSchema);

// Function to automatically change status from "occupied" to "available" after 30 minutes
const autoUpdateStatus = async () => {
  const now = new Date();
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60000); // 30 minutes ago

  // Find seats that have been "occupied" for more than 30 minutes
  const seatsToUpdate = await Seat.find({
    status: "occupied",
    lastUpdated: { $lte: thirtyMinutesAgo }, // lastUpdated is 30 minutes or more ago
  });

  // Update their status to "available"
  for (const seat of seatsToUpdate) {
    seat.status = "available";
    seat.lastUpdated = now;
    await seat.save();
  }
};

// Run the autoUpdateStatus function every minute (or adjust the interval as needed)
setInterval(autoUpdateStatus, 60000); // 60000ms = 1 minute

module.exports = Seat;