import { Heart, Star } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../../utils/formatters'
import { cartService } from '../../services/cartService'

export default function ProductCard({ product }) {
    const navigate = useNavigate()
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [isAddingToCart, setIsAddingToCart] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    const handleAddToCart = async (e) => {
        e.stopPropagation()
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
        e.stopPropagation()
        setIsWishlisted(!isWishlisted)
    }

    const handleCardClick = () => {
        navigate(`/products/${product.id}`)
    }

    const isOutOfStock = product.inventory && product.inventory.stockQuantity === 0
    const isLowStock = product.inventory && product.inventory.stockQuantity <= 5 && product.inventory.stockQuantity > 0

    return (
        <div
            className="group cursor-pointer h-full flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCardClick}
        >
            {/* Product Image - Bigger for mobile */}
            <div className="relative aspect-4/5 md:aspect-square overflow-hidden bg-[#F5F1E8] mb-2 rounded-lg">
                {product.images && product.images.length > 0 ? (
                    <div className="relative w-full h-full">
                        <img
                            src={product.images[0]?.url || '/placeholder-product.jpg'}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Wishlist Button - Top right */}
                        <button
                            onClick={handleWishlist}
                            className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-0 md:opacity-0'
                                } ${isWishlisted ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
                        >
                            <Heart className={`h-3.5 w-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                        </button>

                        {/* Discount Badge - Green shade */}
                        {product.mrp && product.mrp > product.price && (
                            <div className="absolute top-2 left-2 px-2 py-1 bg-[#2F7D32] text-white text-xs font-medium rounded">
                                {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                            </div>
                        )}

                        {/* Stock Badges */}
                        {isLowStock && !isOutOfStock && (
                            <div className="absolute bottom-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs rounded">
                                Only {product.inventory.stockQuantity} left
                            </div>
                        )}

                        {isOutOfStock && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="bg-white text-gray-900 px-3 py-1 rounded text-sm font-medium">
                                    Out of Stock
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full bg-[#F5F1E8] flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                )}
            </div>

            {/* Product Info - Following the reference layout with consistent height */}
            <div className="flex-1 flex flex-col space-y-2">
                {/* Product Name - Fixed height */}
                <h3 className="text-sm text-gray-900 font-medium leading-tight line-clamp-2 text-section-title h-10">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                    <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                className={`h-3 w-3 ${i < 4 ? 'fill-[#2F7D32] text-[#2F7D32]' : 'text-gray-300'}`}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-600 text-body">(4.6) · 128 reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2">
                    <span className="text-base text-gray-900 font-semibold text-price">
                        {formatPrice(product.price)}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-sm text-gray-400 line-through text-body">
                            {formatPrice(product.mrp)}
                        </span>
                    )}
                </div>

                {/* Short Description - Fixed height */}
                <p className="text-xs text-gray-600 text-body line-clamp-2 leading-relaxed h-8 shrink-0">
                    {product.shortDescription || "Premium handcrafted product made with natural materials for everyday living."}
                </p>

                {/* Action Buttons - Push to bottom */}
                <div className="flex space-x-2 pt-1 mt-auto">
                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock || isAddingToCart}
                        className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-300 ${isOutOfStock
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : isAddingToCart
                                ? 'bg-[#8B5E3C] text-white'
                                : 'bg-[#8B5E3C] text-white hover:bg-[#6B4423]'
                            }`}
                    >
                        {isAddingToCart
                            ? 'Adding...'
                            : isOutOfStock
                                ? 'Out of Stock'
                                : 'Add to Cart'
                        }
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            // Navigate to checkout with product data
                            navigate('/checkout', {
                                state: {
                                    product: product,
                                    quantity: 1
                                }
                            })
                        }}
                        disabled={isOutOfStock}
                        className={`flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all duration-300 ${isOutOfStock
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : 'bg-[#2F7D32] text-white hover:bg-[#1B5E20]'
                            }`}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}