import { Button } from '@/components/ui/button'
import { ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'
import { formatPrice, calculateDiscount } from '../../utils/formatters'
import { cartService } from '../../services/cartService'

export default function ProductCard({ product }) {
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isAddingToCart, setIsAddingToCart] = useState(false)

    const handleAddToCart = async () => {
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

    const handleWishlist = () => {
        setIsWishlisted(!isWishlisted)
    }

    const formatPriceValue = (price) => {
        return formatPrice(price)
    }

    return (
        <div className="group bg-white overflow-hidden">
            {/* Product Image - KITH Style */}
            <div className="relative aspect-square overflow-hidden bg-gray-50 mb-4">
                {product.images && product.images.length > 0 ? (
                    <div className="relative w-full h-full">
                        <img
                            src={product.images[currentImageIndex]?.url || '/placeholder-product.jpg'}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Quick View Button - appears on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white text-black border-white hover:bg-gray-100 text-xs font-medium"
                            >
                                QUICK VIEW
                            </Button>
                        </div>

                        {/* Image Navigation Dots */}
                        {product.images.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentImageIndex(index)}
                                        className={`w-1.5 h-1.5 rounded-full transition-all ${index === currentImageIndex
                                            ? 'bg-white w-3'
                                            : 'bg-white/60 hover:bg-white/80'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Stock Badge */}
                        {product.inventory && product.inventory.stockQuantity <= 5 && product.inventory.stockQuantity > 0 && (
                            <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium">
                                Only {product.inventory.stockQuantity} left
                            </div>
                        )}

                        {/* Out of Stock Badge */}
                        {product.inventory && product.inventory.stockQuantity === 0 && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="bg-red-500 text-white px-3 py-1 text-sm font-medium">
                                    Out of Stock
                                </span>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                )}
            </div>

            {/* Product Info - KITH Style */}
            <div className="space-y-2">
                {/* Product Name */}
                <h3 className="text-sm font-medium text-gray-900 leading-tight">
                    {product.title}
                </h3>

                {/* Price */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                        {formatPriceValue(product.price)}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-xs text-gray-500 line-through">
                            {formatPriceValue(product.mrp)}
                        </span>
                    )}
                </div>

                {/* Add to Cart Button - KITH Style */}
                <div className="pt-2">
                    <Button
                        onClick={handleAddToCart}
                        disabled={product.inventory && product.inventory.stockQuantity === 0 || isAddingToCart}
                        className="w-full bg-white text-black border border-gray-300 hover:bg-gray-50 text-xs font-medium py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        variant="outline"
                    >
                        {isAddingToCart
                            ? 'ADDING...'
                            : product.inventory && product.inventory.stockQuantity === 0
                                ? 'OUT OF STOCK'
                                : 'ADD TO CART'
                        }
                    </Button>
                </div>
            </div>
        </div>
    )
}