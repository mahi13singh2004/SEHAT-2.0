import React from 'react'
import header from "../assets/header.jpg"

const Home = () => {
  return (
    <>
      <div className='w-full min-h-[calc(100vh-7rem)] bg-gradient-to-r from-white via-blue-100 to-blue-200'>
        <div className='hero bg-gradient-to-r from-white via-blue-100 to-blue-200 w-full h-[70vh] flex' >
          <div className='w-1/2 h-full overflow-hidden'>
            <img className='w-full h-full rounded-full' src={header} />
          </div>

          <div className='w-1/2 h-full justify-center items-center flex flex-col p-12'>
            <h1 className='text-6xl font-bold mb-12'>WELCOME TO</h1>
            <h1 className='text-6xl font-bold mb-12 text-green-500'>SEHAT</h1>
            <p className='text-xl leading-12 text-center mb-10'>Tired of juggling different apps and clinics for your healthcare? <span className='text-green-600'>SEHAT</span> is your one-stop solution. We bring comprehensive care to your fingertips. Instantly book appointments, connect with mental wellness experts, or find dedicated maternity support—all in one place. Your <span className='text-green-600'>HEALTH</span>, simplified.</p>

            <button className='px-6 py-4 cursor-pointer rounded-full bg-green-400 hover:bg-green-500 transition-colors duration-200 text-white font-semibold shadow text-lg'>Learn More</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home