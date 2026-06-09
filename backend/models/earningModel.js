const mongoose = require('mongoose');

const earningSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  orderItem: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  commissionRate: {
    type: Number,
    default: 15
  },
  commissionAmount: {
    type: Number,
    required: true
  },
  netEarning: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Cleared', 'Refunded'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Earning', earningSchema);
