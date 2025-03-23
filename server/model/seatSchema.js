const mongoose = require('mongoose')
const SeatSchema = new mongoose.Schema({
    table: String,
    seat: Number,
    status: { type: String, default: "available" },
  });
  
  const Seat = mongoose.model("Seat", SeatSchema);
  module.exports=Seat