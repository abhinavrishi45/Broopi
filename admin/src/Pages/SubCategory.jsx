import React, { useEffect, useState } from "react";
import axios from "axios";

const SubCategory = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null);
  const [editImage, setEditImage] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!image || !name || !category) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("category", category);

    try {
      await axios.post("http://localhost:5000/api/subcategory", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImage(null);
      setPreview(null);
      setName("");
      setCategory("");
      fetchSubcategories();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const fetchSubcategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/subcategory");
      setSubcategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this subcategory?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/subcategory/${id}`);
      setSubcategories((prev) => prev.filter((s) => s._id !== id));
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
    const formData = new FormData();
    if (editImage) formData.append("image", editImage);
    if (name) formData.append("name", name);
    if (category) formData.append("category", category);

    try {
      await axios.put(`http://localhost:5000/api/subcategory/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditId(null);
      setEditImage(null);
      fetchSubcategories();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-5 rounded">

      <div className="flex flex-row bg-purple-200 gap-4 p-5 rounded items-center">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded">
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Subcategory Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input type="file" accept="image/*" className="border border-gray-500 p-2 rounded" onChange={handleFileChange} />

        {preview && (
          <img src={preview} alt="preview" className="w-40 h-24 object-cover rounded-md" />
        )}
        <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded-md">
          Upload
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {subcategories.map((sub) => (
          <div key={sub._id} className="bg-white p-3 rounded shadow flex flex-col gap-2">
            <img
              src={`http://localhost:5000/uploads/subCategory/${sub.image}`}
              alt={sub.name}
              className="w-30 h-30 object-cover rounded-md"
            />
            <h3 className="font-bold">{sub.name}</h3>
            <p>Category: {sub.category?.name}</p>

            <div className="flex gap-2">
              <button onClick={() => handleDelete(sub._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">
                Delete
              </button>
              {editId === sub._id ? (
                <div className="flex flex-col gap-2">
                  <input type="file" accept="image/*" onChange={handleEditFileChange} />
                  <button onClick={() => handleUpdate(sub._id)} className="bg-green-600 text-white px-3 py-1 rounded-md">
                    Update
                  </button>
                  <button onClick={() => setEditId(null)} className="bg-gray-400 text-white px-3 py-1 rounded-md">
                    Cancel
                  </button>
                </div>
              ) : (
                <button onClick={() => setEditId(sub._id)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">
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

export default SubCategory;
