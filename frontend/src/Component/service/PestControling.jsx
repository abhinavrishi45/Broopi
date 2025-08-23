import React, { useState, useEffect } from 'react';
import video from '../../assets/herovideo.mp4'
import carte from '../../assets/shopping-cart-cart.png'
import general from '../../assets/GeneralPestControl.png'
import termit from '../../assets/termitControl.png'
import star from '../../assets/star_white.svg'
import axios from 'axios';
import tick from '../../assets/tick.svg'
import {useNavigate} from 'react-router-dom';

const PestControling = () => {
  const [product, setProduct] = useState([]);
  // const [subcat, setSubcat]= useState([]);
  const [cart, setCart] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;
  ;
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/product/allproducts")
      .then(res => {
        const pestProducts = res.data.filter(
          product => product.category === "PestControlling"
        );
        setProduct(pestProducts);
      })
      .catch(err => console.error(err));
  }, []);

  // useEffect(()=>{
  //    axios.get("http://localhost:5000/api/product/allproducts")
  //     .then(res => {
  //       const subcat = res.data.filter(
  //         subcateg => subcateg.subcategory === "PestControlling"
  //       );
  //       setSubcat(subcat);
  //     })
  //     .catch(err => console.error(err));

  // })
  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => setCart(res.data.items || []))
      .catch((err) => console.error(err));
  }, [userId]);


  const addToCart = async (productId) => {
    if (!userId) {
      alert("Please login to add items to your cart.");
      return;
    }
    try {
      console.log("📦 Sending to backend:", { userId, productId });
      const res = await axios.post("http://localhost:5000/api/cart/add", { userId, productId });
      setCart(res.data.items || []);
    } catch (err) {
      console.error("Add to cart error:", err.response?.data || err.message);
    }
  };
  // const removeFromCart = async (productId) => {
  //   try {
  //     const res = await axios.delete(`http://localhost:5000/api/cart/remove/${userId}/${productId}`);
  //     setCart(res.data.items || []);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }
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

  const [activeMenu, setActiveMenu] = useState(false);
  let oldMoney = 0;
  let totalMoney = 0;
  cart?.forEach(item => {
    oldMoney += (item.productId.oldPrice - item.productId.newPrice) * item.quantity;
    totalMoney += item.productId.newPrice * item.quantity;
  });

  return (
    <div className='flex flex-row'>
      <div className=' border border-gray-200 mt-10 ml-25 rounded py-5 px-7 w-260'>
        <div >
          <video src={video}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-2xl mt-3 ml-1 mb-8" />
        </div>
        <p className='text-3xl font-bold font-serif '>PEST CONTROLLING</p>
        <div className='flex flex-row mt-5 gap-2'>
          <div className='h-7 w-12  rounded flex items-center bg-green-800'>
            <img className='h-5 w-5  rounded mx-auto' src={star} alt="" />
            <p className='text-white mr-2 font-bold'>0</p>
          </div>
          <p className='text-xl font-bold text-gray-500 '>0 reviews</p>
        </div>
        <p className='text-3xl mt-5 font-serif font-bold'>General Pest Control</p>

        <div>
          {product.map((product) => (
            <div key={product._id}>
              <div

                className="mt-5 bg-white shadow-md border border-gray-100 rounded w-245 z-50">
                <div className="py-2">
                  <div className="flex ml-4 justify-between items-start">
                    <div className="px-4 py-1 font-bold text-2xl">
                      {product.name}
                      <div className="flex flex-row items-center mt-2">
                        <img
                          className="bg-purple-800 h-3 w-3 rounded"
                          src={star}
                          alt=""
                        />
                        <p className="ml-1 text-sm text-gray-500 ">(0)0 reviews</p>
                      </div>
                      <div className="flex text-sm flex-row mt-1">
                        <p className="font-bold ">₹{product.newPrice}</p>
                        <p className="ml-3 line-through">₹{product.oldPrice}</p>
                        <p className="ml-5 font-semibold">{product.time} hrs</p>
                      </div>
                      <div className="mt-4 mb-4">
                        <ul className="list-disc ml-4 text-gray-600">
                          <li className="text-sm">{product.description}</li>
                          <li className="text-sm">60Days warranty</li>
                        </ul>
                      </div>
                      <p className="text-purple-600 cursor-pointer text-sm mt-8 mb-5">
                        Show More
                      </p>
                    </div>

                    <div className="flex flex-col items-center mr-15">
                      <img
                        className="h-40 w-40 rounded mt-5 object-cover"
                        src={`http://localhost:5000/uploads/allproducts/${product.image}`}
                        alt={product.name}
                      />
                      <button className="border border-purple-300 rounded-2xl px-5 mt-2 py-2 cursor-pointer text-purple-700 font-semibold hover:bg-purple-700 hover:text-white"
                        onClick={() => addToCart(product._id)}>
                        ADD
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          ))}

        </div>

      </div>
      <div className='fixed left-286 right-15 mx-auto rounded overflow-hidden z-50 max-h-[90vh] overflow-y-auto scrollbar-hide'>
        <div className='flex flex-col border border-gray-300 rounded-xl p-5 ml-4 mr-4 mt-10'>
          <p className='text-xl font-serif text-center'>Select A Service</p>
          <div className='flex flex-row mt-5 gap-5'>
            <div className='cursor-pointer'>
              <img onClick={() =>
                setActiveMenu(activeMenu === 'pest' ? null : 'pest')
              }
                className='h-20 w-20 rounded ' src={general} alt="" />
              <p className='text-sm font-serif'>Pest
                Control</p>
            </div>
            <div className='cursor-pointer'>
              <img onClick={() =>
                setActiveMenu(activeMenu === 'termite' ? null : 'termite')
              }
                className='h-20 w-20 rounded ' src={termit} alt="" />
              <p className='text-sm font-serif'>Termite Control</p>
            </div>
          </div>
        </div>

        <div className='flex flex-col border border-gray-300 rounded-xl p-4 ml-4 mr-4 mt-10 '>
          <p className='text-xl font-serif text-center'>Your cart</p>
          {!cart || cart?.length === 0 ? (
            <>
              <p className='text-center mt-2'>
                No items in your cart  </p>
              <img className='h-20 w-20 mx-auto mt-3 ' src={carte} alt="" />
            </>
          ) : (
            <div>

              {cart?.map((item, index) => (
                // oldMoney += (item.productId.newPrice) * (item.quantity);


                <div key={item.productId?._id || index}
                  className='flex justify-between items-center mt-2'>
                  {/* <span>{item.productId.name}(x{item.quantity}) - ₹{item.productId.newPrice}</span> */}
                  <span className='font-semibold'>{item.productId.name} </span>
                  <div className='flex gap-2 bg-purple-200 p-1.5 rounded-lg'>
                    <button className='cursor-pointer mr-1' onClick={() => updateQuantity(item.productId._id, "decrement")}>-</button>
                    <button >{item.quantity}</button>
                    <button className='cursor-pointer ml-1' onClick={() => updateQuantity(item.productId._id, "increment")}>+</button>
                  </div>
                  {/* <button
                    className="text-red-500 ml-5 "
                    onClick={() => removeFromCart(item.productId._id )}

                  >
                    ❌
                  </button> */}
                  <div className='flex flex-col'>
                    <p className='ml-5 font-semibold'>₹{(item.productId.newPrice) * (item.quantity)}</p>
                    <span className='ml-5 text-gray-500 line-through '>₹{(item.productId.oldPrice) * (item.quantity)}</span>

                  </div>

                </div>
              ))}
              <hr className='bg-gray-300 w-full h-1.5 mt-5 rounded text-white'></hr>
              
              <div className="flex flex-row mt-5">
                <img className="h-7 w-7 bg-gray-300 rounded-full p-1 " src={tick} alt="" />
                <p className="ml-2 text-gray-700">Amount saved so far!</p>
                <span className="ml-8 font-bold text-green-600 ">-₹{oldMoney}</span>
              </div>
              <div className='flex flex-row mt-2'>
              <p>Total Amount :</p>
              <p className='ml-31 font-bold'>₹{totalMoney}</p>
              </div>
              <hr className='bg-gray-300 w-full h-1.5 mt-5 rounded text-white'></hr>

              
              <p onClick={()=>navigate('/cart')} className='text-center p-2 font-semibold bg-purple-400 text-white cursor-pointer mt-2 rounded'>View Cart</p>


            </div>
          )}
        </div>
      </div>
    </div >
  )
}

export default PestControling