const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

// GET /api/products - Get all products with filters 
router.get('/', productController.getAllProducts);

// GET /api/products/id/:id - Get product by ID (numeric)
router.get('/id/:id', productController.getProductById);

// GET /api/products/:slug - Get product by slug(code name of an item)
router.get('/:slug', productController.getProductBySlug);

module.exports = router;