import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [editName, setEditName] = useState("");
  const [editLink, setEditLink] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!image || !name) return alert("Please enter category name and select image");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("link", link);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/category", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setName("");
      setLink("");
      setImage(null);
      setPreview(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/category/${id}`);
      setCategories((prev) => prev.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Handle edit image change
  const handleEditFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditImage(e.target.files[0]);
    }
  };

  // Update category
  const handleUpdate = async (id) => {
    const formData = new FormData();
    if (editImage) formData.append("image", editImage);
    formData.append("name", editName);
    formData.append("link", editLink);

    try {
      await axios.put(`http://localhost:5000/api/category/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditId(null);
      setEditImage(null);
      setEditName("");
      setEditLink("");
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-5 rounded">

      <div className="flex flex-row bg-purple-200 gap-6 p-5 rounded items-center">
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Category Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="w-40 h-24 object-cover rounded-md"
          />
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Upload
        </button>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white p-3 rounded shadow flex flex-col gap-2 items-start"
          >
            <img
              src={`http://localhost:5000/uploads/Category/${cat.image}`}
              alt={cat.name}
              className="w-30 h-30 object-cover rounded-md"
            />
            <p><b>{cat.name}</b></p>
            <p className="text-sm text-blue-600">{cat.link}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(cat._id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                Delete
              </button>
              {editId === cat._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Edit Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border p-1 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Edit Link"
                    value={editLink}
                    onChange={(e) => setEditLink(e.target.value)}
                    className="border p-1 rounded"
                  />
                  <input type="file" accept="image/*" onChange={handleEditFileChange} />
                  <button
                    onClick={() => handleUpdate(cat._id)}
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
                  onClick={() => {
                    setEditId(cat._id);
                    setEditName(cat.name);
                    setEditLink(cat.link || "");
                  }}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
