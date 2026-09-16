import React from 'react';
import { Feather, Heart, Truck, RefreshCw, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const trustHighlights = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: '100% Free Express Shipping across Pakistan on all orders. Packed within 24 hours with Cash on Delivery (COD) available nationwide.',
      badge: 'Zero Delivery Fee'
    },
    {
      icon: Feather,
      title: 'Premium Quality',
      description: '100% Long-staple combed cotton and pre-softened flex denim engineered with reinforced stitching for durable everyday playtime.',
      badge: 'Certified Pure'
    },
    {
      icon: Heart,
      title: 'Skin Friendly Fabric',
      description: 'Hypoallergenic dyes, zero scratchy tags, flatlock anti-rub seams designed specifically for sensitive young skin.',
      badge: 'Zero Itch Guarantee'
    },
    {
      icon: RefreshCw,
      title: 'Easy Exchange',
      description: '14-day hassle-free door-to-door size and item exchanges. If your child needs a different size, our team swaps it effortlessly.',
      badge: 'Hassle-Free 14 Days'
    },
  ];

  return (
    <section className="bg-slate-50/70 py-10 sm:py-14 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Pill Trust Bar (Directly below Hero) */}
        <div className="bg-white border border-slate-200/90 text-slate-900 rounded-2xl p-4 sm:p-5 shadow-md mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            <div className="flex items-center gap-2.5 sm:justify-center pt-2 sm:pt-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide font-display text-blue-950">
                ✓ Free Shipping
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:justify-center pt-2 sm:pt-0 sm:pl-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide font-display text-blue-950">
                ✓ Premium Quality
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:justify-center pt-2 sm:pt-0 sm:pl-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide font-display text-blue-950">
                ✓ Skin Friendly Fabric
              </span>
            </div>
            <div className="flex items-center gap-2.5 sm:justify-center pt-2 sm:pt-0 sm:pl-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span className="text-xs sm:text-sm font-extrabold tracking-wide font-display text-blue-950">
                ✓ Easy Exchange
              </span>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
            The Mani Minars Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-2 font-display">
            Engineered for Comfort, Built for Everyday Play
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Why thousands of Pakistani parents trust Mani Minars for their children’s wardrobe.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-white hover:bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-red-300 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-red-600 group-hover:text-white text-blue-950 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-blue-950 group-hover:text-red-600 transition-colors font-display">
                    ✓ {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
