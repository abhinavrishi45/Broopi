const mongoose = require('mongoose');

const allproductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory', required: true },
  time: { type: String, required: true },
  newPrice: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  description1: { type: String, required: true }

}, { timestamps: true });

module.exports = mongoose.models.AllProduct || mongoose.model('AllProduct', allproductSchema);
