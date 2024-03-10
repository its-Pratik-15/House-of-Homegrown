import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const sortOptions = [
    { value: 'relevance', label: 'Featured' },
    { value: 'createdAt', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' }
]

export default function SimpleFilter({
    categories = [],
    selectedCategory,
    onCategoryChange,
    sortBy,
    onSortChange
}) {
    const [showSort, setShowSort] = useState(false)

    const categoryLabels = {
        TEXTILES: 'Textiles',
        HOME_LIVING: 'Home & Living',
        WELLNESS: 'Wellness',
        LIFESTYLE: 'Lifestyle'
    }

    return (
        <div className="bg-white border-b border-[#E8E2D4] px-4 md:px-8 py-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onCategoryChange('')}
                        className={`px-4 py-2 rounded-full text-sm text-button transition-all ${!selectedCategory
                                ? 'bg-[#8B5E3C] text-white'
                                : 'bg-[#F5F1E8] text-[#8B5E3C] hover:bg-[#E8E2D4]'
                            }`}
                    >
                        All Products
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryChange(category.type)}
                            className={`px-4 py-2 rounded-full text-sm text-button transition-all ${selectedCategory === category.type
                                    ? 'bg-[#8B5E3C] text-white'
                                    : 'bg-[#F5F1E8] text-[#8B5E3C] hover:bg-[#E8E2D4]'
                                }`}
                        >
                            {categoryLabels[category.type]}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowSort(!showSort)}
                        className="flex items-center space-x-2 px-4 py-2 bg-[#F5F1E8] text-[#8B5E3C] rounded-full text-sm text-button hover:bg-[#E8E2D4] transition-colors"
                    >
                        <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured'}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${showSort ? 'rotate-180' : ''}`} />
                    </button>

                    {showSort && (
                        <div className="absolute right-0 top-full mt-2 bg-white border border-[#E8E2D4] rounded-lg shadow-lg z-10 min-w-48">
                            {sortOptions.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onSortChange(option.value)
                                        setShowSort(false)
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm text-body hover:bg-[#F5F1E8] transition-colors first:rounded-t-lg last:rounded-b-lg ${sortBy === option.value ? 'bg-[#F5F1E8] text-[#8B5E3C]' : 'text-[#666]'
                                        }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}