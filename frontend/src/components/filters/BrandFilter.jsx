import { useState } from 'react'
import { Search } from 'lucide-react'

export default function BrandFilter({ brands, selectedBrands, onChange }) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredBrands = brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleBrandToggle = (brandId) => {
        const isSelected = selectedBrands.includes(brandId)
        onChange(brandId, !isSelected)
    }

    return (
        <div className="space-y-4">
            {/* Search Bar (only show if more than 5 brands) */}
            {brands.length > 5 && (
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A0956B]" />
                    <input
                        type="text"
                        placeholder="Search brands..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-[#E8E2D4] rounded-xl text-sm text-[#8B5E3C] placeholder-[#A0956B] focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]/20 focus:border-[#8B5E3C] transition-all text-body"
                    />
                </div>
            )}

            {/* Brand List */}
            <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                {filteredBrands.map((brand) => {
                    const isSelected = selectedBrands.includes(brand.id)

                    return (
                        <label
                            key={brand.id}
                            className="flex items-center space-x-3 cursor-pointer group py-2 px-2 rounded-lg hover:bg-[#F5F1E8] transition-colors"
                        >
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => handleBrandToggle(brand.id)}
                                    className="sr-only"
                                />
                                <div className={`w-5 h-5 rounded border-2 transition-all duration-200 ${isSelected
                                    ? 'bg-[#6B8E23] border-[#6B8E23]'
                                    : 'bg-white border-[#E8E2D4] group-hover:border-[#8B5E3C]'
                                    }`}>
                                    {isSelected && (
                                        <svg
                                            className="w-3 h-3 text-white absolute top-0.5 left-0.5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <span className="text-sm text-[#8B5E3C] group-hover:text-[#6B4423] transition-colors text-body">
                                    {brand.name}
                                </span>
                                {brand.productCount && (
                                    <span className="text-xs text-[#A0956B] ml-1 text-body">
                                        ({brand.productCount})
                                    </span>
                                )}
                            </div>
                        </label>
                    )
                })}
            </div>

            {filteredBrands.length === 0 && searchTerm && (
                <div className="text-center py-4 text-sm text-[#A0956B] text-body">
                    No brands found matching "{searchTerm}"
                </div>
            )}

            {/* Selected Count */}
            {selectedBrands.length > 0 && (
                <div className="text-xs text-[#6B8E23] bg-[#6B8E23]/10 px-3 py-2 rounded-xl text-body">
                    {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''} selected
                </div>
            )}
        </div>
    )
}