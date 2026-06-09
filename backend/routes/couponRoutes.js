const express = require('express');
const router = express.Router();
const {
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
} = require('../controllers/couponController');

// All routes are public for now based on other backend routes structure, 
// auth middleware can be added later if needed.
router.route('/')
    .get(getCoupons)
    .post(createCoupon);

router.route('/:id')
    .patch(updateCoupon)
    .delete(deleteCoupon);

module.exports = router;
