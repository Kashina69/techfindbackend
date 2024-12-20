import {
  cpu_motherboard_ram_power_supply_cabinet_components_options as PCComponentsOptions,
  storage_options as StorageOptions,
  gpu_options as GPUOptions,
  power_supply_options as PowerSupplyOptions,
} from '../schema/components.schema.js';

const resetAmazonAndFlipkartFields = async () => {
  try {
    console.log("Starting the reset process for Amazon and Flipkart fields...");

    // Reset fields in PCComponentsOptions
    await PCComponentsOptions.updateMany({}, {
      $set: {
        "cpuAndMotherboardOptions.intel.cpus.$[].amazonPrice": null,
        "cpuAndMotherboardOptions.intel.cpus.$[].amazonRating": null,
        "cpuAndMotherboardOptions.intel.cpus.$[].isAvailableOnAmazon": null,
        "cpuAndMotherboardOptions.intel.cpus.$[].flipkartPrice": null,
        "cpuAndMotherboardOptions.intel.cpus.$[].flipkartRating": null,
        "cpuAndMotherboardOptions.intel.cpus.$[].isAvailableOnFlipkart": null,

        "cpuAndMotherboardOptions.amd.cpus.$[].amazonPrice": null,
        "cpuAndMotherboardOptions.amd.cpus.$[].amazonRating": null,
        "cpuAndMotherboardOptions.amd.cpus.$[].isAvailableOnAmazon": null,
        "cpuAndMotherboardOptions.amd.cpus.$[].flipkartPrice": null,
        "cpuAndMotherboardOptions.amd.cpus.$[].flipkartRating": null,
        "cpuAndMotherboardOptions.amd.cpus.$[].isAvailableOnFlipkart": null,

        "ram.$[].amazonPrice": null,
        "ram.$[].amazonRating": null,
        "ram.$[].isAvailableOnAmazon": null,
        "ram.$[].flipkartPrice": null,
        "ram.$[].flipkartRating": null,
        "ram.$[].isAvailableOnFlipkart": null,

        "powerSupply.$[].amazonPrice": null,
        "powerSupply.$[].amazonRating": null,
        "powerSupply.$[].isAvailableOnAmazon": null,
        "powerSupply.$[].flipkartPrice": null,
        "powerSupply.$[].flipkartRating": null,
        "powerSupply.$[].isAvailableOnFlipkart": null,

        "cabinet.$[].amazonPrice": null,
        "cabinet.$[].amazonRating": null,
        "cabinet.$[].isAvailableOnAmazon": null,
        "cabinet.$[].flipkartPrice": null,
        "cabinet.$[].flipkartRating": null,
        "cabinet.$[].isAvailableOnFlipkart": null,
      },
    });
    console.log("PCComponentsOptions reset completed.");

    // Reset fields in GPUOptions
    await GPUOptions.updateMany({}, {
      $set: {
        "gpu.nvidia.$[].amazonPrice": null,
        "gpu.nvidia.$[].amazonRating": null,
        "gpu.nvidia.$[].isAvailableOnAmazon": null,
        "gpu.nvidia.$[].flipkartPrice": null,
        "gpu.nvidia.$[].flipkartRating": null,
        "gpu.nvidia.$[].isAvailableOnFlipkart": null,

        "gpu.amd.$[].amazonPrice": null,
        "gpu.amd.$[].amazonRating": null,
        "gpu.amd.$[].isAvailableOnAmazon": null,
        "gpu.amd.$[].flipkartPrice": null,
        "gpu.amd.$[].flipkartRating": null,
        "gpu.amd.$[].isAvailableOnFlipkart": null,
      },
    });
    console.log("GPUOptions reset completed.");

    // Reset fields in StorageOptions
    await StorageOptions.updateMany({}, {
      $set: {
        amazonPrice: null,
        amazonRating: null,
        isAvailableOnAmazon: null,
        flipkartPrice: null,
        flipkartRating: null,
        isAvailableOnFlipkart: null,
      },
    });
    console.log("StorageOptions reset completed.");

    // Reset fields in PowerSupplyOptions
    await PowerSupplyOptions.updateMany({}, {
      $set: {
        amazonPrice: null,
        amazonRating: null,
        isAvailableOnAmazon: null,
        flipkartPrice: null,
        flipkartRating: null,
        isAvailableOnFlipkart: null,
      },
    });
    console.log("PowerSupplyOptions reset completed.");

    console.log("All fields successfully reset to null.");
  } catch (error) {
    console.error("Error resetting fields:", error);
  }
};

export default resetAmazonAndFlipkartFields;
