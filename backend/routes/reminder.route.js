import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { reminder } from "../controllers/reminder.controller.js"
const router=express.Router()

router.post("/",protectRoute,reminder)

export default router