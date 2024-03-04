import { Menu, ShoppingCart, Search, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Header({ onMenuClick }) {
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Show header when scrolling up or at the top
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true)
            }
            // Hide header when scrolling down (but not in the first 100px)
            else if (currentScrollY > 100) {
                setIsVisible(false)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'
            } backdrop-blur-md bg-black/10`}>

            {/* Mobile Navigation */}
            <div className="flex items-center justify-between px-4 py-3 md:hidden">
                {/* Hamburger Menu */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm border border-white/20"
                >
                    <Menu className="h-6 w-6" />
                </Button>

                {/* Brand Logo */}
                <div className="flex-1 text-center">
                    <h1 className="text-lg font-semibold text-white tracking-tight drop-shadow-lg bg-white/10 px-4 py-2 rounded-lg border border-white/20">
                        House of Homegrown
                    </h1>
                </div>

                {/* Cart Icon */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm border border-white/20"
                >
                    <ShoppingCart className="h-6 w-6" />
                </Button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:grid md:grid-cols-3 md:items-center px-8 py-4 gap-4">
                {/* Left - Navigation Menu */}
                <nav className="flex items-center space-x-6 justify-start">
                    <a href="#" className="text-white font-medium text-sm relative group transition-colors">
                        Shop
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#" className="text-white font-medium text-sm relative group transition-colors">
                        Textiles
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#" className="text-white font-medium text-sm relative group transition-colors">
                        Home & Living
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#" className="text-white font-medium text-sm relative group transition-colors">
                        Wellness
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#" className="text-white font-medium text-sm relative group transition-colors">
                        Lifestyle
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    <a href="#" className="text-white font-medium text-sm relative group transition-colors">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                    </a>
                </nav>

                {/* Center - Brand Logo (Home Link) */}
                <div className="flex justify-center">
                    <a href="#" className="block">
                        <h1 className="text-xl font-bold text-white tracking-tight drop-shadow-lg  px-4 py-2 whitespace-nowrap hover:bg-white/20 transition-colors cursor-pointer">
                            House of Homegrown
                        </h1>
                    </a>
                </div>

                {/* Right - Search Bar and Action Icons */}
                <div className="flex items-center space-x-3 justify-end">
                    {/* Search Bar */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 text-white placeholder-white/70"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/70" />
                    </div>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm border border-white/20 h-9 w-9"
                    >
                        <User className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm border border-white/20 h-9 w-9"
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </header>
    )
}