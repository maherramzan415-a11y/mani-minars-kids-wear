import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from '../types';

export const FAQSection: React.FC = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why are elastic waistbands so important in Mani Minars kids wear?',
      a: 'Children grow rapidly and need total mobility when playing. Our denim shorts and casual pants feature an expandable, soft-lined ribbed elastic waistband with functional drawstrings that eliminate pinching and red marks on sensitive bellies, adapting comfortably as your child grows between 1 and 12 Years.'
    },
    {
      q: 'Are your fabrics 100% skin-friendly and pre-shrunk?',
      a: 'Yes, absolutely. We use certified long-staple combed cotton and pre-softened flex denim. All garments undergo hypoallergenic washing with zero harsh chemicals or scratchy neck tags, ensuring no itching or skin irritation even on the warmest summer afternoons in Pakistan.'
    },
    {
      q: 'How does fast delivery and Cash on Delivery (COD) work?',
      a: 'We offer Free Express Nationwide Shipping across Pakistan on all orders. Once you place an order via our website or directly through WhatsApp (+92 304 6466815), your package is dispatched within 24 hours and delivered in 2-3 business days. You can pay conveniently with Cash on Delivery (COD).'
    },
    {
      q: 'Can I order directly on WhatsApp (+92 304 6466815)?',
      a: 'Yes! Every product card features a green "Order on WhatsApp" button that automatically pre-fills your selected size, color, and product details. Our WhatsApp support team confirms your address immediately and reserves your items.'
    },
    {
      q: 'What is your easy exchange policy if the size does not fit?',
      a: 'We offer a 14-day hassle-free exchange policy. If an item is too loose or too snug on your child, simply message us on WhatsApp with your order number. We will coordinate a swift size swap without questions or complications.'
    }
  ];

  return (
    <section id="faq-section" className="py-16 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-red-600 bg-red-100/60 px-3 py-1 rounded-full mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-blue-950 font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto">
            Everything you need to know about sizing, delivery, skin-friendly fabrics, and ordering at Mani Minars Kids Wear.
          </p>
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = faqOpen === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:border-slate-300 transition-all"
              >
                <button
                  onClick={() => setFaqOpen(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between text-sm sm:text-base font-bold text-blue-950 hover:text-red-600 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-red-600' : 'text-slate-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help CTA banner inside FAQ */}
        <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-emerald-950">Still have a question about sizing or fabric?</p>
              <p className="text-[11px] text-emerald-700">Chat directly with our kids fashion specialist on WhatsApp</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Mani%20Minars!%20I%20have%20a%20question%20before%20placing%20my%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
          >
            Chat: {WHATSAPP_DISPLAY}
          </a>
        </div>

      </div>
    </section>
  );
};
