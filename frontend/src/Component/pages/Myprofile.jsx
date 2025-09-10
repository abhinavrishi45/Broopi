import React, { useState, useEffect } from "react";
import axios from "axios";

const Myprofile = () => {
  const [orders, setOrders] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const userId = storedUser?.id || storedUser?._id;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.warn("No userId found in localStorage");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:5000/api/payment/history/${userId}`
        );
        console.log("Orders API Response:", res.data);

        if (res.data.success) {
          setOrders(res.data.orders || []); 
        } else {
          setError("Failed to load orders");
        }
      } catch (err) {
        console.error("Fetch orders error:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="px-8 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Orders</h2>

      {/* Loading state */}
      {loading && <p className="text-gray-500">Loading orders...</p>}

      {/* Error state */}
      {error && !loading && (
        <p className="text-red-500 font-medium">{error}</p>
      )}

      {/* Empty orders */}
      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-500 text-lg">No orders found.</p>
      )}

      {/* Orders table */}
      {!loading && !error && orders.length > 0 && (
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
                const totalItems = order.items?.reduce(
                  (acc, item) => acc + item.quantity,
                  0
                ) || 0;

                const totalPrice = order.items?.reduce(
                  (acc, item) => acc + item.price * item.quantity,
                  0
                ) || 0;

                return (
                  <tr
                    key={order._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-6 font-semibold text-gray-700">
                      {order.orderId || order._id}
                    </td>
                    <td className="py-3 px-6 text-gray-600">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "--"}
                    </td>
                    <td className="py-3 px-6 text-gray-700">
                      <ul className="list-disc list-inside text-sm">
                        {order.items?.map((item, idx) => (
                          <li key={idx}>
                            {item.productId?.name || "Product"} ×{" "}
                            {item.quantity}
                          </li>
                        )) || <li>No products</li>}
                      </ul>
                    </td>
                    <td className="py-3 px-6 text-center text-gray-800">
                      {totalItems}
                    </td>
                    <td className="py-3 px-6 text-right font-bold text-gray-800">
                      {formatPrice(totalPrice)}
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
