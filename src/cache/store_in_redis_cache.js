import { redis_client } from "../../connections/db_and_redis_connection";

export default async function store_in_redis_cache(price_key, category, total_price, components) {
  try {
    const cache_value = {
      total_price: total_price,
      components: components,
    };

    await redis_client.hSet(
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