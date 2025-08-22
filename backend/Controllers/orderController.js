const OrderModel = require("../Models/orderModel");
const CartModel = require("../Models/cartModel");
const AllProduct = require('../Models/allproductModel');
const { v4: uuidv4 } = require("uuid");

exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty, cannot place an order."
      });
    }

    const orderId = uuidv4();

    const newOrder = new OrderModel({
      userId,
      items,
      orderId
    });
    await newOrder.save();

    await CartModel.findOneAndUpdate({ userId },
      { $set: { items: [] } },
      { new: true });
    res.json({ success: true, orderId });

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "order Failed" })
  }
};
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("Fetching orders for:", userId); // Debug

    const orders = await OrderModel.find({ userId })
      .populate("items.productId")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error("Order fetch error:", err); // 👈 print exact error
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
};

