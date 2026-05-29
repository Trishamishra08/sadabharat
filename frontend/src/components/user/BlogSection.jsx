import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import blogFloating1 from '../../assets/images/cat_wellness.png';
import blogFloating2 from '../../assets/images/cat_skincare.png';
import blogFloating3 from '../../assets/images/cat_haircare.png';
import blogFloating4 from '../../assets/images/cat_essentialoils_new.png';
import blogItem1 from '../../assets/images/blog_skincare.png';
import blogItem2 from '../../assets/images/blog_haircare.png';
import blogItem3 from '../../assets/images/blog_vit_c.png';

const floatingImages = [
  { src: blogFloating1, size: 'w-16 h-20 md:w-24 md:h-32', top: '10%', left: '15%', delay: 0 },
  { src: blogFloating2, size: 'w-14 h-18 md:w-20 md:h-28', top: '25%', left: '30%', delay: 1 },
  { src: blogFloating3, size: 'w-18 h-24 md:w-28 md:h-36', top: '10%', left: '65%', delay: 0.5 },
  { src: blogFloating4, size: 'w-16 h-20 md:w-24 md:h-32', top: '22%', left: '80%', delay: 1.5 },
];

export const mockBlogs = [
  {
    id: 1,
    category: 'SKINCARE',
    title: 'Ayurvedic Skincare Routine',
    excerpt: 'Discover the ancient secrets of naturally glowing skin.',
    content: "Ayurveda teaches us that glowing skin starts from within. A proper Ayurvedic skincare routine involves more than just topical applications; it requires a balance of doshas. Start your day by cleansing your face with raw milk or rose water. Follow up with a herbal face pack made of turmeric, sandalwood, and gram flour. Hydrate your skin with pure aloe vera gel or a light oil like Kumkumadi Tailam. Remember, drinking warm water with lemon and honey in the morning can help flush out toxins, giving you that radiant, natural glow.",
    image: blogItem1,
    date: 'MAR 15',
    readTime: '5M'
  },
  {
    id: 2,
    category: 'HERBS',
    title: 'The Power of Ashwagandha',
    excerpt: 'How this adaptogen helps with stress and vitality.',
    content: "Ashwagandha, known as the 'King of Ayurvedic Herbs', is a powerful adaptogen that has been used for over 3,000 years. It helps the body manage stress by lowering cortisol levels and balancing the nervous system. Regular consumption of Ashwagandha root powder with warm milk before bed can improve sleep quality, boost brain function, and increase overall vitality. Whether you're looking to enhance your physical stamina or find mental calmness, Ashwagandha is a natural remedy that supports holistic well-being.",
    image: blogItem2,
    date: 'MAR 10',
    readTime: '4M'
  },
  {
    id: 3,
    category: 'DAILY',
    title: 'Dinacharya: Daily Routine',
    excerpt: 'Start your morning with simple Ayurvedic practices.',
    content: "Dinacharya is the Ayurvedic concept of a daily routine that aligns your body with the rhythms of nature. Waking up before sunrise, known as Brahma Muhurta, is highly recommended for mental clarity. Begin your day with tongue scraping to remove toxins (ama) accumulated overnight, followed by oil pulling with sesame or coconut oil for oral health. Engage in light yoga or stretching to awaken your body, and end your morning routine with a warm bath. Embracing Dinacharya can lead to profound improvements in your health and energy levels.",
    image: blogItem3,
    date: 'MAR 05',
    readTime: '3M'
  },
  {
    id: 4,
    category: 'HAIRCARE',
    title: 'Benefits of Hair Oiling',
    excerpt: 'Nourish your scalp with traditional herbal oils.',
    content: "In Ayurveda, 'Shiro Abhyanga' or head massage with warm herbal oils is an essential practice for maintaining healthy hair and a calm mind. Oils infused with herbs like Bhringraj, Amla, and Brahmi provide deep nourishment to the hair follicles, prevent premature graying, and promote hair growth. Massaging the scalp improves blood circulation and relieves stress. For best results, gently warm the oil before application and leave it on overnight or at least for an hour before washing with a mild, sulfate-free shampoo.",
    image: blogFloating4,
    date: 'FEB 28',
    readTime: '6M'
  },
  {
    id: 5,
    category: 'WELLNESS',
    title: 'Balancing Your Doshas',
    excerpt: 'Understand your body constitution for better health.',
    content: "According to Ayurveda, every individual has a unique constitution composed of three doshas: Vata, Pitta, and Kapha. Understanding your dominant dosha is the key to maintaining balance and preventing illness. Vata types need grounding foods and warm environments; Pitta types benefit from cooling herbs and avoiding spicy foods; Kapha types require stimulating activities and light, warm meals. By tailoring your diet and lifestyle to your doshic profile, you can achieve optimal health and harmony in your body and mind.",
    image: blogFloating3,
    date: 'FEB 20',
    readTime: '4M'
  },
  {
    id: 6,
    category: 'TIPS',
    title: 'Ayurvedic Diet Principles',
    excerpt: 'Eating mindfully according to the seasons.',
    content: "An Ayurvedic diet is not just about what you eat, but how and when you eat. Mindful eating in a peaceful environment helps the digestive fire (Agni) work efficiently. Emphasize fresh, seasonal, and locally sourced foods. Incorporate all six tastes—sweet, sour, salty, bitter, pungent, and astringent—into your daily meals to ensure nutritional balance. Avoid drinking ice-cold water, as it dampens the digestive fire. Instead, sip warm water or herbal teas throughout the day to support digestion and detoxification.",
    image: blogFloating1,
    date: 'FEB 12',
    readTime: '3M'
  },
  {
    id: 7,
    category: 'TIPS',
    title: 'Natural Detox Methods',
    excerpt: 'Gentle ways to cleanse your body using Ayurveda.',
    content: "Detoxification in Ayurveda is about gently supporting the body's natural cleansing mechanisms rather than harsh fasting. 'Panchakarma' is the traditional deep cleanse, but you can practice simple detox methods at home. Start your day with warm water and lemon to flush the digestive tract. Incorporate spices like cumin, coriander, and fennel into your cooking to improve digestion. A short mono-diet of Kitchari (a mix of mung beans and rice) for a few days can give your digestive system a much-needed rest while providing adequate nourishment.",
    image: blogFloating4,
    date: 'FEB 10',
    readTime: '4M'
  },
  {
    id: 8,
    category: 'TIPS',
    title: 'Herbal Teas for Immunity',
    excerpt: 'Boost your body defenses with healing spices.',
    content: "Ayurvedic herbal teas, or 'Kashayams', are excellent for boosting immunity and soothing the body. A simple tea made by boiling fresh ginger, turmeric, black pepper, and holy basil (Tulsi) leaves can work wonders in warding off seasonal colds. Turmeric provides anti-inflammatory benefits, while black pepper enhances its absorption. Tulsi acts as an immunomodulator. Add a teaspoon of raw honey (after the tea has slightly cooled) for added antibacterial properties and a touch of sweetness.",
    image: blogFloating2,
    date: 'FEB 05',
    readTime: '5M'
  },
  {
    id: 9,
    category: 'TIPS',
    title: 'Yoga for Better Digestion',
    excerpt: 'Poses that stimulate your digestive fire.',
    content: "Movement is crucial for a healthy digestive system. Certain yoga asanas can stimulate the abdominal organs and improve digestion. 'Vajrasana' (Thunderbolt Pose) is one of the few poses recommended right after a meal; sitting in this posture for 5-10 minutes helps direct blood flow to the digestive organs. 'Pawanmuktasana' (Wind-Relieving Pose) is excellent for relieving bloating and gas. Incorporating these simple stretches into your routine can significantly enhance your Agni and alleviate common digestive discomforts.",
    image: blogFloating3,
    date: 'JAN 28',
    readTime: '3M'
  }
];

