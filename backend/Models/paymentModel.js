const mongoose = require("mongoose");
const { v4: uuivd4 } = require("uuid");
const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  address: {
    type: mongoose.Schema.Types.ObjectId, ref: "Address", required: true
  },
  dt: {
    type: mongoose.Schema.Types.ObjectId, ref: "time", required: true
  },

   items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "AllProduct", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true } 
    }
  ],
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending"
  },
  paymentId: { type: String },
  totalAmount: { type: Number, required: true },

  orderId: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }

});

paymentSchema.pre("save", function (next) {
  if (!this.orderId) {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.orderId = `ORD-${uuivd4()}`;
  }
  next();
})
module.exports = mongoose.model("Payment", paymentSchema);