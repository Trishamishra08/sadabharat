import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiShoppingBag, FiCreditCard, FiArrowUpRight, FiMoreVertical, FiCalendar, FiClock as FiClockIcon, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { motion } from 'framer-motion';

// MOCK API for Frontend-Only mode
const api = {
  get: async () => ({ data: { data: { products: [], categories: [], banners: [], settings: {}, orders: [], users: [], stats: [], recentTransactions: [], dailyRevenue: [], vendors: [], blogs: [], returns: [], testimonials: [], reviews: [], replacements: [], supportTickets: [], locations: [], coupons: [], logs: [], stats: [], recentTransactions: [] }, status: 'success' } }),
  post: async () => ({ data: { data: { order: { orderId: 'MOCK-ORDER-123' } }, status: 'success' } }),
  patch: async () => ({ data: { status: 'success' } }),
  delete: async () => ({ data: { status: 'success' } })
};


const AdminFinance = () => {
  const [data, setData] = useState({ stats: [], recentTransactions: [] });
  const [loading, setLoading] = useState(true);

  const fetchFinanceData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/admins/finance-stats');
      setData(res.data.data);
    } catch (err) {
      console.error("Failed to fetch finance stats:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFinanceData();
  }, [fetchFinanceData]);

  const handlePaymentStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}`, { paymentStatus: newStatus });
      fetchFinanceData(); // Soft refresh backend stats calculation
    } catch (err) {
      alert("Failed to update payment ledger");
    }
  };

  const totalRevenue = data.stats.find(s => s._id === 'Completed')?.total || 0;
  const refundedRevenue = data.stats.find(s => s._id === 'Refunded')?.total || 0;
  const pendingRevenue = data.stats.find(s => s._id === 'Pending')?.total || 0;
  const netLiquidity = Math.max(0, totalRevenue - refundedRevenue);
  const totalOrders = data.stats.reduce((acc, s) => acc + s.count, 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(0) : 0;

  const financeStatsCards = [
    { title: 'Gross Revenue', value: `₹${totalRevenue.toLocaleString()}`, change: '+100%', icon: <FiDollarSign />, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Net Liquidity', value: `₹${netLiquidity.toLocaleString()}`, change: refundedRevenue > 0 ? `-₹${refundedRevenue.toLocaleString()} Ref` : 'Stable', icon: <FiTrendingUp />, color: 'text-admin-accent', bg: 'bg-brand-light' },
    { title: 'Avg. Order', value: `₹${avgOrderValue.toLocaleString()}`, change: 'Real-time', icon: <FiShoppingBag />, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Pending Dues', value: `₹${pendingRevenue.toLocaleString()}`, change: `${data.stats.find(s => s._id === 'Pending')?.count || 0} items`, icon: <FiClockIcon />, color: 'text-blue-600', bg: 'bg-blue-50' }
  ];

  if (loading) return <div className="h-96 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.3em] text-admin-dark/20 animate-pulse">Synchronizing Ledgers...</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-1">
            Store Finance
          </h1>
          <p className="text-gray-500 text-[13px] font-poppins">Live Revenue & Transaction Audits</p>
        </div>
        <button onClick={fetchFinanceData} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-none border border-admin-accent/10 text-[8px] font-black uppercase tracking-widest shadow-sm hover:bg-admin-accent/[0.02] transition-colors active:scale-95">
          <FiRefreshCw /> REFRESH LEDGER
        </button>
      </div>

      {/* Finance Cards - Dashboard Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {financeStatsCards.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-default ${stat.bg}/30`}
          >
            <div className="flex flex-col">
              <span className="text-sm font-sans font-medium text-gray-500 capitalize tracking-normal leading-none mb-1">{stat.title}</span>
              <div className="flex items-end gap-1.5">
                <span className="text-lg font-bold text-gray-800 leading-none">{stat.value}</span>
                <span className={`text-[7px] font-black flex items-center gap-0.5 mb-0.5 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-blue-500'}`}>
                  {stat.change.startsWith('+') ? <FiArrowUpRight size={8} /> : <FiClockIcon size={8} />} {stat.change}
                </span>
              </div>
            </div>
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
              {React.cloneElement(stat.icon, { size: 18 })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Transactions Table */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 relative overflow-hidden shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-1">Audit Logs</h3>
            <p className="text-sm font-sans font-medium text-gray-500 capitalize tracking-normal">Financial summary</p>
          </div>
          <div className="flex bg-admin-light/20 p-1 rounded-lg border border-admin-accent/5">
            <button className="px-3 py-1 bg-white text-admin-dark rounded-md text-xs font-medium shadow-sm">Live</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-4 py-3 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">Txn ID</th>
                <th className="px-4 py-3 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">User</th>
                <th className="px-4 py-3 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">Amount</th>
                <th className="px-4 py-3 text-xs font-sans font-bold uppercase tracking-widest text-gray-500 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recentTransactions?.length > 0 ? (
                data.recentTransactions.map((tr) => (
                  <tr key={tr._id} className="hover:bg-admin-accent/[0.02] transition-colors group">
                    <td className="px-4 py-3 text-sm font-sans font-medium text-admin-dark uppercase">#{tr.orderId}</td>
                    <td className="px-4 py-3 text-sm font-sans font-medium text-gray-700 capitalize">{tr.user?.name || 'Guest'}</td>
                    <td className="px-4 py-3 text-sm font-sans font-medium text-gray-900">₹{tr.totalAmount}</td>
                    <td className="px-4 py-3 text-right">
                      <select
                        value={tr.paymentStatus}
                        onChange={(e) => handlePaymentStatusUpdate(tr._id, e.target.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold uppercase tracking-wider border outline-none cursor-pointer transition-colors shadow-sm ${tr.paymentStatus === 'Completed' ? 'bg-green-50 text-green-700 border-green-200' : tr.paymentStatus === 'Failed' || tr.paymentStatus === 'Refunded' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-admin-light/50 text-admin-dark border-admin-accent/20'}`}
                      >
                        {['Pending', 'Completed', 'Failed', 'Refunded'].map((status) => {
                          const flow = ['Pending', 'Completed', 'Failed', 'Refunded'];
                          const currentIndex = flow.indexOf(tr.paymentStatus);
                          const nextIndex = flow.indexOf(status);

                          let isDisabled = false;
                          if (tr.paymentStatus === 'Refunded') isDisabled = status !== 'Refunded';
                          if (tr.paymentStatus === 'Completed' && (status === 'Pending' || status === 'Failed')) isDisabled = true;
                          if (tr.paymentStatus === 'Failed' && status === 'Pending') isDisabled = true;

                          return (
                            <option
                              key={status}
                              value={status}
                              disabled={isDisabled}
                              className={`bg-white font-medium ${status === 'Completed' ? 'text-green-700' : status === 'Failed' || status === 'Refunded' ? 'text-red-700' : 'text-gray-800'}`}
                            >
                              {status}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-10 text-center text-gray-400 text-sm font-sans font-medium tracking-wider capitalize italic">No Transactions Logged</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
