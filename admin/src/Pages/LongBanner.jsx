import React, { useEffect, useState } from "react";
import axios from "axios";

const LongBanner = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showcard, setShowcard] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [category, setCategory] = useState("");

  const categoryOptions = [
    "PestControlling",
    "BathroomCleaning",
    "HomeCleaning",
    "ACService",
    "Plumber",
    "Electrician"
  ];

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!image || !category) return alert("Please select an image and enter category");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("category", category);

    try {
      await axios.post("http://localhost:5000/api/LongBanner", formData, {

        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      setPreview(null);
      setCategory("")
      fetchProduct();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
  const fetchProduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/LongBanner");
      setShowcard(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/LongBanner/${id}`);
      setShowcard((prev) => prev.filter((card) => card._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  const handleUpdate = async (id) => {
    if (!editImage) return alert("Please select an image first");

    const formData = new FormData();
    formData.append("image", editImage);

    try {
      await axios.put(`http://localhost:5000/api/LongBanner/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditId(null);
      setEditImage(null);
      fetchProduct();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-5 rounded">
      <div className="flex flex-row bg-purple-200 gap-10 p-5 rounded items-center">
        <input type="file" accept="image/*" className="border border-gray-500 ml-10 p-2 rounded" onChange={handleFileChange} />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-2 py-2 rounded "
        >
          <option value="">Select Category</option>
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-120 h-40 object-cover rounded-md"
          />
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 ml-10 rounded-md"
        >
          Upload
        </button>
      </div>
      <div className="grid grid-row-2 md:grid-row-4 gap-4">
        {showcard.map((card) => (
          <div
            key={card._id}
            className="bg-white p-2 rounded shadow flex flex-row gap-2 items-center w-120"
          >
            <img
              src={`http://localhost:5000/uploads/LongBanner/${card.image}`}
              alt={card.image}
              className="w-120 h-40 object-cover rounded-md"
            />
            <p className="ml-5">{card.category}</p>
            <button
              onClick={() => handleDelete(card._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>
            {editId === card._id ? (
              <div className="flex flex-col gap-2 items-center">
                <input type="file" accept="image/*" onChange={handleEditFileChange} />
                <button
                  onClick={() => handleUpdate(card._id)}
                  className="bg-green-600 text-white px-3 py-1 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditId(card._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md"
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongBanner;
