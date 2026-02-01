const cartService = require('../services/cartService');

class CartController {
  async getUserCart(req, res) {
    try {
      let identifier;
      let isGuest = false;

      if (req.isGuest) {
        identifier = req.guestId;
        isGuest = true;
      } else {
        identifier = req.userId || 1; // Fallback for testing
      }
      
      const cart = await cartService.getUserCart(identifier, isGuest);
      
      res.json({
        success: true,
        data: cart,
        isGuest: req.isGuest || false,
        ...(req.guestToken && { guestToken: req.guestToken })
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
      let identifier;
      let isGuest = false;

      if (req.isGuest) {
        identifier = req.guestId;
        isGuest = true;
      } else {
        identifier = req.userId || req.headers['user-id'] || 1; // Fallback for testing
      }

      const { productId, quantity } = req.body;
      
      if (!productId || !quantity) {
        return res.status(400).json({
          success: false,
          error: 'Product ID and quantity are required'
        });
      }
      
      const item = await cartService.addItemToCart(
        identifier,
        parseInt(productId),
        parseInt(quantity),
        isGuest
      );
      
      res.status(201).json({
        success: true,
        data: item,
        isGuest: req.isGuest || false,
        ...(req.guestToken && { guestToken: req.guestToken })
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

      let identifier;
      let isGuest = false;

      if (req.isGuest) {
        identifier = req.guestId;
        isGuest = true;
      } else {
        identifier = req.userId || 1;
      }
      
      const item = await cartService.updateCartItem(
        parseInt(itemId),
        parseInt(quantity),
        identifier,
        isGuest
      );
      
      res.json({
        success: true,
        data: item,
        isGuest: req.isGuest || false,
        ...(req.guestToken && { guestToken: req.guestToken })
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

      let identifier;
      let isGuest = false;

      if (req.isGuest) {
        identifier = req.guestId;
        isGuest = true;
      } else {
        identifier = req.userId || 1;
      }
      
      await cartService.removeCartItem(parseInt(itemId), identifier, isGuest);
      
      res.json({
        success: true,
        message: 'Item removed from cart',
        isGuest: req.isGuest || false,
        ...(req.guestToken && { guestToken: req.guestToken })
      });
    } catch (error) {
      console.error('Error in removeCartItem:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to remove cart item'
      });
    }
  }

  async clearCart(req, res) {
    try {
      let identifier;
      let isGuest = false;

      if (req.isGuest) {
        identifier = req.guestId;
        isGuest = true;
      } else {
        identifier = req.userId || 1;
      }
      
      await cartService.clearCart(identifier, isGuest);
      
      res.json({
        success: true,
        message: 'Cart cleared successfully',
        isGuest: req.isGuest || false,
        ...(req.guestToken && { guestToken: req.guestToken })
      });
    } catch (error) {
      console.error('Error in clearCart:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to clear cart'
      });
    }
  }
}

module.exports = new CartController();