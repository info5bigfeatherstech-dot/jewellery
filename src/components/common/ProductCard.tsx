import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { BRAND_CONFIG } from '../../config/brand';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  className?: string;
  imageAspectRatio?: string;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  className = '',
  imageAspectRatio = 'aspect-[3/4]',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { cart, addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);
  const isInCart = Boolean(cartItem);

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.availableSizes ? product.availableSizes[0] : undefined;
    addToCart(product, 1, defaultSize);
    setJustAdded(true);
    setIsCartOpen(true);
    setTimeout(() => setJustAdded(false), 2400);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div
      className={`group relative flex flex-col transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Vessel with Highlight States */}
      <div
        className={`relative ${imageAspectRatio} w-full overflow-hidden bg-ivory-200 transition-all duration-300 ${
          justAdded
            ? 'ring-2 ring-champagne-500 border-champagne-500 shadow-2xl scale-[1.015]'
            : isInCart
            ? 'ring-1.5 ring-champagne-500/80 border-champagne-400 shadow-md'
            : 'border border-hairline-light'
        }`}
      >
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={product.primaryImage}
            alt={product.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-luxury ${
              isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          {/* Secondary Image for Hover Swap */}
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-luxury ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Top-Left Badges with In-Bag Highlight */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          <AnimatePresence>
            {justAdded ? (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-emerald-700 text-white text-[9px] font-sans tracking-widest-lux uppercase py-1 px-2.5 shadow-md font-semibold flex items-center gap-1.5"
              >
                <Check size={12} strokeWidth={2.5} />
                Added to Bag
              </motion.span>
            ) : isInCart ? (
              <span className="bg-espresso-950 text-champagne-300 border border-champagne-500/50 text-[9px] font-sans tracking-widest-lux uppercase py-1 px-2.5 shadow-sm font-semibold flex items-center gap-1.5">
                <Check size={11} strokeWidth={2.2} className="text-champagne-400" />
                In Bag ({cartItem?.quantity})
              </span>
            ) : null}
          </AnimatePresence>

          {!justAdded && !isInCart && product.isNew && (
            <span className="bg-white/95 text-espresso-950 border border-hairline-light text-[9px] font-sans tracking-widest-lux uppercase py-1 px-2.5 shadow-xs font-medium">
              NEW
            </span>
          )}

          {!justAdded && !isInCart && product.isBestSeller && !product.isNew && (
            <span className="bg-espresso-950 text-ivory-50 text-[9px] font-sans tracking-widest-lux uppercase py-1 px-2.5 shadow-xs font-medium">
              ICONIC
            </span>
          )}
        </div>

        {/* Top-Right Circular Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/95 shadow-sm border border-hairline-light flex items-center justify-center text-espresso-800 hover:text-champagne-600 transition-colors cursor-pointer"
        >
          <motion.div whileTap={{ scale: 0.8 }}>
            <Heart
              size={15}
              className={`transition-colors duration-300 ${
                isFavorited
                  ? 'fill-rose-600 text-rose-600'
                  : 'text-espresso-800'
              }`}
            />
          </motion.div>
        </button>

        {/* Floating Quick Actions Bar inside Image Container */}
        <div className="absolute bottom-2 inset-x-2 sm:bottom-3 sm:inset-x-3 z-20 flex gap-1.5 sm:gap-2 transition-all duration-300 ease-luxury transform translate-y-0 sm:translate-y-2 opacity-100 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={justAdded}
            className={`flex-1 py-2 sm:py-2.5 px-2 sm:px-3 text-[9px] sm:text-[10px] uppercase font-sans font-semibold tracking-wider sm:tracking-[0.2em] transition-all duration-200 flex items-center justify-center gap-1.5 sm:gap-2 shadow-md cursor-pointer border ${
              justAdded
                ? 'bg-emerald-700 text-white border-emerald-700'
                : isInCart
                ? 'bg-champagne-50 text-espresso-950 border-champagne-400 hover:bg-espresso-950 hover:!text-white hover:border-espresso-950'
                : 'bg-white text-espresso-950 border-hairline-medium hover:bg-espresso-950 hover:!text-white hover:border-espresso-950 active:scale-98'
            }`}
          >
            {justAdded ? (
              <span className="flex items-center gap-1 sm:gap-1.5 text-white">
                <Check size={13} strokeWidth={2.2} className="text-white flex-shrink-0" />
                <span className="text-white">Added</span>
              </span>
            ) : isInCart ? (
              <span className="flex items-center gap-1 sm:gap-1.5 text-inherit">
                <Check size={12} strokeWidth={2.2} className="text-emerald-700 flex-shrink-0" />
                <span className="text-inherit">In Bag ({cartItem?.quantity})</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 sm:gap-1.5 text-inherit">
                <ShoppingBag size={13} strokeWidth={1.8} className="text-inherit flex-shrink-0" />
                <span className="text-inherit">QUICK ADD</span>
              </span>
            )}
          </button>

          {onQuickView && (
            <button
              type="button"
              onClick={handleQuickViewClick}
              aria-label="Quick preview"
              className="w-8 h-8 sm:w-10 sm:h-10 bg-white text-espresso-950 border border-hairline-medium hover:bg-espresso-950 hover:!text-white hover:border-espresso-950 flex items-center justify-center transition-colors duration-200 shadow-md cursor-pointer flex-shrink-0"
            >
              <Eye size={14} strokeWidth={1.8} className="text-inherit" />
            </button>
          )}
        </div>
      </div>

      {/* Product Details below Image */}
      <div className="pt-2.5 sm:pt-3 pb-1 flex flex-col flex-1">
        {/* Category, Material Tag, and In-Bag Highlight */}
        <div className="flex items-center justify-between mb-0.5 sm:mb-1 gap-1">
          <span className="text-[9px] sm:text-[10px] tracking-wider sm:tracking-super-lux uppercase text-champagne-600 font-sans font-medium truncate">
            {product.categoryName} • {product.material}
          </span>
          {isInCart && (
            <span className="inline-flex items-center gap-0.5 text-[8px] sm:text-[9px] font-sans font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-1 sm:px-1.5 py-0.2 rounded-xs flex-shrink-0">
              <Check size={8} strokeWidth={2.5} />
              In Bag
            </span>
          )}
        </div>

        {/* Product Name Serif */}
        <Link
          to={`/product/${product.id}`}
          className="font-serif text-sm sm:text-base lg:text-lg font-normal text-espresso-950 hover:text-champagne-600 transition-colors duration-300 leading-snug line-clamp-1 mb-0.5"
        >
          {product.name}
        </Link>

        {/* Subtitle Sans */}
        {product.subtitle && (
          <p className="text-[10px] sm:text-[11px] text-espresso-500 line-clamp-1 mb-1 sm:mb-1.5 font-sans font-light">
            {product.subtitle}
          </p>
        )}

        {/* Pricing row with Save Tag */}
        <div className="mt-auto flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5">
          <span className="font-serif text-sm sm:text-base text-espresso-950 font-medium">
            {BRAND_CONFIG.currencySymbol}{product.price.toLocaleString()}
          </span>

          {product.originalPrice && (
            <span className="text-[11px] sm:text-xs text-espresso-400 line-through font-serif font-light">
              {BRAND_CONFIG.currencySymbol}{product.originalPrice.toLocaleString()}
            </span>
          )}

          {discountPercent && (
            <span className="ml-auto text-[8px] sm:text-[9px] uppercase font-bold tracking-wider px-1 sm:px-1.5 py-0.5 border border-espresso-800 rounded-sm text-espresso-900 bg-white">
              SAVE {discountPercent}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProductCard = React.memo(ProductCardComponent);
