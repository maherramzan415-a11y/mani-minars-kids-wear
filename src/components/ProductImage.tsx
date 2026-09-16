import React, { useState, useEffect } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';

export const DEFAULT_PRODUCT_PLACEHOLDER = '/placeholder-product.svg';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  onClick?: (e: React.MouseEvent) => void;
  aspectRatioClass?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover object-center',
  fallbackSrc = DEFAULT_PRODUCT_PLACEHOLDER,
  loading = 'lazy',
  onClick,
  aspectRatioClass,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState<boolean>(!src || src.trim() === '');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!src || src.trim() === '') {
      setHasError(true);
      setImgSrc(fallbackSrc);
    } else {
      setHasError(false);
      setImgSrc(src);
      setIsLoaded(false);
    }
  }, [src, fallbackSrc]);

  const handleError = () => {
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${aspectRatioClass || 'w-full h-full'}`}>
      {/* Loading Skeleton Pulse */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center z-0">
          <Sparkles className="w-5 h-5 text-slate-400 animate-spin" />
        </div>
      )}

      {/* Main Image */}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        }`}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        onClick={onClick}
        referrerPolicy="no-referrer"
      />

      {/* Fallback Overlay Badge if image had to fallback */}
      {hasError && (
        <div className="absolute bottom-2 left-2 right-2 bg-blue-950/80 backdrop-blur-xs text-white text-[10px] font-semibold py-1 px-2 rounded-md flex items-center justify-center gap-1 shadow-xs pointer-events-none z-10">
          <ImageOff className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="truncate">Product Image Coming Soon</span>
        </div>
      )}
    </div>
  );
};
