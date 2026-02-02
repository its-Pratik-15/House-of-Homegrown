import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Navbar from './components/layout/Navbar'
import HeroSection from './pages/home/HeroSection'
import IntroSection from './pages/home/IntroSection'
import CategorySection from './pages/home/CategorySection'
import Footer from './components/layout/Footer'
import ProductShowcase from './pages/products/ProductShowcase'
import ProductDetail from './pages/products/ProductDetail'
import Cart from './pages/Cart'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Shipping from './pages/Shipping'
import Returns from './pages/Returns'

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
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col">
          {/* Global Navbar - appears on all pages */}
          <Navbar />

          {/* Main content area */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductShowcase />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<FAQ />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/returns" element={<Returns />} />
            </Routes>
          </main>

          {/* Global Footer - appears on all pages */}
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App