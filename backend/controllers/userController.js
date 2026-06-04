const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @desc    Register a new Admin or Vendor
// @route   POST /api/users/signup
// @access  Public
const signup = async (req, res, next) => {
  try {
    const { 
      fullName, name, email, password, role, mobile,
      // Vendor specific fields from frontend
      businessName, gstNumber, businessType, businessAddress, city, state,
      accountHolderName, bankName, accountNumber, ifscCode, upiId,
      storeName, storeDescription, categories
    } = req.body;

    const actualName = fullName || name;
    const userRole = role || 'user'; // Defaults to user if not provided

    if (!actualName || !email || !password) {
      res.status(400);
      throw new Error('Please add all required fields (name, email, password)');
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error('User with this email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const vendorDetails = userRole === 'vendor' ? {
      businessName, gstNumber, businessType, businessAddress, city, state,
      accountHolderName, bankName, accountNumber, ifscCode, upiId,
      storeName, storeDescription, categories
    } : undefined;

    // Create user
    const user = await User.create({
      name: actualName,
      email,
      password: hashedPassword,
      role: userRole,
      mobile,
      vendorDetails
    });

    if (user) {
      res.status(201).json({
        success: true,
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id)
        }
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Customer/User Registration via Mobile (Placeholder for OTP logic)
// @route   POST /api/users/register-customer
// @access  Public
const registerCustomer = async (req, res, next) => {
  try {
    const { mobile } = req.body;

    if (!mobile) {
      res.status(400);
      throw new Error('Please provide a mobile number');
    }

    let user = await User.findOne({ mobile });
    if (!user) {
      // In real app, you would verify OTP first before creating
      user = await User.create({
        name: 'New Customer', // placeholder
        mobile,
        role: 'user',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user.id,
        mobile: user.mobile,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Public
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  registerCustomer,
  getUsers
};
