import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config('../');

// Create the Redis client
const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
  },
  // Enable pipelining for better performance
  enableAutoPipelining: true,
});

try {
  // Connect to Redis
  await redisClient.connect();
  console.log("Connected to Redis");
} catch (error) {
  console.error(error.message);
}

// Add event listeners for connection and error handling
redisClient.on("error", (err) => console.error("Redis Client Error:", err));
redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("ready", () => console.log("Redis Client Ready"));
redisClient.on("end", () => console.log("Redis Client Connection Ended"));

async function removeAllData() {
  await redisClient.flushDb(); // Changed from client to redisClient
  console.log("All cache removed.");
}

removeAllData();