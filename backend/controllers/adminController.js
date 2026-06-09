const Order = require('../models/orderModel');
const Earning = require('../models/earningModel');
const Vendor = require('../models/vendorModel');
const Review = require('../models/reviewModel');
const Testimonial = require('../models/testimonialModel');

// @desc    Get Finance Stats
// @route   GET /api/admins/finance-stats
// @access  Private/Admin
const getFinanceStats = async (req, res) => {
  try {
    // 1. Calculate stats from Orders (Completed, Refunded, Pending)
    const orders = await Order.find();
    
    let totalCompleted = 0;
    let completedCount = 0;
    let totalRefunded = 0;
    let totalPending = 0;
    let pendingCount = 0;

    orders.forEach(o => {
      if (o.paymentResult?.status === 'completed' || o.isPaid) {
        totalCompleted += o.totalPrice;
        completedCount += 1;
      } else if (o.paymentResult?.status === 'Refunded' || o.returnStatus === 'Refunded') {
        totalRefunded += o.totalPrice;
      } else {
        totalPending += o.totalPrice;
        pendingCount += 1;
      }
    });

    // 2. Calculate platform revenue and vendor payouts from Earnings
    const earnings = await Earning.find();
    let totalCommission = 0;
    let totalVendorPayout = 0;
    
    earnings.forEach(e => {
      if (e.status !== 'Refunded') {
        totalCommission += e.commissionAmount;
        totalVendorPayout += e.netEarning;
      }
    });

    const stats = [
      { _id: 'Completed', total: totalCompleted, count: completedCount },
      { _id: 'Refunded', total: totalRefunded, count: 0 },
      { _id: 'Pending', total: totalPending, count: pendingCount },
      { _id: 'PlatformCommission', total: totalCommission, count: 0 },
      { _id: 'VendorPayout', total: totalVendorPayout, count: 0 }
    ];

    // 3. Fetch Recent Orders to guarantee data is shown, then attach Earnings
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('orderItems.product');

    const recentOrderIds = recentOrders.map(o => o._id);
    const recentEarnings = await Earning.find({ order: { $in: recentOrderIds } })
      .populate('vendor', 'storeName');

    // 4. Format transactions for frontend (Mix of Earnings and Admin Orders)
    let formattedTransactions = [];

    recentOrders.forEach(order => {
      const orderEarnings = recentEarnings.filter(e => e.order.toString() === order._id.toString());
      
      if (orderEarnings.length > 0) {
        // Has vendor earnings, add each earning item
        orderEarnings.forEach(e => {
          formattedTransactions.push({
            _id: e._id,
            orderId: order._id.toString().substring(0, 8).toUpperCase(),
            vendorName: e.vendor?.storeName || 'Unknown Vendor',
            productName: e.productName,
            totalAmount: e.totalAmount,
            commissionRate: e.commissionRate || 15,
            platformShare: e.commissionAmount,
            vendorShare: e.netEarning,
            status: e.status,
            isEditable: true
          });
        });
      } else {
        // No vendor earnings, likely a legacy order or pure admin sale
        formattedTransactions.push({
          _id: order._id,
          orderId: order._id.toString().substring(0, 8).toUpperCase(),
          vendorName: 'Platform / Admin',
          productName: order.orderItems.length > 0 ? (order.orderItems.length === 1 ? order.orderItems[0].name : `${order.orderItems.length} Items`) : 'Order',
          totalAmount: order.totalPrice,
          commissionRate: 100,
          platformShare: order.totalPrice,
          vendorShare: 0,
          status: order.isPaid ? 'Completed' : 'Pending',
          isEditable: false
        });
      }
    });

    res.status(200).json({
      success: true,
      data: {
        stats,
        recentTransactions: formattedTransactions.slice(0, 15) // Limit to max 15 rows
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Commission for an Earning record
// @route   PATCH /api/admins/finance/earnings/:id/commission
// @access  Private/Admin
const updateEarningCommission = async (req, res) => {
  try {
    const { commissionRate } = req.body;
    
    if (commissionRate === undefined || commissionRate < 0 || commissionRate > 100) {
      return res.status(400).json({ success: false, message: 'Invalid commission rate' });
    }

    const earning = await Earning.findById(req.params.id);
    if (!earning) {
      return res.status(404).json({ success: false, message: 'Earning record not found' });
    }

    earning.commissionRate = commissionRate;
    earning.commissionAmount = (earning.totalAmount * commissionRate) / 100;
    earning.netEarning = earning.totalAmount - earning.commissionAmount;

    await earning.save();

    res.status(200).json({ success: true, data: earning, message: 'Commission updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get Admin Payouts List
// @route   GET /api/admins/payouts
// @access  Private/Admin
const getAdminPayouts = async (req, res) => {
  try {
    const payouts = await Earning.aggregate([
      {
        $group: {
          _id: "$vendor",
          totalPending: {
            $sum: {
              $cond: [{ $eq: ["$status", "Pending"] }, "$netEarning", 0]
            }
          },
          totalCleared: {
            $sum: {
              $cond: [{ $eq: ["$status", "Cleared"] }, "$netEarning", 0]
            }
          },
          lastTransactionDate: { $max: "$createdAt" }
        }
      },
      {
        $lookup: {
          from: "vendors",
          localField: "_id",
          foreignField: "_id",
          as: "vendorDetails"
        }
      },
      {
        $unwind: "$vendorDetails"
      },
      {
        $project: {
          vendorId: "$_id",
          storeName: "$vendorDetails.storeName",
          vendorName: "$vendorDetails.fullName",
          bankDetails: {
            accountHolderName: "$vendorDetails.accountHolderName",
            bankName: "$vendorDetails.bankName",
            accountNumber: "$vendorDetails.accountNumber",
            ifscCode: "$vendorDetails.ifscCode",
            upiId: "$vendorDetails.upiId"
          },
          totalPending: 1,
          totalCleared: 1,
          lastTransactionDate: 1
        }
      },
      {
        $sort: { totalPending: -1 }
      }
    ]);

    // Only return vendors that have actual earnings/dues
    const filteredPayouts = payouts.filter(p => p.totalPending > 0 || p.totalCleared > 0);

    res.status(200).json({ success: true, data: filteredPayouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Clear Vendor Payouts
// @route   POST /api/admins/payouts/:vendorId/clear
// @access  Private/Admin
const clearVendorPayout = async (req, res) => {
  try {
    const { vendorId } = req.params;

    const result = await Earning.updateMany(
      { vendor: vendorId, status: 'Pending' },
      { $set: { status: 'Cleared' } }
    );

    res.status(200).json({
      success: true,
      message: `Cleared ${result.modifiedCount} pending transactions successfully`
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Reviews Management ---
const getAdminReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('product', 'name image')
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { reviews } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleReviewApproval = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
    review.isApproved = !review.isApproved;
    await review.save();
    res.status(200).json({ success: true, message: 'Review status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// --- Testimonials Management ---
const getAdminTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { testimonials } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleTestimonialApproval = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    testimonial.isApproved = !testimonial.isApproved;
    await testimonial.save();
    res.status(200).json({ success: true, message: 'Testimonial status updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: { testimonial } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!testimonial) return res.status(404).json({ success: false, message: 'Testimonial not found' });
    res.status(200).json({ success: true, data: { testimonial } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getFinanceStats,
  updateEarningCommission,
  getAdminPayouts,
  clearVendorPayout,
  getAdminReviews,
  toggleReviewApproval,
  deleteReview,
  getAdminTestimonials,
  toggleTestimonialApproval,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
