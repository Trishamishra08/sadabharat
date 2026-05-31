import React, { useState } from 'react';
import { Upload, X, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const VendorAddProduct = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    window.showVendorToast?.('Product submitted successfully!', 'success');
    navigate('/vendor/products');
  };

  const handleSaveDraft = () => {
    window.showVendorToast?.('Draft saved successfully!', 'success');
  };

  return (
    <div className="space-y-4 pb-6 max-w-[1400px] mx-auto -mt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 leading-tight">Add New Product</h1>
            <p className="text-[12px] text-gray-500 mt-0.5 font-sans">Fill in the details to list your product.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSaveDraft} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg text-[12px] shadow-sm hover:bg-gray-50 transition-colors">
            Save Draft
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#054425] text-white font-medium rounded-lg text-[12px] shadow-sm hover:bg-[#04331c] transition-colors">
            Submit Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 text-[13px]">General Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Product Name</label>
                <input type="text" placeholder="e.g. Organic Neem Tulsi Face Wash" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Description</label>
                <textarea rows="3" placeholder="Write a detailed product description..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800 resize-none"></textarea>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Ingredients</label>
                  <textarea rows="2" placeholder="e.g. Neem extract, Tulsi oil..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Benefits</label>
                  <textarea rows="2" placeholder="e.g. Clears acne, Purifies skin..." className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800 resize-none"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 text-[13px]">Product Media</h3>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
               <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} multiple accept="image/*" />
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-[#054425]">
                 <Upload size={20} />
               </div>
               <p className="text-[12px] font-bold text-gray-900 mb-0.5">Click to upload or drag & drop</p>
               <p className="text-[10px] text-gray-500 font-sans">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>

            {images.length > 0 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-20 h-20 rounded-lg border border-gray-200 overflow-hidden shrink-0 group">
                    <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                    <button onClick={() => removeImage(idx)} className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={12} />
                    </button>
                    {idx === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-[#054425]/80 text-white text-[8px] font-bold text-center py-0.5">MAIN</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 text-[13px]">Pricing & Stock</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Selling Price (₹)</label>
                <input type="number" placeholder="299" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">MRP (₹)</label>
                <input type="number" placeholder="399" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Stock Quantity</label>
                <input type="number" placeholder="100" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">SKU</label>
                <input type="text" placeholder="SB-NTFW-100" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800 uppercase" />
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-3 text-[13px]">Organization</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Category</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-700">
                  <option>Select Category</option>
                  <option>Skin Care</option>
                  <option>Hair Care</option>
                  <option>Wellness</option>
                  <option>Soaps</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Sub Category</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-700">
                  <option>Select Sub Category</option>
                  <option>Face Wash</option>
                  <option>Toner</option>
                  <option>Serum</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-700 mb-1 uppercase tracking-wide">Tags</label>
                <input type="text" placeholder="e.g. acne, organic, vegan" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[12px] focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] font-sans font-medium text-gray-800" />
              </div>
            </div>
          </div>
          
          <div className="bg-[#F0F7F2] border border-[#C8E6C9] rounded-xl p-3 flex items-start gap-2">
             <div className="mt-0.5 text-[#388E3C]"><CheckCircle size={14} /></div>
             <div>
                <h4 className="text-[11px] font-bold text-[#1B5E20] mb-0.5">Approval Process</h4>
                <p className="text-[10px] text-[#2E7D32] font-sans font-medium leading-relaxed">After submission, your product will be reviewed by our admin team within 24 hours before going live.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorAddProduct;
