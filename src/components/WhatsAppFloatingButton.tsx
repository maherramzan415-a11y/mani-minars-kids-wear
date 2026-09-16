import React, { useState } from 'react';
import { MessageCircle, X, ShoppingBag } from 'lucide-react';
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from '../types';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  // Exact prefill requested: "Hello, I want to order this product."
  const prefilledMessage = encodeURIComponent("Hello, I want to order this product.");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${prefilledMessage}`;

  return (
    <aside aria-label="WhatsApp Quick Order Support" className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Tooltip Prompt */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-900 text-xs font-semibold py-2.5 px-3.5 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-3 animate-fade-in max-w-xs">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] font-bold text-slate-800">Direct WhatsApp Order</p>
            <p className="text-[10px] text-slate-500">"Hello, I want to order this product."</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="floating-whatsapp-btn"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group relative cursor-pointer"
        aria-label="Order on WhatsApp (+92 304 6466815)"
        title={`Order on WhatsApp: ${WHATSAPP_DISPLAY}`}
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold">
          1
        </span>
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </a>
    </aside>
  );
};
