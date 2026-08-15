import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/Auth.js";

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// CORS configuration
const allowedOrigins = [
  "https://demo-gpt.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      // Allow production, localhost, and Vercel preview deployments
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// Routes
app.use("/api", authRoutes);
app.use("/api", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to Database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.log("Database connection failed:", err);
  }
};

startServer();
