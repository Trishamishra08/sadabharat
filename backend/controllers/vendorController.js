const Vendor = require('../models/vendorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id, role: 'vendor' }, process.env.JWT_ACCESS_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @desc    Register a new vendor
// @route   POST /api/vendors/register
// @access  Public
const registerVendor = async (req, res, next) => {
  try {
    const { email, mobile, password } = req.body;

    const vendorExists = await Vendor.findOne({ $or: [{ email }, { mobile }] });

    if (vendorExists) {
      res.status(400);
      throw new Error('Vendor with this email or mobile already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const vendorReq = await Vendor.create({
      ...req.body,
      password: hashedPassword,
      isApproved: false
    });

    if (vendorReq) {
      res.status(201).json({
        success: true,
        message: 'Registration successful! Your application is pending admin approval.'
      });
    } else {
      res.status(400);
      throw new Error('Invalid vendor data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Login vendor
// @route   POST /api/vendors/login
// @access  Public
const loginVendor = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });

    if (!vendor) {
      res.status(401);
      throw new Error('Invalid email or password');
    }

    if (vendor.isBlocked) {
      res.status(403);
      throw new Error('Your account has been blocked by the admin.');
    }

    if (!vendor.isApproved) {
      res.status(403);
      throw new Error('Your account is not approved or is pending admin approval.');
    }

    if (await bcrypt.compare(password, vendor.password)) {
      res.status(200).json({
        success: true,
        data: {
          _id: vendor.id,
          name: vendor.fullName,
          email: vendor.email,
          role: vendor.role,
          storeName: vendor.storeName,
          token: generateToken(vendor._id)
        }
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get all pending vendors requests
// @route   GET /api/vendors/pending
// @access  Private/Admin
const getPendingVendors = async (req, res, next) => {
  try {
    const requests = await Vendor.find({ isApproved: false, isBlocked: { $ne: true } }).select('-password');
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all approved vendors
// @route   GET /api/vendors/approved
// @access  Private/Admin
const getApprovedVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find({ isApproved: true, isBlocked: { $ne: true } }).select('-password').lean();
    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all blocked vendors
// @route   GET /api/vendors/blocked
// @access  Private/Admin
const getBlockedVendors = async (req, res, next) => {
  try {
    const vendors = await Vendor.find({ isBlocked: true }).select('-password').lean();
    res.status(200).json({ success: true, data: vendors });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve a vendor request
// @route   PUT /api/vendors/:id/approve
// @access  Private/Admin
const approveVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(404);
      throw new Error('Vendor not found');
    }

    vendor.isApproved = true;
    await vendor.save();

    res.status(200).json({
      success: true,
      message: 'Vendor approved successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Block a vendor
// @route   PUT /api/vendors/:id/block
// @access  Private/Admin
const blockVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(404);
      throw new Error('Vendor not found');
    }

    vendor.isBlocked = true;
    await vendor.save();

    res.status(200).json({
      success: true,
      message: 'Vendor blocked successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unblock a vendor
// @route   PUT /api/vendors/:id/unblock
// @access  Private/Admin
const unblockVendor = async (req, res, next) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      res.status(404);
      throw new Error('Vendor not found');
    }

    vendor.isBlocked = false;
    await vendor.save();

    res.status(200).json({
      success: true,
      message: 'Vendor unblocked successfully'
    });
  } catch (error) {
    next(error);
  }
};

const Earning = require('../models/earningModel');

// @desc    Get vendor earnings stats
// @route   GET /api/vendors/earnings
// @access  Private/Vendor
const getVendorEarnings = async (req, res, next) => {
  try {
    const vendorId = req.user._id;

    const earnings = await Earning.find({ vendor: vendorId }).populate('order');

    let totalNet = 0;
    let totalCommission = 0;
    let todayEarning = 0;
    let weeklyEarning = 0;
    let monthlyEarning = 0;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const chartDataMap = {};

    let pendingBalance = 0;
    let clearedBalance = 0;

    earnings.forEach(e => {
      if (e.status !== 'Refunded') {
        totalNet += e.netEarning;
        totalCommission += e.commissionAmount;

        if (e.status === 'Pending') {
          pendingBalance += e.netEarning;
        } else if (e.status === 'Cleared') {
          clearedBalance += e.netEarning;
        }

        const eDate = new Date(e.createdAt);
        if (eDate >= today) todayEarning += e.netEarning;
        if (eDate >= weekAgo) weeklyEarning += e.netEarning;
        if (eDate >= monthAgo) monthlyEarning += e.netEarning;

        // Chart Data (last 7 days grouped)
        if (eDate >= weekAgo) {
          const dateStr = eDate.toISOString().split('T')[0];
          chartDataMap[dateStr] = (chartDataMap[dateStr] || 0) + e.netEarning;
        }
      }
    });

    const chartData = Object.keys(chartDataMap).sort().map(date => ({
      date,
      value: chartDataMap[date]
    }));

    // Fetch recent transactions for the details table
    const recentTransactions = earnings
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10)
      .map(e => ({
        _id: e._id,
        orderId: e.order?._id ? e.order._id.toString().substring(0, 8).toUpperCase() : 'UNKNOWN',
        productName: e.productName,
        totalAmount: e.totalAmount,
        commissionRate: e.commissionRate,
        commissionAmount: e.commissionAmount,
        netEarning: e.netEarning,
        status: e.status,
        date: new Date(e.createdAt).toLocaleDateString()
      }));

    res.status(200).json({
      success: true,
      data: {
        totalNet,
        totalCommission,
        todayEarning,
        weeklyEarning,
        monthlyEarning,
        pendingBalance,
        clearedBalance,
        chartData,
        recentTransactions
      }
    });
  } catch (error) {
    next(error);
  }
};

const Review = require('../models/reviewModel');

const getVendorReviews = async (req, res, next) => {
  try {
    const Product = require('../models/productModel');
    // Find all products uploaded by this vendor
    const vendorProducts = await Product.find({ vendor: req.user._id }).select('_id');
    const productIds = vendorProducts.map(p => p._id);

    // Find reviews for those products
    const reviews = await Review.find({ product: { $in: productIds } })
      .populate('product', 'name image images')
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { reviews }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerVendor,
  loginVendor,
  getPendingVendors,
  getApprovedVendors,
  getBlockedVendors,
  approveVendor,
  blockVendor,
  unblockVendor,
  getVendorEarnings,
  getVendorReviews
};
