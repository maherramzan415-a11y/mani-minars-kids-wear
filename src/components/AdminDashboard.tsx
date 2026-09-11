import React, { useState } from 'react';
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
  Edit2
} from 'lucide-react';
import { Product, Order, AgeSize, ALL_SIZES, ProductCategory } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, newStatus: Order['status']) => void;
  onToggleProductStock: (productId: string) => void;
  onAddNewProduct: (product: Product) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onUpdateOrderStatus,
  onToggleProductStock,
  onAddNewProduct,
  currencySymbol,
  currencyRate,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'add-product'>('orders');

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Product['category']>('denim-cargo');
  const [newPrice, setNewPrice] = useState('25.99');
  const [newOriginalPrice, setNewOriginalPrice] = useState('34.99');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80');
  const [newDesc, setNewDesc] = useState('Comfortable everyday playwear with soft fabric and durable stitching for growing children.');
  const [hasElasticWaist, setHasElasticWaist] = useState(true);
  const [productSaved, setProductSaved] = useState(false);

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const inStockCount = products.filter((p) => p.inStock).length;
  const pendingShipment = orders.filter((o) => o.status !== 'delivered').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const categoryLabels: Record<string, string> = {
      'denim-cargo': 'Denim Cargo Shorts',
      'cotton-shirts': 'Casual Cotton Shirts',
      'boys-fashion': 'Boys Fashion Wear',
      'trendy-outfits': "Trendy Children's Outfits",
    };

    const created: Product = {
      id: `mm-${Date.now().toString().slice(-4)}`,
      name: newTitle.trim(),
      category: newCategory,
      categoryLabel: categoryLabels[newCategory] || 'Kids Wear',
      price: parseFloat(newPrice) || 24.99,
      originalPrice: newOriginalPrice ? parseFloat(newOriginalPrice) : undefined,
      rating: 5.0,
      reviewCount: 1,
      images: [newImage.trim()],
      description: newDesc.trim(),
      highlights: [
        '100% Breathable Combed Cotton',
        'Reinforced play-proof stitching',
        'Adaptive elastic waistband comfort'
      ],
      fabric: '100% Pure Combed Cotton with Stretch',
      careInstructions: 'Machine wash cold, tumble dry low.',
      availableSizes: [...ALL_SIZES],
      colors: [
        { name: 'Navy Blue', hex: '#1E3A8A' },
        { name: 'Classic Crimson', hex: '#DC2626' }
      ],
      isNewArrival: true,
      isBestSeller: false,
      inStock: true,
      elasticWaistband: hasElasticWaist
    };

    onAddNewProduct(created);
    setProductSaved(true);
    setTimeout(() => {
      setProductSaved(false);
      setActiveTab('inventory');
      setNewTitle('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-950 text-white flex items-center justify-center font-bold">
                <Sliders className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-blue-950 font-display">
                  Mani Minars Store Manager
                </h2>
                <p className="text-xs text-slate-500">
                  Manage inventory, update customer deliveries, and inspect sales metrics.
                </p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'orders' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'inventory' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Inventory ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('add-product')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'add-product' ? 'bg-white text-blue-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                <Plus className="w-3 h-3" />
                Add Style
              </button>
            </div>
          </div>

          {/* KPI Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Total Revenue</div>
              <div className="text-lg font-black text-blue-950 mt-1 font-mono">
                {currencySymbol}{(totalRevenue * currencyRate).toFixed(2)}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Total Orders</div>
              <div className="text-lg font-black text-blue-950 mt-1 font-mono">
                {totalOrders}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase">In-Stock SKUs</div>
              <div className="text-lg font-black text-emerald-700 mt-1 font-mono">
                {inStockCount} / {products.length}
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="text-[11px] font-bold text-slate-500 uppercase">Pending Delivery</div>
              <div className="text-lg font-black text-amber-600 mt-1 font-mono">
                {pendingShipment}
              </div>
            </div>
          </div>

          {/* TAB 1: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display flex items-center justify-between">
                <span>Recent Customer Orders</span>
                <span className="text-xs text-slate-400 font-normal">Update status to notify tracking page</span>
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer & Address</th>
                      <th className="p-3">Items & Sizes</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Payment</th>
                      <th className="p-3">Fulfillment Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-mono font-bold text-blue-950">
                          {order.id}
                          <div className="text-[10px] text-slate-400 font-normal">{order.date}</div>
                        </td>
                        <td className="p-3 text-slate-700">
                          <div className="font-bold text-slate-900">{order.customerName}</div>
                          <div className="text-[11px] text-slate-500">{order.city} • {order.customerPhone}</div>
                        </td>
                        <td className="p-3 text-slate-600">
                          <div className="space-y-0.5">
                            {order.items.map((it, idx) => (
                              <div key={idx} className="text-[11px]">
                                {it.quantity}x {it.name} <span className="font-bold text-red-600">({it.size})</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-3 font-extrabold text-blue-950 font-mono">
                          {currencySymbol}{(order.total * currencyRate).toFixed(2)}
                        </td>
                        <td className="p-3">
                          <span className="uppercase text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={order.status}
                            onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                            className="bg-white border border-slate-300 rounded-lg py-1 px-2 text-xs font-bold text-slate-800 focus:ring-1 focus:ring-blue-900 cursor-pointer"
                          >
                            <option value="confirmed">Confirmed</option>
                            <option value="packed">Packed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Catalog & Stock Controls
              </h3>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                      <th className="p-3">Item</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Sizes Available</th>
                      <th className="p-3">Elastic Waist</th>
                      <th className="p-3">Stock Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 flex items-center gap-2">
                          <img src={p.images[0]} alt={p.name} className="w-9 h-11 object-cover rounded-md bg-slate-100" />
                          <div>
                            <span className="font-bold text-blue-950 block line-clamp-1">{p.name}</span>
                            <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                          </div>
                        </td>
                        <td className="p-3 text-slate-600 font-medium">{p.categoryLabel}</td>
                        <td className="p-3 font-bold text-slate-900">
                          {currencySymbol}{(p.price * currencyRate).toFixed(2)}
                        </td>
                        <td className="p-3 text-slate-500">
                          {p.availableSizes.length} sizes (1-12Y)
                        </td>
                        <td className="p-3">
                          {p.elasticWaistband ? (
                            <span className="text-emerald-700 font-bold">✓ Yes</span>
                          ) : (
                            <span className="text-slate-400">Regular</span>
                          )}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => onToggleProductStock(p.id)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              p.inStock 
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Out of Stock'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ADD NEW PRODUCT FORM */}
          {activeTab === 'add-product' && (
            <form onSubmit={handleCreateProduct} className="space-y-4 max-w-xl mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 className="text-base font-bold text-blue-950 font-display flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-red-600" />
                Add New Kids Wear Product
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Vintage Washed Denim Cargo Shorts"
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-medium focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-medium"
                  >
                    <option value="denim-cargo">Kids Denim Cargo Shorts</option>
                    <option value="cotton-shirts">Kids Casual Cotton Shirts</option>
                    <option value="boys-fashion">Boys Fashion Wear</option>
                    <option value="trendy-outfits">Trendy Children's Outfits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price (USD $)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-medium"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-slate-300 rounded-xl py-2 px-3 text-xs font-medium"
                />
              </div>

              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  id="elasticCheck"
                  checked={hasElasticWaist}
                  onChange={(e) => setHasElasticWaist(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="elasticCheck" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Includes Comfort Elastic Waistband (Adaptive Fit for Growing Kids)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {productSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Item Added to Catalogue!</span>
                  </>
                ) : (
                  <span>Publish Style to Store</span>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>Live Demo Backoffice • Realtime Store State</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};
