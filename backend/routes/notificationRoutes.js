const express = require('express');
const router = express.Router();
const {
  getMyNotifications,
  markAsRead,
  markAllRead
} = require('../controllers/notificationController');
const { protect } = require('../middlewares/authMiddleware');

// Vendor / User routes (authenticated)
router.get('/me', protect, getMyNotifications);
router.patch('/mark-all-read', protect, markAllRead);
router.patch('/:id/read', protect, markAsRead);

module.exports = router;
