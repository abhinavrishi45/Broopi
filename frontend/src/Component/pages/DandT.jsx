import React, { useState } from "react";
import axios from "axios";

const DandT = ({ show, onClose, onSave }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  if (!show) return null;
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id || storedUser?._id;

  function generateTimeSlots() {
    const today = new Date();
    const dates = [
      today.toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      new Date(today.getTime() + 86400000).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
      new Date(today.getTime() + 2 * 86400000).toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
      }),
    ];

    function createSlots(start, end, startminute = 0) {
      const slots = [];
      const date = new Date();
      date.setHours(start, startminute, 0, 0);

      while (
        date.getHours() < end ||
        (date.getHours() === end && date.getMinutes() === 0)
      ) {
        slots.push(
          date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
        date.setMinutes(date.getMinutes() + 30);
      }
      return slots;
    }

    const now = new Date();
    let start = now.getHours();
    let startminute = now.getMinutes();
    startminute = startminute > 30 ? 0 : 30;
    if (startminute === 0) start += 1;

    let todaySlots = [];
    if (start < 22) {
      todaySlots = createSlots(start, 22, startminute);
    }
    const otherDaysSlots = createSlots(8, 22);

    return {
      dates,
      slots: {
        [dates[0]]: todaySlots,
        [dates[1]]: otherDaysSlots,
        [dates[2]]: otherDaysSlots,
      },
    };
  }

  const { dates, slots } = generateTimeSlots();

  const handleSave = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/dt/savedt", {
        userId,
        date: selectedDate,
        time: selectedTime,
      });
      onSave({ date: selectedDate, time: selectedTime });

      onClose();
    }
    catch (err) {
      console.error(err);
      alert("Upload failed");
    };

  }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="bg-white w-4/5 max-w-3xl h-[80vh] rounded-2xl shadow-lg p-12 overflow-hidden">
        <h2 className="text-lg font-bold mb-4">Select Date & Time</h2>

        <div className="flex gap-3 mb-5">
          {dates.map((d, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg border border-gray-300 cursor-pointer ${selectedDate === d
                ? "bg-purple-400 text-white"
                : "bg-gray-100"
                }`}
              onClick={() => {
                setSelectedDate(d);
                setSelectedTime(null);
              }}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-3 h-54 overflow-y-auto">
          {selectedDate &&
            slots[selectedDate]?.map((slot, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-lg border border-gray-300 cursor-pointer ${selectedTime === slot
                  ? "bg-purple-400 text-white"
                  : "bg-gray-100"
                  }`}
                onClick={() => setSelectedTime(slot)}
              >
                {slot}
              </button>
            ))}
        </div>

        <div className="flex justify-end gap-3 mt-20">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DandT;
