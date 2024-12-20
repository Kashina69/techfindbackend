
// Base schema for common fields
const base_component_schema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    image_url: { type: String, unique: true, required: true },
    amazon_url: { type: String, unique: true, required: true },
    amazon_price: { type: Number, required: false },
    amazon_rating: { type: Number, required: false },
    is_available_on_amazon: { type: Number, required: false },
    flipkart_url: { type: String, unique: true, required: true },
    flipkart_price: { type: Number, required: false },
    flipkart_rating: { type: Number, required: false },
    is_available_on_flipkart: { type: Number, required: false },
  });
export default base_component_schema