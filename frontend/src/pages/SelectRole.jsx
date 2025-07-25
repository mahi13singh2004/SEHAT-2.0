import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUserMd, FaUserInjured } from 'react-icons/fa'

const SelectRole = () => {
    const navigate = useNavigate()
    const handleRole = (role) => {
        navigate(`/signup/${role}`)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-7rem)] bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-6 md:py-12 px-2 md:px-4">
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-2 text-center drop-shadow">Choose Your Role</h1>
            <p className="text-base md:text-lg text-gray-600 mb-8 md:mb-10 text-center">Are you a Doctor or a Patient? Select your role to continue.</p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 w-full max-w-3xl justify-center">
                <button
                    onClick={() => handleRole('doctor')}
                    className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-blue-400 focus:outline-none"
                >
                    <FaUserMd className="text-blue-500 text-6xl mb-4" />
                    <h2 className="text-2xl font-bold text-blue-700 mb-2">I am a Doctor</h2>
                    <p className="text-gray-500 text-center">Sign up or log in to manage your appointments, view your schedule, and connect with patients.</p>
                </button>
                <button
                    onClick={() => handleRole('patient')}
                    className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl border-2 border-transparent hover:border-green-400 focus:outline-none"
                >
                    <FaUserInjured className="text-green-500 text-6xl mb-4" />
                    <h2 className="text-2xl font-bold text-green-700 mb-2">I am a Patient</h2>
                    <p className="text-gray-500 text-center">Book appointments, view your health records, and connect with top doctors easily and securely.</p>
                </button>
            </div>
        </div>
    )
}

export default SelectRole