import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle, Package, Truck, Home } from 'lucide-react'
import PremiumCTAButton from '../components/ui/premium-cta-button'
import { formatPrice } from '../utils/formatters'

export default function OrderSuccess() {
    const navigate = useNavigate()
    const location = useLocation()
    const orderData = location.state?.orderData

    useEffect(() => {
        // Redirect if no order data
        if (!orderData) {
            navigate('/')
        }
    }, [orderData, navigate])

    if (!orderData) {
        return null
    }

    const { items, total, customerInfo } = orderData
    const orderNumber = `HOH${Date.now().toString().slice(-6)}`

    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-[#2F7D32]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-12 w-12 text-[#2F7D32]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] mb-4">
                        Order Placed Successfully!
                    </h1>
                    <p className="text-[#A0956B] text-body text-lg max-w-2xl mx-auto leading-relaxed">
                        Thank you for your order. We've received your order and will start processing it soon.
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8E2D4] mb-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Order Info */}
                        <div>
                            <h3 className="text-lg text-section-title text-[#8B5E3C] mb-4">
                                Order Information
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-[#A0956B] text-body">Order Number</span>
                                    <span className="text-[#8B5E3C] text-body font-medium">{orderNumber}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A0956B] text-body">Order Date</span>
                                    <span className="text-[#8B5E3C] text-body font-medium">
                                        {new Date().toLocaleDateString('en-IN')}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#A0956B] text-body">Payment Method</span>
                                    <span className="text-[#8B5E3C] text-body font-medium">Cash on Delivery</span>
                                </div>
                                <div className="flex justify-between text-lg pt-3 border-t border-[#E8E2D4]">
                                    <span className="text-[#8B5E3C] text-price">Total Amount</span>
                                    <span className="text-[#8B5E3C] text-price font-semibold">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div>
                            <h3 className="text-lg text-section-title text-[#8B5E3C] mb-4">
                                Shipping Address
                            </h3>
                            <div className="text-[#A0956B] text-body space-y-1">
                                <p className="text-[#8B5E3C] font-medium">
                                    {customerInfo.firstName} {customerInfo.lastName}
                                </p>
                                <p>{customerInfo.address}</p>
                                <p>{customerInfo.city}, {customerInfo.state} {customerInfo.pincode}</p>
                                <p>{customerInfo.phone}</p>
                                <p>{customerInfo.email}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#E8E2D4] mb-8">
                    <h3 className="text-lg text-section-title text-[#8B5E3C] mb-6">
                        Order Items ({items.length})
                    </h3>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex space-x-4 p-4 bg-[#F5F1E8] rounded-lg">
                                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shrink-0">
                                    {item.images && item.images[0]?.url ? (
                                        <img
                                            src={item.images[0].url}
                                            alt={item.title}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <Package className="h-8 w-8 text-[#A0956B]" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-[#8B5E3C] text-body font-medium mb-1">
                                        {item.title}
                                    </h4>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#A0956B] text-sm text-body">
                                            Quantity: {item.quantity}
                                        </span>
                                        <span className="text-[#8B5E3C] text-price">
                                            {formatPrice(item.price * item.quantity)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-[#2F7D32]/5 rounded-2xl p-6 md:p-8 border border-[#2F7D32]/20 mb-8">
                    <h3 className="text-lg text-section-title text-[#8B5E3C] mb-6">
                        What happens next?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-[#2F7D32] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-[#8B5E3C] text-button mb-2">Order Processing</h4>
                            <p className="text-[#A0956B] text-sm text-body">
                                We'll prepare your order within 1-2 business days
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-[#2F7D32] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-[#8B5E3C] text-button mb-2">Shipping</h4>
                            <p className="text-[#A0956B] text-sm text-body">
                                Your order will be shipped and delivered within 3-7 days
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-[#2F7D32] rounded-full flex items-center justify-center mx-auto mb-4">
                                <Home className="h-6 w-6 text-white" />
                            </div>
                            <h4 className="text-[#8B5E3C] text-button mb-2">Delivery</h4>
                            <p className="text-[#A0956B] text-sm text-body">
                                Pay cash on delivery when you receive your order
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <PremiumCTAButton
                        onClick={() => navigate('/products')}
                        variant="secondary"
                        className="sm:w-auto"
                    >
                        Continue Shopping
                    </PremiumCTAButton>
                    <PremiumCTAButton
                        onClick={() => navigate('/')}
                        variant="primary"
                        className="sm:w-auto"
                    >
                        Back to Home
                    </PremiumCTAButton>
                </div>

                {/* Contact Info */}
                <div className="text-center mt-12 pt-8 border-t border-[#E8E2D4]">
                    <p className="text-[#A0956B] text-body mb-2">
                        Questions about your order?
                    </p>
                    <button
                        onClick={() => navigate('/contact')}
                        className="text-[#8B5E3C] hover:text-[#6B4423] text-button transition-colors"
                    >
                        Contact our support team
                    </button>
                </div>
            </div>
        </div>
    )
}