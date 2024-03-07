const productService = require('../services/productService');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const { category, categoryId, type, limit, search, sortBy, page } = req.query;
      const filters = { category, categoryId, type, limit, search, sortBy, page };
      
      const result = await productService.getAllProducts(filters);
      
      // Handle both old format (array) and new format (object with products)
      if (Array.isArray(result)) {
        res.json({
          success: true,
          data: result,
          count: result.length
        });
      } else {
        res.json({
          success: true,
          data: result,
          count: result.totalCount
        });
      }
    } catch (error) {
      console.error('Error in getAllProducts:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch products'
      });
    }
  }
  
  async getProductBySlug(req, res) {
    try {
      const { slug } = req.params;
      const product = await productService.getProductBySlug(slug);
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Error in getProductBySlug:', error);
      if (error.message === 'Product not found') {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }
      res.status(500).json({
        success: false,
        error: 'Failed to fetch product'
      });
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      res.json({
        success: true,
        data: product
      });
    } catch (error) {
      console.error('Error in getProductById:', error);
      if (error.message === 'Product not found') {
        return res.status(404).json({
          success: false,
          error: 'Product not found'
        });
      }
      res.status(500).json({
        success: false,
        error: 'Failed to fetch product'
      });
    }
  }
}

module.exports = new ProductController();