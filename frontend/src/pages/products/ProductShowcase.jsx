import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import ProductCard from '../../components/common/ProductCard'
import SimpleFilter from '../../components/filters/SimpleFilter'

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
                const response = await fetch('http://localhost:3001/api/categories')
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

                const response = await fetch(`http://localhost:3001/api/products?${params}`)
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
        return (
            <div className="min-h-screen bg-[#FAFAF8]">
                <div className="pt-20 px-4">
                    <div className="max-w-md mx-auto text-center py-12">
                        <div className="text-red-500 text-lg text-section-title mb-2">Error Loading Products</div>
                        <p className="text-gray-600 mb-4 text-body">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="rounded-2xl bg-[#8B5E3C] hover:bg-[#6B4423] !text-white border-none text-button"
                            style={{ color: 'white' }}
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8]">
            <div className="pt-20">
                {/* Simple Filter */}
                <SimpleFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    sortBy={sortBy}
                    onSortChange={handleSortChange}
                />

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto p-4 md:p-8">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="aspect-square bg-[#E8E2D4] rounded-2xl mb-4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-[#E8E2D4] rounded w-3/4"></div>
                                        <div className="h-4 bg-[#E8E2D4] rounded w-1/2"></div>
                                        <div className="h-8 bg-[#E8E2D4] rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-[#8B5E3C] text-lg text-section-title mb-2">No products found</div>
                            <p className="text-[#A0956B] mb-4 text-body">Try adjusting your search or category</p>
                            <Button
                                onClick={() => {
                                    setSelectedCategory('')
                                    setSearchTerm('')
                                    setSortBy('relevance')
                                }}
                                className="rounded-2xl bg-[#8B5E3C] hover:bg-[#6B4423] !text-white border-none text-button"
                                style={{ color: 'white' }}
                            >
                                Show All Products
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-12 pt-8 border-t border-[#E8E2D4]">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="rounded-2xl border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#F5F1E8] disabled:opacity-50 text-button"
                            >
                                Previous
                            </Button>

                            <div className="flex space-x-1">
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
                                                className={`px-4 py-2 rounded-2xl text-button transition-all ${currentPage === page
                                                    ? 'bg-[#8B5E3C] !text-white shadow-lg'
                                                    : 'bg-white text-[#8B5E3C] hover:bg-[#F5F1E8] border border-[#E8E2D4]'
                                                    }`}
                                                style={currentPage === page ? { color: 'white' } : {}}
                                            >
                                                {page}
                                            </button>
                                        )
                                    } else if (
                                        page === currentPage - 2 ||
                                        page === currentPage + 2
                                    ) {
                                        return <span key={page} className="px-2 text-[#A0956B] text-body">...</span>
                                    }
                                    return null
                                })}
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="rounded-2xl border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#F5F1E8] disabled:opacity-50 text-button"
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}