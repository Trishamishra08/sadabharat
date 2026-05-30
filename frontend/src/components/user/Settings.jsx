import React, { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import { useShop } from '../../context/ShopContext';

const Settings = () => {
  const { user } = useShop();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate updating user details
    console.log('Updated user details:', formData);
    alert('User details updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-2 md:pt-4 pb-12 font-sans selection:bg-[#054425] selection:text-white">
      <div className="w-full px-4 lg:px-8 flex flex-col lg:flex-row gap-6">
        
        <ProfileSidebar activeTab="settings" />
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#054425] mb-1">Settings</h1>
              <p className="text-xs text-gray-500 font-medium">Update your account information</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-5">
              
              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#054425] focus:border-[#054425] block p-2.5 transition-colors" 
                  placeholder="John Doe" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#054425] focus:border-[#054425] block p-2.5 transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-2">Mobile Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-[#054425] focus:border-[#054425] block p-2.5 transition-colors" 
                  placeholder="9876543210" 
                />
              </div>

              <div className="pt-2">
                <button type="submit" className="bg-[#054425] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#04331c] transition-colors shadow-md">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
