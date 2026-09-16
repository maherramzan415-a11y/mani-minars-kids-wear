import React, { useState } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  MessageCircle, 
  ShieldCheck, 
  Ruler, 
  Truck, 
  Sparkles,
  Info,
  Layers,
  Sparkle
} from 'lucide-react';
import { Product, AgeSize, WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../types';
import { ProductImage } from './ProductImage';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  currencySymbol: string;
  currencyRate: number;
  onAddToCart: (product: Product, size: AgeSize, color: string, qty: number) => void;
  onOpenWhatsAppOrder: (product: Product, size: AgeSize, color: string) => void;
  onOpenSizeGuide: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  currencySymbol,
  currencyRate,
  onAddToCart,
  onOpenWhatsAppOrder,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<AgeSize>(product.availableSizes[1] || '2-3 Years');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'size-chart' | 'fabric' | 'care'>('overview');

  const price = (product.price * currencyRate).toFixed(2);
  const originalPrice = product.originalPrice ? (product.originalPrice * currencyRate).toFixed(2) : null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-auto border border-slate-100 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-slate-100 text-slate-700 p-2 rounded-full shadow-md transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Left Images Section */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between">
            <div>
              <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs">
                <ProductImage
                  src={product.images[activeImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                {product.elasticWaistband && (
                  <div className="absolute bottom-3 left-3 bg-blue-950 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5 z-10">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Room-to-Grow Elastic Waistband</span>
                  </div>
                )}
                {product.stockQuantity <= 5 && product.stockQuantity > 0 && (
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded shadow-sm z-10">
                    Only {product.stockQuantity} Left!
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        activeImageIdx === idx ? 'border-red-600 ring-2 ring-red-100' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <ProductImage src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Trust Assurances */}
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero-Itch Guarantee: Pure combed cotton & hypoallergenic dyes</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Truck className="w-4 h-4 text-blue-900 shrink-0" />
                <span>Free 2-3 Day Express Shipping with Cash on Delivery (COD)</span>
              </div>
            </div>
          </div>

          {/* Right Product Details & Tabs */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} parent reviews)</span>
                </div>
              </div>

              {/* Name */}
              <h2 className="text-xl sm:text-2xl font-black text-blue-950 font-display mt-1">
                {product.name}
              </h2>

              {/* Price & Savings */}
              <div className="flex items-center gap-2.5 mt-2">
                <span className="text-2xl font-black text-blue-950">
                  {currencySymbol}{price}
                </span>
                {originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {currencySymbol}{originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Free Shipping Nationwide
                </span>
              </div>

              {/* Interactive Detail Tabs (Requirement 9) */}
              <div className="flex border-b border-slate-200 mt-4 text-xs font-bold">
                <button
                  onClick={() => setActiveDetailTab('overview')}
                  className={`pb-2 px-2 border-b-2 transition-all cursor-pointer ${
                    activeDetailTab === 'overview'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Overview & Highlights
                </button>
                <button
                  onClick={() => setActiveDetailTab('size-chart')}
                  className={`pb-2 px-2 border-b-2 transition-all cursor-pointer ${
                    activeDetailTab === 'size-chart'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Size Guide (1-12Y)
                </button>
                <button
                  onClick={() => setActiveDetailTab('fabric')}
                  className={`pb-2 px-2 border-b-2 transition-all cursor-pointer ${
                    activeDetailTab === 'fabric'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Fabric & Skin-Safety
                </button>
                <button
                  onClick={() => setActiveDetailTab('care')}
                  className={`pb-2 px-2 border-b-2 transition-all cursor-pointer ${
                    activeDetailTab === 'care'
                      ? 'border-red-600 text-red-600'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Care Instructions
                </button>
              </div>

              {/* Tab 1: Overview */}
              {activeDetailTab === 'overview' && (
                <div className="pt-3 space-y-3 text-xs leading-relaxed text-slate-600">
                  <p>{product.description}</p>
                  <div className="space-y-1 bg-blue-50/70 p-3 rounded-xl border border-blue-100">
                    <div className="text-[11px] font-bold uppercase text-blue-950 tracking-wider">
                      Key Highlights:
                    </div>
                    {product.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: Size Guide Table */}
              {activeDetailTab === 'size-chart' && (
                <div className="pt-3 space-y-2 text-xs">
                  <p className="text-slate-600">
                    Tailored with room-to-grow elastic stretch for active children:
                  </p>
                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-100 text-slate-700 font-bold">
                        <tr>
                          <th className="p-2">Age / Size</th>
                          <th className="p-2">Chest (Inches)</th>
                          <th className="p-2">Waist (Elastic)</th>
                          <th className="p-2">Child Height</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-600">
                        <tr><td className="p-2 font-bold text-blue-950">1-2 Years</td><td className="p-2">20 - 21"</td><td className="p-2">18 - 20"</td><td className="p-2">80 - 92 cm</td></tr>
                        <tr><td className="p-2 font-bold text-blue-950">2-3 Years</td><td className="p-2">21 - 22"</td><td className="p-2">19 - 21"</td><td className="p-2">92 - 98 cm</td></tr>
                        <tr><td className="p-2 font-bold text-blue-950">3-4 Years</td><td className="p-2">22 - 23"</td><td className="p-2">20 - 22"</td><td className="p-2">98 - 104 cm</td></tr>
                        <tr><td className="p-2 font-bold text-blue-950">5-6 Years</td><td className="p-2">24 - 25"</td><td className="p-2">22 - 24"</td><td className="p-2">110 - 116 cm</td></tr>
                        <tr><td className="p-2 font-bold text-blue-950">7-8 Years</td><td className="p-2">26 - 27"</td><td className="p-2">23 - 25"</td><td className="p-2">122 - 128 cm</td></tr>
                        <tr><td className="p-2 font-bold text-blue-950">9-10 Years</td><td className="p-2">28 - 29"</td><td className="p-2">25 - 27"</td><td className="p-2">134 - 140 cm</td></tr>
                        <tr><td className="p-2 font-bold text-blue-950">11-12 Years</td><td className="p-2">30 - 32"</td><td className="p-2">26 - 28"</td><td className="p-2">146 - 152 cm</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Tab 3: Fabric Details */}
              {activeDetailTab === 'fabric' && (
                <div className="pt-3 space-y-2 text-xs text-slate-600">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-medium">
                    <strong>Fabric Composition:</strong> {product.fabric}
                  </div>
                  <ul className="list-disc pl-4 space-y-1 pt-1">
                    <li>100% Pre-washed to prevent shrinking after laundering.</li>
                    <li>OEKOTEX certified skin-safe dyes with zero formaldehyde or heavy metals.</li>
                    <li>Ultra-soft hand feel that stays supple wash after wash.</li>
                  </ul>
                </div>
              )}

              {/* Tab 4: Care Instructions */}
              {activeDetailTab === 'care' && (
                <div className="pt-3 space-y-2 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800">
                    <strong>Washing Directions:</strong> {product.careInstructions}
                  </div>
                  <ul className="list-disc pl-4 space-y-1 pt-1">
                    <li>Machine wash warm or cold inside-out with like colors.</li>
                    <li>Use mild baby-friendly laundry detergent.</li>
                    <li>Tumble dry gentle low or line dry in shade for best garment longevity.</li>
                  </ul>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Color: <strong className="text-blue-950">{selectedColor}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          selectedColor === c.name
                            ? 'border-blue-950 bg-blue-50 text-blue-950 ring-1 ring-blue-950'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">
                    Select Age / Size: <strong className="text-red-600">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setActiveDetailTab('size-chart')}
                    className="text-blue-900 hover:text-red-600 font-bold flex items-center gap-1 underline text-[11px] cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>View Measurements</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-1.5">
                  {product.availableSizes.map((size) => {
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-1.5 px-1 text-xs font-bold rounded-lg border transition-all text-center cursor-pointer ${
                          isSelected
                            ? 'bg-blue-950 text-white border-blue-950 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                        }`}
                      >
                        {size.replace(' Years', 'Y')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions: Quantity, Bag, WhatsApp */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-700 hover:bg-slate-200 font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-extrabold text-blue-950">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-700 hover:bg-slate-200 font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || product.stockQuantity === 0}
                  className={`flex-1 min-h-[44px] py-2.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    !product.inStock || product.stockQuantity === 0
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Shopping Bag</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Order */}
              <button
                onClick={() => onOpenWhatsAppOrder(product, selectedSize, selectedColor)}
                className="w-full min-h-[44px] py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-extrabold transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-98 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Order on WhatsApp ({WHATSAPP_DISPLAY})</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
