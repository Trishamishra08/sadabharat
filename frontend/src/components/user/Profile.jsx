import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiShoppingBag, FiShoppingCart, FiHeart, FiStar, FiTag, FiEdit2, FiUser, FiMail, FiPhone, FiClock, FiCalendar, FiMapPin, FiCheck, FiLock, FiSettings, FiLogOut, FiBell, FiTrash2 
} from 'react-icons/fi';

import ProfileSidebar from './ProfileSidebar';
import api from '../../utils/api';

const Profile = () => {
  const { user, setUser, isAuthenticated, logout, wishlistCount, cartCount, setIsCartDrawerOpen } = useShop();
  const navigate = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({ title: '', addressLine: '', mobile: '', isDefault: false });
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    if (user) {
      api.get('/orders/my-orders').then(res => {
        if (res.data.success) {
          setTotalOrders(res.data.data.orders.length);
        }
      }).catch(err => console.error(err));
    }
  }, [isAuthenticated, navigate, user]);

  const handleAddressSave = async () => {
    setIsSaving(true);
    try {
      if (isAddingNew) {
        const res = await api.post('/users/addresses', addressForm);
        if (res.data.success) {
          const updatedUser = { ...user, addresses: res.data.data.addresses };
          setUser(updatedUser);
          setIsAddingNew(false);
          showNotification('Address added successfully!');
        }
      } else if (editingAddressId) {
        const res = await api.put(`/users/addresses/${editingAddressId}`, addressForm);
        if (res.data.success) {
          const updatedUser = { ...user, addresses: res.data.data.addresses };
          setUser(updatedUser);
          setEditingAddressId(null);
          showNotification('Address updated successfully!');
        }
      }
    } catch (err) {
      console.error('Failed to save address', err);
      showNotification('Failed to save address.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddressDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    try {
      const res = await api.delete(`/users/addresses/${id}`);
      if (res.data.success) {
        const updatedUser = { ...user, addresses: res.data.data.addresses };
        setUser(updatedUser);
        if (editingAddressId === id) setEditingAddressId(null);
        showNotification('Address deleted successfully!');
      }
    } catch (err) {
      console.error('Failed to delete address', err);
      showNotification('Failed to delete address.', 'error');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-4 md:pt-6 pb-12 font-sans selection:bg-[#054425] selection:text-white">
      <div className="w-full px-4 lg:px-8 flex flex-col lg:flex-row gap-6">
        
        <ProfileSidebar activeTab="profile" />

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 flex flex-col gap-3">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#054425] mb-1">My Profile</h1>
              <p className="text-xs text-gray-500 font-medium">Manage your personal information and account details</p>
            </div>
            <button 
              onClick={() => navigate('/settings')}
              className="bg-[#054425] text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#04331c] transition-colors shadow-md"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          </div>

          {/* Account Overview */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm">
            <h3 className="text-base font-serif font-bold text-gray-900 mb-4">Account Overview</h3>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
              
              <Link to="/orders" className="border border-[#054425]/10 rounded-xl p-2.5 md:p-3 flex flex-col justify-between group hover:border-[#054425]/30 transition-colors bg-[#F4F8F5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] block cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-[#054425] shrink-0 shadow-sm">
                    <FiShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Total Orders</p>
                    <p className="text-base md:text-lg font-bold text-[#054425] leading-none">{totalOrders}</p>
                  </div>
                </div>
                <div className="text-[9px] md:text-[10px] font-bold text-[#054425] flex items-center gap-1 group-hover:underline mt-auto">
                  View History &rarr;
                </div>
              </Link>

              <Link to="/wishlist" className="border border-[#B8860B]/10 rounded-xl p-2.5 md:p-3 flex flex-col justify-between group hover:border-[#B8860B]/30 transition-colors bg-[#FFF5E6] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] block cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-[#B8860B] shrink-0 shadow-sm">
                    <FiHeart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Wishlist Items</p>
                    <p className="text-base md:text-lg font-bold text-[#B8860B] leading-none">{wishlistCount}</p>
                  </div>
                </div>
                <div className="text-[9px] md:text-[10px] font-bold text-[#B8860B] flex items-center gap-1 group-hover:underline mt-auto">
                  View Wishlist &rarr;
                </div>
              </Link>

              <Link to="/reviews" className="border border-green-500/10 rounded-xl p-2.5 md:p-3 flex flex-col justify-between group hover:border-green-500/30 transition-colors bg-[#E6F4EA] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] block cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-green-700 shrink-0 shadow-sm">
                    <FiStar className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Reviews</p>
                    <p className="text-base md:text-lg font-bold text-green-700 leading-none">6</p>
                  </div>
                </div>
                <div className="text-[9px] md:text-[10px] font-bold text-green-700 flex items-center gap-1 group-hover:underline mt-auto">
                  View Reviews &rarr;
                </div>
              </Link>

              <Link to="/coupons" className="border border-pink-500/10 rounded-xl p-2.5 md:p-3 flex flex-col justify-between group hover:border-pink-500/30 transition-colors bg-pink-50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] block cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-pink-500 shrink-0 shadow-sm">
                    <FiTag className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Coupons</p>
                    <p className="text-base md:text-lg font-bold text-pink-600 leading-none">3</p>
                  </div>
                </div>
                <div className="text-[9px] md:text-[10px] font-bold text-pink-600 flex items-center gap-1 group-hover:underline mt-auto">
                  View Coupons &rarr;
                </div>
              </Link>

              {/* Cart Items Card */}
              <div onClick={() => setIsCartDrawerOpen(true)} className="border border-purple-500/10 rounded-xl p-2.5 md:p-3 flex flex-col justify-between group hover:border-purple-500/30 transition-colors bg-purple-50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] block cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
                    <FiShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </div>
                  <div>
                    <p className="text-[8px] md:text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-none mb-1">Cart Items</p>
                    <p className="text-base md:text-lg font-bold text-purple-600 leading-none">{cartCount || 0}</p>
                  </div>
                </div>
                <div className="text-[9px] md:text-[10px] font-bold text-purple-600 flex items-center gap-1 group-hover:underline mt-auto">
                  View Cart &rarr;
                </div>
              </div>

              {/* Order History card removed as requested */}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm">
            <h3 className="text-base font-serif font-bold text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-6">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F8F5] flex items-center justify-center text-[#054425] shrink-0">
                  <FiUser className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                  <p className="text-[13px] font-bold text-gray-900 mt-0.5">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F8F5] flex items-center justify-center text-[#054425] shrink-0">
                  <FiMail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                  <p className="text-[13px] font-bold text-gray-900 mt-0.5">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F8F5] flex items-center justify-center text-[#054425] shrink-0">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Mobile Number</p>
                  <p className="text-[13px] font-bold text-gray-900 mt-0.5">{user.mobile ? `+91 ${user.mobile}` : 'Not Provided'}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F4F8F5] flex items-center justify-center text-[#054425] shrink-0">
                  <FiUser className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Gender</p>
                  <p className="text-[13px] font-bold text-gray-900 mt-0.5 capitalize">{user.gender || 'Not Provided'}</p>
                </div>
              </div>

            </div>
          </div>

          {/* Saved Addresses */}
          <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-serif font-bold text-gray-900">Saved Addresses</h3>
              <button 
                onClick={() => { setEditingAddressId(null); setIsAddingNew(true); setAddressForm({ title: '', addressLine: '', mobile: user.mobile || '', isDefault: false }); }}
                className="text-[11px] font-bold text-[#054425] hover:underline"
              >
                + Add New Address
              </button>
            </div>
            
            {notification && (
              <div className={`p-3 rounded text-xs font-bold mb-4 ${notification.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {notification.msg}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {isAddingNew && (
                <div className="border border-[#054425]/30 rounded-xl p-4 relative bg-green-50/20">
                  <div className="flex flex-col gap-3 max-w-[90%]">
                    <div className="flex items-center gap-2">
                      <input type="text" placeholder="Title (e.g. Home)" value={addressForm.title} onChange={(e) => setAddressForm({...addressForm, title: e.target.value})} className="text-xs font-bold text-gray-900 bg-transparent border-b border-gray-200 focus:border-[#054425] outline-none px-1 py-0.5 w-1/2" />
                    </div>
                    <textarea 
                      placeholder="Full Address"
                      value={addressForm.addressLine}
                      onChange={(e) => setAddressForm({...addressForm, addressLine: e.target.value})}
                      className="text-xs text-gray-600 bg-white border border-gray-200 rounded p-2 focus:outline-none focus:border-[#054425] resize-none h-16 w-full"
                    />
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="isDefaultNew" checked={addressForm.isDefault} onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})} className="rounded text-[#054425]" />
                      <label htmlFor="isDefaultNew" className="text-[10px] text-gray-600">Set as Default</label>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <button onClick={handleAddressSave} disabled={isSaving} className={`text-[10px] font-bold text-white px-3 py-1.5 rounded transition-colors ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#054425] hover:bg-[#04331c]'}`}>{isSaving ? 'Saving...' : 'Save'}</button>
                      <button onClick={() => setIsAddingNew(false)} disabled={isSaving} className="text-[10px] font-bold bg-gray-200 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors">Cancel</button>
                    </div>
                  </div>
                </div>
              )}

              {user.addresses && user.addresses.map((address) => (
                <div key={address._id} className="border border-gray-100 rounded-xl p-4 relative hover:border-[#054425]/30 transition-colors bg-white">
                  <button 
                    onClick={() => {
                      setIsAddingNew(false);
                      if (editingAddressId === address._id) {
                        setEditingAddressId(null);
                      } else {
                        setEditingAddressId(address._id);
                        setAddressForm({
                          title: address.title,
                          addressLine: address.addressLine,
                          mobile: user.mobile || address.mobile || '',
                          isDefault: address.isDefault
                        });
                      }
                    }}
                    className="absolute top-4 right-10 flex items-center justify-center text-gray-400 hover:text-[#054425] transition-colors"
                  >
                    <FiEdit2 className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => handleAddressDelete(address._id)}
                    className="absolute top-4 right-4 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>

                  {editingAddressId === address._id ? (
                    <div className="flex flex-col gap-3 max-w-[90%]">
                      <div className="flex items-center gap-2">
                        <input type="text" value={addressForm.title} onChange={(e) => setAddressForm({...addressForm, title: e.target.value})} className="text-xs font-bold text-gray-900 bg-transparent border-b border-gray-200 focus:border-[#054425] outline-none px-1 py-0.5 w-1/2" />
                      </div>
                      <textarea 
                        value={addressForm.addressLine}
                        onChange={(e) => setAddressForm({...addressForm, addressLine: e.target.value})}
                        className="text-xs text-gray-600 bg-white border border-gray-200 rounded p-2 focus:outline-none focus:border-[#054425] resize-none h-16 w-full"
                      />
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id={`isDefault-${address._id}`} checked={addressForm.isDefault} onChange={(e) => setAddressForm({...addressForm, isDefault: e.target.checked})} className="rounded text-[#054425]" />
                        <label htmlFor={`isDefault-${address._id}`} className="text-[10px] text-gray-600">Set as Default</label>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <button onClick={handleAddressSave} disabled={isSaving} className={`text-[10px] font-bold text-white px-3 py-1.5 rounded transition-colors ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#054425] hover:bg-[#04331c]'}`}>{isSaving ? 'Saving...' : 'Save'}</button>
                        <button onClick={() => setEditingAddressId(null)} disabled={isSaving} className="text-[10px] font-bold bg-gray-200 text-gray-700 px-3 py-1.5 rounded hover:bg-gray-300 transition-colors">Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        {address.isDefault && <span className="bg-[#E6F0E9] text-[#054425] text-[9px] font-bold px-2 py-0.5 rounded uppercase">Default</span>}
                        <span className="text-xs font-bold text-gray-900">{address.title}</span>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed max-w-[85%] whitespace-pre-wrap">
                        {address.addressLine}<br/>
                        <span className="text-gray-900 font-medium mt-1 inline-block">{address.mobile ? `+91 ${address.mobile}` : ''}</span>
                      </p>
                    </>
                  )}
                </div>
              ))}
              
              {!isAddingNew && (!user.addresses || user.addresses.length === 0) && (
                <div className="col-span-2 text-center py-6 text-gray-400 text-xs">
                  No addresses saved yet.
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM BANNER (Features) */}
      <div className="w-full px-4 lg:px-8 mt-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-x divide-gray-50">
            
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#054425] shrink-0">
                <FiShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 leading-tight">Free Delivery</p>
                <p className="text-[9px] text-gray-500 mt-0.5">On orders above ₹499</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 md:px-4">
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#054425] shrink-0">
                <FiClock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 leading-tight">7 Days Return</p>
                <p className="text-[9px] text-gray-500 mt-0.5">Easy Returns</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 md:px-4">
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#054425] shrink-0">
                <FiLock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 leading-tight">100% Secure Payments</p>
                <p className="text-[9px] text-gray-500 mt-0.5">Safe & Trusted</p>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 md:px-4">
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-[#054425] shrink-0">
                <FiStar className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-900 leading-tight">Authentic Products</p>
                <p className="text-[9px] text-gray-500 mt-0.5">100% Ayurvedic</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Profile;
