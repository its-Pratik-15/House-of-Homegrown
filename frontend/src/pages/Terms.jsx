export default function Terms() {
    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-lg text-[#A0956B] text-body max-w-2xl mx-auto">
                        Last updated: February 2, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] space-y-8">
                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Agreement to Terms</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            By accessing and using House Of Homegrown's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Products and Services</h2>
                        <div className="space-y-4">
                            <p className="text-[#666] text-body leading-relaxed">
                                House Of Homegrown offers handcrafted, sustainable products including textiles, home & living items, wellness products, and lifestyle essentials. All products are made by skilled artisans using traditional methods and natural materials.
                            </p>
                            <p className="text-[#666] text-body leading-relaxed">
                                Due to the handmade nature of our products, slight variations in color, texture, and dimensions are normal and add to the unique character of each item. These variations are not considered defects.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Orders and Payment</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Order Acceptance</h3>
                                <p className="text-[#666] text-body leading-relaxed">
                                    All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product information, or suspected fraudulent activity.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Pricing</h3>
                                <p className="text-[#666] text-body leading-relaxed">
                                    All prices are listed in Indian Rupees (INR) and are subject to change without notice. Prices include applicable taxes unless otherwise stated. Shipping charges are additional and will be calculated at checkout.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Payment</h3>
                                <p className="text-[#666] text-body leading-relaxed">
                                    Payment must be made in full at the time of order placement. We accept major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our trusted payment partners.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Shipping and Delivery</h2>
                        <div className="space-y-4">
                            <p className="text-[#666] text-body leading-relaxed">
                                We currently ship within India only. Shipping times vary based on location and product availability. Standard shipping takes 3-7 business days, while express shipping options are available for faster delivery.
                            </p>
                            <p className="text-[#666] text-body leading-relaxed">
                                Risk of loss and title for products pass to you upon delivery to the shipping carrier. We are not responsible for delays caused by shipping carriers or circumstances beyond our control.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Returns and Refunds</h2>
                        <div className="space-y-4">
                            <p className="text-[#666] text-body leading-relaxed">
                                We offer a 30-day return policy for unused items in original packaging. Items must be returned in the same condition as received. Custom or personalized items cannot be returned unless defective.
                            </p>
                            <p className="text-[#666] text-body leading-relaxed">
                                Refunds will be processed within 5-7 business days after we receive and inspect the returned item. Shipping costs are non-refundable unless the return is due to our error.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Intellectual Property</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            All content on this website, including text, graphics, logos, images, and software, is the property of House Of Homegrown and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">User Conduct</h2>
                        <p className="text-[#666] text-body leading-relaxed mb-4">You agree not to:</p>
                        <ul className="list-disc list-inside text-[#666] text-body space-y-2 ml-4">
                            <li>Use the website for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Interfere with the proper functioning of the website</li>
                            <li>Upload or transmit harmful or malicious content</li>
                            <li>Violate any applicable laws or regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Limitation of Liability</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            House Of Homegrown shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid by you for the specific product or service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Governing Law</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Changes to Terms</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Contact Information</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            If you have any questions about these terms and conditions, please contact us:
                        </p>
                        <div className="mt-4 p-4 bg-[#F5F1E8] rounded-lg">
                            <p className="text-[#666] text-body">
                                Email: legal@houseofhomegrown.com<br />
                                Phone: +91 98765 43210<br />
                                Address: 123 Craft Street, Mumbai, Maharashtra 400001, India
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}