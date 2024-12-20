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

async function store_in_redis_cache(price_key, category, total_price, components) {
    try {
        const cache_value = {
            total_price: total_price,
            components: components,
        };

        await redisClient.hSet(
            price_key,
            category.join("_"),
            JSON.stringify(cache_value)
        );
        // console.log(`Data cached for price: ${priceKey}, category: ${category}`);
    } catch (error) {
        console.error("Error storing data in Redis cache:", error);
        throw new Error(
            `Failed to store data for price ${price_key} and category ${category}`
        );
    }
}

await store_in_redis_cache("30000", ["gaming", "streaming"], "29000", {
    cpu: "i5 12600k",
    motherbaord: "M570 Gigabyte",
    ram: "16gb Corsair vengens",
    gpu: "RTX 3060Ti gigabyte",
    powersupply: "650watt Corsair ",
});
await store_in_redis_cache("40000", ["gaming", "video editing"], "39000", {
    cpu: "i9 12900k",
    motherboard: "Z790 Aorus",
    ram: "64gb Corsair Dominator",
    gpu: "RTX 3090Ti Aorus",
    powersupply: "1000watt EVGA",
});

await store_in_redis_cache("45000", ["gaming", "3D modeling"], "43000", {
    cpu: "i9 12900k",
    motherboard: "Z790 Aorus",
    ram: "128gb Corsair Dominator",
    gpu: "RTX 3090Ti Aorus",
    powersupply: "1200watt EVGA",
});

await store_in_redis_cache("50000", ["gaming", "AI development"], "49000", {
    cpu: "i9 12900k",
    motherboard: "Z790 Aorus",
    ram: "256gb Corsair Dominator",
    gpu: "RTX 3090Ti Aorus",
    powersupply: "1500watt EVGA",
});

await store_in_redis_cache("55000", ["gaming", "VR development"], "53000", {
    cpu: "i9 12900k",
    motherboard: "Z790 Aorus",
    ram: "512gb Corsair Dominator",
    gpu: "RTX 3090Ti Aorus",
    powersupply: "1800watt EVGA",
});
console.log("done");

redisClient.disconnect()