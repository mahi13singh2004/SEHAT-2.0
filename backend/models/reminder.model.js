import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicine: {
    type: String,
    required: true,
  },
  days:{
    type: [String],
    required: true
  },
  isOn:{
    type: Boolean,
    required: true
  },
  time:{
    type: String,
    required: true
  }
});

const Reminder = mongoose.model("Reminder", reminderSchema);
export default Reminder;
