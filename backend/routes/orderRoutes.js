const express = require("express");
const router = express.Router();

// Sample order route
router.get("/", (req, res) => {
    res.json({ message: "Order route working!" });
});

module.exports = router; // ✅ Correct export
