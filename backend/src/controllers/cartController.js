const cartService = require('../services/cartService');

class CartController {
  async getUserCart(req, res) {
    try {
      const userId = 1; 
      
      const cart = await cartService.getUserCart(parseInt(userId));
      
      res.json({
        success: true,
        data: cart
      });
    } catch (error) {
      console.error('Error in getUserCart:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch cart'
      });
    }
  }
  
  async addItemToCart(req, res) {
    try {
      const userId = req.headers['user-id'] || 1;
      const { productId, quantity } = req.body;
      
      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          error: 'Product ID and quantity are required'
        });
      }
      
      const item = await cartService.addItemToCart(
        parseInt(userId),
        parseInt(productId),
        parseInt(quantity)
      );
      
      res.status(201).json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error('Error in addItemToCart:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to add item to cart'
      });
    }
  }
  
  async updateCartItem(req, res) {
    try {
      const { itemId } = req.params;
      const { quantity } = req.body;
      
      if (!quantity) {
        return res.status(400).json({
          success: false,
          error: 'Quantity is required'
        });
      }
      
      const item = await cartService.updateCartItem(
        parseInt(itemId),
        parseInt(quantity)
      );
      
      res.json({
        success: true,
        data: item
      });
    } catch (error) {
      console.error('Error in updateCartItem:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to update cart item'
      });
    }
  }
  
  async removeCartItem(req, res) {
    try {
      const { itemId } = req.params;
      
      await cartService.removeCartItem(parseInt(itemId));
      
      res.json({
        success: true,
        message: 'Item removed from cart'
      });
    } catch (error) {
      console.error('Error in removeCartItem:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to remove cart item'
      });
    }
  }
}

module.exports = new CartController();