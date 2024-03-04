import { Button } from '@/components/ui/button'

const categories = [
    {
        id: 'wellness',
        title: 'Wellness',
        heroLine: 'Ayurvedic Everyday Care',
        tagline: 'Gentle by Nature',
        description: 'Natural formulations crafted for daily rituals—rooted in Ayurveda, made for modern living.',
        cta: 'Explore Wellness',
        product: {
            imageMobile: '/soap-mobile.webp',
            imageDesktop: '/soap-desktop.png',
            name: 'Argila Branca Soap',
            subtitle: 'Gentle by Nature',
            cta: 'Explore Wellness'
        }
    },
    {
        id: 'home-living',
        title: 'Home & Living',
        heroLine: 'Everyday Indian Homes',
        tagline: 'Simple. Honest. Home.',
        description: 'Thoughtfully designed essentials that bring warmth, utility, and calm into your space.',
        cta: 'Home and Living',
        product: {
            imageMobile: '/utensil-set-wooden-mobile.webp',
            imageDesktop: '/utensil-set-wooden-desktop.png',
            name: 'Everyday Essentials',
            subtitle: 'Made to Belong',
            cta: 'Home and Living'
        }
    },
    {
        id: 'textiles',
        title: 'Textiles',
        heroLine: 'Handwoven Cotton & Linen',
        tagline: 'Woven with Care',
        description: 'Breathable, handcrafted fabrics made using traditional techniques and natural fibers.',
        cta: 'Explore Textiles',
        product: {
            imageMobile: '/handwoven-linen-mobile.jpeg',
            imageDesktop: '/handwoven-linen-desktop.png',
            name: 'Handwoven Linen',
            subtitle: 'Soft by Nature',
            cta: 'Explore Textiles'
        }
    },
    {
        id: 'lifestyle',
        title: 'Lifestyle',
        heroLine: 'Mindful Daily Essentials',
        tagline: 'Live a Little Slower',
        description: 'Products that support conscious choices—minimal, purposeful, and rooted in tradition.',
        cta: 'Explore Lifestyle',
        product: {
            imageMobile: '/ceramic-plate-mobile.webp',
            imageDesktop: '/ceramic-plate-desktop.png',
            name: 'Ceramic Plate',
            subtitle: 'Calm by Design',
            cta: 'Explore Lifestyle'
        }
    },
]

export default function CategorySection() {
    return (
        <section className="bg-linear-to-b from-white to-secondary/20">
            <div className="w-full">
                {categories.map((category, index) => (
                    <div
                        key={category.id}
                        className="overflow-hidden shadow-sm relative h-[60vh] w-full md:h-[80vh] md:flex md:items-center"
                    >
                        {/* Mobile: Full background image */}
                        <div
                            className="absolute inset-0 md:hidden"
                            style={{
                                backgroundImage: category.product
                                    ? `url(${category.product.imageMobile})`
                                    : 'none',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        />

                        {/* Desktop: Full background with alternating content position */}
                        <div className="hidden md:flex md:w-full md:h-full">
                            <div
                                className="w-full h-full relative flex items-center"
                                style={{
                                    backgroundImage: `url(${category.product.imageDesktop})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            >
                                {/* Dark overlay for better text readability */}
                                <div className="absolute inset-0 bg-black/30"></div>

                                {/* Content positioned left or right based on index */}
                                <div className={`relative z-10 w-1/2 px-12 py-8 ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                                    <div className="space-y-6">
                                        {/* Title - H1 Large Serif */}
                                        <h1 className="text-4xl font-serif font-bold text-white leading-tight">
                                            {category.heroLine}
                                        </h1>

                                        {/* Tagline - Small Caps */}
                                        <h2 className="text-sm font-medium text-white/90 uppercase tracking-widest">
                                            {category.tagline}
                                        </h2>

                                        {/* Description - Max 120 characters */}
                                        <p className="text-white/80 leading-relaxed text-base max-w-md">
                                            {category.description}
                                        </p>

                                        {/* CTA Button - Soft Rounded, Earthy Brown */}
                                        <Button
                                            size="lg"
                                            className="bg-[#8B5E3C] hover:bg-[#7A5233] text-white rounded-2xl px-8 py-3 text-base font-medium shadow-lg border-none transition-all duration-300"
                                        >
                                            {category.cta}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile: Content overlay (unchanged) */}
                        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:hidden">
                            {/* Top section - Category info */}
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold" style={
                                    category.id === 'wellness' ? { color: '#2D4A2B' } :
                                        category.id === 'lifestyle' ? { color: '#4A3429' } :
                                            category.id === 'textiles' ? { color: '#FFFFFF' } :
                                                category.id === 'home-living' ? { color: '#F5F3F0' } :
                                                    { color: 'white' }
                                }>
                                    {category.title}
                                </h3>
                            </div>

                            {/* Bottom section - Product info and CTA */}
                            <div className="space-y-3 text-center">
                                {category.product && (
                                    <div>
                                        <h4 className="font-semibold text-base" style={
                                            category.id === 'wellness' ? { color: '#2D4A2B' } :
                                                category.id === 'lifestyle' ? { color: '#4A3429' } :
                                                    category.id === 'textiles' ? { color: '#FFFFFF' } :
                                                        category.id === 'home-living' ? { color: '#F5F3F0' } :
                                                            { color: 'white' }
                                        }>{category.product.name}</h4>
                                        <p className="text-sm" style={
                                            category.id === 'wellness' ? { color: '#4A6B47' } :
                                                category.id === 'lifestyle' ? { color: '#6B4A3A' } :
                                                    category.id === 'textiles' ? { color: '#E0E0E0' } :
                                                        category.id === 'home-living' ? { color: '#D4C4B3' } :
                                                            { color: 'rgba(255,255,255,0.8)' }
                                        }>{category.product.subtitle}</p>
                                    </div>
                                )}

                                <Button
                                    size="sm"
                                    className="rounded-full px-6 hover:opacity-90"
                                    style={
                                        category.id === 'wellness'
                                            ? {
                                                backgroundColor: '#FFFFFF',
                                                color: '#2D4A2B',
                                                boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
                                                border: 'none'
                                            }
                                            : category.id === 'lifestyle'
                                                ? {
                                                    backgroundColor: '#FFFFFF',
                                                    color: '#4A3429',
                                                    boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
                                                    border: 'none'
                                                }
                                                : category.id === 'textiles'
                                                    ? {
                                                        backgroundColor: '#FFFFFF',
                                                        color: '#2D4A2B',
                                                        boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
                                                        border: 'none'
                                                    }
                                                    : category.id === 'home-living'
                                                        ? {
                                                            backgroundColor: '#2D4A2B',
                                                            color: '#F5F3F0',
                                                            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
                                                            border: 'none'
                                                        }
                                                        : {
                                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                                            color: 'white',
                                                            boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
                                                            border: 'none'
                                                        }
                                    }
                                >
                                    {category.product ? category.product.cta : `Shop ${category.title}`}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}