import React from 'react'
import image1 from "../assets/construction.jpg"

const Maternity = () => {
    return (
        <div className="min-h-[calc(100vh-7rem)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-green-100 to-blue-200 py-12">
            <img src={image1} alt="Under Construction" className="w-64 md:w-96 mb-8 rounded-2xl shadow-lg border-4 border-white" />
            <h1 className="text-4xl md:text-6xl font-bold text-green-600 mb-4 text-center drop-shadow">COMING SOON</h1>
            <p className="text-lg md:text-2xl text-gray-700 text-center max-w-xl"> Stay tuned for updates!</p>
        </div>
    )
}

export default Maternity