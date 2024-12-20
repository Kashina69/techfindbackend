/**
 * Generates documentation for the suggested PC build
 * @param {number} min_price - Minimum price constraint
 * @param {number} max_price - Maximum price constraint
 * @param {number} total_price - Total price of the build
 * @param {string[]} categories - Categories of components requested
 * @param {Object} components - Object containing all selected components
 * @param {Object} storage - Storage component details (either custom or normal)
 * @returns {Promise<string>} Documentation string explaining the build
 */

const generate_docs_for_suggestion = async (
  min_price,
  max_price,
  total_price,
  categories,
  components,
  storage
) => {
  try {
    // Create an introduction section
    const intro = `Here's a custom PC build within your budget range of $${min_price} to $${max_price}, totaling $${total_price.toFixed(2)}.`;

    // Generate component breakdown
    const componentBreakdown = Object.entries(components)
      .filter(([key]) => key !== 'custom_storage' && key !== 'normal_storage')
      .map(([key, component]) => {
        if (!component) return '';
        return `\n- ${key.replace(/_/g, ' ').toUpperCase()}: ${component.name} - $${component.price}
  • ${component.description || 'No description available'}`;
      })
      .join('');

    // Add storage section
    const storageSection = storage 
      ? `\n- STORAGE: ${storage.name} - $${storage.price}
  • ${storage.description || 'No description available'}`
      : '\n- No storage selected';

    // Create a performance summary
    const performanceSummary = `\nThis build is optimized for ${categories.join(', ')} usage.`;

    // Combine all sections
    const documentation = `${intro}${componentBreakdown}${storageSection}${performanceSummary}`;

    return documentation;

  } catch (error) {
    console.error('Error generating documentation:', error);
    throw new Error('Failed to generate build documentation');
  }
};

export default generate_docs_for_suggestion;
