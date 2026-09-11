import React, { useState } from 'react';
import { X, Ruler, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { ALL_SIZES, AgeSize } from '../types';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSizeFilter?: (size: AgeSize) => void;
}

interface SizeRow {
  size: AgeSize;
  heightCm: string;
  heightIn: string;
  chestIn: string;
  waistRelaxedIn: string;
  waistStretchedIn: string;
  approxWeightKg: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectSizeFilter,
}) => {
  if (!isOpen) return null;

  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [calcAge, setCalcAge] = useState<number>(4);
  const [isTall, setIsTall] = useState<boolean>(false);

  const sizeTable: SizeRow[] = [
    { size: '1-2 Years', heightCm: '82 - 88 cm', heightIn: '32 - 35 in', chestIn: '20 in', waistRelaxedIn: '18 in', waistStretchedIn: '21 in', approxWeightKg: '11 - 13 kg' },
    { size: '2-3 Years', heightCm: '89 - 96 cm', heightIn: '35 - 38 in', chestIn: '21 in', waistRelaxedIn: '19 in', waistStretchedIn: '22 in', approxWeightKg: '13 - 15 kg' },
    { size: '3-4 Years', heightCm: '97 - 104 cm', heightIn: '38 - 41 in', chestIn: '22 in', waistRelaxedIn: '20 in', waistStretchedIn: '23 in', approxWeightKg: '15 - 17 kg' },
    { size: '4-5 Years', heightCm: '105 - 110 cm', heightIn: '41 - 43 in', chestIn: '23 in', waistRelaxedIn: '20.5 in', waistStretchedIn: '24 in', approxWeightKg: '17 - 19 kg' },
    { size: '5-6 Years', heightCm: '111 - 116 cm', heightIn: '44 - 46 in', chestIn: '24 in', waistRelaxedIn: '21 in', waistStretchedIn: '25 in', approxWeightKg: '19 - 22 kg' },
    { size: '6-7 Years', heightCm: '117 - 122 cm', heightIn: '46 - 48 in', chestIn: '25 in', waistRelaxedIn: '22 in', waistStretchedIn: '26 in', approxWeightKg: '22 - 25 kg' },
    { size: '7-8 Years', heightCm: '123 - 128 cm', heightIn: '48 - 50 in', chestIn: '26 in', waistRelaxedIn: '22.5 in', waistStretchedIn: '27 in', approxWeightKg: '25 - 28 kg' },
    { size: '8-9 Years', heightCm: '129 - 134 cm', heightIn: '51 - 53 in', chestIn: '27 in', waistRelaxedIn: '23 in', waistStretchedIn: '28 in', approxWeightKg: '28 - 32 kg' },
    { size: '9-10 Years', heightCm: '135 - 140 cm', heightIn: '53 - 55 in', chestIn: '28 in', waistRelaxedIn: '24 in', waistStretchedIn: '29 in', approxWeightKg: '32 - 36 kg' },
    { size: '11-12 Years', heightCm: '141 - 152 cm', heightIn: '56 - 60 in', chestIn: '30 in', waistRelaxedIn: '25 in', waistStretchedIn: '31 in', approxWeightKg: '36 - 44 kg' },
  ];

  // Calculator recommendation
  const getRecommendedSize = (age: number, tall: boolean): AgeSize => {
    let effectiveAge = age;
    if (tall) effectiveAge += 1;
    if (effectiveAge <= 2) return '1-2 Years';
    if (effectiveAge <= 3) return '2-3 Years';
    if (effectiveAge <= 4) return '3-4 Years';
    if (effectiveAge <= 5) return '4-5 Years';
    if (effectiveAge <= 6) return '5-6 Years';
    if (effectiveAge <= 7) return '6-7 Years';
    if (effectiveAge <= 8) return '7-8 Years';
    if (effectiveAge <= 9) return '8-9 Years';
    if (effectiveAge <= 10) return '9-10 Years';
    return '11-12 Years';
  };

  const recommended = getRecommendedSize(calcAge, isTall);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 font-display">
              Kids Size & Growth Guide (1 to 12 Years)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Tailored with adaptive elastic waistbands and comfortable stretch room.
            </p>
          </div>
        </div>

        {/* Interactive Fit Calculator */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-blue-200/80">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-950 uppercase tracking-wide mb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Interactive Fit Calculator</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Child's Current Age:
              </label>
              <select
                value={calcAge}
                onChange={(e) => setCalcAge(Number(e.target.value))}
                className="w-full bg-white border border-slate-300 rounded-lg py-2 px-3 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-600"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Year Old' : 'Years Old'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Growth Tendency:
              </label>
              <label className="flex items-center gap-2 bg-white border border-slate-300 rounded-lg py-2 px-3 text-xs font-medium cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={isTall}
                  onChange={(e) => setIsTall(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <span>Taller / Prefers looser fit</span>
              </label>
            </div>

            <div className="bg-white p-3 rounded-xl border border-blue-300 shadow-2xs">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Recommended Size:
              </div>
              <div className="text-base font-extrabold text-red-600 flex items-center justify-between mt-0.5">
                <span>{recommended}</span>
                {onSelectSizeFilter && (
                  <button
                    onClick={() => {
                      onSelectSizeFilter(recommended);
                      onClose();
                    }}
                    className="text-[11px] bg-blue-900 hover:bg-blue-950 text-white font-bold px-2 py-0.5 rounded transition-colors"
                  >
                    Apply Filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Unit Toggle and Table */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900 font-display">
              Complete Size Measurement Chart
            </h3>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setUnit('in')}
                className={`px-3 py-1 rounded-md transition-all ${
                  unit === 'in' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Inches (in)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 rounded-md transition-all ${
                  unit === 'cm' ? 'bg-white text-blue-900 shadow-2xs font-bold' : 'text-slate-600'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="p-3">Age / Size</th>
                  <th className="p-3">Height</th>
                  <th className="p-3">Chest</th>
                  <th className="p-3">
                    Elastic Waist
                    <span className="block text-[10px] font-normal text-amber-600">(Relaxed → Stretched)</span>
                  </th>
                  <th className="p-3">Weight Guide</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sizeTable.map((row) => {
                  const isRec = row.size === recommended;
                  return (
                    <tr 
                      key={row.size} 
                      className={`hover:bg-blue-50/40 transition-colors ${
                        isRec ? 'bg-red-50/70 font-semibold' : ''
                      }`}
                    >
                      <td className="p-3 font-bold text-blue-950 flex items-center gap-1.5">
                        {row.size}
                        {isRec && <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded">Recommended</span>}
                      </td>
                      <td className="p-3 text-slate-700">
                        {unit === 'in' ? row.heightIn : row.heightCm}
                      </td>
                      <td className="p-3 text-slate-700">{row.chestIn}</td>
                      <td className="p-3 text-slate-700">
                        {row.waistRelaxedIn} → <span className="text-emerald-700 font-bold">{row.waistStretchedIn}</span>
                      </td>
                      <td className="p-3 text-slate-600">{row.approxWeightKg}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pro Parent Tips */}
        <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-red-600" />
            <span>Mani Minars "Room-to-Grow" Promise</span>
          </div>
          <p>
            All our denim cargo shorts and casual bottoms feature an <strong>internal elastic stretch waistband with adjustable drawstrings</strong> that expand by up to 3 inches. If your child is between sizes, we recommend sizing up so they get maximum mileage as they grow.
          </p>
        </div>

        {/* Done button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
          >
            Got It, Back to Shopping
          </button>
        </div>

      </div>
    </div>
  );
};
