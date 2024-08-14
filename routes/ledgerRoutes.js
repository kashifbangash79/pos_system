// routes/ledgerRoutes.js
const express = require('express');
const router = express.Router();
const Ledger = require('../models/Ledger');

// Create a new ledger entry
router.post('/', async (req, res) => {
  try {
    const ledger = new Ledger(req.body);
    await ledger.save();
    res.status(201).send(ledger);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Read all ledger entries
router.get('/', async (req, res) => {
  try {
    const ledgers = await Ledger.find();
    res.status(200).send(ledgers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Read a single ledger entry by ID
router.get('/:id', async (req, res) => {
  try {
    const ledger = await Ledger.findById(req.params.id);
    if (!ledger) {
      return res.status(404).send();
    }
    res.status(200).send(ledger);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a ledger entry by ID
router.patch('/:id', async (req, res) => {
  try {
    const ledger = await Ledger.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ledger) {
      return res.status(404).send();
    }
    res.status(200).send(ledger);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a ledger entry by ID
router.delete('/:id', async (req, res) => {
  try {
    const ledger = await Ledger.findByIdAndDelete(req.params.id);
    if (!ledger) {
      return res.status(404).send();
    }
    res.status(200).send(ledger);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
