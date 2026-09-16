import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  Mail, 
  Phone, 
  MapPin, 
  Lock, 
  HeartHandshake, 
  MessageCircle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { STORE_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_NUMBER, PolicyTab } from '../types';

export type { PolicyTab };

interface PolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PolicyTab;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  if (!isOpen) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactMessage.trim()) return;

    // Send directly to WhatsApp
    const msg = `*Mani Minars Website Inquiry:*%0A*Name:* ${encodeURIComponent(contactName)}%0A*Phone:* ${encodeURIComponent(contactPhone)}%0A*Message:* ${encodeURIComponent(contactMessage)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactPhone('');
      setContactMessage('');
      onClose();
    }, 2000);
  };

  const tabs: { id: PolicyTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'about', label: 'About Us', icon: HeartHandshake },
    { id: 'contact', label: 'Contact Us', icon: Phone },
    { id: 'shipping', label: 'Shipping Policy', icon: Truck },
    { id: 'returns', label: 'Return Policy', icon: RefreshCw },
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms & Conditions', icon: ShieldCheck },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          {/* Header */}
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Customer Trust & Information</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-display">
            Mani Minars Store Policies
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Everything you need to know about our craftsmanship, delivery speed, and customer care.
          </p>

          {/* Tabs navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mt-6 border-b border-slate-100">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-950 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-blue-950'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="py-6 text-slate-700 text-sm leading-relaxed">
            
            {/* 1. About Us */}
            {activeTab === 'about' && (
              <div className="space-y-4">
                <div className="bg-red-50/70 border border-red-100 p-4 rounded-2xl">
                  <h3 className="text-base font-bold text-red-700 font-display">
                    Our Mission: Clothing Designed for Real Childhood Adventures
                  </h3>
                  <p className="text-xs sm:text-sm text-red-950 mt-1">
                    At Mani Minars Kids Wear, we believe kids should play freely without rigid, scratchy clothes holding them back.
                  </p>
                </div>

                <p>
                  Founded in Pakistan, Mani Minars specializes in trendy, comfortable, and affordable kids wear for boys and girls aged <strong>1 to 12 Years</strong>.
                </p>

                <h4 className="font-bold text-blue-950 text-sm pt-2">Why Parents Choose Mani Minars:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <strong className="text-blue-950 block mb-1">☁️ 100% Skin-Friendly Fabrics</strong>
                    We use exclusively combed, long-staple organic cottons, lightweight linens, and soft-washed stretch denim that eliminate scratching and skin redness.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <strong className="text-blue-950 block mb-1">✨ Room-to-Grow Elastic Waistbands</strong>
                    Kids grow fast. Our adaptive elastic waistbands and internal drawstrings flex across growth spurts and playtime tummies.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <strong className="text-blue-950 block mb-1">🛡️ Play-Proof Reinforced Stitching</strong>
                    Double-needle bar-tacked stress points and reinforced knee panels mean no ripped seams during playground matches.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                    <strong className="text-blue-950 block mb-1">🇵🇰 Proudly Designed for Pakistan</strong>
                    Tailored for local weather, festive celebrations, and active daily wear with fast courier dispatch across Pakistan.
                  </div>
                </div>
              </div>
            )}

            {/* 2. Contact Us */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Contact Details */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-base text-blue-950 font-display">
                      We're Here to Help Parents Every Day
                    </h3>
                    <p className="text-xs text-slate-500">
                      Have questions about sizes (1-12Y), product availability, or your recent order? Reach out directly via WhatsApp or email.
                    </p>

                    <div className="space-y-3 pt-2 text-xs">
                      <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <div className="font-bold">WhatsApp Helpline</div>
                          <a 
                            href={`https://wa.me/${WHATSAPP_NUMBER}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-emerald-700 hover:underline font-semibold"
                          >
                            {WHATSAPP_DISPLAY}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900">
                        <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                        <div>
                          <div className="font-bold">Support Email</div>
                          <a 
                            href={`mailto:${STORE_EMAIL}`} 
                            className="text-blue-700 hover:underline font-semibold"
                          >
                            {STORE_EMAIL}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
                        <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                        <div>
                          <div className="font-bold">Operating Hours</div>
                          <span>Monday to Saturday: 9:00 AM – 9:00 PM (PKT)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Fast Message Form */}
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-xs uppercase text-slate-700 tracking-wider mb-3">
                      Send Instant WhatsApp Message
                    </h4>

                    {contactSubmitted ? (
                      <div className="p-4 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold text-center">
                        ✓ Opening WhatsApp with your message!
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Fatima / Ahmed"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                          <input
                            type="tel"
                            placeholder="e.g. 0300 1234567"
                            value={contactPhone}
                            onChange={(e) => setContactPhone(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                          />
                        </div>

                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Message</label>
                          <textarea
                            rows={3}
                            required
                            placeholder="Ask about size, delivery time, or custom order..."
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-900"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Send on WhatsApp</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Shipping Policy */}
            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <Truck className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-emerald-950">
                      100% Free Shipping on All Orders Nationwide
                    </h3>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      No minimum order amount required. Fast, insured doorstep delivery across Pakistan.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </div>
                    <div>
                      <strong className="text-blue-950 text-xs block">24-Hour Dispatch Guarantee</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Every order placed before 4:00 PM PKT is packed and dispatched from our warehouse within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </div>
                    <div>
                      <strong className="text-blue-950 text-xs block">Estimated Transit Times</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        • Major Cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad): 2 to 3 Business Days.<br />
                        • Other Cities & Districts across Pakistan: 3 to 4 Business Days.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-950 font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </div>
                    <div>
                      <strong className="text-blue-950 text-xs block">Live Tracking & Cash on Delivery (COD)</strong>
                      <p className="text-xs text-slate-600 mt-0.5">
                        You receive a live tracking ID via SMS and WhatsApp. Pay safely with Cash on Delivery when the courier arrives at your door.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Return & Exchange */}
            {activeTab === 'returns' && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3">
                  <RefreshCw className="w-8 h-8 text-blue-600 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-blue-950">
                      14-Day Hassle-Free Size & Product Exchange
                    </h3>
                    <p className="text-xs text-blue-800 mt-0.5">
                      Kids grow in unpredictable spurts. If a shirt or short does not fit perfectly, we gladly exchange it!
                    </p>
                  </div>
                </div>

                <h4 className="font-bold text-xs uppercase text-slate-600 tracking-wider pt-2">
                  How Our Easy Exchange Works:
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <span className="font-bold text-red-600 block mb-1">Step 1: Contact WhatsApp</span>
                    Message us on +92 304 6466815 within 14 days of receiving your parcel.
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <span className="font-bold text-red-600 block mb-1">Step 2: Pick Your Size</span>
                    Specify the new size (1-12 Years) or color you want us to send out.
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                    <span className="font-bold text-red-600 block mb-1">Step 3: Doorstep Swap</span>
                    The rider hands you the new parcel and collects the original item. Simple!
                  </div>
                </div>

                <p className="text-xs text-slate-500 pt-2">
                  * Items must be in unwashed, unworn condition with original tags intact.
                </p>
              </div>
            )}

            {/* 5. Privacy Policy */}
            {activeTab === 'privacy' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                  <Lock className="w-8 h-8 text-blue-900 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-blue-950">
                      Your Family’s Privacy is Strictly Protected
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Mani Minars maintains 256-bit SSL encryption and strict data confidentiality.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">Information We Collect</h4>
                  <p className="text-slate-600">
                    We only collect basic delivery information (name, address, phone number, and optional email) purely to dispatch your parcel and provide courier tracking updates.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">Zero Data Selling</h4>
                  <p className="text-slate-600">
                    We NEVER sell, rent, or trade your contact information, phone numbers, or child sizing preferences to third parties or marketing brokers.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">Secure Payment Handling</h4>
                  <p className="text-slate-600">
                    For Cash on Delivery orders, no credit card or financial data is stored on our servers. Electronic payments are handled through PCI-compliant banking gateways.
                  </p>
                </div>
              </div>
            )}

            {/* 6. Terms & Conditions */}
            {activeTab === 'terms' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-blue-950 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm text-blue-950">
                      Terms of Service & Ordering Agreement
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Clear, honest guidelines for shopping with Mani Minars Kids Wear across Pakistan.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">1. Order Placement & Confirmation</h4>
                  <p className="text-slate-600">
                    By placing an order via our website or direct WhatsApp line (+92 304 6466815), you agree to receive order confirmation notices and rider delivery notifications. Orders can be modified or cancelled prior to rider dispatch.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">2. Pricing, Cash on Delivery & Currency</h4>
                  <p className="text-slate-600">
                    All prices are listed in Pakistani Rupees (PKR) and foreign currency conversions are provided for convenience. For Cash on Delivery (COD) orders, full payment is tendered to the courier upon parcel handover.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">3. Sizing & Product Accuracy</h4>
                  <p className="text-slate-600">
                    While we make every effort to display garment colors, textures, and measurements accurately, minor variations may occur due to device screen calibrations. Our 14-Day Doorstep Exchange policy covers any sizing adjustments you might need.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-blue-950 text-sm">4. Child Safety & Fabric Standards</h4>
                  <p className="text-slate-600">
                    All Mani Minars garments comply with strict child safety standards: zero lead-based dyes, pinch-free elastic waistbands, secure button attachments, and smooth non-irritating wash-away interior neck prints.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Mani Minars Kids Wear • Registered Fashion Brand</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
