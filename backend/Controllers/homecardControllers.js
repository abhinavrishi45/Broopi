const homeCard = require('../Models/homeCardModel');

exports.createhomecard = async (req, res) => {
  try {
    const { name, category, newPrice, oldPrice } = req.body;
    const image = req.file?.filename;

    if (!name || !category || !newPrice || !oldPrice || !image) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const cardproduct = new homeCard({
      name, category, newPrice, oldPrice, image,
    });

    await cardproduct.save();
    res.status(201).json({ message: 'Product added successfully' });

  }
  catch (err) {
    res.status(500).json({ message: 'server error', error:'err.message' });
  }
};
exports.getHomeCards = async (req, res) => {
  try {
    const cards = await homeCard.find();
    res.status(200).json(cards);
    // console.log('details fetched')
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateHomecard = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedHomecard = await homeCard.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedHomecard) {
      return res.status(404).json({ message: 'Homecard not found' });
    }

    res.status(200).json(updatedHomecard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHomecard = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHomecard = await homeCard.findByIdAndDelete(id);

    if (!deletedHomecard) {
      return res.status(404).json({ message: 'Homecard not found' });
    }

    res.status(200).json({ message: 'Homecard deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};