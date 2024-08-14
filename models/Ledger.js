const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  transactions: [
    {
      description: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }
  ]
}, {
  timestamps: true
});

const Ledger = mongoose.model('Ledger', ledgerSchema);

module.exports = Ledger;
