import { useState, useEffect, FormEvent } from 'react';
import { X, Calendar, Clock, Users, MapPin, CheckCircle, Sparkles, Utensils, Heart } from 'lucide-react';
import { ReservationBooking } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    date: string;
    time: string;
    guests: number;
  };
}

export function ReservationModal({ isOpen, onClose, initialData }: ReservationModalProps) {
  const [step, setStep] = useState<'details' | 'seating' | 'contact' | 'confirmed'>('details');
  const [date, setDate] = useState(initialData?.date || '2026-08-19');
  const [time, setTime] = useState(initialData?.time || '19:30');
  const [guests, setGuests] = useState(initialData?.guests || 2);
  const [seatingArea, setSeatingArea] = useState<ReservationBooking['seatingArea']>('romantic-window');
  const [occasion, setOccasion] = useState('Anniversary');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (initialData) {
      if (initialData.date) setDate(initialData.date);
      if (initialData.time) setTime(initialData.time);
      if (initialData.guests) setGuests(initialData.guests);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const seatingOptions = [
    {
      id: 'romantic-window' as const,
      name: 'Romantic Window Table',
      description: 'Intimate candlelit seating with skyline and garden views.',
      tag: 'Most Popular',
    },
    {
      id: 'chefs-table' as const,
      name: "Chef's Counter Experience",
      description: 'Front-row view of our open culinary kitchen & sommelier pairing.',
      tag: 'Exclusive',
    },
    {
      id: 'main-dining' as const,
      name: 'Main Grand Hall',
      description: 'Vibrant atmosphere beneath warm chandeliers and jazz melodies.',
      tag: 'Classic',
    },
    {
      id: 'outdoor-patio' as const,
      name: 'Heated Garden Terrace',
      description: 'Lush greenery, ambient fire lanterns, and open-air elegance.',
      tag: 'Scenic',
    },
    {
      id: 'private-lounge' as const,
      name: 'Wine Cellar Vault',
      description: 'Enclosed private room surrounded by 1,200 vintage bottles.',
      tag: 'VIP Dining',
    },
  ];

  const handleConfirm = (e: FormEvent) => {
    e.preventDefault();
    const randomRef = 'SAV-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setStep('confirmed');
  };

  const handleResetAndClose = () => {
    setStep('details');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#14100e] border border-[#d4a373]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#481119] px-6 py-5 flex items-center justify-between border-b border-[#6e1e2b]">
          <div>
            <span className="font-script text-xl text-[#f4cf8f] block">
              Savoria Hospitality
            </span>
            <h3 className="font-serif-display text-xl font-medium text-white">
              Reserve Your Fine Dining Table
            </h3>
          </div>
          <button
            id="close-reservation-modal-btn"
            onClick={handleResetAndClose}
            className="p-2 rounded-full text-[#e2c7c9] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {step !== 'confirmed' && (
            <div className="flex items-center justify-between pb-4 border-b border-[#241c18] text-xs font-cinzel font-semibold tracking-wider text-[#8e8175]">
              <button
                onClick={() => setStep('details')}
                className={`flex items-center gap-1.5 ${step === 'details' ? 'text-[#e5a853]' : ''}`}
              >
                <span>1. Date & Time</span>
              </button>
              <span>→</span>
              <button
                onClick={() => setStep('seating')}
                className={`flex items-center gap-1.5 ${step === 'seating' ? 'text-[#e5a853]' : ''}`}
              >
                <span>2. Seating Choice</span>
              </button>
              <span>→</span>
              <button
                onClick={() => setStep('contact')}
                className={`flex items-center gap-1.5 ${step === 'contact' ? 'text-[#e5a853]' : ''}`}
              >
                <span>3. Guest Details</span>
              </button>
            </div>
          )}

          {/* STEP 1: Details */}
          {step === 'details' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-2">
                    Date of Visit
                  </label>
                  <div className="relative">
                    <input
                      id="modal-reserve-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#1b1512] border border-[#3d2f25] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4a373] [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-2">
                    Time Slot
                  </label>
                  <select
                    id="modal-reserve-time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#1b1512] border border-[#3d2f25] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#d4a373] [color-scheme:dark]"
                  >
                    <option value="12:00">12:00 PM (Lunch Seating)</option>
                    <option value="13:00">01:00 PM (Lunch Seating)</option>
                    <option value="14:00">02:00 PM (Late Lunch)</option>
                    <option value="17:30">05:30 PM (Early Dinner)</option>
                    <option value="18:30">06:30 PM (Sunset Dinner)</option>
                    <option value="19:30">07:30 PM (Prime Dinner)</option>
                    <option value="20:30">08:30 PM (Late Dinner)</option>
                    <option value="21:30">09:30 PM (Night Atmosphere)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-2">
                  Number of Guests
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`py-2.5 text-xs font-bold border transition-all ${
                        guests === num
                          ? 'bg-[#d4a373] text-[#120a06] border-[#d4a373]'
                          : 'bg-[#1b1512] text-[#d1c6b9] border-[#382a20] hover:border-[#d4a373]'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep('seating')}
                  className="px-6 py-3 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs tracking-widest uppercase cursor-pointer"
                >
                  Continue to Seating Area →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Seating Choice */}
          {step === 'seating' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <p className="text-xs text-[#b8ada0]">
                Select your preferred ambiance for the evening:
              </p>
              <div className="space-y-3">
                {seatingOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSeatingArea(opt.id)}
                    className={`w-full text-left p-4 border rounded-lg transition-all flex items-start justify-between cursor-pointer ${
                      seatingArea === opt.id
                        ? 'bg-[#29171a] border-[#e5a853] shadow-lg shadow-black/40'
                        : 'bg-[#181310] border-[#2f241d] hover:border-[#d4a373]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif-display font-medium text-sm text-[#faf6f0]">
                          {opt.name}
                        </span>
                        <span className="text-[10px] bg-[#481119] text-[#f4cf8f] px-2 py-0.5 rounded font-cinzel">
                          {opt.tag}
                        </span>
                      </div>
                      <p className="text-xs text-[#9f9386] mt-1 font-body">
                        {opt.description}
                      </p>
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-3 mt-1 ${
                        seatingArea === opt.id
                          ? 'border-[#e5a853] bg-[#e5a853]'
                          : 'border-[#524438]'
                      }`}
                    >
                      {seatingArea === opt.id && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#120a06]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 text-xs text-[#b8ada0] hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep('contact')}
                  className="px-6 py-3 bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs tracking-widest uppercase cursor-pointer"
                >
                  Continue to Contact Details →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Contact Details */}
          {step === 'contact' && (
            <form onSubmit={handleConfirm} className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="modal-guest-name"
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1b1512] border border-[#3d2f25] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4a373]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id="modal-guest-phone"
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1b1512] border border-[#3d2f25] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4a373]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  id="modal-guest-email"
                  type="email"
                  required
                  placeholder="eleanor@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1b1512] border border-[#3d2f25] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4a373]"
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                  Celebrating an Occasion?
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-[#1b1512] border border-[#3d2f25] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#d4a373] [color-scheme:dark]"
                >
                  <option value="Anniversary">Romantic Anniversary</option>
                  <option value="Birthday">Birthday Celebration</option>
                  <option value="Business">Executive Business Dinner</option>
                  <option value="Casual">Casual Evening with Friends</option>
                  <option value="Other">Special Occasion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-cinzel font-bold text-[#d4a373] uppercase tracking-wider mb-1.5">
                  Special Requests / Dietary Allergies
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Gluten allergy, prefer champagne upon arrival..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#1b1512] border border-[#3d2f25] px-4 py-2 text-xs text-white focus:outline-none focus:border-[#d4a373]"
                />
              </div>

              <div className="pt-4 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep('seating')}
                  className="px-4 py-2.5 text-xs text-[#b8ada0] hover:text-white"
                >
                  ← Back
                </button>
                <button
                  id="confirm-booking-final-btn"
                  type="submit"
                  className="px-7 py-3 bg-[#481119] hover:bg-[#681824] text-white border border-[#d4a373] font-bold text-xs tracking-widest uppercase flex items-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>CONFIRM RESERVATION</span>
                  <CheckCircle className="w-4 h-4 text-[#d4a373]" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Confirmed Receipt */}
          {step === 'confirmed' && (
            <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#241316] border-2 border-[#d4a373] flex items-center justify-center mx-auto shadow-xl shadow-[#d4a373]/20">
                <CheckCircle className="w-8 h-8 text-[#e5a853]" />
              </div>

              <div>
                <span className="font-script text-2xl text-[#d4a373]">
                  Reservation Confirmed
                </span>
                <h4 className="font-serif-display text-2xl font-medium text-white mt-1">
                  We look forward to hosting you!
                </h4>
                <p className="text-xs text-[#b8ada0] mt-1 font-body">
                  A confirmation SMS & email have been dispatched to {email || 'your email'}.
                </p>
              </div>

              {/* Receipt card */}
              <div className="bg-[#1b1512] border border-[#382d25] p-5 rounded-xl text-left max-w-md mx-auto space-y-3 font-body text-xs text-[#d1c5b8]">
                <div className="flex justify-between border-b border-[#29201a] pb-2">
                  <span className="text-[#8e8175]">Booking Reference:</span>
                  <span className="font-cinzel font-bold text-[#e5a853]">{bookingRef}</span>
                </div>
                <div className="flex justify-between border-b border-[#29201a] pb-2">
                  <span className="text-[#8e8175]">Guest Name:</span>
                  <span className="text-white font-medium">{name || 'Honored Guest'}</span>
                </div>
                <div className="flex justify-between border-b border-[#29201a] pb-2">
                  <span className="text-[#8e8175]">Date & Time:</span>
                  <span className="text-white font-medium">{date} at {time}</span>
                </div>
                <div className="flex justify-between border-b border-[#29201a] pb-2">
                  <span className="text-[#8e8175]">Party Size:</span>
                  <span className="text-white font-medium">{guests} Guests</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8e8175]">Seating Area:</span>
                  <span className="text-[#d4a373] font-medium capitalize">
                    {seatingArea.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="close-confirmed-reservation-btn"
                  onClick={handleResetAndClose}
                  className="px-8 py-3 bg-[#d4a373] text-[#120a06] font-bold text-xs tracking-widest uppercase cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
