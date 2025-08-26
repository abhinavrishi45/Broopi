import React from 'react';

const ServiceCard = ({ label, icon, onClick }) => {
  return (
    <div className="h-32 bg-gray-100 border border-gray-300 rounded-lg shadow-sm cursor-pointer flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform duration-300 ease-in-out hover:bg-gray-100 " onClick={onClick}>
      <img src={icon} alt={label} className="w-15 h-16 object-contain  mb-2" />
      <p className="text-sm font-semibold text-gray-800 text-center">{label}</p>
    </div>
  );
};


export default ServiceCard;
