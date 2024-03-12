import { Component } from 'react'
import PremiumCTAButton from './ui/premium-cta-button'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
                    <div className="max-w-md mx-auto text-center px-4">
                        <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <span className="text-3xl">⚠️</span>
                        </div>
                        <h2 className="text-2xl text-page-heading text-[#8B5E3C] mb-4">
                            Something went wrong
                        </h2>
                        <p className="text-[#A0956B] mb-8 text-body leading-relaxed">
                            We're having trouble loading the application. Please try refreshing the page.
                        </p>
                        <div className="space-y-4">
                            <PremiumCTAButton
                                onClick={() => window.location.reload()}
                                variant="primary"
                            >
                                Refresh Page
                            </PremiumCTAButton>
                            <PremiumCTAButton
                                onClick={() => {
                                    this.setState({ hasError: false, error: null })
                                }}
                                variant="secondary"
                            >
                                Try Again
                            </PremiumCTAButton>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary