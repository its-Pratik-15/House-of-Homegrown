import { useState, useEffect } from 'react'
import { cartService } from '../services/cartService'

export const useCart = () => {
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchCart = async () => {
        setLoading(true)
        setError(null)
        
        try {
            const data = await cartService.getCart()
            setCart(data.data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching cart:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const addToCart = async (productId, quantity = 1) => {
        try {
            await cartService.addToCart(productId, quantity)
            await fetchCart() // Refresh cart after adding
            return { success: true }
        } catch (error) {
            console.error('Error adding to cart:', error)
            return { success: false, error: error.message }
        }
    }

    const updateCartItem = async (itemId, quantity) => {
        try {
            await cartService.updateCartItem(itemId, quantity)
            await fetchCart() // Refresh cart after updating
            return { success: true }
        } catch (error) {
            console.error('Error updating cart item:', error)
            return { success: false, error: error.message }
        }
    }

    const removeFromCart = async (itemId) => {
        try {
            await cartService.removeFromCart(itemId)
            await fetchCart() // Refresh cart after removing
            return { success: true }
        } catch (error) {
            console.error('Error removing from cart:', error)
            return { success: false, error: error.message }
        }
    }

    const clearCart = async () => {
        try {
            await cartService.clearCart()
            await fetchCart() // Refresh cart after clearing
            return { success: true }
        } catch (error) {
            console.error('Error clearing cart:', error)
            return { success: false, error: error.message }
        }
    }

    const getCartItemCount = () => {
        if (!cart || !cart.items) return 0
        return cart.items.reduce((total, item) => total + item.quantity, 0)
    }

    const getCartTotal = () => {
        if (!cart || !cart.items) return 0
        return cart.items.reduce((total, item) => total + (item.priceAtTime * item.quantity), 0)
    }

    return {
        cart,
        loading,
        error,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        refetchCart: fetchCart,
        getCartItemCount,
        getCartTotal,
    }
}

export default useCart