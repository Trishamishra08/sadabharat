import React from 'react';
import { Search, Filter, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

const VendorInventory = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1 font-poppins">Monitor stock levels and manage your warehouse.</p>
        </div>
      </div>
      
      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
        <div className="bg-red-50 border border-red-100 p-5 rounded-[20px] flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm"><AlertCircle size={24} /></div>
          <div>
            <p className="text-[12px] font-bold text-red-600 uppercase tracking-wide mb-0.5">Out of Stock</p>
            <h3 className="text-2xl font-black text-red-900 font-serif">1</h3>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-100 p-5 rounded-[20px] flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-[12px] font-bold text-orange-600 uppercase tracking-wide mb-0.5">Low Stock</p>
            <h3 className="text-2xl font-black text-orange-900 font-serif">4</h3>
          </div>
        </div>
        <div className="bg-green-50 border border-green-100 p-5 rounded-[20px] flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm"><CheckCircle2 size={24} /></div>
          <div>
            <p className="text-[12px] font-bold text-green-700 uppercase tracking-wide mb-0.5">Healthy Stock</p>
            <h3 className="text-2xl font-black text-green-900 font-serif">42</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search SKU or Product..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filters
            </button>
            <select className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50">
              <option>All Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Product & SKU</th>
                <th className="px-6 py-4 font-semibold">Current Stock</th>
                <th className="px-6 py-4 font-semibold">Low Stock Alert</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right">Update Stock</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-800">
              {[
                { name: 'AMLA Powder', sku: 'SB-AP-100', stock: 0, alert: 10, updated: 'Today, 10:30 AM', status: 'Out of Stock' },
                { name: 'BHRINGRAJ Hair Oil', sku: 'SB-BHO-200', stock: 12, alert: 20, updated: 'Yesterday', status: 'Low Stock' },
                { name: 'NEEM TULSI Face Wash', sku: 'SB-NTFW-100', stock: 45, alert: 15, updated: 'May 28, 2024', status: 'Healthy' },
                { name: 'ASHWAGANDHA Capsules', sku: 'SB-AC-60', stock: 120, alert: 20, updated: 'May 25, 2024', status: 'Healthy' },
              ].map((item, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900 leading-tight">{item.name}</p>
                    <p className="text-[11px] text-gray-500">{item.sku}</p>
                  </td>
                  <td className="px-6 py-4 font-black font-sans text-[15px]">{item.stock}</td>
                  <td className="px-6 py-4 text-gray-500">at {item.alert} units</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 font-bold text-[12px] ${
                      item.status === 'Healthy' ? 'text-green-600' : 
                      item.status === 'Low Stock' ? 'text-orange-500' : 
                      'text-red-500'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'Healthy' ? 'bg-green-500' : 
                        item.status === 'Low Stock' ? 'bg-orange-500' : 
                        'bg-red-500'
                      }`}></div>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-[12px]">{item.updated}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                       <input type="number" defaultValue={item.stock} className="w-16 px-2 py-1.5 border border-gray-200 rounded-md text-sm text-center outline-none focus:border-[#054425]" />
                       <button className="px-3 py-1.5 bg-gray-100 text-gray-700 font-bold rounded-md hover:bg-gray-200 transition-colors text-xs">Save</button>
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

export default VendorInventory;
