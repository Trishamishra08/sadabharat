const express = require('express');
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/')
  .post(createCategory) // Creates category
  .get(getCategories);  // Lists all categories

router.route('/:id')
  .get(getCategoryById) // Get single category
  .put(updateCategory)  // Edit category
  .delete(deleteCategory); // Delete category

module.exports = router;
