import React from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorProducts = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Products</h1>
          <p className="text-sm text-gray-500 mt-1 font-poppins">Manage your product listings and inventory.</p>
        </div>
        <Link to="/vendor/add-product" className="bg-[#054425] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-[#04331c] transition-colors flex items-center gap-2">
          <Plus size={18} /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins"
            />
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} /> Filters
            </button>
            <select className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 outline-none hover:bg-gray-50">
              <option>All Categories</option>
              <option>Skin Care</option>
              <option>Hair Care</option>
              <option>Wellness</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 font-semibold">Product</th>
                <th className="px-6 py-4 font-semibold">SKU</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-gray-800">
              {[
                { name: 'NEEM TULSI Face Wash', sku: 'SB-NTFW-100', cat: 'Skin Care', price: '₹299', stock: 45, status: 'Active' },
                { name: 'BHRINGRAJ Hair Oil', sku: 'SB-BHO-200', cat: 'Hair Care', price: '₹349', stock: 12, status: 'Low Stock' },
                { name: 'AMLA Powder', sku: 'SB-AP-100', cat: 'Wellness', price: '₹199', stock: 0, status: 'Out of Stock' },
                { name: 'ASHWAGANDHA Capsules', sku: 'SB-AC-60', cat: 'Wellness', price: '₹349', stock: 120, status: 'Active' },
                { name: 'ALOE VERA Gel', sku: 'SB-AVG-150', cat: 'Skin Care', price: '₹249', stock: 85, status: 'Active' },
              ].map((product, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg border border-gray-100 p-1 flex items-center justify-center shrink-0">
                        <img src="https://via.placeholder.com/40" alt={product.name} className="max-w-full max-h-full mix-blend-multiply" />
                      </div>
                      <span className="font-bold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{product.sku}</td>
                  <td className="px-6 py-4">{product.cat}</td>
                  <td className="px-6 py-4 font-bold">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${product.stock > 20 ? 'text-green-600' : product.stock > 0 ? 'text-orange-500' : 'text-red-500'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      product.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      product.status === 'Low Stock' ? 'bg-orange-100 text-orange-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-3">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors" title="View"><Eye size={16} /></button>
                      <button className="text-gray-400 hover:text-[#054425] transition-colors" title="Edit"><Edit2 size={16} /></button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500 font-poppins">
          <p>Showing 1 to 5 of 24 entries</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-[#054425] text-white rounded-lg font-medium">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
