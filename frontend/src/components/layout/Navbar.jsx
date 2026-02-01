import { Menu, ShoppingCart, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MobileMenu from './MobileMenu'
import { useCart } from '../../hooks/useCart'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const location = useLocation()
    const { getCartItemCount } = useCart()

    // Check if we're on the home page
    const isHomePage = location.pathname === '/'

    // Dynamic colors based on scroll state and page
    const shouldUseBeige = isScrolled || !isHomePage
    const textColor = shouldUseBeige ? 'text-gray-900' : 'text-white'
    const bgColor = shouldUseBeige ? 'bg-[#F5F1E8]' : 'bg-transparent'
    const borderColor = shouldUseBeige ? 'border-gray-300' : 'border-white/20'
    const hoverBg = shouldUseBeige ? 'hover:bg-gray-100' : 'hover:bg-white/20'
    const buttonBg = shouldUseBeige ? 'bg-gray-100' : 'bg-white/10'
    const searchBg = shouldUseBeige ? 'bg-white border-gray-300 text-gray-900' : 'bg-white/20 border-white/30 text-white'
    const searchFocus = shouldUseBeige ? 'focus:ring-primary focus:border-primary' : 'focus:ring-white/50 focus:border-white/60'
    const placeholderColor = shouldUseBeige ? 'placeholder-gray-500' : 'placeholder-white/70'
    const underlineColor = shouldUseBeige ? 'bg-gray-900' : 'bg-white'
    const iconColor = shouldUseBeige ? 'text-gray-600' : 'text-white/70'

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

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgColor} ${shouldUseBeige ? 'shadow-sm' : ''}`}>

                {/* Mobile Navigation */}
                <div className="flex items-center justify-between px-4 py-3 md:hidden">
                    {/* Hamburger Menu */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleMenuClick}
                        className={`${textColor} ${hoverBg} ${buttonBg} border ${borderColor}`}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Brand Logo */}
                    <div className="flex-1 text-center">
                        <Link to="/">
                            <h1 className={`text-lg font-semibold ${textColor} tracking-tight ${shouldUseBeige ? '' : 'drop-shadow-lg'} ${buttonBg} px-4 py-2 rounded-lg border ${borderColor}`}>
                                House of Homegrown
                            </h1>
                        </Link>
                    </div>

                    {/* Cart Icon */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`${textColor} ${hoverBg} ${buttonBg} border ${borderColor} relative`}
                    >
                        <ShoppingCart className="h-6 w-6" />
                        {getCartItemCount() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {getCartItemCount()}
                            </span>
                        )}
                    </Button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:grid md:grid-cols-3 md:items-center px-8 py-4 gap-4">
                    {/* Left - Navigation Menu */}
                    <nav className="flex items-center space-x-6 justify-start">
                        <Link to="/products" className={`${textColor} font-medium text-sm relative group transition-colors`}>
                            Shop
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=TEXTILES" className={`${textColor} font-medium text-sm relative group transition-colors`}>
                            Textiles
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=HOME_LIVING" className={`${textColor} font-medium text-sm relative group transition-colors`}>
                            Home & Living
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=WELLNESS" className={`${textColor} font-medium text-sm relative group transition-colors`}>
                            Wellness
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <Link to="/products?category=LIFESTYLE" className={`${textColor} font-medium text-sm relative group transition-colors`}>
                            Lifestyle
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </Link>
                        <a href="#about" className={`${textColor} font-medium text-sm relative group transition-colors`}>
                            About
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${underlineColor} transition-all duration-300 group-hover:w-full`}></span>
                        </a>
                    </nav>

                    {/* Center - Brand Logo (Home Link) */}
                    <div className="flex justify-center">
                        <Link to="/" className="block">
                            <h1 className={`text-xl font-bold ${textColor} tracking-tight drop-shadow-lg px-4 py-2 whitespace-nowrap ${hoverBg} transition-colors cursor-pointer`}>
                                House of Homegrown
                            </h1>
                        </Link>
                    </div>

                    {/* Right - Search Bar and Action Icons */}
                    <div className="flex items-center space-x-3 justify-end">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className={`w-full pl-10 pr-4 py-2 ${searchBg} border rounded-lg focus:outline-none focus:ring-2 ${searchFocus} ${placeholderColor}`}
                            />
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${iconColor}`} />
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className={`${textColor} ${hoverBg} ${buttonBg} border ${borderColor} h-9 w-9`}
                        >
                            <User className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`${textColor} ${hoverBg} ${buttonBg} border ${borderColor} h-9 w-9 relative`}
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
            </nav>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
        </>
    )
}