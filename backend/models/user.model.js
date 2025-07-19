import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["patient","doctor"],
        required:true
    },
    specialization:{
        type:String,
    },
    workingHours:{
        type:[String],
        default:[]
    },
    rating:{
        totalRating:{
            type:Number,
            default:0
        },
        numberOfRatings:{
            type:Number,
            default:0
        },
    },
})

const User=mongoose.model("User",userSchema)
export default User