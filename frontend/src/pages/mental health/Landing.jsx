import React from 'react'
import image1 from "../../assets/mental.jpg"
import image2 from "../../assets/therapist.jpg"
import image3 from "../../assets/map.jpg"
import image4 from "../../assets/emergency.jpg"
import { Link } from 'react-router-dom'
const Landing = () => {
    return (
        <div className="min-h-[calc(100vh-7rem)] w-full flex-col p-4 md:p-12 justify-center bg-gradient-to-br from-blue-300 via-purple-200 to-pink-300">
            <div className="flex flex-col md:flex-row w-full max-w-9xl h-auto md:h-[45vh] rounded-3xl shadow-xl bg-white/80 backdrop-blur-md overflow-hidden mb-12">
                <div className="md:w-2/3 w-full flex flex-col justify-center items-center gap-6 md:gap-10 px-4 md:px-10 py-6 md:py-0">
                    <h1
                        className="text-4xl md:text-6xl font-bold text-purple-700 drop-shadow-lg"
                    >
                        SEHAT-SANCTUM
                    </h1>
                    <p
                        className="text-xl md:text-3xl font-semibold text-center text-gray-700"

                    >
                        Your One Stop Platform For Mental Health Fitness
                    </p>
                    <p
                        className="text-lg md:text-2xl text-center text-gray-600"

                    >
                        Squat your worries away (mentally, of course)
                    </p>
                    <button
                        className="mt-2 px-6 md:px-8 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white text-lg md:text-xl font-bold rounded-full shadow-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                    >
                        Get Started
                    </button>
                </div>
                <div className="md:w-1/3 w-full flex items-center justify-center bg-gradient-to-tl from-purple-100 to-pink-100">
                    <img
                        className="w-[85%] max-w-xs md:max-w-lg p-2 md:p-5 h-48 md:h-full rounded-full object-cover shadow-2xl"
                        src={image1}
                        alt="Mental wellness"
                    />
                </div>
            </div>

            <div className='w-full flex flex-col md:flex-row gap-6 md:gap-8 justify-center flex-wrap mt-8'>
                {[
                    {
                        img: image2,
                        title: 'AI Therapist',
                        desc: 'Talk To Your Therapist, no strings attached',
                        to: '/therapist',
                    },
                    {
                        img: image3,
                        title: 'Find Nearby Therapist',
                        desc: 'Brcause, Why Not?',
                        to: '/maps',
                    },
                    {
                        img: image4,
                        title: 'Emergency Resources',
                        desc: 'All Resources with a click',
                        to: '/resources',
                    },
                ].map((feature, idx) => (
                    <Link
                        to={feature.to}
                        key={idx}
                        className='h-72 w-full md:w-60 flex flex-col items-center text-center p-4 md:p-5 bg-white/80 rounded-2xl shadow-xl border border-purple-200 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-purple-50 group relative no-underline'
                        style={{ textDecoration: 'none' }}
                    >
                        <img
                            className='h-24 w-24 md:h-32 md:w-32 mb-4 rounded-full object-cover border-4 border-purple-200 shadow-md transition-transform duration-300 group-hover:scale-105'
                            src={feature.img}
                            alt={feature.title}
                        />
                        <div className='w-2/3 h-1 bg-gradient-to-r from-purple-300 via-pink-200 to-pink-300 rounded-full mb-4'></div>
                        <h1 className='text-xl md:text-2xl font-semibold text-purple-700 mb-2'>{feature.title}</h1>
                        <p className='text-base md:text-lg text-gray-600'>{feature.desc}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Landing
