import React from 'react';
import { Search, Filter, Eye, MoreHorizontal, PackageOpen, Truck, CheckCircle2 } from 'lucide-react';

const VendorOrders = () => {
  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1 font-poppins">Track and process your customer orders.</p>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search Order ID, Customer..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <select className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50">
              <option>All Statuses</option>
              <option>Processing</option>
              <option>Packed</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <input type="date" className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status Update</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-800">
              {[
                { id: '#SB12345678', customer: 'Rohit Sharma', product: 'NEEM TULSI Face Wash', amount: '₹1,250', date: 'May 31, 2024', status: 'Delivered' },
                { id: '#SB12345679', customer: 'Neha Verma', product: 'BHRINGRAJ Hair Oil (x2)', amount: '₹890', date: 'May 31, 2024', status: 'Processing' },
                { id: '#SB12345680', customer: 'Amit Patel', product: 'ASHWAGANDHA Capsules', amount: '₹2,450', date: 'May 30, 2024', status: 'Packed' },
                { id: '#SB12345681', customer: 'Pooja Singh', product: 'AMLA Powder', amount: '₹1,150', date: 'May 30, 2024', status: 'Shipped' },
              ].map((order, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{order.product}</td>
                  <td className="px-6 py-4 font-black">{order.amount}</td>
                  <td className="px-6 py-4 text-gray-500">{order.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <select 
                        defaultValue={order.status}
                        className={`text-xs font-bold px-2 py-1.5 rounded-lg border outline-none ${
                          order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                          order.status === 'Packed' ? 'bg-purple-50 border-purple-200 text-purple-700' :
                          'bg-yellow-50 border-yellow-200 text-yellow-700'
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Packed">Packed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      {['Packed', 'Shipped'].includes(order.status) && (
                        <input type="text" placeholder="Tracking #" className="w-24 px-2 py-1.5 border border-gray-200 rounded-lg text-xs" />
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
