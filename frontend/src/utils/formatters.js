// Price formatting utilities
export const formatPrice = (price, currency = 'INR') => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
    }).format(price)
}

// Date formatting utilities
export const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    
    return new Intl.DateTimeFormat('en-IN', { ...defaultOptions, ...options }).format(new Date(date))
}

// Number formatting utilities
export const formatNumber = (number, options = {}) => {
    return new Intl.NumberFormat('en-IN', options).format(number)
}

// Text utilities
export const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
}

export const slugify = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Discount calculation
export const calculateDiscount = (originalPrice, salePrice) => {
    if (!originalPrice || !salePrice || originalPrice <= salePrice) return 0
    return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}