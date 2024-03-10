import { useState } from 'react'
import { ChevronDown, ChevronUp, Instagram, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerSections = [
    {
        title: 'About',
        items: [
            { name: 'Our story', href: '/about' },
            { name: 'Artisan partners', href: '/about' },
            { name: 'Sustainability', href: '/about' },
            { name: 'Careers', href: '/contact' }
        ]
    },
    {
        title: 'Customer Care',
        items: [
            { name: 'Help', href: '/help' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Shipping', href: '/shipping' },
            { name: 'Returns', href: '/returns' },
            { name: 'Contact us', href: '/contact' }
        ]
    },
    {
        title: 'Legal',
        items: [
            { name: 'Privacy policy', href: '/privacy' },
            { name: 'Terms and conditions', href: '/terms' },
            { name: 'Shipping policy', href: '/shipping' },
            { name: 'Return policy', href: '/returns' }
        ]
    }
]

function AccordionSection({ title, items, isOpen, onToggle }) {
    return (
        <div className="border-b border-[#E8E2D4] last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="text-body text-[#8B5E3C]">{title}</span>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#A0956B]" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-[#A0956B]" />
                )}
            </button>

            {isOpen && (
                <div className="pb-4">
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.href}
                                    className="text-[#A0956B] hover:text-[#8B5E3C] text-sm transition-colors text-body"
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

function DesktopSection({ title, items }) {
    return (
        <div className="space-y-4">
            <h4 className="text-body text-[#8B5E3C]">{title}</h4>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.href}
                            className="text-[#A0956B] hover:text-[#8B5E3C] text-sm transition-colors text-body"
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default function Footer() {
    const [openSections, setOpenSections] = useState({})

    const toggleSection = (index) => {
        setOpenSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    return (
        <footer className="bg-[#F5F1E8] border-t border-[#E8E2D4]">
            <div className="px-6 py-12 md:px-16 md:py-16 max-w-7xl mx-auto">
                {/* Mobile Accordion Sections */}
                <div className="md:hidden">
                    {/* Brand Name - Mobile */}
                    <div className="mb-8">
                        <Link to="/">
                            <div className="inline-block hover:opacity-80 transition-opacity">
                                <div className="brand-top-line text-sm mb-1">
                                    HOUSE OF
                                </div>
                                <div className="brand-bottom-line text-lg mb-1">
                                    Homegrown
                                </div>
                                <div className="brand-underline h-0.5 w-12"></div>
                            </div>
                        </Link>
                        <p className="text-xs text-[#A0956B] mt-3 text-body">
                            Sustainable. Handcrafted. Indian.
                        </p>
                    </div>

                    {footerSections.map((section, index) => (
                        <AccordionSection
                            key={index}
                            title={section.title}
                            items={section.items}
                            isOpen={openSections[index]}
                            onToggle={() => toggleSection(index)}
                        />
                    ))}
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:block">
                    <div className="flex justify-between items-start">
                        {/* Brand Section */}
                        <div className="shrink-0 mr-16">
                            <Link to="/">
                                <div className="inline-block hover:opacity-80 transition-opacity">
                                    <div className="brand-top-line text-lg mb-1">
                                        HOUSE OF
                                    </div>
                                    <div className="brand-bottom-line text-2xl mb-2">
                                        Homegrown
                                    </div>
                                    <div className="brand-underline h-0.5 w-16"></div>
                                </div>
                            </Link>
                            <p className="text-sm text-[#A0956B] max-w-xs text-body mt-3">
                                Sustainable. Handcrafted. Indian.
                            </p>
                        </div>

                        {/* Footer Sections */}
                        <div className="flex space-x-16 lg:space-x-24">
                            {footerSections.map((section, index) => (
                                <DesktopSection
                                    key={index}
                                    title={section.title}
                                    items={section.items}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-[#E8E2D4] space-y-4 md:space-y-0">
                    <p className="text-[#A0956B] text-sm text-body">
                        © 2026 – House Of Homegrown
                    </p>

                    {/* Social Links */}
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-[#A0956B] hover:text-[#8B5E3C] transition-colors"
                            aria-label="Instagram"
                        >
                            <Instagram className="h-5 w-5" />
                        </a>
                        <a
                            href="#"
                            className="text-[#A0956B] hover:text-[#8B5E3C] transition-colors"
                            aria-label="Email"
                        >
                            <Mail className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}