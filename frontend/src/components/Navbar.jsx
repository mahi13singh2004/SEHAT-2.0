import React from 'react'
import image from "../assets/logo.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'

const Navbar = () => {
    const { loading, logout, user } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            navigate("/login")
        }
        catch (error) {
            console.log("error", error)
        }
    }
    return (
        <>
            <nav className="flex bg-gradient-to-r from-white via-blue-100 to-blue-200 h-28 px-8 justify-between items-center sticky top-0 backdrop-blur-md z-50">
                <Link to="/">
                    <img className="h-16 w-16 rounded-full object-contain border-2 border-green-200 shadow" src={image} alt="Logo" />
                </Link>

                <div className="text-xl font-bold flex items-center gap-4 ">
                    {user && user.role === "patient" && (
                        <Link to="/patient/dashboard">
                            <button className="px-6 py-2 cursor-pointer rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-200 text-white font-semibold shadow">
                                Patient Dashboard
                            </button>
                        </Link>
                    )}
                    {user && user.role === "doctor" && (
                        <Link to="/doctor/dashboard">
                            <button className="px-6 py-2 cursor-pointer rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-200 text-white font-semibold shadow">
                                Doctor Dashboard
                            </button>
                        </Link>
                    )}

                    {user ?
                        (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-2 cursor-pointer rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-200 text-white font-semibold shadow"
                            >
                                {loading ? "Loading" : "Log Out"}
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