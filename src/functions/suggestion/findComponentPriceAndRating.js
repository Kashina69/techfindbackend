import axios from "axios";
import cheerio from "cheerio";

export default async function findComponentPriceAndRating(componentLink) {
  try {
    const response = await axios.get(componentLink);
    const $ = cheerio.load(response.data);

    let price, rating;

    if (componentLink.includes("flipkart.com")) {
      // Scrape Flipkart
      price = $("._30jeq3._16Jk6d").first().text().trim();
      rating = $("._3LWZlK").first().text().trim();
    } else if (
      componentLink.includes("amazon.com") ||
      componentLink.includes("amazon.in")
    ) {
      // Scrape Amazon
      price = $(".a-price-whole").first().text().trim();
      rating = $(".a-icon-star-small .a-icon-alt")
        .first()
        .text()
        .trim()
        .split(" ")[0];
    } else {
      throw new Error("Unsupported website");
    }

    return { price, rating };
  } catch (error) {
    console.error("Error fetching component data:", error);
    return { price: "N/A", rating: "N/A" };
  }
}
