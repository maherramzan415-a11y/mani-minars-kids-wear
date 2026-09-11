import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Ruler, 
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { ALL_SIZES, AgeSize } from '../types';

interface FooterProps {
  onSelectCategory: (cat: any) => void;
  onSelectSize: (size: AgeSize) => void;
  onOpenSizeGuide: () => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectSize,
  onOpenSizeGuide,
  onOpenTracking,
}) => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Why are elastic waistbands so important in Mani Minars kids wear?',
      a: 'Children experience growth spurts and require full agility on playgrounds. Our denim cargo shorts and casual bottoms feature an expandable ribbed elastic waistband with soft interior lining and functional drawstrings that eliminate uncomfortable pinches, leaving no red marks on delicate skin while lasting through growth phases.'
    },
    {
      q: 'Are your fabrics 100% pre-shrunk and skin-friendly?',
      a: 'Yes! We use certified long-staple combed cotton and washed denim that is pre-shrunk during fabrication. We also use flatlock and double-needle stitching with hypoallergenic dyes so there are zero scratchy points or irritating neck tags.'
    },
    {
      q: 'How fast is delivery and how does the free shipping policy work?',
      a: 'We offer 100% Free Express Shipping on all orders with no minimum purchase required. Orders are packed within 24 hours and delivered to your doorstep within 2 to 3 business days, complete with real-time tracking.'
    },
    {
      q: 'Can I order directly over WhatsApp?',
      a: 'Absolutely! Click the "WhatsApp Order" button on any product card or in your cart. A pre-filled message with your selected size, color, and product name will open immediately with our friendly kids stylist team.'
    }
  ];

  return (
    <footer className="bg-slate-900 text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SEO FAQ Section */}
        <div className="border-b border-slate-800 pb-12 mb-12">
          <h3 className="text-center text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            Frequently Asked Questions
          </h3>
          <h4 className="text-center text-xl sm:text-2xl font-extrabold text-white font-display mb-8">
            Everything Parents Ask About Mani Minars
          </h4>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpen === idx;
              return (
                <div 
                  key={idx}
                  className="bg-slate-800/80 rounded-2xl border border-slate-700/80 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setFaqOpen(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-100 hover:text-white"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-red-500' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-700/50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-extrabold tracking-tight text-white font-display">
                MANI <span className="text-red-500">MINARS</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Comfortable and stylish kids wear designed for everyday adventures. Premium quality combed cotton fabrics, soft & skin-friendly textures, and durable stitching made to outlast active childhood play.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Helpline: +92 304 6466815</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:maniminarskids@gmail.com" className="hover:text-blue-300 transition-colors">
                  maniminarskids@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Collections */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Featured Collections
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('denim-cargo')} 
                  className="hover:text-white transition-colors"
                >
                  Denim Cargo Shorts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('cotton-shirts')} 
                  className="hover:text-white transition-colors"
                >
                  Casual Cotton Shirts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('boys-fashion')} 
                  className="hover:text-white transition-colors"
                >
                  Boys Fashion Wear
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('trendy-outfits')} 
                  className="hover:text-white transition-colors"
                >
                  Trendy Children's Outfits
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('all')} 
                  className="hover:text-white transition-colors"
                >
                  All Kids Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Available Sizes quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Shop By Age (1-12Y)
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400">
              {ALL_SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => onSelectSize(size)}
                  className="text-left hover:text-red-400 transition-colors py-0.5"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Parent Customer Care */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Parent Assistance
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors flex items-center gap-1">
                  <Ruler className="w-3.5 h-3.5 text-blue-400" />
                  Growth & Size Calculator
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-white transition-colors flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-red-400" />
                  Live Order Tracking
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/923046466815" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  WhatsApp Direct Order (+92 304 6466815)
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Mani Minars Kids Wear. Comfortable & Stylish Kids Wear Designed for Everyday Adventures.</p>
          <div className="flex items-center gap-4">
            <span>✓ 100% Skin Safe Cotton</span>
            <span>•</span>
            <span>Free Shipping on All Orders</span>
            <span>•</span>
            <span>Sizes 1-12 Years</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
