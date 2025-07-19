import React, { useEffect } from 'react'
import { useAppointmentStore } from '../store/appointment.store.js'

const PatientDashboard = () => {
  const {appointments,loading,err,fetchAppointments}=useAppointmentStore()

  useEffect(()=>{
    fetchAppointments()
  },[fetchAppointments])
  return (
    <>
      <div>
        <div>

          <h2>Your Appointments</h2>
          {err && <p>{err}</p>}
          {loading && <p>Loading...</p>}

          {appointments.lentgh === 0 && !loading ?
            (
              <p>No Appointments</p>
            )
            :
            (
              appointments.map((appointment) => (
                <div key={appointment._id}>
                  <h3>Doctor:{appointment.doctorId.name}</h3>
                  <p>Specialization: {appointment.doctorId.specialization}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Status: <strong>{appointment.status}</strong></p>
                  <p>Booked At: {new Date(appointment.createdAt).toLocaleString()}</p>
                </div>
              ))
            )
          }

        </div>
      </div>
    </>
  )
}

export default PatientDashboard