import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import type { Product } from '../types';

const DEAL_SLUGS = [
  'deal-checkered-silk-scarf',
  'deal-turquoise-botanical-scarf',
  'deal-gilded-evil-eye-bracelet',
  'deal-micro-pave-huggie-earrings',
  'bs-multi-chain-gold-pendant',
  'bs-pearl-choker-box',
];

export const NewArrivalsSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const dealProducts = DEAL_SLUGS.map(slug => PRODUCTS.find(p => p.id === slug)).filter(Boolean) as Product[];

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = Math.max(300, clientWidth * 0.75);
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-ivory-100 border-t border-hairline-light overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Centered Editorial Header matching screenshot */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-espresso-950 font-normal tracking-wide flex items-center justify-center gap-2">
            <span>Everything For Just {BRAND_CONFIG.currencySymbol}99</span>
            <span className="text-champagne-500"></span>
          </h2>

          <p className="text-xs sm:text-sm text-espresso-800 font-sans mt-2 tracking-wide font-medium flex items-center justify-center gap-1.5">
            <span>Top Quality Anti-Tarnish Jewellery</span>
            {/* <span className="text-champagne-500 text-xs">✨</span> */}
          </p>

          <div className="mt-5">
            <Link
              to="/shop?sort=newest"
              className="inline-flex items-center justify-center px-6 py-2 border border-espresso-900 text-espresso-950 hover:bg-espresso-950 hover:text-white transition-colors duration-300 text-xs font-sans tracking-wide font-normal"
            >
              New Arrivals &gt;
            </Link>
          </div>
        </div>

        {/* Carousel Container with Edge Arrows */}
        <div className="relative group/deals">

          {/* Flush Left Arrow Button (hidden on mobile for unobstructed touch swipe) */}
          <button
            type="button"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Previous items"
            className={`hidden sm:flex absolute left-0 top-[35%] -translate-y-1/2 z-20 w-8 h-12 sm:h-14 bg-espresso-950 text-white items-center justify-center transition-all cursor-pointer shadow-md ${canScrollLeft
                ? 'opacity-90 hover:opacity-100 hover:bg-champagne-600'
                : 'opacity-0 pointer-events-none'
              }`}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>

          {/* Flush Right Arrow Button (hidden on mobile for unobstructed touch swipe) */}
          <button
            type="button"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Next items"
            className={`hidden sm:flex absolute right-0 top-[35%] -translate-y-1/2 z-20 w-8 h-12 sm:h-14 bg-espresso-950 text-white items-center justify-center transition-all cursor-pointer shadow-md ${canScrollRight
                ? 'opacity-90 hover:opacity-100 hover:bg-champagne-600'
                : 'opacity-0 pointer-events-none'
              }`}
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>

          {/* Horizontal Scroll Track rendering reference ProductCards */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-1 select-none"
          >
            {dealProducts.map((product) => (
              <div
                key={product.id}
                className="w-[155px] min-[375px]:w-[175px] sm:w-[240px] md:w-[280px] lg:w-[calc(25%-18px)] flex-shrink-0"
              >
                <ProductCard
                  product={product}
                  imageAspectRatio="aspect-square"
                  onQuickView={setQuickViewProduct}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};
