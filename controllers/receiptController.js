const Receipt = require('../models/Receipt');
const { validationResult } = require('express-validator');

// Create a new receipt
exports.createReceipt = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const receipt = new Receipt(req.body);
    await receipt.save();
    res.status(201).send(receipt);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all receipts
exports.getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find().populate('customer').populate('items.product');
    res.status(200).send(receipts);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single receipt by ID
exports.getReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id).populate('customer').populate('items.product');
    if (!receipt) {
      return res.status(404).send();
    }
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a receipt by ID
exports.updateReceipt = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const receipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate('customer').populate('items.product');
    if (!receipt) {
      return res.status(404).send();
    }
    res.status(200).send(receipt);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a receipt by ID
exports.deleteReceipt = async (req, res) => {
  try {
    const receipt = await Receipt.findByIdAndDelete(req.params.id);
    if (!receipt) {
      return res.status(404).send();
    }
    res.status(200).send(receipt);
  } catch (error) {
    res.status(500).send(error);
  }
};
