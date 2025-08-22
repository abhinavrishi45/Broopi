import React, { useState, useEffect } from "react";
import axios from "axios";

const Allproducts = () => {
  // const [category, setCategory] = useState("");
  const [subcategory, setsubCategory] = useState("");
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
  });
  const [editingId, setEditingId] = useState(null);
  const categoryOptions = {
    PestControlling: ["General Pest Control", "Termite Control"],
    BathroomCleaning: ["Premium", "Basic"],
    HomeCleaning: ["Furnished apartment (Basic)", "Furnished apartment (Premium)", "UnFurnished apartment (Basic)", "UnFurnished apartment (Basic)", "Furnished Bungalow(Basic)", "Furnished Bungalow(Premium)"],
    ACService: ["Ac-Service", "Ac Installation & Unistallation", "AcRepair & Gas refill"],
    Plumber: ["Residential", "Commercial", "Industrial"],
    Electrician: ["Service", "Construction Electricians", "Maintenance Electricians"]
  }

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
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("time", formData.time);
    data.append("newPrice", formData.newPrice);
    data.append("oldPrice", formData.oldPrice);
    data.append("description", formData.description);

    // Append image only if selected
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/product/allproducts/${editingId}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Product updated successfully");
      } else {
        await axios.post(
          "http://localhost:5000/api/product/allproducts",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
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
      alert("Homeproduct deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      time: product.time,
      newPrice: product.newPrice,
      oldPrice: product.oldPrice,
      image: null,
      description: product.description
    });
    setEditingId(product._id);
  };

  return (
    <div>
      <p className="text-center text-xl mt-10 font-semibold font-serif">
        This is the All-product page where Admin can upload or edit home products and access Category
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
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => {
                // setCategory(e.target.value);
                setFormData({ ...formData, category: e.target.value });
                // handleChange;
                setsubCategory("")
              }}
              required
            >
              <option>-- Category --</option>
              {Object.keys(categoryOptions).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <br />
            <select
              className="bg-white ml-4 p-2 rounded mt-8 w-120 border"
              name="Subcategory"
              type="text"
              placeholder="subCategory"
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({ ...formData, subcategory: e.target.value })
              }
              disabled={!formData.category}
              required
            >
              <option value="">-- Sub-category --</option>
              {formData.category && categoryOptions[formData.category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
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
            <input
              className="bg-white ml-4 p-2 rounded mt-8 w-120 h-30 border"
              name="description"
              type="text"
              placeholder="Description"
              value={formData.description}
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
            <p className="font-semibold ml-1">{product.category}</p>
            <p className="font-semibold ml-1">{product.subcategory}</p>
            <p className="font-semibold ml-1">{product.time}</p>
            <p className="font-bold ml-2">₹ {product.newPrice}</p>
            <p className="line-through ml-3 mb-2">₹ {product.oldPrice}</p>
            <p className="font-bold ml-2"> {product.description}</p>

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
