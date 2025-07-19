import React, { useEffect } from 'react'
import { useAppointmentStore } from '../store/appointment.store.js'
import { useAuthStore } from '../store/auth.store.js'
import { useNavigate } from 'react-router-dom'

const ConfirmPage = () => {
    const { selectedDoctor, selectedTime, confirmAppointment } = useAppointmentStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user || !selectedDoctor || !selectedTime) {
            navigate('/book-appointment')
        }
    }, [user, selectedDoctor, selectedTime, navigate])

    const handleConfirm = async () => {
        try {
            await confirmAppointment()
            navigate("/patient/dashboard")
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div>
                <div>

                    <div>
                        <h2>Your Details</h2>
                        <p>Name: {user?.name}</p>
                        <p>Email: {user?.email}</p>
                    </div>

                    <div>
                        <h2>Doctor Details</h2>
                        <p>Name: {selectedDoctor?.name}</p>
                        <p>Rating: {selectedDoctor?.rating}</p>
                        <p>Specialization: {selectedDoctor?.specialization}</p>
                    </div>


                    <div>
                        <h2>Appointment Time</h2>
                        <p>{selectedTime || ''}</p>
                    </div>

                    <button onClick={handleConfirm}>
                        Confirm Appointment
                    </button>

                </div>
            </div>
        </>
    )
}

export default ConfirmPage