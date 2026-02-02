import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqData = [
    {
        category: "Orders & Shipping",
        questions: [
            {
                question: "How long does shipping take?",
                answer: "We typically ship within 2-3 business days. Delivery takes 3-7 business days depending on your location. Express shipping options are available at checkout."
            },
            {
                question: "Do you ship internationally?",
                answer: "Currently, we only ship within India. We're working on expanding our international shipping options and will update our customers when available."
            },
            {
                question: "How can I track my order?",
                answer: "Once your order ships, you'll receive a tracking number via email and SMS. You can use this to track your package on our shipping partner's website."
            }
        ]
    },
    {
        category: "Products & Quality",
        questions: [
            {
                question: "Are your products really handmade?",
                answer: "Yes! All our products are handcrafted by skilled artisans across India. Each piece is unique and may have slight variations that add to its authentic, handmade character."
            },
            {
                question: "What materials do you use?",
                answer: "We use only natural, sustainable materials like organic cotton, linen, natural dyes, and traditional ingredients. All materials are sourced ethically and sustainably."
            },
            {
                question: "How do I care for handmade products?",
                answer: "Each product comes with specific care instructions. Generally, we recommend gentle washing, air drying, and storing in cool, dry places to maintain quality and longevity."
            }
        ]
    },
    {
        category: "Returns & Exchanges",
        questions: [
            {
                question: "What is your return policy?",
                answer: "We offer a 30-day return policy for unused items in original packaging. Handmade items may have slight variations which are not considered defects."
            },
            {
                question: "How do I return an item?",
                answer: "Contact our support team at support@houseofhomegrown.com with your order number. We'll provide a return label and instructions for sending the item back."
            },
            {
                question: "When will I receive my refund?",
                answer: "Refunds are processed within 5-7 business days after we receive your returned item. The amount will be credited to your original payment method."
            }
        ]
    },
    {
        category: "Account & Payment",
        questions: [
            {
                question: "Do I need an account to place an order?",
                answer: "No, you can checkout as a guest. However, creating an account allows you to track orders, save addresses, and receive exclusive offers."
            },
            {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our payment partners."
            },
            {
                question: "Is my payment information secure?",
                answer: "Yes, we use industry-standard SSL encryption and work with trusted payment gateways to ensure your payment information is completely secure."
            }
        ]
    }
]

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="border border-[#E8E2D4] rounded-2xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-[#F5F1E8] transition-colors flex justify-between items-center"
            >
                <h3 className="text-section-title text-[#8B5E3C] pr-4">{question}</h3>
                {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-[#8B5E3C] flex-shrink-0" />
                ) : (
                    <ChevronDown className="h-5 w-5 text-[#8B5E3C] flex-shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="px-6 py-4 bg-[#F5F1E8] border-t border-[#E8E2D4]">
                    <p className="text-[#666] text-body leading-relaxed">{answer}</p>
                </div>
            )}
        </div>
    )
}

export default function FAQ() {
    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-24 xl:pt-20">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] mb-4">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-lg text-[#A0956B] text-body max-w-2xl mx-auto">
                        Find answers to common questions about our products, orders, and policies.
                    </p>
                </div>

                {/* FAQ Categories */}
                <div className="space-y-8">
                    {faqData.map((category, categoryIndex) => (
                        <div key={categoryIndex}>
                            <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-4">
                                {category.category}
                            </h2>
                            <div className="space-y-3">
                                {category.questions.map((faq, faqIndex) => (
                                    <FAQItem
                                        key={faqIndex}
                                        question={faq.question}
                                        answer={faq.answer}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Section */}
                <div className="mt-12 bg-white p-8 rounded-2xl border border-[#E8E2D4] text-center">
                    <h3 className="text-xl text-section-title text-[#8B5E3C] mb-4">
                        Still have questions?
                    </h3>
                    <p className="text-[#666] text-body mb-6">
                        Can't find the answer you're looking for? Our customer support team is here to help.
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