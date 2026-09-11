import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Package, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Home, 
  MapPin, 
  Phone,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialOrderId?: string;
  currencySymbol: string;
  currencyRate: number;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderId = '',
  currencySymbol,
  currencyRate,
}) => {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState(initialOrderId || (orders[0]?.id || 'MM-8942'));
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    orders.find((o) => o.id.toLowerCase() === searchId.toLowerCase()) || orders[0] || null
  );
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchId.trim().toLowerCase();
    const found = orders.find(
      (o) => o.id.toLowerCase() === query || 
             o.trackingNumber.toLowerCase() === query ||
             o.customerPhone.includes(query)
    );

    if (found) {
      setSelectedOrder(found);
      setSearchError('');
    } else {
      setSearchError('Order ID not found in database. You can try "MM-8942" to view demo tracker.');
    }
  };

  const trackingSteps = [
    { key: 'confirmed', label: 'Order Placed & Confirmed', desc: 'Verified and forwarded to fulfillment center' },
    { key: 'packed', label: 'Quality Check & Packed', desc: 'Fabric inspected and sealed in hygiene bag' },
    { key: 'shipped', label: 'Dispatched with Courier', desc: 'In transit via Express Delivery' },
    { key: 'delivered', label: 'Delivered to Doorstep', desc: 'Package safely delivered' },
  ];

  const getStepStatus = (stepKey: string, currentStatus: string) => {
    const orderRanks: Record<string, number> = {
      confirmed: 1,
      packed: 2,
      shipped: 3,
      delivered: 4,
    };
    const currentRank = orderRanks[currentStatus] || 1;
    const stepRank = orderRanks[stepKey] || 1;

    if (currentRank > stepRank) return 'completed';
    if (currentRank === stepRank) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-blue-950 font-display">
              Live Order & Delivery Tracker
            </h2>
            <p className="text-xs text-slate-500">
              Check real-time shipment status for your Mani Minars order.
            </p>
          </div>
        </div>

        {/* Search Order Bar */}
        <form onSubmit={handleSearch} className="mt-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchId}
                onChange={(e) => {
                  setSearchId(e.target.value);
                  setSearchError('');
                }}
                placeholder="Enter Order ID (e.g. MM-8942) or Tracking Number"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-3 text-xs font-mono font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-900"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Track Status
            </button>
          </div>

          {searchError && (
            <p className="text-xs text-red-600 font-semibold mt-1.5">{searchError}</p>
          )}
        </form>

        {/* Order Details View */}
        {selectedOrder ? (
          <div className="mt-6 space-y-6">
            {/* Header info badge */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Order Reference</span>
                <div className="text-base font-extrabold text-blue-950 font-mono">{selectedOrder.id}</div>
                <div className="text-xs text-slate-500 mt-0.5">Placed on: {selectedOrder.date}</div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                <div>
                  <span className="inline-block bg-emerald-100 text-emerald-800 font-extrabold text-xs px-2.5 py-0.5 rounded-full uppercase">
                    {selectedOrder.status}
                  </span>
                </div>
                <div className="text-xs font-bold text-blue-900 mt-0.5 font-mono">
                  {selectedOrder.trackingNumber}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="px-2">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">
                Shipment Progress
              </h3>

              <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {trackingSteps.map((step, idx) => {
                  const status = getStepStatus(step.key, selectedOrder.status);
                  return (
                    <div key={step.key} className="flex items-start gap-4 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-colors ${
                        status === 'completed' 
                          ? 'bg-emerald-600 text-white shadow-xs' 
                          : status === 'current'
                          ? 'bg-red-600 text-white ring-4 ring-red-100 shadow-xs animate-pulse'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}>
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : status === 'current' ? (
                          <Clock className="w-4 h-4" />
                        ) : (
                          <span className="text-[10px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 -mt-0.5">
                        <div className={`text-xs font-bold ${
                          status === 'current' ? 'text-red-600' : 'text-slate-800'
                        }`}>
                          {step.label}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {step.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery address & items summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="font-bold text-slate-800 flex items-center gap-1 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  Delivery Destination
                </span>
                <p className="text-slate-600">{selectedOrder.customerName}</p>
                <p className="text-slate-600">{selectedOrder.address}</p>
                <p className="text-slate-600">{selectedOrder.city}</p>
                <p className="text-slate-500 mt-1 font-mono">{selectedOrder.customerPhone}</p>
              </div>

              <div>
                <span className="font-bold text-slate-800 flex items-center gap-1 mb-1">
                  <Package className="w-3.5 h-3.5 text-blue-900" />
                  Package Contents ({selectedOrder.items.length} items)
                </span>
                <div className="space-y-1 mt-1 text-slate-600">
                  {selectedOrder.items.map((it, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="truncate pr-2">{it.quantity}x {it.name} ({it.size})</span>
                      <span className="font-semibold">{currencySymbol}{(it.price * it.quantity * currencyRate).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="pt-1.5 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                    <span>Total (Free Shipping):</span>
                    <span>{currencySymbol}{(selectedOrder.total * currencyRate).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Help WhatsApp Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <a
                href={`https://wa.me/923046466815?text=Hi%20Mani%20Minars!%20I%20have%20an%20inquiry%20regarding%20my%20Order%20ID%3A%20${selectedOrder.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Courier Support</span>
              </a>

              <span className="text-[11px] text-slate-400">
                Tracking updates refresh every 30 minutes
              </span>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-500">
            <p className="text-xs">No orders on record yet. Place your first order to see tracking updates!</p>
          </div>
        )}

      </div>
    </div>
  );
};
