import { redis_client } from "../../connections/db_and_redis_connection.js";

function calculate_price_key(max_price) {
    const price_floor = Math.floor(max_price / 5000) * 5000;
    return (max_price - price_floor <= 3000
        ? price_floor
        : Math.ceil(max_price / 5000) * 5000
    ).toString();
}

export default async function get_from_redis_cache(category, max_price) {
    if (!category || !max_price) {
        throw new Error("Category and max_price are required.");
    }

    const price_key = calculate_price_key(max_price);
    if (!Array.isArray(category)) {
        throw new Error("Category must be an array.");
    }
    
    const category_key = category.join("_");

    try {
        const cached_value = await redis_client.hGet(price_key, category_key);
        if (cached_value) {
            let total_price, components;
            try {
                ({ total_price, components } = JSON.parse(cached_value));
            } catch (error) {
                console.error("Error parsing Redis data:", error);
                return null;
            }

            if (total_price > max_price) {
                const lower_price_key = Number(price_key) - 5000;
                if (lower_price_key > 0) {
                    try {
                        const lower_cached_value = await redis_client.hGet(
                            lower_price_key.toString(),
                            category_key
                        );
                        if (lower_cached_value) {
                            ({ total_price, components } = JSON.parse(lower_cached_value));
                        }
                    } catch (error) {
                        console.error("Error retrieving lower price key data:", error);
                    }
                }
            }
            return { total_price, components };
        } else {
            console.log(`No data found for price ${price_key} and category ${category_key}`);
            return null;
        }
    } catch (error) {
        console.error("Error retrieving data:", { category, max_price, storage }, error);
        return null;
    }
}
