import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config("../");

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

async function printAllRedisData() {
  try {
    // Get all the keys
    const keys = await redisClient.keys("*");

    // Iterate through each key
    for (const key of keys) {
      // Get all the fields and values from the hash set (hgetall returns an object)
      const hashData = await redisClient.hGetAll(key);

      console.log(`Data for key: ${key}`);
      // Iterate over each field and its value in the hash
      for (const secondKey in hashData) {
        const value = JSON.parse(hashData[secondKey]);  // Assuming the value is a stringified JSON
        console.log(`  ${secondKey}:`, value);
      }
    }
  } catch (err) {
    console.error("Error fetching data from Redis:", err);
  }
}
printAllRedisData()