import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Truck, CheckCircle2, MessageCircle } from 'lucide-react';

interface HeroProps {
  onExploreCollection: () => void;
  onExploreBoys: () => void;
  onOpenSizeGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onExploreBoys,
  onOpenSizeGuide,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white border-b border-slate-100">
      {/* Decorative subtle background elements */}
      <div className="absolute top-10 right-5 w-72 h-72 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-blue-200/80 shadow-xs px-3.5 py-1.5 rounded-full text-xs font-semibold text-blue-900 mx-auto lg:mx-0">
              <span className="flex h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-red-600 font-bold uppercase tracking-wider text-[11px]">New 2026 Collection</span>
              <span className="text-slate-300">|</span>
              <span>Available in 1 to 12 Years</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950 tracking-tight leading-[1.12] font-display">
              Comfortable & Stylish <span className="text-red-600">Kids Wear</span> Designed for Everyday Adventures.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Crafted from cloud-soft breathable cottons with flexible elastic waistbands, reinforced stitching, and play-proof durability made to keep up with your active growing kids.
            </p>

            {/* The 5 Key Value Points from Prompt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              {[
                'Premium Quality Fabric (100% Combed Cotton)',
                'Soft and Skin-Friendly (Zero Itch)',
                'Durable Reinforced Stitching',
                'Trendy Modern Design & Vibrant Dyes',
                'Perfect Fit for Growing Kids (Elastic Waist)',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTAs and WhatsApp Action */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onExploreCollection}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 sm:px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 group text-sm sm:text-base active:scale-95 cursor-pointer"
              >
                <span>Shop New Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreBoys}
                className="bg-blue-900 hover:bg-blue-950 text-white font-semibold px-6 py-3.5 rounded-xl shadow-xs transition-all text-sm sm:text-base active:scale-95 cursor-pointer"
              >
                Explore Boys Fashion
              </button>

              <a
                href="https://wa.me/923046466815?text=Hello%20Mani%20Minars!%20I'd%20like%20help%20picking%20the%20best%20outfit%20for%20my%20child."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold px-4 py-3.5 rounded-xl text-sm transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* Trust Footer line */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Truck className="w-4 h-4 text-red-600" />
                <strong>Free Shipping</strong> on All Orders
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                <strong>1,200+ Verified</strong> Parent Reviews
              </span>
              <span>•</span>
              <button 
                onClick={onOpenSizeGuide}
                className="underline hover:text-blue-800 text-blue-700 font-semibold"
              >
                Find Child's Size (1-12Y)
              </button>
            </div>
          </div>

          {/* Right Visual Image Showcase with Smiling Children & Real Products */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Lifestyle Hero Photo - Happy kids smiling in stylish casual wear */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 aspect-4/5 group">
                <img
                  src="https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1000&q=85"
                  alt="Smiling children dressed in comfortable and stylish kids wear by Mani Minars"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  loading="eager"
                />

                {/* Gradient overlay at bottom of photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-950/20 to-transparent" />

                {/* In-photo Tag overlay */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="inline-block bg-red-600 text-white text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-sm tracking-wide mb-1">
                    Signature Favorite
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display leading-snug text-white drop-shadow-sm">
                    Denim Cargo Shorts with Elastic Waistband
                  </h3>
                  <p className="text-xs text-blue-100 mt-0.5">
                    100% Stretch cotton • No-pinch ribbing • All sizes 1-12 Years
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: Soft & Skin Friendly */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 backdrop-blur-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-800 shrink-0 font-bold">
                  ☁️
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Soft & Skin-Friendly</div>
                  <div className="text-[11px] text-slate-500 font-medium">100% Pure Organic Cotton</div>
                </div>
              </div>

              {/* Floating Badge 2: Elastic Waistband Comfort */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0 font-bold">
                  ✨
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Elastic Waistband</div>
                  <div className="text-[11px] text-emerald-600 font-bold">Room for Growing Kids</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
