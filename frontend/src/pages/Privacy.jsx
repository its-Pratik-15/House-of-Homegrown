export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-24 xl:pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] mb-4">
                        Privacy Policy
                    </h1>
                    <p className="text-lg text-[#A0956B] text-body max-w-2xl mx-auto">
                        Last updated: February 2, 2026
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#E8E2D4] space-y-8">
                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Introduction</h2>
                        <p className="text-[#666] text-body leading-relaxed mb-4">
                            House Of Homegrown ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
                        </p>
                        <p className="text-[#666] text-body leading-relaxed">
                            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Information We Collect</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Personal Information</h3>
                                <p className="text-[#666] text-body leading-relaxed">
                                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This may include your name, email address, phone number, shipping address, and payment information.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg text-section-title text-[#8B5E3C] mb-2">Usage Information</h3>
                                <p className="text-[#666] text-body leading-relaxed">
                                    We automatically collect certain information about your device and how you interact with our website, including your IP address, browser type, pages visited, and time spent on our site.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">How We Use Your Information</h2>
                        <p className="text-[#666] text-body leading-relaxed mb-4">We use the information we collect to:</p>
                        <ul className="list-disc list-inside text-[#666] text-body space-y-2 ml-4">
                            <li>Process and fulfill your orders</li>
                            <li>Communicate with you about your orders and account</li>
                            <li>Provide customer support</li>
                            <li>Send you marketing communications (with your consent)</li>
                            <li>Improve our website and services</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Information Sharing</h2>
                        <p className="text-[#666] text-body leading-relaxed mb-4">
                            We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                        </p>
                        <ul className="list-disc list-inside text-[#666] text-body space-y-2 ml-4">
                            <li>With service providers who assist us in operating our website and conducting business</li>
                            <li>When required by law or to protect our rights</li>
                            <li>In connection with a business transfer or merger</li>
                            <li>With your explicit consent</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Data Security</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Your Rights</h2>
                        <p className="text-[#666] text-body leading-relaxed mb-4">You have the right to:</p>
                        <ul className="list-disc list-inside text-[#666] text-body space-y-2 ml-4">
                            <li>Access and update your personal information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Request a copy of your personal information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Cookies</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Changes to This Policy</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">Contact Us</h2>
                        <p className="text-[#666] text-body leading-relaxed">
                            If you have any questions about this privacy policy, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-[#F5F1E8] rounded-lg">
                            <p className="text-[#666] text-body">
                                Email: privacy@houseofhomegrown.com<br />
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