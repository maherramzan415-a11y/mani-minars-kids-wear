import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Phone, 
  Truck, 
  Ruler, 
  ShieldCheck, 
  SlidersHorizontal,
  Sparkles,
  Package
} from 'lucide-react';
import { AgeSize } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: any) => void;
  currency: string;
  onChangeCurrency: (curr: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeGuide,
  onOpenTracking,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  currency,
  onChangeCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);

  const navCategories = [
    { id: 'all', label: 'All Kids Wear' },
    { id: 'denim-cargo', label: 'Denim Cargo Shorts' },
    { id: 'cotton-shirts', label: 'Casual Cotton Shirts' },
    { id: 'boys-fashion', label: 'Boys Fashion' },
    { id: 'trendy-outfits', label: "Trendy Children's Outfits" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      {/* Top Notification Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="inline-flex items-center gap-1.5 font-semibold text-white bg-red-600 px-2 py-0.5 rounded-full text-[11px] tracking-wide">
              <Truck className="w-3 h-3" /> FREE SHIPPING
            </span>
            <span className="hidden sm:inline">On all orders today | Sizes 1 to 12 Years available</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href="https://wa.me/923046466815?text=Hi%20Mani%20Minars%20Kids%20Wear!%20I%20have%20a%20question%20about%20your%20collection." 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              WhatsApp Help: +92 304 6466815
            </a>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <button 
              onClick={onOpenTracking}
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
            >
              <Package className="w-3 h-3 text-blue-400" />
              Track Order
            </button>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <button 
              onClick={onOpenAdmin}
              className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 text-[11px] font-semibold bg-slate-800 px-2 py-0.5 rounded"
              title="Manage store inventory and customer orders"
            >
              <SlidersHorizontal className="w-3 h-3" />
              Admin Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-slate-700 hover:text-blue-900 rounded-lg focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="p-2 text-slate-700 hover:text-blue-900"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <a href="#" className="flex flex-col items-start select-none group">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-blue-950 font-display">
                  MANI <span className="text-red-600">MINARS</span>
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-red-600"></span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-slate-500 uppercase -mt-1 group-hover:text-blue-700 transition-colors">
                KIDS WEAR • EST. 2026
              </span>
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search denim cargo shorts, shirts, boys outfits..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-11 pr-10 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-xs font-semibold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Currency Selector */}
            <div className="hidden sm:flex items-center">
              <select
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 py-1.5 px-2 border border-slate-200 rounded-md focus:outline-hidden cursor-pointer hover:border-slate-400"
              >
                <option value="USD">USD ($)</option>
                <option value="PKR">PKR (₨)</option>
                <option value="GBP">GBP (£)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            {/* Size Guide Trigger */}
            <button
              onClick={onOpenSizeGuide}
              className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors"
            >
              <Ruler className="w-4 h-4 text-blue-600" />
              <span>Size Guide</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-700 hover:text-red-600 hover:bg-red-50/50 rounded-full transition-colors"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-3.5 sm:px-4 py-2.5 rounded-full font-medium text-sm shadow-xs transition-all hover:shadow-md active:scale-95"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-blue-900">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-semibold">Cart</span>
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer (if open) */}
        {showSearchMobile && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-slate-100 border border-slate-200 rounded-lg py-2 pl-10 pr-10 text-sm focus:outline-hidden focus:bg-white"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-500 font-semibold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center space-x-8 border-t border-slate-100 py-2.5 text-sm font-semibold">
          {navCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`pb-1 relative transition-colors ${
                  isActive
                    ? 'text-blue-900 font-bold'
                    : 'text-slate-600 hover:text-blue-800'
                }`}
              >
                {cat.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full" />
                )}
              </button>
            );
          })}
          <button
            onClick={onOpenSizeGuide}
            className="pb-1 text-slate-500 hover:text-blue-800 flex items-center gap-1 font-medium text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            1-12Y Fit Finder
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 flex backdrop-blur-xs">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="font-extrabold text-xl text-blue-950 font-display">
                  MANI <span className="text-red-600">MINARS</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                  Browse Collections
                </p>
                {navCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-blue-50 text-blue-900 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                <button
                  onClick={() => {
                    onOpenSizeGuide();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Ruler className="w-4 h-4 text-blue-600" />
                  Growth & Size Guide (1-12Y)
                </button>
                <button
                  onClick={() => {
                    onOpenTracking();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  <Package className="w-4 h-4 text-emerald-600" />
                  Track Your Package
                </button>
                <button
                  onClick={() => {
                    onOpenAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-amber-700 bg-amber-50"
                >
                  <SlidersHorizontal className="w-4 h-4 text-amber-600" />
                  Store Admin Dashboard
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <a
                href="https://wa.me/923046466815"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 rounded-lg font-semibold text-sm shadow-xs"
              >
                <Phone className="w-4 h-4" />
                WhatsApp: +92 304 6466815
              </a>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                Fast response • 7 Days a week
              </p>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
