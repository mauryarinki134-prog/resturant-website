import { useState, FormEvent } from 'react';
import { Calendar, Clock, Users, ArrowRight } from 'lucide-react';

interface ReservationBarProps {
  onOpenReservationModal: (initialData?: {
    date: string;
    time: string;
    guests: number;
  }) => void;
}

export function ReservationBar({ onOpenReservationModal }: ReservationBarProps) {
  const [date, setDate] = useState('2026-08-19');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onOpenReservationModal({
      date,
      time,
      guests,
    });
  };

  return (
    <section id="reservation" className="bg-[#481119] border-y border-[#6e1e2b] py-12 lg:py-14 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#380b12] via-[#481119] to-[#380b12]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Copy */}
          <div className="lg:col-span-5 space-y-2 text-left">
            <span className="font-script text-2xl sm:text-3xl text-[#f4cf8f] tracking-wide block">
              Book Your Table
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-4xl font-medium tracking-tight text-[#fffaf0]">
              Make A Reservation
            </h2>
            <p className="text-[#e2c7c9] text-xs sm:text-sm font-body font-light max-w-md leading-relaxed">
              Book your table in advance and enjoy a hassle-free dining experience.
            </p>
          </div>

          {/* Right Column: Reservation Bar Controls (Exact match from screenshot) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-4 gap-3 sm:gap-2 items-center"
            >
              {/* DATE Input */}
              <div className="bg-[#300a10]/80 border border-[#6b1e28] rounded-none p-3 relative group hover:border-[#d4a373]/60 transition-colors">
                <div className="text-[10px] font-bold tracking-widest text-[#d8979e] uppercase mb-0.5">
                  DATE
                </div>
                <div className="flex items-center justify-between">
                  <input
                    id="reservation-date-input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent text-xs text-[#fcf8f2] font-medium focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                  />
                  <Calendar className="w-4 h-4 text-[#d8979e] shrink-0 ml-1 pointer-events-none" />
                </div>
              </div>

              {/* TIME Input */}
              <div className="bg-[#300a10]/80 border border-[#6b1e28] rounded-none p-3 relative group hover:border-[#d4a373]/60 transition-colors">
                <div className="text-[10px] font-bold tracking-widest text-[#d8979e] uppercase mb-0.5">
                  TIME
                </div>
                <div className="flex items-center justify-between">
                  <select
                    id="reservation-time-select"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    aria-label="Select reservation time"
                    className="bg-transparent text-xs text-[#fcf8f2] font-medium focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                  >
                    <option value="12:00" className="bg-[#1a0508] text-white">12:00 PM (Lunch)</option>
                    <option value="13:00" className="bg-[#1a0508] text-white">01:00 PM (Lunch)</option>
                    <option value="14:00" className="bg-[#1a0508] text-white">02:00 PM (Lunch)</option>
                    <option value="17:30" className="bg-[#1a0508] text-white">05:30 PM (Early Dinner)</option>
                    <option value="18:30" className="bg-[#1a0508] text-white">06:30 PM (Dinner)</option>
                    <option value="19:30" className="bg-[#1a0508] text-white">07:30 PM (Prime Dinner)</option>
                    <option value="20:30" className="bg-[#1a0508] text-white">08:30 PM (Late Dinner)</option>
                    <option value="21:30" className="bg-[#1a0508] text-white">09:30 PM (Night Lounge)</option>
                  </select>
                  <Clock className="w-4 h-4 text-[#d8979e] shrink-0 ml-1 pointer-events-none" />
                </div>
              </div>

              {/* PEOPLE Input */}
              <div className="bg-[#300a10]/80 border border-[#6b1e28] rounded-none p-3 relative group hover:border-[#d4a373]/60 transition-colors">
                <div className="text-[10px] font-bold tracking-widest text-[#d8979e] uppercase mb-0.5">
                  PEOPLE
                </div>
                <div className="flex items-center justify-between">
                  <select
                    id="reservation-guests-select"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    aria-label="Select number of guests"
                    className="bg-transparent text-xs text-[#fcf8f2] font-medium focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                  >
                    <option value={1} className="bg-[#1a0508] text-white">1 Person</option>
                    <option value={2} className="bg-[#1a0508] text-white">2 People</option>
                    <option value={3} className="bg-[#1a0508] text-white">3 People</option>
                    <option value={4} className="bg-[#1a0508] text-white">4 People</option>
                    <option value={5} className="bg-[#1a0508] text-white">5 People</option>
                    <option value={6} className="bg-[#1a0508] text-white">6 People</option>
                    <option value={8} className="bg-[#1a0508] text-white">8 People</option>
                    <option value={10} className="bg-[#1a0508] text-white">10+ (Private Dining)</option>
                  </select>
                  <Users className="w-4 h-4 text-[#d8979e] shrink-0 ml-1 pointer-events-none" />
                </div>
              </div>

              {/* FIND A TABLE → Button */}
              <button
                id="reservation-find-table-btn"
                type="submit"
                className="h-[58px] bg-[#d4a373] hover:bg-[#e5a853] text-[#120a06] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-lg hover:shadow-[#d4a373]/30 cursor-pointer active:scale-95 px-4"
              >
                <span>FIND A TABLE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
