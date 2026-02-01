import { Truck, Clock, MapPin, Package } from 'lucide-react'

export default function Shipping() {
    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] mb-4">
                        Shipping Information
                    </h1>
                    <p className="text-lg text-[#A0956B] text-body max-w-2xl mx-auto">
                        Everything you need to know about our shipping process and delivery options.
                    </p>
                </div>

                {/* Shipping Options */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <div className="flex items-center mb-4">
                            <Truck className="h-8 w-8 text-[#8B5E3C] mr-3" />
                            <h2 className="text-2xl text-section-title text-[#8B5E3C]">Standard Shipping</h2>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[#666] text-body">
                                <span className="text-section-title text-[#8B5E3C]">Delivery Time:</span> 3-7 business days
                            </p>
                            <p className="text-[#666] text-body">
                                <span className="text-section-title text-[#8B5E3C]">Cost:</span> ₹99 (Free on orders above ₹999)
                            </p>
                            <p className="text-[#666] text-body">
                                <span className="text-section-title text-[#8B5E3C]">Coverage:</span> All major cities and towns across India
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <div className="flex items-center mb-4">
                            <Clock className="h-8 w-8 text-[#8B5E3C] mr-3" />
                            <h2 className="text-2xl text-section-title text-[#8B5E3C]">Express Shipping</h2>
                        </div>
                        <div className="space-y-3">
                            <p className="text-[#666] text-body">
                                <span className="text-section-title text-[#8B5E3C]">Delivery Time:</span> 1-3 business days
                            </p>
                            <p className="text-[#666] text-body">
                                <span className="text-section-title text-[#8B5E3C]">Cost:</span> ₹199
                            </p>
                            <p className="text-[#666] text-body">
                                <span className="text-section-title text-[#8B5E3C]">Coverage:</span> Metro cities and select locations
                            </p>
                        </div>
                    </div>
                </div>

                {/* Shipping Process */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] mb-12">
                    <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-8 text-center">How Shipping Works</h2>

                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="bg-[#F5F1E8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-[#8B5E3C]" />
                            </div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Order Processing</h3>
                            <p className="text-sm text-[#666] text-body">
                                Orders are processed within 1-2 business days
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-[#F5F1E8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-[#8B5E3C]" />
                            </div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Careful Packaging</h3>
                            <p className="text-sm text-[#666] text-body">
                                Items are carefully packed with eco-friendly materials
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-[#F5F1E8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Truck className="h-8 w-8 text-[#8B5E3C]" />
                            </div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Dispatch</h3>
                            <p className="text-sm text-[#666] text-body">
                                Package is handed over to our shipping partner
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-[#F5F1E8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <MapPin className="h-8 w-8 text-[#8B5E3C]" />
                            </div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Delivery</h3>
                            <p className="text-sm text-[#666] text-body">
                                Package arrives at your doorstep
                            </p>
                        </div>
                    </div>
                </div>

                {/* Shipping Information */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Shipping Coverage</h2>
                        <div className="space-y-4">
                            <p className="text-[#666] text-body leading-relaxed">
                                We currently ship to all locations within India. Our shipping partners ensure reliable delivery to both urban and rural areas.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="text-section-title text-[#8B5E3C] mb-2">Metro Cities</h3>
                                    <p className="text-[#666] text-body text-sm">
                                        Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-section-title text-[#8B5E3C] mb-2">Other Locations</h3>
                                    <p className="text-[#666] text-body text-sm">
                                        All other cities, towns, and rural areas across India
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Order Tracking</h2>
                        <div className="space-y-4">
                            <p className="text-[#666] text-body leading-relaxed">
                                Once your order is shipped, you'll receive a tracking number via email and SMS. You can track your package in real-time using this number.
                            </p>
                            <div className="bg-[#F5F1E8] p-4 rounded-lg">
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Tracking Steps:</h3>
                                <ol className="list-decimal list-inside text-[#666] text-body space-y-1 text-sm">
                                    <li>Check your email for the tracking number</li>
                                    <li>Visit our shipping partner's website</li>
                                    <li>Enter your tracking number</li>
                                    <li>View real-time updates on your package location</li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Special Handling</h2>
                        <div className="space-y-4">
                            <p className="text-[#666] text-body leading-relaxed">
                                Our handcrafted products require special care during shipping. We use eco-friendly packaging materials and ensure each item is properly protected.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="text-center p-4">
                                    <h3 className="text-section-title text-[#8B5E3C] mb-2">Textiles</h3>
                                    <p className="text-sm text-[#666] text-body">Folded with tissue paper and sealed in protective bags</p>
                                </div>
                                <div className="text-center p-4">
                                    <h3 className="text-section-title text-[#8B5E3C] mb-2">Ceramics</h3>
                                    <p className="text-sm text-[#666] text-body">Wrapped in bubble wrap and secured in custom boxes</p>
                                </div>
                                <div className="text-center p-4">
                                    <h3 className="text-section-title text-[#8B5E3C] mb-2">Wellness</h3>
                                    <p className="text-sm text-[#666] text-body">Sealed containers with leak-proof packaging</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Shipping FAQs</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">What if I'm not home during delivery?</h3>
                                <p className="text-[#666] text-body text-sm">
                                    Our delivery partners will attempt delivery 2-3 times. If unsuccessful, the package will be held at the local facility for pickup.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Can I change my delivery address?</h3>
                                <p className="text-[#666] text-body text-sm">
                                    Address changes are possible before the order is shipped. Contact our support team immediately if you need to update your address.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Do you ship internationally?</h3>
                                <p className="text-[#666] text-body text-sm">
                                    Currently, we only ship within India. We're working on international shipping options and will update customers when available.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-white p-8 rounded-2xl border border-[#E8E2D4] text-center">
                    <h3 className="text-xl text-section-title text-[#8B5E3C] mb-4">
                        Need Help with Shipping?
                    </h3>
                    <p className="text-[#666] text-body mb-6">
                        Our customer support team is here to help with any shipping questions or concerns.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-[#8B5E3C] hover:bg-[#6B4423] text-white px-8 py-3 rounded-2xl text-button transition-colors"
                    >
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    )
}