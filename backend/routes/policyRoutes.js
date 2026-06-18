const express = require('express');
const router = express.Router();
const { getPolicy, getAllPolicies, updatePolicy } = require('../controllers/policyController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getAllPolicies);

router.route('/:type')
  .get(getPolicy)
  .put(protect, authorize('admin'), updatePolicy);

module.exports = router;
