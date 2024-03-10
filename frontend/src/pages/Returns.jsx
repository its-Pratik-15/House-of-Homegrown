import { RotateCcw, Package, CheckCircle, AlertCircle } from 'lucide-react'

export default function Returns() {
    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] mb-4">
                        Returns & Exchanges
                    </h1>
                    <p className="text-lg text-[#A0956B] text-body max-w-2xl mx-auto">
                        We want you to love your purchase. If you're not completely satisfied, we're here to help.
                    </p>
                </div>

                {/* Return Policy Overview */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] mb-12">
                    <div className="text-center mb-8">
                        <RotateCcw className="h-16 w-16 text-[#8B5E3C] mx-auto mb-4" />
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">30-Day Return Policy</h2>
                        <p className="text-[#666] text-body max-w-2xl mx-auto">
                            We offer a hassle-free 30-day return policy for all unused items in original packaging.
                            Your satisfaction is our priority.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="bg-[#F5F1E8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Package className="h-8 w-8 text-[#8B5E3C]" />
                            </div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Easy Returns</h3>
                            <p className="text-sm text-[#666] text-body">
                                Simple return process with prepaid return labels
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-[#F5F1E8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="h-8 w-8 text-[#8B5E3C]" />
                            </div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Quick Refunds</h3>
                            <p className="text-sm text-[#666] text-body">
                                Refunds processed within 5-7 business days
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-[#F5F1E8] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <RotateCcw className="h-8 w-8 text-[#8B5E3C]" />
                            </div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Free Exchanges</h3>
                            <p className="text-sm text-[#666] text-body">
                                Exchange for different size or color at no extra cost
                            </p>
                        </div>
                    </div>
                </div>

                {/* Return Process */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] mb-12">
                    <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-8 text-center">How to Return an Item</h2>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-[#8B5E3C] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                                1
                            </div>
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Contact Us</h3>
                                <p className="text-[#666] text-body">
                                    Email us at returns@houseofhomegrown.com with your order number and reason for return.
                                    We'll respond within 24 hours with return instructions.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-[#8B5E3C] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                                2
                            </div>
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Pack Your Item</h3>
                                <p className="text-[#666] text-body">
                                    Pack the item in its original packaging with all tags and accessories.
                                    Use the return label we provide via email.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-[#8B5E3C] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                                3
                            </div>
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Ship It Back</h3>
                                <p className="text-[#666] text-body">
                                    Drop off the package at any courier location or schedule a pickup.
                                    Return shipping is free for defective items or our errors.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-[#8B5E3C] text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                                4
                            </div>
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Get Your Refund</h3>
                                <p className="text-[#666] text-body">
                                    Once we receive and inspect your return, we'll process your refund within 5-7 business days
                                    to your original payment method.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Return Conditions */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <div className="flex items-center mb-4">
                            <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
                            <h2 className="text-xl text-section-title text-[#8B5E3C]">Returnable Items</h2>
                        </div>
                        <ul className="space-y-2 text-[#666] text-body">
                            <li>• Unused items in original packaging</li>
                            <li>• Items with all original tags attached</li>
                            <li>• Items returned within 30 days</li>
                            <li>• Items in original condition</li>
                            <li>• Defective or damaged items</li>
                            <li>• Wrong items sent by us</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <div className="flex items-center mb-4">
                            <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
                            <h2 className="text-xl text-section-title text-[#8B5E3C]">Non-Returnable Items</h2>
                        </div>
                        <ul className="space-y-2 text-[#666] text-body">
                            <li>• Used or washed textiles</li>
                            <li>• Opened wellness/personal care products</li>
                            <li>• Custom or personalized items</li>
                            <li>• Items without original packaging</li>
                            <li>• Items returned after 30 days</li>
                            <li>• Items damaged by customer</li>
                        </ul>
                    </div>
                </div>

                {/* Exchange Policy */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] mb-12">
                    <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-6">Exchange Policy</h2>
                    <div className="space-y-4">
                        <p className="text-[#666] text-body leading-relaxed">
                            We offer free exchanges for size or color variations within 30 days of purchase.
                            The item must be unused and in original condition.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Size Exchanges</h3>
                                <p className="text-[#666] text-body text-sm">
                                    Available for textiles and clothing items. Subject to stock availability.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-section-title text-[#8B5E3C] mb-2">Color Exchanges</h3>
                                <p className="text-[#666] text-body text-sm">
                                    Available for items with multiple color options. Subject to stock availability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Refund Information */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] mb-12">
                    <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-6">Refund Information</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Processing Time</h3>
                            <p className="text-[#666] text-body">
                                Refunds are processed within 5-7 business days after we receive and inspect your returned item.
                                You'll receive an email confirmation once the refund is initiated.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Refund Method</h3>
                            <p className="text-[#666] text-body">
                                Refunds are issued to your original payment method. Credit card refunds may take 3-5 additional
                                business days to appear on your statement.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Shipping Costs</h3>
                            <p className="text-[#666] text-body">
                                Original shipping costs are non-refundable unless the return is due to our error or a defective item.
                                Return shipping is free for defective items.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Special Cases */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] mb-12">
                    <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-6">Special Cases</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Damaged Items</h3>
                            <p className="text-[#666] text-body">
                                If you receive a damaged item, please contact us immediately with photos.
                                We'll arrange for a replacement or full refund including shipping costs.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Wrong Item Received</h3>
                            <p className="text-[#666] text-body">
                                If you receive the wrong item, we'll send you the correct item immediately and
                                provide a prepaid return label for the incorrect item.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-section-title text-[#8B5E3C] mb-2">Handmade Variations</h3>
                            <p className="text-[#666] text-body">
                                Slight variations in handmade products are normal and add to their unique character.
                                These variations are not considered defects and are not grounds for return.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4] text-center">
                    <h3 className="text-xl text-section-title text-[#8B5E3C] mb-4">
                        Need Help with Returns?
                    </h3>
                    <p className="text-[#666] text-body mb-6">
                        Our customer support team is here to make your return process as smooth as possible.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="mailto:returns@houseofhomegrown.com"
                            className="inline-block bg-[#8B5E3C] hover:bg-[#6B4423] text-white px-8 py-3 rounded-2xl text-button transition-colors"
                        >
                            Email Returns Team
                        </a>
                        <a
                            href="/contact"
                            className="inline-block border border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white px-8 py-3 rounded-2xl text-button transition-colors"
                        >
                            Contact Support
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}