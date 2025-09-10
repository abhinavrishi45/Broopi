// const OrderModel = require("../Models/orderModel");
// const CartModel = require("../Models/cartModel");
// const AllProduct = require('../Models/allproductModel');
// const { v4: uuidv4 } = require("uuid");

// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, addressId, dateTimeId, items, totalAmount } = req.body;

//     if (!addressId || !dateTimeId || !items.length) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     const newOrder = await OrderModel.create({
//       userId,
//       address: addressId,
//       dateTime: dt,
//       items,
//       totalAmount,
//       paymentStatus: "pending"
//     });

//     res.json(newOrder);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.getOrdersByUser = async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log("Fetching orders for:", userId);

//     const orders = await OrderModel.find({ userId })
//       .populate("items.productId")
//       .sort({ createdAt: -1 });

//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error("Order fetch error:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch orders" });
//   }
// };
// // exports.createCODOrder = async (req, res) => {
// //   try {
// //     const { userId, address, dt, items, totalamount } = req.body;

// //     if (!totalamount || !items || !items.length) {
// //       return res.status(400).json({ error: "Order details are missing" });
// //     }

// //     const newOrder = new Order({
// //       userId,
// //       address,
// //       dt,
// //       items,
// //       totalamount,
// //       paymentStatus: "Pending",   
// //       paymentId: null,
// //       orderId: `COD-${Date.now()}`
// //     });

// //     await newOrder.save();

// //     res.json({ success: true, order: newOrder });
// //   } catch (error) {
// //     console.error("Error creating COD order:", error);
// //     res.status(500).json({ error: "Internal Server Error", details: error.message });
// //   }
// // };

