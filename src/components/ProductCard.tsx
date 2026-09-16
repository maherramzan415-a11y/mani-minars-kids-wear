import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  ShoppingBag, 
  Star, 
  Check, 
  MessageCircle, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Product, AgeSize, WHATSAPP_NUMBER } from '../types';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  currencySymbol: string;
  currencyRate: number;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: AgeSize, color: string) => void;
  onOpenWhatsAppOrder: (product: Product, size: AgeSize, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencySymbol,
  currencyRate,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onOpenWhatsAppOrder,
}) => {
  const [selectedSize, setSelectedSize] = useState<AgeSize>(product.availableSizes[1] || '2-3 Years');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [isAdded, setIsAdded] = useState(false);
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  const convertedPrice = (product.price * currencyRate).toFixed(2);
  const convertedOriginal = product.originalPrice 
    ? (product.originalPrice * currencyRate).toFixed(2) 
    : null;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWhatsAppClick = () => {
    onOpenWhatsAppOrder(product, selectedSize, selectedColor);
  };

  return (
    <div 
      id={`product-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* 1. Large Product Image Showcase */}
      <div className="relative aspect-4/5 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onQuickView(product)}>
        <ProductImage
          src={product.images[currentImgIdx] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700"
          loading="lazy"
        />

        {/* Gradient vignette on image bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none z-10">
          {/* Discount Badge */}
          {product.originalPrice && (
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow-md tracking-wider">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}

          {/* Age Range Badge */}
          <span className="bg-blue-950/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
            Ages 1-12Y
          </span>

          {product.isBestSeller && (
            <span className="bg-amber-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm tracking-wider">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-emerald-700 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-sm tracking-wider">
              New Arrival
            </span>
          )}
          {product.elasticWaistband && (
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Elastic Waist
            </span>
          )}
        </div>

        {/* Top Right Floating Actions: Wishlist & Quick View */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-md cursor-pointer ${
              isWishlisted
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-white/95 text-slate-700 hover:text-red-600 hover:bg-white'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-9 h-9 bg-white/95 text-slate-700 hover:text-blue-900 hover:bg-white rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-md cursor-pointer"
            title="Quick View Details"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Indicator Dots if multiple photos */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-auto z-10">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentImgIdx === idx 
                    ? 'bg-red-600 w-5' 
                    : 'bg-white/80 w-1.5 hover:bg-white'
                }`}
                aria-label={`Switch photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Product Details & Controls */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category Tag & Star Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-red-600 font-bold uppercase tracking-wider text-[10px]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs">{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-sm text-blue-950 hover:text-red-600 cursor-pointer transition-colors line-clamp-1 font-display"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Price & Savings */}
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="text-lg font-black text-blue-950">
              {currencySymbol}{convertedPrice}
            </span>
            {convertedOriginal && (
              <span className="text-xs text-slate-400 line-through">
                {currencySymbol}{convertedOriginal}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-[10px] font-extrabold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Stock Availability Indicator */}
          <div className="mt-2 flex items-center justify-between text-[11px]">
            {product.inStock && product.stockQuantity > 5 ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                In Stock (Ready to Ship)
              </span>
            ) : product.inStock && product.stockQuantity > 0 ? (
              <span className="text-amber-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Only {product.stockQuantity} Left in Stock!
              </span>
            ) : (
              <span className="text-red-600 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                Out of Stock
              </span>
            )}
            <span className="text-[10px] text-slate-400">100% Cotton</span>
          </div>

          {/* Color Selection (if available) */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-3 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-medium">
                Color: <strong className="text-slate-800 font-semibold">{selectedColor}</strong>
              </span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                      selectedColor === c.name 
                        ? 'ring-2 ring-blue-900 ring-offset-1 scale-110 shadow-xs' 
                        : 'border-slate-300 hover:scale-105 opacity-80'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                    aria-label={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection (1-12 Years) */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-slate-600 font-medium">Select Size (1-12Y):</span>
              <span className="text-red-600 font-bold">{selectedSize}</span>
            </div>

            {/* Scrollable / flex wrap size chips */}
            <div className="flex flex-wrap gap-1 max-h-16 overflow-y-auto pr-0.5">
              {product.availableSizes.map((size) => {
                const isSelected = selectedSize === size;
                const shortLabel = size.replace(' Years', 'Y');
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-1.5 py-1 text-[10px] font-bold rounded-md border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950 text-white border-blue-950 shadow-xs scale-105'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-white'
                    }`}
                    title={size}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. Action Buttons: Quick Add to Bag & Order on WhatsApp */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || product.stockQuantity === 0}
            className={`w-full min-h-[44px] py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
              !product.inStock || product.stockQuantity === 0
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-950 hover:bg-blue-900 text-white active:scale-98'
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

          {/* Order on WhatsApp Button (Featured on every product!) */}
          <button
            onClick={handleWhatsAppClick}
            className="w-full min-h-[44px] py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
            title="Order directly on WhatsApp with Size & Color"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Order on WhatsApp (+92 304 6466815)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
