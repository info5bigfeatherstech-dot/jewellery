import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Gift } from 'lucide-react';
import { OCCASIONS } from '../data/occasions';
import { SectionHeading } from '../components/common/SectionHeading';

export const OccasionGiftingSection: React.FC = () => {
  const [activeOccasion, setActiveOccasion] = useState(OCCASIONS[0]);

  return (
    <section className="py-24 md:py-32 bg-ivory-200/60 border-t border-hairline-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          scriptAccent="Moments of Grace"
          label="The Art of Gifting"
          title={
            <>
              Commemorate life's <span className="italic">sacred milestones</span>.
            </>
          }
          subtitle="Every bespoke package arrives with hand-calligraphed notes, velvet presentation cases, and wax-sealed certificates of origin."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Interactive Occasion List (7 cols) */}
          <div className="lg:col-span-7 divide-y divide-hairline-light border-y border-hairline-light">
            {OCCASIONS.map((occ, idx) => {
              const isSelected = activeOccasion.id === occ.id;
              return (
                <div
                  key={occ.id}
                  onClick={() => setActiveOccasion(occ)}
                  onMouseEnter={() => setActiveOccasion(occ)}
                  className={`py-4 sm:py-6 px-2.5 sm:px-4 cursor-pointer transition-colors duration-400 flex items-center justify-between group ${
                    isSelected ? 'bg-ivory-100/70 border-l-2 border-l-champagne-500' : 'hover:bg-ivory-100/40'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-6">
                    <span className="font-serif text-xs sm:text-base text-champagne-600 font-light w-5 sm:w-6 flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2 sm:gap-3">
                        <h3
                          className={`font-serif text-lg sm:text-2xl md:text-3xl transition-colors duration-300 font-normal ${
                            isSelected ? 'text-espresso-950 font-medium' : 'text-espresso-800 group-hover:text-champagne-700'
                          }`}
                        >
                          {occ.name}
                        </h3>
                        <span className="text-[10px] uppercase tracking-super-lux text-espresso-400 font-sans hidden sm:inline">
                          {occ.curatedCount} Creations
                        </span>
                      </div>
                      <p className="text-xs text-espresso-500 font-sans font-light mt-0.5 sm:mt-1 max-w-md line-clamp-1">
                        {occ.description}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/shop"
                    className={`flex items-center gap-1.5 text-xs uppercase tracking-widest-lux font-medium transition-all duration-300 ${
                      isSelected
                        ? 'text-champagne-600 translate-x-0 opacity-100'
                        : 'text-espresso-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0'
                    }`}
                  >
                    <span>Curate</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Dynamic Large Preview Image Swapper (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-100 border border-hairline-medium shadow-elevated">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeOccasion.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <img
                    src={activeOccasion.image}
                    alt={activeOccasion.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso-950/80 via-espresso-950/20 to-transparent" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-ivory-100">
                    <div className="flex items-center gap-2 text-champagne-300 text-[10px] uppercase tracking-widest-lux mb-1">
                      <Gift size={13} />
                      <span>{activeOccasion.tagline}</span>
                    </div>
                    <h4 className="font-serif text-2xl text-ivory-50 mb-2">
                      Gifts for {activeOccasion.name}
                    </h4>
                    <p className="text-xs text-ivory-300/80 font-sans font-light leading-relaxed mb-4">
                      {activeOccasion.description}
                    </p>
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-widest-lux text-champagne-400 hover:text-ivory-50 link-underline font-medium"
                    >
                      <span>Explore Gifting Suite</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