const BlogSection = () => {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('category');

  const navigate = useNavigate();
  const [dynamicBlogs, setDynamicBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get('/blogs');
        if (res.data?.data?.blogs?.length > 0) {
          setDynamicBlogs(res.data.data.blogs);
        } else {
          setDynamicBlogs(mockBlogs);
        }
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
        setDynamicBlogs(mockBlogs); // Fallback to dummy data
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = catParam
    ? dynamicBlogs.filter(b => b.category.toLowerCase() === catParam.toLowerCase())
    : dynamicBlogs;



  const displayedBlogs = showAll ? filteredBlogs : filteredBlogs.slice(0, 3);
  const isTipsPage = catParam?.toLowerCase() === 'tips';
  const floatingSizeClasses = "w-16 md:w-36 h-16 md:h-36 overflow-hidden bg-white p-1 md:p-2 shadow-xl border border-gray-100 flex items-center justify-center";

  return (
    <section className="pb-8 md:pb-16 bg-[#FEFAF6] overflow-hidden">
      {/* COMPACT JOURNAL HERO - EXACT TYPOGRAPHY MATCH */}
      <div className="relative w-full h-[250px] md:h-[350px] bg-brand-pink/20 overflow-hidden flex flex-col items-center justify-center mb-10 md:mb-16">
        <div className="absolute inset-0 bg-brand-pink/10 pointer-events-none"></div>
        
        <div className="absolute inset-0 z-10">
          {floatingImages.map((img, index) => (
            <motion.div
              key={index}
              className={`absolute ${img.size} rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border-4 border-white/30`}
              style={{ top: img.top, left: img.left }}
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 6 + index % 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: img.delay 
              }}
            >
              <img src={img.src} alt="Journal" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-20 text-center px-4 mt-8">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-dark uppercase tracking-[0.6em] text-[8px] md:text-[11px] block mb-2 md:mb-4"
          >
            SADA BHARAT AYURVEDIC
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-decorative font-black text-brand-dark drop-shadow-lg tracking-tighter italic mb-4"
            style={{ textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)' }}
          >
            {isTipsPage ? 'BEAUTY TIPS' : 'JOURNAL'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-brand-dark font-['Poppins'] tracking-[0.2em] text-[9px] md:text-[10px] uppercase font-semibold mt-4 md:mt-6"
          >
            Stories of natural wellness, Ayurvedic beauty, and holistic health.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">


        <div className="text-center mt-8 md:mt-12 mb-12 md:mb-16">
          {!showAll && (
            <motion.button
              onClick={() => setShowAll(true)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-brand-dark text-white hover:bg-[#054425] px-12 py-4 rounded-none text-[10px] md:text-[11px]  tracking-[0.5em] transition-all duration-300 shadow-xl border border-brand-dark hover:border-[#054425] uppercase"
            >
              VIEW ALL STORIES
            </motion.button>
          )}
          {showAll && (
            <motion.button
              onClick={() => setShowAll(false)}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent text-brand-dark hover:text-[#054425] px-12 py-4 rounded-none text-[10px] md:text-[11px]  tracking-[0.5em] transition-all duration-300 "
            >
              SHOW LESS
            </motion.button>
          )}
        </div>

        {/* COMPACT BLOG CARDS GRID */}
        {showAll && (
          loading ? (
            <div className="py-20 text-center animate-pulse">
              <div className="w-10 h-10 border-4 border-brand-pink border-t-brand-gold rounded-full mx-auto mb-4 animate-spin"></div>
              <p className="text-[10px]  text-gray-400 uppercase tracking-widest tracking-[0.4em]">Retrieving Journal...</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id || blog.id}
                  onClick={() => navigate(`/blog/${blog._id || blog.id}`)}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col group cursor-pointer max-w-[240px] md:max-w-[260px] mx-auto w-full"
                >
                  <div className="relative overflow-hidden mb-3 aspect-[4/3] bg-gray-50 shadow-md border border-brand-pink/5">
                    <span className="absolute top-3 left-3 z-10 bg-brand-pink/90 text-brand-dark px-3 py-1 text-[7px] md:text-[8px]  tracking-widest uppercase shadow-sm">
                      {blog.category}
                    </span>
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                <div className="space-y-1.5 px-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-[8px] md:text-[9px]  tracking-widest uppercase">
                      <span>{blog.date}</span>
                      <span className="w-1 h-1 bg-brand-gold/20 rounded-full"></span>
                      <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-sm md:text-[15px] font-['Poppins']  text-[#5C2E3E] leading-snug group-hover:text-brand-gold transition-colors duration-300 uppercase tracking-tight">
                      {blog.title}
                    </h3>

                    <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed font-['Poppins'] opacity-70 line-clamp-2 px-2 md:px-0">
                      {blog.excerpt}
                    </p>

                    <div className="pt-1.5">
                      <button className="inline-flex items-center gap-1.5 text-[8px] md:text-[9px]  tracking-[0.2em] uppercase text-brand-dark group-hover:text-brand-gold transition-all duration-300 border-b border-brand-gold/10 group-hover:border-brand-gold pb-1">
                        READ STORY
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default BlogSection;
