import React, { useState } from "react";

const DandT = ({ show, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  if (!show) return null;
  const today = new Date();
  const dates = [
    today.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
    new Date(today.getTime() + 86400000).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
    new Date(today.getTime() + 2 * 86400000).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }),
  ];

  const timeSlots = ["04:00PM", "04:30PM", "05:00PM", "05:30PM", "06:00PM", "06:30PM", "07:00PM", "07:30PM"];

  const handleSave = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time!");
      return;
    }
    onSave({ date: selectedDate, time: selectedTime });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white w-4/5 max-w-3xl h-[80vh] rounded-2xl shadow-lg p-12 overflow-hidden">
        <h2 className="text-lg font-bold mb-4">Select Date & Time</h2>

        <div className="flex gap-3 mb-5">
          {dates.map((d, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg border border-gray-300 cursor-pointer ${
                selectedDate === d ? "bg-purple-400 text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelectedDate(d)}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 mb-5 mt-15">
          {timeSlots.map((slot, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg w-30 border border-gray-300 cursor-pointer ${
                selectedTime === slot ? "bg-purple-400 text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelectedTime(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-40 ">
          <button className="px-4 py-2  bg-gray-300 rounded-lg" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DandT;
