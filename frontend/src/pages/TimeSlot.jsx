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
        <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-12 px-4">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8">
                <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Select A Time Slot</h2>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 shadow flex flex-col gap-2 mb-4">
                    <h4 className="text-xl font-bold text-blue-700 mb-2">Doctor: <span className="text-gray-800">{selectedDoctor.name}</span></h4>
                    <p className="text-gray-700 mb-1"><span className="font-semibold">Specialization:</span> {selectedDoctor.specialization}</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                    {selectedDoctor.workingHours.map((slot) => (
                        <button
                            key={slot}
                            onClick={() => setSelectedSlot(slot)}
                            className={`px-6 py-3 rounded-lg border text-lg font-semibold shadow transition-colors duration-200 focus:outline-none ${selectedSlot === slot ? "bg-blue-600 text-white border-blue-600" : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"}`}
                        >
                            {slot}
                        </button>
                    ))}
                </div>
                <button
                    disabled={!selectedSlot}
                    onClick={handleNext}
                    className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed mt-4"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default TimeSlot