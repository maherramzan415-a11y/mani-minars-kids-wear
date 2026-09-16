import React, { useState, useRef, useEffect } from 'react';
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
  Package,
  Info,
  ChevronDown,
  Layers,
  ArrowRight,
  Flame,
  Shirt,
  Lock,
  LogOut
} from 'lucide-react';
import { ProductCategory, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../types';
import { PolicyTab } from './PolicyModal';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  isAdminLoggedIn?: boolean;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSizeGuide: () => void;
  onOpenTracking: () => void;
  onOpenAdmin: () => void;
  onLogout?: () => void;
  onNavigate?: (path: string) => void;
  onOpenPolicy: (tab: PolicyTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ProductCategory;
  onSelectCategory: (cat: ProductCategory) => void;
  currency: string;
  onChangeCurrency: (curr: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  isAdminLoggedIn = false,
  onOpenCart,
  onOpenWishlist,
  onOpenSizeGuide,
  onOpenTracking,
  onOpenAdmin,
  onLogout,
  onNavigate,
  onOpenPolicy,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  currency,
  onChangeCurrency,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Exact 6 categories requested by user + 'all'
  const navCategories: { id: ProductCategory; label: string; badge?: string; desc?: string }[] = [
    { id: 'all', label: 'All Items', desc: 'Complete fashion range (Sizes 1-12Y)' },
    { id: 'boys-collection', label: 'Boys Collection', badge: 'Hot', desc: 'Oxford shirts, tees & tailored sets' },
    { id: 'girls-collection', label: 'Girls Collection', desc: 'Floral dresses & cute playwear' },
    { id: 'new-arrivals', label: 'New Arrivals', badge: 'New', desc: 'Fresh drops for 2026' },
    { id: 'denim-collection', label: 'Denim Collection', badge: 'Top', desc: 'Stretch waist shorts & jeans' },
    { id: 'party-wear', label: 'Party Wear', desc: 'Blazers, dresses & festive sets' },
    { id: 'casual-wear', label: 'Casual Wear', desc: '100% Breathable cotton outfits' },
  ];

  const handleCategorySelect = (catId: ProductCategory) => {
    onSelectCategory(catId);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById('products-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-xs">
      {/* Top Announcement Strip */}
      <div className="bg-blue-950 text-white text-xs py-2 px-4 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2.5 text-slate-200">
            <span className="inline-flex items-center gap-1 font-extrabold text-white bg-red-600 px-2.5 py-0.5 rounded-full text-[10px] tracking-wider uppercase">
              <Truck className="w-3 h-3" /> FAST FREE DELIVERY
            </span>
            <span className="hidden sm:inline text-xs">
              Nationwide Delivery Across Pakistan • Sizes 1-12 Years • Easy Exchange
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Mani%20Minars%20Kids%20Wear!%20I%20have%20a%20question%20about%20your%20collection.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-emerald-400 text-slate-200 transition-colors flex items-center gap-1 font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>

            <span className="text-blue-900 hidden sm:inline">|</span>

            <button 
              onClick={onOpenTracking}
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300 cursor-pointer"
            >
              <Package className="w-3 h-3 text-blue-400" />
              <span>Track Order</span>
            </button>

            <span className="text-blue-900 hidden sm:inline">|</span>

            {/* Admin Authentication & Management Links */}
            {!isAdminLoggedIn ? (
              <button 
                id="topbar-admin-login-btn"
                onClick={() => onNavigate ? onNavigate('/admin/login') : onOpenAdmin()}
                className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 text-[11px] font-bold bg-blue-900/90 hover:bg-blue-800 px-2.5 py-1 rounded-md cursor-pointer border border-amber-400/40 shadow-xs"
                title="Store Administrator Login"
              >
                <Lock className="w-3 h-3 text-amber-300" />
                <span>Admin Login</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  id="topbar-admin-dashboard-btn"
                  onClick={() => onNavigate ? onNavigate('/admin/dashboard') : onOpenAdmin()}
                  className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1.5 text-[11px] font-bold bg-blue-900/90 hover:bg-blue-800 px-2.5 py-1 rounded-md cursor-pointer border border-amber-400/40 shadow-xs"
                  title="Admin Dashboard (Active Session)"
                >
                  <SlidersHorizontal className="w-3 h-3 text-amber-300" />
                  <span>Admin Dashboard</span>
                </button>
                {onLogout && (
                  <button
                    id="topbar-admin-logout-btn"
                    onClick={onLogout}
                    className="text-slate-300 hover:text-red-300 transition-colors flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded hover:bg-blue-900/60 cursor-pointer"
                    title="Log out of admin session"
                  >
                    <LogOut className="w-3 h-3 text-red-400" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-slate-700 hover:text-blue-950 rounded-lg cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={() => setShowSearchMobile(!showSearchMobile)}
              className="p-2 text-slate-700 hover:text-blue-950 cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo: Mani Minars Kids Wear */}
          <div className="flex items-center">
            <a href="#" className="flex flex-col items-start select-none group">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-blue-950 font-display">
                  MANI <span className="text-red-600">MINARS</span>
                </span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600"></span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.22em] text-slate-500 uppercase -mt-1 group-hover:text-blue-950 transition-colors">
                KIDS WEAR • SIZES 1-12Y
              </span>
            </a>
          </div>

          {/* Desktop Search Bar with Live Suggestions and Clear */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search boys shirts, denim cargo shorts, party wear..."
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-11 pr-12 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-blue-900 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3" />
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Currency Selector (PKR and USD default) */}
            <div className="flex items-center">
              <select
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value)}
                className="bg-slate-50 text-xs font-bold text-slate-800 py-1.5 px-2 rounded-lg border border-slate-200 focus:outline-hidden cursor-pointer hover:border-slate-400"
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
              className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-blue-950 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Ruler className="w-4 h-4 text-blue-900" />
              <span>Size Guide</span>
            </button>

            {/* About & Contact Quick Links */}
            <button
              onClick={() => onOpenPolicy('about')}
              className="hidden xl:flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-red-600" />
              <span>About</span>
            </button>

            {/* Admin Login / Dashboard Header Action */}
            {!isAdminLoggedIn ? (
              <button
                id="navbar-admin-login-btn"
                onClick={() => onNavigate ? onNavigate('/admin/login') : onOpenAdmin()}
                className="hidden md:flex items-center gap-1.5 text-xs font-bold text-blue-950 bg-slate-100 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-300 px-3 py-2 rounded-full transition-all border border-slate-200 cursor-pointer shadow-2xs"
                title="Store Administrator Login (/admin/login)"
              >
                <Lock className="w-3.5 h-3.5 text-blue-900" />
                <span>Admin Login</span>
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-1.5">
                <button
                  id="navbar-admin-dashboard-btn"
                  onClick={() => onNavigate ? onNavigate('/admin/dashboard') : onOpenAdmin()}
                  className="flex items-center gap-1.5 text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 px-3.5 py-2 rounded-full transition-all shadow-xs cursor-pointer"
                  title="Open Admin Dashboard (/admin/dashboard)"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Dashboard</span>
                </button>
                {onLogout && (
                  <button
                    id="navbar-admin-logout-btn"
                    onClick={onLogout}
                    className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-red-600 hover:bg-red-50 px-2.5 py-2 rounded-full transition-all border border-slate-200 cursor-pointer"
                    title="Sign Out of Admin"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 text-slate-700 hover:text-red-600 hover:bg-red-50/70 rounded-full transition-colors cursor-pointer"
              title="Saved Items"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-blue-950 hover:bg-blue-900 text-white px-3.5 sm:px-4 py-2.5 rounded-full font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-red-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-blue-950 shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-display">Bag</span>
            </button>

          </div>
        </div>

        {/* Mobile Search Input Drawer (if toggled) */}
        {showSearchMobile && (
          <div className="lg:hidden pb-3 pt-1">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search denim shorts, cotton shirts, party wear..."
                className="w-full bg-slate-100 border border-slate-200 rounded-xl py-2.5 pl-10 pr-10 text-xs font-semibold focus:outline-hidden focus:bg-white"
                autoFocus
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Navigation Strip with Sticky Behavior and Categories Dropdown */}
        <nav className="hidden lg:flex items-center justify-between border-t border-slate-100 py-2.5 text-xs font-bold">
          
          {/* Categories Dropdown Button and Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              id="navbar-categories-dropdown-btn"
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-blue-950 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer text-xs font-bold"
              aria-expanded={dropdownOpen}
            >
              <Layers className="w-3.5 h-3.5 text-red-600" />
              <span>Categories</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Panel */}
            {dropdownOpen && (
              <div 
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute top-full left-0 mt-1.5 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-fade-in"
              >
                <div className="px-2 py-1.5 border-b border-slate-100 mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Browse All Collections
                  </span>
                  <span className="text-[10px] text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">
                    Ages 1-12Y
                  </span>
                </div>

                <div className="space-y-1">
                  {navCategories.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`w-full text-left p-2 rounded-xl flex items-center justify-between transition-colors cursor-pointer group ${
                          isSelected ? 'bg-blue-950 text-white' : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-xs">
                            <span>{cat.label}</span>
                            {cat.badge && (
                              <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase ${
                                isSelected ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'
                              }`}>
                                {cat.badge}
                              </span>
                            )}
                          </div>
                          {cat.desc && (
                            <div className={`text-[10px] ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                              {cat.desc}
                            </div>
                          )}
                        </div>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${
                          isSelected ? 'text-white' : 'text-slate-400'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Direct Category Tab Links */}
          <div className="flex items-center space-x-5">
            {navCategories.filter(c => c.id !== 'all').map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`pb-1 relative transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'text-blue-950 font-extrabold'
                      : 'text-slate-600 hover:text-red-600'
                  }`}
                >
                  {cat.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Fit Finder */}
          <button
            onClick={onOpenSizeGuide}
            className="text-slate-500 hover:text-blue-950 flex items-center gap-1 font-semibold text-xs cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Size Finder (1-12Y)</span>
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 flex backdrop-blur-xs">
          <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="font-black text-xl text-blue-950 font-display">
                  MANI <span className="text-red-600">MINARS</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-4 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                  Browse Categories
                </p>
                {navCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      setMobileMenuOpen(false);
                      const el = document.getElementById('products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-blue-950 text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-1.5">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-1">
                  Customer Assistance
                </p>
                <button
                  onClick={() => {
                    onOpenSizeGuide();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Ruler className="w-4 h-4 text-blue-600" />
                  <span>Size & Growth Guide (1-12Y)</span>
                </button>

                <button
                  onClick={() => {
                    onOpenTracking();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>Track Your Order</span>
                </button>

                <button
                  onClick={() => {
                    onOpenPolicy('about');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Info className="w-4 h-4 text-red-600" />
                  <span>About Us & Policies</span>
                </button>

                {/* Mobile Admin Authentication & Dashboard Controls */}
                {!isAdminLoggedIn ? (
                  <button
                    id="mobile-admin-login-btn"
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('/admin/login');
                      } else {
                        onOpenAdmin();
                      }
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-blue-950 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border border-slate-200"
                  >
                    <Lock className="w-4 h-4 text-blue-900" />
                    <span>Admin Login</span>
                  </button>
                ) : (
                  <div className="space-y-1.5 pt-1">
                    <button
                      id="mobile-admin-dashboard-btn"
                      onClick={() => {
                        if (onNavigate) {
                          onNavigate('/admin/dashboard');
                        } else {
                          onOpenAdmin();
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 transition-colors cursor-pointer"
                    >
                      <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                      <span>Admin Dashboard</span>
                    </button>
                    {onLogout && (
                      <button
                        id="mobile-admin-logout-btn"
                        onClick={() => {
                          onLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-600" />
                        <span>Sign Out (Logout)</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs shadow-xs"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
              </a>
              <p className="text-[10px] text-center text-slate-400 mt-2">
                Fast Response • Mon - Sat (9am - 9pm PKT)
              </p>
            </div>
          </div>

          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
