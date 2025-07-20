import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import loginPhoto from '../assets/login.jpg'
import Spinner from '../components/Spinner';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [err, setErr] = useState("")

  const { login, loading } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr("")
    try {
      await login({ email, password })
      navigate("/")
    }
    catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-8 px-4">
      <div className="w-full max-w-4xl min-h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        <div className="hidden md:block md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${loginPhoto})` }}>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Login</h2>
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
            <button type='submit' className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-colors duration-200 shadow">
              {loading ? <Spinner size={24} className="mx-auto" /> : "Login"}
            </button>
            {err && <p className="text-red-500 text-center">{err}</p>}
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600">First Time Here? <Link to="/select" className="text-blue-500 hover:underline font-semibold">Signup</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login