import React, { useState, useEffect } from 'react';
import video from '../../assets/herovideo.mp4'
import carte from '../../assets/shopping-cart-cart.png'
import general from '../../assets/GeneralPestControl.png'
import termit from '../../assets/termitControl.png'
import star from '../../assets/star_white.svg'
import axios from 'axios';
import tick from '../../assets/tick.svg'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, addToCart, updateQuantity } from '../../features/cart/cartSlice';

const HomeCleaning = ({ user, onLoginClick }) => {
  const [product, setProduct] = useState([]);
  // const [subcat, setSubcat]= useState([]);
  // const [cart, setCart] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;
  ;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cart, loading } = useSelector((state) => state.cart);
  const [activeMenu, setActiveMenu] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/product/allproducts")
      .then(res => {
        const pestProducts = res.data.filter(
          product => product.category === "HomeCleaning"
        );
        setProduct(pestProducts);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart(userId));
    }
  }, [userId, dispatch]);



  let oldMoney = 0;
  let totalMoney = 0;
  cart?.forEach(item => {
    oldMoney += (item.productId.oldPrice - item.productId.newPrice) * item.quantity;
    totalMoney += item.productId.newPrice * item.quantity;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 lg:px-12">
      <div className="flex-1 border border-gray-200 mt-6 rounded-lg p-4 max-w-full lg:max-w-[70%]">
        <div>
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        <p className="text-2xl md:text-3xl mt-5 font-bold font-serif text-center lg:text-left uppercase">
          Home Cleaning
        </p>

        <div className="flex flex-row mt-3 gap-3 justify-center lg:justify-start">
          <div className="h-7 w-12 rounded flex items-center bg-green-800">
            <img className="h-5 w-5 rounded mx-auto" src={star} alt="" />
            <p className="text-white mr-2 font-bold">0</p>
          </div>
          <p className="text-sm md:text-lg font-bold text-gray-500">0 reviews</p>
        </div>

        <div className="mt-5 space-y-6">
          {product.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md border  border-gray-100 rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start sm:justify-between"
            >
              <div className="flex-1">
                <p className="text-xl font-bold ">{product.name}</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <img className="h-3 w-3 bg-purple-500" src={star} alt="" />
                  <span className="ml-1">(0) 0 reviews</span>
                </div>
                <div className="flex items-center mt-2 gap-3">
                  <p className="font-bold text-lg">₹{product.newPrice}</p>
                  <p className="line-through text-gray-500">
                    ₹{product.oldPrice}
                  </p>
                  <p className="ml-3 text-sm font-medium">{product.time} hrs</p>
                </div>
                <ul className="list-disc ml-4 text-gray-600 mt-3 text-sm">
                  <li>{product.description}</li>
                  <li>60 Days warranty</li>
                </ul>
                <p className="text-purple-600 cursor-pointer text-sm mt-3">
                  Show More
                </p>
              </div>

              <div className="flex flex-col items-center mt-4 sm:mt-0 sm:ml-4">
                <img
                  className="h-32 w-32 object-cover rounded"
                  src={`http://localhost:5000/uploads/allproducts/${product.image}`}
                  alt={product.name}
                />
                <button
                  className="border border-purple-300 rounded-2xl px-4 py-2 mt-3 text-purple-700 font-semibold hover:bg-purple-700 hover:text-white transition"
                  onClick={() => {
                    if (!user) {
                      onLoginClick();
                      return;
                    }
                    dispatch(addToCart({ userId, productId: product._id }))
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

      <div className="w-full lg:w-[30%] mt-10 lg:mt-5 lg:sticky lg:top-4 self-start space-y-6 h-fit">
        <div className="border border-gray-300 rounded-xl p-4">
          <p className="text-lg md:text-xl font-serif text-center">
            Select A Service
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <div
              className="cursor-pointer text-center"
              onClick={() => setActiveMenu(activeMenu === "pest" ? null : "pest")}
            >
              <img
                className="h-16 w-16 md:h-20 md:w-20 mx-auto"
                src={general}
                alt=""
              />
              <p className="text-sm mt-2">Pest Control</p>
            </div>
            <div
              className="cursor-pointer text-center"
              onClick={() =>
                setActiveMenu(activeMenu === "termite" ? null : "termite")
              }
            >
              <img
                className="h-16 w-16 md:h-20 md:w-20 mx-auto"
                src={termit}
                alt=""
              />
              <p className="text-sm mt-2">Termite Control</p>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-4">
          <p className="text-lg md:text-xl font-serif text-center">Your cart</p>
          {loading ? (
            <p className="text-center mt-2">Loading...</p>
          ) : cart.length === 0 ? (
            <div className="text-center mt-3">
              <p>No items in your cart</p>
              <img className="h-16 w-16 mx-auto mt-2" src={carte} alt="" />
            </div>
          ) : (
            <div>
              {cart.map((item, index) => (
                <div
                  key={item.productId?._id || index}
                  className="flex justify-between items-center mt-3"
                >
                  <span className="font-medium text-sm md:text-base">
                    {item.productId.name}
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
                      ₹{item.productId.newPrice * item.quantity}
                    </p>
                    <p className="line-through text-gray-500 text-xs md:text-sm">
                      ₹{item.productId.oldPrice * item.quantity}
                    </p>
                  </div>
                </div>
              ))}

              <hr className="my-4" />
              <div className="flex justify-between items-center text-sm">
                <p className="flex items-center text-gray-700">
                  <img className="h-5 w-5 mr-2" src={tick} alt="" />
                  Amount saved:
                </p>
                <span className="font-bold text-green-600">-₹{oldMoney}</span>
              </div>
              <div className="flex justify-between mt-2 font-medium">
                <p>Total Amount:</p>
                <p className="font-bold">₹{totalMoney}</p>
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
    </div>
  )
}
export default HomeCleaning;

