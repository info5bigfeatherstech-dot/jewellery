import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MATERIALS } from '../data/materials';
import { SectionHeading } from '../components/common/SectionHeading';

export const MaterialGemstoneSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-ivory-100 border-t border-hairline-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          scriptAccent="Pure Elements"
          label="Precious Provenance"
          title={
            <>
              Certified noble metals and <span className="italic">rare earth gems</span>.
            </>
          }
          subtitle="Every creation adheres to the strict Kimberley Process and utilizes 100% recycled 18-karat gold and conflict-free gemstones."
        />

        {/* Swatches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {MATERIALS.map((mat, idx) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <Link
                to={`/shop?material=${mat.id}`}
                className="group flex flex-col items-center text-center"
              >
                {/* Arched Swatch Frame */}
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 arch-top overflow-hidden bg-ivory-200 border border-hairline-medium transition-all duration-500 group-hover:border-champagne-500 shadow-subtle group-hover:shadow-elevated mb-4">
                  <img
                    src={mat.image}
                    alt={mat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-luxury"
                  />
                  {/* Subtle color swatch circle indicator */}
                  <div className="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-full border border-ivory-100/80 shadow-sm" style={{ backgroundColor: mat.colorHex }} />
                </div>

                <h4 className="font-serif text-base sm:text-lg text-espresso-950 group-hover:text-champagne-600 transition-colors font-medium">
                  {mat.name}
                </h4>

                <p className="text-[11px] text-espresso-500 font-sans font-light mt-1 line-clamp-2 px-1">
                  {mat.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
