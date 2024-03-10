import { Heart, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPrice, calculateDiscount } from '../../utils/formatters'
import { cartService } from '../../services/cartService'

export default function ProductCard({ product }) {
    const navigate = useNavigate()
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleAddToCart = async (e) => {
        e.stopPropagation() // Prevent navigation when clicking add to cart
        setIsAddingToCart(true)
        try {
            await cartService.addToCart(product.id, 1)
            console.log('Product added to cart successfully!')
        } catch (error) {
            console.error('Failed to add product to cart:', error)
        } finally {
            setIsAddingToCart(false)
        }
    }

    const handleWishlist = (e) => {
        e.stopPropagation() // Prevent navigation when clicking wishlist
        setIsWishlisted(!isWishlisted)
    }

    const handleCardClick = () => {
        navigate(`/products/${product.id}`)
    }

    const formatPriceValue = (price) => {
        return formatPrice(price)
    }

    const isOutOfStock = product.inventory && product.inventory.stockQuantity === 0
    const isLowStock = product.inventory && product.inventory.stockQuantity <= 5 && product.inventory.stockQuantity > 0

    return (
        <div
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#F5F1E8] hover:border-[#E8E2D4] cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-[#FAFAF8]">
                {product.images && product.images.length > 0 ? (
                    <div className="relative w-full h-full">
                        <img
                            src={product.images[currentImageIndex]?.url || '/placeholder-product.jpg'}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        {/* Wishlist Button */}
                        <button
                            onClick={handleWishlist}
                            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted
                                ? 'bg-[#8B5E3C] text-white shadow-lg'
                                : 'bg-white/90 text-[#8B5E3C] hover:bg-white hover:shadow-md'
                                } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
                        >
                            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>

                        {/* Image Navigation Dots */}
                        {product.images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                            ? 'bg-white w-6'
                                            : 'bg-white/60 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Stock Badges */}
                        {isLowStock && (
                            <div className="absolute top-4 left-4 px-3 py-1 bg-[#8B5E3C] text-white text-xs text-button rounded-full">
                                Only {product.inventory.stockQuantity} left
                            </div>
                        )}

                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                <div className="bg-white text-[#8B5E3C] px-4 py-2 rounded-full text-sm text-button">
                                    Out of Stock
                                </div>
                            </div>
                        )}

                        {/* Discount Badge */}
                        {product.mrp && product.mrp > product.price && (
                            <div className="absolute top-4 left-4 px-3 py-1 bg-[#2F7D32] text-white text-xs text-button rounded-full">
                                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full bg-[#F5F1E8] flex items-center justify-center">
                        <span className="text-[#A0956B] text-sm text-body">No Image Available</span>
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                {/* Category */}
                {product.category && (
                    <div className="text-xs text-[#A0956B] text-body uppercase tracking-wider">
                        {product.category.name}
                    </div>
                )}

                {/* Product Name */}
                <h3 className="text-base text-section-title text-[#8B5E3C] leading-tight line-clamp-2">
                    {product.title}
                </h3>

                {/* Description */}
                {product.description && (
                    <p className="text-sm text-[#A0956B] text-body line-clamp-2 leading-relaxed">
                        {product.description}
                    </p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg text-price text-[#8B5E3C]">
                            {formatPriceValue(product.price)}
                        </span>
                        {product.mrp && product.mrp > product.price && (
                            <span className="text-sm text-[#A0956B] line-through text-body">
                                {formatPriceValue(product.mrp)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Add to Cart Button */}
                <button
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || isAddingToCart}
                    className={`w-full py-3 rounded-2xl text-button transition-all duration-300 flex items-center justify-center space-x-2 ${isOutOfStock
                        ? 'bg-[#E8E2D4] text-[#A0956B] cursor-not-allowed'
                        : isAddingToCart
                            ? 'bg-[#8B5E3C] text-white'
                            : 'bg-[#F5F1E8] text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white hover:shadow-lg'
                        }`}
                >
                    <ShoppingBag className="h-4 w-4" />
                    <span>
                        {isAddingToCart
                            ? 'Adding...'
                            : isOutOfStock
                                ? 'Out of Stock'
                                : 'Add to Cart'
                        }
                    </span>
                </button>
            </div>
        </div>
    )
}