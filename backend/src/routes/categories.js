const express = require('express');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', categoryController.getAllCategories);

module.exports = router;