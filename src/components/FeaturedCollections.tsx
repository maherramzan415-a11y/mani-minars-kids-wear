import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface FeaturedCollectionsProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCategory,
}) => {
  const collections: {
    id: ProductCategory;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    badge: string;
    badgeColor: string;
  }[] = [
    {
      id: 'boys-collection',
      title: 'Boys Collection',
      subtitle: 'Pique Polos, Chinos, Cargoes & Varsity Sets',
      description: 'Polished yet rugged modern streetwear and smart-casual coordinates built with reinforced stitching.',
      image: 'https://images.unsplash.com/photo-1560506840-ec148e82a604?auto=format&fit=crop&w=800&q=85',
      badge: 'Boys 1-12Y',
      badgeColor: 'bg-blue-900 text-white'
    },
    {
      id: 'girls-collection',
      title: 'Girls Collection',
      subtitle: 'Floral Dresses, Ribbed Sets & Culottes',
      description: 'Chic, comfortable dresses and breathable playwear coordinates tailored for everyday joy and parties.',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85',
      badge: 'Girls 1-12Y',
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      subtitle: 'Fresh 2026 Kids Fashion Releases',
      description: 'Latest modern silhouettes, vibrant vacation coordinates, and seasonal updates for growing kids.',
      image: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=85',
      badge: 'New 2026',
      badgeColor: 'bg-amber-600 text-white'
    },
    {
      id: 'denim-collection',
      title: 'Denim Collection',
      subtitle: 'Stretch Cargo Shorts, Jeans & Jackets',
      description: 'Cloud-soft stretch denim featuring pinch-free elastic ribbed waistbands and multi-pocket adventure storage.',
      image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=85',
      badge: 'Signature Stretch',
      badgeColor: 'bg-blue-950 text-white'
    },
    {
      id: 'party-wear',
      title: 'Party Wear',
      subtitle: 'Tailored Blazers, Trousers & Tulle Dresses',
      description: 'Exquisite celebration outfits for weddings, Eid, and birthdays with comfortable elastic-backed waists.',
      image: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=85',
      badge: 'Festive & Formal',
      badgeColor: 'bg-red-600 text-white'
    },
    {
      id: 'casual-wear',
      title: 'Casual Wear',
      subtitle: '100% Combed Cotton Everyday Essentials',
      description: 'Breezy button-downs, soft knit tees, and playwear shorts that stay vibrant through countless washes.',
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=85',
      badge: 'Everyday Soft',
      badgeColor: 'bg-emerald-700 text-white'
    },
  ];

  return (
    <section className="py-14 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore By Category</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display mt-1">
              Curated Kids Wear Collections
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Discover premium clothing tailored for active children. Sizes 1 to 12 Years with room to grow.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                onSelectCategory(col.id);
                const el = document.getElementById('products-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-red-400 hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Container with Badges */}
              <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== window.location.origin + '/placeholder-product.svg') {
                      target.src = '/placeholder-product.svg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                <span className={`absolute top-3 left-3 text-[11px] font-extrabold px-2.5 py-1 rounded-md shadow-sm ${col.badgeColor}`}>
                  {col.badge}
                </span>

                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-lg font-bold font-display text-white drop-shadow-sm flex items-center justify-between">
                    <span>{col.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-blue-100 line-clamp-1">{col.subtitle}</p>
                </div>
              </div>

              {/* Bottom text description */}
              <div className="p-4 bg-slate-50/50 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {col.description}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs font-bold text-red-600 group-hover:text-red-700">
                  <span>Shop Collection</span>
                  <span className="text-[11px] font-semibold text-slate-400">Sizes 1-12Y</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
