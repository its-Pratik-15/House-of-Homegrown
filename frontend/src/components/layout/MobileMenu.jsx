import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

const menuSections = [
    {
        title: 'Shop',
        items: [
            { name: 'All Products', href: '/products' },
            { name: 'Textiles', href: '/products?category=TEXTILES' },
            { name: 'Home & Living', href: '/products?category=HOME_LIVING' },
            { name: 'Wellness', href: '/products?category=WELLNESS' },
            { name: 'Lifestyle', href: '/products?category=LIFESTYLE' },
        ]
    },
    {
        title: 'About',
        items: [
            { name: 'Our Story', href: '/about' },
            { name: 'Contact Us', href: '/contact' },
        ]
    },
    {
        title: 'Help',
        items: [
            { name: 'FAQ', href: '/faq' },
            { name: 'Shipping', href: '/shipping' },
            { name: 'Returns', href: '/returns' },
        ]
    }
]

function AccordionSection({ title, items, isOpen, onToggle, onClose }) {
    const handleLinkClick = () => {
        // Close the entire mobile menu when a link is clicked
        onClose()
    }

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="text-base font-medium text-gray-900">{title}</span>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-600" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                )}
            </button>

            {isOpen && (
                <div className="pb-4">
                    <ul className="space-y-2 pl-4">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className="block py-2 text-gray-700 hover:text-[#8B5E3C] text-sm transition-colors"
                                    onClick={handleLinkClick}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default function MobileMenu({ isOpen, onClose }) {
    const [searchTerm, setSearchTerm] = useState('')
    const [openSections, setOpenSections] = useState(() => {
        // Initialize with persistent state from localStorage
        try {
            const saved = localStorage.getItem('mobileMenuOpenSections')
            return saved ? JSON.parse(saved) : {}
        } catch {
            return {}
        }
    })
    const navigate = useNavigate()

    const toggleSection = (index) => {
        setOpenSections(prev => {
            const newState = {
                ...prev,
                [index]: !prev[index]
            }
            // Persist to localStorage
            try {
                localStorage.setItem('mobileMenuOpenSections', JSON.stringify(newState))
            } catch {
                // Ignore localStorage errors
            }
            return newState
        })
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
                <div className="p-4 pb-2 border-b border-gray-200">
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
                <nav className="p-4 pt-2">
                    {/* Accordion Sections */}
                    <div className="space-y-0">
                        {menuSections.map((section, index) => (
                            <AccordionSection
                                key={index}
                                title={section.title}
                                items={section.items}
                                isOpen={openSections[index]}
                                onToggle={() => toggleSection(index)}
                                onClose={onClose}
                            />
                        ))}
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    )
}