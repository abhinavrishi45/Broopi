const express = require("express");
const router = express.Router();

const {
  createOnlineOrder,
  verifyPayment,
  createCODOrder,
  getUserPayments
} = require("../Controllers/paymentControllers");

router.post("/online", createOnlineOrder);
router.post("/verify", verifyPayment);
router.post("/cod", createCODOrder);
router.get("/history/:userId", getUserPayments);

module.exports = router;