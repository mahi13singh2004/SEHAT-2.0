import React from 'react'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import image1 from "../../assets/mental.jpg"
import image2 from "../../assets/therapist.jpg"
import image3 from "../../assets/map.jpg"
import image4 from "../../assets/emergency.jpg"
import image5 from "../../assets/mood.jpg"
import { Link } from 'react-router-dom'
const Landing = () => {
    return (
        <div className="min-h-[calc(100vh-7rem)] w-full flex-col p-12 justify-center bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300">
            <div className="flex w-full max-w-9xl h-[45vh] rounded-3xl shadow-xl bg-white/80 backdrop-blur-md overflow-hidden mb-12">
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

            <div className='w-full flex gap-8 justify-center flex-wrap mt-8'>
                {[
                    {
                        img: image2,
                        title: 'AI Therapist',
                        desc: 'Talk To Your Therapist, no strings attached',
                        to: '/therapist',
                    },
                    {
                        img: image5,
                        title: 'Mood Tracker',
                        desc: 'Track Your Mood, Day by day. Every Day',
                        to: '/track',
                    },
                    {
                        img: image3,
                        title: 'Find Nearby Therapist',
                        desc: 'Brcause, Why Not?',
                        to: '/find-therapist',
                    },
                    {
                        img: image4,
                        title: 'Emergency Resources',
                        desc: 'All Resources, with tap of a button',
                        to: '/resources',
                    },
                ].map((feature, idx) => (
                    <Link
                        to={feature.to}
                        key={idx}
                        className='h-80 w-60 flex flex-col items-center text-center p-5 bg-white/80 rounded-2xl shadow-xl border border-purple-200 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-purple-50 group relative no-underline'
                        style={{ textDecoration: 'none' }}
                    >
                        <img
                            className='h-32 w-32 mb-4 rounded-full object-cover border-4 border-purple-200 shadow-md transition-transform duration-300 group-hover:scale-105'
                            src={feature.img}
                            alt={feature.title}
                        />
                        <div className='w-2/3 h-1 bg-gradient-to-r from-purple-300 via-pink-200 to-pink-300 rounded-full mb-4'></div>
                        <h1 className='text-2xl font-semibold text-purple-700 mb-2'>{feature.title}</h1>
                        <p className='text-lg text-gray-600'>{feature.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Landing
