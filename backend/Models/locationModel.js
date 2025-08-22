const mongoose = require('mongoose');
const location = new mongoose.Schema({
  latitude : Number,
  longitude : Number,
  address: String,
  society: String,
  userId:{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',

  },
}, {timestamps: true});

module.exports = mongoose.model('Location', location);

