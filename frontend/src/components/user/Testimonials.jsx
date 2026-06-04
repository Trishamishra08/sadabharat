import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';

// MOCK API for Frontend-Only mode
const api = {
  get: async () => ({ data: { data: { products: [], categories: [], banners: [], settings: {}, orders: [], users: [], stats: [], recentTransactions: [], dailyRevenue: [], vendors: [], blogs: [], returns: [], testimonials: [], reviews: [], replacements: [], supportTickets: [], locations: [], coupons: [], logs: [] }, status: 'success' } }),
  post: async () => ({ data: { data: { order: { orderId: 'MOCK-ORDER-123' } }, status: 'success' } }),
  patch: async () => ({ data: { status: 'success' } }),
  delete: async () => ({ data: { status: 'success' } })
};

import 'swiper/css';
import 'swiper/css/navigation';

const MOCK_TESTIMONIALS = [
  {
    _id: 'm1',
    name: 'Priya Sharma',
    location: 'Delhi',
    rating: 5,
    text: 'Bhringraj Hair Oil has genuinely transformed my hair. After just 3 weeks, my hair fall reduced drastically. Love the natural fragrance!',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    product: 'Bhringraj Hair Oil',
  },
  {
    _id: 'm2',
    name: 'Anita Verma',
    location: 'Mumbai',
    rating: 5,
    text: 'The Neem Tulsi Face Wash is absolutely wonderful. My skin feels so fresh and the acne has reduced significantly. Purely Ayurvedic and effective!',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    product: 'Neem Tulsi Face Wash',
  },
  {
    _id: 'm3',
    name: 'Rekha Gupta',
    location: 'Jaipur',
    rating: 5,
    text: 'I have been using Tulsi Green Tea for a month now. It helps with my digestion and I feel lighter. A true Ayurvedic blessing!',
    image: 'https://randomuser.me/api/portraits/women/32.jpg',
    product: 'Tulsi Green Tea',
  },
  {
    _id: 'm4',
    name: 'Sunita Patel',
    location: 'Ahmedabad',
    rating: 4,
    text: 'Aloe Vera Gel is my everyday skin saviour. It soothes my skin after sun exposure and keeps it moisturised. Very happy with this product!',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
    product: 'Aloe Vera Gel',
  },
  {
    _id: 'm5',
    name: 'Kavita Singh',
    location: 'Lucknow',
    rating: 5,
    text: 'Sada Bharat products are my go-to for all natural Ayurvedic remedies. The quality is unmatched and delivery is always on time. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/women/12.jpg',
    product: 'Ayurvedic Wellness',
  },
];

const StarRating = ({ rating }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <FiStar
        key={star}
        size={11}
        className={star <= rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-gray-300'}
      />
    ))}
  </div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(MOCK_TESTIMONIALS);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await api.get('/testimonials');
        const data = res.data?.data?.testimonials;
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      } catch (err) {
        // silently fall back to mock data
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="pt-2 pb-10 md:pt-4 md:pb-14 bg-[#F2F6E8] overflow-hidden relative">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-48 h-48 rounded-full bg-[#054425]/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#D4AF37]/5 translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="w-full px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-6 md:mb-8"
        >
          <div>
            <h2 className="text-lg md:text-2xl font-serif font-black text-[#054425] tracking-tight">
              What Our Customers Say
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-[2px] w-10 bg-[#D4AF37] rounded-full" />
              <span className="text-[10px] md:text-xs text-[#054425]/60 font-semibold uppercase tracking-widest">
                Real Reviews · Real People
              </span>
            </div>
          </div>

          {/* Compact Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              ref={prevRef}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#054425]/30 bg-white flex items-center justify-center text-[#054425] hover:bg-[#054425] hover:text-white hover:border-[#054425] transition-all duration-200 shadow-sm active:scale-95"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              ref={nextRef}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-[#054425]/30 bg-white flex items-center justify-center text-[#054425] hover:bg-[#054425] hover:text-white hover:border-[#054425] transition-all duration-200 shadow-sm active:scale-95"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={14}
          slidesPerView={1.15}
          loop={testimonials.length > 3}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          breakpoints={{
            480:  { slidesPerView: 1.4, spaceBetween: 14 },
            640:  { slidesPerView: 2.1, spaceBetween: 16 },
            768:  { slidesPerView: 2.5, spaceBetween: 18 },
            1024: { slidesPerView: 3.2, spaceBetween: 20 },
            1280: { slidesPerView: 4,   spaceBetween: 20 },
          }}
          className="testimonials-ayur-swiper !overflow-visible"
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={item._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-xl p-3 shadow-sm border border-[#054425]/8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col"
              >
                {/* Top: Avatar + Name */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-9 h-9 rounded-full object-cover border-2 border-[#054425]/20"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=054425&color=fff&size=36`;
                      }}
                    />
                    {/* verified badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#054425] rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 12 12" className="w-2 h-2 text-white fill-white">
                        <path d="M10 3L4.5 8.5 2 6" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-black text-[#054425] truncate">{item.name}</p>
                    {item.location && (
                      <p className="text-[9px] text-gray-400 font-medium">{item.location}</p>
                    )}
                  </div>
                  <StarRating rating={item.rating || 5} />
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-[#054425]/10 via-[#D4AF37]/20 to-transparent mb-2" />

                {/* Quote */}
                <div className="flex-1 relative">
                  <span className="absolute -top-1 -left-0.5 text-[24px] leading-none text-[#D4AF37]/30 font-serif select-none">"</span>
                  <p className="text-[10px] text-gray-600 leading-relaxed font-medium pl-3 line-clamp-3">
                    {item.text}
                  </p>
                </div>

                {/* Product tag */}
                {item.product && (
                  <div className="mt-2 pt-2 border-t border-gray-50">
                    <span className="inline-flex items-center gap-1 bg-[#F2F6E8] text-[#054425] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wide">
                      <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
                      {item.product}
                    </span>
                  </div>
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
