import React, { useState } from 'react';
import { Upload, X, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendorAddProduct = () => {
  const [images, setImages] = useState([]);

  // Mock handling drag and drop or file select
  const handleFileChange = (e) => {
    // Just mock adding placeholder images for the UI
    if (images.length < 4) {
      setImages([...images, `https://via.placeholder.com/150?text=Image+${images.length + 1}`]);
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 pb-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/vendor/products" className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors shadow-sm">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Add New Product</h1>
            <p className="text-sm text-gray-500 mt-1 font-poppins">Fill in the details to list your product.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl text-sm shadow-sm hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
          <button className="px-5 py-2.5 bg-[#054425] text-white font-bold rounded-xl text-sm shadow-sm hover:bg-[#04331c] transition-colors">
            Submit Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">General Information</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Product Name</label>
                <input type="text" placeholder="e.g. Organic Neem Tulsi Face Wash" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Description</label>
                <textarea rows="4" placeholder="Write a detailed product description..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins resize-none"></textarea>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Ingredients</label>
                  <textarea rows="3" placeholder="e.g. Neem extract, Tulsi oil..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Benefits</label>
                  <textarea rows="3" placeholder="e.g. Clears acne, Purifies skin..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Product Media</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
               <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} multiple accept="image/*" />
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-[#054425]">
                 <Upload size={24} />
               </div>
               <p className="text-sm font-bold text-gray-900 mb-1">Click to upload or drag & drop</p>
               <p className="text-xs text-gray-500 font-poppins">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>

            {images.length > 0 && (
              <div className="flex gap-4 mt-6 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-xl border border-gray-200 overflow-hidden shrink-0 group">
                    <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center text-red-500 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={14} />
                    </button>
                    {idx === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#054425]/80 text-white text-[9px] font-bold text-center py-1">MAIN</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Pricing & Stock</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Selling Price (₹)</label>
                <input type="number" placeholder="299" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">MRP (₹)</label>
                <input type="number" placeholder="399" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Stock Quantity</label>
                <input type="number" placeholder="100" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">SKU</label>
                <input type="text" placeholder="SB-NTFW-100" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins uppercase" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
            <h3 className="font-bold text-gray-900 mb-5 text-lg">Organization</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins text-gray-700">
                  <option>Select Category</option>
                  <option>Skin Care</option>
                  <option>Hair Care</option>
                  <option>Wellness</option>
                  <option>Soaps</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Sub Category</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins text-gray-700">
                  <option>Select Sub Category</option>
                  <option>Face Wash</option>
                  <option>Toner</option>
                  <option>Serum</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Tags</label>
                <input type="text" placeholder="e.g. acne, organic, vegan" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-poppins" />
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 rounded-[20px] p-5 flex items-start gap-3">
             <div className="mt-0.5 text-blue-600"><CheckCircle size={18} /></div>
             <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">Approval Process</h4>
                <p className="text-xs text-blue-800/80 font-poppins leading-relaxed">After submission, your product will be reviewed by our admin team within 24 hours before going live.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAddProduct;
