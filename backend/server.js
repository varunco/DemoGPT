import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/Auth.js"; // ✅ NEW

const app = express();
const PORT = 8080;

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ AUTH ROUTES (login/signup)
app.use("/api", authRoutes);

// ✅ CHAT ROUTES (protected inside)
app.use("/api", chatRoutes);


// ✅ START SERVER AFTER DB CONNECTS
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database");

    app.listen(PORT, () => {
      console.log(`server running on ${PORT}`);
    });

  } catch (err) {
    console.log("Failed to connect", err);
  }
};

startServer();