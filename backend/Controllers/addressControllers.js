const Address = require("../Models/addressModel");

exports.createAddress = async (req, res) => {
  try {
    const { userId, latitude, longitude, house, street, landmark, name, type } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const address = await Address.create({ user: userId, latitude, longitude, house, street, landmark, name, type });
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ message: "User ID required" });

    const addresses = await Address.find({ user: userId }).sort({ createdAt: -1 });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Address.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Address not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.selectAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.body;
    if (!userId || !addressId) return res.status(400).json({ message: "userId and addressId required" });
    const address = await Address.findOne({ _id: addressId, user: userId });
    if (!address) return res.status(404).json({ message: "Address not found" });

    res.json({ message: "Address selected", address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
