import React from 'react';
import { useNavigate } from 'react-router-dom';
import herovideo from '../assets/herovideo.mp4';
import ServiceCard from './ServiceCard';
import categoriesHome from '../assets/categories1738757064Home.png';
import categoriesbathroom from '../assets/categories1738758788bathroom.png';
import categoriesplumber from '../assets/categories1751837051plumber.png';
import categoriespest from '../assets/categoriespest.png';
import categoriesAc from '../assets/categoriesAc.png';
import Electrician from '../assets/Electrician.png';

const services = [
  { label: 'Pest Controlling', icon: categoriespest, path: '/service/PestControlling' },
  { label: 'Bathroom Cleaning', icon: categoriesbathroom, path: '/service/BathroomCleaning' },
  { label: 'Home Cleaning ', icon: categoriesHome, path: '/service/HomeCleaning' },
  { label: 'Ac Services', icon: categoriesAc, path: '/service/ACService' },
  { label: 'Plumber', icon: categoriesplumber, path: '/service/Plumber' },
  { label: 'Electrician', icon: Electrician, path: '/service/Electrician' },
];

const ServiceHero = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-8xl mx-auto px-4 py-10 grid grid-cols-2 gap-20 items-center">
      <div className="border ml-15 border-gray-300 rounded-2xl p-6 shadow-sm bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Our Services</h2>
        <div className="grid grid-cols-3 gap-4 px-2 py-2">
          {services.map((service, index) => (
            <ServiceCard key={index}
              label={service.label}
              icon={service.icon}
              path={service.path}
              onClick={() => navigate(service.path)} />
          ))}
        </div>
      </div>
      <div className=" w-full rounded-xl overflow-hidden shadow-lg">
        <video
          src={herovideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ServiceHero;
