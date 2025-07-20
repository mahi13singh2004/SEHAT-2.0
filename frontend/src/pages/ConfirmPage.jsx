import React, { useEffect } from 'react'
import { useAppointmentStore } from '../store/appointment.store.js'
import { useAuthStore } from '../store/auth.store.js'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'

const ConfirmPage = () => {
    const { selectedDoctor, selectedTime, confirmAppointment, loading, err } = useAppointmentStore()
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
        <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-12 px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8">
                <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Confirm Your Appointment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 shadow flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-blue-700 mb-2">Your Details</h3>
                        <p className="text-gray-700"><span className="font-semibold">Name:</span> {user?.name}</p>
                        <p className="text-gray-700"><span className="font-semibold">Email:</span> {user?.email}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-6 border border-green-200 shadow flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-green-700 mb-2">Doctor Details</h3>
                        <p className="text-gray-700"><span className="font-semibold">Name:</span> {selectedDoctor?.name}</p>
                        <p className="text-gray-700"><span className="font-semibold">Rating:</span> {selectedDoctor?.rating}</p>
                        <p className="text-gray-700"><span className="font-semibold">Specialization:</span> {selectedDoctor?.specialization}</p>
                    </div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 shadow flex flex-col gap-2 items-center">
                    <h3 className="text-xl font-bold text-yellow-700 mb-2">Appointment Time</h3>
                    <p className="text-gray-700 text-lg">{selectedTime || ''}</p>
                </div>
                <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="w-full py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                    {loading ? <Spinner size={24} className="mx-auto" /> : "Confirm Appointment"}
                </button>
                {err && <p className="text-red-500 text-center font-semibold mt-2">{err}</p>}
            </div>
        </div>
    )
}

export default ConfirmPage