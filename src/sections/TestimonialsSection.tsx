import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex(idx => (idx === 0 ? TESTIMONIALS.length - 1 : idx - 1));
  };

  const next = () => {
    setCurrentIndex(idx => (idx === TESTIMONIALS.length - 1 ? 0 : idx + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 md:py-36 bg-ivory-200/40 border-t border-hairline overflow-hidden relative">
      {/* Subtle watermark quote mark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[280px] text-champagne-300/10 pointer-events-none select-none font-italic leading-none">
        “
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Subtitle flourish */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="font-script text-3xl sm:text-4xl text-champagne-600">Patron Reflections</span>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center justify-center gap-1.5 mb-8">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={15}
              className="fill-champagne-500 text-champagne-500"
              strokeWidth={0}
            />
          ))}
        </div>

        {/* Animated Single-Quote Slider */}
        <div className="min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl font-light italic text-espresso-950 leading-relaxed max-w-3xl mx-auto">
                “{current.quote}”
              </blockquote>

              <div className="pt-4 border-t border-hairline-gold/40 inline-block">
                <p className="font-sans text-xs uppercase tracking-widest text-espresso-900 font-medium">
                  {current.author}
                </p>
                <p className="font-sans text-[11px] text-espresso-500 tracking-wider mt-1">
                  {current.location} • Acquired the <span className="text-champagne-700 font-normal">{current.piecePurchased}</span>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center text-espresso-700 hover:border-champagne-500 hover:text-champagne-600 transition-colors cursor-pointer"
            aria-label="Previous patron reflection"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all rounded-full cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-champagne-500' : 'w-2 bg-espresso-300'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center text-espresso-700 hover:border-champagne-500 hover:text-champagne-600 transition-colors cursor-pointer"
            aria-label="Next patron reflection"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
