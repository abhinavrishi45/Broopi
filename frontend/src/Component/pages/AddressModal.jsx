import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import locat from "../../assets/locat.png";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position} icon={markerIcon} /> : null;
};

const AddressModal = ({ show, onClose, editAddress = null, setSelectedAddress }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id || storedUser?.id;

  const [position, setPosition] = useState(null);
  const [formData, setFormData] = useState({
    house: "",
    street: "",
    landmark: "",
    name: "",
    type: "Home",
  });
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  useEffect(() => {
    if (editAddress) {
      setFormData({
        house: editAddress.house || "",
        street: editAddress.street || "",
        landmark: editAddress.landmark || "",
        name: editAddress.name || "",
        type: editAddress.type || "Home",
      });
      setPosition({ lat: editAddress.latitude, lng: editAddress.longitude });
      setSelectedAddressId(editAddress._id);
    }
  }, [editAddress]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!userId) return;
        const { data } = await axios.get(`http://localhost:5000/api/address?userId=${userId}`);
        setAddresses(data);
      } catch (err) {
        console.error(err.response?.data || err.message);
      }
    };
    if (show && userId) fetchAddresses();
  }, [show, userId]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported.");
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => alert("Unable to fetch your location.")
    );
  };

  const handleSaveAddress = async () => {
    if (!position) return alert("Select a location on map.");
    if (!userId) return alert("You must be logged in.");

    const payload = { ...formData, latitude: position.lat, longitude: position.lng, userId };

    try {
      let res;
      if (editAddress) {
        res = await axios.put(`http://localhost:5000/api/address/update/${editAddress._id}`, payload);
      } else {
        res = await axios.post(`http://localhost:5000/api/address`, payload);
      }

      // Mark the saved/updated one as selected
      if (res.data) {
        setSelectedAddress(res.data); 
      }

      // Refresh saved addresses
      const refreshed = await axios.get(`http://localhost:5000/api/address?userId=${userId}`);
      setAddresses(refreshed.data);

      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // Select existing saved address
  const handleSelectAddress = async (addr) => {
    try {
      setSelectedAddress(addr);
      await axios.post("http://localhost:5000/api/address/select", {
        userId,
        addressId: addr._id,
      });
      onClose();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white w-4/5 max-w-5xl h-[90vh] rounded-2xl shadow-lg flex overflow-hidden">

        <div className="w-1/2 h-full">
          <MapContainer center={[12.9716, 77.5946]} zoom={15} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        <div className="w-1/2 p-10 overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer text-gray-600 hover:text-black"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-3">
            {editAddress ? "Edit Address" : "Add Address"}
          </h2>
          <p className="text-gray-600 mb-4">Drop the pin on map and fill details</p>

          <div className="flex flex-row cursor-pointer" onClick={handleUseCurrentLocation}>
            <img className="mt-1 h-4 w-4" src={locat} alt="location" />
            <p className="mb-5 hover:text-gray-500">Use Current Location</p>
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
            name="street"
            placeholder="Street / Area"
            value={formData.street}
            onChange={handleChange}
            className="w-full mb-5 p-3 border rounded-xl border-gray-200"
          />
          <input
            type="text"
            name="landmark"
            placeholder="Landmark (Optional)"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full mb-5 p-3 border rounded-xl border-gray-200"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mb-5 p-3 border rounded-xl border-gray-200"
          />

          <div className="mb-4">
            <label className="font-medium">Save as: </label>
            <div className="flex gap-3 mt-2">
              {["Home", "Other"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t })}
                  className={`px-4 py-1 rounded border ${
                    formData.type === t ? "bg-purple-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveAddress}
            className="w-full bg-purple-500 text-white mt-7 py-2 rounded-lg shadow"
          >
            {editAddress ? "Update Address" : "Save Address"}
          </button>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Saved Addresses</h3>
            {addresses.length === 0 ? (
              <p className="text-gray-500 text-sm">No saved addresses yet.</p>
            ) : (
              addresses.map((addr) => (
                <div
                  key={addr._id}
                  className={`p-3 mb-2 border rounded-lg flex justify-between items-center cursor-pointer ${
                    selectedAddressId === addr._id ? "border-purple-500 bg-purple-50" : "bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="font-medium">{addr.name}</p>
                    <p className="text-sm text-gray-600">
                      {addr.house}, {addr.street}, {addr.landmark} ({addr.type})
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setFormData({
                          house: addr.house,
                          street: addr.street,
                          landmark: addr.landmark,
                          name: addr.name,
                          type: addr.type,
                        });
                        setPosition({ lat: addr.latitude, lng: addr.longitude });
                        setSelectedAddressId(addr._id);
                      }}
                      className="text-blue-500 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleSelectAddress(addr)}
                      className="text-green-500 hover:underline text-sm cursor-pointer"
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
