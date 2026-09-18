import React, { useState, useEffect } from 'react';
import { 
  Product, 
  ProductCategory, 
  AgeSize, 
  CartItem, 
  Order, 
  CustomerReview,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY
} from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { CUSTOMER_REVIEWS } from './data/reviews';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { SizeSelectorBar } from './components/SizeSelectorBar';
import { FeaturedSections } from './components/FeaturedSections';
import { FeaturedCollections } from './components/FeaturedCollections';
import { ProductGrid } from './components/ProductGrid';
import { ProductQuickView } from './components/ProductQuickView';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { CustomerReviews } from './components/CustomerReviews';
import { FAQSection } from './components/FAQSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyTab } from './components/PolicyModal';
import { ShieldCheck, LogOut, SlidersHorizontal } from 'lucide-react';
import { 
  isAdminAuthenticated, 
  clearAdminSession, 
  getAdminEmail 
} from './auth/adminAuth';

export default function App() {
  // Master Store Data
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('mm_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    const saved = localStorage.getItem('mm_reviews');
    return saved ? JSON.parse(saved) : CUSTOMER_REVIEWS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('mm_orders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'MM-8942',
        date: 'Yesterday at 4:15 PM',
        customerName: 'Muhammad Ali',
        customerPhone: '+92 300 1234567',
        customerEmail: 'm.ali@example.com',
        address: 'House 42, Street 7, Gulberg III',
        city: 'Lahore',
        items: [
          {
            id: 'demo-1',
            productId: 'mm-01',
            name: 'Classic Boys Oxford Button-Down Shirt',
            price: 24.99,
            size: '4-5 Years',
            color: 'Sky Blue',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'demo-2',
            productId: 'mm-04',
            name: 'Kids Comfort Denim Cargo Shorts with Elastic Waist',
            price: 26.99,
            size: '4-5 Years',
            color: 'Vintage Indigo',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=80'
          }
        ],
        subtotal: 51.98,
        discount: 7.80,
        shipping: 0,
        total: 44.18,
        paymentMethod: 'cod',
        status: 'shipped',
        trackingNumber: 'TRK-MM-584920',
        estimatedDelivery: 'Tomorrow by 3:00 PM PKT'
      }
    ];
  });

  // Shopping State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('mm_cart');
    return saved ? JSON.parse(saved) : [
      {
        product: INITIAL_PRODUCTS[0],
        selectedSize: '4-5 Years',
        selectedColor: 'Sky Blue',
        quantity: 1
      }
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('mm_wishlist');
    return saved ? JSON.parse(saved) : ['mm-01', 'mm-04'];
  });

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedSize, setSelectedSize] = useState<AgeSize | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Currency
  const [currency, setCurrency] = useState('PKR');
  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    PKR: { symbol: '₨ ', rate: 280 },
    USD: { symbol: '$', rate: 1 },
    GBP: { symbol: '£', rate: 0.79 },
    EUR: { symbol: '€', rate: 0.92 },
  };
  const activeCurrency = currencyRates[currency] || currencyRates.PKR;

  // Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return isAdminAuthenticated();
  });
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [policyModalTab, setPolicyModalTab] = useState<PolicyTab>('about');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Category Slug Normalization for URL routes /categories/*
  const normalizeCategorySlug = (slug: string): ProductCategory | null => {
    const clean = slug.toLowerCase().trim();
    if (clean === 'all') return 'all';
    if (clean === 'boys' || clean === 'boys-collection') return 'boys-collection';
    if (clean === 'girls' || clean === 'girls-collection') return 'girls-collection';
    if (clean === 'new' || clean === 'new-arrivals') return 'new-arrivals';
    if (clean === 'denim' || clean === 'denim-collection') return 'denim-collection';
    if (clean === 'party' || clean === 'party-wear') return 'party-wear';
    if (clean === 'casual' || clean === 'casual-wear') return 'casual-wear';
    return null;
  };

  const getCategorySlug = (cat: ProductCategory): string => {
    switch (cat) {
      case 'boys-collection': return 'boys';
      case 'girls-collection': return 'girls';
      case 'new-arrivals': return 'new-arrivals';
      case 'denim-collection': return 'denim';
      case 'party-wear': return 'party-wear';
      case 'casual-wear': return 'casual-wear';
      default: return 'all';
    }
  };

  // Helper to parse current path or hash for client-side routing
  const getParsedRoute = (): {
    type: 'admin-login' | 'admin-dashboard' | 'product' | 'category' | 'home';
    route: string;
    productId?: string;
    category?: ProductCategory;
  } => {
    const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');
    const target = path !== '/' ? path : (hash ? '/' + hash : '/');

    if (target === '/admin/login' || target === '/login') {
      return { type: 'admin-login', route: '/admin/login' };
    }
    if (target === '/admin/dashboard' || target === '/admin') {
      if (!isAdminAuthenticated()) {
        return { type: 'admin-login', route: '/admin/login' };
      }
      return { type: 'admin-dashboard', route: '/admin/dashboard' };
    }
    if (target.startsWith('/products/') || target === '/products') {
      const rawId = target.replace(/^\/products\/?/, '').split('/')[0];
      return { type: 'product', route: target, productId: rawId };
    }
    if (target.startsWith('/categories/') || target === '/categories') {
      const rawCat = target.replace(/^\/categories\/?/, '').split('/')[0];
      const parsedCat = normalizeCategorySlug(rawCat) || 'all';
      return { type: 'category', route: target, category: parsedCat };
    }
    return { type: 'home', route: '/' };
  };

  const [currentRoute, setCurrentRoute] = useState<string>(() => getParsedRoute().route);
  const [routeNotice, setRouteNotice] = useState<string | null>(null);

  const navigateTo = (route: string, notice?: string) => {
    setRouteNotice(notice || null);
    setCurrentRoute(route);
    
    try {
      window.history.pushState({ route }, '', route);
    } catch {
      window.location.hash = route;
    }
  };

  const navigateToCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const slug = getCategorySlug(cat);
    const targetRoute = slug === 'all' ? '/' : `/categories/${slug}`;
    navigateTo(targetRoute);
    setTimeout(() => {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const navigateToProduct = (product: Product) => {
    setQuickViewProduct(product);
    navigateTo(`/products/${product.id}`);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
    if (selectedCategory !== 'all') {
      navigateTo(`/categories/${getCategorySlug(selectedCategory)}`);
    } else {
      navigateTo('/');
    }
  };

  // Synchronize route on URL popstate, hash change, and keyboard shortcuts
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const hash = window.location.hash.toLowerCase().replace(/^#\/?/, '').replace(/\/$/, '');
      const rawTarget = path !== '/' ? path : (hash ? '/' + hash : '/');

      // Direct access to /admin/dashboard without login must redirect to /admin/login
      if ((rawTarget === '/admin/dashboard' || rawTarget === '/admin') && !isAdminAuthenticated()) {
        navigateTo('/admin/login', 'Access restricted. Please sign in with authorized administrator credentials to access the admin dashboard.');
        return;
      }

      const parsed = getParsedRoute();
      setCurrentRoute(parsed.route);

      if (parsed.type === 'product' && parsed.productId) {
        const targetId = parsed.productId.toLowerCase();
        const found = products.find(
          (p) =>
            p.id.toLowerCase() === targetId ||
            p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === targetId
        );
        if (found) {
          setQuickViewProduct(found);
        }
      } else if (parsed.type === 'category' && parsed.category) {
        setQuickViewProduct(null);
        setSelectedCategory(parsed.category);
        setTimeout(() => {
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (parsed.type === 'home') {
        setQuickViewProduct(null);
      }
    };

    // Initial check on load
    handleLocationChange();

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          navigateTo('/admin/dashboard');
        } else {
          navigateTo('/admin/login');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminLoggedIn, products]);

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState<string | null>('MANI15');
  const [discountRate, setDiscountRate] = useState<number>(0.15); // 15% default discount

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('mm_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('mm_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('mm_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('mm_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('mm_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  // Cart Calculations
  const cartSubtotal = cartItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0);
  const cartDiscount = cartSubtotal * discountRate;
  const cartTotal = cartSubtotal - cartDiscount;

  // Handlers
  const handleAddToCart = (product: Product, size: AgeSize, color: string, qty = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedSize === size && i.selectedColor === color
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += qty;
        return updated;
      }
      return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
    });
    setCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => 
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const handleApplyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'MANI15' || clean === 'MINI15') {
      setAppliedPromo(clean);
      setDiscountRate(0.15);
      return true;
    }
    if (clean === 'WELCOME10') {
      setAppliedPromo('WELCOME10');
      setDiscountRate(0.10);
      return true;
    }
    return false;
  };

  const handleOpenWhatsAppOrder = (product: Product, size: AgeSize, color?: string) => {
    const priceFormatted = `${activeCurrency.symbol}${(product.price * activeCurrency.rate).toFixed(2)}`;
    const text = `*Hello Mani Minars Kids Wear!* 👋%0A%0AI would like to order directly:%0A*Product:* ${encodeURIComponent(product.name)}%0A*Category:* ${encodeURIComponent(product.categoryLabel)}%0A*Size:* ${encodeURIComponent(size)}${color ? `%0A*Color:* ${encodeURIComponent(color)}` : ''}%0A*Price:* ${encodeURIComponent(priceFormatted)}%0A*Free Shipping Included across Pakistan*%0A%0APlease confirm my order via Cash on Delivery (COD)!`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const handleOrderComplete = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCartItems([]); // Clear bag after checkout
  };

  const handleTrackSpecificOrder = (orderId: string) => {
    setTrackingOrderId(orderId);
    setTrackingOpen(true);
  };

  const handleAddReview = (review: CustomerReview) => {
    setReviews((prev) => [review, ...prev]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleToggleProductStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const handleUpdateProductStockQuantity = (productId: string, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockQuantity: quantity, inStock: quantity > 0 } : p))
    );
  };

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleUpdateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const handleResetDefaultCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('mm_products', JSON.stringify(INITIAL_PRODUCTS));
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setAdminOpen(false);
    navigateTo('/admin/dashboard');
  };

  const handleAdminLogout = () => {
    clearAdminSession();
    setIsAdminLoggedIn(false);
    setAdminOpen(false);
    navigateTo('/admin/login', 'You have been successfully signed out of the admin session.');
  };

  // Enforce auth requirement on admin dashboard route
  useEffect(() => {
    if (currentRoute === '/admin/dashboard' && !isAdminLoggedIn) {
      navigateTo('/admin/login', 'Access restricted. Please sign in with authorized administrator credentials to access the admin dashboard.');
    }
  }, [currentRoute, isAdminLoggedIn]);

  const handleOpenPolicyTab = (tab: PolicyTab) => {
    setPolicyModalTab(tab);
    setPolicyModalOpen(true);
  };

  // Filtered Count for Size Selector Bar
  const sizeFilteredCount = selectedSize
    ? products.filter((p) => p.availableSizes.includes(selectedSize)).length
    : products.length;

  // ----------------------------------------------------------------------
  // Dedicated Full-Page Route Views (/admin/login and /admin/dashboard)
  // ----------------------------------------------------------------------
  if (currentRoute === '/admin/login') {
    if (isAdminLoggedIn) {
      return (
        <AdminDashboard
          isOpen={true}
          isFullPage={true}
          onClose={() => navigateTo('/')}
          onNavigateHome={() => navigateTo('/')}
          onLogout={handleAdminLogout}
          products={products}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onToggleProductStock={handleToggleProductStock}
          onUpdateProductStockQuantity={handleUpdateProductStockQuantity}
          onAddNewProduct={handleAddNewProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetDefaultCatalog={handleResetDefaultCatalog}
          currencySymbol={activeCurrency.symbol}
          currencyRate={activeCurrency.rate}
        />
      );
    }

    return (
      <AdminLogin
        isOpen={true}
        isFullPage={true}
        onClose={() => navigateTo('/')}
        onNavigateHome={() => navigateTo('/')}
        onLoginSuccess={handleAdminLoginSuccess}
        noticeMessage={routeNotice}
      />
    );
  }

  if (currentRoute === '/admin/dashboard') {
    if (!isAdminLoggedIn) {
      // Protected Route: unauthorized users are redirected to login
      return (
        <AdminLogin
          isOpen={true}
          isFullPage={true}
          onClose={() => navigateTo('/')}
          onNavigateHome={() => navigateTo('/')}
          onLoginSuccess={handleAdminLoginSuccess}
          noticeMessage="Access restricted. Please sign in with authorized administrator credentials to access the admin dashboard."
        />
      );
    }

    return (
      <AdminDashboard
        isOpen={true}
        isFullPage={true}
        onClose={() => navigateTo('/')}
        onNavigateHome={() => navigateTo('/')}
        onLogout={handleAdminLogout}
        products={products}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onToggleProductStock={handleToggleProductStock}
        onUpdateProductStockQuantity={handleUpdateProductStockQuantity}
        onAddNewProduct={handleAddNewProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onResetDefaultCatalog={handleResetDefaultCatalog}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* Admin Session Indicator Bar */}
      {isAdminLoggedIn && (
        <div className="bg-blue-950 text-white px-4 py-1.5 flex items-center justify-between text-xs border-b border-blue-900 z-40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Mode Active:</span>
            </span>
            <span className="text-slate-300 font-mono text-[11px] hidden sm:inline">{getAdminEmail()}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              id="banner-admin-dashboard-btn"
              onClick={() => navigateTo('/admin/dashboard')}
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 cursor-pointer hover:underline"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Open Dashboard</span>
            </button>
            <span className="text-blue-800">|</span>
            <button
              id="banner-admin-logout-btn"
              onClick={handleAdminLogout}
              className="text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer hover:underline text-[11px]"
            >
              <LogOut className="w-3 h-3" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* 1. Header & Announcement Bar */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => {
          navigateToCategory('all');
          setSearchQuery('');
        }}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onOpenTracking={() => {
          setTrackingOrderId(orders[0]?.id || '');
          setTrackingOpen(true);
        }}
        onOpenAdmin={() => navigateTo(isAdminLoggedIn ? '/admin/dashboard' : '/admin/login')}
        onLogout={handleAdminLogout}
        onNavigate={navigateTo}
        onOpenPolicy={handleOpenPolicyTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={navigateToCategory}
        currency={currency}
        onChangeCurrency={setCurrency}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Smiling Children wearing trendy clothes */}
        <Hero
          onShopNow={() => navigateToCategory('all')}
          onNewArrivals={() => navigateToCategory('new-arrivals')}
          onExploreCollection={() => navigateToCategory('all')}
          onExploreBoys={() => navigateToCategory('boys-collection')}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
        />

        {/* 3. Trust Section (Premium Quality Fabric, Skin-Friendly Materials, Fast Delivery, Easy Exchange) */}
        <ValueProps />

        {/* 4. Interactive Child Age / Size Selector Bar (1-2Y to 11-12Y) */}
        <SizeSelectorBar
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
          filteredCount={sizeFilteredCount}
        />

        {/* 5. Featured Products Sections (New Arrivals, Best Sellers, Denim Collection, Casual Shirts) */}
        <FeaturedSections
          products={products}
          currencySymbol={activeCurrency.symbol}
          currencyRate={activeCurrency.rate}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={navigateToProduct}
          onAddToCart={handleAddToCart}
          onOpenWhatsAppOrder={handleOpenWhatsAppOrder}
          onSelectCategory={navigateToCategory}
        />

        {/* 6. The 6 Requested Category Collections */}
        <FeaturedCollections
          onSelectCategory={navigateToCategory}
        />

        {/* 7. Main Product Grid with Search, Filters, Large Images & Direct WhatsApp Ordering */}
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={navigateToCategory}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          currencySymbol={activeCurrency.symbol}
          currencyRate={activeCurrency.rate}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={navigateToProduct}
          onAddToCart={handleAddToCart}
          onOpenWhatsAppOrder={handleOpenWhatsAppOrder}
        />

        {/* 8. Customer Reviews & Testimonials Section */}
        <CustomerReviews
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* 9. FAQ Section (Placed Below Products & Customer Reviews as requested) */}
        <FAQSection />

        {/* 10. Newsletter Signup */}
        <Newsletter />
      </main>

      {/* 9. Footer with FAQ, Categories, & Legal Policy Links */}
      <Footer
        onSelectCategory={navigateToCategory}
        onSelectSize={(size) => {
          setSelectedSize(size);
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onOpenTracking={() => {
          setTrackingOrderId(orders[0]?.id || '');
          setTrackingOpen(true);
        }}
        onOpenPolicy={handleOpenPolicyTab}
        onOpenAdmin={() => navigateTo(isAdminLoggedIn ? '/admin/dashboard' : '/admin/login')}
        isAdminLoggedIn={isAdminLoggedIn}
        onNavigate={navigateTo}
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Modals & Overlays */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={handleCloseQuickView}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
        onAddToCart={handleAddToCart}
        onOpenWhatsAppOrder={handleOpenWhatsAppOrder}
        onOpenSizeGuide={() => {
          handleCloseQuickView();
          setSizeGuideOpen(true);
        }}
      />

      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        onSelectSizeFilter={(size) => {
          setSelectedSize(size);
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
        onProceedToCheckout={() => setCheckoutOpen(true)}
        discountRate={discountRate}
        onApplyPromoCode={handleApplyPromoCode}
        appliedPromo={appliedPromo}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        subtotal={cartSubtotal}
        discount={cartDiscount}
        total={cartTotal}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
        onOrderComplete={handleOrderComplete}
        onTrackOrder={handleTrackSpecificOrder}
      />

      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        orders={orders}
        initialOrderId={trackingOrderId}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
      />

      {/* Secure Admin Authentication Gate */}
      {adminOpen && !isAdminLoggedIn && (
        <AdminLogin
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          onNavigateHome={() => {
            setAdminOpen(false);
            navigateTo('/');
          }}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      )}

      {/* Full Admin Management Dashboard (Authenticated Only) */}
      {adminOpen && isAdminLoggedIn && (
        <AdminDashboard
          isOpen={adminOpen}
          onClose={() => setAdminOpen(false)}
          onNavigateHome={() => {
            setAdminOpen(false);
            navigateTo('/');
          }}
          onLogout={handleAdminLogout}
          products={products}
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onToggleProductStock={handleToggleProductStock}
          onUpdateProductStockQuantity={handleUpdateProductStockQuantity}
          onAddNewProduct={handleAddNewProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetDefaultCatalog={handleResetDefaultCatalog}
          currencySymbol={activeCurrency.symbol}
          currencyRate={activeCurrency.rate}
        />
      )}

      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        initialTab={policyModalTab}
      />

    </div>
  );
}
