const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  createProduct,
  getVendorProducts,
  getAdminProducts,
  updateProductStatus,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Public route for approved products
router.get('/', getProducts);

// Protected routes (Admin or Vendor)
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

// Vendor specific
router.get('/vendor', protect, authorize('vendor'), getVendorProducts);

// Admin specific
router.get('/admin', protect, authorize('admin'), getAdminProducts);
router.put('/:id/status', protect, authorize('admin'), updateProductStatus);

module.exports = router;
