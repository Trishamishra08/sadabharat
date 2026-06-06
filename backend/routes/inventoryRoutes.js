const express = require('express');
const router = express.Router();
const { updateStock } = require('../controllers/inventoryController');
const { protect } = require('../middlewares/authMiddleware');

// Route is protected because only vendors and admins should update stock
router.put('/:productId', protect, updateStock);

module.exports = router;
