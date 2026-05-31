import React from 'react';
import { Search, Filter, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const VendorInventory = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Inventory Management</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Monitor stock levels and manage your warehouse.</p>
        </div>
      </div>
      
      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
        <motion.div 
          initial={{ opacity: 0, rotateX: 90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-[#FFF0F0] border border-red-100 p-4 rounded-xl flex items-center gap-4 shadow-sm"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm"><AlertCircle size={20} /></div>
          <div>
            <p className="text-[11px] font-bold text-red-600 uppercase tracking-wide mb-0.5">Out of Stock</p>
            <h3 className="text-xl font-medium text-gray-800 font-sans">1</h3>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, rotateX: 90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="bg-[#FFF8E1] border border-orange-100 p-4 rounded-xl flex items-center gap-4 shadow-sm"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-500 shadow-sm"><AlertTriangle size={20} /></div>
          <div>
            <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wide mb-0.5">Low Stock</p>
            <h3 className="text-xl font-medium text-gray-800 font-sans">4</h3>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, rotateX: 90 }}
          whileInView={{ opacity: 1, rotateX: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="bg-[#E8F5E9] border border-green-100 p-4 rounded-xl flex items-center gap-4 shadow-sm"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#2E7D32] shadow-sm"><CheckCircle2 size={20} /></div>
          <div>
            <p className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wide mb-0.5">Healthy Stock</p>
            <h3 className="text-xl font-medium text-gray-800 font-sans">42</h3>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search SKU or Product..." 
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 text-[12px] font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={14} /> Filters
            </button>
            <select className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 outline-none hover:bg-gray-50 cursor-pointer">
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
                <th className="px-4 py-3 font-semibold">Product & SKU</th>
                <th className="px-4 py-3 font-semibold">Current Stock</th>
                <th className="px-4 py-3 font-semibold">Low Stock Alert</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Last Updated</th>
                <th className="px-4 py-3 font-semibold text-right">Update Stock</th>
              </tr>
            </thead>
            <tbody className="text-[12px] text-gray-800">
              {[
                { name: 'AMLA Powder', sku: 'SB-AP-100', stock: 0, alert: 10, updated: 'Today, 10:30 AM', status: 'Out of Stock' },
                { name: 'BHRINGRAJ Hair Oil', sku: 'SB-BHO-200', stock: 12, alert: 20, updated: 'Yesterday', status: 'Low Stock' },
                { name: 'NEEM TULSI Face Wash', sku: 'SB-NTFW-100', stock: 45, alert: 15, updated: 'May 28, 2024', status: 'Healthy' },
                { name: 'ASHWAGANDHA Capsules', sku: 'SB-AC-60', stock: 120, alert: 20, updated: 'May 25, 2024', status: 'Healthy' },
              ].map((item, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <p className="font-medium text-gray-800 leading-tight">{item.name}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">{item.sku}</p>
                  </td>
                  <td className="px-4 py-2.5 font-medium font-sans text-[13px] text-gray-800">{item.stock}</td>
                  <td className="px-4 py-2.5 text-gray-500 font-medium">at {item.alert} units</td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      item.status === 'Healthy' ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]' : 
                      item.status === 'Low Stock' ? 'bg-[#FFF8E1] text-[#F9A825] border border-[#FFECB3]' : 
                      'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-gray-500 text-[11px] font-medium">{item.updated}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex justify-end items-center gap-2">
                       <input type="number" defaultValue={item.stock} className="w-14 px-2 py-1 border border-gray-200 rounded-md text-[11px] text-center outline-none focus:border-[#054425]" />
                       <button className="px-2.5 py-1 border border-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors text-[11px]">Save</button>
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
