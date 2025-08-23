import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import carte from "../../assets/shopping-cart-cart.png";
import tick from "../../assets/tick.svg";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => setCart(res.data.items || []))
      .catch((err) => console.error("Error fetching cart:", err));
  }, [userId]);

  const removeFromCart = async (productId) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/cart/remove/${userId}/${productId}`
      );
      setCart(res.data.items || []);
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId, action) => {
    if (!userId) {
      alert("Please Login to update Cart.");
      return;
    }
    try {
      const res = await axios.patch("http://localhost:5000/api/cart/update", {
        userId,
        productId,
        action,
      });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("update quantity error:", err.response?.data || err.message);
    }
  };

  let savedMoney = 0;
  let totalMoney = 0;
  cart?.forEach((item) => {
    savedMoney +=
      (item.productId.oldPrice - item.productId.newPrice) * item.quantity;
    totalMoney += item.productId.newPrice * item.quantity;
  });

  return (
    <div className="flex flex-col mt-10 items-center px-5">
      {!cart || cart.length === 0 ? (
        <div className="text-center">
          <img className="h-28 w-28 mx-auto" src={carte} alt="empty cart" />
          <p className="text-2xl font-serif mt-3">
            Your BROOPI cart looks empty 🥺
          </p>
          <p className="text-xl text-gray-500 font-serif mt-2">
            Add some items to your cart
          </p>
          <button
            className="py-2 px-5 mt-5 border rounded-xl border-gray-300 text-xl text-purple-400 cursor-pointer hover:text-black transition"
            onClick={() => navigate("/")}
          >
            Explore BROOPI
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          {cart.map((item, index) => (
            <div
              key={item.productId?._id || index}
              className="flex justify-between items-center bg-white shadow-md p-3 rounded-lg mt-2"
            >
              <img
                className="h-20 w-20 object-cover rounded-md"
                src={`http://localhost:5000/uploads/allproducts/${item.productId.image}`}
                alt=""
              />
              {/*<p>{item.productId.catgory}</p> */}
              <span className="font-semibold w-50">
                {item.productId.name}
              </span>

              <div className="flex gap-2 bg-purple-200 px-2 py-1 rounded-lg">
                <button
                  className="cursor-pointer font-bold text-lg"
                  onClick={() =>
                    updateQuantity(item.productId._id, "decrement")
                  }
                >
                  -
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  className="cursor-pointer font-bold text-lg"
                  onClick={() =>
                    updateQuantity(item.productId._id, "increment")
                  }
                >
                  +
                </button>
              </div>

              <div className="flex flex-col items-end">
                <p className="font-semibold">
                  ₹{item.productId.newPrice * item.quantity}
                </p>
                <span className="text-gray-500 line-through text-sm">
                  ₹{item.productId.oldPrice * item.quantity}
                </span>
                <button
                  className="text-red-500 text-sm mt-1 hover:underline"
                  onClick={() => removeFromCart(item.productId._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <hr className="bg-gray-300 w-full h-1.5 mt-5 rounded" />

          <div className="flex items-center mt-5">
            <img
              className="h-7 w-7 bg-gray-300 rounded-full p-1"
              src={tick}
              alt="tick"
            />
            <p className="ml-2 text-gray-700">Amount saved so far!</p>
            <span className="ml-8 font-bold text-green-600">
              -₹{savedMoney}
            </span>
          </div>

          <div className="flex flex-row mt-3 justify-between font-medium text-lg">
            <p>Total Amount :</p>
            <p className="font-bold">₹{totalMoney}</p>
          </div>

          <hr className="bg-gray-300 w-full h-1.5 mt-5 rounded" />

          <button
            className="w-full mt-5 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold text-lg transition cursor-pointer"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
