import React, { useState, useRef, useEffect } from "react";
import image from "../assets/logo.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store.js";
import Spinner from "./Spinner";

const Navbar = () => {
  const { loading, logout, user } = useAuthStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) setDropdownOpen(false);
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="bg-gradient-to-r from-white via-blue-100 to-blue-200 h-20 md:h-28 px-4 md:px-8 flex items-center sticky top-0 backdrop-blur-md z-50">
        <Link to="/" className="flex-shrink-0">
          <img
            className="h-12 w-12 md:h-16 md:w-16 rounded-full object-contain border-2 border-green-200 shadow"
            src={image}
            alt="Logo"
          />
        </Link>

        <div className="hidden md:flex flex-1 justify-end items-center gap-4 text-xl font-bold">
          <div>
            {user && user.role === "patient" && (
              <Link
                to="/mentalHealth"
                className="px-6 py-2 cursor-pointer rounded-full bg-pink-400 hover:bg-pink-700 transition-colors duration-200 text-white font-semibold shadow"
              >
                SEHAT SANCTUM
              </Link>
            )}
          </div>
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
                  {user.role === "patient" && (
                    <Link
                      to="/book"
                      className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Book Appointment
                    </Link>
                  )}
                  {user.role === "patient" && (
                    <Link
                      to="/patient/dashboard"
                      className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Patient Dashboard
                    </Link>
                  )}
                  {user.role === "doctor" && (
                    <Link
                      to="/doctor/dashboard"
                      className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Doctor Dashboard
                    </Link>
                  )}
                  {user.role === "patient" && (
                    <Link
                      to="/symptom"
                      className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      CareMate
                    </Link>
                  )}
                  {user.role === "patient" && (
                    <Link
                      to="/track"
                      className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      SehatPal
                    </Link>
                  )}
                  {user.role === "patient" && (
                    <Link
                      to="/vault"
                      className="block px-6 py-3 text-blue-700 hover:bg-blue-100 hover:text-blue-900 transition-colors duration-150 text-lg font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      SehatVault
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 cursor-pointer rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-200 text-white font-semibold shadow"
            >
              {loading ? (
                <Spinner size={20} className="inline-block align-middle" />
              ) : (
                "Log Out"
              )}
            </button>
          ) : (
            <Link to="/login">
              <button className="cursor-pointer px-6 py-2 rounded-full bg-blue-400 hover:bg-blue-500 transition-colors duration-200 text-white font-semibold shadow">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden flex-1 justify-end">
          <button
            className="text-blue-700 focus:outline-none"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Open Menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-50 flex flex-col">
          <div className="bg-gradient-to-r from-white via-blue-100 to-blue-200 w-full shadow-lg py-6 px-4 flex flex-col gap-4">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <img
                  className="h-12 w-12 rounded-full object-contain border-2 border-green-200 shadow"
                  src={image}
                  alt="Logo"
                />
              </Link>
              <button
                className="text-blue-700 focus:outline-none"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {user && user.role === "patient" && (
              <Link
                to="/mentalHealth"
                className="block px-4 py-3 rounded-full bg-pink-400 hover:bg-pink-700 text-white font-semibold shadow text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                SEHAT SANCTUM
              </Link>
            )}
            {user && (
              <div className="flex flex-col gap-2">
                <span className="font-bold text-blue-700 px-4">Features</span>
                {user.role === "patient" && (
                  <Link
                    to="/book"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Book Appointment
                  </Link>
                )}
                {user.role === "patient" && (
                  <Link
                    to="/patient/dashboard"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Patient Dashboard
                  </Link>
                )}
                {user.role === "doctor" && (
                  <Link
                    to="/doctor/dashboard"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Doctor Dashboard
                  </Link>
                )}
                {user.role === "patient" && (
                  <Link
                    to="/symptom"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    CareMate
                  </Link>
                )}
                {user.role === "patient" && (
                  <Link
                    to="/track"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    SehatPal
                  </Link>
                )}
                {user.role === "patient" && (
                  <Link
                    to="/vault"
                    className="block px-4 py-2 rounded-lg hover:bg-blue-100 text-blue-700 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    SehatVault
                  </Link>
                )}
              </div>
            )}
            {user ? (
              <button
                onClick={async () => {
                  await handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full px-4 py-3 rounded-full bg-green-400 hover:bg-green-500 text-white font-semibold shadow mt-2"
              >
                {loading ? (
                  <Spinner size={20} className="inline-block align-middle" />
                ) : (
                  "Log Out"
                )}
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full px-4 py-3 rounded-full bg-blue-400 hover:bg-blue-500 text-white font-semibold shadow mt-2">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
