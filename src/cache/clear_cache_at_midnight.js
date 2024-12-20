import cron from "node-cron";
import redis_client from "../connections/db_and_redis_connection.js";
import reset_amazon_and_flipkart_fields from "../db/reset_amazon_flipkart_fields.db.js"

async function clear_all_cache() {
  try {
    await redis_client.flushDb();
    console.log("All cache cleared successfully");
  } catch (error) {
    console.error("Error clearing Redis cache:", error);
    throw error;
  }
}

async function perform_daily_cleanup() {
  try {
    await clear_all_cache();
    await reset_amazon_and_flipkart_fields();
    console.log("Daily cleanup completed: Cache cleared and prices reset");
  } catch (error) {
    console.error("Error during daily cleanup:", error);
    throw error;
  }
}

// Schedule cleanup to run daily at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
  console.log("Starting scheduled midnight cleanup");
  await perform_daily_cleanup();
}); 