import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../../components/common/ProductCard'
import SimpleFilter from '../../components/filters/SimpleFilter'
import PremiumCTAButton from '@/components/ui/premium-cta-button'
import ServerErrorFallback from '../../components/ServerErrorFallback'

export default function ProductShowcase() {
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Simple filter states
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('relevance')
    const [searchTerm, setSearchTerm] = useState('')

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const productsPerPage = 12

    // Get category and search from URL parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const categoryFromUrl = urlParams.get('category')
        const searchFromUrl = urlParams.get('search')

        if (categoryFromUrl) {
            setSelectedCategory(categoryFromUrl)
        } else {
            setSelectedCategory('')
        }

        if (searchFromUrl) {
            setSearchTerm(searchFromUrl)
        } else {
            setSearchTerm('')
        }
    }, [location.search])

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/categories`)
                if (response.ok) {
                    const result = await response.json()
                    const categoriesData = result.success ? result.data : result
                    setCategories(categoriesData)
                }
            } catch (err) {
                console.error('Error fetching categories:', err)
            }
        }
        fetchCategories()
    }, [])

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams({
                    page: currentPage.toString(),
                    limit: productsPerPage.toString(),
                    ...(sortBy && sortBy !== 'relevance' && { sortBy }),
                    ...(searchTerm && { search: searchTerm }),
                })

                // Handle category filter
                if (selectedCategory) {
                    const categoryRecord = categories.find(cat => cat.type === selectedCategory)
                    if (categoryRecord) {
                        params.append('categoryId', categoryRecord.id.toString())
                    }
                }

                const response = await fetch(`${import.meta.env.VITE_API_URL}/products?${params}`)
                if (!response.ok) throw new Error('Failed to fetch products')

                const result = await response.json()
                const productsData = result.success ? result.data : result

                setProducts(productsData.products || productsData)
                setTotalPages(productsData.totalPages || Math.ceil((productsData.products || productsData).length / productsPerPage))
            } catch (err) {
                setError(err.message)
                console.error('Error fetching products:', err)
            } finally {
                setLoading(false)
            }
        }

        if (categories.length > 0) {
            fetchProducts()
        }
    }, [currentPage, selectedCategory, sortBy, searchTerm, categories])

    const handleCategoryChange = (category) => {
        setSelectedCategory(category)
        setCurrentPage(1)
    }

    const handleSortChange = (sort) => {
        setSortBy(sort)
        setCurrentPage(1)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setCurrentPage(1)
    }

    if (error) {
        const errorObj = new Error(error)
        errorObj.code = error.includes('fetch') ? 'NETWORK_ERROR' : 'HTTP_ERROR'

        return (
            <ServerErrorFallback
                error={errorObj}
                resetError={() => {
                    setError(null)
                    window.location.reload()
                }}
            />
        )
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            <div className="pt-24 xl:pt-20">
                {/* Filter Section */}
                <SimpleFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                />

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8 py-4 md:py-8 lg:py-12">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="aspect-square bg-[#E8E2D4] rounded-3xl mb-3 md:mb-4"></div>
                                    <div className="space-y-2 md:space-y-3">
                                        <div className="h-3 md:h-4 bg-[#E8E2D4] rounded-full w-3/4"></div>
                                        <div className="h-2.5 md:h-3 bg-[#E8E2D4] rounded-full w-1/2"></div>
                                        <div className="h-6 md:h-8 bg-[#E8E2D4] rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="mb-8">
                                <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">🔍</span>
                                </div>
                                <h2 className="text-2xl text-page-heading text-[#8B5E3C] mb-4">
                                    No products found
                                </h2>
                                <p className="text-[#A0956B] mb-8 text-body max-w-md mx-auto leading-relaxed">
                                    We couldn't find any products matching your criteria. Try adjusting your filters or explore our full collection.
                                </p>
                            </div>
                            <PremiumCTAButton
                                onClick={() => {
                                    setSelectedCategory('')
                                    setSearchTerm('')
                                    setSortBy('relevance')
                                }}
                                variant="secondary"
                            >
                                Show All Products
                            </PremiumCTAButton>
                        </div>
                    ) : (
                        <>
                            {/* Products Count */}
                            <div className="mb-6 md:mb-8">
                                <p className="text-[#A0956B] text-body">
                                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                                </p>
                            </div>

                            {/* Products Grid - Reduced gaps for mobile with equal heights */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8 items-stretch">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-3 mt-16 pt-12 border-t border-[#E8E2D4]">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-6 py-3 rounded-full text-button transition-all ${currentPage === 1
                                    ? 'bg-[#E8E2D4] text-[#A0956B] cursor-not-allowed'
                                    : 'bg-white text-[#8B5E3C] hover:bg-[#F5F1E8] border border-[#E8E2D4] hover:border-[#8B5E3C]'
                                    }`}
                            >
                                Previous
                            </button>

                            <div className="flex space-x-2">
                                {[...Array(totalPages)].map((_, index) => {
                                    const page = index + 1
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-12 h-12 rounded-full text-button transition-all ${currentPage === page
                                                    ? 'bg-[#8B5E3C] text-white shadow-lg'
                                                    : 'bg-white text-[#8B5E3C] hover:bg-[#F5F1E8] border border-[#E8E2D4] hover:border-[#8B5E3C]'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    } else if (
                                        page === currentPage - 2 ||
                                        page === currentPage + 2
                                    ) {
                                        return (
                                            <span key={page} className="w-12 h-12 flex items-center justify-center text-[#A0956B] text-body">
                                                ...
                                            </span>
                                        )
                                    }
                                    return null
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-6 py-3 rounded-full text-button transition-all ${currentPage === totalPages
                                    ? 'bg-[#E8E2D4] text-[#A0956B] cursor-not-allowed'
                                    : 'bg-white text-[#8B5E3C] hover:bg-[#F5F1E8] border border-[#E8E2D4] hover:border-[#8B5E3C]'
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}