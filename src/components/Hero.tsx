import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Truck, CheckCircle2, MessageCircle, Star, Users } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../types';

interface HeroProps {
  onExploreCollection?: () => void;
  onShopNow?: () => void;
  onExploreBoys?: () => void;
  onNewArrivals?: () => void;
  onOpenSizeGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCollection,
  onShopNow,
  onExploreBoys,
  onNewArrivals,
  onOpenSizeGuide,
}) => {
  const handleShopNow = onShopNow || onExploreCollection || (() => {});
  const handleNewArrivals = onNewArrivals || onExploreBoys || (() => {});

  return (
    <section className="relative w-full overflow-hidden bg-slate-950 text-white">
      {/* Editorial background elements with high-end ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-blue-950/80 pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full opacity-30 lg:opacity-45 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1519764622345-23439dd774f7?auto=format&fit=crop&w=1800&q=85"
          alt="Happy fashionable children smiling in stylish clothing by Mani Minars Kids Wear"
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full text-xs font-semibold text-white mx-auto lg:mx-0 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-red-400 font-black uppercase tracking-wider text-[11px]">New 2026 Collection</span>
              <span className="text-slate-500">|</span>
              <span className="text-amber-300 font-bold">15% OFF Code: MANI15</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-display">
              Premium Kids Fashion for <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">Every Adventure</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Stylish, Comfortable & Affordable Clothing for Boys and Girls aged 1 to 12 Years. Crafted with 100% skin-safe combed cotton, stretch flex denim, and pinch-free elastic waistbands.
            </p>

            {/* Key trust badges pill row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              {[
                'Free Nationwide Shipping',
                '100% Skin Friendly Fabric',
                'Pinch-Free Elastic Waistbands',
                '14-Day Doorstep Exchange'
              ].map((pill, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-200 bg-white/5 border border-white/10 px-3 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {pill}
                </span>
              ))}
            </div>

            {/* The Two Requested CTA Buttons: "Shop Now" and "New Arrivals" */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={handleShopNow}
                id="hero-shop-now-btn"
                className="bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-4 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2.5 group text-sm sm:text-base active:scale-95 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleNewArrivals}
                id="hero-new-arrivals-btn"
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-extrabold px-8 py-4 rounded-xl shadow-sm transition-all text-sm sm:text-base active:scale-95 cursor-pointer backdrop-blur-xs flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>New Arrivals</span>
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Mani%20Minars!%20I'd%20like%20to%20browse%20and%20order%20the%20latest%20kids%20fashion%20collection.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold px-5 py-4 rounded-xl text-sm transition-all active:scale-95 border border-emerald-500/50 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Order</span>
              </a>
            </div>

            {/* High-Converting Social Proof Strip */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Parent reviewer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Parent reviewer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Parent reviewer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Parent reviewer" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                    <span className="font-bold text-white text-xs ml-0.5">4.9/5</span>
                  </div>
                  <p className="text-[11px] text-slate-400">10,000+ Happy Pakistani Parents</p>
                </div>
              </div>

              <div className="h-6 w-px bg-slate-800 hidden sm:block" />

              <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
                <span className="flex items-center gap-1 text-slate-200">
                  <Truck className="w-4 h-4 text-red-400" />
                  <span>Free Delivery & COD</span>
                </span>
                <button 
                  onClick={onOpenSizeGuide}
                  className="underline hover:text-white text-slate-300 font-semibold cursor-pointer"
                >
                  Size Guide (1-12Y)
                </button>
              </div>
            </div>
          </div>

          {/* Right Visual Showcase with Genuine Kids Fashion Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Lifestyle Hero Photo - Kids wearing trendy kids fashion */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900 aspect-4/5 group">
                <img
                  src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=1000&q=85"
                  alt="Stylish fashionable children wearing modern comfortable clothes by Mani Minars Kids Wear"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  decoding="async"
                />

                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Floating Bottom Card on Image */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="inline-block bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-sm tracking-wider">
                      Trending Now
                    </span>
                    <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-sm">
                      Ages 1-12 Years
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black font-display leading-tight text-white">
                    Premium Casual Shirts & Stretch Denim Shorts
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Reinforced stitching • Anti-pinch elastic waistband • 100% Breathable
                  </p>
                </div>
              </div>

              {/* Floating Badge: Soft & Skin Friendly */}
              <div className="absolute -top-4 -left-3 sm:-left-5 bg-white text-slate-900 p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-900 shrink-0 font-bold text-lg">
                  ☁️
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Skin-Friendly Cotton</div>
                  <div className="text-[10px] text-slate-500 font-medium">Hypoallergenic & Soft</div>
                </div>
              </div>

              {/* Floating Badge: Elastic Waistband Comfort */}
              <div className="absolute -bottom-4 -right-3 sm:-right-4 bg-white text-slate-900 p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600 shrink-0 font-bold text-lg">
                  ✨
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Room-to-Grow Fit</div>
                  <div className="text-[10px] text-red-600 font-bold">Elastic Stretch Waist</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
