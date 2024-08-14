const mongoose = require('mongoose');

const yearlyInvoiceSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  monthlyInvoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MonthlyInvoice'
    }
  ]
}, {
  timestamps: true
});

const YearlyInvoice = mongoose.model('YearlyInvoice', yearlyInvoiceSchema);

module.exports = YearlyInvoice;
