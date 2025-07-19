import React, { useState } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'

const Login = () => {
  const navigate=useNavigate()
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [err,setErr]=useState("")

  const {login,loading}=useAuthStore()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setErr("")
    try {
      await login({email,password})
      navigate("/")
    } 
    catch (error) {
      setErr(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <>
      <div>
        <div>

          
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input 
            placeholder='Enter Your Email'
            type="email" 
            value={email}
            required
            onChange={(e)=>setEmail(e.target.value)}
            />

            <input 
            placeholder='Enter Your Password'
            type="password" 
            value={password}
            required
            onChange={(e)=>setPassword(e.target.value)}
            />

            <button type='submit'>
              {loading ? "Logging In" : "Login"}
            </button>

            {err && <p>{err}</p>}
          </form>

          <div>
            <p>First Time Here? <Link to="/select">Signup</Link></p>
          </div>

        </div>
      </div>
    </>
  )
}

export default Login