function getCPUGPUBrandPriority(category, maxPrice) {
  let cpuBrand = "";
  let gpuBrand = false;

  if (
    category[0] == "gaming" ||
    category[1] == "gaming" ||
    category[0] == "videoEditing" ||
    category[1] == "videoEditing"
  ) {
    if (maxPrice < 25000) {
      cpuBrand = "amd";
      gpuBrand = "none";
    }
  } else {
    if (category[0] === "gaming") {
      cpuBrand = "intel";
      gpuBrand = "amd";
    } else if (category[0] === "videoEditing") {
      cpuBrand = "amd";
      gpuBrand = "nvidia";
    } else if (category[0] === "coding") {
      cpuBrand = "intel";
      if (category[1] === "videoEditing") {
        gpuBrand = "nvidia";
      } else if (category[1] === "gaming") {
        gpuBrand = "amd";
      }
    }
  }

  return { cpuBrand, gpuBrand };
}

export default getCPUGPUBrandPriority;

// amd cpu priority if under 20k and need for gaming in high price intel cpu and for single core performence task like gaming if video editing in high price then amd
