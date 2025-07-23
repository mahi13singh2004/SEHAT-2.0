import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/auth.store.js"

const Reminder = () => {
  const { user, loading } = useAuthStore();
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState([]);
  const userEmail = user?.email;

  if (loading) {
    return (
      <div className="text-center mt-8 text-gray-600">
        ⏳ Loading your account info...
      </div>
    );
  }

  if (!userEmail) {
    return (
      <div className="text-center mt-8 text-gray-600">
        Please log in to set reminders.
      </div>
    );
  }

  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const saveReminder = async () => {
    if (!user || !user._id) {
      alert("❌ User ID not found. Please log in again.");
      return;
    }
    if (!medicine || !time || days.length === 0) {
      alert("❌ Please fill in all fields and select at least one day.");
      return;
    }

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
      alert("⏰ Time must be in 24-hour format (e.g. 14:30)");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/reminder", {
        userId: user._id,
        medicine,
        time,
        days,
        isOn: true,
      });
      alert("✅ Reminder saved!");
      setMedicine("");
      setTime("");
      setDays([]);
    } catch (err) {
      console.error(err);
      alert("❌ Error saving reminder: " + (err.response?.data?.message || err.message));
    }
  };

  const encodedEmail = encodeURIComponent(userEmail);
  const telegramBotUsername = "SehatPal_bot";
  const telegramLink = `https://t.me/${telegramBotUsername}?start=${encodedEmail}`;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">
        💊 Set Medicine Reminder
      </h1>

      <input
        value={medicine}
        onChange={(e) => setMedicine(e.target.value)}
        placeholder="Medicine name"
        className="border px-3 py-2 w-full mb-3 rounded"
      />

      <input
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time (24h format e.g. 14:30)"
        className="border px-3 py-2 w-full mb-3 rounded"
      />

      <div className="mb-4 flex flex-wrap">
        {allDays.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`px-3 py-1 m-1 border rounded ${days.includes(day)
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-black"
              }`}
          >
            {day}
          </button>
        ))}
      </div>

      <button
        onClick={saveReminder}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
      >
        Save Reminder
      </button>

      <div className="mt-6 text-center text-sm">
        <p>📲 To receive reminders on Telegram:</p>
        <a
          href={telegramLink}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 underline"
        >
          Connect to Telegram Bot
        </a>
      </div>
    </div>
  );
};

export default Reminder
