const express = require('express');
const router = express.Router();
const { createReceipt, getReceipts, getReceipt, updateReceipt, deleteReceipt } = require('../controllers/receiptController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create a new receipt
router.post('/', auth, admin, createReceipt);

// Get all receipts
router.get('/', auth, getReceipts);

// Get a single receipt by ID
router.get('/:id', auth, getReceipt);

// Update a receipt by ID
router.patch('/:id', auth, admin, updateReceipt);

// Delete a receipt by ID
router.delete('/:id', auth, admin, deleteReceipt);

module.exports = router;
