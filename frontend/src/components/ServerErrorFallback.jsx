import { useEffect } from 'react'
import PremiumCTAButton from './ui/premium-cta-button'
import { useServerStatus } from '../hooks/useServerStatus'

export default function ServerErrorFallback({ error, resetError }) {
    const { isServerDown, isRetrying, retryCount, retryConnection } = useServerStatus()

    useEffect(() => {
        // Auto-retry if server comes back online
        if (!isServerDown && error) {
            resetError()
        }
    }, [isServerDown, error, resetError])

    const isNetworkError = error?.message?.includes('fetch') ||
        error?.message?.includes('NetworkError') ||
        error?.message?.includes('Failed to fetch') ||
        error?.code === 'NETWORK_ERROR'

    const is404Error = error?.message?.includes('404') ||
        error?.status === 404

    const getErrorMessage = () => {
        if (is404Error) {
            return "The server is currently unavailable. This might be because the service is starting up or temporarily down."
        }
        if (isNetworkError) {
            return "Unable to connect to our servers. Please check your internet connection."
        }
        return "We're experiencing technical difficulties. Our team has been notified."
    }

    const getErrorTitle = () => {
        if (is404Error) {
            return "Server Unavailable"
        }
        if (isNetworkError) {
            return "Connection Error"
        }
        return "Something went wrong"
    }

    return (
        <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
            <div className="max-w-md mx-auto text-center px-4">
                <div className="w-20 h-20 bg-[#8B5E3C]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl">
                        {is404Error ? '🔌' : isNetworkError ? '📡' : '⚠️'}
                    </span>
                </div>

                <h2 className="text-2xl text-page-heading text-[#8B5E3C] mb-4">
                    {getErrorTitle()}
                </h2>

                <p className="text-[#A0956B] mb-6 text-body leading-relaxed">
                    {getErrorMessage()}
                </p>

                {isRetrying && (
                    <div className="mb-6">
                        <div className="inline-flex items-center space-x-2 text-[#8B5E3C]">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#8B5E3C]"></div>
                            <span className="text-sm">
                                Retrying... (Attempt {retryCount}/3)
                            </span>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    <PremiumCTAButton
                        onClick={retryConnection}
                        variant="primary"
                        disabled={isRetrying}
                    >
                        {isRetrying ? 'Retrying...' : 'Try Again'}
                    </PremiumCTAButton>

                    <PremiumCTAButton
                        onClick={() => window.location.reload()}
                        variant="secondary"
                    >
                        Refresh Page
                    </PremiumCTAButton>
                </div>

                {retryCount > 0 && (
                    <div className="mt-6 p-4 bg-[#F5F1E8] rounded-2xl">
                        <p className="text-xs text-[#A0956B]">
                            If the problem persists, the server might be starting up.
                            Free tier services can take a few minutes to wake up.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}