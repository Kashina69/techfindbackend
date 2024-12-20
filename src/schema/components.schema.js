import mongoose from "mongoose";

import {
  cpu_schema,
  gpu_schema,
  motherboard_schema,
  ram_schema,
  power_supply_schema,
  cabinet_schema,
  storage_schema,
} from "./cpu_gpu_motherboard_ram_power_supply_cabinet_storage_schema.schema";

// Constants
const priceBrackets = [
  15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 55000, 60000,
  65000, 70000, 75000, 80000, 85000, 90000, 95000, 100000, 105000, 110000,
  115000, 120000, 125000, 130000, 135000, 140000, 145000, 150000,
];

// Reusable Schemas
const cpu_motherboard_schema = new mongoose.Schema({
  intel: { cpus: [cpu_schema], motherboards: [motherboard_schema] },
  amd: { cpus: [cpu_schema], motherboards: [motherboard_schema] },
});

// Price Range Schemas
const pc_components_by_price_schema = new mongoose.Schema({
  max_price: { type: Number, enum: priceBrackets, required: true },
  cpu_motherboard_options: cpu_motherboard_schema,
  ram: [ram_schema],
  power_supply: [power_supply_schema],
  cabinet: [cabinet_schema],
});

const gpu_price_schema = new mongoose.Schema({
  max_price: { type: Number, enum: priceBrackets, required: true },
  gpu: {
    nvidia: [gpu_schema],
    amd: [gpu_schema],
  },
});

// Models
const pc_components = mongoose.model("pc_components", pc_components_by_price_schema);
const gpu_options = mongoose.model("gpu_options", gpu_price_schema);
const power_supply_options = mongoose.model("power_supply_options", power_supply_schema);
const storage_options = mongoose.model("storage_options", storage_schema);

export { pc_components, storage_options, gpu_options, power_supply_options };
