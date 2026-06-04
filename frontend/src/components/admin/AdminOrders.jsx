import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import { FiSearch, FiFilter, FiExternalLink, FiTruck, FiCheckCircle, FiClock, FiMoreVertical, FiEye, FiArrowLeft, FiUsers, FiDownload, FiCreditCard } from 'react-icons/fi';

// MOCK API for Frontend-Only mode
const api = {
  get: async () => ({ data: { data: { products: [], categories: [], banners: [], settings: {}, orders: [], users: [], stats: [], recentTransactions: [], dailyRevenue: [], vendors: [], blogs: [], returns: [], testimonials: [], reviews: [], replacements: [], supportTickets: [], locations: [], coupons: [], logs: [], orders: [] }, status: 'success' } }),
  post: async () => ({ data: { data: { order: { orderId: 'MOCK-ORDER-123' } }, status: 'success' } }),
  patch: async () => ({ data: { status: 'success' } }),
  delete: async () => ({ data: { status: 'success' } })
};

import { useShop } from '../../context/ShopContext';
import html2pdf from 'html2pdf.js';

const AdminOrders = () => {
  const { fetchData: fetchGlobalData } = useShop(); // For inventory sync
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders');
      setOrders(res.data.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await api.patch(`/orders/${orderId}`, { status });
      fetchOrders();
      fetchGlobalData(); // SYNC INVENTORY
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status }));
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleUpdateTracking = async () => {
    if (!selectedOrder) return;
    try {
      await api.patch(`/orders/${selectedOrder._id}`, { trackingId: trackingInput });
      fetchOrders();
      setSelectedOrder(prev => ({ ...prev, trackingId: trackingInput }));
      alert('Tracking ID / Notes Updated Successfully!');
    } catch (err) {
      alert('Failed to update tracking info');
    }
  };

  const handlePrint = () => {
    const element = document.getElementById('printable-invoice');
    const opt = {
      margin: 10,
      filename: `invoice_${selectedOrder._id.slice(-6)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'All' || order.status === filter;
    const nameMatch = order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const idMatch = order._id?.toLowerCase().includes(searchQuery.toLowerCase());
    const emailMatch = order.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && (nameMatch || idMatch || emailMatch);
  });

  if (selectedOrder) {
    return (
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => { setSelectedOrder(null); setTrackingInput(''); }}
            className="flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-widest text-[#5C2E3E] hover:text-admin-accent transition-all"
          >
            <FiArrowLeft size={10} /> Back to Logs
          </button>
          <div className="flex gap-1.5">
            <button onClick={handlePrint} className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-admin-accent/10 text-[8px] font-black uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-colors">
              <FiDownload size={10} /> Print PDF
            </button>
            <button onClick={handleUpdateTracking} className="bg-admin-dark text-white px-5 py-1.5 text-[8px] font-black uppercase tracking-widest shadow-xl shadow-admin-dark/20 hover:bg-black transition-all">Update</button>
          </div>
        </div>

        <div id="printable-invoice" className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Order Meta & Items */}
          <div className="lg:col-span-2 space-y-3">
            <div className="bg-white border border-admin-accent/10 p-4 flex flex-col md:flex-row justify-between gap-4 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-admin-accent" />
              <div className="space-y-3 flex-1">
                <div>
                  <h2 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-2">
          {selectedOrder.orderId}
        </h2>
        <p className="text-gray-500 text-[13px] font-poppins">
          {new Date(selectedOrder.createdAt).toLocaleDateString()} • {selectedOrder.status}
        </p>
                  {/* For PDF Visibility */}
                  <div className="mt-2 text-[10px] text-[#5C2E3E] font-black uppercase tracking-tight leading-normal">
                    <p>{selectedOrder.user?.name || selectedOrder.shippingAddress?.name || 'Valued Patron'}</p>
                    <p className="text-[8px] font-bold text-admin-accent lowercase tracking-normal">{selectedOrder.user?.email || 'Identity Confirmed'}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-[8px] font-bold text-gray-800 uppercase tracking-widest opacity-60">Manifest</h3>
                  <div className="divide-y divide-gray-50 border border-gray-50 p-2.5 bg-gray-50/30">
                    {selectedOrder.items?.map((item, i) => (
                      <div key={i} className="flex justify-between py-3 text-[10px] font-bold text-gray-700 leading-normal">
                        <div className="flex flex-col">
                          <span className="max-w-[250px]">{item.name || 'Unknown Product'} x{item.quantity}</span>
                          {item.size && <span className="text-[7px] text-admin-accent font-black uppercase tracking-widest mt-0.5">Size: {item.size}</span>}
                        </div>
                        <span>₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between py-1.5 text-[10px] font-bold text-gray-700 border-t border-gray-100 mt-2 pt-2">
                      <span className="text-gray-400 font-medium italic">Shipping Charge</span>
                      <span className="text-green-600 font-black">{selectedOrder.shippingAmount > 0 ? `₹${selectedOrder.shippingAmount}` : 'FREE'}</span>
                    </div>
                    {selectedOrder.paymentMethod === 'COD' && selectedOrder.totalAmount > (selectedOrder.subTotal + (selectedOrder.shippingAmount || 0)) && (
                      <div className="flex justify-between py-1.5 text-[10px] font-bold text-gray-700">
                        <span className="text-gray-400 font-medium italic">COD Convenience Fee</span>
                        <span className="text-admin-gold">₹${settings?.codCharge || 0}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2.5 text-xs font-black text-admin-dark">
                      <span>TOTAL COLLECTED ({selectedOrder.paymentMethod || 'PayNow'})</span>
                      <span className="text-admin-accent">₹{selectedOrder.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-admin-light/10 p-4 flex flex-col items-center justify-center text-center space-y-2 min-w-[150px] border border-admin-accent/5" data-html2canvas-ignore="true">
                <FiTruck size={24} className="text-admin-accent" />
                <div className="space-y-2">
                  <p className="text-[8px] font-black text-admin-dark uppercase tracking-widest opacity-50">Current Status</p>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                    className="bg-white border border-admin-accent/20 text-[10px] font-bold p-1 rounded outline-none"
                  >
                    {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => {
                      const flow = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
                      const isDisabled = flow.indexOf(s) < flow.indexOf(selectedOrder.status);
                      return <option key={s} value={s} disabled={isDisabled}>{s}</option>;
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Sidebar Info */}
          <div className="space-y-3">
            <div className="bg-white border border-admin-accent/10 p-4 space-y-4 shadow-sm">
              <div className="space-y-3">
                <h3 className="text-[10px] font-black text-admin-dark uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                  <FiUsers size={12} className="text-admin-accent" /> Customer Detail
                </h3>
                <div className="space-y-0.5">
                  <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{selectedOrder.user?.name || selectedOrder.shippingAddress?.name || 'Unknown'}</p>
                  <p className="text-[9px] font-medium text-gray-400">{selectedOrder.shippingAddress?.email || selectedOrder.user?.email || 'No email'}</p>
                  <p className="text-[9px] font-medium text-gray-400">{selectedOrder.user?.phone || selectedOrder.shippingAddress?.phone || 'No phone'}</p>
                </div>
              </div>
              <div className="pt-2 space-y-3">
                <h3 className="text-[10px] font-black text-admin-dark uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                  <FiTruck size={12} className="text-admin-accent" /> Shipping To
                </h3>
                <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed tracking-widest">
                  {selectedOrder.shippingAddress?.address || 'No Address Provided'}<br />
                  {selectedOrder.shippingAddress?.city ? selectedOrder.shippingAddress.city + (selectedOrder.shippingAddress.district ? ', ' + selectedOrder.shippingAddress.district : '') : ''}
                  {selectedOrder.shippingAddress?.state ? (selectedOrder.shippingAddress.city || selectedOrder.shippingAddress.district ? ', ' : '') + selectedOrder.shippingAddress.state : ''}
                  {selectedOrder.shippingAddress?.pincode ? ' - ' + selectedOrder.shippingAddress.pincode : ''}
                </p>
              </div>

              {selectedOrder.returnAction === 'Refund' && selectedOrder.refundAccountDetails && (
                <div className="pt-2 space-y-3 border-t border-admin-accent/10 mt-2">
                  <h3 className="text-[10px] font-black text-admin-accent uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                    <FiCreditCard size={12} /> Refund Destination
                  </h3>
                  <div className="space-y-1 bg-admin-accent/5 p-3 rounded-lg border border-admin-accent/10">
                    <div>
                      <p className="text-[7.5px] font-black uppercase text-gray-400">Account Holder</p>
                      <p className="text-[10px] font-black text-admin-dark">{selectedOrder.refundAccountDetails.accountName}</p>
                    </div>
                    <div>
                      <p className="text-[7.5px] font-black uppercase text-gray-400">Account Number</p>
                      <p className="text-[10px] font-black text-admin-dark">{selectedOrder.refundAccountDetails.accountNumber}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <p className="text-[7.5px] font-black uppercase text-gray-400">Bank</p>
                        <p className="text-[10px] font-bold text-gray-600 truncate">{selectedOrder.refundAccountDetails.bankName}</p>
                      </div>
                      <div>
                        <p className="text-[7.5px] font-black uppercase text-gray-400">IFSC</p>
                        <p className="text-[10px] font-bold text-gray-600">{selectedOrder.refundAccountDetails.ifscCode}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-admin-light/20 border border-admin-accent/5 p-4 space-y-3" data-html2canvas-ignore="true">
              <h3 className="text-[10px] font-black text-admin-dark uppercase tracking-widest">Internal / Tracking ID</h3>
              <p className="text-[8px] text-gray-400 lowercase italic">Current: {selectedOrder.trackingId || 'N/A'}</p>
              <textarea
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                className="w-full h-16 bg-white/50 border border-admin-accent/10 p-2.5 text-[9px] font-medium outline-none focus:bg-white transition-all uppercase leading-relaxed text-gray-500"
                placeholder="ADD TRACKING ID OR NOTES..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 font-['Cormorant',_serif]">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-2">
          Order Logs
        </h1>
        <p className="text-gray-500 text-[13px] font-poppins">
          Live transaction tracking
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-1 pb-4">
        {/* Filters & Search - Compact */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b border-gray-50 mb-2">
          <div className="flex bg-gray-50 p-1 rounded-xl">
            {['All', 'Delivered', 'Shipped', 'Processing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${filter === tab ? 'bg-admin-dark text-white shadow-lg shadow-admin-dark/20' : 'text-gray-400 hover:text-admin-dark'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64 group">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-admin-accent transition-colors" size={12} />
            <input
              type="text"
              placeholder="SEARCH LOGS..."
              className="w-full bg-gray-50 border border-gray-100 pl-10 pr-4 py-2 rounded-xl text-xs font-sans font-bold uppercase tracking-widest outline-none focus:border-admin-accent/30 focus:bg-white transition-all shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-admin-dark/40">Order ID</th>
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-admin-dark/40">Customer</th>
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-admin-dark/40 text-left">Total</th>
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-admin-dark/40 text-left">Status</th>
                <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-admin-dark/40 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-admin-accent/[0.01] transition-colors group">
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black text-admin-dark hover:text-admin-accent cursor-pointer transition-colors block uppercase">{order.orderId}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tight">{order.user?.name || 'Guest'}</span>
                        <span className="text-[7px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-black text-admin-dark text-left">₹{order.totalAmount}</td>
                    <td className="px-6 py-4 text-left">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2.5 py-1 rounded-lg text-[6px] font-black uppercase tracking-widest border shadow-sm ${order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                          order.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                            order.status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                              'bg-red-50 text-red-600 border-red-100'
                          }`}>
                          {order.status}
                        </span>
                        <span className="text-[7px] font-black text-admin-gold uppercase tracking-tighter opacity-80">{order.paymentMethod || 'ONLINE'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-left">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-admin-accent/10 text-admin-accent text-[7px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:bg-admin-accent hover:text-white transition-all transform group-hover:scale-105"
                      >
                        <FiEye size={10} /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest italic">No orders found in the transaction logs</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
