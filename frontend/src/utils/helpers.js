// Debounce function for search inputs
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

// Throttle function for scroll events
export const throttle = (func, limit) => {
    let inThrottle
    return function() {
        const args = arguments
        const context = this
        if (!inThrottle) {
            func.apply(context, args)
            inThrottle = true
            setTimeout(() => inThrottle = false, limit)
        }
    }
}

// Local storage helpers
export const storage = {
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : defaultValue
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return defaultValue
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error('Error writing to localStorage:', error)
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key)
        } catch (error) {
            console.error('Error removing from localStorage:', error)
        }
    }
}

// URL parameter helpers
export const getUrlParams = (url = window.location.href) => {
    const urlObj = new URL(url)
    return Object.fromEntries(urlObj.searchParams.entries())
}

export const updateUrlParams = (params) => {
    const url = new URL(window.location.href)
    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            url.searchParams.set(key, value)
        } else {
            url.searchParams.delete(key)
        }
    })
    window.history.replaceState({}, '', url.toString())
}

// Image loading helper
export const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}