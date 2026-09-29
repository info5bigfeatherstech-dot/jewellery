import React, { useState, useEffect, useDeferredValue, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';
import { BRAND_CONFIG } from '../../config/brand';
import { getLenis } from '../../hooks/useLenis';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SEARCHES = ['Diamond Solitaire', 'Rivière', 'Colombian Emerald', 'Baroque Pearl', '18K Gold Cuff', 'Bridal'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  // Synchronize Lenis and body scroll lock for buttery smooth performance
  useEffect(() => {
    const lenis = getLenis() || (window as any).lenis;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      setQuery('');
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Fast memoized search filter with deferred query to eliminate typing latency
  const results = useMemo<Product[]>(() => {
    const trimmed = deferredQuery.trim().toLowerCase();
    if (!trimmed) return [];
    return PRODUCTS.filter(
      p =>
        p.name.toLowerCase().includes(trimmed) ||
        p.categoryName.toLowerCase().includes(trimmed) ||
        p.material.toLowerCase().includes(trimmed) ||
        (p.gemstone && p.gemstone.toLowerCase().includes(trimmed)) ||
        p.description.toLowerCase().includes(trimmed)
    );
  }, [deferredQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto no-scrollbar flex items-start justify-center p-4 sm:p-6 md:p-10">
          {/* Hardware-accelerated backdrop without costly full-screen backdrop-blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/50 cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl mt-6 sm:mt-16 bg-ivory-100 border border-hairline-medium shadow-2xl p-4 sm:p-8 md:p-10 z-10 will-change-transform transform-gpu max-h-[92vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close search"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-espresso-600 hover:text-espresso-900 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans block mb-2 font-medium">
              Concierge Search
            </span>

            {/* Input */}
            <div className="relative border-b border-espresso-900 pb-2.5 sm:pb-3 mb-5 sm:mb-6 flex items-center pr-8">
              <Search size={20} className="text-champagne-600 mr-2.5 sm:mr-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search high jewelry, solitaires, gemstones..."
                autoFocus
                className="w-full bg-transparent font-serif text-sm sm:text-2xl text-espresso-900 placeholder:text-espresso-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="text-xs uppercase tracking-widest-lux text-espresso-500 hover:text-espresso-900 cursor-pointer px-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Suggestions */}
            {!query && (
              <div>
                <span className="text-[11px] font-sans uppercase tracking-widest-lux text-espresso-500 block mb-3 font-medium">
                  Curated Searches
                </span>
                <div className="flex flex-wrap gap-2">
                  {QUICK_SEARCHES.map(term => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs py-1.5 px-3.5 bg-ivory-200 hover:bg-ivory-300 text-espresso-800 border border-hairline-light transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className="max-h-[50vh] overflow-y-auto mt-4 divide-y divide-hairline-light pr-1 no-scrollbar">
                {results.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="font-serif text-lg text-espresso-800 mb-1">
                      No pieces found matching "{query}"
                    </p>
                    <p className="text-xs text-espresso-500 font-sans">
                      Our concierge is at your service for bespoke commissions and rare stones.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-widest-lux text-espresso-500 block mb-3 font-medium">
                      Found {results.length} {results.length === 1 ? 'Creation' : 'Creations'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {results.map(product => (
                        <Link
                          key={product.id}
                          to={`/product/${product.id}`}
                          onClick={onClose}
                          className="flex items-center gap-3.5 p-2.5 hover:bg-ivory-200/80 border border-transparent hover:border-hairline-light transition-all group"
                        >
                          <img
                            src={product.primaryImage}
                            alt={product.name}
                            className="w-14 h-14 object-cover object-center flex-shrink-0 border border-hairline-light"
                            loading="lazy"
                          />
                          <div className="flex-1 min-w-0">
                            <span className="text-[9px] uppercase tracking-widest-lux text-champagne-600 block">
                              {product.categoryName}
                            </span>
                            <h4 className="font-serif text-sm sm:text-base text-espresso-900 group-hover:text-champagne-600 transition-colors truncate">
                              {product.name}
                            </h4>
                            <span className="text-xs font-serif text-espresso-700">
                              {BRAND_CONFIG.currencySymbol}{product.price.toLocaleString()}
                            </span>
                          </div>
                          <ArrowRight
                            size={15}
                            className="text-espresso-400 group-hover:text-champagne-600 group-hover:translate-x-1 transition-all mr-1 flex-shrink-0"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
