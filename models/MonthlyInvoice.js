const mongoose = require('mongoose');

const monthlyInvoiceSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  dailyInvoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DailyInvoice'
    }
  ]
}, {
  timestamps: true
});

const MonthlyInvoice = mongoose.model('MonthlyInvoice', monthlyInvoiceSchema);

module.exports = MonthlyInvoice;
