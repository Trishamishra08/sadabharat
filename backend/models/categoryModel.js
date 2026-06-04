const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a category title'],
    trim: true,
    unique: true
  },
  url: {
    type: String,
    required: [true, 'Please add an image URL for the category']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
