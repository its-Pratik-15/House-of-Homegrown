import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, ArrowLeft, Star, Truck, Shield, RotateCcw } from 'lucide-react'
import PremiumCTAButton from '@/components/ui/premium-cta-button'
import { formatPrice } from '../../utils/formatters'
import { cartService } from '../../services/cartService'

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/products/id/${id}`)
                if (!response.ok) throw new Error('Product not found')

                const result = await response.json()
                const productData = result.success ? result.data : result
                setProduct(productData)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchProduct()
        }
    }, [id])

    const handleAddToCart = async () => {
        setIsAddingToCart(true)
        try {
            await cartService.addToCart(product.id, quantity)
            // You could add a toast notification here
            console.log('Product added to cart successfully!')
        } catch (error) {
            console.error('Failed to add product to cart:', error)
        } finally {
            setIsAddingToCart(false)
        }
    }

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                        {/* Image Skeleton */}
                        <div className="space-y-4">
                            <div className="aspect-square bg-[#E8E2D4] rounded-3xl animate-pulse"></div>
                            <div className="flex space-x-2">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="w-20 h-20 bg-[#E8E2D4] rounded-2xl animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Content Skeleton */}
                        <div className="space-y-6">
                            <div className="h-8 bg-[#E8E2D4] rounded-full w-3/4 animate-pulse"></div>
                            <div className="h-6 bg-[#E8E2D4] rounded-full w-1/2 animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-[#E8E2D4] rounded-full animate-pulse"></div>
                                <div className="h-4 bg-[#E8E2D4] rounded-full w-5/6 animate-pulse"></div>
                                <div className="h-4 bg-[#E8E2D4] rounded-full w-4/6 animate-pulse"></div>
                            </div>
                            <div className="h-12 bg-[#E8E2D4] rounded-2xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-[#FAFAF8] pt-20">
                <div className="max-w-md mx-auto text-center py-16 px-4">
                    <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">😔</span>
                    </div>
                    <h2 className="text-2xl text-page-heading text-[#8B5E3C] mb-4">
                        Product Not Found
                    </h2>
                    <p className="text-[#A0956B] mb-8 text-body leading-relaxed">
                        We couldn't find the product you're looking for. It might have been moved or is no longer available.
                    </p>
                    <PremiumCTAButton onClick={() => navigate('/products')} variant="secondary">
                        Browse All Products
                    </PremiumCTAButton>
                </div>
            </div>
        )
    }

    const isOutOfStock = product.inventory && product.inventory.stockQuantity === 0
    const isLowStock = product.inventory && product.inventory.stockQuantity <= 5 && product.inventory.stockQuantity > 0

    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center space-x-2 text-[#8B5E3C] hover:text-[#6B4423] transition-colors mb-4 group"
                >
                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                    <span className="text-button">Back to Products</span>
                </button>

                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[selectedImageIndex]?.url || '/placeholder-product.jpg'}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#F5F1E8] flex items-center justify-center">
                                    <span className="text-[#A0956B] text-lg text-body">No Image Available</span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex space-x-3 overflow-x-auto pb-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${index === selectedImageIndex
                                            ? 'border-[#8B5E3C] shadow-lg'
                                            : 'border-[#E8E2D4] hover:border-[#8B5E3C]/50'
                                            }`}
                                    >
                                        <img
                                            src={image.url}
                                            alt={`${product.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Information */}
                    <div className="space-y-4">
                        {/* Category */}
                        {product.category && (
                            <div className="text-sm text-[#A0956B] text-body uppercase tracking-wider">
                                {product.category.name}
                            </div>
                        )}

                        {/* Product Title */}
                        <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] leading-tight">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-[#2F7D32] text-[#2F7D32]" />
                                ))}
                            </div>
                            <span className="text-sm text-[#A0956B] text-body">(4.8) • 127 reviews</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-3">
                            <span className="text-2xl text-price text-[#8B5E3C]">
                                {formatPrice(product.price)}
                            </span>
                            {product.mrp && product.mrp > product.price && (
                                <>
                                    <span className="text-lg text-[#A0956B] line-through text-body">
                                        {formatPrice(product.mrp)}
                                    </span>
                                    <span className="bg-[#2F7D32] text-white px-2 py-1 rounded-full text-xs text-button">
                                        {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock Status */}
                        {isLowStock && (
                            <div className="bg-[#8B5E3C]/10 border border-[#8B5E3C]/20 rounded-2xl p-4">
                                <p className="text-[#8B5E3C] text-button">
                                    ⚡ Only {product.inventory.stockQuantity} left in stock - order soon!
                                </p>
                            </div>
                        )}

                        {/* Description */}
                        {product.description && (
                            <div className="space-y-3">
                                <h3 className="text-lg text-section-title text-[#8B5E3C]">About This Product</h3>
                                <p className="text-[#A0956B] text-body leading-relaxed">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="space-y-3">
                            <h3 className="text-lg text-section-title text-[#8B5E3C]">Quantity</h3>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-full border border-[#E8E2D4] flex items-center justify-center hover:border-[#8B5E3C] transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center text-button text-[#8B5E3C]">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 rounded-full border border-[#E8E2D4] flex items-center justify-center hover:border-[#8B5E3C] transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isOutOfStock || isAddingToCart}
                                        className={`w-full py-4 rounded-2xl text-button transition-all duration-300 flex items-center justify-center space-x-2 ${isOutOfStock
                                            ? 'bg-[#E8E2D4] text-[#A0956B] cursor-not-allowed'
                                            : isAddingToCart
                                                ? 'bg-[#8B5E3C] text-white'
                                                : 'bg-[#8B5E3C] text-white hover:bg-[#6B4423] hover:shadow-lg'
                                            }`}
                                    >
                                        <ShoppingBag className="h-5 w-5" />
                                        <span>
                                            {isAddingToCart
                                                ? 'Adding to Cart...'
                                                : isOutOfStock
                                                    ? 'Out of Stock'
                                                    : 'Add to Cart'
                                            }
                                        </span>
                                    </button>
                                </div>

                                <button
                                    onClick={handleWishlist}
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${isWishlisted
                                        ? 'bg-[#8B5E3C] text-white shadow-lg'
                                        : 'bg-[#F5F1E8] text-[#8B5E3C] hover:bg-[#E8E2D4]'
                                        }`}
                                >
                                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Buy Now Button */}
                            <PremiumCTAButton
                                onClick={() => {
                                    handleAddToCart()
                                    // Navigate to checkout or cart
                                }}
                                variant="primary"
                                className="w-full"
                            >
                                Buy Now
                            </PremiumCTAButton>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8E2D4]">
                            <div className="text-center space-y-2">
                                <Truck className="h-6 w-6 text-[#8B5E3C] mx-auto" />
                                <div className="text-xs text-[#A0956B] text-body">Free Shipping</div>
                            </div>
                            <div className="text-center space-y-2">
                                <Shield className="h-6 w-6 text-[#8B5E3C] mx-auto" />
                                <div className="text-xs text-[#A0956B] text-body">Authentic</div>
                            </div>
                            <div className="text-center space-y-2">
                                <RotateCcw className="h-6 w-6 text-[#8B5E3C] mx-auto" />
                                <div className="text-xs text-[#A0956B] text-body">30-Day Returns</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}