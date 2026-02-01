import { Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

const menuItems = [
    { title: 'Shop', href: '/products' },
    { title: 'Textiles', href: '/products?category=TEXTILES' },
    { title: 'Home & Living', href: '/products?category=HOME_LIVING' },
    { title: 'Wellness', href: '/products?category=WELLNESS' },
    { title: 'Lifestyle', href: '/products?category=LIFESTYLE' },
    { title: 'Cart', href: '/cart' },
    { title: 'About Us', href: '/about' },
]

export default function MobileMenu({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

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
                'faq': '/faq',
                'questions': 'faq'
            }

            // Check for exact category match
            if (categoryMatches[query]) {
                navigate(categoryMatches[query])
                setSearchTerm('')
                onClose()
                return
            }

            // Check for exact page match
            if (pageMatches[query]) {
                navigate(pageMatches[query])
                setSearchTerm('')
                onClose()
                return
            }

            // Default to product search
            navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`)
            setSearchTerm('')
            onClose()
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-80 p-0 bg-[#F5F1E8] border-gray-200 [&>button]:text-gray-900 [&>button]:hover:text-gray-700">
                <SheetHeader className="p-4 border-b border-gray-200">
                    <SheetTitle className="text-gray-900">Menu</SheetTitle>
                </SheetHeader>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200">
                    <form onSubmit={handleSearch}>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search products, categories..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none text-gray-900 placeholder-gray-500"
                                style={{ outline: 'none' }}
                            />
                        </div>
                    </form>
                </div>

                {/* Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-base font-medium"
                                    onClick={onClose}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}