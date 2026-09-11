import React from 'react';
import { Feather, Shield, Sparkles, Scissors, Smile, Truck } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const valueItems = [
    {
      icon: Feather,
      title: 'Premium Quality Fabric',
      description: 'Long-staple breathable combed cotton and soft-washed denim engineered for maximum day-long comfort.',
      badge: 'Certified Pure'
    },
    {
      icon: Smile,
      title: 'Soft & Skin-Friendly',
      description: 'Hypoallergenic dyes, zero scratchy tags, and soft lined seams designed specifically for sensitive young skin.',
      badge: 'Anti-Irritation'
    },
    {
      icon: Scissors,
      title: 'Durable Stitching',
      description: 'Heavy-duty double-needle bar-tack reinforced seams built tough to withstand rough playground adventures.',
      badge: 'Play-Proof'
    },
    {
      icon: Sparkles,
      title: 'Trendy Modern Design',
      description: 'Chic modern silhouettes, contemporary color palettes, and playful details that kids love showing off.',
      badge: 'Latest 2026'
    },
    {
      icon: Shield,
      title: 'Perfect Fit for Growing Kids',
      description: 'Adaptive elastic waistbands with functional inner drawstrings that comfortably grow with your child.',
      badge: '1-12 Years'
    },
    {
      icon: Truck,
      title: 'Free Shipping on All Orders',
      description: 'Enjoy complimentary door-to-door express delivery with live order tracking on every single purchase.',
      badge: 'Fast Delivery'
    },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1 rounded-full">
            The Mani Minars Difference
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 mt-2 font-display">
            Engineered for Comfort, Built for Everyday Play
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Why thousands of parents trust Mani Minars for their children’s daily wardrobe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {valueItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="bg-slate-50/70 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-blue-200 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100/60 group-hover:bg-blue-900 group-hover:text-white text-blue-900 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-blue-950 group-hover:text-blue-900 transition-colors">
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
