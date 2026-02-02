const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

class ApiService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        }

        try {
            const response = await fetch(url, config)
            
            if (!response.ok) {
                const error = new Error(`HTTP error! status: ${response.status}`)
                error.status = response.status
                error.code = response.status === 404 ? 'SERVER_NOT_FOUND' : 'HTTP_ERROR'
                throw error
            }

            const data = await response.json()
            return data.success ? data.data : data
        } catch (error) {
            console.error('API request failed:', error)
            
            // Handle different types of errors
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                const networkError = new Error('Unable to connect to server. Please check your connection.')
                networkError.code = 'NETWORK_ERROR'
                throw networkError
            }
            
            if (error.status === 404) {
                const serverError = new Error('Server is currently unavailable. Please try again in a few moments.')
                serverError.code = 'SERVER_NOT_FOUND'
                serverError.status = 404
                throw serverError
            }
            
            throw error
        }
    }

    // GET request
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString()
        const url = queryString ? `${endpoint}?${queryString}` : endpoint
        return this.request(url)
    }

    // POST request
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    // PUT request
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    // DELETE request
    async delete(endpoint) {
        return this.request(endpoint, {
            method: 'DELETE',
        })
    }
}

export default new ApiService()