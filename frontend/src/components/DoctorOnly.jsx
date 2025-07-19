import React from 'react'
import { useAuthStore } from '../store/auth.store.js'
import { Navigate } from 'react-router-dom'

const DoctorOnly = ({children}) => {
  const {user,loading}=useAuthStore()

  if(loading) return <p>loading...</p>

  if(!user) return <Navigate to="/login" />

  if(user.role!=='doctor') return <Navigate to="/" />

  return children
}

export default DoctorOnly