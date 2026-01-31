const productService = require('../services/productService');

class ProductController {
  async getAllProducts(req, res) {
    try {
      const { category, type, limit } = req.query;
      const filters = { category, type, limit };
      
      const products = await productService.getAllProducts(filters);
      
      res.json({
        success: true,
        data: products,
        count: products.length
      });
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
}

module.exports = new ProductController();