import React from 'react';
import { Bell, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const VendorNotifications = () => {
  const notifications = [
    { type: 'success', title: 'Payout Processed', desc: 'Your payout of ₹45,000 was successful.', time: '2 hours ago', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
    { type: 'alert', title: 'Low Stock Alert', desc: 'AMLA Powder is out of stock. Please restock soon.', time: '5 hours ago', icon: AlertTriangle, color: 'text-orange-500', bg: 'bg-orange-50' },
    { type: 'info', title: 'New Feature Added', desc: 'Check out the new analytics dashboard.', time: '1 day ago', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Notifications</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Stay updated on your store's activity.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col">
        {notifications.map((notif, i) => (
          <div key={i} className="p-4 border-b border-gray-50 flex items-start gap-3 hover:bg-gray-50/50 transition-colors last:border-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.bg} ${notif.color}`}>
              <notif.icon size={16} />
            </div>
            <div>
              <p className="text-[13px] font-medium text-gray-800 mb-0.5">{notif.title}</p>
              <p className="text-[12px] text-gray-600 font-medium mb-1">{notif.desc}</p>
              <p className="text-[10px] text-gray-400 font-medium">{notif.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorNotifications;
