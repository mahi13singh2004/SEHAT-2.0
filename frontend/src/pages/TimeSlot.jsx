import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAppointmentStore } from '../store/appointment.store.js'

const TimeSlot = () => {
    const { selectedDoctor, setSelectedTime } = useAppointmentStore()
    const [selectedSlot, setSelectedSlot] = useState(null)
    const navigate = useNavigate()

    const handleNext = () => {
        if (!selectedSlot) return
        setSelectedTime(selectedSlot)
        navigate("/confirm")
    }

    return (
        <>
            <div>
                <div>

                    <h2>Select A Time Slot</h2>
                    <div>
                        <h4>Doctor: {selectedDoctor.name}</h4>
                        <div>
                            {selectedDoctor.workingHours.map((slot) => (
                                <button key={slot} onClick={() => setSelectedSlot(slot)} className={`px-4 py-2 border rounded ${selectedSlot === slot ? "bg-blue-600 text-white" : "bg-gray-100"
                                    }`}>
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button disabled={!selectedSlot} onClick={handleNext}>
                        Next
                    </button>

                </div>
            </div>
        </>
    )
}

export default TimeSlot