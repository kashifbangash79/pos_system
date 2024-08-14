// routes/yearlyInvoiceRoutes.js
const express = require('express');
const router = express.Router();
const YearlyInvoice = require('../models/YearlyInvoice');

// Create a new yearly invoice
router.post('/', async (req, res) => {
  try {
    const yearlyInvoice = new YearlyInvoice(req.body);
    await yearlyInvoice.save();
    res.status(201).send(yearlyInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all yearly invoices
router.get('/', async (req, res) => {
  try {
    const yearlyInvoices = await YearlyInvoice.find().populate('soldProducts');
    res.status(200).send(yearlyInvoices);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single yearly invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const yearlyInvoice = await YearlyInvoice.findById(req.params.id).populate('soldProducts');
    if (!yearlyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(yearlyInvoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a yearly invoice by ID
router.patch('/:id', async (req, res) => {
  try {
    const yearlyInvoice = await YearlyInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!yearlyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(yearlyInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a yearly invoice by ID
router.delete('/:id', async (req, res) => {
  try {
    const yearlyInvoice = await YearlyInvoice.findByIdAndDelete(req.params.id);
    if (!yearlyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(yearlyInvoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
