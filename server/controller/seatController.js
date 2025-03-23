

  const Seat = require("../model/seatSchema");
  

  exports.getseats=async (req, res) => {
    try {
      const seats = await Seat.find();
      res.json(seats);
    } catch (error) {
      res.status(500).json({ message: "Error fetching seats" });
    }
  }
  exports.selectseat=async (req, res) => {
    try {
      const { seatId } = req.body;
      await Seat.findByIdAndUpdate(seatId, { status: "occupied" });
      res.json({ message: "Seat selected" });
    } catch (error) {
      res.status(500).json({ message: "Error selecting seat" });
    }
  }
  exports.updateSeat= async (req, res) => {
    try {
      const { seatIds, status } = req.body;
  
      await Seat.updateMany(
        { _id: { $in: seatIds } },
        { $set: { status: status } }
      );
  
      res.status(200).json({ message: "Seat status updated successfully!" });
    } catch (error) {
      console.error("Error updating seat status:", error);
      res.status(500).json({ error: "Failed to update seat status" });
    }
  }