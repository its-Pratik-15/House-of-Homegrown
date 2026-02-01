import { useState, useEffect } from 'react'
import { productService } from '../services/productService'

export const useProducts = (initialParams = {}) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalPages, setTotalPages] = useState(1)
    const [params, setParams] = useState(initialParams)

    const fetchProducts = async (searchParams = params) => {
        setLoading(true)
        setError(null)
        
        try {
            const data = await productService.getProducts(searchParams)
            setProducts(data.products || data)
            setTotalPages(data.totalPages || 1)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching products:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [params])

    const updateParams = (newParams) => {
        setParams(prev => ({ ...prev, ...newParams }))
    }

    const refetch = () => {
        fetchProducts()
    }

    return {
        products,
        loading,
        error,
        totalPages,
        params,
        updateParams,
        refetch,
    }
}

export default useProducts