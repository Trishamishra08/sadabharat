import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, CheckCircle2 } from 'lucide-react';

const VendorRegister = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center font-poppins bg-[#FDFBF7] p-6">
        <div className="bg-white p-10 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h2 className="text-3xl font-serif font-black text-gray-900 mb-2">Application Submitted!</h2>
          
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 my-6 text-left">
            <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">Account Status</p>
            <p className="text-lg font-black text-blue-900 font-serif">Pending Admin Approval</p>
          </div>
          
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Your application is under review. Verification may take <strong className="text-gray-900">24-48 Hours</strong>. You will receive an email once approved.
          </p>
          
          <Link to="/" className="inline-block bg-[#054425] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#04331c] transition-colors shadow-sm">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex font-poppins bg-[#FDFBF7]">
      {/* Left Banner */}
      <div className="hidden lg:flex lg:w-1/3 relative bg-[#054425] flex-col justify-between overflow-hidden fixed h-screen top-0 left-0">
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay">
           <img src="https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?q=80&w=1974&auto=format&fit=crop" alt="Ayurvedic Banner" className="w-full h-full object-cover" />
        </div>
        
        {/* Organic Wave Divider */}
        <div className="absolute top-0 bottom-0 right-0 w-16 overflow-hidden z-10 pointer-events-none translate-x-[2px]">
          <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="h-full w-full fill-[#FDFBF7]">
            <path d="M100,0 L100,1000 L0,1000 C30,800 100,600 20,400 C-30,250 80,100 0,0 Z" />
          </svg>
        </div>

        <div className="relative z-20 p-12 h-full flex flex-col justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full p-1 shadow-lg">
              <img src="/logo.png" alt="Sada Bharat" className="w-full h-full object-contain" onError={(e)=>{e.target.style.display='none'}} />
            </div>
            <div className="text-white">
              <h1 className="font-serif font-black text-xl tracking-wide leading-tight">SADA BHARAT</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Ayurvedic</p>
            </div>
          </div>
          
          <div className="max-w-sm pb-10">
            <h2 className="text-4xl font-serif font-black text-white leading-[1.2] mb-4">
              Join the <br/>Ayurvedic Revolution
            </h2>
            <p className="text-white/80 font-light leading-relaxed">
              Register as a verified seller and reach thousands of customers searching for authentic organic products.
            </p>
          </div>
        </div>
      </div>

      {/* Right Form - Scrolling Area */}
      <div className="w-full lg:w-2/3 lg:ml-[33.333333%] p-6 sm:p-12 md:p-16">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-black text-gray-900 mb-2">Vendor Registration</h1>
            <p className="text-gray-500">Fill in the details below to submit your seller application.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* Section 1: Basic Information */}
            <section>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">1. Basic Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Mobile Number</label>
                  <input type="tel" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Password</label>
                  <input type="password" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Confirm Password</label>
                  <input type="password" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
              </div>
            </section>

            {/* Section 2: Business Information */}
            <section>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">2. Business Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Business Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">GST Number</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Business Type</label>
                  <select required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] text-gray-700">
                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Private Limited">Private Limited</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Business Address</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">City</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">State</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
              </div>
            </section>

            {/* Section 3: Bank Details */}
            <section>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">3. Bank Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Account Holder Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Bank Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Account Number</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">IFSC Code</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] uppercase" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">UPI ID (Optional)</label>
                  <input type="text" className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
              </div>
            </section>

            {/* Section 4: Store Information */}
            <section>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">4. Store Information</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Store Name</label>
                  <input type="text" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Store Description</label>
                  <textarea rows="3" required className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#054425] focus:ring-1 focus:ring-[#054425] resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-3 uppercase tracking-wide">Product Categories</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['Hair Care', 'Skin Care', 'Supplements', 'Herbal Tea', 'Personal Care'].map(cat => (
                      <label key={cat} className="flex items-center gap-2 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <input type="checkbox" className="w-4 h-4 text-[#054425] rounded focus:ring-[#054425] accent-[#054425]" />
                        <span className="text-sm text-gray-700 font-medium">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Document Upload */}
            <section>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-5 pb-2 border-b border-gray-200">5. Document Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                 <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple accept=".pdf,image/*" />
                 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-[#054425]">
                   <Upload size={24} />
                 </div>
                 <p className="text-base font-bold text-gray-900 mb-1">Click to upload documents</p>
                 <p className="text-sm text-gray-500 mb-4">Upload GST, PAN, Business Registration, and Cancelled Cheque.</p>
                 <span className="text-xs font-bold bg-gray-200 text-gray-700 px-3 py-1 rounded-full uppercase tracking-wide">PDF, JPG, PNG up to 10MB</span>
              </div>
            </section>

            {/* Terms and Submit */}
            <section className="pt-4">
              <div className="space-y-3 mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-4 h-4 text-[#054425] rounded focus:ring-[#054425] accent-[#054425]" />
                  <span className="text-sm text-gray-600">I agree to the <a href="#" className="text-[#054425] font-bold hover:underline">Seller Terms & Conditions</a></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" required className="mt-1 w-4 h-4 text-[#054425] rounded focus:ring-[#054425] accent-[#054425]" />
                  <span className="text-sm text-gray-600">I agree to the <a href="#" className="text-[#054425] font-bold hover:underline">Marketplace Policies</a></span>
                </label>
              </div>

              <button type="submit" className="w-full bg-[#054425] text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_rgba(5,68,37,0.3)] hover:bg-[#04331c] hover:shadow-[0_6px_20px_rgba(5,68,37,0.4)] transition-all text-lg">
                Submit Vendor Application
              </button>

              <p className="text-center mt-6 text-sm text-gray-600">
                Already have a seller account?{' '}
                <Link to="/vendor/login" className="font-bold text-[#054425] hover:underline">Sign In</Link>
              </p>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
