import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const footerSections = [
    {
        title: 'About',
        items: ['Our Story', 'Artisan Partners', 'Sustainability', 'Careers']
    },
    {
        title: 'Customer Care',
        items: ['Contact Us', 'Shipping Info', 'Returns & Exchanges', 'Size Guide', 'Track Order']
    },
    {
        title: 'Legal',
        items: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Refund Policy']
    }
]

function AccordionSection({ title, items, isOpen, onToggle }) {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="font-medium text-text-primary">{title}</span>
                {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-text-secondary" />
                ) : (
                    <ChevronDown className="h-4 w-4 text-text-secondary" />
                )}
            </button>

            {isOpen && (
                <div className="pb-4">
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <li key={index}>
                                <a
                                    href="#"
                                    className="text-text-secondary hover:text-primary text-sm transition-colors"
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
        <footer className="bg-white border-t border-gray-100 mt-16">
            <div className="px-6 py-8">
                {/* Brand Name */}
                <div className="text-center mb-8">
                    <h3 className="text-lg font-semibold text-primary">
                        House of Homegrown
                    </h3>
                </div>

                {/* Accordion Sections */}
                <div className="max-w-md mx-auto">
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

                {/* Copyright */}
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                    <p className="text-text-secondary text-sm">
                        © 2026 – House of Homegrown
                    </p>
                </div>
            </div>
        </footer>
    )
}