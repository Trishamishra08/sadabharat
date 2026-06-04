import React, { useState, useEffect, useCallback } from 'react';
import { FiTag, FiPlus, FiEdit2, FiTrash2, FiClock, FiCheckCircle, FiXCircle, FiX, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// MOCK API for Frontend-Only mode
const api = {
  get: async () => ({ data: { data: { products: [], categories: [], banners: [], settings: {}, orders: [], users: [], stats: [], recentTransactions: [], dailyRevenue: [], vendors: [], blogs: [], returns: [], testimonials: [], reviews: [], replacements: [], supportTickets: [], locations: [], coupons: [], logs: [] }, status: 'success' } }),
  post: async () => ({ data: { data: { order: { orderId: 'MOCK-ORDER-123' } }, status: 'success' } }),
  patch: async () => ({ data: { status: 'success' } }),
  delete: async () => ({ data: { status: 'success' } })
};


const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [form, setForm] = useState({
        code: '',
        discountType: 'percentage',
        discountValue: '',
                isActive: true,
        usageLimit: '',
        expiryDate: ''
    });

    const fetchCoupons = useCallback(async () => {
        try {
            setLoading(true);
            const res = await api.get('/coupons');
            const fetched = res.data?.data?.coupons;
            if (fetched && fetched.length > 0) {
                setCoupons(fetched);
            } else {
                setCoupons([
                    { _id: 'c1', code: 'WELCOME50', campaignName: 'New User Discount', discountType: 'fixed', discountValue: 50, usageLimit: 500, usedCount: 145, expiryDate: '2025-12-31T00:00:00.000Z', isActive: true },
                    { _id: 'c2', code: 'FESTIVAL20', campaignName: 'Diwali Special', discountType: 'percentage', discountValue: 20, usageLimit: 200, usedCount: 89, expiryDate: '2025-10-15T00:00:00.000Z', isActive: true },
                    { _id: 'c3', code: 'FREESHIP', campaignName: 'Free Delivery Weekend', discountType: 'fixed', discountValue: 100, usageLimit: 1000, usedCount: 412, expiryDate: '2023-11-30T00:00:00.000Z', isActive: false }
                ]);
            }
        } catch (err) {
            console.error("Failed to fetch coupons:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const handleDelete = async (id) => {
        if (window.confirm("Permenantly remove this promo code?")) {
            try {
                await api.delete(`/coupons/${id}`);
                fetchCoupons();
            } catch (err) {
                alert("Failed to delete coupon");
            }
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await api.patch(`/coupons/${id}`, { isActive: !currentStatus });
            fetchCoupons();
        } catch (err) {
            alert("Failed to update status");
        }
    };

    const startEdit = (c) => {
        setEditingCoupon(c);
        setForm({
            code: c.code,
            discountType: c.discountType,
            discountValue: c.discountValue,
            isActive: c.isActive,
            usageLimit: c.usageLimit || '',
            expiryDate: new Date(c.expiryDate).toISOString().split('T')[0]
        });
        setIsAdding(true);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const payload = { ...form };
            if (!payload.usageLimit) payload.usageLimit = null; // Infinite usages if empty

            if (editingCoupon) {
                await api.patch(`/coupons/${editingCoupon._id}`, payload);
            } else {
                await api.post('/coupons', payload);
            }
            fetchCoupons();
            setIsAdding(false);
            setEditingCoupon(null);
            setForm({ code: '', discountType: 'percentage', discountValue: '', isActive: true, usageLimit: '', expiryDate: '' });
        } catch (err) {
            alert(err.response?.data?.message || "Failed to save coupon");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-4 font-['Cormorant',_serif]">
            <AnimatePresence mode="wait">
                {!isAdding ? (
                    <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-2">Promo Ledger</h1>
                                <p className="text-sm font-sans font-medium text-gray-500 capitalize tracking-normal">Manage Store Discount Vectors</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => { setEditingCoupon(null); setForm({ code: '', discountType: 'percentage', discountValue: '', isActive: true, usageLimit: '', expiryDate: '' }); setIsAdding(true); }}
                                    className="bg-admin-dark text-white px-5 py-1.5 rounded-none text-xs font-sans font-bold uppercase tracking-widest shadow-xl shadow-brand-dark/20 flex items-center gap-2 hover:bg-black transition-all"
                                >
                                    <FiPlus /> Mint Coupon
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-1 pb-4">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left font-sans">
                                    <thead>
                                        <tr className="border-b border-gray-50">
                                            <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">Code</th>
                                            <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">Discount</th>
                                            <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">Redemption Count</th>
                                            <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">Expires</th>
                                            <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">Status</th>
                                            <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {loading ? (
                                            <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">Syncing Promos...</td></tr>
                                        ) : coupons.length > 0 ? (
                                            coupons.map((c) => (
                                                <tr key={c._id} className="hover:bg-admin-accent/[0.01] transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <span className="text-sm font-sans font-medium text-admin-dark uppercase flex items-center gap-2">
                                                            <FiTag className="text-admin-accent" size={14} /> {c.code}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-sans font-medium text-admin-accent">
                                                        {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT`}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-sans font-medium text-gray-800">{c.usedCount} <span className="text-xs font-medium text-gray-500">/ {c.usageLimit || '∞'}</span></span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`text-sm font-sans font-medium capitalize flex items-center gap-1 ${new Date(c.expiryDate) < new Date() ? 'text-red-500' : 'text-gray-500'}`}>
                                                            <FiClock size={10} /> {new Date(c.expiryDate).toLocaleDateString()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button onClick={() => handleToggleStatus(c._id, c.isActive)} className="focus:outline-none">
                                                            {c.isActive ? (
                                                                <span className="px-2.5 py-1 text-xs font-sans font-bold uppercase tracking-wider bg-green-50 text-green-600 border border-green-100 rounded-lg flex items-center gap-1 w-fit cursor-pointer hover:bg-green-100 transition-colors">
                                                                    <FiCheckCircle size={8} /> Active
                                                                </span>
                                                            ) : (
                                                                <span className="px-2.5 py-1 text-xs font-sans font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-100 rounded-lg flex items-center gap-1 w-fit cursor-pointer hover:bg-red-100 transition-colors">
                                                                    <FiXCircle size={8} /> Paused
                                                                </span>
                                                            )}
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center gap-2 justify-end">
                                                            <button onClick={() => startEdit(c)} className="p-1.5 text-admin-dark hover:bg-admin-accent/10 rounded-md transition-all"><FiEdit2 size={12} /></button>
                                                            <button onClick={() => handleDelete(c._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-all"><FiTrash2 size={12} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-400 text-sm font-sans font-medium text-gray-500 tracking-wider italic">No promos minted yet</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div key="add" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="max-w-xl mx-auto bg-white rounded-2xl border border-admin-accent/10 shadow-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-admin-dark" />
                        <button onClick={() => setIsAdding(false)} className="absolute top-4 right-4 p-1.5 bg-gray-50 text-admin-dark rounded-lg hover:bg-admin-accent/10 transition-all font-bold">
                            <FiX size={12} />
                        </button>

                        <div className="mb-6 text-center pt-2">
                            <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-admin-dark mx-auto mb-3 border border-admin-accent/5 shadow-inner">
                                <FiTag size={20} />
                            </div>
                            <h2 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-1">
                                {editingCoupon ? 'Redefine Promo' : 'Mint Promo'}
                            </h2>
                            <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-60">Architect discount parameters</p>
                        </div>

                        <form onSubmit={handleAdd} className="space-y-4 font-sans">
                            <div className="space-y-1.5">
                                <label className="text-[8px] font-black text-admin-dark/50 uppercase tracking-widest ml-1">Promo Code String</label>
                                <input type="text" placeholder="e.g. SAUNDARYA10" className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-sm font-sans font-medium text-gray-800 capitalize outline-none focus:border-admin-accent/30 focus:bg-white transition-all shadow-inner" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-admin-dark/50 uppercase tracking-widest ml-1">Vector Scale</label>
                                    <select className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-sm font-sans font-medium text-gray-800 capitalize outline-none focus:border-admin-accent/30 transition-all" value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })}>
                                        <option value="percentage">% Percentage</option>
                                        <option value="fixed">₹ Fixed Flat</option>
                                    </select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-admin-dark/50 uppercase tracking-widest ml-1">Magnitude</label>
                                    <input type="number" placeholder="Value..." className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-sm font-sans font-medium text-gray-800 capitalize outline-none focus:border-admin-accent/30 focus:bg-white transition-all" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })} required min="1" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-admin-dark/50 uppercase tracking-widest ml-1">Redemption Count (Optional)</label>
                                    <input type="number" placeholder="Leave empty for infinite usage" className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-sm font-sans font-medium text-gray-800 capitalize outline-none focus:border-admin-accent/30 focus:bg-white transition-all" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} min="1" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-admin-dark/50 uppercase tracking-widest ml-1">Expiry Horizon</label>
                                    <input
                                        type="date"
                                        className="w-full bg-gray-50 border border-gray-100 p-2.5 rounded-lg text-sm font-sans font-medium text-gray-800 capitalize outline-none focus:border-admin-accent/30 transition-all font-sans"
                                        value={form.expiryDate}
                                        onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button type="submit" disabled={isSubmitting} className="w-full bg-admin-dark text-white py-3 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-brand-dark/20 flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-[0.98] group disabled:opacity-50">
                                    {isSubmitting ? 'Minting Sequence...' : (editingCoupon ? 'Compile Sync' : 'Execute Promo Mint')}
                                    <FiCheckCircle size={12} className="group-hover:scale-110 transition-transform text-white/50 group-hover:text-brand-gold" />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminCoupons;
