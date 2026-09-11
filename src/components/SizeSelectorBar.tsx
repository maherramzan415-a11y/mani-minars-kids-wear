import React from 'react';
import { ALL_SIZES, AgeSize } from '../types';
import { Ruler, Sparkles, X } from 'lucide-react';

interface SizeSelectorBarProps {
  selectedSize: AgeSize | null;
  onSelectSize: (size: AgeSize | null) => void;
  onOpenSizeGuide: () => void;
  filteredCount: number;
}

export const SizeSelectorBar: React.FC<SizeSelectorBarProps> = ({
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
  filteredCount,
}) => {
  return (
    <section className="bg-slate-50/80 border-y border-slate-200/80 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          
          {/* Label and Guide CTA */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-blue-950 font-display uppercase tracking-wide">
                  Shop By Child Age / Size:
                </span>
                {selectedSize && (
                  <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-md flex items-center gap-1">
                    Filtering: {selectedSize} ({filteredCount} items)
                    <button 
                      onClick={() => onSelectSize(null)}
                      className="hover:text-red-900"
                      title="Clear size filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                All 10 sizes tailored with elastic waistbands and stretch fabric
              </p>
            </div>
          </div>

          {/* All 10 Size Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-1 lg:pb-0 scrollbar-none">
            <button
              onClick={() => onSelectSize(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                selectedSize === null
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              All Sizes
            </button>

            {ALL_SIZES.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => onSelectSize(isSelected ? null : size)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-xs ring-2 ring-red-600/30'
                      : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-blue-900 border border-slate-200'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Size Guide Button */}
          <button
            onClick={onOpenSizeGuide}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-red-600 bg-white border border-blue-200 px-3.5 py-1.5 rounded-lg shadow-2xs hover:shadow-xs transition-all shrink-0 cursor-pointer"
          >
            <Ruler className="w-3.5 h-3.5 text-blue-600" />
            <span>Growth & Size Chart</span>
          </button>

        </div>
      </div>
    </section>
  );
};
