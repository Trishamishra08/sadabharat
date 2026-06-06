const express = require('express');
const {
  registerVendor,
  loginVendor,
  getPendingVendors,
  getApprovedVendors,
  getBlockedVendors,
  approveVendor,
  blockVendor,
  unblockVendor
} = require('../controllers/vendorController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerVendor);
router.post('/login', loginVendor);

// Admin routes
router.get('/pending', protect, authorize('admin'), getPendingVendors);
router.get('/approved', protect, authorize('admin'), getApprovedVendors);
router.get('/blocked', protect, authorize('admin'), getBlockedVendors);
router.put('/:id/approve', protect, authorize('admin'), approveVendor);
router.put('/:id/block', protect, authorize('admin'), blockVendor);
router.put('/:id/unblock', protect, authorize('admin'), unblockVendor);

module.exports = router;
