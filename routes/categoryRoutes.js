const express = require('express');
const router = express.Router();
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create a new category
router.post('/', auth, admin, createCategory);

// Get all categories
router.get('/', getCategories);

// Get a single category by ID
router.get('/:id', getCategory);

// Update a category by ID
router.patch('/:id', auth, admin, updateCategory);

// Delete a category by ID
router.delete('/:id', auth, admin, deleteCategory);

module.exports = router;
