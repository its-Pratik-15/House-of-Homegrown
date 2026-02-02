import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // Handle form submission here
        console.log('Form submitted:', formData)
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' })
        alert('Thank you for your message! We\'ll get back to you soon.')
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8] pt-20">
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl text-page-heading text-[#8B5E3C] mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-[#A0956B] text-body max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                        <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-6">Send us a message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm text-section-title text-[#8B5E3C] mb-2">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#F5F1E8] border border-[#E8E2D4] rounded-lg focus:outline-none text-[#8B5E3C] text-body"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm text-section-title text-[#8B5E3C] mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#F5F1E8] border border-[#E8E2D4] rounded-lg focus:outline-none text-[#8B5E3C] text-body"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm text-section-title text-[#8B5E3C] mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#F5F1E8] border border-[#E8E2D4] rounded-lg focus:outline-none text-[#8B5E3C] text-body"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm text-section-title text-[#8B5E3C] mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 bg-[#F5F1E8] border border-[#E8E2D4] rounded-lg focus:outline-none text-[#8B5E3C] text-body resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#8B5E3C] hover:bg-[#6B4423] !text-white rounded-2xl py-3 text-button"
                                style={{ color: 'white' }}
                            >
                                Send Message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                            <h2 className="text-2xl text-section-title text-[#8B5E3C] mb-6">Get in touch</h2>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Mail className="h-6 w-6 text-[#8B5E3C] mt-1" />
                                    <div>
                                        <h3 className="text-section-title text-[#8B5E3C] mb-1">Email</h3>
                                        <p className="text-[#666] text-body">hello@houseofhomegrown.com</p>
                                        <p className="text-[#666] text-body">support@houseofhomegrown.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Phone className="h-6 w-6 text-[#8B5E3C] mt-1" />
                                    <div>
                                        <h3 className="text-section-title text-[#8B5E3C] mb-1">Phone</h3>
                                        <p className="text-[#666] text-body">+91 98765 43210</p>
                                        <p className="text-sm text-[#A0956B] text-body">Mon-Fri, 9 AM - 6 PM IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <MapPin className="h-6 w-6 text-[#8B5E3C] mt-1" />
                                    <div>
                                        <h3 className="text-section-title text-[#8B5E3C] mb-1">Address</h3>
                                        <p className="text-[#666] text-body">
                                            House Of Homegrown<br />
                                            123 Craft Street<br />
                                            Mumbai, Maharashtra 400001<br />
                                            India
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <Clock className="h-6 w-6 text-[#8B5E3C] mt-1" />
                                    <div>
                                        <h3 className="text-section-title text-[#8B5E3C] mb-1">Business Hours</h3>
                                        <p className="text-[#666] text-body">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-[#666] text-body">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-[#666] text-body">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl border border-[#E8E2D4]">
                            <h3 className="text-xl text-section-title text-[#8B5E3C] mb-4">Quick Help</h3>
                            <div className="space-y-3">
                                <p className="text-[#666] text-body">
                                    <span className="text-section-title text-[#8B5E3C]">Order Issues:</span> support@houseofhomegrown.com
                                </p>
                                <p className="text-[#666] text-body">
                                    <span className="text-section-title text-[#8B5E3C]">Wholesale Inquiries:</span> wholesale@houseofhomegrown.com
                                </p>
                                <p className="text-[#666] text-body">
                                    <span className="text-section-title text-[#8B5E3C]">Press & Media:</span> press@houseofhomegrown.com
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}