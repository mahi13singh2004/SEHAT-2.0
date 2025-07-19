import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
const router=express.Router()

router.post("/",protectRoute,createAppointment)
router.get("/patient",protectRoute,getPatientAppointments)
router.get("/doctor",protectRoute,getDoctorAppointments)
router.put("/update/:id",protectRoute,updateAppointmentStatus)

export default router