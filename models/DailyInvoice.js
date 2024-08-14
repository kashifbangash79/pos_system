const mongoose = require('mongoose');

const dailyInvoiceSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  totalAmount: {
    type: Number,
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const DailyInvoice = mongoose.model('DailyInvoice', dailyInvoiceSchema);

module.exports = DailyInvoice;
