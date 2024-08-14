// routes/subCategoryRoutes.js
const express = require('express');
const router = express.Router();
const SubCategory = require('../models/SubCategory');

// Create a new sub-category
router.post('/', async (req, res) => {
  try {
    const subCategory = new SubCategory(req.body);
    await subCategory.save();
    res.status(201).send(subCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all sub-categories
router.get('/', async (req, res) => {
  try {
    const subCategories = await SubCategory.find();
    res.status(200).send(subCategories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single sub-category by ID
router.get('/:id', async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id);
    if (!subCategory) {
      return res.status(404).send();
    }
    res.status(200).send(subCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a sub-category by ID
router.patch('/:id', async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!subCategory) {
      return res.status(404).send();
    }
    res.status(200).send(subCategory);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a sub-category by ID
router.delete('/:id', async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      return res.status(404).send();
    }
    res.status(200).send(subCategory);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
