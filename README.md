# 🧠 Sehat – Your Friendly Digital Health Buddy 🩺

> “Sehat hai toh sab kuch hai!”  
> A full-stack AI-powered healthcare app built with ❤️ using the MERN stack.

Sehat helps users book appointments, manage health records, talk to AI, and even get Telegram reminders for their meds. It’s like having a doctor, pharmacist, therapist, and assistant — all in one tab!

---

## 🛠 Tech Stack

- 🖥️ **Frontend:** React + Tailwind CSS
- 📦 **State Management:** Zustand
- 🧠 **Backend:** Express + Node.js
- 💾 **Database:** MongoDB
- 🔐 **Authentication:** JWT
- ☁️ **File Uploads:** Cloudinary
- 🧠 **AI:** Gemini API (symptom analysis + AI therapist)
- 📲 **Bot Integration:** Telegram
- 🔐 **Vault:** Pinata IPFS + AES Encryption

---

## ✨ Features

### 👥 Multirole Signup
- Sign up as a **👨‍⚕️ Doctor** or **🧑‍💼 Patient**
- Role-based features and dashboards — no awkward mix-ups!

### 📅 Book Appointments
- Choose doctors **manually** _or_ let AI suggest based on your symptoms 🧠
- View available slots & book in one click
- Doctors can **accept**, **reject**, or **mark appointments complete**

### 📎 Upload Files During Booking
- Patients can attach reports, images, and more while booking
- Doctors get immediate context = faster diagnosis
- Stored securely using **Cloudinary**

### 🤒 AI Symptom Checker
- Enter your symptoms (e.g., “stomach ache + fatigue”)
- Gemini API suggests a specialization (e.g., Gastroenterologist)
- Perfect for people who Google everything anyway 😅

### 💊 Telegram Medicine Reminders
- Set medicine reminders from the Sehat website
- Get pinged 💬 on Telegram at the right time, on the right days
- Fully automated via a **Telegram Bot** — no manual typing needed

### 🔐 Sehat Vault (Blockchain Storage)
- A private encrypted vault to store health documents (lab reports, prescriptions, etc.)
- Files are **encrypted with a password before upload**
- Stored on **Pinata (IPFS)** — blockchain-style storage
- Only decryptable with your own password 🔓

### 🧘 Sehat Sanctum – Mental Health Mode
Your mind matters too. Includes:
1. 🆘 Emergency resources page  
2. 🧍‍♂️ Find nearby therapists (with Google Maps integration)  
3. 🤖 Talk with an AI therapist about your feelings  
4. 📈 Mood tracker (coming soon!)

---

## 🔐 Authentication
- Uses **JWT tokens** for protected routes and login sessions
- Doctors and patients have separate permissions

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- API keys for Gemini, Cloudinary, Pinata, and Telegram Bot
- Git

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/sehat.git
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```
4. Create `.env` files:
   - In `backend/`, add:
     ```
     MONGODB_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     GEMINI_API_KEY=your_gemini_api_key
     CLOUDINARY_URL=your_cloudinary_url
     PINATA_API_KEY=your_pinata_api_key
     TELEGRAM_BOT_TOKEN=your_telegram_bot_token
     ```
   - In `frontend/`, add:
     ```
      VITE_CLOUDINARY_UPLOAD_PRESET
      VITE_CLOUDINARY_CLOUD_NAME
      VITE_GOOGLE_MAPS_API_KEY
     ```
5. Run the backend:
   ```bash
   cd backend
   npm run dev
   ```
6. Run the Telegram bot:
   ```bash
   npx nodemon utils/bot.js
   ```
7. Run the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

---

## 📂 Folder Structure
```
sehat/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/         # API routes
│   ├── controllers/    # Route handlers
│   └── utils/          # Telegram bot & utilities
├── frontend/
│   ├── components/     # Reusable React components
│   ├── pages/          # Page components
│   ├── store/          # Zustand state management
│   └── assets/         # Static files (images, etc.)
```

---

---

## 🧑‍💻 Author
**Mahi Singh**  
🎓 Pre-final year @ Visvesvaraya Technological University  

---

## 🤝 Contributions
Pull requests are welcome — just like healthy habits!  
If you’d like to add a feature, open an issue first to discuss it.

---

## 🧘‍♂️ Fun Fact
This app reminds you to take care of your health — so you don’t need to remember it yourself.  
Let your brain rest. Let Sehat do the reminding 😌
