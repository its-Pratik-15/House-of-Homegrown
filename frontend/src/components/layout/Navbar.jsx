import { Menu, ShoppingCart, Search, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { useCart } from '../../hooks/useCart'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const { getCartItemCount } = useCart()

    // Check if we're on the home page
    const isHomePage = location.pathname === '/'

    // Dynamic colors based on scroll state and page
    const shouldUseBeige = isScrolled || !isHomePage
    const textColor = shouldUseBeige ? 'text-gray-900' : 'text-white'
    const bgColor = shouldUseBeige ? 'bg-[#F5F1E8]' : 'bg-transparent'
    const underlineColor = shouldUseBeige ? 'bg-gray-900' : 'bg-white'

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Update scroll state for background color
            setIsScrolled(currentScrollY > 50)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleMenuClick = () => {
        setIsMobileMenuOpen(true)
    }

    const handleMenuClose = () => {
        setIsMobileMenuOpen(false)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            const query = searchTerm.trim().toLowerCase()

            // Check for category matches first
            const categoryMatches = {
                'textiles': '/products?category=TEXTILES',
                'textile': '/products?category=TEXTILES',
                'fabric': '/products?category=TEXTILES',
                'cloth': '/products?category=TEXTILES',
                'home': '/products?category=HOME_LIVING',
                'living': '/products?category=HOME_LIVING',
                'home living': '/products?category=HOME_LIVING',
                'home & living': '/products?category=HOME_LIVING',
                'kitchen': '/products?category=HOME_LIVING',
                'wellness': '/products?category=WELLNESS',
                'health': '/products?category=WELLNESS',
                'care': '/products?category=WELLNESS',
                'soap': '/products?category=WELLNESS',
                'shampoo': '/products?category=WELLNESS',
                'lifestyle': '/products?category=LIFESTYLE',
                'daily': '/products?category=LIFESTYLE',
                'essentials': '/products?category=LIFESTYLE'
            }

            // Check for help/legal page matches
            const pageMatches = {
                'help': '/help',
                'support': '/help',
                'contact': '/contact',
                'about': '/about',
                'privacy': '/privacy',
                'privacy policy': '/privacy',
                'terms': '/terms',
                'terms and conditions': '/terms',
                'refund': '/refund',
                'refund policy': '/refund',
                'shipping': '/shipping',
                'returns': '/returns',
                'faq': '/faq'
            }

            // Check for exact category match
            if (categoryMatches[query]) {
                navigate(categoryMatches[query])
                setSearchTerm('') // Clear search after navigation
                setIsSearchOpen(false) // Close search modal
                return
            }

            // Check for exact page match
            if (pageMatches[query]) {
                navigate(pageMatches[query])
                setSearchTerm('') // Clear search after navigation
                setIsSearchOpen(false) // Close search modal
                return
            }

            // Default to product search
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
            setSearchTerm('') // Clear search after navigation
            setIsSearchOpen(false) // Close search modal
        }
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor} ${shouldUseBeige ? 'shadow-sm' : ''}`}>

                {/* Mobile Navigation - Now shows at xl breakpoint (1280px) */}
                <div className="flex items-center justify-between px-4 py-3 xl:hidden">
                    {/* Hamburger Menu */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleMenuClick}
                        className={`${textColor} hover:bg-transparent`}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Brand Logo */}
                    <div className="flex-1 text-center">
                        <Link to="/">
                            <h1 className={`text-lg ${shouldUseBeige ? 'navbar-brand' : 'navbar-brand-light'} ${shouldUseBeige ? '' : 'drop-shadow-lg'}`}>
                                HOUSE OF HOMEGROWN
                            </h1>
                        </Link>
                    </div>

                    {/* Right side icons */}
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`${textColor} hover:bg-transparent`}
                        >
                            <User className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => navigate('/cart')}
                            className={`${textColor} hover:bg-transparent relative`}
                        >
                            <ShoppingCart className="h-6 w-6" />
                            {getCartItemCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {getCartItemCount()}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Horizontal Scrollable Menu for Small Phones */}
                <div className="xl:hidden border-t border-opacity-20" style={{ borderColor: shouldUseBeige ? '#E5E7EB' : 'rgba(255, 255, 255, 0.2)' }}>
                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex items-center space-x-6 px-4 py-2 min-w-max">
                            <Link
                                to="/products"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                Shop
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                            <Link
                                to="/products?category=TEXTILES"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                Textiles
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                            <Link
                                to="/products?category=HOME_LIVING"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                Home & Living
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                            <Link
                                to="/products?category=WELLNESS"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                Wellness
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                            <Link
                                to="/products?category=LIFESTYLE"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                Lifestyle
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                            <Link
                                to="/about"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                About
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                            <Link
                                to="/contact"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                Contact
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                            <Link
                                to="/faq"
                                className={`${textColor} text-sm font-medium whitespace-nowrap relative group transition-colors py-1`}
                            >
                                FAQ
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation - Now only shows at xl breakpoint (1280px+) */}
                <div className="hidden xl:grid xl:grid-cols-3 xl:items-center px-8 py-4 gap-4">
                    {/* Left - Navigation Menu */}
                    <nav className="flex items-center space-x-6 justify-start">
                        <Link to="/products" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            Shop
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=TEXTILES" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            Textiles
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=HOME_LIVING" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            Home & Living
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=WELLNESS" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            Wellness
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=LIFESTYLE" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            Lifestyle
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                    </nav>

                    {/* Center - Brand Logo (Home Link) */}
                    <div className="flex justify-center">
                        <Link to="/" className="block">
                            <h1 className={`text-xl ${shouldUseBeige ? 'navbar-brand' : 'navbar-brand-light'} drop-shadow-lg whitespace-nowrap hover:opacity-80 transition-opacity cursor-pointer`}>
                                HOUSE OF HOMEGROWN
                            </h1>
                        </Link>
                    </div>

                    {/* Right - About/Contact/FAQ and Action Icons */}
                    <div className="flex items-center space-x-6 justify-end">
                        {/* About, Contact, FAQ Links */}
                        <Link to="/about" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            About
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/contact" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            Contact
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/faq" className={`${textColor} text-button text-sm relative group transition-colors`}>
                            FAQ
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>

                        {/* Action Icons */}
                        <div className="flex items-center space-x-3 ml-4">
                            {/* Search Button */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(true)}
                                className={`${textColor} hover:bg-transparent h-9 w-9`}
                            >
                                <Search className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className={`${textColor} hover:bg-transparent h-9 w-9`}
                            >
                                <User className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/cart')}
                                className={`${textColor} hover:bg-transparent h-9 w-9 relative`}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                {getCartItemCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {getCartItemCount()}
                                    </span>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />

            {/* Search Modal */}
            {isSearchOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsSearchOpen(false)}
                    />

                    {/* Search Popup */}
                    <div className="fixed top-16 right-8 z-50 w-96 max-w-[calc(100vw-2rem)]">
                        <div className={`${shouldUseBeige ? 'bg-white border-gray-200' : 'bg-gray-900 border-gray-700'} border rounded-2xl shadow-2xl`}>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className={`text-lg text-section-title ${shouldUseBeige ? 'text-gray-900' : 'text-white'}`}>
                                        Search
                                    </h3>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setIsSearchOpen(false)}
                                        className={`${shouldUseBeige ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-gray-800'} h-8 w-8`}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>

                                <form onSubmit={handleSearch} className="relative mb-6">
                                    <input
                                        type="text"
                                        placeholder="Search products, categories, help pages..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        autoFocus
                                        className={`w-full pl-10 pr-4 py-3 ${shouldUseBeige ? 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500' : 'bg-gray-800 border-gray-600 text-white placeholder-gray-400'} border rounded-lg focus:outline-none text-body`}
                                    />
                                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${shouldUseBeige ? 'text-gray-400' : 'text-gray-500'}`} />
                                </form>

                                {/* Search Suggestions */}
                                <div className="space-y-4">
                                    <div>
                                        <h4 className={`text-sm font-medium ${shouldUseBeige ? 'text-gray-700' : 'text-gray-300'} mb-3`}>
                                            Popular Categories
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Textiles', 'Wellness', 'Home & Living', 'Lifestyle'].map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => {
                                                        setSearchTerm(category.toLowerCase())
                                                        handleSearch({ preventDefault: () => { } })
                                                    }}
                                                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${shouldUseBeige
                                                        ? 'bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200'
                                                        : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                                                        }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className={`text-sm font-medium ${shouldUseBeige ? 'text-gray-700' : 'text-gray-300'} mb-3`}>
                                            Quick Links
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { name: 'About Us', term: 'about' },
                                                { name: 'Contact', term: 'contact' },
                                                { name: 'FAQ', term: 'faq' },
                                                { name: 'Shipping', term: 'shipping' },
                                                { name: 'Returns', term: 'returns' }
                                            ].map((item) => (
                                                <button
                                                    key={item.term}
                                                    onClick={() => {
                                                        setSearchTerm(item.term)
                                                        handleSearch({ preventDefault: () => { } })
                                                    }}
                                                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${shouldUseBeige
                                                        ? 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
                                                        : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
                                                        }`}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <p className={`text-xs ${shouldUseBeige ? 'text-gray-500' : 'text-gray-400'} text-body`}>
                                        Press Enter to search or click on suggestions above
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}