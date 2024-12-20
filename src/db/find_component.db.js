// db/queries.js
import { cpu_motherboard_ram_power_supply_cabinet_components_options, gpu_options, storage_options } from '../models/components.schema.js';

// Fetch basic components by price
export const findBasicComponentsByPrice = async (price) => {
  return await cpu_motherboard_ram_power_supply_cabinet_components_options.findOne({
    max_price: price,
  }).lean(); // Lean returns plain JS object, faster for read-only operations
};

// Fetch GPU options by price range
export const findGPUByPrice = async (price) => {
  return await gpu_options.findOne({
    max_price: price,
  }).lean();
};

// Fetch storage options based on size and price
export const findStorageBySizeAndPrice = async (size, price) => {
  return await storage_options.findOne({
    max_price: price,
    size,
  }).lean();
};
