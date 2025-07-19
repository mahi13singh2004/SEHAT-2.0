import React, { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'

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

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Sign Up As {role}</h2>

          <input
            placeholder='Enter Your Name'
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder='Enter Your Email'
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder='Enter Your Password'
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          {role === "doctor" && (
            <>
              <select
                value={specialization}
                required
                onChange={(e) => setSpecialization(e.target.value)}
                style={{ cursor: 'pointer' }}
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
                <div onClick={() => setShowWorkingHours(!showWorkingHours)} style={{ cursor: 'pointer' }}>
                  {workingHours.length === 0 ? "Select Working Hours" : ""}
                </div>
                {showWorkingHours && (
                  <div>
                    {timeSlots.map((slot) => (
                      <div key={slot}>
                        <input
                          type="checkbox"
                          id={slot}
                          checked={workingHours.includes(slot)}
                          onChange={() => handleWorkingHourToggle(slot)}
                        />
                        <label htmlFor={slot}>{slot}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <button type="submit">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {err && <p style={{ color: "red" }}>{err}</p>}
        </form>

        <div>
          <p>
            Already Signed Up? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
