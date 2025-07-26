import Reminder from "../models/reminder.model.js";

export const reminder = async (req, res) => {
  try {
    const { userId, medicine, time, days, isOn } = req.body;
    if (!userId || !medicine || !time || !days || typeof isOn === "undefined") {
      return res.status(400).json({ message: "Please provide all details" });
    }
    await Reminder.create({
      userId,
      medicine,
      time,
      days,
      isOn,
    });
    return res.status(200).json({ message: "Reminder Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
