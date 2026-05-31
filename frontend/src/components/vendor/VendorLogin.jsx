import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const VendorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) return setError('Email Required');
    if (!password) return setError('Password Required');

    if (email === 's@gmail.com' && password === '123456') {
      // Simulate successful login
      localStorage.setItem('vendor_auth', 'true');
      navigate('/vendor');
    } else {
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="min-h-screen flex font-poppins bg-[#FDFBF7]">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#054425] flex-col justify-between overflow-hidden">
        {/* Background Image / Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
           <img src="https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop" alt="Ayurvedic Banner" className="w-full h-full object-cover" />
        </div>
        
        {/* Organic Wave Divider */}
        <div className="absolute top-0 bottom-0 right-0 w-24 overflow-hidden z-10 pointer-events-none translate-x-[4px]">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="h-full w-full fill-[#FDFBF7]">
            <path d="M100,0 L100,1000 L0,1000 C30,800 100,600 20,400 C-30,250 80,100 0,0 Z" />
          </svg>
        </div>

        <div className="relative z-20 p-12">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-12 bg-white rounded-full p-1 shadow-lg">
              <img src="/logo.png" alt="Sada Bharat" className="w-full h-full object-contain" onError={(e)=>{e.target.style.display='none'}} />
            </div>
            <div className="text-white">
              <h1 className="font-serif font-black text-xl tracking-wide leading-tight">SADA BHARAT</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Ayurvedic</p>
            </div>
          </div>
          
          <div className="max-w-md">
            <h2 className="text-4xl md:text-5xl font-serif font-black text-white leading-[1.2] mb-6">
              Grow Your<br />Ayurvedic Business
            </h2>
            <p className="text-lg text-white/80 font-light leading-relaxed">
              Manage products, orders and earnings from one beautifully designed dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-full p-1 shadow-sm border border-gray-100">
              <img src="/logo.png" alt="Sada Bharat" className="w-full h-full object-contain" onError={(e)=>{e.target.style.display='none'}} />
            </div>
            <div>
              <h1 className="font-serif font-black text-lg tracking-wide text-[#054425] leading-tight">SADA BHARAT</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gray-500">Ayurvedic</p>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50">
            <h2 className="text-3xl font-serif font-black text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-sm text-gray-500 mb-8">Sign in to access your seller dashboard.</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="relative">
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="s@gmail.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] transition-all"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">Password</label>
                  <a href="#" className="text-xs font-bold text-[#054425] hover:underline">Forgot Password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] transition-all"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <input type="checkbox" id="remember" className="w-4 h-4 text-[#054425] border-gray-300 rounded focus:ring-[#054425]" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember Me</label>
              </div>

              <button type="submit" className="w-full bg-[#054425] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_rgba(5,68,37,0.3)] hover:bg-[#04331c] hover:shadow-[0_6px_20px_rgba(5,68,37,0.4)] transition-all flex items-center justify-center gap-2">
                Sign In <ArrowRight size={18} />
              </button>

              <div className="relative flex items-center justify-center py-4">
                <div className="border-t border-gray-200 w-full absolute"></div>
                <span className="bg-white px-4 text-xs text-gray-400 relative z-10 uppercase font-bold tracking-widest">Or</span>
              </div>

              <button type="button" className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                Login with Google
              </button>
            </form>
          </div>

          <p className="text-center mt-8 text-sm text-gray-600">
            Don't have a seller account?{' '}
            <Link to="/vendor/register" className="font-bold text-[#054425] hover:underline">Register as Vendor</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
