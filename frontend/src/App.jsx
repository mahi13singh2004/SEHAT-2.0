import React, { useEffect } from 'react'
import DoctorDashboard from './pages/DoctorDashboard'
import PatientDashboard from './pages/PatientDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SelectRole from './pages/SelectRole'
import { Routes, Route } from 'react-router-dom'
import { useAuthStore } from './store/auth.store.js'
// import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import DoctorOnly from './components/DoctorOnly'
import PatientOnly from './components/PatientOnly'
import Navbar from './components/Navbar'
import BookAppointment from './pages/BookAppointment'
import TimeSlot from './pages/TimeSlot.jsx'
import ConfirmPage from './pages/ConfirmPage.jsx'

const App = () => {
  const {checkAuth}=useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/select" element={<SelectRole />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/dashboard" element={<DoctorOnly><DoctorDashboard /></DoctorOnly>} />
        <Route path="/patient/dashboard" element={<PatientOnly><PatientDashboard /></PatientOnly>} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/time-slot" element={<TimeSlot />} />
        <Route path="/confirm" element={<ConfirmPage />} />
      </Routes>
    </>
  )
}

export default App