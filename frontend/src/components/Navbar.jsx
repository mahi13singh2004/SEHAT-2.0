import React, { useState, useRef, useEffect } from 'react'
import image from "../assets/logo.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import Spinner from './Spinner';

const Navbar = () => {
    const { loading, logout, user } = useAuthStore()
    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        }
        catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false)
            }
        }
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        } else {
            document.removeEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownOpen])

    return (
        <>
            <nav className="flex bg-gradient-to-r from-white via-blue-100 to-blue-200 h-28 px-8 justify-between items-center sticky top-0 backdrop-blur-md z-50">
                <Link to="/">
                    <img className="h-16 w-16 rounded-full object-contain border-2 border-green-200 shadow" src={image} alt="Logo" />
                </Link>

                <div className="text-xl font-bold flex items-center gap-4 ">
                    {user && (
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((open) => !open)}
                                className="px-6 py-2 rounded-full bg-blue-400 hover:bg-blue-500 transition-colors duration-200 text-white font-semibold shadow text-xl focus:outline-none"
                            >
                                Features
                                <span className="ml-2">▼</span>
                            </button>
                            {dropdownOpen && (
                                <div className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 border border-blue-100 animate-fade-in">
                                    <Link
                                        to="/book"
                                        className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        Book Appointment
                                    </Link>
                                    {user.role === 'patient' && (
                                        <Link
                                            to="/patient/dashboard"
                                            className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Patient Dashboard
                                        </Link>
                                    )}
                                    {user.role === 'doctor' && (
                                        <Link
                                            to="/doctor/dashboard"
                                            className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                                            onClick={() => setDropdownOpen(false)}
                                        >
                                            Doctor Dashboard
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {user ?
                        (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 cursor-pointer rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-200 text-white font-semibold shadow"
                            >
                                {loading ? <Spinner size={20} className="inline-block align-middle" /> : "Log Out"}
                            </button>
                        )
                        :
                        (
                            <Link to="/login">
                                <button
                                    className="cursor-pointer px-6 py-2 rounded-full bg-blue-400 hover:bg-blue-500 transition-colors duration-200 text-white font-semibold shadow"
                                >
                                    Login
                                </button>
                            </Link>
                        )
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar