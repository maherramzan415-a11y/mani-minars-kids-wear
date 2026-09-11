import React, { useState } from 'react';
import { 
  Heart, 
  Eye, 
  ShoppingBag, 
  Star, 
  Check, 
  MessageCircle, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { Product, AgeSize } from '../types';

interface ProductCardProps {
  product: Product;
  currencySymbol: string;
  currencyRate: number;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: AgeSize, color: string) => void;
  onOpenWhatsAppOrder: (product: Product, size: AgeSize) => void;
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
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
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

  return (
    <div 
      id={`product-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/5 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.images[currentImgIdx] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => onQuickView(product)}
          loading="lazy"
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="bg-red-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
              Best Seller
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-blue-900 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
              New Arrival
            </span>
          )}
          {product.elasticWaistband && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Elastic Waistband
            </span>
          )}
        </div>

        {/* Wishlist and Quickview Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={() => onToggleWishlist(product)}
            className={`p-2 rounded-full transition-colors shadow-sm backdrop-blur-xs ${
              isWishlisted
                ? 'bg-red-600 text-white'
                : 'bg-white/90 text-slate-700 hover:text-red-600 hover:bg-white'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => onQuickView(product)}
            className="p-2 bg-white/90 text-slate-700 hover:text-blue-900 hover:bg-white rounded-full transition-colors shadow-sm backdrop-blur-xs"
            title="Quick View Details"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Dots if multiple images */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5 pointer-events-auto">
            {product.images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIdx(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImgIdx === idx 
                    ? 'bg-red-600 w-4' 
                    : 'bg-white/70 hover:bg-white'
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-bold text-sm text-blue-950 hover:text-blue-700 cursor-pointer transition-colors line-clamp-1 font-display"
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-base font-extrabold text-blue-950">
              {currencySymbol}{convertedPrice}
            </span>
            {convertedOriginal && (
              <span className="text-xs text-slate-400 line-through">
                {currencySymbol}{convertedOriginal}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Color Selector */}
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-[11px] text-slate-500 font-medium">Color:</span>
            <div className="flex items-center gap-1">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-4 h-4 rounded-full border transition-all ${
                    selectedColor === c.name 
                      ? 'ring-2 ring-blue-900 ring-offset-1 scale-110' 
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-[10px] text-slate-500 font-medium truncate ml-1">
              {selectedColor}
            </span>
          </div>

          {/* Size Quick Selection */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] mb-1">
              <span className="text-slate-600 font-semibold">Select Size:</span>
              <span className="text-blue-800 font-bold">{selectedSize}</span>
            </div>

            <div className="flex flex-wrap gap-1">
              {product.availableSizes.slice(0, 5).map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-1.5 py-1 text-[10px] font-bold rounded-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    {size.replace(' Years', 'Y')}
                  </button>
                );
              })}
              {product.availableSizes.length > 5 && (
                <button
                  onClick={() => onQuickView(product)}
                  className="px-1.5 py-1 text-[10px] font-bold rounded-sm border border-dashed border-slate-300 text-slate-500 hover:text-blue-900 cursor-pointer"
                  title="View all 10 sizes"
                >
                  +{product.availableSizes.length - 5} more
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons: Quick Add to Cart & WhatsApp Order */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-5 gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`col-span-3 py-2.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
              !product.inStock
                ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                : isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            onClick={() => onOpenWhatsAppOrder(product, selectedSize)}
            className="col-span-2 py-2.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1 cursor-pointer"
            title="Direct Order via WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
