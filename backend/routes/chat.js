import express from "express";
import Thread from "../models/Threads.js";
import getOpenAIAPIResponse from "../utils/openai.js";
import authMiddleware from "../middleware/auth.js"; // ✅ NEW

const router = express.Router();


// 🧪 TEST ROUTE (optional - can keep unprotected)
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "xyz",
      title: "Testing New Thread",
      messages: []
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed" });
  }
});


// 📥 GET ALL THREADS (USER-SPECIFIC)
router.get("/thread", authMiddleware, async (req, res) => {
  try {
    const threads = await Thread.find({ userId: req.user.userId }) // ✅ filter by user
      .sort({ updatedAt: -1 });

    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});


// 📥 GET SINGLE THREAD (SECURE)
router.get("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({
      threadId,
      userId: req.user.userId // ✅ ensure ownership
    });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.json(thread);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});


// ❌ DELETE THREAD (SECURE)
router.delete("/thread/:threadId", authMiddleware, async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({
      threadId,
      userId: req.user.userId // ✅ only delete own thread
    });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});


// 💬 CHAT ROUTE (SECURE + USER LINKED)
router.post("/chat", authMiddleware, async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({
      threadId,
      userId: req.user.userId // ✅ only access own thread
    });

    // 🆕 CREATE THREAD IF NOT EXISTS
    if (!thread) {
      thread = new Thread({
        threadId,
        userId: req.user.userId, // ✅ LINK THREAD TO USER
        title: message,
        messages: []
      });
    }

    // 👤 SAVE USER MESSAGE
    thread.messages.push({
      role: "user",
      content: message
    });

    // 🤖 GET AI RESPONSE
    const assistantReply = await getOpenAIAPIResponse(message);

    // 🤖 SAVE AI MESSAGE
    thread.messages.push({
      role: "assistant",
      content: assistantReply
    });

    // ⏱ UPDATE TIMESTAMP
    thread.updatedAt = new Date();

    await thread.save();

    res.json({ reply: assistantReply });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;