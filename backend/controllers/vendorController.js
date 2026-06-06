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

module.exports = {
  registerVendor,
  loginVendor,
  getPendingVendors,
  getApprovedVendors,
  getBlockedVendors,
  approveVendor,
  blockVendor,
  unblockVendor
};
