import React from 'react'
import { useAuthStore } from '../store/auth.store.js'

const PatientDashboard = () => {
  const {user}=useAuthStore() 
  return (
    <>
      <div>
        <div>
          <h1>Hello Your Are {user.name} And You Are A Patient</h1>
        </div>
      </div>
    </>
  )
}

export default PatientDashboard