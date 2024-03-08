import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Heart } from 'lucide-react'
import PremiumCTAButton from '@/components/ui/premium-cta-button'
import { formatPrice } from '../utils/formatters'
import { cartService } from '../services/cartService'

export default function Cart() {
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [updatingItems, setUpdatingItems] = useState(new Set())

    useEffect(() => {
        fetchCartItems()
    }, [])

    const fetchCartItems = async () => {
        try {
            setLoading(true)
            const items = await cartService.getCartItems()
            setCartItems(items)
        } catch (err) {
            setError('Failed to load cart items')
            console.error('Error fetching cart:', err)
        } finally {
            setLoading(false)
        }
    }

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return

        setUpdatingItems(prev => new Set(prev).add(itemId))
        try {
            await cartService.updateCartItem(itemId, newQuantity)
            setCartItems(prev =>
                prev.map(item =>
                    item.id === itemId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            )
        } catch (err) {
            console.error('Error updating quantity:', err)
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev)
                newSet.delete(itemId)
                return newSet
            })
        }
    }

    const removeItem = async (itemId) => {
        setUpdatingItems(prev => new Set(prev).add(itemId))
        try {
            await cartService.removeFromCart(itemId)
            setCartItems(prev => prev.filter(item => item.id !== itemId))
        } catch (err) {
            console.error('Error removing item:', err)
        } finally {
            setUpdatingItems(prev => {
                const newSet = new Set(prev)
                newSet.delete(itemId)
                return newSet
            })
        }
    }

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    }

    const calculateSavings = () => {
        return cartItems.reduce((total, item) => {
            if (item.product.mrp && item.product.mrp > item.product.price) {
                return total + ((item.product.mrp - item.product.price) * item.quantity)
            }
            return total
        }, 0)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20">
                <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 animate-pulse">
                                <div className="flex space-x-4">
                                    <div className="w-24 h-24 bg-[#E8E2D4] rounded-2xl"></div>
                                    <div className="flex-1 space-y-3">
                                        <div className="h-4 bg-[#E8E2D4] rounded-full w-3/4"></div>
                                        <div className="h-4 bg-[#E8E2D4] rounded-full w-1/2"></div>
                                        <div className="h-4 bg-[#E8E2D4] rounded-full w-1/4"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20">
                <div className="max-w-md mx-auto text-center py-16 px-4">
                    <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">😔</span>
                    </div>
                    <h2 className="text-2xl text-page-heading text-[#8B5E3C] mb-4">
                        Something went wrong
                    </h2>
                    <p className="text-[#A0956B] mb-8 text-body leading-relaxed">
                        {error}
                    </p>
                    <PremiumCTAButton onClick={() => fetchCartItems()} variant="secondary">
                        Try Again
                    </PremiumCTAButton>
                </div>
            </div>
        )
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20">
                <div className="max-w-md mx-auto text-center py-16 px-4">
                    <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingBag className="h-8 w-8 text-[#8B5E3C]" />
                    </div>
                    <h2 className="text-2xl text-page-heading text-[#8B5E3C] mb-4">
                        Your cart is empty
                    </h2>
                    <p className="text-[#A0956B] mb-8 text-body leading-relaxed">
                        Discover our collection of sustainable, handcrafted products made with love and tradition.
                    </p>
                    <PremiumCTAButton onClick={() => navigate('/products')} variant="primary">
                        Start Shopping
                    </PremiumCTAButton>
                </div>
            </div>
        )
    }

    const subtotal = calculateSubtotal()
    const savings = calculateSavings()
    const shipping = 0 // Free shipping
    const total = subtotal + shipping

    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center space-x-2 text-[#8B5E3C] hover:text-[#6B4423] transition-colors group"
                        >
                            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                            <span className="text-button">Back</span>
                        </button>
                        <div className="h-6 w-px bg-[#E8E2D4]"></div>
                        <h1 className="text-2xl md:text-3xl text-page-heading text-[#8B5E3C]">
                            Shopping Cart
                        </h1>
                    </div>
                    <div className="text-[#A0956B] text-body">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-[#F5F1E8]">
                                <div className="flex space-x-4">
                                    {/* Product Image */}
                                    <div
                                        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-[#F5F1E8] shrink-0 cursor-pointer"
                                        onClick={() => navigate(`/products/${item.product.id}`)}
                                    >
                                        {item.product.images && item.product.images.length > 0 ? (
                                            <img
                                                src={item.product.images[0].url}
                                                alt={item.product.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-[#A0956B] text-xs text-body">No Image</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex-1 min-w-0 pr-4">
                                                {/* Category */}
                                                {item.product.category && (
                                                    <div className="text-xs text-[#A0956B] text-body uppercase tracking-wider mb-1">
                                                        {item.product.category.name}
                                                    </div>
                                                )}

                                                {/* Product Name */}
                                                <h3
                                                    className="text-lg text-section-title text-[#8B5E3C] leading-tight cursor-pointer hover:text-[#6B4423] transition-colors"
                                                    onClick={() => navigate(`/products/${item.product.id}`)}
                                                >
                                                    {item.product.title}
                                                </h3>

                                                {/* Price */}
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="text-lg text-price text-[#8B5E3C]">
                                                        {formatPrice(item.product.price)}
                                                    </span>
                                                    {item.product.mrp && item.product.mrp > item.product.price && (
                                                        <span className="text-sm text-[#A0956B] line-through text-body">
                                                            {formatPrice(item.product.mrp)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                disabled={updatingItems.has(item.id)}
                                                className="p-2 text-[#A0956B] hover:text-[#8B5E3C] hover:bg-[#F5F1E8] rounded-xl transition-all duration-200 disabled:opacity-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1 || updatingItems.has(item.id)}
                                                    className="w-8 h-8 rounded-full border border-[#E8E2D4] flex items-center justify-center hover:border-[#8B5E3C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-button text-[#8B5E3C]">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    disabled={updatingItems.has(item.id)}
                                                    className="w-8 h-8 rounded-full border border-[#E8E2D4] flex items-center justify-center hover:border-[#8B5E3C] transition-colors disabled:opacity-50"
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className="text-lg text-price text-[#8B5E3C]">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F5F1E8] sticky top-24">
                            <h2 className="text-xl text-section-title text-[#8B5E3C] mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-body">
                                    <span className="text-[#A0956B]">Subtotal</span>
                                    <span className="text-[#8B5E3C]">{formatPrice(subtotal)}</span>
                                </div>

                                {savings > 0 && (
                                    <div className="flex justify-between text-body">
                                        <span className="text-[#2F7D32]">You save</span>
                                        <span className="text-[#2F7D32]">-{formatPrice(savings)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-body">
                                    <span className="text-[#A0956B]">Shipping</span>
                                    <span className="text-[#2F7D32]">Free</span>
                                </div>

                                <div className="border-t border-[#E8E2D4] pt-4">
                                    <div className="flex justify-between text-lg">
                                        <span className="text-section-title text-[#8B5E3C]">Total</span>
                                        <span className="text-price text-[#8B5E3C]">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <PremiumCTAButton
                                onClick={() => {
                                    // Navigate to checkout
                                    console.log('Proceeding to checkout...')
                                }}
                                variant="primary"
                                className="w-full mb-4"
                            >
                                Proceed to Checkout
                            </PremiumCTAButton>

                            {/* Continue Shopping */}
                            <button
                                onClick={() => navigate('/products')}
                                className="w-full py-3 text-[#8B5E3C] text-button hover:text-[#6B4423] transition-colors"
                            >
                                Continue Shopping
                            </button>

                            {/* Trust Signals */}
                            <div className="mt-6 pt-6 border-t border-[#E8E2D4] space-y-3">
                                <div className="flex items-center space-x-3 text-sm text-[#A0956B] text-body">
                                    <div className="w-2 h-2 bg-[#2F7D32] rounded-full"></div>
                                    <span>Free shipping on all orders</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-[#A0956B] text-body">
                                    <div className="w-2 h-2 bg-[#2F7D32] rounded-full"></div>
                                    <span>30-day return policy</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-[#A0956B] text-body">
                                    <div className="w-2 h-2 bg-[#2F7D32] rounded-full"></div>
                                    <span>Secure checkout</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}