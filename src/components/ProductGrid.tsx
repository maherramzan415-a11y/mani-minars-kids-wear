import React, { useState } from 'react';
import { Product, ProductCategory, AgeSize, ALL_SIZES } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, Check, X, Search, ShieldCheck } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  selectedSize: AgeSize | null;
  onSelectSize: (size: AgeSize | null) => void;
  searchQuery: string;
  onClearSearch: () => void;
  currencySymbol: string;
  currencyRate: number;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: AgeSize, color: string) => void;
  onOpenWhatsAppOrder: (p: Product, size: AgeSize, color: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  searchQuery,
  onClearSearch,
  currencySymbol,
  currencyRate,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenWhatsAppOrder,
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [onlyElasticWaist, setOnlyElasticWaist] = useState(false);
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Exact 6 categories requested by user + 'all'
  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'boys-collection', label: 'Boys Collection' },
    { id: 'girls-collection', label: 'Girls Collection' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'denim-collection', label: 'Denim Collection' },
    { id: 'party-wear', label: 'Party Wear' },
    { id: 'casual-wear', label: 'Casual Wear' },
  ];

  // Filtering
  const filteredProducts = products.filter((p) => {
    // Category match
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'new-arrivals') {
        if (!p.isNewArrival && p.category !== 'new-arrivals') return false;
      } else if (selectedCategory === 'boys-collection') {
        if (p.category !== 'boys-collection' && p.gender !== 'boys') return false;
      } else if (selectedCategory === 'girls-collection') {
        if (p.category !== 'girls-collection' && p.gender !== 'girls') return false;
      } else {
        if (p.category !== selectedCategory) return false;
      }
    }

    // Size match
    if (selectedSize && !p.availableSizes.includes(selectedSize)) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.categoryLabel.toLowerCase().includes(q);
      const matchFabric = p.fabric.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat && !matchFabric) return false;
    }

    // Elastic Waistband filter
    if (onlyElasticWaist && !p.elasticWaistband) {
      return false;
    }

    // Bestseller filter
    if (onlyBestsellers && !p.isBestSeller) {
      return false;
    }

    // In-stock filter
    if (onlyInStock && (!p.inStock || p.stockQuantity <= 0)) {
      return false;
    }

    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  return (
    <section id="products-section" className="py-12 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-6 border-b border-slate-100 gap-4">
          <div>
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2.5 py-0.5 rounded-full">
              Kids Clothes Pakistan • Boys Shirts • Denim Shorts
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-1">
              Shop Mani Minars Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {sortedProducts.length} premium pieces made for playground adventures & daily comfort (Sizes 1-12Y).
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-900 cursor-pointer"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>

        {/* 6 Category Tabs Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-950 text-white shadow-md scale-102'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-blue-950'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filter Badges & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-500 font-bold flex items-center gap-1.5 mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-900" />
              Quick Filters:
            </span>

            {/* Elastic Waistband Filter */}
            <button
              onClick={() => setOnlyElasticWaist(!onlyElasticWaist)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyElasticWaist
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Elastic Waistband
              {onlyElasticWaist && <Check className="w-3 h-3" />}
            </button>

            {/* Best Sellers Filter */}
            <button
              onClick={() => setOnlyBestsellers(!onlyBestsellers)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyBestsellers
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Best Sellers
              {onlyBestsellers && <Check className="w-3 h-3" />}
            </button>

            {/* In-Stock Filter */}
            <button
              onClick={() => setOnlyInStock(!onlyInStock)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                onlyInStock
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              In Stock Only
              {onlyInStock && <Check className="w-3 h-3" />}
            </button>

            {/* Active size tag */}
            {selectedSize && (
              <span className="bg-blue-900 text-white font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                Age: {selectedSize}
                <button onClick={() => onSelectSize(null)} className="hover:text-red-300 ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            )}
          </div>

          {/* Reset All Filters */}
          {(selectedSize || onlyElasticWaist || onlyBestsellers || onlyInStock || searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                onSelectSize(null);
                setOnlyElasticWaist(false);
                setOnlyBestsellers(false);
                setOnlyInStock(false);
                onClearSearch();
                onSelectCategory('all');
              }}
              className="text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currencySymbol={currencySymbol}
                currencyRate={currencyRate}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onOpenWhatsAppOrder={onOpenWhatsAppOrder}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="text-lg font-bold text-slate-800 font-display">No matching kids clothes found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              We couldn't find items matching your current filters or size selection. Try resetting filters to see all available styles.
            </p>
            <button
              onClick={() => {
                onSelectSize(null);
                setOnlyElasticWaist(false);
                setOnlyBestsellers(false);
                setOnlyInStock(false);
                onClearSearch();
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-950 text-white text-xs font-bold rounded-lg hover:bg-blue-900 cursor-pointer"
            >
              Reset Filters & View All
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
