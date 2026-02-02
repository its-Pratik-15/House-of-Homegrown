import { useState, useEffect } from 'react'

export const useServerStatus = () => {
    const [isServerDown, setIsServerDown] = useState(false)
    const [isRetrying, setIsRetrying] = useState(false)
    const [retryCount, setRetryCount] = useState(0)

    const checkServerHealth = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3001'}/health`, {
                method: 'GET',
                timeout: 5000
            })
            
            if (response.ok) {
                setIsServerDown(false)
                setRetryCount(0)
                return true
            } else {
                setIsServerDown(true)
                return false
            }
        } catch (error) {
            console.error('Server health check failed:', error)
            setIsServerDown(true)
            return false
        }
    }

    const retryConnection = async () => {
        setIsRetrying(true)
        setRetryCount(prev => prev + 1)
        
        const isHealthy = await checkServerHealth()
        
        if (!isHealthy && retryCount < 3) {
            // Exponential backoff: 2s, 4s, 8s
            const delay = Math.pow(2, retryCount) * 2000
            setTimeout(() => {
                retryConnection()
            }, delay)
        } else {
            setIsRetrying(false)
        }
    }

    useEffect(() => {
        // Initial health check
        checkServerHealth()
        
        // Set up periodic health checks every 30 seconds
        const interval = setInterval(checkServerHealth, 30000)
        
        return () => clearInterval(interval)
    }, [])

    return {
        isServerDown,
        isRetrying,
        retryCount,
        retryConnection,
        checkServerHealth
    }
}