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
import RestrictedRoute from './components/RestrictedRoute.jsx'
import SymptomChecker from './pages/features/SymptomChecker.jsx'
import Reminder from './pages/features/Reminder.jsx'
import VaultPage from './pages/features/VaultPage.jsx'
import Landing from './pages/mental health/Landing.jsx'
import Therapist from './pages/mental health/Therapist.jsx'
import Resources from './pages/mental health/Resources.jsx'
import Maps from './pages/mental health/Maps.jsx'
import Maternity from './pages/Maternity.jsx'

const App = () => {
  const { checkAuth } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/select" element={<RestrictedRoute><SelectRole /></RestrictedRoute>} />
        <Route path="/signup/:role" element={<RestrictedRoute><Signup /></RestrictedRoute>} />
        <Route path="/login" element={<RestrictedRoute><Login /></RestrictedRoute>} />
        <Route path="/doctor/dashboard" element={<DoctorOnly><DoctorDashboard /></DoctorOnly>} />
        <Route path="/patient/dashboard" element={<PatientOnly><PatientDashboard /></PatientOnly>} />
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<PatientOnly><BookAppointment /></PatientOnly>} />
        <Route path="/time-slot" element={<TimeSlot />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/symptom" element={<SymptomChecker />} />
        <Route path="/track" element={<Reminder />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/mentalHealth" element={<Landing />} />
        <Route path="/therapist" element={<Therapist />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/maternity" element={<Maternity />} />
      </Routes>
    </>
  )
}

export default App