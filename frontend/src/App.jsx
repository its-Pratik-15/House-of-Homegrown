import { useState } from 'react'
import Header from './components/Header'
import MobileMenu from './components/MobileMenu'
import HeroSection from './components/HeroSection'
import IntroSection from './components/IntroSection'
import CategorySection from './components/CategorySection'
import Footer from './components/Footer'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuClick = () => {
    setIsMobileMenuOpen(true)
  }

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Now absolute positioned over hero */}
      <Header onMenuClick={handleMenuClick} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMenuClose} />

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

export default App