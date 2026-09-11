import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface FeaturedCollectionsProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCategory,
}) => {
  const collections = [
    {
      id: 'denim-cargo' as ProductCategory,
      title: 'Kids Denim Cargo Shorts',
      subtitle: 'With Elastic Waistband & Stretch Fit',
      description: 'Super soft, washed denim featuring pinch-free elastic ribbed waists and multi-pocket adventure storage.',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=700&q=80',
      badge: 'Bestselling Style',
      accentColor: 'border-blue-600',
      badgeColor: 'bg-blue-900 text-white'
    },
    {
      id: 'cotton-shirts' as ProductCategory,
      title: 'Kids Casual Cotton Shirts',
      subtitle: '100% Breathable Combed Cotton',
      description: 'Breezy everyday button-downs and camp shirts that stay soft and wrinkle-resistant through countless washes.',
      image: 'https://images.unsplash.com/photo-1503944547468-b65924483ce8?auto=format&fit=crop&w=700&q=80',
      badge: 'Skin-Friendly',
      accentColor: 'border-red-600',
      badgeColor: 'bg-red-600 text-white'
    },
    {
      id: 'boys-fashion' as ProductCategory,
      title: 'Boys Fashion Wear',
      subtitle: 'Chinos, Polos, Jackets & Tailored Sets',
      description: 'Polished yet playful modern streetwear and smart-casual coordinates built with reinforced knees.',
      image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&w=700&q=80',
      badge: 'Durable Stitching',
      accentColor: 'border-blue-900',
      badgeColor: 'bg-blue-950 text-white'
    },
    {
      id: 'trendy-outfits' as ProductCategory,
      title: "Trendy Children's Outfits",
      subtitle: 'Matching 2-Piece Sets & Coordinates',
      description: 'Effortless morning dressing with vibrant, fade-resistant matching safari and linen playwear sets.',
      image: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=700&q=80',
      badge: 'New 2026',
      accentColor: 'border-amber-500',
      badgeColor: 'bg-amber-600 text-white'
    }
  ];

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-1">
              Featured Collections for Everyday Adventures
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Specially tailored for dynamic kids who play hard. Sizes 1 to 12 Years with room to grow.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                onSelectCategory(col.id);
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <span className={`absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs ${col.badgeColor}`}>
                  {col.badge}
                </span>
              </div>

              {/* Text Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-blue-950 group-hover:text-blue-700 transition-colors font-display">
                    {col.title}
                  </h3>
                  <div className="text-xs font-semibold text-red-600 mt-0.5">
                    {col.subtitle}
                  </div>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-red-600 transition-colors">
                  <span>Shop Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
