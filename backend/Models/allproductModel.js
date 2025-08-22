const mongoose = require('mongoose');

const allproductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  time: { type: String, required: true },
  newPrice: { type: String, required: true },
  oldPrice: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('AllProduct', allproductSchema);