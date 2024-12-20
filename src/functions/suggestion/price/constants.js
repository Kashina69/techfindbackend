export const PRICE_RATIOS = {
    gaming: {
        cpu: 0.23,
        gpu: 0.35,
        power_supply: 0.064,
        ram: 0.12,
        storage: 0.10,
        motherboard: 0.08,
        cabinet: 0.056
    },
    video_editing: {
        cpu: 0.28,
        gpu: 0.30,
        power_supply: 0.06,
        ram: 0.15,
        storage: 0.12,
        motherboard: 0.06,
        cabinet: 0.03
    },
    // ... other categories
};

export const BRAND_PRIORITIES = {
    gaming: {
        cpu: 'intel',
        gpu: 'nvidia'
    },
    video_editing: {
        cpu: 'amd',
        gpu: 'nvidia'
    }
    // ... other priorities
}; 