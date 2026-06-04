import React from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorProducts = () => {
  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Products</h1>
          <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Manage your product listings and inventory.</p>
        </div>
        <Link to="/vendor/add-product" className="bg-[#054425] text-white px-4 py-2 rounded-lg text-[12px] font-bold shadow-sm hover:bg-[#04331c] transition-colors flex items-center gap-1.5">
          <Plus size={16} /> Add New Product
        </Link>
      </div>

      <div className="bg-white rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 overflow-hidden">
        {/* Toolbar */}
        <div className="p-3 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-700 text-[12px] font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={14} /> Filters
            </button>
            <select className="flex-1 sm:flex-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[12px] font-medium text-gray-700 outline-none hover:bg-gray-50 cursor-pointer">
              <option>All Categories</option>
              <option>Skin Care</option>
              <option>Hair Care</option>
              <option>Wellness</option>
            </select>
          </div>
        </div>

        {/* Desktop View: Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[11px] text-gray-500 uppercase tracking-widest border-b border-gray-100">
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">SKU</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Stock</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[12px] text-gray-800">
              {[
                { name: 'NEEM TULSI Face Wash', sku: 'SB-NTFW-100', cat: 'Skin Care', price: '₹299', stock: 45, status: 'Approved' },
                { name: 'BHRINGRAJ Hair Oil', sku: 'SB-BHO-200', cat: 'Hair Care', price: '₹349', stock: 12, status: 'Pending' },
                { name: 'AMLA Powder', sku: 'SB-AP-100', cat: 'Wellness', price: '₹199', stock: 0, status: 'Rejected' },
                { name: 'ASHWAGANDHA Capsules', sku: 'SB-AC-60', cat: 'Wellness', price: '₹349', stock: 120, status: 'Approved' },
                { name: 'ALOE VERA Gel', sku: 'SB-AVG-150', cat: 'Skin Care', price: '₹249', stock: 85, status: 'Approved' },
              ].map((product, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-white rounded-md border border-gray-100 p-0.5 flex items-center justify-center shrink-0">
                        <img src="https://via.placeholder.com/40" alt={product.name} className="max-w-full max-h-full mix-blend-multiply" />
                      </div>
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-gray-500 font-medium">{product.sku}</td>
                  <td className="px-4 py-2.5 font-medium">{product.cat}</td>
                  <td className="px-4 py-2.5 font-medium text-gray-800">{product.price}</td>
                  <td className="px-4 py-2.5">
                    <span className={`font-semibold ${product.stock > 20 ? 'text-[#2E7D32]' : product.stock > 0 ? 'text-[#F9A825]' : 'text-[#C62828]'}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      product.status === 'Approved' ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]' : 
                      product.status === 'Pending' ? 'bg-[#FFF8E1] text-[#F9A825] border border-[#FFECB3]' : 
                      'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex justify-center items-center gap-2.5">
                      <button className="text-gray-400 hover:text-blue-600 transition-colors" title="View"><Eye size={14} /></button>
                      <button className="text-gray-400 hover:text-[#054425] transition-colors" title="Edit"><Edit2 size={14} /></button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Product Cards List */}
        <div className="block sm:hidden divide-y divide-gray-100">
          {[
            { name: 'NEEM TULSI Face Wash', sku: 'SB-NTFW-100', cat: 'Skin Care', price: '₹299', stock: 45, status: 'Approved' },
            { name: 'BHRINGRAJ Hair Oil', sku: 'SB-BHO-200', cat: 'Hair Care', price: '₹349', stock: 12, status: 'Pending' },
            { name: 'AMLA Powder', sku: 'SB-AP-100', cat: 'Wellness', price: '₹199', stock: 0, status: 'Rejected' },
            { name: 'ASHWAGANDHA Capsules', sku: 'SB-AC-60', cat: 'Wellness', price: '₹349', stock: 120, status: 'Approved' },
            { name: 'ALOE VERA Gel', sku: 'SB-AVG-150', cat: 'Skin Care', price: '₹249', stock: 85, status: 'Approved' },
          ].map((product, i) => (
            <div key={i} className="p-4 flex gap-3 items-start bg-white">
              <div className="w-12 h-12 bg-white rounded-lg border border-gray-100 p-1 flex items-center justify-center shrink-0">
                <img src="https://via.placeholder.com/40" alt={product.name} className="max-w-full max-h-full mix-blend-multiply" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/40"; }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="font-bold text-gray-900 text-[12px] truncate leading-tight">{product.name}</h4>
                  <span className="text-[12px] font-bold text-gray-900 shrink-0">{product.price}</span>
                </div>
                <p className="text-[10px] text-gray-400 font-medium font-sans mt-0.5">SKU: {product.sku}</p>
                <div className="flex items-center justify-between mt-2 gap-2">
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">{product.cat}</span>
                    <span className="text-[10px] font-bold">
                      Stock: <span className={product.stock > 20 ? 'text-[#2E7D32]' : product.stock > 0 ? 'text-[#F9A825]' : 'text-[#C62828]'}>{product.stock}</span>
                    </span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                    product.status === 'Approved' ? 'bg-[#E8F5E9] text-[#2E7D32] border border-[#C8E6C9]' : 
                    product.status === 'Pending' ? 'bg-[#FFF8E1] text-[#F9A825] border border-[#FFECB3]' : 
                    'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'
                  }`}>
                    {product.status}
                  </span>
                </div>
                {/* Actions row for mobile */}
                <div className="flex justify-end gap-3 mt-3 pt-2 border-t border-gray-50">
                  <button className="text-[11px] font-semibold text-gray-500 hover:text-blue-600 flex items-center gap-1" onClick={() => window.showVendorToast?.(`Viewing ${product.name}`)}><Eye size={12}/> View</button>
                  <button className="text-[11px] font-semibold text-gray-500 hover:text-[#054425] flex items-center gap-1" onClick={() => window.showVendorToast?.(`Editing ${product.name}`)}><Edit2 size={12}/> Edit</button>
                  <button className="text-[11px] font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1" onClick={() => window.showVendorToast?.(`Deleting ${product.name}`, 'warning')}><Trash2 size={12}/> Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="p-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500 font-sans font-medium">
          <p>Showing 1 to 5 of 24 entries</p>
          <div className="flex gap-1">
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors">Prev</button>
            <button className="px-2.5 py-1.5 bg-[#054425] text-white rounded-md font-bold shadow-sm">1</button>
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">2</button>
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">3</button>
            <button className="px-2.5 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProducts;
