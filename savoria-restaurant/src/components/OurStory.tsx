import { ArrowRight, Utensils, HeartHandshake } from 'lucide-react';

interface OurStoryProps {
  onOpenStoryModal: () => void;
}

export function OurStory({ onOpenStoryModal }: OurStoryProps) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-black/40 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#8c1d2d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Tag: OUR STORY ─── */}
            <div className="flex items-center gap-4">
              <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.25em] text-[#d4a373] uppercase">
                OUR STORY
              </span>
              <div className="w-16 h-[1px] bg-[#d4a373]" />
            </div>

            {/* Heading: A Passion For Flavor A Love For People */}
            <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-normal text-[#fcf9f2] tracking-tight leading-[1.15]">
              A Passion For Flavor <br />
              <span className="italic font-light text-[#f0e6d6]">A Love For People</span>
            </h2>

            {/* Decorative Filigree Swirl (Red / Gold motif) */}
            <div className="py-1 flex items-center">
              <svg className="w-36 h-6 text-[#9e2a3b]" viewBox="0 0 160 24" fill="none" stroke="currentColor">
                <path
                  d="M10 12 C30 2, 40 22, 60 12 C70 7, 75 17, 80 12 C85 7, 90 17, 100 12 C120 2, 130 22, 150 12"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle cx="80" cy="12" r="3" fill="#d4a373" />
                <circle cx="50" cy="12" r="1.5" fill="#9e2a3b" />
                <circle cx="110" cy="12" r="1.5" fill="#9e2a3b" />
              </svg>
            </div>

            {/* Body Copy */}
            <p className="text-[#b8ada0] text-sm sm:text-base font-body leading-relaxed font-light max-w-xl">
              At Savoria, we believe that great food brings people together. Our journey started with a simple idea – to serve delicious food made from the finest ingredients in a warm and welcoming atmosphere.
            </p>

            <p className="text-[#8f8375] text-xs sm:text-sm font-body leading-relaxed font-light max-w-xl">
              Every recipe is an homage to time-honored culinary traditions blended with modern craftsmanship. From hand-kneaded pastas to slow-aged cuts, our kitchen is driven by uncompromising quality and genuine hospitality.
            </p>

            {/* CTA Button: READ MORE ABOUT US → (Burgundy Wine Button) */}
            <div className="pt-3">
              <button
                id="story-read-more-btn"
                onClick={onOpenStoryModal}
                className="group px-7 py-3.5 bg-[#6b1420] hover:bg-[#851a29] text-[#f7f2ea] font-semibold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-3 transition-all duration-200 shadow-xl shadow-[#6b1420]/30 hover:shadow-[#851a29]/40 cursor-pointer active:scale-95 border border-[#942738]/40"
              >
                <span>READ MORE ABOUT US</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>

          </div>

          {/* Right Column: Gourmet Pasta & Slate Composition */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[500px]">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-2 bg-gradient-to-br from-[#d4a373]/15 via-transparent to-[#851a29]/20 rounded-3xl blur-md" />

              {/* Main image card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#2e2621] shadow-2xl bg-[#110e0c] group">
                <img
                  src="https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=1000&q=85"
                  alt="Savoria Handcrafted Pasta Dish"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />

                {/* Floating badge */}
                <div className="absolute top-5 right-5 bg-[#0f0c0b]/90 backdrop-blur-md border border-[#d4a373]/40 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#e5a853] animate-pulse" />
                  <span className="font-cinzel text-[11px] font-bold text-[#e5a853] tracking-widest uppercase">
                    SINCE 2012
                  </span>
                </div>

                {/* Bottom caption overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#090707] via-[#090707]/80 to-transparent p-6 pt-12">
                  <p className="font-serif-display text-[#fdfbf7] text-lg font-medium">
                    Handmade Italian Tagliolini & Heirloom Vine Tomatoes
                  </p>
                  <p className="text-[#a89c8e] text-xs mt-1 font-body">
                    Tossed with aged Parmigiano Reggiano, cold-pressed olive oil & sweet basil
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
