import { X, Award, Flame, Heart, Sparkles, ChefHat } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenReservation: () => void;
}

export function StoryModal({ isOpen, onClose, onOpenReservation }: StoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#120f0e] border border-[#d4a373]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with image cover */}
        <div className="relative h-56 sm:h-64 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
            alt="Savoria Kitchen and Dining"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120f0e] via-transparent to-black/60" />

          {/* Close button */}
          <button
            id="close-story-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-[#d4a373] hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="font-script text-3xl text-[#d4a373] block">
              The Savoria Heritage
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-[#fcf9f2]">
              A Decade of Culinary Craftsmanship
            </h3>
          </div>
        </div>

        {/* Story Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-[#b8aca0] font-body leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-[#261f1a]">
            <div className="bg-[#181310] p-4 rounded-lg border border-[#2b211a] text-center">
              <ChefHat className="w-6 h-6 text-[#d4a373] mx-auto mb-1.5" />
              <div className="font-cinzel font-bold text-white text-xs tracking-wider">
                MASTER CHEFS
              </div>
              <p className="text-[11px] text-[#8e8175] mt-1">
                Michelin-trained culinary brigade
              </p>
            </div>

            <div className="bg-[#181310] p-4 rounded-lg border border-[#2b211a] text-center">
              <Flame className="w-6 h-6 text-[#d4a373] mx-auto mb-1.5" />
              <div className="font-cinzel font-bold text-white text-xs tracking-wider">
                WOOD-FIRED OAK
              </div>
              <p className="text-[11px] text-[#8e8175] mt-1">
                Aged timber & charcoal cooking
              </p>
            </div>

            <div className="bg-[#181310] p-4 rounded-lg border border-[#2b211a] text-center">
              <Award className="w-6 h-6 text-[#d4a373] mx-auto mb-1.5" />
              <div className="font-cinzel font-bold text-white text-xs tracking-wider">
                ORGANIC PROVENANCE
              </div>
              <p className="text-[11px] text-[#8e8175] mt-1">
                100% farm-to-table traceability
              </p>
            </div>
          </div>

          <p>
            Founded in 2012 by Executive Chef Antonio Rossi and Master Sommelier Isabella Chen, Savoria was born out of a profound passion for bringing people together over exceptional, artisanal cuisine.
          </p>

          <p>
            From our 72-hour cold-fermented sourdough pizza crusts to our hand-shaved Norcia black truffles and dry-aged Wagyu cuts, every element in our kitchen is treated with reverence, precision, and heartfelt dedication.
          </p>

          {/* Quote Block */}
          <blockquote className="border-l-2 border-[#d4a373] pl-4 py-2 my-4 italic text-[#f4efe6] font-serif-display text-base">
            &ldquo;Dining is not merely the consumption of food; it is an emotional sensory journey—a shared moment of joy, laughter, and timeless memory.&rdquo;
            <span className="block text-xs font-sans not-italic text-[#d4a373] mt-1.5">
              — Chef Antonio Rossi, Culinary Director
            </span>
          </blockquote>

          {/* Action Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#261f1a]">
            <span className="text-xs text-[#8e8175]">
              We invite you to experience the atmosphere firsthand.
            </span>
            <button
              id="story-modal-book-btn"
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="px-6 py-3 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs tracking-widest uppercase cursor-pointer"
            >
              Reserve Your Table
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
