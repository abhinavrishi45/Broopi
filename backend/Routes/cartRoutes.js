const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateQuantity } = require("../Controllers/cartControllers")

router.get("/:userId", getCart);
router.post("/add", addToCart);
router.patch("/update", updateQuantity);
router.delete("/remove/:userId/:productId", removeFromCart);

module.exports = router;