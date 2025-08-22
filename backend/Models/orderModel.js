const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "AllProduct" },
      quantity: Number,
      price: String,
    }
  ],
  orderId: { type: String, unique: true },
  createdAt:{type:String, default: Date.now}

});
module.exports = mongoose.model("Order", orderSchema);