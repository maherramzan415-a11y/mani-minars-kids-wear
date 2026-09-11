import React, { useState, useEffect } from 'react';
import { 
  Product, 
  ProductCategory, 
  AgeSize, 
  CartItem, 
  Order, 
  CustomerReview 
} from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { CUSTOMER_REVIEWS } from './data/reviews';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { SizeSelectorBar } from './components/SizeSelectorBar';
import { FeaturedCollections } from './components/FeaturedCollections';
import { ProductGrid } from './components/ProductGrid';
import { ProductQuickView } from './components/ProductQuickView';
import { SizeGuideModal } from './components/SizeGuideModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { CustomerReviews } from './components/CustomerReviews';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

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
        customerName: 'Sarah Jenkins',
        customerPhone: '+1 (555) 234-5678',
        customerEmail: 'sarah.jenkins@example.com',
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        items: [
          {
            id: 'demo-1',
            productId: 'mm-01',
            name: 'Kids Denim Cargo Shorts with Elastic Waistband',
            price: 24.99,
            size: '4-5 Years',
            color: 'Vintage Blue',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 'demo-2',
            productId: 'mm-02',
            name: 'Breezy Kids Casual Cotton Shirt',
            price: 21.99,
            size: '4-5 Years',
            color: 'Sky Blue',
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1503944547468-b65924483ce8?auto=format&fit=crop&w=800&q=80'
          }
        ],
        subtotal: 46.98,
        discount: 7.05,
        shipping: 0,
        total: 39.93,
        paymentMethod: 'cod',
        status: 'shipped',
        trackingNumber: 'TRK-MM-584920',
        estimatedDelivery: 'Tomorrow by 3:00 PM'
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
        selectedColor: 'Vintage Blue',
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
  const [currency, setCurrency] = useState('USD');
  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    PKR: { symbol: '₨ ', rate: 280 },
    GBP: { symbol: '£', rate: 0.79 },
    EUR: { symbol: '€', rate: 0.92 },
  };
  const activeCurrency = currencyRates[currency] || currencyRates.USD;

  // Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState('');
  const [adminOpen, setAdminOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Promo Code
  const [appliedPromo, setAppliedPromo] = useState<string | null>('MANI15');
  const [discountRate, setDiscountRate] = useState<number>(0.15); // 15% default discount demo

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

  const handleOpenWhatsAppOrder = (product: Product, size: AgeSize) => {
    const text = `*Hello Mani Minars Kids Wear!* 👋%0A%0AI would like to order:%0A*Product:* ${encodeURIComponent(product.name)}%0A*Size:* ${encodeURIComponent(size)}%0A*Price:* $${product.price}%0A*Free Shipping Included*%0A%0APlease let me know the estimated delivery and payment options!`;
    window.open(`https://wa.me/923046466815?text=${text}`, '_blank');
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

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // Filtered Count for Size Selector Bar
  const sizeFilteredCount = selectedSize
    ? products.filter((p) => p.availableSizes.includes(selectedSize)).length
    : products.length;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* 1. Header & Announcement Bar */}
      <Navbar
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => {
          // If wishlist clicked, filter by wishlist
          setSelectedCategory('all');
          setSearchQuery('');
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
        onOpenTracking={() => {
          setTrackingOrderId(orders[0]?.id || '');
          setTrackingOpen(true);
        }}
        onOpenAdmin={() => setAdminOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        currency={currency}
        onChangeCurrency={setCurrency}
      />

      <main className="flex-1">
        {/* 2. Hero Section with Smiling Children */}
        <Hero
          onExploreCollection={() => {
            setSelectedCategory('all');
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreBoys={() => {
            setSelectedCategory('boys-fashion');
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
        />

        {/* 3. The 5 Core Promises / Value Props */}
        <ValueProps />

        {/* 4. Interactive Child Age / Size Selector Bar (1-2Y to 11-12Y) */}
        <SizeSelectorBar
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
          filteredCount={sizeFilteredCount}
        />

        {/* 5. Featured Collections (Denim Cargo Shorts, Cotton Shirts, Boys Fashion, Trendy Outfits) */}
        <FeaturedCollections
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            const el = document.getElementById('products-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 6. Main Product Grid with Search, Filters & Quick Add to Cart */}
        <ProductGrid
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
          currencySymbol={activeCurrency.symbol}
          currencyRate={activeCurrency.rate}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          onOpenWhatsAppOrder={handleOpenWhatsAppOrder}
        />

        {/* 7. Customer Reviews Section */}
        <CustomerReviews
          reviews={reviews}
          onAddReview={handleAddReview}
        />

        {/* 8. Newsletter Signup with 15% OFF Voucher */}
        <Newsletter />
      </main>

      {/* 9. Footer with FAQ & Category Directory */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('products-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
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
      />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingButton />

      {/* Modals & Drawers */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
        onAddToCart={handleAddToCart}
        onOpenWhatsAppOrder={handleOpenWhatsAppOrder}
        onOpenSizeGuide={() => {
          setQuickViewProduct(null);
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

      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        orders={orders}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onToggleProductStock={handleToggleProductStock}
        onAddNewProduct={handleAddNewProduct}
        currencySymbol={activeCurrency.symbol}
        currencyRate={activeCurrency.rate}
      />

    </div>
  );
}
