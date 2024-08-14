// routes/monthlyInvoiceRoutes.js
const express = require('express');
const router = express.Router();
const MonthlyInvoice = require('../models/MonthlyInvoice');

// Create a new monthly invoice
router.post('/', async (req, res) => {
  try {
    const monthlyInvoice = new MonthlyInvoice(req.body);
    await monthlyInvoice.save();
    res.status(201).send(monthlyInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all monthly invoices
router.get('/', async (req, res) => {
  try {
    const monthlyInvoices = await MonthlyInvoice.find().populate('soldProducts');
    res.status(200).send(monthlyInvoices);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single monthly invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const monthlyInvoice = await MonthlyInvoice.findById(req.params.id).populate('soldProducts');
    if (!monthlyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(monthlyInvoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a monthly invoice by ID
router.patch('/:id', async (req, res) => {
  try {
    const monthlyInvoice = await MonthlyInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!monthlyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(monthlyInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a monthly invoice by ID
router.delete('/:id', async (req, res) => {
  try {
    const monthlyInvoice = await MonthlyInvoice.findByIdAndDelete(req.params.id);
    if (!monthlyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(monthlyInvoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
