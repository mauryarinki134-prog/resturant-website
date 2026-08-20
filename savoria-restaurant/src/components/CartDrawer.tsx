import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { CartItem } from '../types';
import { useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenReservation: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenReservation,
}: CartDrawerProps) {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderType, setOrderType] = useState<'dine-in' | 'pickup'>('dine-in');
  const [tableNumber, setTableNumber] = useState('Table 14');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.0825 * 100) / 100;
  const total = (subtotal + tax).toFixed(2);

  const handlePlaceOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      onClearCart();
      setOrderSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#120f0e] border-l border-[#d4a373]/30 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="bg-[#481119] p-5 flex items-center justify-between border-b border-[#6e1e2b]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#f4cf8f]" />
              <h3 className="font-serif-display text-lg font-medium text-white">
                Your Table & Dining Order
              </h3>
            </div>
            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#e2c7c9] hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderSuccess ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#241316] border-2 border-[#d4a373] rounded-full flex items-center justify-center mx-auto text-[#e5a853]">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="font-serif-display text-xl text-white">
                  Order Dispatched to Kitchen!
                </h4>
                <p className="text-xs text-[#a39588] max-w-xs mx-auto">
                  Our brigade has started crafting your gourmet dishes with passion.
                </p>
              </div>
            ) : items.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#4a3d34] mx-auto" />
                <p className="font-serif-display text-base text-[#cfc5b8]">
                  Your order is currently empty
                </p>
                <p className="text-xs text-[#8c7e72]">
                  Explore our delicious categories and add your favorite dishes.
                </p>
              </div>
            ) : (
              <>
                {/* Order Type Toggle */}
                <div className="flex bg-[#1a1412] p-1 rounded border border-[#332720]">
                  <button
                    onClick={() => setOrderType('dine-in')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-[#d4a373] text-[#120a06]'
                        : 'text-[#9c8e82]'
                    }`}
                  >
                    Dine-In Table Order
                  </button>
                  <button
                    onClick={() => setOrderType('pickup')}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#d4a373] text-[#120a06]'
                        : 'text-[#9c8e82]'
                    }`}
                  >
                    Curbside Takeout
                  </button>
                </div>

                {orderType === 'dine-in' && (
                  <div className="flex items-center justify-between bg-[#191310] px-3 py-2 border border-[#2e231c] rounded text-xs">
                    <span className="text-[#8e8175]">Table Assignment:</span>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      className="bg-transparent text-right text-[#e5a853] font-bold focus:outline-none w-24"
                    />
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-3 pt-2">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.menuItem.id}
                      className="bg-[#181310] border border-[#291f19] p-3 rounded-lg flex items-center gap-3"
                    >
                      <img
                        src={cartItem.menuItem.image}
                        alt={cartItem.menuItem.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif-display text-xs text-white truncate">
                          {cartItem.menuItem.name}
                        </h5>
                        <span className="text-xs text-[#d4a373] font-cinzel font-bold">
                          ${cartItem.menuItem.price}
                        </span>
                        {cartItem.notes && (
                          <p className="text-[10px] text-[#8e8175] italic truncate">
                            &quot;{cartItem.notes}&quot;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateQuantity(cartItem.menuItem.id, -1)}
                          className="p-1 rounded bg-[#251c17] text-[#9f9184] hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cartItem.menuItem.id, 1)}
                          className="p-1 rounded bg-[#251c17] text-[#9f9184] hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onRemoveItem(cartItem.menuItem.id)}
                          className="p-1 text-[#8c3540] hover:text-[#e04f61] ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer with totals */}
          {items.length > 0 && !orderSuccess && (
            <div className="bg-[#181311] border-t border-[#2a201a] p-5 space-y-3">
              <div className="space-y-1.5 text-xs text-[#a19588]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>State & Hospitality Tax (8.25%)</span>
                  <span className="text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#291f19]">
                  <span className="font-cinzel">Total</span>
                  <span className="font-cinzel text-[#e5a853]">${total}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  id="cart-place-order-btn"
                  onClick={handlePlaceOrder}
                  className="w-full py-3 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <span>SEND ORDER TO KITCHEN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onOpenReservation();
                  }}
                  className="text-[11px] text-[#b8ada0] hover:text-[#e5a853] text-center pt-1"
                >
                  Need to reserve a physical table first? Click here.
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
