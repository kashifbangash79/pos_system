const mongoose = require('mongoose');

const soldProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  soldDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const SoldProduct = mongoose.model('SoldProduct', soldProductSchema);

module.exports = SoldProduct;
