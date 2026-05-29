import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';

import 'swiper/css';
import 'swiper/css/navigation';

const FeaturedProducts = () => {
  const { products, loading } = useShop();

  // Filter products marked as recommended
  const recommended = [...products]
    .filter(p => p.recommended === true || p.category?.toLowerCase() === 'skin care')
    .slice(0, 8);

  if (loading && products.length === 0) {
    return (
      <div className="py-10 bg-white flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#054425]"></div>
      </div>
    );
  }

  return (
    <section className="pt-2 pb-8 md:pt-4 md:pb-12 bg-white">
      <div className="w-full px-4 md:px-8">
        
        {/* Header Block matching mockup */}
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-2xl font-serif font-black text-[#054425] tracking-tight">
              Recommended For You
            </h2>
          </div>

          <Link
            to="/shop?sort=Top Rated"
            className="flex items-center gap-1.5 text-xs font-bold text-[#054425] hover:text-[#0d5c34] transition-colors tracking-tight uppercase"
          >
            <span>View All</span>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2}
          navigation={true}
          breakpoints={{
            768: { slidesPerView: 3, spaceBetween: 24 },
            1024: { slidesPerView: 4, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 24 },
          }}
          className="recommended-swiper"
        >
          {recommended.map((product) => (
            <SwiperSlide key={product._id || product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeaturedProducts;
