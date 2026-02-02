import PremiumCTAButton from '@/components/ui/premium-cta-button'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function HeroSection() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    return (
        <section className="relative h-[90vh] md:h-screen bg-linear-to-b from-secondary/30 to-white overflow-hidden">
            {/* Hero Image - Responsive */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full relative">
                    <img
                        src={isMobile ? "/hero-img-mobile.png" : "/hero-img-desktop.png"}
                        alt="House of Homegrown lifestyle"
                        className={`absolute inset-0 w-full h-full ${isMobile ? 'object-cover object-bottom' : 'object-cover'}`}
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center md:justify-center md:items-center md:text-center">
                {/* Mobile Text - Positioned in empty space area */}
                <div className="max-w-sm space-y-6 mb-16 md:mb-0 md:max-w-4xl md:space-y-10 md:hidden absolute right-6 top-1/3 transform -translate-y-1/2 text-right">
                    {/* Main Tagline */}
                    <h1 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
                        Rooted in India.
                        <br />
                        <span className="text-secondary-100">
                            Made for Everyday Living.
                        </span>
                    </h1>

                    {/* Subtext - Same size, broken by sentence */}
                    <div className="text-white/90 drop-shadow-md space-y-1">
                        <p className="text-base leading-relaxed">
                            Discover sustainable,
                        </p>
                        <p className="text-base leading-relaxed">
                            handcrafted products that celebrate
                        </p>
                        <p className="text-base leading-relaxed">
                            Indian heritage and conscious living.
                        </p>
                    </div>
                </div>

                {/* Desktop Text - Centered */}
                <div className="hidden md:block max-w-5xl space-y-10 text-center">
                    {/* Main Tagline */}
                    <h1 className="text-5xl lg:text-7xl font-bold drop-shadow-none text-[#FAFAF8] leading-tight">
                        Rooted in India.
                        <br />
                        <span className="block text-[#FAFAF8] mt-2">
                            Made for Everyday Living.
                        </span>
                    </h1>

                    {/* Subtext - Centered and refined */}
                    <div className="drop-shadow-none text-[#EDE6DB] space-y-2 max-w-3xl mx-auto">
                        <p className="text-xl lg:text-2xl leading-relaxed">
                            Discover sustainable, handcrafted products that celebrate
                        </p>
                        <p className="text-xl lg:text-2xl leading-relaxed">
                            Indian heritage and conscious living.
                        </p>
                    </div>

                    {/* CTA Button - Desktop positioning */}
                    <div className="mt-12">
                        <PremiumCTAButton to="/products" variant="primary" className="text-lg px-8 py-4">
                            Shop Now
                        </PremiumCTAButton>
                    </div>
                </div>

                {/* CTA Button - Mobile positioning (positioned just above hero image end) */}
                <div className="absolute bottom-8 md:hidden">
                    <PremiumCTAButton to="/products" variant="primary">
                        Shop Now
                    </PremiumCTAButton>
                </div>

                {/* Scroll Hint - Enhanced - Desktop only */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center">
                    <ChevronDown className="h-5 w-5 text-white/80 animate-scroll-hint" />
                </div>
            </div>
        </section>
    )
}