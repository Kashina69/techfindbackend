import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();
console.log(process.env.REDIS_PORT);

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

// export default
async function getFromRedisCash(category, minPrice, maxPrice, storage) {
  var priceKey;
  let priceFloorValue = Math.floor(maxPrice / 5000) * 5000;
  if (maxPrice - priceFloorValue <= 3000) {
    priceKey = priceFloorValue;
  } else {
    priceKey = Math.ceil(maxPrice / 5000) * 5000;
  }
  priceKey = priceKey.toString();
  try {
    const value = await redisClient.hGet(priceKey, category.join("_"));
    if (!value) {
      console.log(`No data found for price ${priceKey} and category ${category}`);
      return null;
    }
    const parsedValue = JSON.parse(value);
    console.log(parsedValue);
  } catch (error) {
    console.error("Error retrieving data:", error);
  }
}
getFromRedisCash(["gaming", "AI development"], 40000, 49000, "1TB");
