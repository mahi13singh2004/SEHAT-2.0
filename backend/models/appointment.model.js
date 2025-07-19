import mongoose from "mongoose"

const appointmentSchema=new mongoose.Schema({
    patientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","cancelled","completed"],
        default:"pending"
    }
},
{timestamps:true}
)

const Appointment=mongoose.model("Appointment",appointmentSchema)
export default Appointment