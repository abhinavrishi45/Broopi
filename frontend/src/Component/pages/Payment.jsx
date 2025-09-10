import React, { useState } from "react";
import axios from "axios";

const Payment = ({ show, onClose, onSave, userId, addressId, dtId }) => {
  const [method, setMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!show) return null;
  const handleRazorpayPayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/online", {
        userId,
        addressId,
        dtId,
      });

      console.log("Order Response:", data);

      if (!data.success) return alert("Something went wrong!");

      const { razorpayOrder } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
              ...response,
            });

            if (verifyRes.data.success) {
              alert("Payment Successful ");
              onSave({
                method: "Razorpay",
                paymentId: response.razorpay_payment_id,
                orderId: razorpayOrder.id,
              });
              onClose();
            } else {
              alert("Payment Verification Failed ");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            alert("Error verifying payment!");
          }
        },
        prefill: {
          name: "Abhinav",
          email: "abhinav@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in Razorpay Payment:", error);
      alert("Something went wrong!");
    }
  };

  const handleSubmit = async () => {
    try {
      if (method === "COD") {
        const res = await axios.post("http://localhost:5000/api/payment/cod", {
          userId,
          addressId,
          dtId,
        });

        if (res.data.success) {
          alert("COD Order Placed Successfully ");
          onSave({ method: "COD", orderId: res.data.order._id });
          onClose();
        }
      } else if (method === "UPI") {
        if (!upiId) return alert("Enter UPI ID!");
        onSave({ method: "UPI", upiId });
        onClose();
      } else if (method === "Card") {
        if (!cardNumber || !expiry || !cvv) return alert("Enter all card details!");
        onSave({ method: "Card", cardNumber, expiry });
        onClose();
      }
    } catch (error) {
      console.error("Error in order:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white w-4/5 max-w-3xl h-[80vh] rounded-2xl shadow-lg p-8 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="COD" onChange={(e) => setMethod(e.target.value)} />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="UPI" onChange={(e) => setMethod(e.target.value)} />
            UPI
          </label>
          {method === "UPI" && (
            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="border rounded p-2 w-full"
            />
          )}

          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="Card" onChange={(e) => setMethod(e.target.value)} />
            Card (Credit/Debit)
          </label>
          {method === "Card" && (
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="border rounded p-2 w-full"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  className="border rounded p-2 w-1/2"
                />
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  className="border rounded p-2 w-1/2"
                />
              </div>
            </div>
          )}

          <label className="flex items-center gap-2">
            <input type="radio" name="payment" value="Razorpay" onChange={(e) => setMethod(e.target.value)} />
            Pay with Razorpay
          </label>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Cancel
          </button>

          {method === "Razorpay" ? (
            <button onClick={handleRazorpayPayment} className="px-4 py-2 bg-purple-500 text-white rounded-lg">
              Pay with Razorpay
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-4 py-2 bg-purple-500 text-white rounded-lg">
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
