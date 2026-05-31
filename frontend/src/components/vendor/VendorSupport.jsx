import React from 'react';
import { LifeBuoy, Mail, MessageCircle, Phone } from 'lucide-react';

const VendorSupport = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Support</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Get help and contact the platform administration.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center text-center hover:border-green-200 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-green-50 text-[#388E3C] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><MessageCircle size={20} /></div>
          <h3 className="font-bold text-gray-900 text-[13px] mb-1">Live Chat</h3>
          <p className="text-[11px] text-gray-500 font-medium">Chat with our support team instantly.</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center text-center hover:border-blue-200 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Mail size={20} /></div>
          <h3 className="font-bold text-gray-900 text-[13px] mb-1">Email Support</h3>
          <p className="text-[11px] text-gray-500 font-medium">vendor-help@sadabharat.com</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center text-center hover:border-orange-200 transition-colors cursor-pointer group">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"><Phone size={20} /></div>
          <h3 className="font-bold text-gray-900 text-[13px] mb-1">Call Us</h3>
          <p className="text-[11px] text-gray-500 font-medium">+91 1800-123-4567</p>
        </div>
      </div>
    </div>
  );
};

export default VendorSupport;
