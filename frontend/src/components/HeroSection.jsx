import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
    return (
        <section className="relative h-[90vh] md:h-screen bg-linear-to-b from-secondary/30 to-white overflow-hidden">
            {/* Hero Image - Static Background */}
            <div className="absolute inset-0 z-0">
                <div className="w-full h-full relative">
                    <img
                        src="/hero-img-6.png"
                        alt="House of Homegrown lifestyle"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center px-6 text-center md:justify-start md:items-end md:text-right md:pr-16 md:pt-32">
                <div className="max-w-sm space-y-6 mb-16 md:mb-0 md:max-w-lg md:space-y-8">
                    {/* Main Tagline */}
                    <h1 className="text-3xl font-bold text-white leading-tight drop-shadow-lg md:text-6xl md:font-bold md:drop-shadow-none md:text-[#FAFAF8] md:leading-tight">
                        Rooted in India.
                        <br />
                        <span className="text-secondary-100 md:block md:text-[#FAFAF8]">
                            Made for Everyday Living.
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-white/90 text-base leading-relaxed drop-shadow-md md:text-xl md:drop-shadow-none md:text-[#EDE6DB] md:leading-relaxed">
                        Discover sustainable, handcrafted products that celebrate Indian heritage and conscious living.
                    </p>

                    {/* CTA Button - Desktop positioning */}
                    <div className="hidden md:block md:mt-10">
                        <Button
                            size="lg"
                            className="px-10 py-4 rounded-full font-medium shadow-lg transition-all duration-300 bg-[#2E7D32] text-white border-none hover:bg-[#2E7D32]/90 md:text-lg"
                        >
                            Shop Now
                        </Button>
                    </div>
                </div>

                {/* CTA Button - Mobile positioning */}
                <div className="absolute bottom-24 md:hidden">
                    <Button
                        size="lg"
                        className="bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 text-white px-8 py-3 rounded-full font-medium shadow-lg transition-all duration-300"
                    >
                        Shop Now
                    </Button>
                </div>

                {/* Scroll Hint - Enhanced - Desktop only */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center space-y-2 animate-bounce">
                    <div className="text-white/90 text-xs font-medium tracking-wide uppercase">
                        Scroll Down
                    </div>
                    <div className="flex flex-col space-y-1">
                        <ChevronDown className="h-5 w-5 text-white/80 animate-pulse" />
                        <ChevronDown className="h-4 w-4 text-white/60 -mt-2" />
                    </div>
                </div>
            </div>
        </section>
    )
}