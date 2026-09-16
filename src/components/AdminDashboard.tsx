import React, { useState, useRef } from 'react';
import { 
  X, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Plus, 
  Check, 
  Sliders, 
  Sparkles, 
  ShoppingBag, 
  Clock, 
  Trash2, 
  Edit, 
  Edit2, 
  AlertTriangle, 
  RefreshCw, 
  Search, 
  Filter,
  Upload,
  Image as ImageIcon,
  CheckCircle,
  ExternalLink,
  Phone,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Download,
  KeyRound,
  Eye,
  Star,
  Layers,
  ArrowUpRight,
  Store
} from 'lucide-react';
import { 
  Product, 
  Order, 
  OrderStatus, 
  AgeSize, 
  ALL_SIZES, 
  ProductCategory, 
  STORE_EMAIL,
  WHATSAPP_NUMBER 
} from '../types';
import { ProductImage } from './ProductImage';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  isFullPage?: boolean;
  onNavigateHome?: () => void;
  products: Product[];
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onUpdateOrderTracking?: (orderId: string, trackingNumber: string) => void;
  onToggleProductStock: (productId: string) => void;
  onUpdateProductStockQuantity: (productId: string, quantity: number) => void;
  onAddNewProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetDefaultCatalog?: () => void;
  currencySymbol: string;
  currencyRate: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout,
  isFullPage = false,
  onNavigateHome,
  products,
  orders,
  onUpdateOrderStatus,
  onUpdateOrderTracking,
  onToggleProductStock,
  onUpdateProductStockQuantity,
  onAddNewProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetDefaultCatalog,
  currencySymbol,
  currencyRate,
}) => {
  if (!isOpen && !isFullPage) return null;

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'inventory' | 'orders' | 'settings'>('overview');

  // Filters & searches
  const [searchTerm, setSearchTerm] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low-stock' | 'out-of-stock'>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearchTerm, setOrderSearchTerm] = useState('');

  // Editing & deletion modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Password change state
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);

  // Product Form state
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('boys-collection');
  const [formPrice, setFormPrice] = useState('24.99');
  const [formOriginalPrice, setFormOriginalPrice] = useState('34.99');
  const [formStock, setFormStock] = useState('25');
  const [formDesc, setFormDesc] = useState('');
  const [formSizes, setFormSizes] = useState<AgeSize[]>([...ALL_SIZES]);
  const [formColors, setFormColors] = useState<{ name: string; hex: string }[]>([
    { name: 'Navy Blue', hex: '#1E3A8A' },
    { name: 'Sky Blue', hex: '#0284C7' }
  ]);
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#3B82F6');
  const [formImages, setFormImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [formElasticWaist, setFormElasticWaist] = useState(true);
  const [formFabric, setFormFabric] = useState('100% Breathable Combed Cotton');
  const [formCare, setFormCare] = useState('Machine wash cold, tumble dry low.');
  const [formSubmitting, setFormSubmitting] = useState(false);

  // File input ref for upload
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const inStockCount = products.filter((p) => p.inStock && p.stockQuantity > 0).length;
  const lowStockProducts = products.filter((p) => p.stockQuantity <= 5 && p.stockQuantity > 0);
  const outOfStockProducts = products.filter((p) => !p.inStock || p.stockQuantity === 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');

  // Category labels helper
  const categoryLabels: Record<ProductCategory, string> = {
    'all': 'All Items',
    'boys-collection': 'Boys Collection',
    'girls-collection': 'Girls Collection',
    'new-arrivals': 'New Arrivals',
    'denim-collection': 'Denim Collection',
    'party-wear': 'Party Wear',
    'casual-wear': 'Casual Wear',
  };

  // Open Form for Adding New Product
  const handleOpenAddProduct = () => {
    setEditingProduct(null);
    setFormName('');
    setFormCategory('boys-collection');
    setFormPrice('24.99');
    setFormOriginalPrice('34.99');
    setFormStock('25');
    setFormDesc('Premium 100% skin-safe combed cotton kids wear tailored for everyday joy, playground durability, and effortless party style.');
    setFormSizes([...ALL_SIZES]);
    setFormColors([
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'Crimson Red', hex: '#DC2626' }
    ]);
    setFormImages([
      'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80'
    ]);
    setFormElasticWaist(true);
    setFormFabric('100% Breathable Combed Cotton with Stretch');
    setFormCare('Machine wash cold gentle cycle. Line dry in shade.');
    setIsFormOpen(true);
  };

  // Open Form for Editing Existing Product
  const handleOpenEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormPrice(product.price.toString());
    setFormOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setFormStock(product.stockQuantity.toString());
    setFormDesc(product.description || '');
    setFormSizes(product.availableSizes ? [...product.availableSizes] : [...ALL_SIZES]);
    setFormColors(product.colors ? [...product.colors] : [{ name: 'Default', hex: '#1E3A8A' }]);
    setFormImages(product.images && product.images.length > 0 ? [...product.images] : ['/placeholder-product.svg']);
    setFormElasticWaist(product.elasticWaistband ?? true);
    setFormFabric(product.fabric || '100% Combed Cotton');
    setFormCare(product.careInstructions || 'Machine wash cold');
    setIsFormOpen(true);
  };

  // Handle Multi-file Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setFormImages((prev) => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });

    if (e.target) e.target.value = '';
  };

  // Handle Add Image URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setFormImages((prev) => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  // Handle Delete Image
  const handleRemoveImage = (index: number) => {
    setFormImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Set Primary Image
  const handleSetPrimaryImage = (index: number) => {
    if (index === 0) return;
    setFormImages((prev) => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
  };

  // Handle Add Color
  const handleAddColor = () => {
    if (!newColorName.trim()) return;
    setFormColors((prev) => [...prev, { name: newColorName.trim(), hex: newColorHex }]);
    setNewColorName('');
  };

  // Handle Remove Color
  const handleRemoveColor = (index: number) => {
    setFormColors((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle Toggle Size
  const handleToggleSize = (size: AgeSize) => {
    setFormSizes((prev) => 
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Save Product (Create or Update)
  const handleSubmitProductForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setFormSubmitting(true);
    const parsedStock = Math.max(0, parseInt(formStock, 10) || 0);
    const parsedPrice = parseFloat(formPrice) || 24.99;
    const parsedOriginal = formOriginalPrice.trim() ? parseFloat(formOriginalPrice) : undefined;
    const finalImages = formImages.length > 0 ? formImages : ['/placeholder-product.svg'];

    const productPayload: Product = {
      id: editingProduct ? editingProduct.id : `mm-${Date.now().toString().slice(-5)}`,
      name: formName.trim(),
      category: formCategory,
      categoryLabel: categoryLabels[formCategory] || 'Kids Wear',
      price: parsedPrice,
      originalPrice: parsedOriginal,
      rating: editingProduct ? editingProduct.rating : 5.0,
      reviewCount: editingProduct ? editingProduct.reviewCount : 1,
      images: finalImages,
      description: formDesc.trim() || 'Premium 100% skin-friendly combed cotton kids apparel.',
      highlights: [
        '100% Breathable Combed Cotton',
        'Reinforced play-proof seams',
        'Anti-shrink colorfast dye'
      ],
      fabric: formFabric.trim(),
      careInstructions: formCare.trim(),
      availableSizes: formSizes.length > 0 ? formSizes : [...ALL_SIZES],
      colors: formColors.length > 0 ? formColors : [{ name: 'Navy', hex: '#1E3A8A' }],
      isNewArrival: formCategory === 'new-arrivals' || (editingProduct?.isNewArrival ?? true),
      isBestSeller: editingProduct?.isBestSeller ?? false,
      inStock: parsedStock > 0,
      stockQuantity: parsedStock,
      elasticWaistband: formElasticWaist,
    };

    setTimeout(() => {
      if (editingProduct) {
        onUpdateProduct(productPayload);
      } else {
        onAddNewProduct(productPayload);
      }
      setFormSubmitting(false);
      setIsFormOpen(false);
      setActiveTab('products');
    }, 300);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (productToDelete) {
      onDeleteProduct(productToDelete.id);
      setProductToDelete(null);
    }
  };

  // Handle Export Catalog JSON
  const handleExportCatalog = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mani_minars_catalog_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Handle Password Update
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPasswordInput.length < 6) return;
    localStorage.setItem('mm_admin_pwd', newPasswordInput);
    setPasswordChangeSuccess(true);
    setNewPasswordInput('');
    setTimeout(() => setPasswordChangeSuccess(false), 3000);
  };

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (stockFilter === 'low-stock' && (p.stockQuantity > 5 || p.stockQuantity <= 0)) return false;
    if (stockFilter === 'out-of-stock' && (p.inStock && p.stockQuantity > 0)) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearchTerm.trim()) {
      const q = orderSearchTerm.toLowerCase();
      return o.id.toLowerCase().includes(q) || 
             o.customerName.toLowerCase().includes(q) || 
             o.customerPhone.includes(q) || 
             o.city.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className={isFullPage ? "min-h-screen bg-slate-100 flex flex-col font-sans" : "fixed inset-0 z-50 bg-blue-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"}>
      <div 
        className={isFullPage 
          ? "flex-1 flex flex-col bg-white border-y sm:border border-slate-200 shadow-sm max-w-7xl mx-auto w-full my-0 sm:my-4 sm:rounded-3xl overflow-hidden relative"
          : "bg-white rounded-3xl max-w-6xl w-full shadow-2xl border border-slate-200 max-h-[94vh] overflow-hidden flex flex-col relative"
        }
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold text-white shadow-xs">
              MM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-extrabold text-white font-display">
                  Mani Minars Kids Wear • Admin Portal
                </h1>
                <span className="hidden sm:inline-block bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Verified Admin
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Logged in as: <span className="text-slate-200 font-mono">{STORE_EMAIL}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateHome && (
              <button
                id="admin-dashboard-return-store-btn"
                onClick={onNavigateHome}
                className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-blue-700"
                title="Return to customer store website"
              >
                <Store className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Back to Store</span>
              </button>
            )}
            <button
              id="admin-dashboard-signout-btn"
              onClick={onLogout}
              className="px-3 py-1.5 bg-slate-800 hover:bg-red-900 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-slate-700"
              title="End admin session"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            {!isFullPage && (
              <button
                onClick={onClose}
                className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close dashboard"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'products'
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'inventory'
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Inventory & Alerts</span>
              {lowStockProducts.length > 0 && (
                <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {lowStockProducts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Orders ({orders.length})</span>
              {pendingOrders.length > 0 && (
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-black">
                  {pendingOrders.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'settings'
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Settings</span>
            </button>
          </div>

          <button
            onClick={handleOpenAddProduct}
            className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer ml-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Scrollable Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ======================= TAB 1: OVERVIEW ======================= */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-blue-50/80 border border-blue-100 p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-blue-900 text-xs font-bold uppercase tracking-wider">
                    <span>Total Products</span>
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-blue-950 mt-1.5 font-display">
                    {products.length}
                  </div>
                  <div className="text-[11px] text-blue-700 mt-1 flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{inStockCount} active in catalog</span>
                  </div>
                </div>

                <div className="bg-emerald-50/80 border border-emerald-100 p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-emerald-900 text-xs font-bold uppercase tracking-wider">
                    <span>Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-950 mt-1.5 font-display">
                    {orders.length}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-1">
                    Revenue: <strong>{currencySymbol}{(totalRevenue * currencyRate).toFixed(2)}</strong>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  lowStockProducts.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between text-amber-900 text-xs font-bold uppercase tracking-wider">
                    <span>Low Stock Products</span>
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-amber-950 mt-1.5 font-display">
                    {lowStockProducts.length}
                  </div>
                  <div className="text-[11px] text-amber-700 mt-1">
                    {lowStockProducts.length > 0 ? 'Inventory ≤ 5 units' : 'All stock levels healthy'}
                  </div>
                </div>

                <div className="bg-rose-50/80 border border-rose-100 p-4 rounded-2xl">
                  <div className="flex items-center justify-between text-rose-900 text-xs font-bold uppercase tracking-wider">
                    <span>Pending Dispatch</span>
                    <Clock className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-rose-950 mt-1.5 font-display">
                    {pendingOrders.length}
                  </div>
                  <div className="text-[11px] text-rose-700 mt-1">
                    {pendingOrders.length > 0 ? 'Awaiting courier packing' : 'Zero fulfillment backlog'}
                  </div>
                </div>
              </div>

              {/* Low Stock Alert Strip if any */}
              {lowStockProducts.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-extrabold text-amber-950">
                        Attention Required: {lowStockProducts.length} Products Running Out of Stock
                      </h4>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        Items with 5 or fewer units are highlighted. Reorder soon to prevent missed sales.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('inventory');
                      setStockFilter('low-stock');
                    }}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
                  >
                    View Low Stock List
                  </button>
                </div>
              )}

              {/* Recent Orders Overview */}
              <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-extrabold text-blue-950 font-display">Recent Customer Orders</h3>
                    <p className="text-xs text-slate-500">Latest orders placed across Pakistan via Cash on Delivery</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Orders</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                        <th className="p-3 font-bold">Order ID</th>
                        <th className="p-3 font-bold">Customer</th>
                        <th className="p-3 font-bold">City</th>
                        <th className="p-3 font-bold">Items</th>
                        <th className="p-3 font-bold">Total</th>
                        <th className="p-3 font-bold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="p-3 font-mono font-bold text-blue-950">{order.id}</td>
                          <td className="p-3 font-medium text-slate-800">{order.customerName}</td>
                          <td className="p-3 text-slate-600">{order.city}</td>
                          <td className="p-3 text-slate-600">{order.items.reduce((acc, i) => acc + i.quantity, 0)} items</td>
                          <td className="p-3 font-bold text-blue-950">
                            {currencySymbol}{(order.total * currencyRate).toFixed(2)}
                          </td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'confirmed' ? 'bg-indigo-100 text-indigo-800' :
                              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 2: PRODUCT MANAGEMENT ======================= */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search product title, ID, category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950 outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="boys-collection">Boys Collection</option>
                    <option value="girls-collection">Girls Collection</option>
                    <option value="new-arrivals">New Arrivals</option>
                    <option value="denim-collection">Denim Collection</option>
                    <option value="party-wear">Party Wear</option>
                    <option value="casual-wear">Casual Wear</option>
                  </select>

                  <button
                    onClick={handleOpenAddProduct}
                    className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New Product</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="p-3">Product</th>
                        <th className="p-3">Category</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Stock Units</th>
                        <th className="p-3">Sizes</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => {
                        const isLow = p.stockQuantity <= 5 && p.stockQuantity > 0;
                        const isOut = !p.inStock || p.stockQuantity === 0;

                        return (
                          <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                  <ProductImage src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="max-w-xs">
                                  <span className="font-extrabold text-blue-950 block line-clamp-1">{p.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                                  {p.originalPrice && (
                                    <span className="text-[10px] text-red-600 font-bold block">
                                      Sale (-{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%)
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[11px]">
                                {p.categoryLabel}
                              </span>
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <div className="font-extrabold text-blue-950">
                                {currencySymbol}{(p.price * currencyRate).toFixed(2)}
                              </div>
                              {p.originalPrice && (
                                <div className="text-[10px] text-slate-400 line-through">
                                  {currencySymbol}{(p.originalPrice * currencyRate).toFixed(2)}
                                </div>
                              )}
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded-full font-extrabold text-[11px] ${
                                  isOut ? 'bg-red-100 text-red-800' :
                                  isLow ? 'bg-amber-100 text-amber-900 font-black' :
                                  'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {p.stockQuantity} units
                                </span>
                                {isLow && (
                                  <span className="text-[10px] font-extrabold text-amber-600 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                                    LOW
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="p-3">
                              <div className="flex flex-wrap gap-1 max-w-[140px]">
                                {p.availableSizes?.slice(0, 3).map((s) => (
                                  <span key={s} className="bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded text-[10px]">
                                    {s.replace(' Years', 'Y')}
                                  </span>
                                ))}
                                {p.availableSizes && p.availableSizes.length > 3 && (
                                  <span className="text-[10px] text-slate-400">+{p.availableSizes.length - 3}</span>
                                )}
                              </div>
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <button
                                onClick={() => onToggleProductStock(p.id)}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                  p.inStock && p.stockQuantity > 0
                                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                                    : 'bg-red-100 hover:bg-red-200 text-red-800'
                                }`}
                              >
                                {p.inStock && p.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                              </button>
                            </td>

                            <td className="p-3 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => handleOpenEditProduct(p)}
                                  className="p-1.5 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Product"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setProductToDelete(p)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredProducts.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-xs">
                    No products matched your search or category filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================= TAB 3: INVENTORY & STOCK ALERTS ======================= */}
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              {/* Alert Bar */}
              {lowStockProducts.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs flex-1">
                    <strong className="text-amber-950 font-bold block text-sm">
                      ⚠️ Low Inventory Alert: {lowStockProducts.length} items have ≤ 5 units left
                    </strong>
                    <p className="text-amber-800 mt-0.5">
                      Use the quick restock action buttons (+5, +10) below to update stock instantly.
                    </p>
                  </div>
                </div>
              )}

              {/* Filter buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setStockFilter('all')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                      stockFilter === 'all' ? 'bg-blue-950 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All Items ({products.length})
                  </button>
                  <button
                    onClick={() => setStockFilter('low-stock')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      stockFilter === 'low-stock' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Low Stock (≤ 5)</span>
                    <span className="bg-amber-900/30 text-white px-1.5 rounded-full text-[10px]">
                      {lowStockProducts.length}
                    </span>
                  </button>
                  <button
                    onClick={() => setStockFilter('out-of-stock')}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-colors cursor-pointer ${
                      stockFilter === 'out-of-stock' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    Out of Stock ({outOfStockProducts.length})
                  </button>
                </div>
              </div>

              {/* Inventory Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                        <th className="p-3">Product</th>
                        <th className="p-3">Current Stock</th>
                        <th className="p-3">Quick Restock Actions</th>
                        <th className="p-3">Stock State</th>
                        <th className="p-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => {
                        const isLow = p.stockQuantity <= 5 && p.stockQuantity > 0;
                        const isOut = !p.inStock || p.stockQuantity === 0;

                        return (
                          <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                  <ProductImage src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <span className="font-bold text-blue-950 block">{p.name}</span>
                                  <span className="text-[10px] text-slate-400">{p.categoryLabel}</span>
                                </div>
                              </div>
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <input
                                  type="number"
                                  min="0"
                                  value={p.stockQuantity}
                                  onChange={(e) => {
                                    const val = parseInt(e.target.value, 10);
                                    if (!isNaN(val)) onUpdateProductStockQuantity(p.id, Math.max(0, val));
                                  }}
                                  className="w-16 px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-blue-950 text-center"
                                />
                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                  isOut ? 'bg-red-100 text-red-800' :
                                  isLow ? 'bg-amber-100 text-amber-900' :
                                  'bg-emerald-100 text-emerald-800'
                                }`}>
                                  {isOut ? 'DEPLETED' : isLow ? 'LOW' : 'OK'}
                                </span>
                              </div>
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => onUpdateProductStockQuantity(p.id, p.stockQuantity + 5)}
                                  className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg font-bold text-xs cursor-pointer"
                                  title="Add 5 units to stock"
                                >
                                  +5 Units
                                </button>
                                <button
                                  onClick={() => onUpdateProductStockQuantity(p.id, p.stockQuantity + 10)}
                                  className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-lg font-bold text-xs cursor-pointer"
                                  title="Add 10 units to stock"
                                >
                                  +10 Units
                                </button>
                                <button
                                  onClick={() => onUpdateProductStockQuantity(p.id, Math.max(0, p.stockQuantity - 1))}
                                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs cursor-pointer"
                                  title="Subtract 1 unit"
                                >
                                  -1
                                </button>
                              </div>
                            </td>

                            <td className="p-3 whitespace-nowrap">
                              <button
                                onClick={() => onToggleProductStock(p.id)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                                  p.inStock && p.stockQuantity > 0
                                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                }`}
                              >
                                {p.inStock && p.stockQuantity > 0 ? 'Active in Store' : 'Marked Out of Stock'}
                              </button>
                            </td>

                            <td className="p-3 text-right whitespace-nowrap">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="px-2.5 py-1 text-xs font-bold text-blue-900 hover:bg-blue-50 rounded-lg cursor-pointer"
                              >
                                Full Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================= TAB 4: ORDER MANAGEMENT ======================= */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {/* Order Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Order ID, Customer Name, Phone, City..."
                    value={orderSearchTerm}
                    onChange={(e) => setOrderSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950 outline-hidden"
                  />
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {(['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer whitespace-nowrap ${
                        orderStatusFilter === st
                          ? 'bg-blue-950 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-3">
                {filteredOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-white hover:border-blue-300 transition-colors shadow-2xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-blue-950 text-sm sm:text-base font-display">
                            Order #{order.id}
                          </span>
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            order.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'confirmed' ? 'bg-indigo-100 text-indigo-800' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {order.status}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">
                            • {order.date}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span>Customer: <strong>{order.customerName}</strong></span>
                          <span>Phone: <strong>{order.customerPhone}</strong></span>
                          <span>Address: <strong>{order.address}, {order.city}</strong></span>
                        </div>
                      </div>

                      {/* Status Selector & WhatsApp Contact */}
                      <div className="flex items-center gap-2">
                        <a
                          href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(order.customerName)},%20Mani%20Minars%20Kids%20Wear%20here%20regarding%20Order%20%23${order.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Contact customer on WhatsApp"
                        >
                          <Phone className="w-3 h-3" />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>

                        <select
                          value={order.status}
                          onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="text-xs font-bold border border-slate-200 rounded-xl p-2 bg-slate-50 cursor-pointer text-slate-800"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Order Items Listing */}
                    <div className="pt-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                            <div className="w-8 h-10 rounded-md overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <ProductImage src={it.image} alt={it.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <span className="font-bold text-blue-950">{it.quantity}x {it.name}</span>
                              <span className="text-[11px] text-slate-500 block">
                                Size: {it.size} • Color: {it.color} • {currencySymbol}{(it.price * currencyRate).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="md:text-right border-t md:border-t-0 pt-2 md:pt-0 border-slate-100 shrink-0">
                        <div className="text-[11px] text-slate-400">Total Charged (Cash on Delivery)</div>
                        <div className="text-lg font-black text-blue-950 font-display">
                          {currencySymbol}{(order.total * currencyRate).toFixed(2)}
                        </div>
                        {order.trackingNumber && (
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Tracking: <strong className="font-mono">{order.trackingNumber}</strong>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-xs text-slate-500">
                    No customer orders found matching this filter.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================= TAB 5: SETTINGS ======================= */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Change Password Card */}
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-blue-950">Update Admin Password</h3>
                    <p className="text-xs text-slate-500">Change your secure password for accessing this dashboard</p>
                  </div>
                </div>

                {passwordChangeSuccess && (
                  <div className="my-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Admin password has been securely updated!</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="Enter at least 6 characters"
                      value={newPasswordInput}
                      onChange={(e) => setNewPasswordInput(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Save New Password
                  </button>
                </form>
              </div>

              {/* Data Export & Backup */}
              <div className="p-6 bg-white border border-slate-200 rounded-3xl shadow-xs">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-900 flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-blue-950">Export Catalog & Backup</h3>
                    <p className="text-xs text-slate-500">Download store catalog JSON for safekeeping and offline backup</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={handleExportCatalog}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Catalog JSON</span>
                  </button>

                  {onResetDefaultCatalog && (
                    <button
                      onClick={() => {
                        if (window.confirm('Reset store catalog back to default sample items?')) {
                          onResetDefaultCatalog();
                        }
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to Factory Defaults</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ======================= ADD / EDIT PRODUCT MODAL ======================= */}
        {isFormOpen && (
          <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
            <div 
              className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] font-black uppercase text-red-600 tracking-wider bg-red-50 px-2 py-0.5 rounded">
                  {editingProduct ? 'Edit Existing Product' : 'Add New Catalog Item'}
                </span>
                <h3 className="text-xl font-extrabold text-blue-950 font-display mt-1">
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'Create New Kids Wear Product'}
                </h3>
              </div>

              <form onSubmit={handleSubmitProductForm} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Boys Pique Polo & Stretch Chino Set"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950 outline-hidden"
                  />
                </div>

                {/* Category & Stock */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Store Category *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white cursor-pointer"
                    >
                      <option value="boys-collection">Boys Collection</option>
                      <option value="girls-collection">Girls Collection</option>
                      <option value="new-arrivals">New Arrivals</option>
                      <option value="denim-collection">Denim Collection</option>
                      <option value="party-wear">Party Wear</option>
                      <option value="casual-wear">Casual Wear</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Stock Quantity (Units) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formStock}
                      onChange={(e) => setFormStock(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950 outline-hidden"
                    />
                  </div>
                </div>

                {/* Price & Discount */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Selling Price ($ USD) *</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      min="0.5"
                      value={formPrice}
                      onChange={(e) => setFormPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950 outline-hidden"
                    />
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      Displays as: {currencySymbol}{((parseFloat(formPrice) || 0) * currencyRate).toFixed(2)}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Discount / Original Price ($ USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Optional crossed-out price"
                      value={formOriginalPrice}
                      onChange={(e) => setFormOriginalPrice(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950 outline-hidden"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Description</label>
                  <textarea
                    rows={3}
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Provide details on fabric, comfort, and wearability..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-950 outline-hidden"
                  />
                </div>

                {/* Image Upload System (Multiple Images, Preview, Primary Star, File Upload) */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-900 block">Product Gallery & Image Upload</label>
                      <p className="text-[11px] text-slate-500">Upload multiple photos or enter URLs. Click the star to select primary cover image.</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Files</span>
                    </button>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Add URL Input */}
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="Paste image URL (Unsplash or web link)..."
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                    />
                    <button
                      type="button"
                      onClick={handleAddImageUrl}
                      className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Add URL
                    </button>
                  </div>

                  {/* Images Preview Grid */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pt-1">
                    {formImages.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-white group ${
                          idx === 0 ? 'border-red-600 ring-2 ring-red-100' : 'border-slate-200'
                        }`}
                      >
                        <ProductImage src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        
                        {/* Primary Badge */}
                        {idx === 0 && (
                          <span className="absolute top-1 left-1 bg-red-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                            Cover
                          </span>
                        )}

                        {/* Hover controls */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetPrimaryImage(idx)}
                              className="p-1 bg-white text-amber-500 rounded-full hover:scale-110 transition-transform cursor-pointer"
                              title="Make Cover Image"
                            >
                              <Star className="w-3.5 h-3.5 fill-amber-500" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1 bg-white text-red-600 rounded-full hover:scale-110 transition-transform cursor-pointer"
                            title="Remove Image"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes Selector */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">Available Age Sizes *</label>
                    <div className="flex gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setFormSizes([...ALL_SIZES])}
                        className="text-blue-900 font-bold hover:underline cursor-pointer"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormSizes([])}
                        className="text-slate-400 hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                    {ALL_SIZES.map((size) => {
                      const isSelected = formSizes.includes(size);
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleToggleSize(size)}
                          className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all border cursor-pointer ${
                            isSelected
                              ? 'bg-blue-950 text-white border-blue-950 shadow-2xs'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Colors Manager */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Color Options</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formColors.map((c, idx) => (
                      <span 
                        key={idx}
                        className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2 py-1 rounded-xl text-xs font-semibold text-slate-800"
                      >
                        <span className="w-3 h-3 rounded-full border border-black/20" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(idx)}
                          className="text-slate-400 hover:text-red-600 ml-1 cursor-pointer"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Color name (e.g. Sage Green)"
                      value={newColorName}
                      onChange={(e) => setNewColorName(e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                    <input
                      type="color"
                      value={newColorHex}
                      onChange={(e) => setNewColorHex(e.target.value)}
                      className="w-10 h-8 p-0 border border-slate-200 rounded-xl cursor-pointer"
                      title="Select color hex"
                    />
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="px-3 py-1.5 bg-blue-950 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Add Color
                    </button>
                  </div>
                </div>

                {/* Elastic Waistband toggle */}
                <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={formElasticWaist}
                    onChange={(e) => setFormElasticWaist(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span>Includes Room-to-Grow Elastic Waistband</span>
                </label>

                {/* Submit & Cancel */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-60"
                  >
                    {formSubmitting ? (
                      <span className="inline-block animate-spin w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{editingProduct ? 'Save Product Changes' : 'Publish Product to Store'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================= DELETE CONFIRMATION MODAL ======================= */}
        {productToDelete && (
          <div className="fixed inset-0 z-70 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div 
              className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 mx-auto flex items-center justify-center mb-3">
                <Trash2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-extrabold text-blue-950 font-display">
                Delete Product?
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Are you sure you want to remove <strong>"{productToDelete.name}"</strong>? It will immediately be removed from the public website catalog.
              </p>
              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => setProductToDelete(null)}
                  className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
