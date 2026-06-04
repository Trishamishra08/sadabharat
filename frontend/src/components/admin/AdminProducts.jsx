import React, { useState, useEffect, useCallback } from 'react';
import AdminLayout from './AdminLayout';
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiX,
  FiImage,
  FiChevronDown,
  FiFilter,
  FiStar,
  FiArrowLeft,
  FiUploadCloud,
  FiCheckCircle,
  FiXCircle
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

// MOCK API for Frontend-Only mode
const api = {
  get: async () => ({ data: { data: { products: [], categories: [], banners: [], settings: {}, orders: [], users: [], stats: [], recentTransactions: [], dailyRevenue: [], vendors: [], blogs: [], returns: [], testimonials: [], reviews: [], replacements: [], supportTickets: [], locations: [], coupons: [], logs: [] }, status: 'success' } }),
  post: async () => ({ data: { data: { order: { orderId: 'MOCK-ORDER-123' } }, status: 'success' } }),
  patch: async () => ({ data: { status: 'success' } }),
  delete: async () => ({ data: { status: 'success' } })
};



const BRA_SIZES = ['32B', '34B', '36B', '38B', '40B', '32C', '34C', '36C', '38C', '40C'];
const GENERAL_SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

const AdminProducts = () => {
  const { products, categories, fetchData } = useShop();
  const [searchParams] = useSearchParams();
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [customSize, setCustomSize] = useState('');
  const [filter, setFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    category: '',
    subCategory: '',
    price: '',
    stock: 100,
    about: [],
    skinType: 'All',
    skinConcern: 'All',
    gallery: [],
    brand: '',
    sizes: [],
    hasSizes: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Prevent negative price or stock
    if ((name === 'price' || name === 'stock') && parseFloat(value) < 0) {
      setForm(prev => ({ ...prev, [name]: '0' }));
      return;
    }

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = URL.createObjectURL(file);
      setForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAboutChange = (index, value) => {
    const newAbout = [...form.about];
    newAbout[index] = value;
    setForm(prev => ({ ...prev, about: newAbout }));
  };

  const addAboutPoint = () => {
    setForm(prev => ({ ...prev, about: [...(prev.about || []), ''] }));
  };

  const removeAboutPoint = (index) => {
    const newAbout = form.about.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, about: newAbout }));
  };

  const handleSizeChange = (index, value) => {
    const newSizes = [...form.sizes];
    newSizes[index] = value;
    setForm(prev => ({ ...prev, sizes: newSizes }));
  };

  const handleAddCustomSize = (e) => {
    if (e) e.preventDefault();
    if (customSize.trim()) {
      const size = customSize.trim().toUpperCase();
      setForm(prev => {
        const currentSizes = Array.isArray(prev.sizes) ? prev.sizes : [];
        if (!currentSizes.includes(size)) {
          return { ...prev, sizes: [...currentSizes, size] };
        }
        return prev;
      });
      setCustomSize('');
    }
  };

  const removeSize = (index) => {
    const newSizes = form.sizes.filter((_, i) => i !== index);
    setForm(prev => ({ ...prev, sizes: newSizes }));
  };

  const toggleQuickSize = (size) => {
    setForm(prev => {
      const currentSizes = Array.isArray(prev.sizes) ? prev.sizes : [];
      if (currentSizes.includes(size)) {
        return { ...prev, sizes: currentSizes.filter(s => s !== size) };
      } else {
        return { ...prev, sizes: [...currentSizes, size] };
      }
    });
  };

  // Handle Filtering and Searching
  const filteredProducts = products.filter(p => {
    // Status Filter
    const pStatus = p.status || 'active';
    const matchesStatus = statusFilter === 'All' || pStatus === statusFilter.toLowerCase();

    // Category Filter
    const matchesFilter = filter === 'All Categories' || p.category === filter;

    // Search Query (Name, ID, or direct price match)
    const searchLower = searchQuery.toLowerCase().trim();
    const nameMatch = (p.name || '').toLowerCase().includes(searchLower);
    const skuMatch = String(p._id).toLowerCase().includes(searchLower);
    const priceMatch = searchQuery !== '' && String(p.price).includes(searchLower);
    const matchesSearch = searchQuery === '' || nameMatch || skuMatch || priceMatch;

    // Range Filters
    const pPrice = Number(p.price);
    const min = minPrice !== '' ? Number(minPrice) : -Infinity;
    const max = maxPrice !== '' ? Number(maxPrice) : Infinity;

    const matchesMinPrice = pPrice >= min;
    const matchesMaxPrice = pPrice <= max;

    return matchesStatus && matchesFilter && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const handleStatusChange = async (id, newStatus) => {
    if (window.confirm(`Are you sure you want to ${newStatus} this product?`)) {
      try {
        await api.patch(`/products/${id}`, { status: newStatus });
        fetchData();
      } catch (err) {
        alert('Failed to update status: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this product permanently from the sacred catalog?')) {
      try {
        await api.delete(`/products/${id}`);
        fetchData(); // Refresh global products
      } catch (err) {
        alert('Failed to remove product: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      subCategory: product.subCategory || '',
      price: product.price,
      stock: product.stock,
      image: product.image,
      description: product.description || '',
      badge: product.badge || '',
      about: product.about || [],
      skinType: product.skinType || 'All',
      skinConcern: product.skinConcern || 'All',
      gallery: product.gallery || [],
      brand: product.brand || '',
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      hasSizes: Array.isArray(product.sizes) && product.sizes.length > 0
    });
    setIsAdding(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.image) {
      alert('Please fill out Name, Category, Price, and Image.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        status: 'active',
        about: (Array.isArray(form.about) ? form.about : []).filter(point => typeof point === 'string' && point.trim() !== ''), // Clean empty points
        sizes: form.hasSizes ? (Array.isArray(form.sizes) ? form.sizes : []).filter(size => typeof size === 'string' && size.trim() !== '') : [] // Empty sizes if not enabled
      };

      console.log('Saving product with payload:', payload);

      if (editingProduct) {
        await api.patch(`/products/${editingProduct._id}`, payload);
      } else {
        await api.post('/products', payload);
      }

      setIsAdding(false);
      setEditingProduct(null);
      setForm({ name: '', brand: '', category: '', subCategory: '', price: '', stock: 100, image: '', description: '', badge: '', about: [], skinType: 'All', skinConcern: 'All', gallery: [], sizes: [], hasSizes: false });
      fetchData();
    } catch (err) {
      console.error('Error saving product:', err);
      console.error('Error response:', err.response?.data);
      alert('Error saving product: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setIsAdding(true);
      setEditingProduct(null);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-10">
      <AnimatePresence mode="wait">
        {!isAdding ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-2">
                  Products
                </h1>
                <p className="text-gray-500 text-[13px] font-poppins">
                  Manage your product listings and inventory.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setForm({ name: '', brand: '', category: '', subCategory: '', price: '', stock: 100, image: '', description: '', badge: '', about: [], skinType: 'All', skinConcern: 'All', gallery: [], sizes: [] });
                  setIsAdding(true);
                }}
                className="bg-admin-dark text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-black transition-all"
              >
                <FiPlus size={16} /> Add New Product
              </button>
            </div>

            {/* Compact Filter Bar */}
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input
                  type="text"
                  placeholder="Search products by name..."
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[11px] font-medium outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  className="bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg px-3 py-2 text-[11px] font-bold outline-none cursor-pointer"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All Categories</option>
                  {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                </select>

                <select
                  className="bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg px-3 py-2 text-[11px] font-bold outline-none cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>

                <button
                  onClick={() => { setFilter('All Categories'); setStatusFilter('All'); setSearchQuery(''); setMinPrice(''); setMaxPrice(''); }}
                  className="bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg px-4 py-2 text-[11px] font-bold text-gray-600 transition-all"
                >
                  All
                </button>

                <div className="flex items-center gap-1 bg-gray-50 border border-transparent rounded-lg px-2 py-1">
                  <span className="text-[10px] text-gray-400 font-bold px-1">₹</span>
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-12 bg-transparent border-none outline-none text-[11px] font-bold"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="text-gray-300">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-12 bg-transparent border-none outline-none text-[11px] font-bold"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Product Table - High Density */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-sm font-sans font-medium text-gray-500 capitalize tracking-normal">PRODUCT NAME</th>
                      <th className="px-6 py-4 text-sm font-sans font-medium text-gray-500 capitalize tracking-normal">BRAND</th>
                      <th className="px-6 py-4 text-sm font-sans font-medium text-gray-500 capitalize tracking-normal">CATEGORY</th>
                      <th className="px-6 py-4 text-sm font-sans font-medium text-gray-500 capitalize tracking-normal">PLACEMENT</th>
                      <th className="px-6 py-4 text-sm font-sans font-medium text-gray-500 capitalize tracking-normal">PRICE</th>
                      <th className="px-4 py-4 text-sm font-sans font-medium text-gray-500 capitalize tracking-normal text-center">STATUS</th>
                      <th className="px-4 py-4 text-sm font-sans font-medium text-gray-500 capitalize tracking-normal text-center">ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredProducts.length > 0 ? filteredProducts.map(p => (
                      <tr key={p._id} className="hover:bg-gray-50/30 transition-colors group">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1 flex-shrink-0">
                              <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium font-sans text-gray-800 group-hover:text-admin-accent transition-colors line-clamp-1 max-w-[200px]">{p.name}</span>
                              <span className="text-[9px] text-admin-accent font-bold uppercase tracking-wider">ID: {p._id.slice(-6).toUpperCase()}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs font-black text-gray-400 uppercase tracking-wider">{p.brand || 'Generic'}</span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs font-bold text-gray-600">{p.category}</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[9px] font-bold uppercase rounded leading-none">{p.subCategory || 'General'}</span>
                            {p.badge && (
                              <span className="px-2 py-0.5 bg-admin-accent/5 text-admin-accent text-[9px] font-bold uppercase rounded leading-none max-w-[80px] truncate">{p.badge}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs font-bold text-gray-800">₹{p.price}</span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-black uppercase leading-none ${
                            (p.status || 'active') === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                            (p.status || 'active') === 'rejected' ? 'bg-red-50 text-red-600' :
                            p.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {(p.status || 'active') === 'pending' ? 'Pending' : (p.status || 'active') === 'rejected' ? 'Rejected' : `${p.stock} Units`}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-1">
                            {(p.status || 'active') === 'pending' && (
                              <>
                                <button onClick={() => handleStatusChange(p._id, 'active')} className="p-1.5 hover:bg-green-50 text-gray-400 hover:text-green-500 rounded-lg transition-colors" title="Approve Product"><FiCheckCircle size={13} /></button>
                                <button onClick={() => handleStatusChange(p._id, 'rejected')} className="p-1.5 hover:bg-orange-50 text-gray-400 hover:text-orange-500 rounded-lg transition-colors" title="Reject Product"><FiXCircle size={13} /></button>
                              </>
                            )}
                            <button onClick={() => handleEdit(p)} className="p-1.5 hover:bg-blue-50 text-gray-400 hover:text-blue-500 rounded-lg transition-colors" title="Edit Product"><FiEdit2 size={13} /></button>
                            <button onClick={() => handleDelete(p._id)} className="p-1.5 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors" title="Delete Product"><FiTrash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr><td colSpan="7" className="py-12 text-center text-[10px] font-black uppercase text-gray-400 tracking-widest">No Products Match The Filter</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="add"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Create Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsAdding(false)}
                  className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-800 hover:shadow-md transition-all shadow-sm flex-shrink-0"
                >
                  <FiArrowLeft size={16} />
                </button>
                <div>
                  <h1 className="text-3xl font-['Cormorant',_serif] font-bold text-admin-dark leading-none mb-2">
                    {editingProduct ? 'Update Product Details' : 'Initialize New Product'}
                  </h1>
                  <p className="text-gray-500 text-[13px] font-poppins">
                    Store Metadata & Inventory Management
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => setIsAdding(false)} className="text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-admin-dark">Discard</button>
                <button
                  onClick={handleSaveProduct}
                  disabled={isSubmitting || isUploading}
                  className="bg-admin-dark text-white px-7 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-black transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Syncing...' : (isUploading ? 'Uploading Visual...' : (editingProduct ? 'Commit Edits' : 'Publish Product'))}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 font-sans">
              {/* Left Column: Visuals & Labels */}
              <div className="lg:col-span-4 space-y-4">
                {/* Visual Gallery */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <h3 className="text-base font-sans font-bold text-admin-dark capitalize tracking-wide">Visual Gallery (Portrait/Main)</h3>
                  <div
                    onClick={() => document.getElementById('product-upload').click()}
                    className="aspect-[4/3] bg-gray-50 rounded-xl border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 overflow-hidden relative cursor-pointer hover:bg-admin-accent/[0.02] transition-all"
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center animate-pulse gap-2">
                        <FiUploadCloud className="text-admin-accent animate-bounce" size={24} />
                        <span className="text-[10px] font-black text-admin-accent uppercase tracking-widest">Uploading...</span>
                      </div>
                    ) : form.image ? (
                      <img src={form.image} alt="Preview" className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="flex flex-col items-center space-y-2 text-gray-300">
                        <FiImage size={32} />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Main Product Shot</span>
                      </div>
                    )}
                    <input id="product-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                  </div>

                  {/* Multi-Angle Gallery */}
                  <div className="pt-3 border-t border-gray-50 mt-4">
                    <h3 className="text-base font-sans font-bold text-gray-600 capitalize tracking-wide mb-3">Multi-Angle Perspective</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['FRONT', 'SIDE', 'BACK'].map((angle, idx) => (
                        <div
                          key={angle}
                          onClick={() => document.getElementById(`gallery-upload-${idx}`).click()}
                          className="aspect-square bg-gray-50 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center relative cursor-pointer group overflow-hidden"
                        >
                          {form.gallery?.[idx] ? (
                            <img src={form.gallery[idx]} alt={angle} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-1 text-gray-300 group-hover:text-admin-accent transition-colors">
                              <FiImage size={16} />
                              <span className="text-[7px] font-black">{angle}</span>
                            </div>
                          )}
                          <input
                            id={`gallery-upload-${idx}`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (!file) return;
                              setIsUploading(true);
                              try {
                                console.log(`Uploading ${angle} view image:`, file.name);
                                const url = URL.createObjectURL(file);
                                console.log(`Successfully uploaded ${angle} view:`, url);
                                const newGallery = [...(form.gallery || [])];
                                newGallery[idx] = url;
                                setForm(prev => ({ ...prev, gallery: newGallery }));
                              } catch (err) {
                                console.error(`Error uploading ${angle} view:`, err);
                                alert(`Failed to upload ${angle} view: ${err.message}`);
                              } finally {
                                setIsUploading(false);
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Display Labels */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-base font-sans font-bold text-admin-dark capitalize tracking-wide">Card Display Properties</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-400 lowercase italic">Badge Promo (e.g. BESTSELLER)</label>
                      <input type="text" name="badge" value={form.badge} onChange={handleInputChange} placeholder="NEW ARRIVAL" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all uppercase" />
                    </div>
                    <div className="space-y-1 pt-2">
                      <label className="text-[9px] font-bold text-gray-400 lowercase italic">Units in Stock (no. to stock)</label>
                      <input type="number" name="stock" value={form.stock} onChange={handleInputChange} min="0" placeholder="100" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner" />
                    </div>
                  </div>
                </div>


                {/* About This Item Selection */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-sans font-bold text-admin-dark capitalize tracking-wide">ABOUT THIS ITEM</h3>
                    <button type="button" onClick={addAboutPoint} className="text-[9px] font-black text-admin-accent uppercase hover:underline flex items-center gap-1">
                      <FiPlus size={10} /> Add Point
                    </button>
                  </div>
                  <div className="space-y-2">
                    {form.about?.map((point, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => handleAboutChange(idx, e.target.value)}
                          placeholder={`Point ${idx + 1}...`}
                          className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner"
                        />
                        <button type="button" onClick={() => removeAboutPoint(idx)} className="text-red-300 hover:text-red-500 transition-colors">
                          <FiTrash2 size={12} />
                        </button>
                      </div>
                    ))}
                    {form.about?.length === 0 && (
                      <p className="text-center py-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 text-[8px] font-bold text-gray-300 uppercase tracking-widest">No Bullet Points Added</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Core Info */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-base font-sans font-bold text-admin-dark capitalize tracking-wide">Core Information</h3>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500">Product Title <span className="text-red-500">*</span></label>
                        <input type="text" name="name" value={form.name} onChange={handleInputChange} placeholder="e.g. Gold Floral Ring" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500">Price (₹) <span className="text-red-500">*</span></label>
                        <input type="number" name="price" min="0" value={form.price} onChange={handleInputChange} placeholder="1000" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner" required />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Brand Name</label>
                      <input type="text" name="brand" value={form.brand} onChange={handleInputChange} placeholder="e.g. Lakmé" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[11px] font-bold outline-none focus:border-gray-300 transition-all shadow-inner" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Description</label>
                      <textarea name="description" value={form.description} onChange={handleInputChange} placeholder="Tell us more about the product features..." className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[11px] font-medium outline-none h-24 focus:border-gray-300 transition-all resize-none shadow-inner"></textarea>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] font-bold text-gray-500">Master Category <span className="text-red-500">*</span></label>
                      </div>
                      <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-2">
                        <div className="relative">
                          <select name="category" value={form.category} onChange={handleInputChange} className="w-full bg-white border border-gray-100 rounded-lg px-3 py-2.5 text-xs font-bold outline-none focus:border-gray-300 transition-all appearance-none cursor-pointer text-gray-700 shadow-sm" required>
                            <option value="">Select Category Assignment Form</option>
                            {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                          </select>
                          <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider flex justify-between">
                    <span>Navigation Sub-Placement</span>
                    <span className="text-gray-400 font-normal normal-case">Optional</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['SKINCARE', 'MAKEUP', 'SOAPS', 'WELLNESS', 'ARTIFICIAL JEWELLERY', 'INNERWEAR', 'HAIRCARE', 'COMBOS', 'NEW LAUNCH'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setForm(prev => ({ ...prev, subCategory: tag }))}
                        className={`py-2 px-3 border rounded-lg transition-all text-[9px] font-bold uppercase tracking-widest leading-none ${form.subCategory === tag ? 'bg-admin-accent/10 border-admin-accent/40 text-admin-accent shadow-inner' : 'bg-gray-50 border-gray-100 text-gray-400 hover:bg-white hover:border-gray-300'}`}
                      >
                        {tag}
                      </button>
                    ))}
                    {form.subCategory && (
                      <button type="button" onClick={() => setForm(prev => ({ ...prev, subCategory: '' }))} className="py-2 px-3 bg-red-50 text-red-500 text-[9px] font-bold uppercase tracking-widest rounded-lg hover:bg-red-100 transition-all border border-red-100">
                        Clear Tag
                      </button>
                    )}
                  </div>
                </div>

                {/* Dermatological Mapping (Filters) */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-5">
                  {/* Skin Type */}
                  <div className="space-y-3">
                    <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Skin Type Mapping</h3>
                    <div className="grid grid-cols-5 gap-2">
                      {['Dry', 'Oily', 'Combo', 'Sensitive', 'All'].map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, skinType: type === 'Combo' ? 'Combination' : type }))}
                          className={`py-2 border rounded-lg transition-all text-[8px] font-black uppercase tracking-widest ${form.skinType === (type === 'Combo' ? 'Combination' : type) ? 'bg-admin-dark text-white border-admin-dark shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skin Concern */}
                  <div className="space-y-3 pt-2 border-t border-gray-50">
                    <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Targeted Concern</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Acne', 'Pigmentation', 'Anti-Aging', 'Glow', 'All'].map(concern => (
                        <button
                          key={concern}
                          type="button"
                          onClick={() => setForm(prev => ({ ...prev, skinConcern: concern }))}
                          className={`py-2 px-4 border rounded-lg transition-all text-xs font-sans font-bold uppercase tracking-widest ${form.skinConcern === concern ? 'bg-admin-accent text-white border-admin-accent shadow-lg' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200'}`}
                        >
                          {concern}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Sizes Management - Dynamic & Optional */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mt-4 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Product Size Variations</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <label className="relative inline-flex items-center cursor-pointer scale-75 -ml-2">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={form.hasSizes}
                              onChange={(e) => setForm(prev => ({ ...prev, hasSizes: e.target.checked }))}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-admin-accent"></div>
                          </label>
                          <p className="text-[8px] text-gray-400 font-medium uppercase tracking-widest">{form.hasSizes ? 'Enabled' : 'Disabled (One-Size)'}</p>
                        </div>
                      </div>
                      {form.hasSizes && (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={customSize}
                            onChange={(e) => setCustomSize(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomSize(e)}
                            placeholder="Add Custom (e.g. 42B)"
                            className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-bold outline-none focus:border-admin-accent transition-all w-32"
                          />
                          <button type="button" onClick={handleAddCustomSize} className="w-8 h-8 rounded-lg bg-admin-accent text-white flex items-center justify-center hover:bg-admin-dark transition-all shadow-md active:scale-95">
                            <FiPlus size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {form.hasSizes && (
                      <>
                        {/* Quick Select Presets */}
                        <div className="space-y-4 pt-2 border-t border-gray-50">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Bra Size Presets</p>
                              <div className="flex flex-wrap gap-1.5">
                                {BRA_SIZES.map(size => (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => toggleQuickSize(size)}
                                    className={`px-2 py-1.5 rounded-md text-[9px] font-bold transition-all border ${
                                      form.sizes?.includes(size)
                                        ? 'bg-admin-accent text-white border-admin-accent shadow-md'
                                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">General Presets</p>
                              <div className="flex flex-wrap gap-1.5">
                                {GENERAL_SIZES.map(size => (
                                  <button
                                    key={size}
                                    type="button"
                                    onClick={() => toggleQuickSize(size)}
                                    className={`px-2 py-1.5 rounded-md text-[9px] font-bold transition-all border ${
                                      form.sizes?.includes(size)
                                        ? 'bg-admin-dark text-white border-admin-dark shadow-md'
                                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-300'
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="space-y-3 pt-4 border-t border-gray-50">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Active Selections</p>
                            <div className="flex flex-wrap gap-2">
                              {Array.isArray(form.sizes) && form.sizes.map((size, idx) => (
                                <div key={idx} className="flex items-center bg-admin-dark text-white rounded-md pl-3 pr-1 py-1 gap-2 shadow-sm animate-in fade-in zoom-in duration-200">
                                  <span className="text-[9px] font-black uppercase tracking-wider">{size}</span>
                                  <button type="button" onClick={() => removeSize(idx)} className="p-1 hover:bg-white/20 rounded transition-colors text-white/50 hover:text-white">
                                    <FiX size={10} />
                                  </button>
                                </div>
                              ))}
                              {(!form.sizes || form.sizes.length === 0) && (
                                <p className="w-full text-center py-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200 text-[8px] font-bold text-gray-300 uppercase tracking-widest">No sizes defined</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
