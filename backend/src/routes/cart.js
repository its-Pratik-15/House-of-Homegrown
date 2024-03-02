const express = require('express');
const cartController = require('../controllers/cartController');

const router = express.Router();

// GET /api/cart - Get user cart
router.get('/', cartController.getUserCart);

// POST /api/cart/items - Add product to cart
router.post('/items', cartController.addItemToCart);

// PUT /api/cart/items/:itemId - Update cart item quantity
router.put('/items/:itemId', cartController.updateCartItem);

// DELETE /api/cart/items/:itemId - Remove item from cart
router.delete('/items/:itemId', cartController.removeCartItem);

module.exports = router;