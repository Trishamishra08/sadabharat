import React, { useState, useEffect } from 'react';
import { FiUsers, FiCheckCircle, FiXCircle, FiEye, FiMoreVertical, FiShoppingBag, FiStar } from 'react-icons/fi';

// MOCK API for Frontend-Only mode
const api = {
  get: async () => ({ data: { data: { products: [], categories: [], banners: [], settings: {}, orders: [], users: [], stats: [], recentTransactions: [], dailyRevenue: [], vendors: [], blogs: [], returns: [], testimonials: [], reviews: [], replacements: [], supportTickets: [], locations: [], coupons: [], logs: [] }, status: 'success' } }),
  post: async () => ({ data: { data: { order: { orderId: 'MOCK-ORDER-123' } }, status: 'success' } }),
  patch: async () => ({ data: { status: 'success' } }),
  delete: async () => ({ data: { status: 'success' } })
};

const AdminVendors = () => {
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedVendor, setSelectedVendor] = useState(null); // For details modal

    const fetchVendors = async () => {
        try {
            setLoading(true);
            const res = await api.get('/admin/vendors'); // Attempt to fetch from backend
            setVendors(res.data.data.vendors);
        } catch (err) {
            console.log('Using fallback mock data for vendors');
            setVendors([
                {
                    _id: 'v1',
                    name: 'Aarav Sharma',
                    storeName: 'Aarav Organics',
                    email: 'aarav.organics@example.com',
                    phone: '+91 9876543210',
                    status: 'Pending',
                    joinedAt: '2026-06-01T10:00:00Z',
                    productsCount: 0,
                    rating: 0
                },
                {
                    _id: 'v2',
                    name: 'Priya Patel',
                    storeName: 'Priya Wellness',
                    email: 'priya@wellness.com',
                    phone: '+91 8765432109',
                    status: 'Approved',
                    joinedAt: '2026-05-15T14:30:00Z',
                    productsCount: 24,
                    rating: 4.8
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    const handleStatusChange = async (vendorId, newStatus) => {
        try {
            // await api.patch(`/admin/vendors/${vendorId}/status`, { status: newStatus });
            setVendors(prev => prev.map(v => v._id === vendorId ? { ...v, status: newStatus } : v));
        } catch (err) {
            alert('Failed to update vendor status');
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-20 p-4 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-2">
                        Vendor Management
                    </h1>
                    <p className="text-gray-500 text-[13px] font-poppins">
                        Manage seller accounts, verify credentials, and oversee store performance.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition-all">
                        Export List
                    </button>
                    <button className="bg-admin-dark text-white px-6 py-2.5 rounded-lg text-xs font-bold shadow-lg hover:bg-black transition-all">
                        + Onboard Vendor
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse">
                    <div className="w-10 h-10 border-4 border-admin-gold border-t-admin-accent rounded-full mx-auto mb-4 animate-spin"></div>
                    <p className="text-sm font-sans font-medium text-gray-500">Loading Vendors...</p>
                </div>
            ) : vendors.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
                    <FiUsers className="mx-auto text-gray-200 mb-4" size={48} />
                    <h3 className="text-xl font-['Cormorant',_serif] font-bold text-admin-dark mb-2">No Active Vendors</h3>
                    <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Currently, there are no third-party sellers registered on the platform.
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">VENDOR DETAILS</th>
                                    <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">STORE NAME</th>
                                    <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">JOINED DATE</th>
                                    <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">METRICS</th>
                                    <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500">STATUS</th>
                                    <th className="px-6 py-4 text-xs font-sans font-bold uppercase tracking-widest text-gray-500 text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {vendors.map(vendor => (
                                    <tr key={vendor._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-admin-dark text-white flex flex-col items-center justify-center font-['Cormorant',_serif] font-bold text-lg leading-none">
                                                    {vendor.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-800">{vendor.name}</p>
                                                    <p className="text-xs text-gray-500">{vendor.email}</p>
                                                    <p className="text-[10px] text-gray-400">{vendor.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-gray-800">{vendor.storeName}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-500">{new Date(vendor.joinedAt).toLocaleDateString()}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <FiShoppingBag size={12} className="text-gray-400" /> {vendor.productsCount} Products
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-600">
                                                    <FiStar size={12} className="text-admin-gold" fill="currentColor" /> {vendor.rating > 0 ? vendor.rating : 'N/A'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                                                vendor.status === 'Approved' ? 'bg-green-50 text-green-600' : 
                                                vendor.status === 'Blocked' ? 'bg-red-50 text-red-600' : 
                                                'bg-orange-50 text-orange-600'
                                            }`}>
                                                {vendor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex justify-center items-center gap-3">
                                                <button onClick={() => setSelectedVendor(vendor)} className="p-2 bg-gray-100 hover:bg-admin-dark hover:text-white rounded-lg transition-all" title="View Details">
                                                    <FiEye size={14} />
                                                </button>
                                                {vendor.status !== 'Approved' && (
                                                    <button onClick={() => handleStatusChange(vendor._id, 'Approved')} className="p-2 bg-green-50 text-green-600 hover:bg-green-500 hover:text-white rounded-lg transition-all" title="Approve">
                                                        <FiCheckCircle size={14} />
                                                    </button>
                                                )}
                                                {vendor.status !== 'Blocked' && (
                                                    <button onClick={() => handleStatusChange(vendor._id, 'Blocked')} className="p-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Block">
                                                        <FiXCircle size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Vendor Details Modal */}
            {selectedVendor && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
                            <h2 className="text-xl font-['Cormorant',_serif] font-bold text-admin-dark">Vendor Profile</h2>
                            <button onClick={() => setSelectedVendor(null)} className="text-gray-400 hover:text-admin-dark">
                                <FiXCircle size={24} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 rounded-full bg-admin-dark text-white flex flex-col items-center justify-center font-['Cormorant',_serif] font-bold text-3xl leading-none">
                                    {selectedVendor.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{selectedVendor.storeName}</h3>
                                    <p className="text-sm text-gray-500">Operated by: {selectedVendor.name}</p>
                                    <span className={`mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                                        selectedVendor.status === 'Approved' ? 'bg-green-50 text-green-600' : 
                                        selectedVendor.status === 'Blocked' ? 'bg-red-50 text-red-600' : 
                                        'bg-orange-50 text-orange-600'
                                    }`}>
                                        {selectedVendor.status}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Contact Info</p>
                                    <p className="text-sm text-gray-800 font-medium">{selectedVendor.email}</p>
                                    <p className="text-sm text-gray-800 font-medium">{selectedVendor.phone}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Metrics</p>
                                    <p className="text-sm text-gray-800 font-medium">Products: {selectedVendor.productsCount}</p>
                                    <p className="text-sm text-gray-800 font-medium flex items-center gap-1">Rating: {selectedVendor.rating > 0 ? selectedVendor.rating : 'N/A'} <FiStar className="text-admin-gold" fill="currentColor"/></p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-xl col-span-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Business Verification Documents</p>
                                    <div className="flex gap-4 mt-3">
                                        <div className="w-24 h-32 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">GSTIN</div>
                                        <div className="w-24 h-32 bg-gray-200 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-500">FSSAI</div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 italic">Note: Real document previews will render here.</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            {selectedVendor.status !== 'Blocked' && (
                                <button onClick={() => { handleStatusChange(selectedVendor._id, 'Blocked'); setSelectedVendor(null); }} className="px-6 py-2 bg-white border border-red-200 text-red-600 rounded-lg text-sm font-bold hover:bg-red-50 transition-all">
                                    Block Vendor
                                </button>
                            )}
                            {selectedVendor.status !== 'Approved' && (
                                <button onClick={() => { handleStatusChange(selectedVendor._id, 'Approved'); setSelectedVendor(null); }} className="px-6 py-2 bg-green-500 text-white rounded-lg text-sm font-bold hover:bg-green-600 transition-all">
                                    Approve Vendor
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminVendors;
