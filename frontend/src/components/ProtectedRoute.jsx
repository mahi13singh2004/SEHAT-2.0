import React from 'react'
import { useAuthStore } from '../store/auth.store.js'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const {user,loading}=useAuthStore()
  if(loading) return <p>....Loading</p>
  if(!user) return <Navigate to="/login"/>
  return children
}

export default ProtectedRoute