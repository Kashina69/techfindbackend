import {
  PCComponentsOptions,
  StorageOptions,
  GPUOptions,
  PowerSupplyOptions,
} from "../../schema/componentes.schema.js";
import find_Ram_Motherboard_Cabinate_Storage_Cooler from "../suggestion/find_Ram_Motherboard_Cabinate_Storage_Cooler.js";
import getPriceAllocation from "../suggestion/getPriceAlocation.js";
import getCPUGPUBrandPriority from "../suggestion/getCPUGPUPriority.js";

export default async function findComponent(
  priceKey,
  maxPrice,
  category,
  storage
) {
  const { Ram_Motherboard_Cabinate_Storage_Cooler, totalPrice } =
    find_Ram_Motherboard_Cabinate_Storage_Cooler(
      priceKey,
      maxPrice,
      category,
      storageSize
    );
  let newPrice = maxPrice - totalPrice;
  const priceAllocation = getPriceAllocation(category, newPrice);
  const CPUGPUPriority = getCPUGPUBrandPriority(category, maxPrice);
  let { cpu, gpu, powerSupply } = getCPUGPUPowerSupply(
    priceAllocation,
    CPUGPUPriority,
    newPrice,
    priceKey,
    maxPrice
  );
  let componentes = {
    cpu,
    gpu,
    powerSupply,
    Ram_Motherboard_Cabinate_Storage_Cooler,
  };
}

function getCPUGPUPowerSupply(
  priceAllocation,
  CPUGPUPriority,
  newPrice,
  priceKey,
  maxPrice
) { }
