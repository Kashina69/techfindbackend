export default function generateDocumentation(
  minPrice,
  maxPrice,
  categorys,
  totalPrice,
  components,
  storage
) {
  let documentation = `
We've created a custom PC build for you within the price range of $${minPrice} to $${maxPrice}, optimized for ${categorys.join(
    ", "
  )}. Here's a breakdown of the components we've selected and why:

1. CPU: ${components.cpu}
${getCPUReasoning(components.cpu, categorys)}

2. GPU: ${components.gpu}
${getGPUReasoning(components.gpu, categorys)}

3. RAM: ${components.ram}
${getRAMReasoning(components.ram, categorys)}

4. Power Supply: ${components.powerSupply}
${getPowerSupplyReasoning(components.powerSupply, totalPrice)}

5. Storage: ${storage}
${getStorageReasoning(storage, categorys)}

6. Case: ${components.case}
${getCaseReasoning(components.case, totalPrice)}

Total Price: $${totalPrice}

This build offers a great balance of performance and value within your specified budget, tailored to your needs for ${categorys.join(
    ", "
  )}.
`;

  return documentation;
}

function getCPUReasoning(cpu, categorys) {
  if (categorys.includes("gaming")) {
    return `We chose this CPU for its excellent gaming performance, providing high clock speeds and multiple cores to handle modern games efficiently.`;
  } else if (categorys.includes("workstation")) {
    return `This CPU was selected for its strong multi-threaded performance, ideal for demanding workstation tasks such as video editing and 3D rendering.`;
  } else {
    return `This CPU offers a good balance of performance and energy efficiency, suitable for a wide range of tasks.`;
  }
}

function getGPUReasoning(gpu, categorys) {
  if (categorys.includes("gaming")) {
    return `This GPU delivers excellent frame rates in modern games, ensuring smooth gameplay at high resolutions and settings.`;
  } else if (categorys.includes("workstation")) {
    return `We selected this GPU for its strong compute capabilities, beneficial for tasks like 3D modeling and video editing.`;
  } else {
    return `This GPU provides good all-around performance for general use and light gaming.`;
  }
}

function getRAMReasoning(ram, categorys) {
  if (categorys.includes("workstation") || categorys.includes("gaming")) {
    return `We've included high-capacity, fast RAM to ensure smooth multitasking and quick data access for demanding applications and games.`;
  } else {
    return `This RAM configuration offers a good balance of capacity and speed for everyday computing tasks.`;
  }
}

function getPowerSupplyReasoning(powerSupply, totalPrice) {
  if (totalPrice > 1500) {
    return `We've chosen a high-wattage, efficient power supply to ensure stable power delivery for all components, with room for future upgrades.`;
  } else {
    return `This power supply provides reliable power delivery for your components while maintaining good energy efficiency.`;
  }
}

function getStorageReasoning(storage, categorys) {
  if (storage.includes("SSD") && storage.includes("HDD")) {
    return `We've combined a fast SSD for quick boot times and frequently used applications, with a larger HDD for mass storage of files and media.`;
  } else if (storage.includes("SSD")) {
    return `An SSD was chosen for its fast read/write speeds, ensuring quick boot times and responsive application launches.`;
  } else {
    return `This storage solution offers a good balance of capacity and cost-effectiveness for your needs.`;
  }
}

function getCaseReasoning(caseModel, totalPrice) {
  if (totalPrice > 2000) {
    return `We've selected a premium case with excellent airflow and cable management features, ensuring optimal cooling and a clean aesthetic.`;
  } else {
    return `This case provides good airflow and cable management options, balancing functionality with cost-effectiveness.`;
  }
}

// generate a template which will use all the parameters and using some if else condition generate a documentation of why we used these components like caus we were in these price range and have to make a pc of categorys thse we used these components the cpu is this and because xxxxx the gpu is this and because xxxxx ram is this and because xxxxx powersupply is this and because xxxxx storage is this and because xxxxx cabinate is this and because xxxxx and now our total price is totalPrice
