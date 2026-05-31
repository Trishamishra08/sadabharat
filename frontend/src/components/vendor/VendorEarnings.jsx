import React from 'react';
import { IndianRupee, CreditCard, TrendingUp, Download } from 'lucide-react';

const VendorEarnings = () => {
  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Earnings & Revenue</h1>
          <p className="text-sm text-gray-500 mt-1 font-poppins">Track your sales revenue and platform commissions.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 shadow-sm">
          <Download size={16} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Today's Earnings", value: '₹4,520', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
          { title: 'Weekly Earnings', value: '₹28,450', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Monthly Earnings', value: '₹1,25,680', icon: CreditCard, color: 'text-[#054425]', bg: 'bg-green-50' },
          { title: 'Commission (15%)', value: '₹18,852', icon: TrendingUp, color: 'text-red-500', bg: 'bg-red-50', invert: true },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 text-[12px] font-medium font-poppins mb-1">{stat.title}</p>
                <h3 className={`text-2xl font-black ${stat.invert ? 'text-red-500' : 'text-gray-900'}`}>{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
        <h3 className="font-bold text-gray-900 mb-6 text-lg">Revenue Chart</h3>
        <div className="w-full h-64 bg-gray-50/50 rounded-xl border border-gray-100 flex items-center justify-center border-dashed">
          <p className="text-gray-400 text-sm font-medium">Interactive Line Chart Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default VendorEarnings;
