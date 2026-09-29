import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { BRAND_CONFIG } from '../../config/brand';
import { Button } from './Button';
import { getLenis } from '../../hooks/useLenis';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Smooth scroll and keyboard management when cart is opened
  useEffect(() => {
    const lenis = getLenis() || (window as any).lenis;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
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
  }, [isCartOpen, setIsCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Hardware-accelerated clean backdrop without GPU blur lag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-espresso-950/45 cursor-pointer"
            aria-hidden="true"
          />

          {/* Drawer Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-ivory-100 flex flex-col shadow-2xl border-l border-hairline-medium pointer-events-auto transform-gpu will-change-transform"
            >
              {/* Header */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-hairline-light flex items-center justify-between bg-ivory-100">
                <div className="flex items-baseline gap-2">
                  <h2 className="font-serif text-xl tracking-tight text-espresso-900 font-normal">
                    Your Shopping Bag
                  </h2>
                  <span className="text-xs text-champagne-600 font-sans tracking-widest-lux uppercase">
                    ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 text-espresso-600 hover:text-espresso-900 transition-colors cursor-pointer rounded-full hover:bg-ivory-200"
                  aria-label="Close cart"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Free Shipping Tier Banner */}
              <div className="bg-ivory-200/70 px-6 py-3 border-b border-hairline-light">
                <div className="text-[11px] font-sans text-espresso-700 mb-1.5 flex justify-between">
                  <span>
                    {remainingForFreeShipping > 0
                      ? `Add ${BRAND_CONFIG.currencySymbol}${remainingForFreeShipping.toLocaleString()} for Complimentary Armored Shipping`
                      : 'Unlocked Complimentary Armored Shipping & Silk Gift Wrap'}
                  </span>
                  <span className="font-medium text-champagne-600">
                    {Math.round(progressToFreeShipping)}%
                  </span>
                </div>
                <div className="w-full h-1 bg-ivory-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-champagne-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-hairline-light overscroll-contain">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-ivory-200 border border-hairline-gold flex items-center justify-center text-champagne-600 mb-4 shadow-sm">
                      <ShoppingBag size={24} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-serif text-xl text-espresso-900 mb-2">
                      Your bag is currently empty
                    </h3>
                    <p className="text-xs text-espresso-500 max-w-xs mb-6 font-sans">
                      Immerse yourself in our haute joaillerie collections and handcrafted solitaires.
                    </p>
                    <Button
                      to="/shop"
                      onClick={() => setIsCartOpen(false)}
                      variant="primary"
                      size="sm"
                    >
                      Explore Creations
                    </Button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="py-4 flex gap-4">
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setIsCartOpen(false)}
                        className="w-20 h-24 flex-shrink-0 bg-ivory-200 border border-hairline-light overflow-hidden rounded-sm"
                      >
                        <img
                          src={item.product.primaryImage}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={() => setIsCartOpen(false)}
                              className="font-serif text-base text-espresso-900 hover:text-champagne-600 transition-colors line-clamp-1 font-normal"
                            >
                              {item.product.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                              className="text-espresso-400 hover:text-red-700 transition-colors p-1 cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>

                          <div className="text-[11px] text-espresso-500 mt-0.5 space-x-2">
                            <span>{item.product.material}</span>
                            {item.selectedSize && (
                              <span>• Size: {item.selectedSize}</span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity control */}
                          <div className="flex items-center border border-hairline-medium bg-ivory-50 rounded-sm">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)
                              }
                              className="p-1.5 text-espresso-600 hover:text-espresso-950 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-xs font-sans text-espresso-900 select-none">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)
                              }
                              className="p-1.5 text-espresso-600 hover:text-espresso-950 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-serif text-base text-espresso-900 font-medium">
                            {BRAND_CONFIG.currencySymbol}{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="border-t border-hairline-light p-4 sm:p-6 bg-ivory-50 space-y-3.5 sm:space-y-4">
                  {/* Gift presentation note */}
                  <div className="flex items-center gap-2.5 text-[11px] text-espresso-600 bg-ivory-200/50 p-2.5 border border-hairline-light rounded-sm">
                    <Gift size={15} className="text-champagne-600 flex-shrink-0" />
                    <span>Includes signature suede presentation box & wax-sealed certification.</span>
                  </div>

                  {/* Subtotal */}
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-sans text-xs uppercase tracking-widest-lux text-espresso-600">
                      Estimated Subtotal
                    </span>
                    <span className="font-serif text-2xl text-espresso-900 font-normal">
                      {BRAND_CONFIG.currencySymbol}{subtotal.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-[10px] text-espresso-500 font-light">
                    Applicable sales taxes and white-glove security calculated at checkout.
                  </p>

                  <div className="space-y-2">
                    <Link
                      to="/checkout"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-4 px-6 bg-espresso-900 text-ivory-100 uppercase tracking-widest-lux text-xs font-medium hover:bg-champagne-600 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md rounded-sm"
                    >
                      <ShieldCheck size={16} className="text-champagne-400" />
                      Proceed to Secure Checkout
                    </Link>

                    <Button
                      to="/shop"
                      onClick={() => setIsCartOpen(false)}
                      variant="underline"
                      fullWidth
                    >
                      Continue Curating Pieces
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
