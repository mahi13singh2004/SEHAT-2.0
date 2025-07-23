import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../../store/auth.store.js"
import image from "../../assets/feature5.jpg"

const Reminder = () => {
  const { user, loading } = useAuthStore();
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [days, setDays] = useState([]);

  if (loading) {
    return (
      <div className="text-center mt-8 text-gray-600">
        ⏳ Loading your account info...
      </div>
    );
  }

  if (!user || !user._id) {
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

  const encodedEmail = encodeURIComponent(user.email);
  const telegramBotUsername = "SehatPal_bot";
  const telegramLink = `https://t.me/${telegramBotUsername}?start=${encodedEmail}`;

  return (
    <div className="min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-10 px-2 md:px-6 overflow-y-visible">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-10 items-stretch">
        {/* Left: Form */}
        <div className="md:w-4/5 w-full flex flex-col gap-8 bg-white rounded-3xl shadow-2xl p-8 md:p-14 border border-blue-100 text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-2 text-center tracking-tight">Set Medicine Reminder</h1>
          <input
            value={medicine}
            onChange={(e) => setMedicine(e.target.value)}
            placeholder="Medicine name"
            className="border px-4 py-3 rounded-xl w-full mb-3 text-lg shadow-sm"
          />
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Time (24h format e.g. 14:30)"
            className="border px-4 py-3 rounded-xl w-full mb-3 text-lg shadow-sm"
          />
          <div className="mb-4 flex flex-wrap justify-center">
            {allDays.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 m-1 border rounded-xl font-semibold transition-colors duration-150 ${days.includes(day)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 text-black border-gray-300"
                  }`}
              >
                {day}
              </button>
            ))}
          </div>
          <button
            onClick={saveReminder}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl w-full font-bold text-lg shadow"
          >
            Save Reminder
          </button>
          <div className="mt-6 text-center text-base">
            <p>📲 To receive reminders on Telegram:</p>
            <a
              href={telegramLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline font-semibold"
            >
              Connect to Telegram Bot (Only Once)
            </a>
          </div>
        </div>
        <div className="md:w-2/5 w-full flex flex-col items-center gap-6">
          <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 rounded-2xl p-5 shadow flex flex-col items-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-yellow-800 mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f59e42" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 4h.01M2.25 19.5l9.02-15.02a1.5 1.5 0 012.46 0l9.02 15.02A1.5 1.5 0 0121.02 21H2.98a1.5 1.5 0 01-1.29-2.25z" />
              </svg>
              How to Use
            </h2>
            <ol className="list-decimal list-inside text-yellow-900 text-sm space-y-1">
              <li>Enter your <span className="font-semibold">medicine name</span>, <span className="font-semibold">time</span> (24h format), and select days.</li>
              <li>Click <span className="font-semibold">Save Reminder</span>.</li>
              <li>Click <span className="font-semibold">Connect to Telegram Bot</span> and start the bot.</li>
              <li>Send your <span className="font-semibold">account email</span> to the bot to link your account.</li>
              <li>Receive reminders on Telegram at the set time!</li>
            </ol>
          </div>
          <div className="w-full bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden flex flex-col items-center">
            <img src={image} alt="Reminder" className="w-full h-56 object-cover rounded-t-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminder
