import findComponentsFromDB from "../../schema/findComponentsFromDB.js"

function find_Ram_Motherboard_Cabinate_Storage_Cooler(
  priceKey,
  maxPrice,
  category,
  storage
) {
  // find best components like according to price chose the ram storage cooler (fan or aio ) motherboard

  // let Ram_Motherboard_Cabinate_Storage_Cooler =  findComponentsFromDB(['ram','motherBoard','cabinate','storage','cooler'], priceKey, storageSize, priceAllocation = null, CPUGPUBrandPriority = null , newPrice = null )
  // let {amazonPrice, flipkartPrice} = getAmazonAndFlipkartPrice(price, isCoolerRequired)
  let Ram_Motherboard_Cabinate_Storage_Cooler = {
    ram: {
        price: 2817,
        name: "16GB DDR4 XPG ADATA GAMMIX D30",
        imgURL: "https://m.media-amazon.com/images/I/81lTPWJ+QZL._SX425_.jpg",
        amazonURL: "https://www.amazon.in/XPG-GAMMIX-1x16GB-3200MHz-Desktop/dp/B085HS73KD/",
        amazonPrice: 2817,
        flipkartURL: "https://www.flipkart.in/XPG-GAMMIX-1x16GB-3200MHz-Desktop/dp/B085HS73KD/",
        flipkartPrice: 2817,
    },
    motherboard: {
        price: 10300,
        name: "ASUS ROG Strix B450-F Gaming",
        imgURL: "https://m.media-amazon.com/images/I/81g1Z1g1g1L._AC_SL1500_.jpg",
        amazonURL: "https://www.amazon.in/ASUS-ROG-Strix-B450-F-Gaming/dp/B07F6Y5Y5Y/",
        amazonPrice: 10300,
        flipkartURL: "https://www.flipkart.in/ASUS-ROG-Strix-B450-F-Gaming/dp/B07F6Y5Y5Y/",
        flipkartPrice: 10300,
    },
    cabinate: {
        price: 2500,
        name: "Cooler Master MasterBox Q300L",
        imgURL: "https://m.media-amazon.com/images/I/81g1Z1g1g1L._AC_SL1500_.jpg",
        amazonURL: "https://www.amazon.in/Cooler-Master-MasterBox-Q300L/dp/B07B4F4F4F/",
        amazonPrice: 2500,
        flipkartURL: "https://www.flipkart.in/Cooler-Master-MasterBox-Q300L/dp/B07B4F4F4F/",
        flipkartPrice: 2500,
    },
    storage: {
        price: 5000,
        name: "Samsung 970 EVO Plus 1TB NVMe SSD",
        imgURL: "https://m.media-amazon.com/images/I/81g1Z1g1g1L._AC_SL1500_.jpg",
        amazonURL: "https://www.amazon.in/Samsung-970-EVO-Plus-MZ-V7S1T0BW/dp/B07MGZ9Y5Y/",
        amazonPrice: 5000,
        flipkartURL: "https://www.flipkart.in/Samsung-970-EVO-Plus-1TB/dp/B07MGZ9Y5Y/",
        flipkartPrice: 5000,
    },
    cooler: {
        price: 6000,
        name: "Cooler Master Hyper 212 RGB",
        imgURL: "https://m.media-amazon.com/images/I/81g1Z1g1g1L._AC_SL1500_.jpg",
        amazonURL: "https://www.amazon.in/Cooler-Master-Hyper-212-RGB/dp/B07H4F4F4F/",
        amazonPrice: 6000,
        flipkartURL: "https://www.flipkart.in/Cooler-Master-Hyper-212-RGB/dp/B07H4F4F4F/",
        flipkartPrice: 6000,
    },
  };
  // add price for each cabinate should be picked from the left over money storage should have a logic if lower then this price chose a 500gb storage if more then this 1tb and if more then this 2tb
  // if gaming use a cpu fan and if over 50k with non gaming use a aio
  // need a entire cpu and aio tier list for perfect aio for that price computer
  // cooler should only be after a rs70k build and min price is 6k and max 20k
}
