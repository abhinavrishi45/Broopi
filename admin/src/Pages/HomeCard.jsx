import React, { useState, useEffect } from "react";
import axios from "axios";

const HomeCard = () => {
  const [showCard, setShowCard] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    newPrice: "",
    oldPrice: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchHomecard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/homecard/homecard"
      );
      setShowCard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHomecard();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/homecard/homecard/${editingId}`,
          data
        );
        alert("Homecard updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/homecard/homecard", data);
        alert("Product uploaded successfully");
      }
      setFormData({
        name: "",
        category: "",
        newPrice: "",
        oldPrice: "",
        image: null,
      });
      setEditingId(null);
      fetchHomecard();
    } catch (err) {
      console.error(err);
      alert(editingId ? "Update failed" : "Upload failed");
    }
  };

  const deleteHomecard = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/homecard/homecard/${id}`);
      setShowCard((prev) => prev.filter((item) => item._id !== id));
      alert("Homecard deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleEditClick = (card) => {
    setFormData({
      name: card.name,
      category: card.category,
      newPrice: card.newPrice,
      oldPrice: card.oldPrice,
      image: null,
    });
    setEditingId(card._id);
  };

  return (
    <div>
      <p className="text-center text-xl mt-10 font-semibold font-serif">
        This is the Home Card page where Admin can upload or edit home cards
      </p>

      <div className="flex justify-center mt-10">
        <div className="p-8 bg-purple-100 border flex justify-center rounded-2xl mt-5">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
              className="bg-white ml-4 p-2 mt-5 rounded w-120 border"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <br />

            <input
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="category"
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <br />

            <input
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="newPrice"
              type="number"
              placeholder="New Price"
              value={formData.newPrice}
              onChange={handleChange}
              required
            />
            <br />

            <input
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="oldPrice"
              type="number"
              placeholder="Old Price"
              value={formData.oldPrice}
              onChange={handleChange}
              required
            />
            <br />

            <input
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              type="file"
              name="image"
              onChange={handleChange}
              {...(!editingId ? { required: true } : {})}
            />
            <br />

            <div className="flex items-center justify-center">
              <button
                className="bg-purple-200 p-2 w-40 rounded cursor-pointer mt-8"
                type="submit"
              >
                {editingId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Cards List */}
      <div className="flex flex-row gap-5 justify-center mt-10">
        {showCard.map((card) => (
          <div
            key={card._id}
            className="bg-gray-100 rounded shadow-md overflow-hidden w-70"
          >
            <img
              src={`http://localhost:5000/uploads/homeCard/${card.image}`}
              alt={card.name}
              className="w-full h-60 object-cover"
            />
            <p className="text-xl font-bold ml-1">{card.name}</p>
            <p className="font-semibold ml-1">{card.category}</p>
            <p className="font-bold ml-2">₹ {card.newPrice}</p>
            <p className="line-through ml-3 mb-2">₹ {card.oldPrice}</p>

            <div className="flex justify-center mt-5 gap-5 mb-5">
              <button
                className="w-25 h-10 border rounded bg-purple-200 cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out"
                onClick={() => handleEditClick(card)}
              >
                Edit
              </button>
              <button
                className="w-25 h-10 border rounded bg-red-200 cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out"
                onClick={() => deleteHomecard(card._id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
