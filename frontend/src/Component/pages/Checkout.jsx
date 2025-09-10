import React, { useState, useEffect } from 'react'
import whatsapp from '../../assets/whatsapp.png'
import Addressicon from '../../assets/location_9546463.png'
import timeicon from '../../assets/timeslot.png'
import AddressModal from "./AddressModal";
import DandT from './DandT'
import Payment from './Payment';
import axios from 'axios';

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);
  const [cart, setCart] = useState([]);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  const [showDateModal, setShowDateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSaveAddress = (data) => {
    setSelectedAddress(data);
    setShowModal(false);
  };
  const handleSaveDateTime = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/dt/savedt", {
        userId,
        date: data.date,
        time: data.time
      });
      setSelectedDateTime(res.data.booking);
      setShowDateModal(false);
    } catch (err) {
      console.error("Error saving date & time:", err.response?.data || err.message);
    }
  };

  const handleSavePayment = (data) => {
    setSelectedPayment(data);
    setShowPaymentModal(false);
  };

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => setCart(res.data.items || []))
      .catch((err) => console.error("Error fetching cart:", err));
  }, [userId]);

  useEffect(() => {
    const fetchSelectedAddress = async (address) => {
      try {
        const { data } = await axios.post("http://localhost:5000/api/address/select", {
          userId,
          addressId: address._id,
        });
        if (data.address) setSelectedAddress(data.address);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    if (userId) fetchSelectedAddress();
  }, [userId]);


  // COMPLETE ORDER
  // const handleCompleteButton = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/orders", {
  //       userId,
  //       items: cart,
  //       address: selectedAddress,
  //       slot: selectedDateTime,
  //       payment: selectedPayment,
  //     });
  //     if (res.data.success) {
  //       alert(`Order placed successfully! Your OrderID: ${res.data.orderId}`);
  //     } else {
  //       alert("Something went wrong while placing the order!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("Payment failed. Try again.");
  //   }
  // };

  return (
    <div className="flex gap-10 justify-center items-start">
      <div className="flex flex-col ml-40 w-150 mt-10 rounded-lg sticky top-5 h-fit overflow-hidden">

        <div className="flex border border-gray-300 rounded-xl px-7 py-4">
          <img className="w-10 h-10" src={whatsapp} alt="" />
          <div className="flex flex-col ml-8 font-semibold">
            <p>Send booking details to</p>
            <p>+91 95724528XX</p>
          </div>
        </div>

        <div className="flex border border-gray-300 rounded px-7 py-4 mt-5">
          <img className="w-10 h-10" src={Addressicon} alt="Address icon" />
          <div className="flex flex-col ml-8 font-semibold w-full">
            {!selectedAddress ? (
              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-3 w-full bg-purple-500 rounded-lg cursor-pointer text-white/90"
              >
                Select Address
              </button>
            ) : (
              <div className="text-sm font-semibold text-black">
                <p>
                  {selectedAddress.name} , {selectedAddress.house},
                </p>
                <p>
                  {selectedAddress.street}-{selectedAddress.landmark}
                </p>
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-2 text-purple-500 hover:underline text-sm"
                >
                  Change Address
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex border border-gray-300 rounded px-7 py-4 mt-5">
          <img className="w-10 h-10" src={timeicon} alt="" />
          <div className="flex flex-col ml-8 font-semibold">
            {!selectedDateTime ? (
              <button
                onClick={() => setShowDateModal(true)}
                className="px-6 w-120 py-3 bg-purple-500 rounded-lg cursor-pointer text-white/90"
              >
                Select Date & Time
              </button>
            ) : (
              <div className="text-sm font-semibold text-black">
                <p>{selectedDateTime.date} - {selectedDateTime.time}</p>
                <button
                  onClick={() => setShowDateModal(true)}
                  className="mt-2 text-purple-500 hover:underline text-sm"
                >
                  Change Slot
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex border border-gray-300 rounded-xl px-7 py-4 mt-5">
          <p className="w-10 h-10 text-3xl">💵</p>
          <div className="flex flex-col ml-8 font-semibold">
            {!selectedPayment ? (
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-6 w-120 py-3 bg-purple-500 rounded-lg cursor-pointer text-white/90"
              >
                Select Payment Method
              </button>
            ) : (
              <div className="text-sm font-normal text-gray-600">
                <p>Payment via {selectedPayment}</p>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="mt-2 text-blue-500 hover:underline text-sm"
                >
                  Change Payment
                </button>
              </div>
            )}
          </div>
        </div>
        {/* <div>
          <button
            className="bg-purple-500 text-white w-40 p-2 rounded ml-25 cursor-pointer"
            onClick={handleCompleteButton}
          >
            Complete Payment
          </button>
        </div> */}
        <div className="mt-10">
          <h2 className="text-2xl ml-5 font-semibold">Cancellation policy</h2>
          <p className="ml-5 mt-3 text-gray-500"> Free cancellations if done more than 12 hrs before the service or
            if a professional isn’t assigned. A fee will be charged otherwise. </p>
          <p className="ml-5 mt-5 text-lg">Read Full Policy</p>
        </div>

        <AddressModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveAddress}
          setSelectedAddress={setSelectedAddress}
        />
        <DandT
          show={showDateModal}
          onClose={() => setShowDateModal(false)}
          onSave={handleSaveDateTime}
        />
        <Payment
          show={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSave={handleSavePayment}
          userId={userId}
          addressId={selectedAddress?._id}
          dtId={selectedDateTime?._id}
          cartItems={cart}
          totalAmount={cart.reduce(
            (acc, item) => acc + item.quantity * item.productId.newPrice,
            0
          )}
        />

      </div>
      <div className="mt-10 w-110 h-[90vh] overflow-y-auto scrollbar-hide pr-2 mb-20">
        {cart.map((item, index) => (
          <div
            key={item.productId?._id || index}
            className="border border-gray-300 mt-5 flex items-center justify-between p-3 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <img
                className="h-8 w-8 rounded"
                src={`http://localhost:5000/uploads/allproducts/${item.productId.image}`}
                alt=""
              />
              <p className="font-semibold">{item.productId.name}</p>
            </div>

            <div className="flex items-center gap-6">
              <p className="text-purple-500 font-semibold min-w-[30px] text-center">
                {item.quantity}
              </p>
              <p className="font-semibold min-w-[80px] text-right">
                ₹{item.quantity * item.productId.newPrice}
              </p>
            </div>
          </div>
        ))}

        <div className="border border-gray-300 mt-10 w-full flex p-5 rounded-lg gap-5">
          <p>Coupons and Offers</p>
          <p>Offers</p>
          <p>\</p>
        </div>

        <div className="border border-gray-300 mt-10 w-full flex flex-col p-5 rounded-lg gap-2">
          <p className="text-xl font-semibold">Payment Summary</p>
          <p>Item Total</p>
          <p>Visitation Fee</p>
          <p>Tip</p>
          <p>Taxes and Fee</p>
          <hr className="bg-gray-300 w-full h-[1px]" />
          <p>Total Amount</p>
          <hr className="bg-gray-300 w-full h-[1px]" />
          <p>Amount to Pay</p>
          <hr className="bg-gray-300 w-full h-[1px] mt-2" />

          <p>Add a Tip to thank the professional</p>
          <div className="flex gap-6">
            <button className="border border-gray-200 rounded-lg py-2 px-5">
              ₹50
            </button>
            <button className="border border-gray-200 rounded-lg py-2 px-5">
              ₹75
            </button>
            <button className="border border-gray-200 rounded-lg py-2 px-5">
              ₹100
            </button>
            <input
              placeholder="Custom"
              type="number"
              className="border border-gray-200 rounded-lg py-2 px-2 w-22"
            />
          </div>

          <p>Add this tip automatically to future orders</p>
          <p>100% of the tip goes to the professional.</p>
        </div>
      </div>
    </div>

  )
}

export default Checkout
