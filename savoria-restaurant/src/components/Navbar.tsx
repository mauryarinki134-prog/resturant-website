import { useState, useEffect } from 'react';
import { ChefHat, ChevronDown, Menu as MenuIcon, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCart?: () => void;
  cartCount?: number;
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({
  onOpenReservation,
  onOpenCart,
  cartCount = 0,
  activeSection = 'home',
  onNavigate,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'menu', label: 'MENU' },
    { id: 'reservation', label: 'RESERVATION' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0d0a0b]/95 backdrop-blur-md py-3 shadow-2xl border-b border-[#d4a373]/15'
          : 'bg-gradient-to-b from-[#080707]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4a373] to-[#9c6644] flex items-center justify-center shadow-lg shadow-[#d4a373]/20 group-hover:scale-105 transition-transform duration-300 border border-[#e5a853]/40">
            <ChefHat className="w-6 h-6 text-[#120a06]" strokeWidth={2.2} />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-cinzel font-bold tracking-[0.25em] text-[#f4efe6] group-hover:text-[#d4a373] transition-colors leading-none">
              SAVORIA
            </div>
            <div className="text-[9px] sm:text-[10px] tracking-[0.35em] text-[#c5a880] font-sans font-medium mt-1">
              RESTAURANT
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-widest text-[#d5cfc7]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 transition-all duration-200 cursor-pointer uppercase ${
                  isActive
                    ? 'text-[#e5a853] font-bold'
                    : 'text-[#d5cfc7] hover:text-[#e5a853]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#e5a853] shadow-[0_0_8px_#e5a853] rounded-full" />
                )}
              </button>
            );
          })}

          {/* PAGES DROPDOWN */}
          <div className="relative">
            <button
              id="nav-pages-dropdown-btn"
              onClick={() => setPagesDropdownOpen(!pagesDropdownOpen)}
              onMouseEnter={() => setPagesDropdownOpen(true)}
              className="flex items-center gap-1 py-1 text-[#d5cfc7] hover:text-[#e5a853] transition-colors uppercase cursor-pointer"
            >
              PAGES
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${pagesDropdownOpen ? 'rotate-180 text-[#e5a853]' : ''}`} />
            </button>

            {pagesDropdownOpen && (
              <div
                onMouseLeave={() => setPagesDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-52 bg-[#171312] border border-[#d4a373]/25 rounded-md shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <button
                  id="page-link-specials"
                  onClick={() => {
                    onNavigate('menu');
                    setPagesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#cfc7be] hover:text-[#e5a853] hover:bg-[#251e1b] transition-colors"
                >
                  Chef&apos;s Specials
                </button>
                <button
                  id="page-link-categories"
                  onClick={() => {
                    onNavigate('categories');
                    setPagesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#cfc7be] hover:text-[#e5a853] hover:bg-[#251e1b] transition-colors"
                >
                  Delicious Categories
                </button>
                <button
                  id="page-link-story"
                  onClick={() => {
                    onNavigate('about');
                    setPagesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#cfc7be] hover:text-[#e5a853] hover:bg-[#251e1b] transition-colors"
                >
                  Our Philosophy & Story
                </button>
                <button
                  id="page-link-reservation"
                  onClick={() => {
                    onOpenReservation();
                    setPagesDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#cfc7be] hover:text-[#e5a853] hover:bg-[#251e1b] transition-colors"
                >
                  Private Dining & Events
                </button>
              </div>
            )}
          </div>

          <button
            id="nav-link-contact"
            onClick={() => onNavigate('contact')}
            className={`relative py-1 transition-all duration-200 cursor-pointer uppercase ${
              activeSection === 'contact'
                ? 'text-[#e5a853] font-bold'
                : 'text-[#d5cfc7] hover:text-[#e5a853]'
            }`}
          >
            CONTACT US
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart preview button if items added */}
          {onOpenCart && (
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-[#1e1917] border border-[#d4a373]/30 text-[#e5a853] hover:bg-[#d4a373]/10 hover:border-[#d4a373] transition-all cursor-pointer"
              title="View Table Order / Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8c1d2d] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Book A Table Button (Exact match from screenshot) */}
          <button
            id="nav-book-table-btn"
            onClick={onOpenReservation}
            className="px-5 sm:px-6 py-2.5 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-semibold text-xs sm:text-sm tracking-wider font-sans rounded-none transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#d4a373]/20 cursor-pointer active:scale-95"
          >
            BOOK A TABLE
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#d5cfc7] hover:text-[#e5a853] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#120f0e] border-b border-[#d4a373]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left py-2 text-sm font-semibold tracking-wider ${
                  activeSection === item.id ? 'text-[#e5a853]' : 'text-[#cfc7be]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="mobile-nav-link-categories"
              onClick={() => {
                onNavigate('categories');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-semibold tracking-wider text-[#cfc7be]"
            >
              MENU CATEGORIES
            </button>
            <button
              id="mobile-nav-link-contact"
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-sm font-semibold tracking-wider text-[#cfc7be]"
            >
              CONTACT US
            </button>
            <div className="pt-2 border-t border-[#2a2420]">
              <button
                id="mobile-nav-book-btn"
                onClick={() => {
                  onOpenReservation();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-[#d4a373] text-[#120a06] font-bold text-center text-sm tracking-wider"
              >
                BOOK A TABLE NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
