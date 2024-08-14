// routes/daybookRoutes.js
const express = require('express');
const router = express.Router();
const Daybook = require('../models/Daybook');

// Create a new daybook entry
router.post('/', async (req, res) => {
  try {
    const daybook = new Daybook(req.body);
    await daybook.save();
    res.status(201).send(daybook);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all daybook entries
router.get('/', async (req, res) => {
  try {
    const daybooks = await Daybook.find().populate('transactions');
    res.status(200).send(daybooks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single daybook entry by ID
router.get('/:id', async (req, res) => {
  try {
    const daybook = await Daybook.findById(req.params.id).populate('transactions');
    if (!daybook) {
      return res.status(404).send();
    }
    res.status(200).send(daybook);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a daybook entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const daybook = await Daybook.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!daybook) {
      return res.status(404).send();
    }
    res.status(200).send(daybook);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a daybook entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const daybook = await Daybook.findByIdAndDelete(req.params.id);
    if (!daybook) {
      return res.status(404).send();
    }
    res.status(200).send(daybook);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
