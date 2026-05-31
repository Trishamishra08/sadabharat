import React from 'react';
import { 
  TrendingUp, TrendingDown, ShoppingBag, ClipboardList, 
  Users, Star, ArrowRight, Eye, MoreHorizontal, ShoppingCart, 
  Package, Truck, CheckCircle, XCircle
} from 'lucide-react';

const StatCard = ({ title, value, trend, trendUp, date, icon: Icon, iconBg }) => (
  <div className="bg-white p-5 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col justify-between h-full hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 text-[13px] font-medium font-poppins mb-1">{title}</p>
        <h3 className="text-2xl font-serif font-black text-gray-900">{value}</h3>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon size={18} />
      </div>
    </div>
    <div className="flex items-center gap-1.5 mt-auto">
      {trendUp ? (
        <TrendingUp size={14} className="text-green-500" />
      ) : (
        <TrendingDown size={14} className="text-red-500" />
      )}
      <span className={`text-[12px] font-bold ${trendUp ? 'text-green-500' : 'text-red-500'}`}>
        {trend}
      </span>
      <span className="text-[11px] text-gray-400 font-medium ml-1">vs {date}</span>
    </div>
  </div>
);

const VendorDashboard = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-serif font-black text-gray-900 leading-tight">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1 font-poppins">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="bg-white border border-gray-200 text-gray-700 text-[13px] font-medium px-4 py-2 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer hover:bg-gray-50">
          May 1 – May 31, 2024
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard 
          title="Total Sales" 
          value="₹1,25,680" 
          trend="↑ 18.6%" 
          trendUp={true} 
          date="Apr 1 - Apr 30"
          icon={ShoppingBag}
          iconBg="bg-green-50 text-[#054425]"
        />
        <StatCard 
          title="Total Orders" 
          value="248" 
          trend="↑ 12.4%" 
          trendUp={true} 
          date="Apr 1 - Apr 30"
          icon={ClipboardList}
          iconBg="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Total Customers" 
          value="186" 
          trend="↑ 10.3%" 
          trendUp={true} 
          date="Apr 1 - Apr 30"
          icon={Users}
          iconBg="bg-purple-50 text-purple-600"
        />
        <StatCard 
          title="Store Rating" 
          value="4.7" 
          trend="↑ 0.2" 
          trendUp={true} 
          date="Apr 1 - Apr 30"
          icon={Star}
          iconBg="bg-yellow-50 text-yellow-600"
        />
      </div>

      {/* Middle Row: Charts & Order Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview Chart (Mock) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Sales Overview</h3>
            <select className="text-[12px] bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 font-medium text-gray-600 outline-none">
              <option>This Month</option>
              <option>Last Month</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="flex-1 relative min-h-[200px] flex items-end">
             {/* Mock Chart SVG */}
             <svg viewBox="0 0 500 150" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#054425" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="#054425" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M0,150 L0,80 Q25,60 50,90 T100,50 T150,110 T200,80 T250,100 T300,50 T350,90 T400,20 T450,70 T500,40 L500,150 Z" fill="url(#chartGradient)" />
                <path d="M0,80 Q25,60 50,90 T100,50 T150,110 T200,80 T250,100 T300,50 T350,90 T400,20 T450,70 T500,40" fill="none" stroke="#054425" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="100" cy="50" r="4" fill="white" stroke="#054425" strokeWidth="2" />
                <circle cx="200" cy="80" r="4" fill="white" stroke="#054425" strokeWidth="2" />
                <circle cx="300" cy="50" r="4" fill="white" stroke="#054425" strokeWidth="2" />
                <circle cx="400" cy="20" r="4" fill="white" stroke="#054425" strokeWidth="2" />
             </svg>
             <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-400 pb-6">
                <span>₹40K</span>
                <span>₹30K</span>
                <span>₹20K</span>
                <span>₹10K</span>
                <span>₹0</span>
             </div>
             <div className="absolute bottom-0 left-8 right-0 flex justify-between text-[10px] text-gray-400">
                <span>May 1</span>
                <span>May 7</span>
                <span>May 13</span>
                <span>May 19</span>
                <span>May 25</span>
                <span>May 31</span>
             </div>
          </div>
        </div>

        {/* Order Status Donut */}
        <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col">
          <h3 className="font-bold text-gray-900 mb-6">Order Status</h3>
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="relative w-40 h-40 mb-6">
               <svg viewBox="0 0 36 36" className="w-full h-full circular-chart">
                  <path className="text-green-600 stroke-current" strokeWidth="4" strokeDasharray="65, 100" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-yellow-500 stroke-current" strokeWidth="4" strokeDasharray="18, 100" strokeDashoffset="-65" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-gray-800 stroke-current" strokeWidth="4" strokeDasharray="11, 100" strokeDashoffset="-83" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-red-500 stroke-current" strokeWidth="4" strokeDasharray="6, 100" strokeDashoffset="-94" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-gray-900">248</span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">Total Orders</span>
               </div>
             </div>
             
             <div className="w-full space-y-3 text-[12px] font-medium">
               <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-green-600"></div><span className="text-gray-600">Delivered</span></div><span className="text-gray-900 font-bold">162 (65.3%)</span></div>
               <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><span className="text-gray-600">Processing</span></div><span className="text-gray-900 font-bold">45 (18.1%)</span></div>
               <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-gray-800"></div><span className="text-gray-600">Shipped</span></div><span className="text-gray-900 font-bold">28 (11.3%)</span></div>
               <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span className="text-gray-600">Cancelled</span></div><span className="text-gray-900 font-bold">13 (5.2%)</span></div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Top Products, Recent Orders, Store Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Selling Products */}
        <div className="lg:col-span-4 bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Top Selling Products</h3>
            <button className="text-xs font-bold text-[#054425] hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'NEEM TULSI Face Wash', size: '100 ml', sales: '₹18,750', units: '250 Units' },
              { name: 'BHRINGRAJ Hair Oil', size: '200 ml', sales: '₹16,420', units: '180 Units' },
              { name: 'AMLA Powder', size: '100 gm', sales: '₹12,890', units: '210 Units' },
              { name: 'ASHWAGANDHA Capsules', size: '60 Capsules', sales: '₹9,650', units: '150 Units' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-1 border border-gray-100">
                  <img src="https://via.placeholder.com/40" alt={p.name} className="max-w-full max-h-full mix-blend-multiply" />
                </div>
                <div className="flex-1">
                  <p className="text-[12px] font-bold text-gray-900 leading-tight">{p.name}</p>
                  <p className="text-[10px] text-gray-500">{p.size}</p>
                </div>
                <div className="text-right">
                  <p className="text-[13px] font-black text-gray-900">{p.sales}</p>
                  <p className="text-[10px] text-gray-500">{p.units}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="lg:col-span-5 bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <button className="text-xs font-bold text-[#054425] hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Amount</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-[12px] text-gray-800">
                {[
                  { id: '#SB12345678', customer: 'Rohit Sharma', date: 'May 31, 2024', amount: '₹1,250', status: 'Delivered', color: 'bg-green-100 text-green-700' },
                  { id: '#SB12345679', customer: 'Neha Verma', date: 'May 31, 2024', amount: '₹890', status: 'Processing', color: 'bg-yellow-100 text-yellow-700' },
                  { id: '#SB12345680', customer: 'Amit Patel', date: 'May 30, 2024', amount: '₹2,450', status: 'Shipped', color: 'bg-blue-100 text-blue-700' },
                  { id: '#SB12345681', customer: 'Pooja Singh', date: 'May 30, 2024', amount: '₹1,150', status: 'Delivered', color: 'bg-green-100 text-green-700' },
                  { id: '#SB12345682', customer: 'Vikas Mehta', date: 'May 29, 2024', amount: '₹760', status: 'Cancelled', color: 'bg-red-100 text-red-700' },
                ].map((order, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 font-semibold text-gray-900">{order.id}</td>
                    <td className="py-3 font-medium">{order.customer}</td>
                    <td className="py-3 text-gray-500">{order.date}</td>
                    <td className="py-3 font-bold">{order.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${order.color}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <button className="text-gray-400 hover:text-[#054425] transition-colors"><Eye size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Store Performance */}
        <div className="lg:col-span-3 bg-white p-6 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900">Store Performance</h3>
            <select className="text-[10px] bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 font-medium text-gray-600 outline-none">
              <option>This Month</option>
            </select>
          </div>
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0"><TrendingUp size={18} /></div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-500 font-medium mb-0.5">Conversion Rate</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-gray-900">3.24%</p>
                  <p className="text-[11px] font-bold text-green-500 flex items-center gap-0.5"><TrendingUp size={12}/> 8.6%</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0"><ShoppingCart size={18} /></div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-500 font-medium mb-0.5">Average Order Value</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-gray-900">₹506</p>
                  <p className="text-[11px] font-bold text-green-500 flex items-center gap-0.5"><TrendingUp size={12}/> 6.2%</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0"><Eye size={18} /></div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-500 font-medium mb-0.5">Page Views</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-gray-900">12,680</p>
                  <p className="text-[11px] font-bold text-green-500 flex items-center gap-0.5"><TrendingUp size={12}/> 15.4%</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 shrink-0"><Users size={18} /></div>
              <div className="flex-1">
                <p className="text-[11px] text-gray-500 font-medium mb-0.5">Returning Customers</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-black text-gray-900">68</p>
                  <p className="text-[11px] font-bold text-green-500 flex items-center gap-0.5"><TrendingUp size={12}/> 9.3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
