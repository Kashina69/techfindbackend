import axios from 'axios';

const get_details_from_amazon = async (components) => {
  try {
    components.forEach(component => {
        // get the page of amazon and then find the price rating availability
    });
  } catch (error) {
    console.error(`Error fetching Amazon price for ${component.name}:`, error);
    return null;
  }
};

const  get_details_from_flipkart = async (components) => {
  try {
    components.forEach(component => {
        // get the page of amazon and then find the price rating availability
    });
  } catch (error) {
    console.error(`Error fetching Flipkart price for ${component.name}:`, error);
    return null;
  }
};

export default get_details_from_amazon_flipkart = async(components_flipkart_link, components_amazon_link)=>{
    const details_from_amazon = await get_details_from_amazon(components_amazon_link) 
    const details_from_flipkart = await get_details_from_flipkart(components_flipkart_link)
}