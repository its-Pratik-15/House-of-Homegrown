export default function About() {
    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mb-6">
                        {/* Brand Name with Custom Styling */}
                        <div className="inline-block">
                            <div className="brand-top-line text-lg md:text-xl mb-1">
                                HOUSE OF
                            </div>
                            <div className="brand-bottom-line text-2xl md:text-3xl mb-2">
                                Homegrown
                            </div>
                            <div className="brand-underline h-0.5 w-16 mx-auto"></div>
                        </div>
                    </div>
                    <p className="text-lg text-[#A0956B] text-body max-w-2xl mx-auto">
                        Sustainable. Handcrafted. Indian.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Our Story</h2>
                        <p className="text-[#666] text-body leading-relaxed mb-4">
                            House Of Homegrown was born from a simple belief: that everyday products should be both beautiful and responsible. We're a homegrown D2C brand offering sustainable, Indian-made products that celebrate our rich heritage while meeting modern needs.
                        </p>
                        <p className="text-[#666] text-body leading-relaxed">
                            Every product in our collection is thoughtfully curated to support conscious living, traditional craftsmanship, and environmental sustainability.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Our Mission</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            To make sustainable, handcrafted Indian products accessible to modern consumers who value quality, authenticity, and environmental responsibility. We bridge the gap between traditional artisans and conscious consumers.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Our Values</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D4]">
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Sustainability</h3>
                                <p className="text-[#666] text-body">
                                    Every product is chosen for its minimal environmental impact and sustainable production methods.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D4]">
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Craftsmanship</h3>
                                <p className="text-[#666] text-body">
                                    We celebrate traditional Indian craftsmanship and support artisan communities across the country.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D4]">
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Quality</h3>
                                <p className="text-[#666] text-body">
                                    We believe in products that last, reducing waste and providing lasting value to our customers.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-[#E8E2D4]">
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Authenticity</h3>
                                <p className="text-[#666] text-body">
                                    Every product tells a story of Indian heritage, tradition, and the hands that crafted it.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Our Categories</h2>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center p-4">
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Wellness</h3>
                                <p className="text-sm text-[#666] text-body">Ayurvedic everyday care products</p>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Home & Living</h3>
                                <p className="text-sm text-[#666] text-body">Everyday Indian home essentials</p>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Textiles</h3>
                                <p className="text-sm text-[#666] text-body">Handwoven cotton & linen</p>
                            </div>
                            <div className="text-center p-4">
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Lifestyle</h3>
                                <p className="text-sm text-[#666] text-body">Mindful daily essentials</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}