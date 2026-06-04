const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows null/undefined to be ignored for uniqueness
    lowercase: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    // Not required globally because 'user' role logs in with OTP
  },
  address: {
    type: String
  },
  profile: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'vendor', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  vendorDetails: {
    // Storing Vendor specific details here
    businessName: String,
    gstNumber: String,
    businessType: String,
    businessAddress: String,
    city: String,
    state: String,
    accountHolderName: String,
    bankName: String,
    accountNumber: String,
    ifscCode: String,
    upiId: String,
    storeName: String,
    storeDescription: String,
    categories: [String],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
