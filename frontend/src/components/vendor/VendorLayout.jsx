import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, PlusCircle, Archive, 
  ShoppingCart, RotateCcw, IndianRupee, CreditCard, 
  Tag, Star, Bell, TrendingUp, HelpCircle, Settings,
  Search, MessageSquare, Menu, X
} from 'lucide-react';

const VendorLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const navItems = [
    { name: 'Dashboard', path: '/vendor', icon: LayoutDashboard },
    { name: 'Products', path: '/vendor/products', icon: Package },
    { name: 'Add Product', path: '/vendor/add-product', icon: PlusCircle },
    { name: 'Inventory', path: '/vendor/inventory', icon: Archive },
    { name: 'Orders', path: '/vendor/orders', icon: ShoppingCart },
    { name: 'Returns', path: '/vendor/returns', icon: RotateCcw },
    { name: 'Earnings', path: '/vendor/earnings', icon: IndianRupee },
    { name: 'Payouts', path: '/vendor/payouts', icon: CreditCard },
    { name: 'Coupons', path: '/vendor/coupons', icon: Tag },
    { name: 'Reviews', path: '/vendor/reviews', icon: Star },
    { name: 'Notifications', path: '/vendor/notifications', icon: Bell, badge: 3 },
    { name: 'Analytics', path: '/vendor/analytics', icon: TrendingUp },
    { name: 'Support', path: '/vendor/support', icon: HelpCircle },
    { name: 'Settings', path: '/vendor/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#FDFBF7] font-poppins overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#054425] text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain rounded-full" onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/40"; }} />
            </div>
            <div>
              <h1 className="font-serif font-black text-lg tracking-wide leading-tight">SADA BHARAT</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-white/70">Ayurvedic</p>
            </div>
          </div>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide min-h-0">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/vendor'}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-white/10 text-white font-medium shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm' 
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} className="shrink-0" />
                <span className="text-sm font-medium font-poppins">{item.name}</span>
              </div>
              {item.badge && (
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Bottom Card */}
        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-4 text-center backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-0 right-0 w-16 h-16 bg-brand-gold/20 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
             <h4 className="text-sm font-bold text-white mb-1">Grow Your Business</h4>
             <p className="text-xs text-white/70 mb-3 leading-relaxed">Increase your visibility and boost sales with Sada Bharat.</p>
             <button className="w-full bg-white text-[#054425] text-xs font-bold py-2 rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
               Learn More
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-gray-500 hover:text-gray-900" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products, orders..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#054425]/20 focus:border-[#054425]/50 transition-all font-poppins"
              />
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-gray-500 hover:text-[#054425] transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">3</span>
            </button>
            <button className="relative text-gray-500 hover:text-[#054425] transition-colors hidden sm:block">
              <MessageSquare size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full text-[8px] font-bold text-white flex items-center justify-center">2</span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900 font-sans leading-tight">Herbal Essence</p>
                <p className="text-[11px] font-medium text-gray-500 font-poppins">Vendor</p>
              </div>
              <img src="https://ui-avatars.com/api/?name=Herbal+Essence&background=054425&color=fff" alt="Vendor" className="w-10 h-10 rounded-full border-2 border-gray-100 shadow-sm" />
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default VendorLayout;
