import dotenv from "dotenv";
import mongoose from "mongoose";
import { createClient } from "redis";
dotenv.config('../../');

// Create the Redis client
const redis_client = createClient({
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
    await redis_client.connect();
    console.log("Connected to Redis");
} catch (error) {
    console.error(error.message);
}

// Add event listeners for connection and error handling
redis_client.on("error", (err) => console.error("Redis Client Error:", err));
redis_client.on("connect", () => console.log("Redis Client Connected"));
redis_client.on("ready", () => console.log("Redis Client Ready"));
redis_client.on("end", () => console.log("Redis Client Connection Ended"));

// MongoDB connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

export { mongoose, redis_client };