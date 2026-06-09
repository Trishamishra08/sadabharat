const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getAdminBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getBlogs)
  .post(protect, authorize('admin'), createBlog);

router.route('/admin')
  .get(protect, authorize('admin'), getAdminBlogs);

router.route('/:id')
  .get(getBlogById)
  .patch(protect, authorize('admin'), updateBlog)
  .delete(protect, authorize('admin'), deleteBlog);

module.exports = router;
