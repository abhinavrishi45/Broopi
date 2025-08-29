const mongoose = require('mongoose');
const FirstCardSchema = new mongoose.Schema({
  category:{type :String , required: true},
  image:{type: String , required : true},
  createdAt:{type:Date, default: Date.now},
});

module.exports = mongoose.model('FirstCard', FirstCardSchema);