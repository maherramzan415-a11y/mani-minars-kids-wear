import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Mini Tooltip Prompt */}
      {showTooltip && (
        <div className="mb-2 bg-white text-slate-800 text-xs font-semibold py-2 px-3 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-2 animate-bounce">
          <span>💬 Need fast size help or direct WhatsApp order?</span>
          <button 
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href="https://wa.me/923046466815?text=Hi%20Mani%20Minars%20Kids%20Wear!%20I'm%20shopping%20for%20my%20child%20and%20need%20help%20with%20sizing%20and%20placing%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </a>
    </div>
  );
};
