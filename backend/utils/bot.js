import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api";
import mongoose from "mongoose";
import cron from "node-cron";
import User from "../models/user.model.js";
import Reminder from "../models/reminder.model.js";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

await mongoose.connect(process.env.MONGO_URI);

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "👋 Welcome to Sehat Reminder Bot!\nPlease enter your email to link your account."
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.trim();

  if (text.startsWith("/")) return;

  const user = await User.findOne({ email: text.toLowerCase() });

  if (!user) {
    bot.sendMessage(chatId, `❌ No user found with email: ${text}`);
  } else {
    user.chatId = chatId;
    await user.save();
    bot.sendMessage(chatId, `✅ Your Sehat account is now linked!`);
  }
});

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const time = now.toTimeString().slice(0, 5);
  const today = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
    now
  );
  console.log("Checking reminders for", time, today);

  const reminders = await Reminder.find({
    time,
    isOn: true,
    days: { $in: [today] },
  });
  console.log("Reminders found:", reminders);

  for (const r of reminders) {
    const user = await User.findById(r.userId);
    console.log("User for reminder:", user);
    if (user?.chatId) {
      bot.sendMessage(
        user.chatId,
        `💊 Time to take your medicine: *${r.medicine}*`,
        { parse_mode: "Markdown" }
      );
    }
  }
});
