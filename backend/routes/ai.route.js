import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { recommendDoctor } from "../controllers/ai.controller.js"
const router=express.Router()

router.post("/recommendDoctor",protectRoute,recommendDoctor)

export default router