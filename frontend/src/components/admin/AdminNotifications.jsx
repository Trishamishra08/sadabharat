import React, { useState, useEffect, useCallback } from 'react';
import { FiBell, FiTrash2, FiSend, FiRefreshCw, FiUsers, FiUser, FiInfo, FiCheckCircle, FiAlertTriangle, FiAlertCircle } from 'react-icons/fi';
import api from '../../utils/api';

const TYPE_CONFIG = {
  info:    { icon: FiInfo,          color: 'text-blue-500',  bg: 'bg-blue-50',   border: 'border-blue-100' },
  success: { icon: FiCheckCircle,   color: 'text-green-600', bg: 'bg-green-50',  border: 'border-green-100' },
  warning: { icon: FiAlertTriangle, color: 'text-orange-500',bg: 'bg-orange-50', border: 'border-orange-100' },
  alert:   { icon: FiAlertCircle,   color: 'text-red-500',   bg: 'bg-red-50',    border: 'border-red-100' },
};

const ROLE_CONFIG = {
  all:    { label: 'All (Everyone)',   icon: FiUsers, color: 'text-purple-600 bg-purple-50 border-purple-100' },
  vendor: { label: 'All Vendors',     icon: FiUser,  color: 'text-green-600 bg-green-50 border-green-100' },
  user:   { label: 'All Customers',   icon: FiUser,  color: 'text-blue-600 bg-blue-50 border-blue-100' },
};

const initialForm = { title: '', message: '', type: 'info', targetRole: 'all' };

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [activeTab, setActiveTab] = useState('send'); // 'send' | 'history'

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admins/notifications');
      setNotifications(res.data.data.notifications || []);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) return;
    try {
      setSending(true);
      await api.post('/admins/notifications', form);
      setForm(initialForm);
      setActiveTab('history');
      fetchNotifications();
    } catch (err) {
      alert('Failed to send notification.');
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this notification?')) return;
    try {
      await api.delete(`/admins/notifications/${id}`);
      fetchNotifications();
    } catch {
      alert('Delete failed.');
    }
  };

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - new Date(date)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div className="px-6 py-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">Notifications</h1>
          <p className="text-xs text-gray-400 mt-0.5">Send and manage notifications for vendors & customers</p>
        </div>
        <button
          onClick={fetchNotifications}
          className="flex items-center gap-1.5 bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-xs text-gray-500 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <FiRefreshCw size={11} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
        {['send', 'history'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
              activeTab === tab
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'send' ? 'Send Notification' : `History (${notifications.length})`}
          </button>
        ))}
      </div>

      {activeTab === 'send' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-w-2xl">
          <form onSubmit={handleSend} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. New Feature Available"
                required
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                placeholder="Write your notification message..."
                required
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Type */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all bg-white"
                >
                  <option value="info">ℹ️ Info</option>
                  <option value="success">✅ Success</option>
                  <option value="warning">⚠️ Warning</option>
                  <option value="alert">🚨 Alert</option>
                </select>
              </div>

              {/* Target Role */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Send To</label>
                <select
                  value={form.targetRole}
                  onChange={e => setForm({ ...form, targetRole: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-400 transition-all bg-white"
                >
                  <option value="all">👥 Everyone</option>
                  <option value="vendor">🏪 All Vendors</option>
                  <option value="user">🧑 All Customers</option>
                </select>
              </div>
            </div>

            {/* Preview */}
            {form.title && (
              <div className={`flex items-start gap-3 p-3 rounded-lg border ${TYPE_CONFIG[form.type]?.bg} ${TYPE_CONFIG[form.type]?.border}`}>
                {React.createElement(TYPE_CONFIG[form.type]?.icon, { size: 16, className: TYPE_CONFIG[form.type]?.color })}
                <div>
                  <p className={`text-xs font-semibold ${TYPE_CONFIG[form.type]?.color}`}>{form.title}</p>
                  <p className="text-xs text-gray-600 mt-0.5">{form.message || '...'}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="flex items-center gap-2 bg-[#054425] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#043518] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <FiSend size={13} />
              {sending ? 'Sending...' : 'Send Notification'}
            </button>
          </form>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-10 text-center text-xs text-gray-400 animate-pulse">Loading...</div>
          ) : notifications.length > 0 ? (
            <div className="divide-y divide-gray-50">
              {notifications.map(n => {
                const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.info;
                const roleCfg = ROLE_CONFIG[n.targetRole] || ROLE_CONFIG.all;
                const IconComp = cfg.icon;
                return (
                  <div key={n._id} className="flex items-start justify-between gap-3 px-4 py-3 hover:bg-gray-50/40 transition-colors">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.bg}`}>
                        <IconComp size={14} className={cfg.color} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{n.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] rounded border font-medium ${roleCfg.color}`}>
                            {n.targetRole === 'all' ? '👥' : '🏪'} {roleCfg.label}
                          </span>
                          <span className="text-[10px] text-gray-400">{timeAgo(n.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(n._id)}
                      className="p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all shrink-0"
                    >
                      <FiTrash2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-gray-400 italic">No notifications sent yet.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
