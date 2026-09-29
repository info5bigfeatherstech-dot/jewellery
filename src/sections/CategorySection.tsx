import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface FeaturedStory {
  id: string;
  label: string;
  title: string;
  tagline: string;
  image: string;
  slug: string;
}

const FEATURED_STORIES: FeaturedStory[] = [
  {
    id: 'feat-1',
    label: 'FEATURED CATEGORY',
    title: 'Necklaces & Pendants',
    tagline: 'TIMELESS PIECES, ENDLESS STORIES',
    image: '/images/categories/featured_necklace.jpg',
    slug: 'necklaces',
  },
  {
    id: 'feat-2',
    label: 'FEATURED CATEGORY',
    title: 'Solitaires & Rings',
    tagline: 'SCULPTURAL PURITY, FOREVER RADIANCE',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    slug: 'rings',
  },
  {
    id: 'feat-3',
    label: 'FEATURED CATEGORY',
    title: 'Armored Cuffs & Links',
    tagline: 'ARTICULATED SOLID 18K GOLD',
    image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?q=80&w=1200&auto=format&fit=crop',
    slug: 'bracelets',
  },
];

interface CategoryItem {
  id: string;
  name: string;
  tagline: string;
  image: string;
  slug: string;
}

const CATEGORY_CARDS: CategoryItem[] = [
  {
    id: 'cat-bracelets',
    name: 'BRACELETS',
    tagline: 'GRACE IN EVERY DETAIL',
    image: '/images/categories/bracelets.jpg',
    slug: 'bracelets',
  },
  {
    id: 'cat-bangles',
    name: 'BANGLES',
    tagline: 'BOLD. CLASSIC. FOREVER.',
    image: '/images/categories/bangles.jpg',
    slug: 'bangles',
  },
  {
    id: 'cat-pendants',
    name: 'PENDANTS',
    tagline: 'A TOUCH OF ELEGANCE',
    image: '/images/categories/pendants.jpg',
    slug: 'pendants',
  },
  {
    id: 'cat-bridal',
    name: 'WEDDING & BRIDAL',
    tagline: 'FOR YOUR FOREVER',
    image: '/images/categories/bridal.jpg',
    slug: 'bridal',
  },
  {
    id: 'cat-mens',
    name: "MEN'S",
    tagline: 'MODERN. REFINED. BOLD.',
    image: '/images/categories/mens.jpg',
    slug: 'mens',
  },
  {
    id: 'cat-earrings',
    name: 'EARRINGS',
    tagline: 'SMALL DETAILS, BIG IMPACT',
    image: '/images/categories/earrings.jpg',
    slug: 'earrings',
  },
];

export const CategorySection: React.FC = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const prevFeatured = () => {
    setFeaturedIndex(prev => (prev === 0 ? FEATURED_STORIES.length - 1 : prev - 1));
  };

  const nextFeatured = () => {
    setFeaturedIndex(prev => (prev === FEATURED_STORIES.length - 1 ? 0 : prev + 1));
  };

  const currentFeatured = FEATURED_STORIES[featuredIndex];

  return (
    <section className="py-20 md:py-28 bg-ivory-100 border-t border-hairline-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-espresso-600 font-sans block mb-2 font-medium">
            CURATED FOR EVERY MOMENT
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-espresso-950 font-normal tracking-tight">
            Shop by Category
          </h2>
          <div className="w-14 h-[1.5px] bg-champagne-500/70 mx-auto mt-4" />
        </div>

        {/* Asymmetrical Grid: 1 Large Left Card + 6 Category Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* Left Column: Large Featured Category Card (Spans full height of 2 rows) */}
          <div className="lg:col-span-4 h-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] relative rounded-xl sm:rounded-2xl overflow-hidden shadow-subtle border border-hairline-light group">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeatured.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img
                  src={currentFeatured.image}
                  alt={currentFeatured.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-105"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dark Editorial Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/90 via-espresso-950/35 to-transparent pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-8 text-ivory-50">
              <span className="text-[10px] uppercase tracking-[0.25em] text-ivory-300 font-sans font-medium block mb-1">
                {currentFeatured.label}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 font-normal tracking-wide mb-1">
                {currentFeatured.title}
              </h3>

              <p className="text-[10px] uppercase tracking-widest text-ivory-300/90 font-sans mb-5 sm:mb-6 font-light">
                {currentFeatured.tagline}
              </p>

              {/* Bottom Actions Row: Explore Link on Left, Arrows on Right */}
              <div className="flex items-center justify-between pt-3 border-t border-hairline-white/20">
                <Link
                  to={`/shop?category=${currentFeatured.slug}`}
                  className="text-xs uppercase tracking-widest-lux font-medium text-ivory-100 hover:text-champagne-300 transition-colors flex items-center gap-1.5"
                >
                  <span>EXPLORE</span>
                  <ArrowRight size={13} />
                </Link>

                {/* Left/Right Switch Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevFeatured}
                    aria-label="Previous featured category"
                    className="w-8 h-8 rounded-full border border-ivory-100/40 bg-espresso-950/40 backdrop-blur-sm text-ivory-100 flex items-center justify-center hover:border-champagne-400 hover:text-champagne-300 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={nextFeatured}
                    aria-label="Next featured category"
                    className="w-8 h-8 rounded-full border border-ivory-100/40 bg-espresso-950/40 backdrop-blur-sm text-ivory-100 flex items-center justify-center hover:border-champagne-400 hover:text-champagne-300 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Cards in a 2-Col Mobile -> 2-Col Tablet -> 3-Col Desktop Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
            {CATEGORY_CARDS.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="bg-ivory-50/90 border border-hairline-light rounded-xl sm:rounded-2xl p-3.5 sm:p-7 flex flex-col items-center justify-between text-center hover:border-champagne-400/80 hover:bg-ivory-50 hover:shadow-elevated transition-all duration-400 group cursor-pointer hover:-translate-y-1"
              >
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="flex flex-col items-center w-full focus:outline-none"
                >
                  {/* Circular Image Vessel */}
                  <div className="relative w-20 h-20 min-[360px]:w-24 min-[360px]:h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden bg-ivory-200 border border-hairline-light/80 shadow-[0_6px_18px_rgba(0,0,0,0.06)] group-hover:shadow-[0_8px_24px_rgba(184,151,90,0.25)] group-hover:border-champagne-400 transition-all duration-500 mb-2.5 sm:mb-4">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-110"
                    />
                  </div>

                  {/* Category Title */}
                  <h4 className="font-serif text-xs min-[360px]:text-sm sm:text-base tracking-[0.16em] sm:tracking-[0.22em] uppercase text-espresso-950 group-hover:text-champagne-600 transition-colors font-medium">
                    {cat.name}
                  </h4>

                  {/* Editorial Tagline */}
                  <p className="text-[9px] min-[360px]:text-[10px] text-espresso-500 uppercase tracking-widest font-sans mt-1 line-clamp-1">
                    {cat.tagline}
                  </p>
                </Link>

                {/* Explore Link at Bottom */}
                <Link
                  to={`/shop?category=${cat.slug}`}
                  className="text-[9px] sm:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium text-espresso-800 group-hover:text-champagne-600 transition-colors mt-3 sm:mt-5 flex items-center justify-center gap-1"
                >
                  <span>EXPLORE</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
