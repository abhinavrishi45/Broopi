import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import locat from '../../assets/locat.png'

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker = ({ setPosition }) => {
  const [pos, setPos] = useState(null);

  useMapEvents({
    click(e) {
      setPos(e.latlng);
      setPosition(e.latlng);
    },
  });

  return pos ? <Marker position={pos} icon={markerIcon}></Marker> : null;
};

const AddressModal = ({ show, onClose, onSave }) => {
  const [position, setPosition] = useState(null);
  const [formData, setFormData] = useState({
    house: "",
    landmark: "",
    name: "",
    type: "Home",
  });

  if (!show) return null;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = () => {
    if (!position) {
      alert("Please select a location on the map.");
      return;
    }
    onSave({ ...formData, latitude: position.lat, longitude: position.lng });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white w-4/5 max-w-5xl h-[80vh] rounded-2xl shadow-lg flex overflow-hidden">
        
        <div className="w-1/2 h-full">
          <MapContainer
            center={[12.9716, 77.5946]} 
            zoom={15}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker setPosition={setPosition} />
          </MapContainer>
        </div>

       
        <div className="w-1/2 p-10 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-3">Add Address</h2>
          <p className="text-gray-600 mb-4">
            Drop the pin on map and fill details
          </p>
          <div className="flex flex-row">
            <img className= " mt-1 h-4 w-4 "src={locat} alt="" />
          <p className="mb-5 hover:text-gray-500 cursor-pointer">Use Current Location </p>
          </div>
          <input
            type="text"
            name="house"
            placeholder="House / Flat Number"
            value={formData.house}
            onChange={handleChange}
            className="w-full mb-5 p-3 border border-gray-200 rounded-xl"
          />

          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full mb-5 p-3 border rounded-xl border-gray-200 "
          />

          <input
            type="text"
            name="name"
            placeholder="Name (e.g: Abhinav Raushan)"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-5 p-3 border rounded-xl border-gray-200 "
          />

          <div className="mb-4">
            <label className="font-medium">Save as: </label>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "Home" })}
                className={`px-4 py-1 rounded border ${
                  formData.type === "Home"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "Other" })}
                className={`px-4 py-1 rounded border ${
                  formData.type === "Other"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100"
                }`}
              >
                Other
              </button>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-purple-500 text-white mt-7 py-2 rounded-lg shadow"
          >
            Save and Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
