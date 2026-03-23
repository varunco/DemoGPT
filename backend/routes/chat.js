import express from "express";
import Thread from "../models/Threads.js";
import getOpenAIAPIResponse from "../utils/openai.js";

const router = express.Router();


// 🧪 TEST ROUTE
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


// 📥 GET ALL THREADS
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch threads" });
  }
});


// 📥 GET SINGLE THREAD (IMPORTANT FIX)
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await Thread.findOne({ threadId });

    if (!thread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    // ✅ return full thread (not just messages)
    res.json(thread);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});


// ❌ DELETE THREAD
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });

    if (!deletedThread) {
      return res.status(404).json({ error: "Thread not found" });
    }

    res.status(200).json({ success: "Thread deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to delete thread" });
  }
});


// 💬 CHAT ROUTE (MAIN FIX)
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    // 🆕 CREATE THREAD IF NOT EXISTS
    if (!thread) {
      thread = new Thread({
        threadId,
        title: message, // first message becomes title
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

    // 🤖 SAVE AI MESSAGE (IMPORTANT FIX)
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