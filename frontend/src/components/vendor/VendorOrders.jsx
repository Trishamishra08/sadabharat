import React from 'react';
import { Search, Filter, Eye, MoreHorizontal, PackageOpen, Truck, CheckCircle2 } from 'lucide-react';

const VendorOrders = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Order Management</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Track and process your customer orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        <div className="p-3 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search Order ID, Customer..." 
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <select className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 outline-none hover:bg-gray-50 cursor-pointer">
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <input type="date" className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 outline-none hover:bg-gray-50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status Update</th>
              </tr>
            </thead>
            <tbody className="text-[12px] text-gray-800">
              {[
                { id: '#SB12345678', customer: 'Rohit Sharma', product: 'NEEM TULSI Face Wash', amount: '₹1,250', date: 'May 31, 2024', status: 'Delivered' },
                { id: '#SB12345679', customer: 'Neha Verma', product: 'BHRINGRAJ Hair Oil (x2)', amount: '₹890', date: 'May 31, 2024', status: 'Processing' },
                { id: '#SB12345680', customer: 'Amit Patel', product: 'ASHWAGANDHA Capsules', amount: '₹2,450', date: 'May 30, 2024', status: 'Packed' },
                { id: '#SB12345681', customer: 'Pooja Singh', product: 'AMLA Powder', amount: '₹1,150', date: 'May 30, 2024', status: 'Shipped' },
              ].map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5 font-medium text-gray-800">{order.id}</td>
                  <td className="px-4 py-2.5 font-medium">{order.customer}</td>
                  <td className="px-4 py-2.5 text-gray-600 font-medium">{order.product}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-800">{order.amount}</td>
                  <td className="px-4 py-2.5 text-gray-500 font-medium">{order.date}</td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      <select 
                        defaultValue={order.status}
                        className={`text-[10px] font-bold px-2 py-1 rounded border outline-none cursor-pointer ${
                          order.status === 'Delivered' ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]' :
                          order.status === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                          order.status === 'Packed' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                          'bg-[#FFF8E1] text-[#F9A825] border-[#FFECB3]'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      {['Packed', 'Shipped'].includes(order.status) && (
                        <input type="text" placeholder="Tracking #" className="w-20 px-2 py-1 border border-gray-200 rounded text-[11px] outline-none focus:border-[#054425]" />
                      )}
                    </div>
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

export default VendorOrders;
