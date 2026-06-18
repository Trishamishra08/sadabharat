const express = require('express');
const router = express.Router();
const { getInstagramPosts, createInstagramPost, deleteInstagramPost } = require('../controllers/instagramPostController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getInstagramPosts)
  .post(protect, authorize('admin'), createInstagramPost);

router.route('/:id')
  .delete(protect, authorize('admin'), deleteInstagramPost);

module.exports = router;
