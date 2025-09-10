import React, { useEffect, useState } from "react";
import axios from "axios";

const Video = () => {
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [videos, setVideos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editVideo, setEditVideo] = useState(null);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    if (!video) return alert("Please select a video");

    const formData = new FormData();
    formData.append("video", video);

    try {
      await axios.post("http://localhost:5000/api/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setVideo(null);
      setPreview(null);

      fetchVideos();
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };
  const fetchVideos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos");
      setVideos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos((prev) => prev.filter((v) => v._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setEditVideo(e.target.files[0]);
    }
  };

  const handleUpdate = async (id) => {
    if (!editVideo) return alert("Please select a video first");

    const formData = new FormData();
    formData.append("video", editVideo);

    try {
      await axios.put(`http://localhost:5000/api/videos/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEditId(null);
      setEditVideo(null);
      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col gap-6 p-5 rounded">
      <div className="flex flex-row bg-purple-200 gap-10 p-5 rounded items-center">
        <input
          type="file"
          accept="video/*"
          className="border border-gray-500 ml-10 p-2 rounded"
          onChange={handleFileChange}
        />

        {preview && (
          <video src={preview} controls className="w-60 h-40 rounded-md" />
        )}
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 ml-10 rounded-md"
        >
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((vid) => (
          <div
            key={vid._id}
            className="bg-white p-2 rounded shadow flex flex-col gap-2 items-center"
          >
            <video
              src={`http://localhost:5000${vid.videoUrl}`}
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-40 rounded-md"
            />

            <button
              onClick={() => handleDelete(vid._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md"
            >
              Delete
            </button>

            {editId === vid._id ? (
              <div className="flex flex-col gap-2 items-center">
                <input type="file" accept="video/*" onChange={handleEditFileChange} />
                <button
                  onClick={() => handleUpdate(vid._id)}
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
                onClick={() => setEditId(vid._id)}
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

export default Video;
