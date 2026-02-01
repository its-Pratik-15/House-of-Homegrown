import { X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'

const menuItems = [
    { title: 'Shop', href: '/shop' },
    { title: 'All Categories', href: '/categories' },
    { title: 'Wellness', href: '/wellness' },
    { title: 'Lifestyle', href: '/lifestyle' },
    { title: 'Textiles', href: '/textiles' },
    { title: 'Home & Living', href: '/home-living' },
    { title: 'New Arrivals', href: '/new-arrivals' },
    { title: 'Trending', href: '/trending' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact Us', href: '/contact' },
    { title: 'FAQ', href: '/faq' },
]

export default function MobileMenu({ isOpen, onClose }) {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="left" className="w-80 p-0 bg-white/10 backdrop-blur-md border-white/20 [&>button]:text-white [&>button]:hover:text-white/80">
                <SheetHeader className="p-4 border-b border-white/20">
                    <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>

                {/* Search Bar */}
                <div className="p-4 border-b border-white/20">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/60 text-white placeholder-white/70"
                            style={{ outline: 'none' }}
                        />
                    </div>
                </div>

                {/* Menu Items */}
                <nav className="p-4">
                    <ul className="space-y-1">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <a
                                    href={item.href}
                                    className="block py-3 px-2 text-white hover:bg-white/20 rounded-lg transition-colors text-base font-medium"
                                    onClick={onClose}
                                >
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </SheetContent>
        </Sheet>
    )
}