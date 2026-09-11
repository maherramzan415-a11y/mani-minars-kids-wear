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
  ChevronRight
} from 'lucide-react';
import { Product, AgeSize } from '../types';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  currencySymbol: string;
  currencyRate: number;
  onAddToCart: (product: Product, size: AgeSize, color: string, qty: number) => void;
  onOpenWhatsAppOrder: (product: Product, size: AgeSize) => void;
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

  const [selectedSize, setSelectedSize] = useState<AgeSize>(product.availableSizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-auto border border-slate-100 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-slate-100 text-slate-700 p-2 rounded-full shadow-md transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
          {/* Images Section */}
          <div className="p-6 bg-slate-50 flex flex-col justify-between">
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-xs">
              <img
                src={product.images[activeImageIdx] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.elasticWaistband && (
                <div className="absolute bottom-3 left-3 bg-blue-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Elastic Waistband with Drawstring</span>
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImageIdx === idx 
                        ? 'border-red-600 ring-2 ring-red-600/30' 
                        : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewCount} parent reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 mt-2 font-display">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl font-black text-blue-950">
                  {currencySymbol}{price}
                </span>
                {originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    {currencySymbol}{originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Free Shipping Included
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Highlights */}
              <div className="mt-4 space-y-1.5 bg-blue-50/60 p-3 rounded-xl border border-blue-100">
                <div className="text-[11px] font-bold uppercase text-blue-900 tracking-wider">
                  Key Quality Highlights:
                </div>
                {product.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Color Selection */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Selected Color:</span>
                  <span className="text-blue-900 font-bold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-blue-900 bg-blue-50 text-blue-900 ring-1 ring-blue-900'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection with all 10 sizes */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700">
                    Child's Age / Size: <strong className="text-red-600">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={onOpenSizeGuide}
                    className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1 underline text-[11px] cursor-pointer"
                  >
                    <Ruler className="w-3 h-3" />
                    Size & Growth Guide
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
                            ? 'bg-red-600 text-white border-red-600 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
                        }`}
                      >
                        {size.replace(' Years', 'Y')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fabric & Care Specs */}
              <div className="mt-4 text-[11px] text-slate-500 space-y-0.5 border-t border-slate-100 pt-3">
                <div><strong>Fabric:</strong> {product.fabric}</div>
                <div><strong>Care:</strong> {product.careInstructions}</div>
              </div>
            </div>

            {/* Actions: Add to Cart & WhatsApp Order */}
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
                  disabled={!product.inStock}
                  className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isAdded
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
                onClick={() => onOpenWhatsAppOrder(product, selectedSize)}
                className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Quick WhatsApp Order with Stylist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
