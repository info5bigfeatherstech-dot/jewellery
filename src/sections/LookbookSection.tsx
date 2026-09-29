import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight } from 'lucide-react';
import { LOOKBOOK_ITEMS } from '../data/lookbook';
import { SectionHeading } from '../components/common/SectionHeading';
import { BRAND_CONFIG } from '../config/brand';

export const LookbookSection: React.FC = () => {
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 bg-ivory-200/50 border-t border-hairline overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          scriptAccent="The Editorial Journal"
          label="Visual Curations"
          title={
            <>
              Visions of modern <span className="italic">grandeur</span>.
            </>
          }
          subtitle="Explore our styled lookbook captured on location in historic villas, showcasing how Aurelia creations harmonize in layered compositions."
        />

        {/* Masonry-Style Asymmetrical Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12 items-start">
          {LOOKBOOK_ITEMS.map((item, idx) => {
            // Asymmetric layout span
            const colSpan =
              idx === 0
                ? 'md:col-span-7'
                : idx === 1
                ? 'md:col-span-5'
                : idx === 2
                ? 'md:col-span-5'
                : 'md:col-span-7';

            const aspectClass =
              item.size === 'tall'
                ? 'aspect-[4/5] sm:aspect-[3/4]'
                : item.size === 'wide'
                ? 'aspect-[16/10]'
                : 'aspect-square';

            const isHotspotOpen = activeHotspotId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`${colSpan} group relative`}
              >
                <div className={`relative ${aspectClass} w-full overflow-hidden bg-ivory-300 border border-hairline`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-104 transition-transform duration-1000 ease-luxury"
                  />

                  {/* Hotspot Pin if available */}
                  {item.hotspot && (
                    <div
                      className="absolute z-20"
                      style={{
                        left: `${item.hotspot.x}%`,
                        top: `${item.hotspot.y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <button
                        onClick={() => setActiveHotspotId(isHotspotOpen ? null : item.id)}
                        className="relative w-8 h-8 rounded-full bg-ivory-100/90 backdrop-blur-md text-espresso-950 flex items-center justify-center shadow-lg border border-hairline-gold hover:scale-110 transition-transform cursor-pointer"
                        aria-label={`Inspect ${item.hotspot.productName}`}
                      >
                        {/* Pulsing ring */}
                        <span className="absolute inset-0 rounded-full bg-champagne-400/40 animate-ping opacity-75" />
                        <Plus size={14} className={`relative z-10 transition-transform ${isHotspotOpen ? 'rotate-45' : ''}`} />
                      </button>

                      {/* Hotspot Popover Tooltip */}
                      <AnimatePresence>
                        {isHotspotOpen && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="absolute left-1/2 -translate-x-1/2 bottom-10 w-56 sm:w-64 p-3.5 bg-ivory-100/98 backdrop-blur-lg border border-hairline shadow-2xl z-30"
                          >
                            <span className="text-[9px] uppercase tracking-widest text-champagne-600 font-sans block mb-1">
                              Featured Heirloom
                            </span>
                            <h4 className="font-serif text-sm text-espresso-950 font-normal leading-snug">
                              {item.hotspot.productName}
                            </h4>
                            <p className="font-serif text-xs text-espresso-700 mt-1 mb-2">
                              {BRAND_CONFIG.currencySymbol}{item.hotspot.productPrice.toLocaleString()}
                            </p>
                            <Link
                              to={`/product/${item.hotspot.productId}`}
                              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-sans text-champagne-700 hover:text-espresso-950 transition-colors"
                            >
                              <span>View Creation</span>
                              <ArrowRight size={12} />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Gradient vignette on bottom for subtle readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Caption & Title on hover or fixed */}
                  <div className="absolute bottom-5 left-5 right-5 text-ivory-50">
                    <span className="text-[10px] uppercase tracking-widest text-champagne-300 block mb-1 font-sans">
                      Volume IV • Look 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-normal leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ivory-200/90 font-light font-sans mt-1 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
