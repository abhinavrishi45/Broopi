import React, { useState } from "react";

const Payment = ({ show, onClose, onSave }) => {
  const [method, setMethod] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  if (!show) return null;

  const handleSubmit = () => {
    let data = { method };

    if (method === "UPI") data.upiId = upiId;
    if (method === "Card") data = { ...data, cardNumber, expiry, cvv };

    onSave(data);
  };

  return (
  
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white w-4/5 max-w-3xl h-[80vh] rounded-2xl shadow-lg p-12 overflow-hidden">
        <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>

        {/* Payment Options */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="COD"
              onChange={(e) => setMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) => setMethod(e.target.value)}
            />
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
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) => setMethod(e.target.value)}
            />
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
        </div>

        {/* Actions */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
