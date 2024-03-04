const express = require('express');
const cartController = require('../controllers/cartController');
const { guestAuth } = require('../middlewares/guestAuth');

const router = express.Router();

// Apply guest authentication middleware to all cart routes
router.use(guestAuth);

// GET /api/cart - Get user cart
router.get('/', cartController.getUserCart);

// POST /api/cart/items - Add product to cart
router.post('/items', cartController.addItemToCart);

// PUT /api/cart/items/:itemId - Update cart item quantity
router.put('/items/:itemId', cartController.updateCartItem);

// DELETE /api/cart/items/:itemId - Remove item from cart
router.delete('/items/:itemId', cartController.removeCartItem);

// DELETE /api/cart - Clear entire cart
router.delete('/', cartController.clearCart);

module.exports = router;