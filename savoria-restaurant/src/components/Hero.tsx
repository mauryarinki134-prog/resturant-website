import { useState, useEffect } from 'react';
import { Utensils, Play, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenStoryModal: () => void;
}

export function Hero({ onExploreMenu, onOpenStoryModal }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-black/40"
    >
      {/* Background ambient lighting - strictly authentic dark restaurant atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#1e1511]/40 via-[#0a0808] to-[#050404] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4a373]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#8c1d2d]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            
            {/* Script Subtitle: "Welcome to Savoria" */}
            <div className="flex items-center gap-2">
              <span className="font-script text-3xl sm:text-4xl lg:text-5xl text-[#d4a373] tracking-wide block">
                {slide.subtitle}
              </span>
            </div>

            {/* Display Headline: "Good Food \n Good Mood" */}
            <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#fdfbf7] leading-[1.08]">
              {slide.title.split('\n').map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Description */}
            <p className="text-[#bfb5ab] text-sm sm:text-base lg:text-lg max-w-xl font-body leading-relaxed font-light">
              {slide.description}
            </p>

            {/* CTA Action Buttons (Match exact style from screenshot) */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Explore Menu Button (Gold) */}
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="group px-7 py-3.5 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2.5 transition-all duration-200 shadow-xl hover:shadow-[#d4a373]/25 cursor-pointer active:scale-95"
              >
                <span>EXPLORE MENU</span>
                <Utensils className="w-4 h-4 text-[#120a06] group-hover:rotate-12 transition-transform duration-300" />
              </button>

              {/* Our Story Button (Dark with Gold Border & Play Icon) */}
              <button
                id="hero-our-story-btn"
                onClick={onOpenStoryModal}
                className="group px-7 py-3.5 bg-black/40/80 hover:bg-[#201815] text-[#f4efe6] hover:text-[#d4a373] border border-[#d4a373]/40 hover:border-[#d4a373] font-bold text-xs sm:text-sm tracking-widest uppercase flex items-center gap-2.5 transition-all duration-200 shadow-md cursor-pointer active:scale-95"
              >
                <span>OUR STORY</span>
                <div className="w-5 h-5 rounded-full border border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
              </button>
            </div>

            {/* Carousel Indicators (Exact match: active gold pill + hollow rings) */}
            <div className="flex items-center gap-2.5 pt-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  id={`hero-slide-dot-${idx}`}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`transition-all duration-300 cursor-pointer ${
                    currentSlide === idx
                      ? 'w-7 h-2 bg-[#d4a373] rounded-full shadow-[0_0_8px_#d4a373]'
                      : 'w-2.5 h-2.5 rounded-full border border-[#8a7a6e] hover:border-[#d4a373]'
                  }`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Hero Visual Platter with glowing candle ambiance */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[540px] group">
              
              {/* Outer decorative glow ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#d4a373]/20 via-[#8c1d2d]/20 to-transparent blur-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Main Platter Visual */}
              <div className="relative rounded-2xl overflow-hidden border border-[#d4a373]/20 shadow-2xl bg-[#14100e]">
                <img
                  src={slide.image}
                  alt="Savoria Gourmet Dish"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[430px] lg:h-[470px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-95"
                />

                {/* Bottom dish highlight badge */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#090707] via-[#090707]/80 to-transparent p-5 pt-12 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#d4a373] text-xs font-semibold tracking-widest uppercase">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>CHEF&apos;S MASTERPIECE</span>
                    </div>
                    <p className="text-white text-sm sm:text-base font-serif-display font-medium mt-0.5">
                      {slide.tagline}
                    </p>
                  </div>

                  <button
                    id="hero-view-dish-btn"
                    onClick={onExploreMenu}
                    className="hidden sm:flex p-2.5 rounded-full bg-[#d4a373]/20 text-[#d4a373] hover:bg-[#d4a373] hover:text-black border border-[#d4a373]/50 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
