import express from "express";
import dotenv from "dotenv";
import connectDB from "./DB/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import aiRoutes from "./routes/ai.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/auth",authRoutes);
app.use("/api/ai",aiRoutes)
app.use("/api/appointment",appointmentRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
