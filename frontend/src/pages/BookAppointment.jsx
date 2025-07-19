import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppointmentStore } from '../store/appointment.store.js'

const BookAppointment = () => {

    const {setSelectedDoctor,recommendedDoctor,fetchRecommendedDoctor,err,loading,fetchManualDoctors,manualDoctors}=useAppointmentStore()

    const [description,setDescription]=useState("")
    const navigate=useNavigate()

    const handleAIRecommendation=async()=>{
        try {
            await fetchRecommendedDoctor(description)
        } 
        catch (error) {
            console.log(error)    
        }
    }

    const handleManualFetch=async()=>{
        try {
            await fetchManualDoctors()
        } 
        catch (error) {
            console.log(error)    
        }
    }

    const handleDoctorSelect=(doctor)=>{
        setSelectedDoctor(doctor)
        navigate("/time-slot")
    }

    return (
        <>
            <div>
                <div>

                    <h2>Book An Appointment</h2>
                    <div>
                        <textarea
                            placeholder='Enter Your Symptoms (e.g.chest pains and heart issue)'
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button onClick={handleAIRecommendation} disabled={loading || !description}>
                            {loading ? "Loading" : "Submit"}
                        </button>
                    </div>

                    {recommendedDoctor && (
                        <div>
                            <h3>Recommended Doctor</h3>
                            <p>Name: {recommendedDoctor.name}</p>
                            <p>Specialization: {recommendedDoctor.specialization}</p>
                            <p>Rating: {recommendedDoctor.rating}</p>
                            <button onClick={() => handleDoctorSelect(recommendedDoctor)}>
                                Select Doctor
                            </button>
                        </div>
                    )}

                    <div>OR</div>

                    <button disabled={loading} onClick={handleManualFetch}>
                        {loading ? "Loading" : "Choose Manually"}
                    </button>

                    {manualDoctors.length > 0 && (
                        <div>
                            <h2>Available Doctors</h2>
                            {manualDoctors.map((doc) => (
                                <div key={doc._id} onClick={() => handleDoctorSelect(doc)}>
                                    <p>Name: {doc.name}</p>
                                    <p>Specialization: {doc.specialization}</p>
                                    <p>Rating: {doc.rating}</p>
                                </div>
                            ))}
                        </div>

                    )}

                    {err && <p>{err}</p>}

                </div>
            </div>
        </>
    )
}

export default BookAppointment