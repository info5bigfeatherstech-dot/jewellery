import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import { Button } from '../components/common/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ivory-100">
      {/* Editorial Background Image with Warm Vignette */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2200&auto=format&fit=crop"
            alt="Aurelia High Jewelry Editorial"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
          />
        </motion.div>
        {/* Warm Ivory Editorial Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/85 to-transparent md:w-3/5 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6F0] via-transparent to-[#FAF6F0]/30 z-[1]" />
      </div>


      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="max-w-2xl">
          {/* Script Flourish & Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="font-script text-3xl sm:text-4xl text-champagne-600 font-normal">
              haute joaillerie
            </span>
            <div className="h-[1px] w-12 bg-champagne-500/50" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-super-lux text-espresso-700 font-sans font-medium">
              Autumn Winter 2026
            </span>
          </motion.div>

          {/* Oversized Serif Headline mixing regular and italic words */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl min-[380px]:text-4xl sm:text-5xl lg:text-6xl font-light text-espresso-950 leading-[1.08] tracking-tight mb-4 sm:mb-6 capitalize"
          >
            Adorned in <span className="font-normal italic font-serif text-champagne-700">timeless</span> light, sculpted for <span className="italic">eternity</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-xs sm:text-base text-espresso-700 font-light leading-relaxed mb-8 sm:mb-10 max-w-lg capitalize"
          >
            Discover certified conflict-free solitaires and bespoke heirloom creations crafted by hand in 18-karat recycled gold and purest platinum.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6"
          >
            <Button
              to="/shop"
              variant="primary"
              size="lg"
              icon={<ArrowUpRight size={15} />}
            >
              Shop New Arrivals
            </Button>

            <Button
              to="/shop?category=bridal"
              variant="outline"
              size="lg"
            >
              Explore Collections
            </Button>
          </motion.div>

          {/* Floating Subtle Stats Badges: Fluid 3-Column Grid on all viewports */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-hairline-light/80 grid grid-cols-3 gap-2 sm:gap-6 text-espresso-800"
          >
            <div className="border-r border-hairline-light/60 pr-2">
              <span className="font-serif text-xl min-[380px]:text-2xl font-light text-espresso-950 block">100+</span>
              <span className="text-[8px] min-[380px]:text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest-lux text-espresso-600 font-sans block leading-tight mt-0.5">
                Years of Mastery
              </span>
            </div>
            <div className="border-r border-hairline-light/60 pr-2">
              <span className="font-serif text-xl min-[380px]:text-2xl font-light text-espresso-950 block">100%</span>
              <span className="text-[8px] min-[380px]:text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest-lux text-espresso-600 font-sans block leading-tight mt-0.5">
                Certified Conflict-Free
              </span>
            </div>
            <div>
              <span className="font-serif text-xl min-[380px]:text-2xl font-light text-espresso-950 block">Flawless</span>
              <span className="text-[8px] min-[380px]:text-[9px] sm:text-[10px] uppercase tracking-wider sm:tracking-widest-lux text-espresso-600 font-sans block leading-tight mt-0.5">
                Bespoke Atelier Finish
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
