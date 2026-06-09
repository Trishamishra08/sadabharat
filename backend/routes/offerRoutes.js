const express = require('express');
const router = express.Router();
const {
  getOffers,
  createOffer,
  updateOffer,
  deleteOffer
} = require('../controllers/offerController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getOffers)
  .post(protect, authorize('admin'), createOffer);

router.route('/:id')
  .put(protect, authorize('admin'), updateOffer)
  .delete(protect, authorize('admin'), deleteOffer);

module.exports = router;
