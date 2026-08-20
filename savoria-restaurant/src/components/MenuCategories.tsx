import { useState, MouseEvent } from 'react';
import { CATEGORIES_DATA, MENU_ITEMS_DATA } from '../data/restaurantData';
import { MenuItem } from '../types';
import { Sparkles, Plus, Check } from 'lucide-react';

interface MenuCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
  onAddToCart?: (item: MenuItem) => void;
  onViewItem?: (item: MenuItem) => void;
}

export function MenuCategories({
  onSelectCategory,
  selectedCategory,
  onAddToCart,
  onViewItem,
}: MenuCategoriesProps) {
  const [activeItemAdded, setActiveItemAdded] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS_DATA.filter((item) =>
    selectedCategory === 'all' ? true : item.category === selectedCategory
  );

  const handleAdd = (item: MenuItem, e: MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item);
      setActiveItemAdded(item.id);
      setTimeout(() => setActiveItemAdded(null), 1500);
    }
  };

  return (
    <section id="categories" className="py-20 lg:py-24 bg-black/40 border-t border-[#1f1915] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-14">
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.28em] text-[#d4a373] uppercase block">
            EXPLORE OUR MENU
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#fdfbf7] font-medium tracking-tight">
            Our Delicious Categories
          </h2>

          {/* Ornamental Divider */}
          <div className="flex justify-center items-center py-2">
            <svg className="w-32 h-5 text-[#8f2434]" viewBox="0 0 160 20" fill="none" stroke="currentColor">
              <path
                d="M10 10 C35 2, 45 18, 65 10 C72 6, 76 14, 80 10 C84 6, 88 14, 95 10 C115 2, 125 18, 150 10"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <circle cx="80" cy="10" r="2.5" fill="#d4a373" />
            </svg>
          </div>
        </div>

        {/* 6 Circular Category Cards (Exact reproduction of screenshot) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 lg:gap-6 justify-items-center">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex flex-col items-center text-center group cursor-pointer w-full max-w-[170px] transition-transform duration-300 focus:outline-none ${
                  isSelected ? 'scale-105' : 'hover:-translate-y-1.5'
                }`}
              >
                {/* Circular Image Container with Multi-layer Ring */}
                <div
                  className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1.5 transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-[#e5a853] shadow-[0_0_20px_rgba(229,168,83,0.35)]'
                      : 'ring-1 ring-[#3a2d24] group-hover:ring-[#d4a373] group-hover:shadow-[0_0_15px_rgba(212,163,115,0.2)]'
                  }`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#14100e] border border-[#2c221a]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-95"
                    />
                  </div>
                </div>

                {/* Category Name */}
                <h3
                  className={`mt-4 font-cinzel text-sm sm:text-base font-bold tracking-[0.18em] transition-colors ${
                    isSelected
                      ? 'text-[#e5a853]'
                      : 'text-[#f5efe6] group-hover:text-[#d4a373]'
                  }`}
                >
                  {cat.name}
                </h3>

                {/* Item Count */}
                <span className="text-xs text-[#9e9183] font-body mt-1">
                  {cat.itemCount} Items
                </span>

                {/* Decorative Mini Underline */}
                <div className="mt-2 flex items-center justify-center">
                  <div
                    className={`h-[1px] transition-all duration-300 ${
                      isSelected
                        ? 'w-10 bg-[#e5a853]'
                        : 'w-6 bg-[#6e1e2b] group-hover:w-8 group-hover:bg-[#d4a373]'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Showcase Grid */}
        <div id="menu" className="mt-16 pt-12 border-t border-[#1c1613]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e5a853]" />
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#fcf9f2] tracking-wider uppercase">
                  {selectedCategory === 'all'
                    ? "Chef's Complete Selection"
                    : `${selectedCategory.toUpperCase()} SPECIALS`}
                </h3>
              </div>
              <p className="text-xs text-[#9e9183] mt-1 font-body">
                {CATEGORIES_DATA.find((c) => c.id === selectedCategory)?.description ||
                  'Explore our handcrafted seasonal dishes curated with the finest ingredients.'}
              </p>
            </div>

            {/* Filter Pill to reset */}
            {selectedCategory !== 'all' && (
              <button
                id="reset-category-filter-btn"
                onClick={() => onSelectCategory('all')}
                className="text-xs font-semibold tracking-wider text-[#d4a373] hover:text-[#e5a853] underline cursor-pointer"
              >
                View All Categories ({MENU_ITEMS_DATA.length} Dishes)
              </button>
            )}
          </div>

          {/* Dish Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`menu-item-card-${item.id}`}
                onClick={() => onViewItem && onViewItem(item)}
                className="bg-[#120f0e] border border-[#2a221c] hover:border-[#d4a373]/50 p-4 sm:p-5 rounded-xl flex gap-4 items-center group transition-all duration-300 hover:shadow-xl hover:shadow-black/60 cursor-pointer"
              >
                {/* Dish Thumbnail */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 relative bg-[#181310] border border-[#2f251f]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {item.isChefSpecial && (
                    <span className="absolute top-1 left-1 bg-[#8c1d2d] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      CHEF&apos;S PICK
                    </span>
                  )}
                </div>

                {/* Dish Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif-display text-base sm:text-lg font-medium text-[#fcf9f2] group-hover:text-[#e5a853] transition-colors truncate">
                      {item.name}
                    </h4>
                    <span className="font-cinzel font-bold text-base sm:text-lg text-[#d4a373] shrink-0">
                      ${item.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#9f9488] font-body line-clamp-2 mt-1.5 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1e1713]">
                    <div className="flex items-center gap-2">
                      {item.isVegetarian && (
                        <span className="text-[10px] bg-[#1c2e1c] text-[#74c67a] px-2 py-0.5 rounded border border-[#2c472c]">
                          Vegetarian
                        </span>
                      )}
                      {item.calories && (
                        <span className="text-[10px] text-[#7e7266]">
                          {item.calories} kcal
                        </span>
                      )}
                    </div>

                    <button
                      id={`add-to-order-btn-${item.id}`}
                      onClick={(e) => handleAdd(item, e)}
                      className="px-3 py-1 bg-[#201916] hover:bg-[#d4a373] text-[#d4a373] hover:text-[#120a06] border border-[#d4a373]/40 rounded text-xs font-semibold tracking-wider flex items-center gap-1 transition-all cursor-pointer"
                    >
                      {activeItemAdded === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-green-400" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3" />
                          <span>Add to Order</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
