const Cart = require('../Models/cartModel');

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({ error: "userId and productId required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity: 1 }] });
    } else {
      const item = cart.items.find((i) => i.productId.toString() === productId);
      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.json({
      success: true,
      items: updatedCart.items,
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter((i) => i.productId.toString() !== productId);

    await cart.save();

    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.json({
      success: true,
      items: updatedCart.items,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};
exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body; 

    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    if (action === "increment") {
      item.quantity += 1;
    } else if (action === "decrement") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart.items = cart.items.filter((i) => i.productId.toString() !== productId);
      }
    }

    await cart.save();
    const updatedCart = await Cart.findOne({ userId }).populate("items.productId");

    res.json({
      success: true,
      items: updatedCart.items,
    });
  } catch (error) {
    console.error("Update quantity error:", error);
    res.status(500).json({ error: "Server Error" });
  }
};