const express = require('express');
const { signup, registerCustomer, getUsers } = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(getUsers);

// Signup for Admin and Vendor
router.post('/signup', signup);

// Register/Login for Customer (Mobile)
router.post('/register-customer', registerCustomer);

module.exports = router;
