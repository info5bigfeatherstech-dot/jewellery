import React from 'react';
import { motion } from 'framer-motion';
import { BRAND_CONFIG } from '../config/brand';
import { Button } from '../components/common/Button';

export const CraftsmanshipStorySection: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-ivory-200/40 border-t border-hairline-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Atelier Workshop Image (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-300 border border-hairline-medium shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1611591475878-a28d54238e83?q=80&w=1400&auto=format&fit=crop"
                alt="Aurelia Master Bench Jeweler Setting Diamonds"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-luxury"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Stamp */}
            <div className="absolute -bottom-8 -right-6 sm:bottom-8 sm:-right-8 bg-ivory-100 p-6 border border-hairline-gold shadow-2xl max-w-[220px] text-center hidden sm:block">
              <span className="font-serif text-3xl font-light text-espresso-950 block">
                BIS
              </span>
              <span className="text-[9px] uppercase tracking-super-lux text-champagne-600 font-sans block mt-1">
                Hallmarked Purity
              </span>
              <p className="text-[11px] text-espresso-500 font-sans font-light mt-1">
                Every ingot melted, tested, and laser-inscribed in Florence.
              </p>
            </div>
          </motion.div>

          {/* Story Narrative & Stats (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <span className="font-script text-3xl text-champagne-600 block mb-2">
              savoir-faire
            </span>

            <span className="text-[10px] sm:text-[11px] uppercase tracking-super-lux text-espresso-600 font-sans mb-3 block">
              Atelier Heritage Since {BRAND_CONFIG.established}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-espresso-950 leading-[1.14] mb-6">
              A century of devotion to the <span className="italic">intimacy of touch</span>.
            </h2>

            <p className="font-sans text-xs sm:text-sm text-espresso-700 font-light leading-relaxed mb-6">
              At {BRAND_CONFIG.name}, fine jewelry is neither mass-stamped nor rushed. In our Madison Avenue and Parisian ateliers, master setters examine raw stones under 40x magnification, calibrating prong heights to within hundredths of a millimeter so maximum sunlight floods every pavilion.
            </p>

            <p className="font-sans text-xs sm:text-sm text-espresso-600 font-light leading-relaxed mb-10">
              We exclusively smelt 100% recycled 18-karat gold and 950 platinum, ensuring each ring, rivière, and cuff honors both geological antiquity and ecological guardianship for generations to come.
            </p>

            {/* Three Stats with Big Serif Numerals */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 border-y border-hairline-light mb-10">
              <div>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-espresso-950 block">
                  100+
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-lux text-champagne-600 font-sans block mt-1">
                  Years of Craft
                </span>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-espresso-950 block">
                  100%
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-lux text-champagne-600 font-sans block mt-1">
                  Conflict-Free
                </span>
              </div>

              <div>
                <span className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-espresso-950 block">
                  50k+
                </span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest-lux text-champagne-600 font-sans block mt-1">
                  Heirlooms Gifted
                </span>
              </div>
            </div>

            <div>
              <Button to="/about" variant="primary" size="md">
                Discover Our Full Story & Ateliers
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
