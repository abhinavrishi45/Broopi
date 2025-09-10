const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../Models/paymentModel");
const CartModel = require("../Models/cartModel");
console.log("ID:", `"${process.env.RAZORPAY_KEY_ID}"`);
console.log("SECRET:", `"${process.env.RAZORPAY_KEY_SECRET}"`);

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})


exports.createOnlineOrder = async (req, res) => {
  try {
    const { userId, addressId, dtId } = req.body;

    const cart = await CartModel.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });
    if (!cart.items.length) return res.status(400).json({ success: false, error: "Cart is empty" });

    const totalAmount = cart.items.reduce((acc, item) => {
      const price = item.productId?.newPrice || 0;
      return acc + price * item.quantity;
    }, 0);

    if (totalAmount <= 0) {
      return res.status(400).json({ success: false, error: "Invalid order amount" });
    }

    const options = {
      amount: totalAmount * 100,
      currency: process.env.INR,
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpayInstance.orders.create(options);

    const newOrder = await Payment.create({
      userId,
      address: addressId,
      dt: dtId,
      items: cart.items.map((i) => ({
        productId: i.productId._id,
        quantity: i.quantity,
        price: i.productId.newPrice,
      })),
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
      paymentStatus: "Pending",
    });

    await CartModel.findOneAndUpdate({ userId }, { items: [] });

    res.json({ success: true, razorpayOrder, order: newOrder });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "Completed", paymentId: razorpay_payment_id },
        { new: true }
      );
      return res.json({ success: true, message: "Payment verified & order updated" });
    } else {
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: "Failed" }
      );
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error("Payment verification failed:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
exports.createCODOrder = async (req, res) => {
  try {
    const { userId, addressId, dtId } = req.body;

    const cart = await CartModel.findOne({ userId }).populate("items.productId");
    if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });
    if (!cart.items.length) return res.status(400).json({ success: false, error: "Cart is empty" });

    const totalAmount = cart.items.reduce((acc, item) => {
      const price = item.productId?.newPrice || 0;
      return acc + price * item.quantity;
    }, 0);

    const newOrder = await Payment.create({
      userId,
      address: addressId,
      dt: dtId,
      items: cart.items.map((i) => ({
        productId: i.productId._id,
        quantity: i.quantity,
        price: i.productId.newPrice,
      })),
      totalAmount,
      paymentStatus: "Pending",
      paymentId: null,
      razorpayOrderId: null,
    });

    await CartModel.findOneAndUpdate({ userId }, { items: [] });

    res.json({ success: true, order: newOrder });
  } catch (err) {
    console.error("Error creating COD order:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await Payment.find({ userId })
      .populate("items.productId", "name newPrice image")
      .populate("address", "houseNo street city pincode")
      .populate("dt", "date time")
      .sort({ createdAt: -1 });

    res.json({ success: true, payments });
  } catch (err) {
    console.error("Error fetching user payments:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
