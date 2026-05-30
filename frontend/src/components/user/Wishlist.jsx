import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProfileSidebar from './ProfileSidebar';

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useShop();

  return (
    <div className="min-h-screen bg-[#F8F9FA] pt-4 md:pt-6 pb-12 font-sans selection:bg-[#054425] selection:text-white">
      <div className="w-full px-4 lg:px-8 flex flex-col lg:flex-row gap-6">
        
        <ProfileSidebar activeTab="wishlist" />
        
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-2">
            <div>
              <h1 className="text-3xl font-serif font-bold text-[#054425] mb-1">My Wishlist</h1>
              <p className="text-xs text-gray-500 font-medium">Saved Items: {wishlist.length}</p>
            </div>
            <Link to="/shop" className="text-[11px] font-bold text-[#054425] border-b border-transparent hover:border-[#054425] transition-all flex items-center gap-1">
              Continue Shopping <FiArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-4 md:p-5 shadow-sm min-h-[400px]">
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                <AnimatePresence mode="popLayout">
                  {wishlist.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative group bg-white rounded-xl p-2 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:border-[#054425]/20 transition-colors"
                    >
                      <ProductCard product={product} compact={true} />
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-3 left-3 z-40 bg-white p-1.5 rounded-md text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50 border border-gray-100"
                        title="Remove from wishlist"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-20 text-center flex flex-col items-center justify-center h-full"
              >
                <div className="w-16 h-16 bg-[#FFF5E6] rounded-full flex items-center justify-center mx-auto mb-4 text-[#B8860B]">
                  <FiHeart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 mb-6 max-w-sm mx-auto">
                  Save items you love to your wishlist. Review them anytime and easily move them to your bag.
                </p>
                <Link
                  to="/shop"
                  className="px-6 py-2.5 bg-[#054425] text-white text-xs font-bold rounded-lg shadow-md hover:bg-[#04331c] transition-colors"
                >
                  Explore Products
                </Link>
              </motion.div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Wishlist;
