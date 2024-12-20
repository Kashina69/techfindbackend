import { Router } from 'express';

import get_from_redis_cache from "../cache/get_from_redis_cache.js";
import find_components from "../suggestion/find_components.js";
import generate_docs_for_suggestion from "../services/generate_docs_for_suggestion.services.js"
import store_in_redis_cache from "./store_in_redis_cache.js";

const router = Router();

router.post("/", async (req, res) => {
  const { min_price, max_price, categories, storage_size } = req.body;

  try {

    try {
      var result = await get_from_redis_cache(
        min_price,
        max_price,
        categories,
        storage_size,
      );
      if (result) {
        var { total_price, components } = result
      }
    } catch (error) {
      console.error(
        "Error fetching components:",
        error + " for category: " + categories +
        " price range: " + min_price + "-" + max_price +
        " storage_size: " + storage_size
      );
    }

    try {
      const { components, total_price } = await find_components(
        price_key,
        max_price,
        category,
        storage_size
      );
    } catch (error) {
      console.error(`Error in findingComponents function: for ${price_key,
        max_price,
        category,
        storage_size}`, error);
      throw error;
    }

    let documentation = generate_docs_for_suggestion(
      min_price,
      max_price,
      total_price,
      categories,
      components,
      storage ? components.custom_storage : components.normal_storage
    );

    try {
      await store_in_redis_cache(
        price_key,
        total_price,
        category,
        components,
      );
    } catch (error) {
      console.error(`Error in storeInRedisCash function for ${price_key,
        max_price,
        category,
        storage_size}`, error);
      throw error;
    }

    res.json({
      components,
      total_price,
      documentation,
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router; 