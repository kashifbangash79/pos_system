const mongoose = require('mongoose');

const daybookSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  transactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SoldProduct'
    }
  ]
}, {
  timestamps: true
});

const Daybook = mongoose.model('Daybook', daybookSchema);

module.exports = Daybook;
