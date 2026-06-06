const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true,
    unique: true
  },
  vendor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vendor'
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  stock: { 
    type: Number, 
    required: true,
    default: 0 
  },
  warehouse: { 
    type: String, 
    default: 'Primary Vault' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
