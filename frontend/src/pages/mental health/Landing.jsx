import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import image1 from "../../assets/mental.jpg"

const Landing = () => {
    return (
        <div className="min-h-[calc(100vh-7rem)] w-full flex p-12 justify-center bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300">
            <div className="flex w-full max-w-9xl h-[45vh] rounded-3xl shadow-xl bg-white/80 backdrop-blur-md overflow-hidden">
                <div className="w-2/3 flex flex-col justify-center items-center gap-10 px-10">
                    <motion.h1
                        className="text-6xl font-bold text-purple-700 drop-shadow-lg mb-2"
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        SEHAT-SANCTUM
                    </motion.h1>
                    <motion.p
                        className="text-3xl font-semibold text-center text-gray-700 mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.4 }}
                    >
                        Your One Stop Platform For Mental Health Fitness
                    </motion.p>
                    <motion.p
                        className="text-2xl text-center text-gray-600 mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 2.4 }}
                    >
                        Squat your worries away (mentally, of course)
                    </motion.p>
                    <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.97 }}
                        className="mt-2 px-8 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-xl font-bold rounded-full shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                    >
                        Get Started
                    </motion.button>
                </div>
                <div className="w-1/3 flex items-center justify-center bg-gradient-to-tl from-purple-100 to-pink-100">
                    <motion.img
                        className="w-full max-w-lg p-5 h-full rounded-full object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
                        src={image1}
                        alt="Mental wellness"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2 }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Landing
