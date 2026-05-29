import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  const location = useLocation();

  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="relative bg-[#F4F8F5] text-[#054425] pt-8 pb-20 md:pb-10 border-t border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">

          {/* Column 1: Get to Know Us */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#054425]">Get to Know Us</h3>
            <ul className="space-y-1.5 text-[9px] font-bold uppercase tracking-widest text-[#054425]/80">
              <li><Link to="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-[#D4AF37] transition-colors">Our Catalog</Link></li>
              <li><Link to="/blog" className="hover:text-[#D4AF37] transition-colors">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Connect with Us */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#054425]">Connect with Us</h3>
            <ul className="space-y-1.5 text-[9px] font-bold uppercase tracking-widest text-[#054425]/80">
              <li><a href="https://facebook.com/sadabharatayurvedic/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors group"><FiFacebook className="group-hover:scale-110 transition-transform" /> Facebook</a></li>
              <li><a href="https://instagram.com/sadabharatayurvedic/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors group"><FiInstagram className="group-hover:scale-110 transition-transform" /> Instagram</a></li>
              <li><a href="https://wa.me/917407175567" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors group">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg> WhatsApp</a></li>
            </ul>
          </div>

          {/* Column 3: Let Us Help You */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#054425]">Let Us Help You</h3>
            <ul className="space-y-1.5 text-[9px] font-bold uppercase tracking-widest text-[#054425]/80">
              <li><Link to="/profile" className="hover:text-[#D4AF37] transition-colors">Your Account</Link></li>
              <li><Link to="/return-policy" className="hover:text-[#D4AF37] transition-colors">Returns Centre</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-[#D4AF37] transition-colors">Terms & Conditions</Link></li>
              <li><a href="https://wa.me/917407175567" target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition-colors">Help Support</a></li>
            </ul>
          </div>

          {/* Column 4: Registered Office */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-serif font-black uppercase tracking-[0.2em] text-[#054425]">Registered Office</h3>
            <div className="space-y-2.5 text-[9px] font-bold uppercase tracking-widest text-[#054425]/80 leading-relaxed">
              <p className="flex items-start gap-2 group transition-colors hover:text-[#D4AF37]">
                <FiMapPin className="shrink-0 opacity-60 group-hover:scale-110 transition-transform mt-0.5" size={10} />
                <a href="#" target="_blank" rel="noreferrer" className="transition-all underline-offset-4 hover:underline">
                  Sada Bharat Ayurvedic HQ, Fatehabad-125050 Haryana
                </a>
              </p>
              <p className="flex items-center gap-2 group transition-colors hover:text-[#D4AF37]">
                <FiPhone className="shrink-0 opacity-60 group-hover:scale-110 transition-transform" size={10} />
                <a href="tel:+917407175567" className="transition-all underline-offset-4 hover:underline text-nowrap">+91 74071 75567</a>
              </p>
              <p className="flex items-center gap-2 group transition-colors hover:text-[#D4AF37]">
                <FiMail className="shrink-0 opacity-60 group-hover:scale-110 transition-transform" size={10} />
                <a href="mailto:care@sadabharat.com" className="break-all transition-all underline-offset-4 hover:underline">care@sadabharat.com</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center md:items-start leading-none group transition-transform hover:scale-105">
            <span className="text-sm md:text-base font-black tracking-[0.2em] text-[#054425] uppercase">Sada Bharat</span>
            <span className="text-[7px] md:text-[8px] tracking-[0.5em] text-[#D4AF37] uppercase mt-1 font-bold">Ayurvedic</span>
          </div>

          <div className="flex gap-4 text-[8px] font-black uppercase tracking-widest text-[#054425]/40">
            <Link to="/privacy-policy" className="hover:text-[#D4AF37] transition-colors">Privacy</Link>
            <Link to="/terms-conditions" className="hover:text-[#D4AF37] transition-colors">Terms</Link>
            <Link to="/return-policy" className="hover:text-[#D4AF37] transition-colors">Returns</Link>
            <Link to="/shipping-policy" className="hover:text-[#D4AF37] transition-colors">Shipping</Link>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-[8px] font-bold text-[#054425]/50 uppercase tracking-wider leading-none">
              © 2026 Sada Bharat Ayurvedic. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
