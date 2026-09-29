import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight } from 'lucide-react';
import { BRAND_CONFIG } from '../../config/brand';
import { CATEGORIES } from '../../data/categories';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchModal } from './SearchModal';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };


  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopHovered(false);
  }, [location.pathname]);

  const navItemClass = (active = false) =>
    `text-xs uppercase tracking-widest-lux font-medium transition-colors duration-300 link-underline py-1 ${
      active ? 'text-champagne-600' : isScrolled || !isHome ? 'text-espresso-900 hover:text-champagne-600' : 'text-espresso-950 hover:text-champagne-600'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-500 ${
          isScrolled || !isHome
            ? 'bg-ivory-100/95 backdrop-blur-md border-b border-hairline-light py-4 shadow-subtle'
            : 'bg-ivory-100/90 backdrop-blur-md border-b border-hairline-light/80 py-5'
        }`}

      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Nav (Desktop) */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Shop with Mega Menu trigger */}
              <div
                className="relative"
                onMouseEnter={() => setIsShopHovered(true)}
                onMouseLeave={() => setIsShopHovered(false)}
              >
                <Link to="/shop" className={navItemClass(location.pathname === '/shop')}>
                  Shop
                </Link>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {isShopHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-4 w-[760px] bg-ivory-100 border border-hairline-medium shadow-2xl p-8 z-50"
                    >
                      <div className="grid grid-cols-3 gap-8">
                        {/* Categories Column 1 */}
                        <div>
                          <h4 className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans mb-4 font-semibold">
                            By Category
                          </h4>
                          <ul className="space-y-2.5">
                            {CATEGORIES.slice(0, 4).map(cat => (
                              <li key={cat.id}>
                                <Link
                                  to={`/shop?category=${cat.slug}`}
                                  className="text-xs text-espresso-800 hover:text-champagne-600 font-sans tracking-wide transition-colors block py-0.5"
                                >
                                  {cat.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Categories Column 2 */}
                        <div>
                          <h4 className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans mb-4 font-semibold">
                            Specialty & High Jewelry
                          </h4>
                          <ul className="space-y-2.5">
                            {CATEGORIES.slice(4).map(cat => (
                              <li key={cat.id}>
                                <Link
                                  to={`/shop?category=${cat.slug}`}
                                  className="text-xs text-espresso-800 hover:text-champagne-600 font-sans tracking-wide transition-colors block py-0.5"
                                >
                                  {cat.name}
                                </Link>
                              </li>
                            ))}
                            <li className="pt-2 border-t border-hairline-light">
                              <Link
                                to="/shop"
                                className="text-xs text-champagne-600 font-medium hover:underline flex items-center gap-1.5"
                              >
                                <span>View Complete Catalog</span>
                                <ArrowRight size={12} />
                              </Link>
                            </li>
                          </ul>
                        </div>

                        {/* Featured Editorial Card */}
                        <div className="bg-ivory-200/60 p-4 border border-hairline-light flex flex-col justify-between">
                          <div>
                            <div className="relative aspect-[4/3] overflow-hidden mb-3">
                              <img
                                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop"
                                alt="High Jewelry Editorial"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-[9px] uppercase tracking-widest-lux text-champagne-600 font-sans">
                              Curated Edit
                            </span>
                            <h5 className="font-serif text-sm text-espresso-900 mt-1">
                              The Solstice Collection
                            </h5>
                          </div>
                          <Link
                            to="/shop?category=rings"
                            className="mt-3 text-[11px] uppercase tracking-widest-lux text-espresso-800 hover:text-champagne-600 link-underline inline-block font-medium"
                          >
                            Explore Solitaires
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Collections Link */}
              <Link to="/shop?sort=newest" className={navItemClass()}>
                Collections
              </Link>

              {/* About Link */}
              <Link to="/about" className={navItemClass(location.pathname === '/about')}>
                About
              </Link>

              {/* Contact Link */}
              <Link to="/contact" className={navItemClass(location.pathname === '/contact')}>
                Contact
              </Link>
            </nav>


            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="w-11 h-11 flex items-center justify-center text-espresso-900 focus:outline-none -ml-2 cursor-pointer"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Centered Brand Wordmark */}
            <div className="text-center px-1">
              <Link to="/" className="inline-block group">
                <span className="font-serif text-xl min-[360px]:text-2xl sm:text-3xl lg:text-4xl tracking-[0.14em] min-[360px]:tracking-[0.18em] sm:tracking-[0.2em] font-normal text-espresso-950 transition-colors group-hover:text-champagne-600 uppercase">
                  {BRAND_CONFIG.name}
                </span>
                <span className="block text-[7px] min-[360px]:text-[8px] sm:text-[9px] tracking-widest min-[360px]:tracking-super-lux uppercase text-champagne-600 -mt-1 font-sans">
                  Haute Joaillerie
                </span>
              </Link>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-0.5 min-[360px]:space-x-1.5 sm:space-x-4">
              {/* Search */}
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search"
                className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-espresso-800 hover:text-champagne-600 transition-colors cursor-pointer"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                aria-label="Wishlist"
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-espresso-800 hover:text-champagne-600 transition-colors"
              >
                <Heart size={18} strokeWidth={1.5} />
                {totalWishlistItems > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-champagne-500 text-ivory-50 text-[8px] sm:text-[9px] font-sans font-medium rounded-full flex items-center justify-center">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Account / Patron Portal */}
              {isAuthenticated ? (
                <div className="relative group">
                  <Link
                    to="/profile"
                    aria-label="Patron Dossier"
                    className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-espresso-800 hover:text-champagne-600 transition-colors"
                    title={`Salon Dossier: ${user?.name}`}
                  >
                    <User size={18} strokeWidth={1.5} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-champagne-500 rounded-full border border-ivory-100" />
                  </Link>

                  {/* Quick Patron Dropdown */}
                  <div className="absolute right-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="w-52 bg-ivory-50 border border-hairline-gold shadow-2xl p-3.5 space-y-2 text-left">
                      <div className="border-b border-hairline-light pb-2">
                        <span className="text-[9px] uppercase tracking-widest text-champagne-600 font-sans block">
                          Patron Session
                        </span>
                        <span className="text-xs font-serif text-espresso-950 font-medium truncate block">
                          {user?.title ? `${user.title} ` : ''}{user?.name}
                        </span>
                      </div>
                      <Link
                        to="/profile"
                        className="block text-xs uppercase tracking-widest font-sans text-espresso-800 hover:text-champagne-600 py-1"
                      >
                        View Dossier
                      </Link>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left text-xs uppercase tracking-widest font-sans text-espresso-500 hover:text-red-700 py-1 border-t border-hairline-light cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuthModal('login')}
                  aria-label="Sign In or Register"
                  className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-espresso-800 hover:text-champagne-600 transition-colors cursor-pointer"
                  title="Sign In / Register"
                >
                  <User size={18} strokeWidth={1.5} />
                </button>
              )}


              {/* Shopping Bag */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Bag"
                className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-espresso-800 hover:text-champagne-600 transition-colors cursor-pointer"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-espresso-900 text-ivory-50 text-[8px] sm:text-[9px] font-sans font-medium rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed inset-x-0 top-[65px] sm:top-[73px] bg-ivory-100 border-b border-hairline-medium shadow-2xl z-40 max-h-[calc(100vh-65px)] sm:max-h-[calc(100vh-73px)] overflow-y-auto"
          >
            <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 divide-y divide-hairline-light">
              <div className="space-y-1 pt-1">
                <Link
                  to="/"
                  className="min-h-[44px] flex items-center text-xs sm:text-sm uppercase tracking-widest-lux text-espresso-900 font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className="min-h-[44px] flex items-center text-xs sm:text-sm uppercase tracking-widest-lux text-espresso-900 font-medium"
                >
                  All Fine Jewelry
                </Link>
                <Link
                  to="/about"
                  className="min-h-[44px] flex items-center text-xs sm:text-sm uppercase tracking-widest-lux text-espresso-900 font-medium"
                >
                  The Maison & Craftsmanship
                </Link>
                <Link
                  to="/contact"
                  className="min-h-[44px] flex items-center text-xs sm:text-sm uppercase tracking-widest-lux text-espresso-900 font-medium"
                >
                  Contact & Salons
                </Link>
                <Link
                  to="/wishlist"
                  className="min-h-[44px] flex items-center text-xs sm:text-sm uppercase tracking-widest-lux text-espresso-900 font-medium"
                >
                  Wishlist ({totalWishlistItems})
                </Link>

                {/* Mobile Patron Portal / Pop-up Trigger */}
                {isAuthenticated ? (
                  <div className="pt-2 border-t border-hairline-light space-y-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-sm uppercase tracking-widest-lux text-champagne-600 font-medium"
                    >
                      Patron Dossier ({user?.name.split(' ')[0]})
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="text-xs uppercase tracking-widest font-sans text-espresso-500 hover:text-espresso-950 cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 flex items-center gap-3 border-t border-hairline-light">
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal('login');
                      }}
                      className="text-xs uppercase tracking-widest-lux font-medium text-espresso-950 hover:text-champagne-600"
                    >
                      Sign In
                    </button>
                    <span className="text-espresso-300">/</span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal('register');
                      }}
                      className="text-xs uppercase tracking-widest-lux font-medium text-champagne-600 hover:text-espresso-950"
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <span className="text-[10px] uppercase tracking-super-lux text-champagne-600 font-sans block mb-3">
                  Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(c => (
                    <Link
                      key={c.id}
                      to={`/shop?category=${c.slug}`}
                      className="text-xs text-espresso-700 py-1"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-4 text-xs text-espresso-600">
                <p>Concierge Assistance</p>
                <p className="font-serif text-sm text-espresso-900">{BRAND_CONFIG.contact.phone}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Concierge Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
