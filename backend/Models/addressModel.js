const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  latitude: { type: Number },
  longitude: { type: Number },
  house: { type: String },
  street: { type: String },
  landmark: { type: String },
  name: { type: String },
  type: { type: String, enum: ['Home', 'Other'], default: 'Home' },
  createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Address', addressSchema);