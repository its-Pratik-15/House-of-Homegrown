import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Search, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '../../components/common/ProductCard'

export default function ProductShowcase() {
    const location = useLocation()
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Filters and Search
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [showFilters, setShowFilters] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const productsPerPage = 12

    // Get category from URL parameters
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const categoryFromUrl = urlParams.get('category')

        if (categoryFromUrl) {
            // Find the category ID by type
            const categoryRecord = categories.find(cat => cat.type === categoryFromUrl)
            if (categoryRecord) {
                setSelectedCategory(categoryRecord.id.toString())
            }
        } else {
            // Clear category filter if no URL parameter
            setSelectedCategory('')
        }
    }, [location.search, categories])

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/categories')
                if (!response.ok) throw new Error('Failed to fetch categories')
                const result = await response.json()
                const categoriesData = result.success ? result.data : result
                setCategories(categoriesData)
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
                    sortBy,
                    ...(searchQuery && { search: searchQuery }),
                    ...(selectedCategory && { categoryId: selectedCategory }),
                })

                const response = await fetch(`http://localhost:3001/api/products?${params}`)
                if (!response.ok) throw new Error('Failed to fetch products')

                const result = await response.json()
                const productsData = result.success ? result.data : result
                setProducts(productsData.products || productsData)
                setTotalPages(productsData.totalPages || Math.ceil((productsData.products?.length || productsData.length) / productsPerPage))
            } catch (err) {
                setError(err.message)
                console.error('Error fetching products:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [currentPage, searchQuery, selectedCategory, sortBy])

    const handleSearch = (e) => {
        e.preventDefault()
        setCurrentPage(1) // Reset to first page when searching
    }

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId)
        setCurrentPage(1)
        setShowFilters(false)
    }

    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy)
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCategory('')
        setSortBy('name')
        setCurrentPage(1)
    }

    if (error) {
        return (
            <div className="min-h-screen bg-background">
                <div className="pt-20 px-4">
                    <div className="max-w-md mx-auto text-center py-12">
                        <div className="text-red-500 text-lg font-medium mb-2">Error Loading Products</div>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Button
                            onClick={() => window.location.reload()}
                            className="rounded-2xl bg-primary hover:bg-primary/90 text-white"
                        >
                            Try Again
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Main Content */}
            <div className="pt-20">
                {/* Category Filters - KITH Style */}
                <div className="border-b border-gray-200 sticky top-16 z-40 bg-white">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            {/* Search Bar */}
                            <form onSubmit={handleSearch} className="flex-1 max-w-md">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary bg-white/90 backdrop-blur-sm"
                                    />
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                            </form>

                            {/* Filter Controls */}
                            <div className="flex items-center space-x-4">
                                {/* Mobile Filter Toggle */}
                                <Button
                                    variant="outline"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="md:hidden rounded-2xl border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    Filters
                                </Button>

                                {/* View Mode Toggle */}
                                <div className="hidden md:flex items-center space-x-1 bg-secondary/30 rounded-2xl p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                                    >
                                        <Grid className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
                                    >
                                        <List className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Sort Dropdown */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => handleSortChange(e.target.value)}
                                        className="appearance-none bg-white/90 backdrop-blur-sm border border-gray-300 rounded-2xl px-4 py-3 pr-8 focus:ring-2 focus:ring-primary focus:border-primary"
                                    >
                                        <option value="name">Sort by Name</option>
                                        <option value="price">Sort by Price</option>
                                        <option value="createdAt">Sort by Newest</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Mobile Filters */}
                        {showFilters && (
                            <div className="mt-4 pt-4 border-t border-gray-200 md:hidden">
                                <div className="space-y-4">
                                    {/* Category Filter */}
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e) => handleCategoryChange(e.target.value)}
                                            className="w-full border border-gray-300 rounded-2xl px-3 py-3 focus:ring-2 focus:ring-primary focus:border-primary bg-white/90"
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.type}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex space-x-2">
                                        <Button onClick={clearFilters} variant="outline" size="sm" className="rounded-2xl">
                                            Clear Filters
                                        </Button>
                                        <Button onClick={() => setShowFilters(false)} size="sm" className="rounded-2xl bg-primary">
                                            Apply
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Desktop Category Filter */}
                        <div className="hidden md:flex items-center space-x-4 mt-4">
                            <button
                                onClick={() => handleCategoryChange('')}
                                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all ${selectedCategory === ''
                                    ? 'bg-primary text-white shadow-lg'
                                    : 'bg-secondary/30 text-primary hover:bg-secondary/50'
                                    }`}
                            >
                                All Products
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all ${selectedCategory === category.id
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'bg-secondary/30 text-primary hover:bg-secondary/50'
                                        }`}
                                >
                                    {category.type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-sm animate-pulse">
                                    <div className="aspect-square bg-gray-200 rounded-t-2xl"></div>
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                        <div className="h-8 bg-gray-200 rounded"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-gray-500 text-lg font-medium mb-2">No products found</div>
                            <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                            <Button
                                onClick={clearFilters}
                                variant="outline"
                                className="rounded-2xl border-primary text-primary hover:bg-primary hover:text-white"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    ) : (
                        <div className={`grid gap-6 ${viewMode === 'grid'
                            ? 'grid-cols-2 md:grid-cols-4'
                            : 'grid-cols-1'
                            }`}>
                            {products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-2 mt-12">
                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="rounded-2xl border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
                                                className={`px-4 py-2 rounded-2xl font-medium transition-all ${currentPage === page
                                                    ? 'bg-primary text-white shadow-lg'
                                                    : 'bg-secondary/30 text-primary hover:bg-secondary/50 border border-gray-200'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    } else if (
                                        page === currentPage - 2 ||
                                        page === currentPage + 2
                                    ) {
                                        return <span key={page} className="px-2 text-gray-400">...</span>
                                    }
                                    return null
                                })}
                            </div>

                            <Button
                                variant="outline"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="rounded-2xl border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
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