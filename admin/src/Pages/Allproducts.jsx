import React, { useState, useEffect } from "react";
import axios from "axios";

const Allproducts = () => {
  const [categories, setCategories] = useState([]); 
  const [subcategories, setSubcategories] = useState([]);
  const [showproduct, setShowproduct] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    time: "",
    newPrice: "",
    oldPrice: "",
    image: null,
    description: "",
    description1: ""
  });
  const [editingId, setEditingId] = useState(null);
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/subcategory/${categoryId}`
      );
      setSubcategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchHomeproduct = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/product/allproducts"
      );
      setShowproduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHomeproduct();
    fetchCategories();
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
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/product/allproducts/${editingId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Product updated successfully");
      } else {
        await axios.post("http://localhost:5000/api/product/allproducts", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product uploaded successfully");
      }

      setFormData({
        name: "",
        category: "",
        subcategory: "",
        time: "",
        newPrice: "",
        oldPrice: "",
        image: null,
        description: "",
        description1: "",
      });
      setEditingId(null);
      fetchHomeproduct();
    } catch (err) {
      console.error(err);
      alert(editingId ? "Update failed" : "Upload failed");
    }
  };

  const deleteHomeproduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/allproducts/${id}`);
      setShowproduct((prev) => prev.filter((item) => item._id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      category: product.category?._id || product.category,
      subcategory: product.subcategory?._id || product.subcategory,
      time: product.time,
      newPrice: product.newPrice,
      oldPrice: product.oldPrice,
      image: null,
      description: product.description,
      description1: product.description1
    });
    setEditingId(product._id);
    fetchSubcategories(product.category?._id || product.category);
  };

  return (
    <div>
      <p className="text-center text-xl mt-10 font-semibold font-serif">
        This is the All-product page where Admin can upload or edit home
        products and access Category
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
            <select
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="category"
              value={formData.category}
              onChange={(e) => {
                setFormData({ ...formData, category: e.target.value, subcategory: "" });
                fetchSubcategories(e.target.value);
              }}
              required
            >
              <option value="">-- Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <br />

            <select
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              disabled={!formData.category}
              required
            >
              <option value="">-- Sub-category --</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
            <br />

            <input
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="time"
              type="time"
              placeholder="Time details"
              value={formData.time}
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

            <textarea
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <br />
            <textarea
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="description1"
              placeholder="Description"
              value={formData.description1}
              onChange={handleChange}
              required
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

      <div className="grid grid-cols-3 gap-5 justify-center mt-10">
        {showproduct.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 rounded shadow-md overflow-hidden w-70"
          >
            <img
              src={`http://localhost:5000/uploads/allproducts/${product.image}`}
              alt={product.name}
              className="w-full h-60 object-cover"
            />
            <p className="text-xl font-bold ml-1">{product.name}</p>
            <p className="font-semibold ml-1">
              {product.category?.name || product.category}
            </p>
            <p className="font-semibold ml-1">
              {product.subcategory?.name || product.subcategory}
            </p>
            <p className="font-semibold ml-1">{product.time}</p>
            <p className="font-bold ml-2">₹ {product.newPrice}</p>
            <p className="line-through ml-3 mb-2">₹ {product.oldPrice}</p>
            <p className="font-semibold ml-2">{product.description}</p>
            <p className="font-semibold ml-2">{product.description1}</p>

            <div className="flex justify-center mt-5 gap-5 mb-5">
              <button
                className="w-25 h-10 border rounded bg-purple-200 cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out"
                onClick={() => handleEditClick(product)}
              >
                Edit
              </button>
              <button
                className="w-25 h-10 border rounded bg-red-200 cursor-pointer hover:scale-102 transition-transform duration-300 ease-in-out"
                onClick={() => deleteHomeproduct(product._id)}
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

export default Allproducts;
