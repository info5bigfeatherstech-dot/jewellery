import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { MATERIALS } from '../data/materials';
import { ProductCard } from '../components/common/ProductCard';
import { QuickViewModal } from '../components/common/QuickViewModal';
import { BRAND_CONFIG } from '../config/brand';
import { scrollToPageTop } from '../hooks/useLenis';
import type { Product } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'all'
  );
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(
    searchParams.get('material') ? [searchParams.get('material')!] : []
  );
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'featured');
  const [priceMax, setPriceMax] = useState<number>(20000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Sync state if URL query changes & reset scroll to top
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const mat = searchParams.get('material');
    if (mat) setSelectedMaterials([mat]);
    scrollToPageTop(true);
  }, [searchParams]);

  const toggleMaterial = (id: string) => {
    setSelectedMaterials(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterials([]);
    setPriceMax(20000);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Material filter
      if (selectedMaterials.length > 0) {
        const matchesMat = selectedMaterials.some(m => {
          if (m === 'gold') return p.material.toLowerCase().includes('yellow gold') || p.materialCode === '18k-yellow-gold';
          if (m === 'white-gold') return p.material.toLowerCase().includes('white') || p.material.toLowerCase().includes('platinum');
          if (m === 'rose-gold') return p.material.toLowerCase().includes('rose');
          if (m === 'diamond') return p.gemstone?.toLowerCase().includes('diamond') || p.description.toLowerCase().includes('diamond');
          if (m === 'pearl') return p.gemstone?.toLowerCase().includes('pearl') || p.materialCode === 'pearl';
          if (m === 'emerald') return p.gemstone?.toLowerCase().includes('emerald') || p.materialCode === 'emerald';
          return true;
        });
        if (!matchesMat) return false;
      }
      // Price filter
      if (p.price > priceMax) return false;
      // In stock
      if (inStockOnly && !p.inStock) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, selectedMaterials, priceMax, inStockOnly, sortBy]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedMaterials.length +
    (priceMax < 20000 ? 1 : 0) +
    (inStockOnly ? 1 : 0);

  return (
    <div className="bg-ivory-100 min-h-screen pt-8 pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Page Header */}
        <div className="text-center pt-8 pb-12 border-b border-hairline-light">
          <span className="font-script text-3xl sm:text-4xl text-champagne-600 block mb-2 font-normal">
            haute joaillerie
          </span>
          <span className="text-[10px] uppercase tracking-super-lux text-espresso-600 font-sans block mb-3">
            The Complete Atelier Repertoire
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-espresso-950 tracking-tight">
            Curated Creations & <span className="italic">Solitaires</span>
          </h1>
          <p className="text-xs sm:text-sm text-espresso-600 font-sans font-light max-w-xl mx-auto mt-3">
            Discover heirloom rings, diamond rivières, sculpted cuffs, and talismanic pendants, each individually hallmarked and accompanied by certificates of origin.
          </p>
        </div>

        {/* Control Bar: Filter toggles & Sorting */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-hairline-light">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 py-2 px-4 border border-hairline-medium bg-ivory-200 text-xs uppercase tracking-widest-lux text-espresso-900"
            >
              <SlidersHorizontal size={14} />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            <span className="text-xs text-espresso-600 font-sans">
              Showing <span className="font-medium text-espresso-900">{filteredProducts.length}</span> precious pieces
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-widest-lux text-espresso-500 font-sans hidden sm:inline">
              Sort By:
            </span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort creations"
                className="appearance-none bg-ivory-50 border border-hairline-medium text-xs font-sans text-espresso-900 py-2 pl-3 pr-8 focus:outline-none focus:border-champagne-500 cursor-pointer"
              >
                <option value="featured">Maison Curated (Featured)</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown
                size={14}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-espresso-600"
              />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="py-4 flex flex-wrap items-center gap-2 border-b border-hairline-light">
            <span className="text-[10px] uppercase tracking-widest-lux text-espresso-400 mr-2">
              Active:
            </span>

            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-ivory-200 text-[11px] font-sans text-espresso-800 border border-hairline-light">
                <span>Category: {selectedCategory}</span>
                <button onClick={() => setSelectedCategory('all')} aria-label="Clear category filter">
                  <X size={12} />
                </button>
              </span>
            )}

            {selectedMaterials.map(matId => (
              <span
                key={matId}
                className="inline-flex items-center gap-1.5 py-1 px-3 bg-ivory-200 text-[11px] font-sans text-espresso-800 border border-hairline-light"
              >
                <span>Material: {matId}</span>
                <button onClick={() => toggleMaterial(matId)} aria-label="Remove material filter">
                  <X size={12} />
                </button>
              </span>
            ))}

            {priceMax < 20000 && (
              <span className="inline-flex items-center gap-1.5 py-1 px-3 bg-ivory-200 text-[11px] font-sans text-espresso-800 border border-hairline-light">
                <span>Under ${priceMax.toLocaleString()}</span>
                <button onClick={() => setPriceMax(20000)} aria-label="Clear price filter">
                  <X size={12} />
                </button>
              </span>
            )}

            <button
              onClick={clearAllFilters}
              className="text-[11px] uppercase tracking-widest-lux text-champagne-700 hover:text-espresso-950 underline ml-2"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 pt-10">
          {/* Desktop Filter Sidebar (1 col) */}
          <aside className="hidden lg:block space-y-8 pr-4">
            {/* Category Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-super-lux font-semibold text-espresso-900 mb-4 pb-2 border-b border-hairline-light">
                Categories
              </h3>
              <ul className="space-y-2 text-xs font-sans">
                <li>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex justify-between py-1 text-left transition-colors ${
                      selectedCategory === 'all'
                        ? 'text-champagne-600 font-semibold'
                        : 'text-espresso-700 hover:text-champagne-600'
                    }`}
                  >
                    <span>All Fine Jewelry</span>
                    <span className="text-espresso-400 font-light">{PRODUCTS.length}</span>
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full flex justify-between py-1 text-left transition-colors ${
                        selectedCategory === cat.slug
                          ? 'text-champagne-600 font-semibold'
                          : 'text-espresso-700 hover:text-champagne-600'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-espresso-400 font-light">{cat.itemCount}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Noble Metals & Materials Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-super-lux font-semibold text-espresso-900 mb-4 pb-2 border-b border-hairline-light">
                Precious Materials
              </h3>
              <div className="space-y-2">
                {MATERIALS.map(mat => {
                  const isChecked = selectedMaterials.includes(mat.id);
                  return (
                    <button
                      key={mat.id}
                      onClick={() => toggleMaterial(mat.id)}
                      className="w-full flex items-center justify-between text-xs text-espresso-700 hover:text-espresso-950 py-1"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-3.5 h-3.5 border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-espresso-900 border-espresso-900 text-ivory-50'
                              : 'border-hairline-medium bg-ivory-50'
                          }`}
                        >
                          {isChecked && <Check size={10} />}
                        </div>
                        <span>{mat.name}</span>
                      </div>
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: mat.colorHex }} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-super-lux font-semibold text-espresso-900 mb-4 pb-2 border-b border-hairline-light">
                Price Ceiling: ${priceMax.toLocaleString()}
              </h3>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={priceMax}
                onChange={e => setPriceMax(Number(e.target.value))}
                aria-label="Filter by maximum price"
                className="w-full accent-champagne-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-espresso-500 font-sans mt-1">
                <span>$1,000</span>
                <span>$20,000+</span>
              </div>
            </div>

            {/* In Stock Only */}
            <div className="pt-2">
              <label className="flex items-center gap-2.5 text-xs text-espresso-700 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={e => setInStockOnly(e.target.checked)}
                  className="rounded border-hairline-medium accent-champagne-600"
                />
                <span>Ready for Immediate Dispatch</span>
              </label>
            </div>
          </aside>

          {/* Product Grid (3 cols) */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center bg-ivory-200/50 border border-hairline-medium p-8">
                <h3 className="font-serif text-2xl text-espresso-900 mb-2">
                  No matching creations in this view
                </h3>
                <p className="text-xs text-espresso-600 max-w-sm mx-auto mb-6 font-sans">
                  Try adjusting your material or price parameters, or connect with our concierge for a bespoke inquiry.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="py-3 px-6 bg-espresso-900 text-ivory-100 text-xs uppercase tracking-widest-lux hover:bg-champagne-600 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFiltersOpen(false)}
              className="fixed inset-0 bg-espresso-950/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-ivory-100 p-5 sm:p-6 flex flex-col justify-between shadow-2xl z-10"
            >
              <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-hairline-light">
                  <h3 className="font-serif text-xl text-espresso-950">Filter Creations</h3>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    aria-label="Close filters"
                    className="w-10 h-10 flex items-center justify-center -mr-2 text-espresso-800 hover:text-espresso-950 cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest-lux text-champagne-600 block mb-2 font-semibold">
                    Category
                  </span>
                  <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    aria-label="Select Category"
                    className="w-full bg-ivory-50 border border-hairline-medium p-2.5 text-xs text-espresso-900"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Materials */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest-lux text-champagne-600 block mb-2 font-semibold">
                    Precious Material
                  </span>
                  <div className="space-y-2">
                    {MATERIALS.map(mat => (
                      <label key={mat.id} className="flex items-center gap-2.5 text-xs text-espresso-800 cursor-pointer py-1">
                        <input
                          type="checkbox"
                          checked={selectedMaterials.includes(mat.id)}
                          onChange={() => toggleMaterial(mat.id)}
                          className="rounded border-hairline-medium accent-champagne-600 w-4 h-4"
                        />
                        <span>{mat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-[10px] uppercase tracking-widest-lux text-champagne-600 font-semibold">
                      Max Price
                    </span>
                    <span className="text-xs font-serif text-espresso-900 font-medium">
                      {BRAND_CONFIG.currencySymbol}{priceMax.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={priceMax}
                    onChange={e => setPriceMax(Number(e.target.value))}
                    aria-label="Maximum price filter"
                    className="w-full accent-champagne-600 cursor-pointer"
                  />
                </div>

                {/* In Stock Only */}
                <div className="pt-2 border-t border-hairline-light">
                  <label className="flex items-center gap-2.5 text-xs text-espresso-800 cursor-pointer select-none py-1">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={e => setInStockOnly(e.target.checked)}
                      className="rounded border-hairline-medium accent-champagne-600 w-4 h-4"
                    />
                    <span>Ready for Immediate Dispatch</span>
                  </label>
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="w-full text-center text-xs uppercase tracking-widest font-sans text-champagne-700 underline py-2 cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>

              <div className="pt-4 border-t border-hairline-light mt-4">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full min-h-[44px] py-3.5 bg-espresso-900 text-ivory-100 text-xs uppercase tracking-widest-lux font-medium hover:bg-champagne-600 transition-colors flex items-center justify-center cursor-pointer shadow-md"
                >
                  Apply Filters ({filteredProducts.length} Results)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
