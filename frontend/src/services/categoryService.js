import ApiService from './api'

export const categoryService = {
    // Get all categories
    async getCategories() {
        return ApiService.get('/categories')
    },

    // Get single category by ID
    async getCategory(id) {
        return ApiService.get(`/categories/${id}`)
    },
}

export default categoryService