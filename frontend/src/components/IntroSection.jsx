import { Button } from '@/components/ui/button'

export default function IntroSection() {
    return (
        <section
            className="py-16 px-6 relative"
            style={{
                backgroundImage: 'url(/about-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Warm off-white overlay for subtle background tint */}
            <div className="absolute inset-0" style={{ backgroundColor: 'rgba(248, 246, 240, 0.07)' }}></div>

            <div className="max-w-md mx-auto text-center space-y-6 relative z-10">
                <p className="text-lg md:text-xl lg:text-2xl text-text-secondary leading-relaxed font-medium">
                    We're a homegrown D2C brand offering sustainable, Indian-made products.
                </p>

                <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-6"
                >
                    Learn More
                </Button>
            </div>
        </section>
    )
}