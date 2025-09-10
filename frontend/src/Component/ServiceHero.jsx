import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import axios from 'axios';
const ServiceHero = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const [video, setVideo] = useState([]);

  const itemFetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/category");
      setItem(res.data.reverse().slice(0, 6));
    } catch (error) {
      console.log(error);
    }

  }
  const videoFetch = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/videos");
      setVideo(res.data);
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    videoFetch();
  }, []);

  useEffect(() => {
    itemFetch();
  }, []);
  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

      <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Book Our Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {item.map((service, index) => (
            <ServiceCard
              key={service._id || index}
              label={service.name}
              icon={`http://localhost:5000/uploads/Category/${service.image}`}
              onClick={() => navigate(service.link)} 
            />
          ))}
        </div>
      </div>

      {video.map((vid) => (
        <div key={vid._id} className="w-full rounded-xl overflow-hidden shadow-lg">
          <video
            src={`http://localhost:5000${vid.videoUrl}`}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-44 sm:h-80 lg:h-full object-cover"
          />
        </div>
      ))}

    </div>
  );

};

export default ServiceHero;
