import React from 'react'
import { useAuthStore } from '../store/auth.store.js'

const PatientDashboard = () => {
  const {user}=useAuthStore() 
  return (
    <>
      <div>
        <div>
          <h1>Welcome To Patient Dashboard {user.name}</h1>
        </div>
      </div>
    </>
  )
}

export default PatientDashboard