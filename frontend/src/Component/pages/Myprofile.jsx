import React, { useState, useEffect } from "react";
import axios from "axios";

const Myprofile = () => {
  const [orders, setOrders] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.warn("No userId found in localStorage");
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${userId}`);
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (error) {
        console.error(error);
        alert("Failed to Fetch Orders");
      }
    };

    fetchOrders();
  }, [userId]);

  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-2xl border border-gray-200">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Products</th>
                <th className="py-3 px-6 text-center">Total Items</th>
                <th className="py-3 px-6 text-right">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const totalItems = order.items.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                );
                const totalPrice = order.items.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                );

                return (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-6 font-semibold text-gray-700">
                      {order.orderId}
                    </td>
                    <td className="py-3 px-6 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-gray-700">
                      <ul className="list-disc list-inside text-sm">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.productId?.name || "Product"} ×{" "}
                            {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="py-3 px-6 text-center text-gray-800">
                      {totalItems}
                    </td>
                    <td className="py-3 px-6 text-right font-bold text-gray-800">
                      ₹{totalPrice}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Myprofile;
