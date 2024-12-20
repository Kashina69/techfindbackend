import { Router } from 'express';
import cron from "node-cron";
import ai_chat from "../services/ai_chat.services.js";

const router = Router();

// Chat history storage
let chat_history = {};

router.post("/", async (req, res) => {
  const { 
    user_id, 
    query, 
    min_price, 
    max_price, 
    category, 
    suggested_components 
  } = req.body;

  if (!user_id || !query) {
    return res.status(400).json({ error: "User ID and query are required" });
  }

  if (!chat_history[user_id]) {
    chat_history[user_id] = { messages: [], query_count: 0 };
  }

  if (chat_history[user_id].query_count >= 5) {
    return res.status(429).json({ 
      error: "Daily query limit reached. Please try again tomorrow." 
    });
  }

  try {
    const response = await ai_chat(
      query,
      suggested_components,
      category,
      min_price,
      max_price,
      chat_history[user_id].messages
    );

    chat_history[user_id].query_count++;
    chat_history[user_id].messages.push(
      { role: "user", content: query },
      { role: "ai", content: response }
    );

    res.json({ response });
  } catch (error) {
    console.error("Error in AI chat:", error);
    res.status(500).json({ 
      error: "An error occurred while processing your request" 
    });
  }
});

cron.schedule("0 0 * * *", async () => {
  console.log("Starting scheduled midnight cleanup");
  chat_history = {}
});

export default router; 