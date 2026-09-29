import React from 'react';
import { Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/common/ProductCard';
import { Button } from '../components/common/Button';

export const WishlistPage: React.FC = () => {
  const { wishlist, totalWishlistItems } = useWishlist();

  const favoriteProducts = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <div className="bg-ivory-100 min-h-screen pt-12 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center pb-12 border-b border-hairline-light">
          <span className="font-script text-3xl sm:text-4xl text-champagne-600 block mb-2 font-normal">
            private curation
          </span>
          <span className="text-[10px] uppercase tracking-super-lux text-espresso-600 font-sans block mb-3">
            Your Bespoke Vault
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-espresso-950">
            Saved Creations & Desires
          </h1>
          <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light max-w-md mx-auto mt-3">
            {totalWishlistItems === 0
              ? 'Your private wishlist is awaiting your personal selection.'
              : `You have reserved ${totalWishlistItems} iconic ${
                  totalWishlistItems === 1 ? 'creation' : 'creations'
                } in your client portfolio.`}
          </p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-ivory-200 border border-hairline-gold flex items-center justify-center text-champagne-600 mx-auto mb-6">
              <Heart size={26} strokeWidth={1.2} />
            </div>
            <h3 className="font-serif text-2xl text-espresso-950 mb-3">
              Your Wishlist is Empty
            </h3>
            <p className="text-xs text-espresso-600 font-sans font-light leading-relaxed mb-8">
              Explore our handcrafted diamond solitaires, gold bangles, and rare emerald talismans to begin building your personal vault.
            </p>
            <Button to="/shop" variant="primary" size="md">
              Discover High Jewelry
            </Button>
          </div>
        ) : (
          <div className="pt-8 sm:pt-12">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
              {favoriteProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-16 text-center">
              <Button to="/shop" variant="outline" size="md">
                Continue Exploring Creations
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
