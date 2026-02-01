import { X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
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
    { title: 'About Us', href: '#about' },
]

export default function MobileMenu({ isOpen, onClose }) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-80 p-0 bg-[#F5F1E8] border-gray-200 [&>button]:text-gray-900 [&>button]:hover:text-gray-700">
                <SheetHeader className="p-4 border-b border-gray-200">
                    <SheetTitle className="text-gray-900">Menu</SheetTitle>
                </SheetHeader>

                {/* Search Bar */}
                <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-500"
                            style={{ outline: 'none' }}
                        />
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                {item.href.startsWith('#') ? (
                                    <a
                                        href={item.href}
                                        className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-base font-medium"
                                        onClick={onClose}
                                    >
                                        {item.title}
                                    </a>
                                ) : (
                                    <Link
                                        to={item.href}
                                        className="block py-3 px-2 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors text-base font-medium"
                                        onClick={onClose}
                                    >
                                        {item.title}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}