import React from 'react';
import HeroCarousel from './HeroCarousel';
import Categories from './Categories';
import TrendingOffers from './TrendingOffers';
import FeaturedProducts from './FeaturedProducts';
import BestSellers from './BestSellers';
import FeaturesBar from './FeaturesBar';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Hero Carousel Banner Section */}
      <HeroCarousel />
      
      {/* Shop by Category Circle Icons Section */}
      <Categories />
      
      {/* 3 Trending Offers Banner Cards Section */}
      <TrendingOffers />
      
      {/* Best Selling Products Swiper Slider */}
      <BestSellers />
      
      {/* Recommended For You Swiper Slider */}
      <FeaturedProducts />
      
      {/* Bottom Features Banner Bar (100% Natural, etc.) */}
      <FeaturesBar />

      {/* Floating WhatsApp Chat Widget matching mockup */}
      <a
        href="https://wa.me/917407175567?text=Hello%20Sada%20Bharat%20Ayurvedic,%20I%20have%20an%20inquiry%20regarding%20your%20organic%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 group cursor-pointer"
      >
        {/* Tooltip Label */}
        <div className="bg-gray-800 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md pointer-events-none select-none">
          Chat with us
        </div>
        
        {/* Green Circle WhatsApp Button */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95 border border-white/20">
          <svg className="w-6 h-6 md:w-8 md:h-8 fill-current text-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.338 5.393.007 11.95.007c3.179 0 6.167 1.24 8.413 3.488a11.83 11.83 0 0 1 3.485 8.418c-.006 6.557-5.338 11.89-11.894 11.89-1.996 0-3.957-.5-5.69-1.448L0 24zM6.59 17.586l.361.214a9.873 9.873 0 0 0 5.031 1.378h.004c5.447 0 9.882-4.434 9.885-9.888a9.824 9.824 0 0 0-2.894-6.995c-1.865-1.867-4.348-2.9-6.988-2.9-5.452 0-9.887 4.434-9.889 9.889a9.863 9.863 0 0 0 1.51 5.26l.235.374-1.002 3.655 3.743-.982zm10.882-3.204c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          </svg>
        </div>
      </a>
    </div>
  );
};

export default Home;
