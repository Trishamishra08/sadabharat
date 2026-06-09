const Notification = require('../models/notificationModel');

// GET /api/notifications/me — vendor or user fetches their own notifications
const getMyNotifications = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const role = req.user.role; // 'vendor' or 'user'

    const notifications = await Notification.find({
      $or: [
        { targetRole: 'all' },
        { targetRole: role, targetId: null },
        { targetRole: role, targetId: userId }
      ]
    }).sort({ createdAt: -1 });

    // Attach isRead per user
    const result = notifications.map(n => ({
      ...n.toObject(),
      isRead: n.readBy?.some(id => id.toString() === userId.toString())
    }));

    res.status(200).json({ success: true, data: { notifications: result } });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/notifications/:id/read
const markAsRead = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ success: false, message: 'Notification not found' });

    if (!notification.readBy.some(id => id.toString() === userId.toString())) {
      notification.readBy.push(userId);
      await notification.save();
    }

    res.status(200).json({ success: true, message: 'Marked as read' });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/notifications/mark-all-read
const markAllRead = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const role = req.user.role;

    const notifications = await Notification.find({
      $or: [
        { targetRole: 'all' },
        { targetRole: role, targetId: null },
        { targetRole: role, targetId: userId }
      ],
      readBy: { $ne: userId }
    });

    await Promise.all(notifications.map(n => {
      n.readBy.push(userId);
      return n.save();
    }));

    res.status(200).json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    next(error);
  }
};

// GET /api/admins/notifications — Admin views all
const getAdminNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: { notifications } });
  } catch (error) {
    next(error);
  }
};

// POST /api/admins/notifications — Admin creates a notification
const createNotification = async (req, res, next) => {
  try {
    const { title, message, type, targetRole, targetId } = req.body;
    const notification = await Notification.create({
      title,
      message,
      type: type || 'info',
      targetRole,
      targetId: targetId || null
    });
    res.status(201).json({ success: true, data: { notification } });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admins/notifications/:id — Admin deletes
const deleteNotification = async (req, res, next) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMyNotifications,
  markAsRead,
  markAllRead,
  getAdminNotifications,
  createNotification,
  deleteNotification
};
