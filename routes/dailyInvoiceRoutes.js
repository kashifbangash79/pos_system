// routes/dailyInvoiceRoutes.js
const express = require('express');
const router = express.Router();
const DailyInvoice = require('../models/DailyInvoice');

// Create a new daily invoice
router.post('/', async (req, res) => {
  try {
    const dailyInvoice = new DailyInvoice(req.body);
    await dailyInvoice.save();
    res.status(201).send(dailyInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all daily invoices
router.get('/', async (req, res) => {
  try {
    const dailyInvoices = await DailyInvoice.find().populate('soldProducts');
    res.status(200).send(dailyInvoices);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single daily invoice by ID
router.get('/:id', async (req, res) => {
  try {
    const dailyInvoice = await DailyInvoice.findById(req.params.id).populate('soldProducts');
    if (!dailyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(dailyInvoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a daily invoice by ID
router.patch('/:id', async (req, res) => {
  try {
    const dailyInvoice = await DailyInvoice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dailyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(dailyInvoice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a daily invoice by ID
router.delete('/:id', async (req, res) => {
  try {
    const dailyInvoice = await DailyInvoice.findByIdAndDelete(req.params.id);
    if (!dailyInvoice) {
      return res.status(404).send();
    }
    res.status(200).send(dailyInvoice);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
