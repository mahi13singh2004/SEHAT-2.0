import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import doctorImg from '../assets/doctor.jpg'
import patientImg from '../assets/patient.jpg'
import Spinner from '../components/Spinner';

const Signup = () => {
  const { role } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [workingHours, setWorkingHours] = useState([])
  const [showWorkingHours, setShowWorkingHours] = useState(false)
  const [err, setErr] = useState("")

  const { signup, loading } = useAuthStore()

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "1:00 PM", "2:00 PM",
    "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr("")

    const userData = role === "doctor"
      ? {
        name,
        email,
        password,
        role,
        specialization,
        workingHours,
      }
      : {
        name,
        email,
        password,
        role,
      }

    try {
      await signup(userData)
      navigate("/")
    } catch (error) {
      setErr(error.response?.data?.message || "Signup failed")
    }
  }

  const handleWorkingHourToggle = (hour) => {
    if (workingHours.includes(hour)) {
      setWorkingHours(workingHours.filter(h => h !== hour))
    } else {
      setWorkingHours([...workingHours, hour])
    }
  }

  const sideImg = role === 'doctor' ? doctorImg : patientImg;

  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-6 md:py-8 px-2 md:px-4">
      <div className="w-full max-w-4xl min-h-[36rem] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 flex flex-col justify-center p-4 md:p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Sign Up As {role && role.charAt(0).toUpperCase() + role.slice(1)}</h2>
            <input
              placeholder='Enter Your Name'
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            <input
              placeholder='Enter Your Email'
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            <input
              placeholder='Enter Your Password'
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            />
            {role === "doctor" && (
              <>
                <select
                  value={specialization}
                  required
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg cursor-pointer bg-white"
                >
                  <option value="" disabled>Select Specialization</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="General Medicine">General Medicine</option>
                </select>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowWorkingHours(!showWorkingHours)}
                    className="w-full px-4 py-2 mt-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold transition-colors duration-200"
                  >
                    {workingHours.length === 0 ? "Select Working Hours" : `Selected: ${workingHours.join(", ")}`}
                  </button>
                  {showWorkingHours && (
                    <div className="grid grid-cols-2 gap-2 mt-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                      {timeSlots.map((slot) => (
                        <label key={slot} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            id={slot}
                            checked={workingHours.includes(slot)}
                            onChange={() => handleWorkingHourToggle(slot)}
                            className="accent-blue-500"
                          />
                          <span className="text-gray-700">{slot}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
            <button type="submit" className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-colors duration-200 shadow">
              {loading ? <Spinner size={24} className="mx-auto" /> : "Sign Up"}
            </button>
            {err && <p className="text-red-500 text-center">{err}</p>}
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">Already Signed Up? <Link to="/login" className="text-blue-500 hover:underline font-semibold">Login</Link></p>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${sideImg})` }}>
        </div>
      </div>
    </div>
  )
}

export default Signup
