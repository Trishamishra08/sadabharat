import React from 'react';
import { Store, Building, CreditCard, Save } from 'lucide-react';

const VendorSettings = () => {
  return (
    <div className="space-y-6 pb-10 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Store Settings</h1>
        <p className="text-sm text-gray-500 mt-1 font-poppins">Manage your business profile and preferences.</p>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><Store size={18} className="text-[#054425]" /> Business Information</h3>
        </div>
        <div className="p-6 space-y-5">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Store Name</label>
               <input type="text" defaultValue="Herbal Essence" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">GST Number</label>
               <input type="text" defaultValue="27AADCB2230M1Z2" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins uppercase" />
             </div>
           </div>
           <div>
             <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Store Description</label>
             <textarea rows="3" defaultValue="Premium organic ayurvedic products manufactured with traditional methods." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins resize-none"></textarea>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
           <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg"><Building size={18} className="text-[#054425]" /> Pickup Address</h3>
        </div>
        <div className="p-6 space-y-5">
           <div>
             <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Complete Address</label>
             <input type="text" defaultValue="42, Herbal Park, Phase 2, Industrial Area" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">City</label>
               <input type="text" defaultValue="Mumbai" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">State</label>
               <input type="text" defaultValue="Maharashtra" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
             </div>
             <div>
               <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Pincode</label>
               <input type="text" defaultValue="400001" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
             </div>
           </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button className="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button className="px-6 py-3 bg-[#054425] text-white font-bold rounded-xl shadow-sm hover:bg-[#04331c] transition-colors flex items-center gap-2">
          <Save size={18} /> Update Settings
        </button>
      </div>
    </div>
  );
};

export default VendorSettings;
