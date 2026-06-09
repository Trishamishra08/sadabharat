const Coupon = require('../models/couponModel');

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Public/Admin/Vendor
const getCoupons = async (req, res) => {
    try {
        const query = {};
        if (req.query.active === 'true') {
            query.isActive = true;
        }

        const coupons = await Coupon.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            status: 'success',
            data: {
                coupons
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
};

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Admin
const createCoupon = async (req, res) => {
    try {
        const { code, discountType, discountValue, usageLimit, expiryDate } = req.body;

        // Check if coupon exists
        const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
        if (couponExists) {
            return res.status(400).json({ status: 'fail', message: 'Coupon code already exists' });
        }

        const coupon = await Coupon.create({
            code,
            discountType,
            discountValue,
            usageLimit: usageLimit || null,
            expiryDate
        });

        res.status(201).json({
            status: 'success',
            data: {
                coupon
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// @desc    Update a coupon
// @route   PATCH /api/coupons/:id
// @access  Admin
const updateCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!coupon) {
            return res.status(404).json({ status: 'fail', message: 'Coupon not found' });
        }

        res.status(200).json({
            status: 'success',
            data: {
                coupon
            }
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Admin
const deleteCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);

        if (!coupon) {
            return res.status(404).json({ status: 'fail', message: 'Coupon not found' });
        }

        res.status(200).json({ status: 'success', message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
};

module.exports = {
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon
};
