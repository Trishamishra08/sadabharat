import React from 'react';
import { BarChart3, PieChart, Activity } from 'lucide-react';

const VendorAnalytics = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Analytics</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Detailed insights into your store's performance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 h-64 flex flex-col justify-between">
          <h3 className="font-bold text-gray-900 text-[13px] flex items-center gap-2"><BarChart3 size={16} className="text-gray-400"/> Monthly Traffic</h3>
          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg mt-3 flex items-center justify-center border-dashed">
            <span className="text-[12px] text-gray-400 font-medium">Traffic Chart Placeholder</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 h-64 flex flex-col justify-between">
          <h3 className="font-bold text-gray-900 text-[13px] flex items-center gap-2"><PieChart size={16} className="text-gray-400"/> Sales by Category</h3>
          <div className="flex-1 bg-gray-50 border border-gray-100 rounded-lg mt-3 flex items-center justify-center border-dashed">
            <span className="text-[12px] text-gray-400 font-medium">Category Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAnalytics;
