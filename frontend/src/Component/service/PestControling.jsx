import React, { useState, useEffect } from "react";
import carte from "../../assets/shopping-cart-cart.png";
import star from "../../assets/star_white.svg";
import axios from "axios";
import tick from "../../assets/tick.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  addToCart,
  updateQuantity,
} from "../../features/cart/cartSlice";

const PestControling = ({ user, onLoginClick }) => {
  const [products, setProducts] = useState([]);
  const [subcat, setSubcat] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [video, setVideo] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cart, loading } = useSelector((state) => state.cart);

  // Fetch products + subcategories (filtered by Pest Controlling)
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/allproducts")
      .then((res) => {
        const pestProducts = res.data.filter(
          (p) => p.category?.name === "Pest Controlling"
        );
        setProducts(pestProducts);
      })
      .catch((err) => console.error("Error fetching products:", err));

    axios
      .get("http://localhost:5000/api/subcategory")
      .then((res) => {
        const filtered = res.data.filter(
          (sub) => sub.category?.name === "Pest Controlling"
        );
        setSubcat(filtered);
      })
      .catch((err) => console.error("Error fetching subcategories:", err));
  }, []);

  // Fetch cart for logged-in user
  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId, dispatch]);

  // Saved & total amount
  const savedAmount = cart?.reduce((acc, item) => {
    const oldP = Number(item.productId?.oldPrice) || 0;
    const newP = Number(item.productId?.newPrice) || 0;
    return acc + (oldP - newP) * item.quantity;
  }, 0);

  const totalAmount = cart?.reduce((acc, item) => {
    const newP = Number(item.productId?.newPrice) || 0;
    return acc + newP * item.quantity;
  }, 0);

  useEffect(() => {
    if (selectedProduct?._id) {
      axios
        .get(`http://localhost:5000/api/reviews/${selectedProduct._id}`)
        .then((res) => {
          setAvgRating(res.data.avgRating || 0);
          setRatingCount(res.data.ratingCount || 0);
        })
        .catch((err) => console.error("Error fetching rating:", err));
    }
  }, [selectedProduct]);

  const handleRating = async (value) => {
    if (!selectedProduct || !userId) return;
    setRating(value);
    try {
      const res = await axios.post("http://localhost:5000/api/reviews", {
        productId: selectedProduct._id,
        userId,
        rating: value,
      });
      setAvgRating(res.data.avgRating);
      setRatingCount(res.data.ratingCount);
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };
  const fetchVideo = async () => {
     try {
      const res = await axios.get("http://localhost:5000/api/videos");
      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 lg:px-12">
      <div className="flex-1 border border-gray-200 mt-6 rounded-lg p-4 max-w-full lg:max-w-[70%]">

        {video.map((vid) => (
          <div  key={vid._id}>
            <video
              src={`http://localhost:5000${vid.videoUrl}`}
              autoPlay
              loop
              muted
              playsInline
              className="rounded-lg w-full h-auto object-cover"
            />

          </div>
        ))}

        <p className="text-2xl md:text-3xl mt-5 font-bold font-serif text-center lg:text-left">
          PEST CONTROLLING
        </p>

        <div className="flex flex-row mt-3 gap-3 justify-center lg:justify-start">
          <div className="h-7 w-12 rounded flex items-center bg-green-800">
            <img className="h-5 w-5 rounded mx-auto" src={star} alt="star" />
            <p className="text-white mr-2 font-bold">0</p>
          </div>
          <p className="text-sm md:text-lg font-bold text-gray-500">0 reviews</p>
        </div>

        <div className="mt-5 space-y-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-md border border-gray-100 rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between"
            >
              <div className="flex-1">
                <p className="text-xl font-bold">{p.name}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <img className="h-3 w-3" src={star} alt="star" />
                  <span className="ml-1">(0) 0 reviews</span>
                </div>
                <div className="flex items-center mt-2 gap-3">
                  <p className="font-bold text-lg">₹{p.newPrice}</p>
                  <p className="line-through text-gray-500">₹{p.oldPrice}</p>
                  <p className="ml-3 text-sm font-medium">{p.time} hrs</p>
                </div>
                <ul className="list-disc ml-4 text-gray-600 mt-3 text-sm">
                  <li>{p.description}</li>
                  <li>{p.description1}</li>
                </ul>
                <p
                  onClick={() => setSelectedProduct(p)}
                  className="text-purple-600 cursor-pointer text-sm mt-3"
                >
                  Show More
                </p>
              </div>
              <div className="flex flex-col items-center mt-4 sm:mt-0 sm:ml-4">
                <img
                  className="h-32 w-32 object-cover rounded"
                  src={`http://localhost:5000/uploads/allproducts/${p.image}`}
                  alt={p.name}
                />
                <button
                  className="border border-purple-300 rounded-2xl px-4 py-2 mt-3 text-purple-700 font-semibold hover:bg-purple-700 hover:text-white transition"
                  onClick={() => {
                    if (!user) {
                      onLoginClick();
                      return;
                    }
                    dispatch(addToCart({ userId, productId: p._id }))
                      .unwrap()
                      .catch((err) => {
                        alert(err);
                      });
                  }}
                >
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right section (Subcategories + Cart) */}
      <div className="w-full lg:w-[30%] mt-10 lg:mt-5 lg:sticky lg:top-4 self-start space-y-6 h-fit">
        {/* Subcategories */}
        <div className="border border-gray-300 rounded-xl p-4">
          <p className="text-lg md:text-xl font-serif text-center">
            Select A Service
          </p>
          <div className="flex justify-center gap-6 mt-4 flex-wrap">
            {subcat.map((subcategory) => (
              <div
                key={subcategory._id}
                className="cursor-pointer text-center hover:scale-105 transition-transform"
              >
                <img
                  className="h-16 w-16 md:h-20 md:w-20 mx-auto rounded-lg object-cover"
                  src={`http://localhost:5000/uploads/subCategory/${subcategory.image}`}
                  alt={subcategory.name}
                />
                <p className="text-sm mt-2">{subcategory.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart */}
        <div className="border border-gray-300 rounded-xl p-4">
          <p className="text-lg md:text-xl font-serif text-center">Your cart</p>
          {loading ? (
            <p className="text-center mt-2">Loading...</p>
          ) : cart.length === 0 ? (
            <div className="text-center mt-3">
              <p>No items in your cart</p>
              <img className="h-16 w-16 mx-auto mt-2" src={carte} alt="cart" />
            </div>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div
                  key={item.productId?._id || index}
                  className="flex justify-between items-center mt-3"
                >
                  <span className="font-medium text-sm md:text-base">
                    {item.productId?.name}
                  </span>
                  <div className="flex gap-2 bg-purple-200 p-1 rounded-lg">
                    <button
                      className="px-2"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            userId,
                            productId: item.productId._id,
                            action: "decrement",
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2"
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            userId,
                            productId: item.productId._id,
                            action: "increment",
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm md:text-base">
                      ₹{item.productId?.newPrice * item.quantity}
                    </p>
                    <p className="line-through text-gray-500 text-xs md:text-sm">
                      ₹{item.productId?.oldPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <hr className="my-4" />
              <div className="flex justify-between items-center text-sm">
                <p className="flex items-center text-gray-700">
                  <img className="h-5 w-5 mr-2" src={tick} alt="tick" />
                  Amount saved:
                </p>
                <span className="font-bold text-green-600">
                  -₹{savedAmount}
                </span>
              </div>
              <div className="flex justify-between mt-2 font-medium">
                <p>Total Amount:</p>
                <p className="font-bold">₹{totalAmount}</p>
              </div>

              <p
                onClick={() => navigate("/cart")}
                className="text-center mt-4 p-2 font-semibold bg-purple-400 text-white cursor-pointer rounded hover:bg-purple-500 transition"
              >
                View Cart
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal (Selected Product) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer text-2xl font-bold"
              onClick={() => setSelectedProduct(null)}
            >
              &times;
            </button>

            <div className="flex flex-row">
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedProduct.name}
                </h2>
                <p className="font-bold text-lg">
                  ₹{selectedProduct.newPrice}
                </p>
                <p className="line-through text-gray-500">
                  ₹{selectedProduct.oldPrice}
                </p>
                <p className="text-sm font-medium">{selectedProduct.time} hrs</p>
              </div>
              <div className="absolute top-8 right-10">
                <img
                  className="h-32 w-32 object-cover rounded"
                  src={`http://localhost:5000/uploads/allproducts/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                />
              </div>
            </div>

            {/* Rating */}
            <div className="flex space-x-1 mt-4">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <button
                    key={starValue}
                    className={`text-3xl ${starValue <= (hover || rating || avgRating)
                        ? "text-yellow-400"
                        : "text-gray-400"
                      }`}
                    onClick={() => handleRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-gray-600">
              {avgRating.toFixed(1)} / 5 ({ratingCount} ratings)
            </p>

            <input
              type="text"
              className="border border-black rounded-lg mt-4 p-2 w-full"
              placeholder="Write a review..."
            />
            <p className="mt-2 text-gray-500">Other's Review</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PestControling;
