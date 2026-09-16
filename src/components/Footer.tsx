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
  MessageCircle,
  FileText,
  Lock,
  HeartHandshake
} from 'lucide-react';
import { ALL_SIZES, AgeSize, ProductCategory, STORE_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../types';
import { PolicyTab } from './PolicyModal';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onSelectSize: (size: AgeSize) => void;
  onOpenSizeGuide: () => void;
  onOpenTracking: () => void;
  onOpenPolicy: (tab: PolicyTab) => void;
  onOpenAdmin?: () => void;
  isAdminLoggedIn?: boolean;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onSelectSize,
  onOpenSizeGuide,
  onOpenTracking,
  onOpenPolicy,
  onOpenAdmin,
  isAdminLoggedIn = false,
  onNavigate,
}) => {
  return (
    <footer className="bg-slate-950 text-white pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Main Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-tight text-white font-display">
                Mani <span className="text-red-600">Minars</span>
              </span>
              <span className="text-[10px] bg-red-600 text-white font-extrabold uppercase px-2 py-0.5 rounded-sm">
                Kids Wear
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Premium Kids Fashion for Every Adventure. Stylish, comfortable & affordable clothing for boys and girls aged 1 to 12 Years. Crafted with 100% skin-safe combed cotton, stretch denim, and expandable elastic waistbands.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span className="font-semibold">{WHATSAPP_DISPLAY} (WhatsApp Helpline)</span>
              </a>

              <a 
                href={`mailto:${STORE_EMAIL}`}
                className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>{STORE_EMAIL}</span>
              </a>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Lahore • Karachi • Islamabad • Nationwide Pakistan</span>
              </div>
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onSelectCategory('boys-collection')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Boys Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('girls-collection')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Girls Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('new-arrivals')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  New Arrivals (2026)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('denim-collection')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Denim Collection
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('party-wear')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Party Wear
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory('casual-wear')} 
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Casual Wear
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies (Requirement 6) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Customer Policies
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => onOpenPolicy('about')} 
                  className="hover:text-red-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-red-500" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('contact')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('shipping')} 
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Shipping Policy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('returns')} 
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Return Policy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('privacy')} 
                  className="hover:text-purple-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5 text-purple-400" />
                  <span>Privacy Policy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenPolicy('terms')} 
                  className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Terms & Conditions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Parent Tools & Sizing */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-display">
              Sizes & Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 mb-4">
              <li>
                <button onClick={onOpenSizeGuide} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Ruler className="w-3.5 h-3.5 text-blue-400" />
                  <span>Size & Age Guide (1-12Y)</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenTracking} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Truck className="w-3.5 h-3.5 text-red-400" />
                  <span>Track Your Delivery</span>
                </button>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Direct Order on WhatsApp</span>
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 block mb-1">Quick Select Size:</span>
              <div className="flex flex-wrap gap-1">
                {ALL_SIZES.slice(0, 6).map((size) => (
                  <button
                    key={size}
                    onClick={() => onSelectSize(size)}
                    className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 hover:border-red-500 rounded text-[10px] text-slate-400 hover:text-white transition-colors"
                  >
                    {size.replace(' Years', 'Y')}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with SEO keywords & copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Mani Minars Kids Wear. Premium Kids Fashion for Every Adventure.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
            <span>Kids Clothes Pakistan</span>
            <span>•</span>
            <span>Boys Shirts</span>
            <span>•</span>
            <span>Kids Denim Shorts</span>
            <span>•</span>
            <span>Children's Fashion</span>
            <span>•</span>
            {!isAdminLoggedIn ? (
              <button
                id="footer-admin-login-btn"
                onClick={() => onNavigate ? onNavigate('/admin/login') : (onOpenAdmin && onOpenAdmin())}
                className="hover:text-amber-300 text-slate-400 font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Store Admin Login (/admin/login)"
              >
                <Lock className="w-2.5 h-2.5 text-amber-400" />
                <span>Admin Login</span>
              </button>
            ) : (
              <button
                id="footer-admin-dashboard-btn"
                onClick={() => onNavigate ? onNavigate('/admin/dashboard') : (onOpenAdmin && onOpenAdmin())}
                className="hover:text-amber-300 text-amber-400 font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Store Admin Dashboard (/admin/dashboard)"
              >
                <Lock className="w-2.5 h-2.5 text-amber-400" />
                <span>Admin Dashboard (Logged In)</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
