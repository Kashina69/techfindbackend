// services/pcBuilder.js
import { findBasicComponentsByPrice, findGPUByPrice, findStorageBySizeAndPrice } from '../db/queries.js';
import { getAmazonPrice, getFlipkartPrice } from '../scrapers/priceScraper.js';

// Core logic for building the PC
export const buildPC = async (userInput) => {
    const { price, storageSize, category } = userInput;

    // Fetch base components (RAM, cabinet, etc.)
    const baseComponents = await findBasicComponentsByPrice(price);

    if (!baseComponents) {
        throw new Error(`No components found for price range: ${price}`);
    }

    // Fetch storage based on user preference or default logic
    const storage = await findStorageBySizeAndPrice(storageSize, price);

    // Fetch GPUs in the price range
    const gpuOptions = await findGPUByPrice(price);

    // Find the best GPU, CPU, and calculate power supply requirements
    const selectedGPU = gpuOptions.gpu.nvidia[0]; // Example: Select first NVIDIA GPU
    const selectedCPU = baseComponents.cpuAndMotherboardOptions.intel.cpus[0]; // Example: Select first CPU

    const powerSupplyRequirement = calculatePowerSupply(selectedGPU, selectedCPU);

    // Get prices for each component from Amazon and Flipkart
    const componentPrices = await Promise.all([
        getAmazonPrice(selectedGPU),
        getFlipkartPrice(selectedGPU),
        getAmazonPrice(selectedCPU),
        getFlipkartPrice(selectedCPU),
    ]);

    return {
        baseComponents,
        storage,
        selectedGPU,
        selectedCPU,
        powerSupplyRequirement,
        componentPrices,
    };
};

// Calculate power supply requirements
const calculatePowerSupply = (gpu, cpu) => {
    const gpuWattage = gpu.powerRequirement || 250; // Example: GPU wattage
    const cpuWattage = cpu.powerRequirement || 95; // Example: CPU wattage
    const buffer = 100; // Add buffer wattage
    return gpuWattage + cpuWattage + buffer;
};
