import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { PRODUCTS } from '../data/products';
import { Button } from '../components/common/Button';

export const SeasonalFeatureSection: React.FC = () => {
  // Select 3 standout pieces for the seasonal edit
  const seasonalPieces = [
    PRODUCTS.find(p => p.id === 'aur-rng-001')!,
    PRODUCTS.find(p => p.id === 'aur-nck-002')!,
    PRODUCTS.find(p => p.id === 'aur-pnd-006')!,
  ].filter(Boolean);

  return (
    <section className="py-24 md:py-32 bg-ivory-100 overflow-hidden relative border-t border-hairline-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Monumental Editorial Campaign Image (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/14] lg:aspect-[4/5] w-full overflow-hidden bg-ivory-200 border border-hairline-medium shadow-elevated">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop"
                alt="Festive Edit 2026 Collection"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000 ease-luxury"
              />

              {/* Editorial Badge */}
              <div className="absolute top-6 left-6 bg-ivory-100/90 backdrop-blur-md px-4 py-2 border border-hairline-light">
                <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans block">
                  Campaign
                </span>
                <span className="font-serif text-sm text-espresso-950">
                  Festive Edit 2026
                </span>
              </div>
            </div>

            {/* Subtle floating gold caption frame */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 bg-ivory-100 p-6 border border-hairline-gold max-w-xs shadow-elevated">
              <span className="font-script text-2xl text-champagne-600 block mb-1">
                L’Art de Vivre
              </span>
              <p className="text-xs text-espresso-700 font-sans font-light leading-relaxed">
                Capturing the interplay between nocturnal candlelight and high jewelry solitaires.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Overlapping Featured Pieces (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center lg:pl-6"
          >
            <span className="font-script text-3xl text-champagne-600 block mb-2">
              exclusive capsule
            </span>

            <span className="text-[10px] sm:text-[11px] uppercase tracking-super-lux text-espresso-600 font-sans mb-3 block">
              The Seasonal Maison Edition
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-espresso-950 leading-[1.12] mb-6">
              The Nocturne Gala: Radiance in <span className="italic">fluid symmetry</span>.
            </h2>

            <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light leading-relaxed mb-8">
              A curated harmony of diamond rivières, Colombian emerald talismans, and certified radiant cuts engineered to refract ambient evening light with breathtaking drama.
            </p>

            {/* Overlapping Featured Pieces Mini-List */}
            <div className="space-y-3 mb-8">
              <span className="text-[10px] uppercase tracking-widest-lux text-champagne-700 font-sans font-medium block">
                Featured Capsule Pieces:
              </span>

              {seasonalPieces.map(piece => (
                <Link
                  key={piece.id}
                  to={`/product/${piece.id}`}
                  className="flex items-center gap-3.5 p-2.5 bg-ivory-50 hover:bg-ivory-200/80 border border-hairline-light transition-all group"
                >
                  <img
                    src={piece.primaryImage}
                    alt={piece.name}
                    className="w-12 h-14 object-cover object-center flex-shrink-0 border border-hairline-light"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm text-espresso-900 group-hover:text-champagne-600 transition-colors truncate">
                      {piece.name}
                    </h4>
                    <span className="text-[11px] text-espresso-500 font-sans block">
                      {piece.material}
                    </span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-serif text-sm text-espresso-950 font-medium block">
                      {BRAND_CONFIG.currencySymbol}{piece.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-champagne-600 flex items-center justify-end gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      <span>View</span>
                      <ArrowUpRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Button to="/shop" variant="primary" size="md">
                Explore Full Festive Edit
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
