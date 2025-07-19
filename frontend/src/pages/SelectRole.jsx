import React from 'react'
import { useNavigate } from 'react-router-dom'

const SelectRole = () => {
    const navigate = useNavigate()
    const handleRole = (role) => {
        navigate(`/signup/${role}`)
    }
    return (
        <>
            <div>
                <div>
                    <h1>Choose Your Role</h1>
                    <p>Are You A Patient Or A Doctor</p>
                    <div>
                        <button onClick={() => handleRole("doctor")}>I AM A Doctor</button>
                        <button onClick={() => handleRole("patient")}>I AM A Patient</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectRole