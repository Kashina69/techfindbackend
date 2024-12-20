import { PRICE_RATIOS } from './constants.js';
import { validate_category, validate_price } from '../../utils/validators.js';

export function get_price_allocation(categories, price) {
    validate_category(categories);
    validate_price(price);

    const allocation = calculate_base_allocation(categories);
    
    return adjust_allocation_for_price(allocation, price);
}

function calculate_base_allocation(categories) {
    if (categories.length === 1) {
        return PRICE_RATIOS[categories[0]];
    }

    return average_category_ratios(categories);
}

function average_category_ratios(categories) {
    const combined_ratios = {};
    
    for (const component in PRICE_RATIOS[categories[0]]) {
        combined_ratios[component] = categories.reduce((sum, category) => 
            sum + PRICE_RATIOS[category][component], 0) / categories.length;
    }
    
    return combined_ratios;
}

function adjust_allocation_for_price(allocation, price) {
    const adjusted_allocation = { ...allocation };

    if (price < 30000) {
        adjusted_allocation.cpu += adjusted_allocation.gpu;
        adjusted_allocation.gpu = 0;
    }

    return adjusted_allocation;
} 