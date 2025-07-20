import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppointmentStore } from '../store/appointment.store.js'
import Spinner from '../components/Spinner';

const BookAppointment = () => {

    const { setSelectedDoctor, recommendedDoctor, fetchRecommendedDoctor, err, loading, fetchManualDoctors, manualDoctors } = useAppointmentStore()

    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleAIRecommendation = async () => {
        try {
            await fetchRecommendedDoctor(description)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleManualFetch = async () => {
        try {
            await fetchManualDoctors()
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor)
        navigate("/time-slot")
    }

    return (
        <div className="min-h-[calc(100vh-7rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-12 px-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8">
                <h2 className="text-3xl font-extrabold text-blue-700 mb-2 text-center">Book An Appointment</h2>
                <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                    <textarea
                        className="w-full md:w-2/3 min-h-[100px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg resize-none shadow"
                        placeholder='Enter Your Symptoms (e.g. chest pains and heart issue)'
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button
                        onClick={handleAIRecommendation}
                        disabled={loading || !description}
                        className="mt-4 md:mt-0 px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? <Spinner size={20} className="inline-block align-middle" /> : "Submit"}
                    </button>
                </div>

                {recommendedDoctor && (
                    <div className="bg-blue-50 rounded-xl p-6 shadow flex flex-col md:flex-row items-center gap-6 mt-4 border border-blue-200">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-blue-700 mb-2">Recommended Doctor</h3>
                            <p className="text-gray-700"><span className="font-semibold">Name:</span> {recommendedDoctor.name}</p>
                            <p className="text-gray-700"><span className="font-semibold">Specialization:</span> {recommendedDoctor.specialization}</p>
                            <p className="text-gray-700"><span className="font-semibold">Rating:</span> {recommendedDoctor.rating}</p>
                        </div>
                        <button
                            onClick={() => handleDoctorSelect(recommendedDoctor)}
                            className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold shadow transition-colors duration-200"
                        >
                            Select Doctor
                        </button>
                    </div>
                )}

                <div className="flex items-center justify-center gap-2 text-gray-500 font-semibold my-2">
                    <span className="h-px w-8 bg-gray-300" />
                    OR
                    <span className="h-px w-8 bg-gray-300" />
                </div>

                <button
                    disabled={loading}
                    onClick={handleManualFetch}
                    className="px-8 py-3 rounded-lg bg-blue-400 hover:bg-blue-500 text-white font-bold text-lg transition-colors duration-200 shadow disabled:opacity-60 disabled:cursor-not-allowed mx-auto"
                >
                    {loading ? <Spinner size={20} className="inline-block align-middle" /> : "Choose Manually"}
                </button>

                {manualDoctors.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold text-green-700 mb-4">Available Doctors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {manualDoctors.map((doc) => (
                                <div
                                    key={doc._id}
                                    onClick={() => handleDoctorSelect(doc)}
                                    className="cursor-pointer bg-green-50 hover:bg-green-100 border border-green-200 rounded-xl p-4 shadow transition-colors duration-200"
                                >
                                    <p className="text-lg font-semibold text-green-800">{doc.name}</p>
                                    <p className="text-gray-700">Specialization: {doc.specialization}</p>
                                    <p className="text-gray-700">Rating: {doc.rating}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {err && <p className="text-red-500 text-center font-semibold mt-4">{err}</p>}
            </div>
        </div>
    )
}

export default BookAppointment