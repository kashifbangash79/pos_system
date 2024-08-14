// routes/soldProductRoutes.js
const express = require('express');
const router = express.Router();
const SoldProduct = require('../models/SoldProduct');

// Create a new sold product
router.post('/', async (req, res) => {
  try {
    const soldProduct = new SoldProduct(req.body);
    await soldProduct.save();
    res.status(201).send(soldProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all sold products
router.get('/', async (req, res) => {
  try {
    const soldProducts = await SoldProduct.find().populate('product').populate('customer');
    res.status(200).send(soldProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single sold product by ID
router.get('/:id', async (req, res) => {
  try {
    const soldProduct = await SoldProduct.findById(req.params.id).populate('product').populate('customer');
    if (!soldProduct) {
      return res.status(404).send();
    }
    res.status(200).send(soldProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a sold product by ID
router.patch('/:id', async (req, res) => {
  try {
    const soldProduct = await SoldProduct.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!soldProduct) {
      return res.status(404).send();
    }
    res.status(200).send(soldProduct);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a sold product by ID
router.delete('/:id', async (req, res) => {
  try {
    const soldProduct = await SoldProduct.findByIdAndDelete(req.params.id);
    if (!soldProduct) {
      return res.status(404).send();
    }
    res.status(200).send(soldProduct);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
