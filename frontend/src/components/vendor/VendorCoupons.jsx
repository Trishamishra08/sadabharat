import React from 'react';
import { Tag, Plus } from 'lucide-react';

const VendorCoupons = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Coupons</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Manage your discount codes and promotions.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#054425] text-white rounded-lg text-[12px] font-medium shadow-sm hover:bg-[#04331c] transition-colors">
          <Plus size={14} /> Create Coupon
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="px-4 py-3 font-semibold">Code</th>
                <th className="px-4 py-3 font-semibold">Discount</th>
                <th className="px-4 py-3 font-semibold">Usage</th>
                <th className="px-4 py-3 font-semibold">Expiry Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-[12px] text-gray-800">
              {[
                { code: 'SUMMER20', discount: '20% OFF', usage: '45/100', expiry: 'Jun 30, 2024', status: 'Active' },
                { code: 'WELCOME10', discount: '10% OFF', usage: 'Unlimited', expiry: 'Dec 31, 2024', status: 'Active' },
                { code: 'FLASH50', discount: '₹50 OFF', usage: '500/500', expiry: 'May 15, 2024', status: 'Expired' },
              ].map((coupon, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                       <Tag size={14} className="text-[#388E3C]" />
                       <span className="font-medium text-gray-800">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 font-medium text-gray-800">{coupon.discount}</td>
                  <td className="px-4 py-2.5 text-gray-600 font-medium">{coupon.usage}</td>
                  <td className="px-4 py-2.5 text-gray-500 font-medium">{coupon.expiry}</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      coupon.status === 'Active' ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]' : 'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'
                    }`}>
                      {coupon.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VendorCoupons;
