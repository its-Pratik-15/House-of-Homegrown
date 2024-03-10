import { useState, useEffect } from 'react'
import { X, ChevronDown, ChevronUp, Leaf, Home, Heart, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PriceRangeSlider from './PriceRangeSlider'
import BrandFilter from './BrandFilter'

const categoryIcons = {
    TEXTILES: Leaf,
    HOME_LIVING: Home,
    WELLNESS: Heart,
    LIFESTYLE: Sparkles
}

const categoryLabels = {
    TEXTILES: 'Textiles',
    HOME_LIVING: 'Home Living',
    WELLNESS: 'Wellness',
    LIFESTYLE: 'Lifestyle'
}

const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'createdAt', label: 'New Arrivals' },
    { value: 'soldCount', label: 'Best Sellers' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' }
]

export default function FilterSidebar({
    isOpen,
    onClose,
    filters,
    onFiltersChange,
    categories = [],
    brands = [],
    priceRange = { min: 0, max: 5000 },
    isMobile = false
}) {
    const [localFilters, setLocalFilters] = useState(filters)
    const [showBrands, setShowBrands] = useState(false)

    useEffect(() => {
        setLocalFilters(filters)
    }, [filters])

    const handleCategoryChange = (categoryId) => {
        const newFilters = {
            ...localFilters,
            category: localFilters.category === categoryId ? '' : categoryId
        }
        setLocalFilters(newFilters)
        if (!isMobile) {
            onFiltersChange(newFilters)
        }
    }

    const handlePriceChange = (newPriceRange) => {
        const newFilters = {
            ...localFilters,
            priceRange: newPriceRange
        }
        setLocalFilters(newFilters)
        if (!isMobile) {
            onFiltersChange(newFilters)
        }
    }

    const handleBrandChange = (brandId, checked) => {
        const currentBrands = localFilters.brands || []
        const newBrands = checked
            ? [...currentBrands, brandId]
            : currentBrands.filter(id => id !== brandId)

        const newFilters = {
            ...localFilters,
            brands: newBrands
        }
        setLocalFilters(newFilters)
        if (!isMobile) {
            onFiltersChange(newFilters)
        }
    }

    const handleAvailabilityChange = (inStockOnly) => {
        const newFilters = {
            ...localFilters,
            inStockOnly
        }
        setLocalFilters(newFilters)
        if (!isMobile) {
            onFiltersChange(newFilters)
        }
    }

    const handleSortChange = (sortBy) => {
        const newFilters = {
            ...localFilters,
            sortBy
        }
        setLocalFilters(newFilters)
        if (!isMobile) {
            onFiltersChange(newFilters)
        }
    }

    const handleApplyFilters = () => {
        onFiltersChange(localFilters)
        if (isMobile) {
            onClose()
        }
    }

    const handleClearAll = () => {
        const clearedFilters = {
            category: '',
            priceRange: { min: priceRange.min, max: priceRange.max },
            brands: [],
            inStockOnly: false,
            sortBy: 'relevance'
        }
        setLocalFilters(clearedFilters)
        onFiltersChange(clearedFilters)
        if (isMobile) {
            onClose()
        }
    }

    const getActiveFiltersCount = () => {
        let count = 0
        if (localFilters.category) count++
        if (localFilters.priceRange?.min > priceRange.min || localFilters.priceRange?.max < priceRange.max) count++
        if (localFilters.brands?.length > 0) count++
        if (localFilters.inStockOnly) count++
        return count
    }

    const sidebarContent = (
        <div className="h-full flex flex-col bg-[#FAFAF8] border-r border-[#E8E2D4]">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E8E2D4]">
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg text-section-title text-[#8B5E3C]">Filters</h2>
                    {getActiveFiltersCount() > 0 && (
                        <span className="bg-[#6B8E23] text-white text-xs px-2 py-1 rounded-full text-button">
                            {getActiveFiltersCount()}
                        </span>
                    )}
                </div>
                {isMobile && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="text-[#8B5E3C] hover:bg-[#F5F1E8]"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                )}
            </div>

            {/* Filter Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Category Filter */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#8B5E3C] uppercase tracking-wide">
                        Category
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {categories.map((category) => {
                            const Icon = categoryIcons[category.type]
                            const isActive = localFilters.category === category.id.toString()

                            return (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id.toString())}
                                    className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-[#8B5E3C] text-white shadow-md'
                                        : 'bg-white border border-[#E8E2D4] text-[#8B5E3C] hover:bg-[#F5F1E8] hover:border-[#8B5E3C]/30'
                                        }`}
                                >
                                    {Icon && <Icon className="h-4 w-4" />}
                                    <span>{categoryLabels[category.type]}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#8B5E3C] uppercase tracking-wide">
                        Price Range
                    </h3>
                    <PriceRangeSlider
                        min={priceRange.min}
                        max={priceRange.max}
                        value={localFilters.priceRange || priceRange}
                        onChange={handlePriceChange}
                    />
                </div>

                {/* Brand Filter */}
                {brands.length > 1 && (
                    <div className="space-y-4">
                        <button
                            onClick={() => setShowBrands(!showBrands)}
                            className="flex items-center justify-between w-full text-sm font-medium text-[#8B5E3C] uppercase tracking-wide hover:text-[#6B4423] transition-colors"
                        >
                            <span>Brands ({brands.length})</span>
                            {showBrands ? (
                                <ChevronUp className="h-4 w-4" />
                            ) : (
                                <ChevronDown className="h-4 w-4" />
                            )}
                        </button>
                        {showBrands && (
                            <BrandFilter
                                brands={brands}
                                selectedBrands={localFilters.brands || []}
                                onChange={handleBrandChange}
                            />
                        )}
                    </div>
                )}

                {/* Availability Filter */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#8B5E3C] uppercase tracking-wide">
                        Availability
                    </h3>
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={localFilters.inStockOnly || false}
                                onChange={(e) => handleAvailabilityChange(e.target.checked)}
                                className="sr-only"
                            />
                            <div className={`w-12 h-6 rounded-full transition-all duration-200 ${localFilters.inStockOnly
                                ? 'bg-[#6B8E23]'
                                : 'bg-[#E8E2D4] group-hover:bg-[#D4C4B3]'
                                }`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-200 transform ${localFilters.inStockOnly ? 'translate-x-6' : 'translate-x-0.5'
                                    } mt-0.5`} />
                            </div>
                        </div>
                        <span className="text-sm text-[#8B5E3C] group-hover:text-[#6B4423] transition-colors">
                            In stock only
                        </span>
                    </label>
                </div>

                {/* Sort Options */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-[#8B5E3C] uppercase tracking-wide">
                        Sort By
                    </h3>
                    <div className="space-y-2">
                        {sortOptions.map((option) => (
                            <label key={option.value} className="flex items-center space-x-3 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="radio"
                                        name="sort"
                                        value={option.value}
                                        checked={localFilters.sortBy === option.value}
                                        onChange={() => handleSortChange(option.value)}
                                        className="sr-only"
                                    />
                                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${localFilters.sortBy === option.value
                                        ? 'border-[#6B8E23] bg-[#6B8E23]'
                                        : 'border-[#E8E2D4] group-hover:border-[#8B5E3C]'
                                        }`}>
                                        {localFilters.sortBy === option.value && (
                                            <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                                        )}
                                    </div>
                                </div>
                                <span className="text-sm text-[#8B5E3C] group-hover:text-[#6B4423] transition-colors">
                                    {option.label}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Actions */}
            {isMobile && (
                <div className="p-6 border-t border-[#E8E2D4] bg-white">
                    <div className="flex space-x-3">
                        <Button
                            variant="outline"
                            onClick={handleClearAll}
                            className="flex-1 border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#F5F1E8] rounded-2xl text-button"
                        >
                            Clear All
                        </Button>
                        <Button
                            onClick={handleApplyFilters}
                            className="flex-1 bg-[#8B5E3C] hover:bg-[#6B4423] text-white rounded-2xl shadow-md text-button"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )

    if (isMobile) {
        return (
            <>
                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-50 md:hidden"
                        onClick={onClose}
                    />
                )}

                {/* Mobile Bottom Sheet */}
                <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 md:hidden ${isOpen ? 'translate-y-0' : 'translate-y-full'
                    }`}>
                    <div className="bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden">
                        {sidebarContent}
                    </div>
                </div>
            </>
        )
    }

    // Desktop Sidebar
    return (
        <div className={`w-80 transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {sidebarContent}
        </div>
    )
}