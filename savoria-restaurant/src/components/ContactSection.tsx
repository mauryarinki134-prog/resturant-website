import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-black/40 border-t border-[#1e1814] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2 mb-14">
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.28em] text-[#d4a373] uppercase block">
            GET IN TOUCH
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#fdfbf7] font-medium tracking-tight">
            Visit & Contact Savoria
          </h2>
          <div className="w-16 h-[1px] bg-[#8f2434] mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="bg-[#120f0e] border border-[#261f1a] p-6 rounded-xl space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#1e1714] border border-[#3d2f25] rounded text-[#d4a373]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                    Our Location
                  </h4>
                  <p className="text-xs text-[#9f9386] font-body mt-1 leading-relaxed">
                    123 Flavor Street, Culinary District<br />
                    Foodie City, FC 45678, United States
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-[#1e1713]">
                <div className="p-3 bg-[#1e1714] border border-[#3d2f25] rounded text-[#d4a373]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                    Dining Hours
                  </h4>
                  <p className="text-xs text-[#9f9386] font-body mt-1 leading-relaxed">
                    Mon – Thu: 11:30 AM – 10:30 PM<br />
                    Fri – Sun: 11:30 AM – 11:30 PM
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-[#1e1713]">
                <div className="p-3 bg-[#1e1714] border border-[#3d2f25] rounded text-[#d4a373]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                    Direct Line & Concierge
                  </h4>
                  <p className="text-xs text-[#9f9386] font-body mt-1">
                    +1 234 567 8900 / concierge@savoria.com
                  </p>
                </div>
              </div>
            </div>

            {/* Valet Parking & Dress Code Notice */}
            <div className="bg-[#241115] border border-[#521c24] p-4 rounded-xl text-xs text-[#e0c4c8]">
              <span className="font-bold text-[#f5cf8e] uppercase font-cinzel tracking-wider block mb-1">
                Complimentary Valet & Smart Casual
              </span>
              Valet parking available at the main entrance. We suggest smart casual or cocktail attire for evening dining.
            </div>
          </div>

          {/* Contact & Private Dining Form */}
          <div className="lg:col-span-7 bg-[#120f0e] border border-[#261f1a] p-6 sm:p-8 rounded-xl">
            <h3 className="font-serif-display text-xl text-white font-medium mb-1">
              Send an Inquiry / Message
            </h3>
            <p className="text-xs text-[#8e8175] mb-6 font-body">
              For private banquets, corporate dining, or dietary queries, message our management team directly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus Sterling"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#1a1412] border border-[#332720] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a373] rounded"
                  />
                </div>

                <div>
                  <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="marcus@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#1a1412] border border-[#332720] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a373] rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                  Subject / Occasion
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Private Banquet of 20 Guests"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#1a1412] border border-[#332720] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a373] rounded"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                  Your Message
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide any specific details or preferences..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#1a1412] border border-[#332720] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a373] rounded"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {formSubmitted ? (
                  <div className="flex items-center gap-2 text-xs text-[#74c67a]">
                    <Check className="w-4 h-4" />
                    <span>Inquiry sent! Our concierge will reply within 2 hours.</span>
                  </div>
                ) : (
                  <div />
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="px-6 py-3 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs tracking-widest uppercase flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>SEND INQUIRY</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
