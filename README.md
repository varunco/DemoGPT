# 🚀 DemoGPT

A full-stack AI-powered chat application built with the MERN stack, designed to simulate a modern conversational AI experience with support for multiple chat threads and scalable backend architecture.

---

## 🧠 Overview

DemoGPT allows users to interact with an AI model through a clean and responsive interface.
It supports creating, managing, and deleting chat threads while maintaining a smooth user experience.

The project is structured to be easily extendable, with upcoming support for authentication and persistent storage.

---

## ✨ Features

* 💬 Real-time AI chat interaction
* 🧵 Multiple conversation threads
* 🗑️ Delete chat functionality
* ⚡ Fast frontend using Vite + React
* 🔌 RESTful backend using Node.js & Express
* 🧠 LLM integration (Groq API)
* 📁 Modular and scalable code structure

---

## 🔐 Upcoming Features

* ✅ JWT Authentication (login/signup system)
* 👤 User-specific chat history
* 🗄️ Database integration (MongoDB)
* 🌐 Deployment (Vercel / Render)
* 📱 Improved responsive design

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Other Tools

* Groq API (LLM)
* UUID

---

## 📂 Project Structure

DemoGPT/
│── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── .env (ignored)
│
│── frontend/
│   ├── src/
│   ├── components/
│   └── main.jsx
│
│── .gitignore
│── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/varunco/DemoGPT.git
cd DemoGPT
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside backend:

```env
GROQ_API_KEY=your_api_key_here
```

Start backend server:

```bash
node server.js
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory:

```
GROQ_API_KEY=your_api_key
```

⚠️ Never commit your `.env` file to version control.

---

## 🔄 How It Works

1. User enters a prompt in the frontend
2. Request is sent to backend API
3. Backend forwards request to Groq API
4. AI response is returned and displayed
5. Chat is stored in thread-based structure

---

## 🚀 Future Roadmap

* 🔐 JWT-based Authentication
* 🗄️ MongoDB integration for persistent chats
* 🧠 Context-aware conversations
* 📊 Chat analytics & usage tracking
* 🌍 Full deployment pipeline

---

## 🤝 Contributing

Contributions are welcome!
Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 🙌 Author

Developed by Varun
Engineering Student | MERN Stack Developer
