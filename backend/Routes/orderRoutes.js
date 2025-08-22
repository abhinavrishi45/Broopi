const express = require('express');
const router = express.Router();
const { createOrder, getOrdersByUser } = require("../Controllers/orderController");

router.post("/orders", createOrder);
router.get("/orders/:userId", getOrdersByUser);

module.exports = router;