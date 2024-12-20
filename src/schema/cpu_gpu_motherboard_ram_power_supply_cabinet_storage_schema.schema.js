import base_component_schema from "./base_component_schema.schema";

const cpu_schema = new base_component_schema({
  benchmark_url: { type: String, unique: true, required: true },
  benchmark_number: { type: String, required: true },
  supports_ddr5: { type: Boolean, required: true },
  has_integrated_gpu: { type: Boolean, required: true },
  integrated_gpu_benchmark_link: { type: String, required: true },
  integrated_gpu_benchmark_numbers: { type: String, required: true },
  integrated_gpu_name: { type: String, required: true },
});

const gpu_schema = new base_component_schema({
  benchmark_url: { type: String, unique: true, required: true },
  benchmark_numbers: { type: String, required: true },
});

const motherboard_schema = new base_component_schema({
  official_website_url: { type: String, unique: true, required: true },
  supports_ddr5: { type: String, required: true },
});

const ram_schema = new base_component_schema({
  is_ddr5: { type: Boolean, required: true },
});

const power_supply_schema = new base_component_schema({
  power_wattage: { type: Number, required: true },
});

const cabinet_schema = new base_component_schema({});

const storage_schema = new base_component_schema({
  size: { type: String, required: true },
  type: {
    type: String,
    enum: ["HDD", "SSD", "M.2", "NVME", "GEN3", "GEN4"],
    required: true,
  },
  price: { type: Number, required: false },
});

export default {cpu_schema, gpu_schema, motherboard_schema, ram_schema, power_supply_schema, cabinet_schema, storage_schema}