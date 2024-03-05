import ApiService from './api'

// Guest token management
const GUEST_TOKEN_KEY = 'guest_cart_token'

const getGuestToken = () => {
    try {
        return localStorage.getItem(GUEST_TOKEN_KEY)
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
        }

        try {
            const response = await fetch(`http://localhost:3001/api/cart${endpoint}`, config)
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            // Check for new guest token in response headers
            const newGuestToken = response.headers.get('X-Guest-Token')
            if (newGuestToken) {
                setGuestToken(newGuestToken)
            }

            const data = await response.json()
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

    // Add item to cart
    async addToCart(productId, quantity = 1) {
        return cartApiService.post('/items', {
            productId,
            quantity,
        })
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