import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import HeroSection from './pages/home/HeroSection'
import IntroSection from './pages/home/IntroSection'
import CategorySection from './pages/home/CategorySection'
import Footer from './components/layout/Footer'
import ProductShowcase from './pages/products/ProductShowcase'

// Home Page Component
function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main>
        {/* Hero Section - Now extends full width behind header */}
        <HeroSection />

        {/* Intro/About Preview */}
        <IntroSection />

        {/* Category Sections */}
        <CategorySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      {/* Global Navbar - appears on all pages */}
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductShowcase />} />
      </Routes>
    </Router>
  )
}

export default App