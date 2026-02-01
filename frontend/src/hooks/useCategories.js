import { useState, useEffect } from 'react'
import { categoryService } from '../services/categoryService'

export const useCategories = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryService.getCategories()
                setCategories(data)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching categories:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return { categories, loading, error }
}

export default useCategories