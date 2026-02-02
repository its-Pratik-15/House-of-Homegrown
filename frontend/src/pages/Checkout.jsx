import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react'
import PremiumCTAButton from '../components/ui/premium-cta-button'
import { useCart } from '../hooks/useCart'
import { formatPrice } from '../utils/formatters'

export default function Checkout() {
    const navigate = useNavigate()
    const location = useLocation()
    const { cart, getCartTotal, clearCart, loading } = useCart()

    // Get product from Buy Now or use cart items
    const buyNowProduct = location.state?.product
    const buyNowQuantity = location.state?.quantity || 1

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',

        // Shipping Address
        address: '',
        city: '',
        state: '',
        pincode: '',

        // Payment Method
        paymentMethod: 'cod'
    })

    const [isProcessing, setIsProcessing] = useState(false)
    const [errors, setErrors] = useState({})

    // Calculate totals
    const cartItems = cart?.items || []
    const items = buyNowProduct
        ? [{ ...buyNowProduct, quantity: buyNowQuantity }]
        : cartItems

    const subtotal = buyNowProduct
        ? buyNowProduct.price * buyNowQuantity
        : getCartTotal()

    const shipping = subtotal > 1000 ? 0 : 99
    const total = subtotal + shipping

    useEffect(() => {
        // Redirect if no items to checkout
        if (!buyNowProduct && (!cartItems || cartItems.length === 0)) {
            navigate('/cart')
        }
    }, [buyNowProduct, cartItems, navigate])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
        if (!formData.email.trim()) newErrors.email = 'Email is required'
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
        if (!formData.address.trim()) newErrors.address = 'Address is required'
        if (!formData.city.trim()) newErrors.city = 'City is required'
        if (!formData.state.trim()) newErrors.state = 'State is required'
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required'

        // Email validation
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        // Phone validation
        if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number'
        }

        // Pincode validation
        if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
            newErrors.pincode = 'Please enter a valid 6-digit pincode'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsProcessing(true)

        try {
            // Simulate order processing
            await new Promise(resolve => setTimeout(resolve, 2000))

            // Clear cart if it was a cart checkout
            if (!buyNowProduct) {
                clearCart()
            }

            // Navigate to success page
            navigate('/order-success', {
                state: {
                    orderData: {
                        items,
                        total,
                        customerInfo: formData
                    }
                }
            })
        } catch (error) {
            console.error('Order processing failed:', error)
            alert('Order processing failed. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    if (loading && !buyNowProduct) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20 flex items-center justify-center">
                <div className="text-[#8B5E3C] text-body">Loading...</div>
            </div>
        )
    }

    if (items.length === 0) {
        return null // Will redirect in useEffect
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-[#8B5E3C] hover:text-[#6B4423] transition-colors mb-8 group"
                >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-button">Back</span>
                </button>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Checkout Form */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl text-page-heading text-[#8B5E3C] mb-2">
                                Checkout
                            </h1>
                            <p className="text-[#A0956B] text-body">
                                Complete your order details below
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg text-section-title text-[#8B5E3C]">
                                    Personal Information
                                </h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg text-body ${errors.firstName
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                                } focus:outline-none transition-colors`}
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg text-body ${errors.lastName
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                                } focus:outline-none transition-colors`}
                                        />
                                        {errors.lastName && (
                                            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full px-4 py-3 border rounded-lg text-body ${errors.email
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                            } focus:outline-none transition-colors`}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="10-digit mobile number"
                                        className={`w-full px-4 py-3 border rounded-lg text-body ${errors.phone
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                            } focus:outline-none transition-colors`}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="space-y-4">
                                <h3 className="text-lg text-section-title text-[#8B5E3C]">
                                    Shipping Address
                                </h3>
                                <div>
                                    <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                        Address *
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className={`w-full px-4 py-3 border rounded-lg text-body ${errors.address
                                            ? 'border-red-500 focus:border-red-500'
                                            : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                            } focus:outline-none transition-colors resize-none`}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                                    )}
                                </div>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                            City *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg text-body ${errors.city
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                                } focus:outline-none transition-colors`}
                                        />
                                        {errors.city && (
                                            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                            State *
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg text-body ${errors.state
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                                } focus:outline-none transition-colors`}
                                        />
                                        {errors.state && (
                                            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm text-[#8B5E3C] text-body mb-2">
                                            Pincode *
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            value={formData.pincode}
                                            onChange={handleInputChange}
                                            placeholder="6-digit pincode"
                                            className={`w-full px-4 py-3 border rounded-lg text-body ${errors.pincode
                                                ? 'border-red-500 focus:border-red-500'
                                                : 'border-[#E8E2D4] focus:border-[#8B5E3C]'
                                                } focus:outline-none transition-colors`}
                                        />
                                        {errors.pincode && (
                                            <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="space-y-4">
                                <h3 className="text-lg text-section-title text-[#8B5E3C]">
                                    Payment Method
                                </h3>
                                <div className="space-y-3">
                                    <label className="flex items-center space-x-3 p-4 border border-[#E8E2D4] rounded-lg cursor-pointer hover:border-[#8B5E3C] transition-colors">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleInputChange}
                                            className="text-[#8B5E3C]"
                                        />
                                        <CreditCard className="h-5 w-5 text-[#8B5E3C]" />
                                        <div>
                                            <div className="text-[#8B5E3C] text-button">Cash on Delivery</div>
                                            <div className="text-sm text-[#A0956B] text-body">Pay when you receive your order</div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <PremiumCTAButton
                                type="submit"
                                disabled={isProcessing}
                                variant="primary"
                                className="w-full"
                            >
                                {isProcessing ? 'Processing Order...' : `Place Order - ${formatPrice(total)}`}
                            </PremiumCTAButton>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:sticky lg:top-24 lg:h-fit">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E8E2D4]">
                            <h3 className="text-lg text-section-title text-[#8B5E3C] mb-6">
                                Order Summary
                            </h3>

                            {/* Items */}
                            <div className="space-y-4 mb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex space-x-4">
                                        <div className="w-16 h-16 bg-[#F5F1E8] rounded-lg flex items-center justify-center shrink-0">
                                            {item.images && item.images[0]?.url ? (
                                                <img
                                                    src={item.images[0].url}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <span className="text-[#A0956B] text-xs">No Image</span>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-[#8B5E3C] text-body font-medium line-clamp-2">
                                                {item.title}
                                            </h4>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-[#A0956B] text-sm text-body">
                                                    Qty: {item.quantity}
                                                </span>
                                                <span className="text-[#8B5E3C] text-price">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="space-y-3 pt-6 border-t border-[#E8E2D4]">
                                <div className="flex justify-between text-body">
                                    <span className="text-[#A0956B]">Subtotal</span>
                                    <span className="text-[#8B5E3C]">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-body">
                                    <span className="text-[#A0956B]">Shipping</span>
                                    <span className="text-[#8B5E3C]">
                                        {shipping === 0 ? 'Free' : formatPrice(shipping)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-lg text-price pt-3 border-t border-[#E8E2D4]">
                                    <span className="text-[#8B5E3C]">Total</span>
                                    <span className="text-[#8B5E3C]">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Trust Signals */}
                            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E8E2D4]">
                                <div className="text-center">
                                    <Truck className="h-5 w-5 text-[#8B5E3C] mx-auto mb-2" />
                                    <div className="text-xs text-[#A0956B] text-body">Free Shipping</div>
                                </div>
                                <div className="text-center">
                                    <Shield className="h-5 w-5 text-[#8B5E3C] mx-auto mb-2" />
                                    <div className="text-xs text-[#A0956B] text-body">Secure</div>
                                </div>
                                <div className="text-center">
                                    <CreditCard className="h-5 w-5 text-[#8B5E3C] mx-auto mb-2" />
                                    <div className="text-xs text-[#A0956B] text-body">COD Available</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}