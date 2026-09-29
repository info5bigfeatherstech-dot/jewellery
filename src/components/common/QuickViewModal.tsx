import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Heart, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BRAND_CONFIG } from '../../config/brand';
import { getLenis } from '../../hooks/useLenis';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  // Sync state whenever active product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.availableSizes ? product.availableSizes[0] : undefined);
      setActiveImageIndex(0);
      setJustAdded(false);
    }
  }, [product?.id]);

  // Synchronize Lenis and background scroll lock for lag-free modal performance
  useEffect(() => {
    const lenis = getLenis() || (window as any).lenis;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (product) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);

  const isFavorited = product ? isInWishlist(product.id) : false;

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, 1, selectedSize);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  const images = product?.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : product
    ? [product.primaryImage, product.secondaryImage].filter(Boolean) as string[]
    : [];

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 no-scrollbar">
          {/* Hardware-accelerated solid backdrop without GPU raster blur lag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-espresso-950/70 cursor-pointer"
            aria-hidden="true"
          />

          {/* Modal Window: Promoted to GPU layer for immediate sub-millisecond response */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-ivory-100 max-w-4xl w-full border border-hairline-medium shadow-2xl overflow-hidden z-10 my-4 sm:my-8 max-h-[92vh] overflow-y-auto transform-gpu will-change-transform"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 flex items-center justify-center text-espresso-700 hover:text-espresso-950 bg-ivory-50/90 rounded-full border border-hairline-light cursor-pointer shadow-xs hover:bg-champagne-50 transition-colors"
            >
              <X size={17} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Gallery & Zoom */}
              <div className="bg-ivory-200/50 p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-hairline-light">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200 border border-hairline-light">
                  <img
                    src={images[activeImageIndex] || product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="flex gap-2.5 mt-4">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-14 h-16 border overflow-hidden transition-all cursor-pointer ${
                          activeImageIndex === idx
                            ? 'border-champagne-600 ring-1 ring-champagne-500'
                            : 'border-hairline-medium opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Details & Controls */}
              <div className="p-5 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1 pr-8">
                    <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans">
                      {product.categoryName} • {product.material}
                    </span>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="text-espresso-600 hover:text-champagne-600 cursor-pointer p-1"
                      aria-label="Wishlist"
                    >
                      <Heart
                        size={18}
                        className={isFavorited ? 'fill-champagne-500 text-champagne-500' : ''}
                      />
                    </button>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-espresso-950 font-normal mb-2 leading-snug">
                    {product.name}
                  </h3>

                  <p className="font-serif text-2xl text-espresso-900 font-light mb-4">
                    {BRAND_CONFIG.currencySymbol}{product.price.toLocaleString()}
                  </p>

                  <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Ring / Bracelet Size Selector */}
                  {product.availableSizes && (
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-sans text-espresso-800 mb-2">
                        <span className="uppercase tracking-widest-lux">Select Size:</span>
                        <span className="text-champagne-600 underline cursor-pointer text-[11px]" onClick={() => alert("Standard US Ring & Wrist Sizing Chart.")}>
                          Sizing Guide
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {product.availableSizes.map(size => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-1.5 px-3 text-xs border font-sans transition-all cursor-pointer ${
                              selectedSize === size
                                ? 'border-espresso-950 bg-espresso-950 text-ivory-50 font-medium'
                                : 'border-hairline-medium text-espresso-800 hover:border-champagne-500 bg-ivory-50'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-hairline-light space-y-3">
                  <button
                    type="button"
                    onClick={handleAdd}
                    disabled={justAdded}
                    className="w-full py-3.5 bg-espresso-900 hover:bg-champagne-600 text-ivory-100 uppercase tracking-widest-lux text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                  >
                    {justAdded ? (
                      <>
                        <Check size={16} />
                        <span>Added to Shopping Bag</span>
                      </>
                    ) : (
                      <span>Add to Bag • {BRAND_CONFIG.currencySymbol}{product.price.toLocaleString()}</span>
                    )}
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="w-full py-2.5 text-center text-xs uppercase tracking-widest-lux text-espresso-700 hover:text-champagne-600 flex items-center justify-center gap-1.5 transition-colors font-medium"
                  >
                    <span>View Full Archival Details</span>
                    <ArrowRight size={13} />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-espresso-500 pt-1">
                    <Shield size={12} className="text-champagne-600" />
                    <span>Complimentary Insured White-Glove Transit & 30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
