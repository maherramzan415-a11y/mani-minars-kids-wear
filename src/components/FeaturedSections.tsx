import React, { useState } from 'react';
import { Product, AgeSize, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, Flame, Shirt, Layers, ArrowRight } from 'lucide-react';

interface FeaturedSectionsProps {
  products: Product[];
  currencySymbol: string;
  currencyRate: number;
  wishlistIds: string[];
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, size: AgeSize, color: string) => void;
  onOpenWhatsAppOrder: (p: Product, size: AgeSize, color: string) => void;
  onSelectCategory: (cat: ProductCategory) => void;
}

type FeaturedTab = 'best-sellers' | 'new-arrivals' | 'trending' | 'denim-collection' | 'casual-shirts';

export const FeaturedSections: React.FC<FeaturedSectionsProps> = ({
  products,
  currencySymbol,
  currencyRate,
  wishlistIds,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenWhatsAppOrder,
  onSelectCategory,
}) => {
  const [activeTab, setActiveTab] = useState<FeaturedTab>('best-sellers');

  const tabs: { id: FeaturedTab; label: string; icon: React.ReactNode; badge: string; category?: ProductCategory }[] = [
    {
      id: 'best-sellers',
      label: 'Best Sellers',
      icon: <Flame className="w-4 h-4 text-red-500" />,
      badge: 'Parent Favorites',
      category: 'all',
    },
    {
      id: 'new-arrivals',
      label: 'New Arrivals',
      icon: <Sparkles className="w-4 h-4 text-emerald-500" />,
      badge: '2026 Drops',
      category: 'new-arrivals',
    },
    {
      id: 'trending',
      label: 'Trending Products',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      badge: 'Viral Styles',
      category: 'all',
    },
    {
      id: 'denim-collection',
      label: 'Denim Collection',
      icon: <Layers className="w-4 h-4 text-blue-500" />,
      badge: 'Elastic Stretch',
      category: 'denim-collection',
    },
    {
      id: 'casual-shirts',
      label: 'Casual Shirts',
      icon: <Shirt className="w-4 h-4 text-indigo-500" />,
      badge: '100% Cotton',
      category: 'casual-wear',
    },
  ];

  // Filter products according to activeTab
  const getTabProducts = (): Product[] => {
    switch (activeTab) {
      case 'best-sellers':
        return products.filter((p) => p.isBestSeller);
      case 'new-arrivals':
        return products.filter((p) => p.isNewArrival);
      case 'trending':
        return products.filter((p) => p.isTrending || p.rating >= 4.9 || p.isBestSeller);
      case 'denim-collection':
        return products.filter((p) => p.category === 'denim-collection');
      case 'casual-shirts':
        return products.filter((p) => p.isCasualShirt || p.name.toLowerCase().includes('shirt'));
      default:
        return products.slice(0, 4);
    }
  };

  const displayedProducts = getTabProducts().slice(0, 4);
  const currentTabInfo = tabs.find((t) => t.id === activeTab);

  return (
    <section id="featured-products-section" className="py-14 bg-gradient-to-b from-white via-slate-50/60 to-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Tab Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Kids Fashion</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-display tracking-tight">
              Featured Products & Collections
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Handpicked styles crafted for playtime freedom, sensitive skin comfort, and durable everyday wear.
            </p>
          </div>

          {/* Section Tabs Switcher */}
          <div className="flex flex-wrap gap-2 bg-slate-200/70 p-1.5 rounded-2xl">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-950 text-white shadow-md scale-102'
                      : 'text-slate-700 hover:text-blue-950 hover:bg-white/80'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Sub-bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-blue-950 text-sm">{currentTabInfo?.label}</span>
            <span className="text-[10px] font-bold text-red-600 bg-red-100/70 px-2 py-0.5 rounded-md">
              {currentTabInfo?.badge}
            </span>
            <span className="text-slate-400">• Sizes 1 to 12 Years</span>
          </div>

          <button
            onClick={() => {
              if (currentTabInfo?.category) {
                onSelectCategory(currentTabInfo.category);
              }
              const el = document.getElementById('products-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1 font-extrabold text-blue-900 hover:text-red-600 transition-colors cursor-pointer group"
          >
            <span>View All {currentTabInfo?.label}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Modern Product Cards Grid with Hover Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={`featured-${product.id}`}
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

      </div>
    </section>
  );
};
