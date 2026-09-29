import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShieldCheck, Truck, Check, ChevronRight, Share2 } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { BRAND_CONFIG } from '../config/brand';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Accordion } from '../components/common/Accordion';
import { ProductCard } from '../components/common/ProductCard';
import { scrollToPageTop } from '../hooks/useLenis';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cart, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

  const cartItem = cart.find(item => item.product.id === product.id);
  const isInCart = Boolean(cartItem);

  const [activeImage, setActiveImage] = useState<string>(product.primaryImage);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.availableSizes ? product.availableSizes[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  // Instant pre-paint scroll to top
  useLayoutEffect(() => {
    scrollToPageTop(true);
  }, [id]);

  // Reset view on id change
  useEffect(() => {
    setActiveImage(product.primaryImage);
    setSelectedSize(product.availableSizes ? product.availableSizes[0] : undefined);
    setQuantity(1);
    scrollToPageTop(true);
  }, [id, product]);

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2400);
  };

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.primaryImage, product.secondaryImage];

  // Related products
  const relatedProducts = PRODUCTS.filter(
    p => p.id !== product.id && (p.category === product.category || p.materialCode === product.materialCode)
  ).slice(0, 4);

  const accordionItems = [
    {
      id: 'story',
      title: 'Atelier Story & Gemstone Provenance',
      content: (
        <div className="space-y-3">
          <p>{product.story}</p>
          <p className="text-espresso-500">
            Mined in strict adherence with the United Nations Kimberley Process. Sourced from certified conflict-free artisanal cooperatives.
          </p>
        </div>
      ),
    },
    {
      id: 'specifications',
      title: 'Specifications & Diamond Dossier',
      content: (
        <ul className="space-y-1.5 list-disc list-inside">
          {product.details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'care',
      title: 'Care & Lifetime Ultrasonic Cleansing',
      content: (
        <ul className="space-y-1.5 list-disc list-inside">
          {product.careInstructions.map((care, index) => (
            <li key={index}>{care}</li>
          ))}
        </ul>
      ),
    },
    {
      id: 'shipping',
      title: 'Armored Shipping & 30-Day Privilege Returns',
      content: (
        <div className="space-y-2">
          <p>{product.shippingInfo}</p>
          <p>
            Complimentary insured returns within 30 days of receipt in unworn condition with security seal intact.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-ivory-100 min-h-screen pt-4 pb-28">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[11px] uppercase tracking-widest-lux text-espresso-500 font-sans">
          <Link to="/" className="hover:text-champagne-600">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-champagne-600">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/shop?category=${product.category}`} className="hover:text-champagne-600">
            {product.categoryName}
          </Link>
          <ChevronRight size={12} />
          <span className="text-espresso-950 font-medium truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Gallery & Zoom (6 cols, sticky on desktop) */}
          <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-3 lg:sticky lg:top-24">
            {/* Thumbnail Column */}
            <div className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View photo ${idx + 1}`}
                  className={`w-12 h-14 md:w-14 md:h-16 flex-shrink-0 overflow-hidden border transition-all cursor-pointer ${
                    activeImage === img
                      ? 'border-champagne-600 ring-1 ring-champagne-500'
                      : 'border-hairline-medium opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover object-center" />
                </button>
              ))}
            </div>

            {/* Main Primary Zoom Image (Compact Height with Highlight) */}
            <div
              className={`flex-1 relative aspect-square max-h-[350px] sm:max-h-[380px] md:max-h-[390px] max-w-[440px] overflow-hidden bg-ivory-200 transition-all duration-300 group ${
                justAdded
                  ? 'ring-2 ring-champagne-500 border-champagne-500 shadow-2xl scale-[1.01]'
                  : isInCart
                  ? 'ring-1.5 ring-champagne-500/80 border-champagne-400 shadow-md'
                  : 'border border-hairline-medium shadow-subtle'
              }`}
            >
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-108"
              />

              {/* Status Badge Top Left */}
              {justAdded ? (
                <div className="absolute top-3 left-3 bg-emerald-700 text-white px-2.5 py-1 text-[9px] uppercase tracking-widest-lux font-sans font-semibold flex items-center gap-1.5 shadow-md z-10">
                  <Check size={12} strokeWidth={2.5} />
                  Added to Bag
                </div>
              ) : isInCart ? (
                <div className="absolute top-3 left-3 bg-espresso-950 text-champagne-300 border border-champagne-500/50 px-2.5 py-1 text-[9px] uppercase tracking-widest-lux font-sans font-semibold flex items-center gap-1.5 shadow-sm z-10">
                  <Check size={11} strokeWidth={2.2} className="text-champagne-400" />
                  In Your Bag ({cartItem?.quantity})
                </div>
              ) : null}

              <div className="absolute top-3 right-3 bg-ivory-100/90 backdrop-blur-sm px-2.5 py-1 text-[9px] uppercase tracking-widest-lux font-sans border border-hairline-light">
                Hover to Inspect
              </div>
            </div>
          </div>

          {/* Right Column: Information, Sizing, Add to Bag (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {/* Category / Material Tag */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans font-medium">
                {product.categoryName} • {product.material}
              </span>

              {/* Share & Wishlist */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert("Creation link copied to clipboard.");
                  }}
                  aria-label="Share link"
                  className="p-1.5 text-espresso-600 hover:text-champagne-600 transition-colors"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className="p-1.5 text-espresso-600 hover:text-champagne-600 transition-colors"
                >
                  <Heart
                    size={18}
                    className={isFavorited ? 'fill-champagne-500 text-champagne-500' : ''}
                  />
                </button>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="font-serif text-3xl sm:text-4xl text-espresso-950 font-normal leading-tight mb-2">
              {product.name}
            </h1>

            <p className="text-xs text-espresso-500 font-sans font-light mb-4">
              {product.subtitle}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-hairline-light">
              <span className="font-serif text-3xl text-espresso-950 font-medium">
                {BRAND_CONFIG.currencySymbol}{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-base text-espresso-400 line-through font-serif font-light">
                  {BRAND_CONFIG.currencySymbol}{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="ml-auto text-[10px] uppercase tracking-widest-lux text-emerald-800 bg-emerald-50 border border-emerald-200 py-1 px-2.5">
                In Vault • Ready to Ship
              </span>
            </div>

            {/* Editorial Description */}
            <p className="text-xs sm:text-sm text-espresso-700 font-sans font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Ring / Bracelet Size Selector */}
            {product.availableSizes && (
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs font-sans text-espresso-900 mb-2.5">
                  <span className="uppercase tracking-widest-lux">Select Size:</span>
                  <button
                    onClick={() => alert("Standard American and European Ring Calibration Guide.")}
                    className="text-champagne-700 underline text-[11px]"
                  >
                    Bespoke Sizing Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {product.availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs border font-sans transition-all text-center ${
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

            {/* Add to Cart Actions */}
            <div className="space-y-3 mb-6">
              {isInCart && !justAdded && (
                <div className="py-2 px-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium text-[11px]">
                    <Check size={13} strokeWidth={2.5} className="text-emerald-700" />
                    Currently in your bag ({cartItem?.quantity} {cartItem?.quantity === 1 ? 'piece' : 'pieces'})
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-emerald-800 font-semibold">Ready in Bag</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={justAdded}
                className={`w-full py-3.5 uppercase tracking-super-lux text-xs font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-subtle ${
                  justAdded
                    ? 'bg-champagne-500 text-ivory-50'
                    : 'bg-espresso-900 hover:bg-champagne-600 text-ivory-100'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check size={16} />
                    <span>Added to Shopping Bag</span>
                  </>
                ) : (
                  <span>Acquire Piece • {BRAND_CONFIG.currencySymbol}{(product.price * quantity).toLocaleString()}</span>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-2 text-center text-[10px] min-[360px]:text-[11px] text-espresso-600 font-sans">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-ivory-200/50 border border-hairline-light">
                  <Truck size={14} className="text-champagne-600 flex-shrink-0" />
                  <span className="truncate">Insured Delivery</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 bg-ivory-200/50 border border-hairline-light">
                  <ShieldCheck size={14} className="text-champagne-600 flex-shrink-0" />
                  <span className="truncate">Lifetime Care</span>
                </div>
              </div>
            </div>

            {/* Product Accordion for Details, Care, Provenance */}
            <Accordion items={accordionItems} defaultOpenId="specifications" />
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-hairline-light">
          <div className="text-center mb-8 sm:mb-12">
            <span className="font-script text-2xl sm:text-3xl text-champagne-600 block mb-1">
              Harmonious Complements
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso-950 font-normal">
              You May Also Admire
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
