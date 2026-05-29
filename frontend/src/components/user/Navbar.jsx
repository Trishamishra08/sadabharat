// Sada Bharat Ayurvedic Store Header Component
import React, { useState } from 'react';
import { FiHeart, FiShoppingCart, FiUser, FiMenu, FiX, FiHome, FiPercent, FiGrid, FiBell, FiClock, FiSearch, FiChevronDown } from 'react-icons/fi';
import api from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import logo from '../../assets/images/WhatsApp_Image_2026-05-26_at_1.34.49_PM-removebg-preview.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, wishlistCount, setIsCartDrawerOpen, isAuthenticated, user, categories } = useShop();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(2); // Mockup badge 2 matching image
  const [isAnimatingCart, setIsAnimatingCart] = useState(false);
  const prevCartCountRef = React.useRef(cartCount);
  
  const [isAnimatingWishlist, setIsAnimatingWishlist] = useState(false);
  const prevWishlistCountRef = React.useRef(wishlistCount);

  React.useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setIsAnimatingCart(true);
      const timer = setTimeout(() => setIsAnimatingCart(false), 400);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  React.useEffect(() => {
    if (wishlistCount > prevWishlistCountRef.current) {
      setIsAnimatingWishlist(true);
      const timer = setTimeout(() => setIsAnimatingWishlist(false), 400);
      return () => clearTimeout(timer);
    }
    prevWishlistCountRef.current = wishlistCount;
  }, [wishlistCount]);

  // Prevent navbar from showing on admin routes
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  React.useEffect(() => {
    if (isAuthenticated) {
      const fetchNotifications = async () => {
        try {
          const res = await api.get('/notifications/my-notifications');
          if (res.data.data.notifications) {
            setNotifications(res.data.data.notifications);
            setUnreadCount(res.data.data.notifications.filter(n => !n.read).length);
          }
        } catch (err) { console.error(err); }
      };
      fetchNotifications();
      const interval = setInterval(fetchNotifications, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, location]);

  const markAllRead = async () => {
    try {
      await api.patch('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) { console.error(err); }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const menuItems = [
    { name: 'Home', link: '/' },
    { name: 'Categories', link: '/shop', hasDropdown: true },
    { name: 'Shop', link: '/shop' },
    { name: 'Offers', link: '/offers', hasDropdown: true, isOffers: true },
    { name: 'Best Sellers', link: '/shop?sort=popular' },
    { name: 'Consultation', link: '/consultation' },
    { name: 'Blog', link: '/blog' },
    { name: 'About Us', link: '/about' },
    { name: 'Contact', link: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full shadow-sm bg-white"
    >
      {/* ROW 1: Branding, Search & Main Icons (Super Compact with Soft Premium Herbal Gradient) */}
      <div className="py-2 border-b border-gray-100" style={{ background: 'linear-gradient(135deg, #F5F9F6 0%, #E2ECE5 100%)' }}>
        <div className="w-full px-2 flex items-center justify-between gap-4">
          
          {/* Left Column: Logo Brand Block aligned to the left corner (No Overlap) */}
          <div className="flex items-center justify-start shrink-0">
            <Link to="/" className="flex items-center gap-2.5 md:gap-3.5 cursor-pointer group">
              <img
                src={logo}
                alt="Sada Bharat Logo"
                className="h-12 md:h-16 w-auto object-contain transition-transform group-hover:scale-105"
              />
              
              <div className="flex flex-col leading-none select-none">
                {/* website name styled as a proper heading */}
                <h1 
                  className="text-base md:text-xl font-black uppercase whitespace-nowrap"
                  style={{ 
                    fontFamily: "'Cormorant Garamond', serif", 
                    color: '#054425', 
                    letterSpacing: '0.2px' 
                  }}
                >
                  Sada Bharat
                </h1>
                
                {/* tagline "AYURVEDIC" underneath with elegant gold lines */}
                <div className="flex items-center gap-1 md:gap-1.5 w-full justify-center mt-0.5 md:mt-1">
                  <span className="h-[1px] bg-[#D4AF37] flex-1"></span>
                  <span 
                    className="text-[6.5px] md:text-[8px] uppercase tracking-[0.2em] text-[#054425] font-black"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Ayurvedic
                  </span>
                  <span className="h-[1px] bg-[#D4AF37] flex-1"></span>
                </div>
              </div>
            </Link>
          </div>

          {/* Center Column: Perfectly Centered Search Bar (Premium Capsule Shape) */}
          <div className="hidden md:flex flex-1 justify-center max-w-3xl mx-6">
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="relative w-full flex">
                <div className="relative flex-1">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    type="text"
                    placeholder="Search Ayurvedic products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-l-full pl-10 pr-4 py-2 md:py-2.5 text-xs md:text-sm font-medium text-gray-700 focus:bg-white focus:border-[#054425] outline-none transition-all placeholder:text-gray-400 font-sans"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 bg-[#054425] hover:bg-[#1E4D2B] text-white rounded-r-full flex items-center justify-center transition-colors"
                >
                  <FiSearch size={14} />
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Icons Grid on the right side */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-8 text-[#054425] shrink-0 font-sans select-none ml-auto md:ml-0 md:pr-4 lg:pr-8">
            
            {/* Notification Bell */}
            <div className="relative flex items-center justify-center">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="cursor-pointer hover:scale-105 transition-transform flex flex-col items-center justify-center gap-1 group"
              >
                <div className="relative p-1">
                  <FiBell className="text-lg md:text-xl" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium hidden md:block">Alerts</span>
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationsOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-14 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                    >
                      <div className="bg-[#054425] p-3.5 flex justify-between items-center">
                        <h3 className="text-[10px] font-black uppercase text-white tracking-widest">Alerts</h3>
                        {unreadCount > 0 && (
                          <button onClick={markAllRead} className="text-[8px] font-black uppercase text-[#D4AF37] hover:text-white transition-colors">Mark all read</button>
                        )}
                      </div>
                      <div className="max-h-80 overflow-y-auto scrollbar-hide">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">No Alerts</p>
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <Link
                              key={n._id}
                              to="/profile?tab=orders"
                              onClick={() => setIsNotificationsOpen(false)}
                              className={`p-4 flex gap-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.read ? 'bg-[#054425]/5' : ''}`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!n.read ? 'bg-[#054425] text-white' : 'bg-gray-100 text-gray-400'}`}>
                                <FiClock size={12} />
                              </div>
                              <div>
                                <p className={`text-[10px] uppercase tracking-wider mb-1 ${!n.read ? 'font-black text-[#054425]' : 'font-bold text-gray-500'}`}>{n.title}</p>
                                <p className="text-[9px] text-gray-400 italic leading-snug">{n.body}</p>
                              </div>
                            </Link>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
 
            {/* Wishlist */}
            <Link to="/wishlist" className="flex flex-col items-center justify-center gap-1 group hover:scale-105 transition-transform">
              <motion.div 
                className="relative p-1"
                animate={isAnimatingWishlist ? { scale: [1, 1.3, 1], y: [0, -4, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <FiHeart className={`text-lg md:text-xl transition-colors ${isAnimatingWishlist ? 'text-red-500 fill-current' : 'text-[#054425]'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </motion.div>
              <span className="text-[10px] font-medium hidden md:block">Wishlist</span>
            </Link>
 
            {/* Cart */}
            <motion.div
              id="global-cart-icon"
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex flex-col items-center justify-center gap-1 cursor-pointer group hover:scale-105 transition-transform"
              animate={isAnimatingCart ? { scale: [1, 1.3, 1], y: [0, -4, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="relative p-1">
                <FiShoppingCart className={`text-lg md:text-xl transition-colors ${isAnimatingCart ? 'text-[#D4AF37]' : 'text-[#054425]'}`} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium hidden md:block">Cart</span>
            </motion.div>
 
            {/* Account */}
            <Link to={isAuthenticated ? "/profile" : "/login"} className="flex flex-col items-center justify-center gap-1 group hover:scale-105 transition-transform">
              <div className="p-1 flex items-center justify-center">
                {isAuthenticated ? (
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#054425] text-white flex items-center justify-center text-[10px] font-bold uppercase shadow-sm">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                ) : (
                  <FiUser className="text-lg md:text-xl text-[#054425]" />
                )}
              </div>
              <span className="text-[10px] font-medium hidden md:block">Account</span>
            </Link>
 
            {/* Mobile Sidebar toggle */}
            <button className="lg:hidden text-2xl p-1" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* ROW 2: Navigation Links Bar (Forest Green Background, Tighter Padding) */}
      <div className="hidden lg:block bg-[#054425] py-2">
        <div className="container mx-auto px-8 flex justify-center items-center">
          <div className="flex items-center gap-10">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group py-2">
                <Link
                  to={item.link}
                  className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-white hover:text-[#D4AF37] transition-colors relative py-0.5"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.hasIcon && <FiHome className="text-sm" />}
                  <span>{item.name}</span>
                  {item.hasDropdown && <FiChevronDown className="text-xs group-hover:rotate-180 transition-transform" />}
                  
                  {/* Active Indicator Underline matching image */}
                  {isActive(item.link) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-white rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>

                {/* Dropdowns */}
                {item.hasDropdown && (
                  <div className={`absolute top-full left-0 mt-0 ${item.isOffers ? 'w-64' : 'w-48'} bg-white shadow-xl rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden border border-gray-100`}>
                    {item.isOffers ? (
                      <>
                        {[
                          { text: "Up to 50% Off On Ayurvedic Skincare", link: "/offers?category=Skincare" },
                          { text: "Up to 30% Off On Herbal Haircare", link: "/offers?category=Haircare" },
                          { text: "Flat 20% Off On Wellness Supplements", link: "/offers?category=Wellness" },
                          { text: "Buy 1 Get 1 Free On Essential Oils", link: "/offers?category=Oils" }
                        ].map((offer, idx) => (
                          <Link
                            key={idx}
                            to={offer.link}
                            className="block px-4 py-3 text-[11px] text-gray-700 hover:text-[#054425] hover:bg-[#F4F8F5] transition-colors border-b border-gray-50 last:border-0 font-bold tracking-wide"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {offer.text}
                          </Link>
                        ))}
                      </>
                    ) : (
                      categories && categories.length > 0 && categories.map((cat, idx) => (
                        <Link
                          key={idx}
                          to={`/shop?category=${encodeURIComponent(cat.name)}`}
                          className="block px-4 py-2.5 text-xs text-gray-700 hover:text-[#054425] hover:bg-[#F4F8F5] transition-colors border-b border-gray-50 last:border-0 uppercase tracking-wider"
                          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
                        >
                          {cat.name}
                        </Link>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] lg:hidden flex"
          >
            <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
            <div className="w-4/5 bg-white h-full shadow-2xl p-6 relative overflow-y-auto">
              <button
                className="absolute top-6 right-6 text-2xl text-[#054425] outline-none"
                onClick={() => setIsOpen(false)}
              >
                <FiX />
              </button>

              <div className="mt-8 mb-8 flex flex-col items-center">
                <img
                  src={logo}
                  alt="Sada Bharat Logo"
                  className="h-28 w-auto object-contain"
                />
              </div>

              {/* Mobile Search input */}
              <form onSubmit={handleSearchSubmit} className="mb-6 flex relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F4F8F5] border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-xs font-semibold text-gray-700 outline-none"
                />
                <button type="submit" className="absolute right-0 top-0 bottom-0 px-3 text-[#054425]">
                  <FiSearch size={16} />
                </button>
              </form>

              <div className="flex flex-col gap-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    className={`pb-2.5 uppercase tracking-wider text-xs font-semibold border-b transition-colors ${isActive(item.link) ? 'text-[#054425] border-[#054425]/20' : 'text-gray-600 border-gray-100'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] px-6 py-2">
        <div className="flex justify-around items-center h-12">
          <Link to="/" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/' ? 'text-[#054425]' : 'text-gray-400'}`}>
            <FiHome className="text-xl" />
            <span className="text-[8px] font-bold uppercase tracking-wider">Home</span>
          </Link>
          <Link to="/shop" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/shop' ? 'text-[#054425]' : 'text-gray-400'}`}>
            <FiGrid className="text-xl" />
            <span className="text-[8px] font-bold uppercase tracking-wider">Shop</span>
          </Link>
          <Link to="/offers" className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/offers' ? 'text-[#054425]' : 'text-gray-400'}`}>
            <FiPercent className="text-xl" />
            <span className="text-[8px] font-bold uppercase tracking-wider">Offers</span>
          </Link>
          <Link to={isAuthenticated ? "/profile" : "/login"} className={`flex flex-col items-center gap-1 group transition-colors ${location.pathname === '/profile' || location.pathname === '/login' ? 'text-[#054425]' : 'text-gray-400'}`}>
            <FiUser className="text-xl" />
            <span className="text-[8px] font-bold uppercase tracking-wider">Account</span>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
