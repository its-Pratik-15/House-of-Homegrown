import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PremiumCTAButton({
    children,
    href,
    to,
    onClick,
    className = "",
    variant = "primary" // primary or secondary
}) {
    const [isHovered, setIsHovered] = useState(false)
    const [showMobileHighlight, setShowMobileHighlight] = useState(false)

    // Mobile highlight effect on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMobileHighlight(true)
        }, 1000) // Delay after page load

        return () => clearTimeout(timer)
    }, [])

    const baseClasses = `
        relative overflow-hidden
        inline-flex items-center justify-center
        px-8 py-4 
        rounded-full
        text-white font-medium text-button
        transition-all duration-300 ease-out
        shadow-lg
        group
        ${className}
    `

    const primaryClasses = `
        bg-[#2F7D32] hover:bg-[#1B5E20]
        animate-breathing
        shadow-[0_8px_32px_rgba(47,125,50,0.3)]
        hover:shadow-[0_12px_40px_rgba(47,125,50,0.4)]
    `

    const secondaryClasses = `
        bg-[#8B5E3C] hover:bg-[#6B4423]
        animate-breathing-secondary
        shadow-[0_8px_32px_rgba(139,94,60,0.3)]
        hover:shadow-[0_12px_40px_rgba(139,94,60,0.4)]
    `

    const buttonClasses = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses}`

    const ButtonContent = () => (
        <>
            {/* Mobile highlight sweep */}
            <div
                className={`absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-transform duration-1000 ${showMobileHighlight ? 'translate-x-full' : '-translate-x-full'
                    } md:hidden`}
            />

            {/* Button text */}
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                {children}
            </span>

            {/* Arrow icon */}
            <ArrowRight
                className={`ml-2 h-4 w-4 transition-all duration-300 ${isHovered ? 'translate-x-1 opacity-100' : 'translate-x-0 opacity-70'
                    }`}
            />
        </>
    )

    if (to) {
        return (
            <Link
                to={to}
                className={buttonClasses}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <ButtonContent />
            </Link>
        )
    }

    if (href) {
        return (
            <a
                href={href}
                className={buttonClasses}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <ButtonContent />
            </a>
        )
    }

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ButtonContent />
        </button>
    )
}