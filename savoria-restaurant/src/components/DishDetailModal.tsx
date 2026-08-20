import { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles, Wine, Flame, Heart } from 'lucide-react';
import { MenuItem } from '../types';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, notes: string) => void;
}

export function DishDetailModal({ item, onClose, onAddToCart }: DishDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [added, setAdded] = useState(false);

  if (!item) return null;

  const handleAdd = () => {
    onAddToCart(item, quantity, notes);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14100e] border border-[#d4a373]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Dish Hero Image */}
        <div className="relative h-64 overflow-hidden bg-[#1a1411]">
          <img
            src={item.image}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14100e] via-transparent to-black/50" />

          {/* Close button */}
          <button
            id="close-dish-modal-btn"
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-[#d4a373] hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {item.isChefSpecial && (
            <div className="absolute top-4 left-4 bg-[#8c1d2d] text-white text-xs font-bold px-3 py-1 rounded shadow-lg flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CHEF&apos;S RECOMMENDATION</span>
            </div>
          )}

          <div className="absolute bottom-3 left-4 right-4 flex items-baseline justify-between">
            <h3 className="font-serif-display text-2xl font-medium text-white">
              {item.name}
            </h3>
            <span className="font-cinzel text-2xl font-bold text-[#e5a853]">
              ${item.price}
            </span>
          </div>
        </div>

        {/* Dish Info */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <p className="text-sm text-[#b8aca0] font-body leading-relaxed">
            {item.description}
          </p>

          {/* Wine Pairing & Highlights */}
          <div className="bg-[#1b1512] border border-[#2e231c] p-3.5 rounded-lg space-y-2 text-xs">
            <div className="flex items-center gap-2 text-[#d4a373]">
              <Wine className="w-4 h-4 shrink-0" />
              <span className="font-semibold">Sommelier Wine Pairing:</span>
            </div>
            <p className="text-[#a19588] pl-6 font-body">
              Recommended with Barolo Riserva or full-bodied Tuscan Chianti Classico.
            </p>
          </div>

          {/* Special notes */}
          <div>
            <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
              Preparation / Dietary Notes
            </label>
            <input
              type="text"
              placeholder="e.g. Extra sauce on the side, no onion..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#1b1512] border border-[#382d25] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4a373] rounded"
            />
          </div>

          {/* Quantity and Add Button */}
          <div className="pt-2 flex items-center gap-4">
            <div className="flex items-center border border-[#382d25] rounded bg-[#1b1512]">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-[#b8ada0] hover:text-white"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 text-xs font-bold text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-[#b8ada0] hover:text-white"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              id="dish-add-to-order-btn"
              onClick={handleAdd}
              disabled={added}
              className="flex-1 py-3 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-lg"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-green-800" />
                  <span>Added to Order!</span>
                </>
              ) : (
                <span>Add to Order (${item.price * quantity})</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
