const LongBanner = require('../Models/longBannerModel');
const path = require("path");
const fs = require("fs");
exports.createLongBanner = async (req, res) => {
  try {
    const { category } = req.body;   
    const image = req.file?.filename;

    if (!image || !category) {
      return res.status(400).json({ message: "Please provide category and image" });
    }

    const card = new LongBanner({
      category,
      image
    });

    await card.save();
    res.status(201).json({ message: 'Image added successfully', card });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
exports.getLongBanner = async (req, res) => {
  try {
    const cards = await LongBanner.find();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteLongBanner = async (req, res) => {
  try {
    const card = await LongBanner.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Image not found" });

    const filePath = path.join(__dirname, "../uploads/LongBanner/", card.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await card.deleteOne();
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.updateLongBanner = async (req, res) => {
  try {
    const card = await LongBanner.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Image not found" });


    if (req.file) {
      const oldFilePath = path.join(__dirname, "../uploads/LongBanner/", card.image);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
      card.image = req.file.filename;
    }

    if (req.body.category) {
      card.category = req.body.category;
    }

    await card.save();
    res.json({ message: "Image updated successfully", card });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
