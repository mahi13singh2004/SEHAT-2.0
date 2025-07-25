import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const therapist = async (desc) => {
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash" });
  const prompt = `You are a compassionate and witty mental health therapist. Given how the person is feeling, respond with warmth, empathy, and a touch of humor. Use light-hearted tone but remain respectful. Structure the reply clearly with emojis, bullet points, and give gentle advice. Don't include disclaimers or say "Here is your response", just dive in like a therapist who's also your chill best friend.

**How You are Feeling:** "${desc}"

Respond with this structure:

**🧠 Mood Reflection:**  
A brief, empathetic observation — validate their feelings with a little humor if appropriate.

**🪴 Gentle Suggestions:**  
• Do something small that brings joy  
• Move a little — walk, stretch, dance like nobody’s watching  
• Talk to someone or write your thoughts down  

**💡 Remember:**  
• It's okay to feel this way  
• You are not alone in this  
• Even clouds take breaks — the sun’s still behind them 😌
`;


  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text().trim();
  if (text.length > 1200) text = text.slice(0, 1200) + "...";

  return text;
};
