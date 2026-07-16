<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# 🚀 DemoGPT

A full-stack AI-powered chat application built using the MERN stack, featuring real-time AI conversations, multi-threaded chats, and secure user authentication using JWT.

---

## 🧠 Overview

DemoGPT is designed to simulate a modern conversational AI platform where users can interact with an AI model in an organized and scalable way.

With the addition of JWT authentication, the app now supports secure user sessions and lays the foundation for personalized chat experiences.

---

## ✨ Features

* 💬 AI-powered chat (Groq API)
* 🧵 Multiple chat threads
* 🗑️ Delete conversations
* 🔐 JWT-based Authentication (Login / Signup)
* 👤 User-specific session handling
* ⚡ Fast and responsive UI (React + Vite)
* 🔌 RESTful backend (Node.js + Express)
* 📁 Modular project structure

---

## 🔐 Authentication

This project uses **JWT (JSON Web Tokens)** for authentication:

* Users can sign up and log in
* Tokens are generated on login
* Protected routes validate user identity
* Middleware ensures secure access to APIs

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* JWT (jsonwebtoken)
* bcrypt (password hashing)

### Other Tools

* Groq API (LLM)
* UUID

---

## 📂 Project Structure

DemoGPT/
│── backend/
│   ├── server.js
│   ├── routes/
│   │   └── Auth.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   └── User.js
│   ├── utils/
│   └── .env (ignored)
│
│── frontend/
│   ├── src/
│   ├── components/
│   ├── utils/
│   └── main.jsx
│
│── .gitignore
│── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash id="m0z7hy"
git clone https://github.com/varunco/DemoGPT.git
cd DemoGPT
```

---

### 2️⃣ Backend Setup

```bash id="80ql1z"
cd backend
npm install
```

Create a `.env` file:

```env id="6v1bks"
GROQ_API_KEY=your_api_key
JWT_SECRET=your_secret_key
```

Start backend:

```bash id="3m1w7q"
node server.js
```

---

### 3️⃣ Frontend Setup

```bash id="6nt9e9"
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Inside `backend/.env`:

```id="az7jhb"
GROQ_API_KEY=your_api_key
JWT_SECRET=your_secret_key
```

⚠️ Never commit `.env` files

---

## 🔄 How It Works

1. User signs up / logs in
2. Server generates JWT token
3. Token is sent to frontend
4. Protected routes verify token
5. User interacts with AI chat
6. Backend processes request via Groq API

---

## 🚀 Future Improvements

* 🧵 Persistent chat storage (MongoDB collections)
* 🌐 Deployment (Vercel + Render)
* 📱 Mobile responsiveness improvements
* 🔄 Refresh tokens / advanced auth flow
* 🧠 Context-aware conversations

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 🙌 Author

Developed by Varun
Engineering Student | MERN Stack Developer
>>>>>>> 7b6ec199d5efd729e30d269972fecd0f5caae7e0
