const categoryService = require('../services/categoryService');

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await categoryService.getAllCategories();
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      console.error('Error in getAllCategories:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch categories'
      });
    }
  }
}

module.exports = new CategoryController();