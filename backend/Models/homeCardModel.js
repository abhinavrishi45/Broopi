const mongoose = require('mongoose');

const homecardSchema = new mongoose.Schema({
  name:{ type: String , required:true},
  category:{ type: String , required:true},
  newPrice: { type: String , required:true},
  oldPrice: { type: String , required:true},
  image :{ type: String , required:true},
}, {timestamps:true});

module.exports = mongoose.model('homeCard', homecardSchema);