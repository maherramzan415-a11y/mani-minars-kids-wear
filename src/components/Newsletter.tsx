import React, { useState } from 'react';
import { Mail, Check, Copy, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('MANI15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white py-14 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          
          <span className="inline-flex items-center gap-1.5 bg-red-600/30 text-red-300 border border-red-500/40 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3 h-3 text-red-400" />
            Special Parent Welcome Offer
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
            Join the Mani Minars Explorer Club
          </h2>

          <p className="text-sm text-blue-200 mt-2">
            Subscribe for exclusive restock alerts on denim cargo shorts, seasonal secret sales, and helpful kids growth advice.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-xs sm:text-sm text-white placeholder-blue-200/60 focus:bg-white focus:text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-500 transition-all"
                  required
                />
                <Mail className="w-4 h-4 text-blue-200 absolute left-3.5 top-3.5" />
              </div>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                Get 15% Off
              </button>
            </form>
          ) : (
            <div className="mt-6 bg-white/10 border border-white/20 p-5 rounded-2xl max-w-md mx-auto animate-in zoom-in-95">
              <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-sm">
                <Check className="w-5 h-5" />
                <span>You're in! Use your 15% discount code:</span>
              </div>
              <div className="mt-3 flex items-center justify-center gap-3">
                <span className="font-mono text-xl font-black bg-white text-blue-950 px-4 py-1.5 rounded-lg tracking-widest">
                  MANI15
                </span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          )}

          <p className="text-[11px] text-blue-300/80 mt-3">
            No spam, ever. Unsubscribe at any time with one click.
          </p>

        </div>
      </div>
    </section>
  );
};
