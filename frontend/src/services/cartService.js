import ApiService from './api'

// Guest token management
const GUEST_TOKEN_KEY = 'guest_cart_token'

const getGuestToken = () => {
    try {
        // First try localStorage
        const localToken = localStorage.getItem(GUEST_TOKEN_KEY)
        if (localToken) return localToken
        
        // Fallback to cookies
        const cookies = document.cookie.split(';')
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=')
            if (name === 'guest_token') {
                return value
            }
        }
        return null
    } catch (error) {
        console.error('Error reading guest token:', error)
        return null
    }
}

const setGuestToken = (token) => {
    try {
        localStorage.setItem(GUEST_TOKEN_KEY, token)
    } catch (error) {
        console.error('Error storing guest token:', error)
    }
}

const removeGuestToken = () => {
    try {
        localStorage.removeItem(GUEST_TOKEN_KEY)
    } catch (error) {
        console.error('Error removing guest token:', error)
    }
}

// Enhanced API service with guest token handling
class CartApiService {
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
        console.log('CartApiService initialized with baseUrl:', this.baseUrl)
    }

    async request(endpoint, options = {}) {
        const guestToken = getGuestToken()
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        }

        // Add guest token to authorization header if available
        if (guestToken) {
            headers.Authorization = `Bearer ${guestToken}`
        }

        const config = {
            ...options,
            headers,
            credentials: 'include', // Include cookies in requests
        }

        const fullUrl = `${this.baseUrl}/cart${endpoint}`
        console.log('Cart API request:', {
            url: fullUrl,
            baseUrl: this.baseUrl,
            method: config.method || 'GET',
            headers,
            body: config.body
        })

        try {
            const response = await fetch(fullUrl, config)
            
            console.log('Cart API response status:', response.status)
            
            if (!response.ok) {
                const errorText = await response.text()
                console.error('Cart API error response:', errorText)
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Check for new guest token in response headers
            const newGuestToken = response.headers.get('X-Guest-Token')
            if (newGuestToken) {
                console.log('Received new guest token:', newGuestToken)
                setGuestToken(newGuestToken)
            }

            const data = await response.json()
            console.log('Cart API response data:', data)
            return data.success ? data : data
        } catch (error) {
            console.error('Cart API request failed:', error)
            throw error
        }
    }

    async get(endpoint = '') {
        return this.request(endpoint)
    }

    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        })
    }
}

const cartApiService = new CartApiService()

export const cartService = {
    // Get cart (works for both guest and logged-in users)
    async getCart() {
        return cartApiService.get('')
    },

    // Get cart items (formatted for cart page)
    async getCartItems() {
        const cartData = await cartApiService.get('')
        // Return the items array from the cart data
        return cartData.data?.items || cartData.items || []
    },

    // Add item to cart
    async addToCart(productId, quantity = 1) {
        console.log('Adding to cart:', { productId, quantity })
        console.log('Current guest token:', getGuestToken())
        
        try {
            const result = await cartApiService.post('/items', {
                productId,
                quantity,
            })
            console.log('Add to cart result:', result)
            return result
        } catch (error) {
            console.error('Add to cart error:', error)
            throw error
        }
    },

    // Update cart item quantity
    async updateCartItem(itemId, quantity) {
        return cartApiService.put(`/items/${itemId}`, {
            quantity,
        })
    },

    // Remove item from cart
    async removeFromCart(itemId) {
        return cartApiService.delete(`/items/${itemId}`)
    },

    // Clear entire cart
    async clearCart() {
        return cartApiService.delete('')
    },

    // Get guest token (for debugging/info)
    getGuestToken,

    // Clear guest token (when user logs in)
    clearGuestToken: removeGuestToken,
}

export default cartService