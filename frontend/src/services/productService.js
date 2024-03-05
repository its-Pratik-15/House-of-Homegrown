import ApiService from './api'

export const productService = {
    // Get all products with optional filters
    async getProducts(params = {}) {
        return ApiService.get('/products', params)
    },

    // Get single product by ID
    async getProduct(id) {
        return ApiService.get(`/products/${id}`)
    },

    // Search products
    async searchProducts(query, params = {}) {
        return ApiService.get('/products', { search: query, ...params })
    },

    // Get products by category
    async getProductsByCategory(category, params = {}) {
        return ApiService.get('/products', { category, ...params })
    },
}

export default productService