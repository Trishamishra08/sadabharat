import React from 'react';
import { IndianRupee, CreditCard, TrendingUp, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const VendorEarnings = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Earnings & Revenue</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Track your sales revenue and platform commissions.</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[12px] font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
          <Download size={14} /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Today's Earnings", value: '₹4,520', icon: IndianRupee, color: 'text-[#2E7D32]', bg: 'bg-[#E8F5E9]' },
          { title: 'Weekly Earnings', value: '₹28,450', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'Monthly Earnings', value: '₹1,25,680', icon: CreditCard, color: 'text-[#F9A825]', bg: 'bg-[#FFF8E1]' },
          { title: 'Commission (15%)', value: '₹18,852', icon: TrendingUp, color: 'text-[#C62828]', bg: 'bg-[#FFEBEE]', invert: true },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.1 }}
            className={`${stat.bg} p-4 rounded-xl shadow-sm border border-white/50 flex flex-col justify-between`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className={`text-[11px] font-bold uppercase tracking-wide mb-1 ${stat.invert ? 'text-red-700' : 'text-gray-700'}`}>{stat.title}</p>
                <h3 className="text-lg font-medium text-gray-800 font-sans tracking-tight">{stat.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm ${stat.color}`}>
                <stat.icon size={18} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-4 text-[13px]">Revenue Chart</h3>
          <div className="flex-1 relative h-48 bg-indigo-50/40 border border-indigo-100/50 rounded-xl overflow-hidden flex items-end pt-4 pr-4">
             <svg viewBox="0 0 500 150" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="earningsGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <motion.path 
                  d="M0,120 C20,120 40,80 60,80 S80,100 100,100 S120,40 140,40 S160,70 180,70 S200,30 220,30 S240,60 260,60 S280,20 300,20 S320,50 340,50 S360,10 380,10 S400,35 420,35 S450,15 500,15 L500,150 L0,150 Z" 
                  fill="url(#earningsGradient)" 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 }}
                />
                <motion.path 
                  d="M0,120 C20,120 40,80 60,80 S80,100 100,100 S120,40 140,40 S160,70 180,70 S200,30 220,30 S240,60 260,60 S280,20 300,20 S320,50 340,50 S360,10 380,10 S400,35 420,35 S450,15 500,15" 
                  fill="none" 
                  stroke="#6366f1" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 3, ease: "linear" }}
                />
                
                {/* Data points */}
                {[
                  {x: 60, y: 80, val: "₹12,400"}, {x: 100, y: 100, val: "₹9,200"}, {x: 140, y: 40, val: "₹18,500"}, 
                  {x: 180, y: 70, val: "₹14,100"}, {x: 220, y: 30, val: "₹21,000"}, {x: 260, y: 60, val: "₹16,400"}, 
                  {x: 300, y: 20, val: "₹24,000"}, {x: 340, y: 50, val: "₹17,800"}, {x: 380, y: 10, val: "₹28,450"},
                  {x: 420, y: 35, val: "₹22,100"}, {x: 500, y: 15, val: "₹25,600"}
                ].map((point, index) => (
                  <motion.circle 
                    key={index}
                    cx={point.x} cy={point.y} r="2.5" 
                    fill="white" stroke="#6366f1" strokeWidth="1.5" 
                    className="cursor-pointer hover:stroke-[3px] hover:r-[3.5px] transition-all"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1 + (index * 0.1), type: "spring" }}
                  >
                    <title>{point.val}</title>
                  </motion.circle>
                ))}
             </svg>
             <div className="absolute left-2 top-0 h-full flex flex-col justify-between text-[9px] text-gray-400 pb-6 pt-2 font-medium">
                <span>₹30K</span>
                <span>₹20K</span>
                <span>₹10K</span>
                <span>₹0</span>
             </div>
             <div className="absolute bottom-1.5 left-10 right-4 flex justify-between text-[9px] text-gray-400 font-medium">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorEarnings;
