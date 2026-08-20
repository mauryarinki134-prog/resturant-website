import { useState, FormEvent } from 'react';
import { ChefHat, MapPin, Phone, Mail, Send, Facebook, Instagram, Twitter, Youtube, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenReservation: () => void;
}

export function Footer({ onNavigate, onOpenReservation }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#0b0908] text-[#c9bfb5] pt-16 pb-8 border-t border-[#211b17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#211b17]">
          
          {/* Column 1: Brand & Socials (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4a373] to-[#9c6644] flex items-center justify-center border border-[#e5a853]/40">
                <ChefHat className="w-6 h-6 text-[#120a06]" strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-xl font-cinzel font-bold tracking-[0.25em] text-[#f4efe6]">
                  SAVORIA
                </div>
                <div className="text-[9px] tracking-[0.35em] text-[#c5a880] font-sans font-medium">
                  RESTAURANT
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#9e9183] font-body leading-relaxed max-w-sm">
              Good food, good mood. Join us for an unforgettable dining experience.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                id="social-facebook-link"
                className="w-8 h-8 rounded-full bg-[#181311] border border-[#382d26] flex items-center justify-center text-[#d4a373] hover:bg-[#d4a373] hover:text-[#0b0908] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#instagram"
                id="social-instagram-link"
                className="w-8 h-8 rounded-full bg-[#181311] border border-[#382d26] flex items-center justify-center text-[#d4a373] hover:bg-[#d4a373] hover:text-[#0b0908] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                id="social-twitter-link"
                className="w-8 h-8 rounded-full bg-[#181311] border border-[#382d26] flex items-center justify-center text-[#d4a373] hover:bg-[#d4a373] hover:text-[#0b0908] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                id="social-youtube-link"
                className="w-8 h-8 rounded-full bg-[#181311] border border-[#382d26] flex items-center justify-center text-[#d4a373] hover:bg-[#d4a373] hover:text-[#0b0908] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#f4efe6] uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9f9488] font-body">
              <li>
                <button
                  id="footer-link-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  id="footer-link-about"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  id="footer-link-menu"
                  onClick={() => onNavigate('menu')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Menu
                </button>
              </li>
              <li>
                <button
                  id="footer-link-reservation"
                  onClick={onOpenReservation}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Reservation
                </button>
              </li>
              <li>
                <button
                  id="footer-link-contact"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Menu (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#f4efe6] uppercase">
              OUR MENU
            </h4>
            <ul className="space-y-2.5 text-xs text-[#9f9488] font-body">
              <li>
                <button
                  id="footer-menu-breakfast"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Breakfast
                </button>
              </li>
              <li>
                <button
                  id="footer-menu-lunch"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Lunch
                </button>
              </li>
              <li>
                <button
                  id="footer-menu-dinner"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Dinner
                </button>
              </li>
              <li>
                <button
                  id="footer-menu-desserts"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Desserts
                </button>
              </li>
              <li>
                <button
                  id="footer-menu-drinks"
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#e5a853] transition-colors"
                >
                  Drinks
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#f4efe6] uppercase">
              CONTACT US
            </h4>
            <div className="space-y-3 text-xs text-[#9f9488] font-body">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4a373] shrink-0 mt-0.5" />
                <span>123 Flavor Street, Foodie City, FC 45678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4a373] shrink-0" />
                <a href="tel:+12345678900" className="hover:text-[#e5a853] transition-colors">
                  +1 234 567 8900
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4a373] shrink-0" />
                <a href="mailto:info@savoria.com" className="hover:text-[#e5a853] transition-colors">
                  info@savoria.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 5: Newsletter (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#f4efe6] uppercase">
              NEWSLETTER
            </h4>
            <p className="text-xs text-[#9f9488] font-body leading-relaxed">
              Subscribe to get the latest updates and offers from Savoria.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <div className="flex items-center bg-[#1f1917] border border-[#3b2e26] focus-within:border-[#d4a373] rounded-sm overflow-hidden">
                <input
                  id="newsletter-email-input"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-white placeholder-[#786c62] focus:outline-none"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="p-2.5 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="absolute -bottom-6 left-0 flex items-center gap-1 text-[11px] text-[#74c67a]">
                  <Check className="w-3 h-3" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d7065] font-body">
          <p>© 2025 Savoria Restaurant. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-[#d4a373] transition-colors">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#terms" className="hover:text-[#d4a373] transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
