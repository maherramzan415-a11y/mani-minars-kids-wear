import React, { useState } from 'react';
import { Product, ProductCategory, AgeSize, ALL_SIZES } from '../types';
import { ProductCard } from './ProductCard';
import { Filter, SlidersHorizontal, Sparkles, Check, X } from 'lucide-react';

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
  onOpenWhatsAppOrder: (p: Product, size: AgeSize) => void;
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

  const categories = [
    { id: 'all' as ProductCategory, label: 'All Items' },
    { id: 'denim-cargo' as ProductCategory, label: 'Denim Cargo Shorts' },
    { id: 'cotton-shirts' as ProductCategory, label: 'Casual Cotton Shirts' },
    { id: 'boys-fashion' as ProductCategory, label: 'Boys Fashion Wear' },
    { id: 'trendy-outfits' as ProductCategory, label: "Trendy Children's Outfits" },
  ];

  // Filtering
  const filteredProducts = products.filter((p) => {
    // Category
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    // Size
    if (selectedSize && !p.availableSizes.includes(selectedSize)) {
      return false;
    }
    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchCat = p.categoryLabel.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    // Elastic Waistband filter
    if (onlyElasticWaist && !p.elasticWaistband) {
      return false;
    }
    // Bestseller filter
    if (onlyBestsellers && !p.isBestSeller) {
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
              Everyday Adventure Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-1">
              Shop Kids Wear Collection
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Showing {sortedProducts.length} premium pieces made for playground agility & daily comfort.
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-blue-800 cursor-pointer"
            >
              <option value="featured">Featured & Bestsellers</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Quick Filter Checkbox Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/70 mb-8 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-blue-900" />
              Quick Filters:
            </span>

            {/* Elastic Waistband Toggle */}
            <button
              onClick={() => setOnlyElasticWaist(!onlyElasticWaist)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                onlyElasticWaist
                  ? 'bg-amber-500 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Elastic Waistband Only
              {onlyElasticWaist && <Check className="w-3 h-3" />}
            </button>

            {/* Best Sellers Toggle */}
            <button
              onClick={() => setOnlyBestsellers(!onlyBestsellers)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                onlyBestsellers
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Best Sellers Only
              {onlyBestsellers && <Check className="w-3 h-3" />}
            </button>

            {/* Active size tag */}
            {selectedSize && (
              <span className="bg-blue-100 text-blue-900 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                Size: {selectedSize}
                <button onClick={() => onSelectSize(null)} className="hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Reset All Filters */}
          {(selectedSize || onlyElasticWaist || onlyBestsellers || searchQuery || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                onSelectSize(null);
                setOnlyElasticWaist(false);
                setOnlyBestsellers(false);
                onClearSearch();
                onSelectCategory('all');
              }}
              className="text-red-600 hover:text-red-700 font-bold hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                onClearSearch();
                onSelectCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-blue-900 text-white text-xs font-bold rounded-lg hover:bg-blue-800"
            >
              Reset Filters & View All
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
