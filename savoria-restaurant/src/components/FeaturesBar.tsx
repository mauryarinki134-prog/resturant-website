import { UtensilsCrossed, ChefHat, Sparkles, Award } from 'lucide-react';

export function FeaturesBar() {
  const features = [
    {
      id: 'delicious-food',
      icon: (
        <svg className="w-8 h-8 text-[#d4a373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 17h18" strokeLinecap="round" />
          <path d="M4 17a8 8 0 0 1 16 0" />
          <path d="M12 4v2" strokeLinecap="round" />
          <path d="M12 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" fill="currentColor" />
          <path d="M8 4c0 1.5-1 2-1 3" strokeLinecap="round" />
          <path d="M16 4c0 1.5 1 2 1 3" strokeLinecap="round" />
        </svg>
      ),
      title: 'DELICIOUS FOOD',
      description: 'Fresh ingredients and expertly crafted dishes',
    },
    {
      id: 'expert-chefs',
      icon: (
        <svg className="w-8 h-8 text-[#d4a373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z" strokeLinejoin="round" />
          <line x1="6" y1="17" x2="18" y2="17" />
        </svg>
      ),
      title: 'EXPERT CHEFS',
      description: 'Talented chefs with years of culinary experience',
    },
    {
      id: 'cozy-ambience',
      icon: (
        <svg className="w-8 h-8 text-[#d4a373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 10h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Z" />
          <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
          <path d="M12 4v2" />
          <circle cx="12" cy="14" r="1.5" fill="currentColor" />
        </svg>
      ),
      title: 'COZY AMBIENCE',
      description: 'A perfect place for family, friends & celebrations',
    },
    {
      id: 'quality-service',
      icon: (
        <svg className="w-8 h-8 text-[#d4a373]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="8" r="6" />
          <path d="m15.5 13.5 2.5 7.5-6-3-6 3 2.5-7.5" strokeLinejoin="round" />
        </svg>
      ),
      title: 'QUALITY SERVICE',
      description: 'We ensure the best service for our every guest',
    },
  ];

  return (
    <section className="bg-[#0e0c0a] border-y border-[#26201b] py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 divide-y sm:divide-y-0 lg:divide-x divide-[#2a231d]">
          {features.map((feature, idx) => (
            <div
              key={feature.id}
              id={`feature-item-${idx}`}
              className={`flex flex-col items-center text-center px-4 ${
                idx > 0 ? 'pt-6 sm:pt-0' : ''
              } group`}
            >
              {/* Icon with hover glow */}
              <div className="mb-4 p-2 rounded-full group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#f5efe6] tracking-[0.18em] mb-2 uppercase group-hover:text-[#d4a373] transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#9f9488] font-body leading-relaxed max-w-[220px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
