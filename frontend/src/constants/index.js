// API Configuration
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    TIMEOUT: 10000,
}

// Category mappings
export const CATEGORY_TYPES = {
    WELLNESS: 'WELLNESS',
    TEXTILES: 'TEXTILES',
    HOME_LIVING: 'HOME_LIVING',
    LIFESTYLE: 'LIFESTYLE',
}

export const CATEGORY_ROUTES = {
    [CATEGORY_TYPES.WELLNESS]: '/wellness',
    [CATEGORY_TYPES.TEXTILES]: '/textiles',
    [CATEGORY_TYPES.HOME_LIVING]: '/home-living',
    [CATEGORY_TYPES.LIFESTYLE]: '/lifestyle',
}

export const CATEGORY_LABELS = {
    [CATEGORY_TYPES.WELLNESS]: 'Wellness',
    [CATEGORY_TYPES.TEXTILES]: 'Textiles',
    [CATEGORY_TYPES.HOME_LIVING]: 'Home & Living',
    [CATEGORY_TYPES.LIFESTYLE]: 'Lifestyle',
}

// Sort options
export const SORT_OPTIONS = [
    { value: 'name', label: 'Sort by Name' },
    { value: 'price', label: 'Sort by Price' },
    { value: 'createdAt', label: 'Sort by Newest' },
]

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 50,
}

// UI Constants
export const BREAKPOINTS = {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
}

// Brand colors
export const COLORS = {
    PRIMARY: '#8B5E3C', // Earthy Brown
    SECONDARY: '#F5F1E8', // Beige
    ACCENT: '#6B8E23', // Green
}

// Animation durations
export const ANIMATIONS = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
}