const dt = require("../Models/dtModel");

exports.savedt = async (req, res) => {
  try {
    const { userId, date, time } = req.body;
    if (!userId) return res.status(400).json({ message: "userId is required" });
    if (!date || !time) return res.status(400).json({ message: "date and time are required" });
    const newBooking = new dt({ userId, date, time });
    await newBooking.save();
    res.status(201).json({ message: "Date & Time saved successfully", booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });

  }
};
exports.getdts = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "userId required" });
    const bookings = await dt.find({ userId });
    res.status(200).json(bookings);
  }
  catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};