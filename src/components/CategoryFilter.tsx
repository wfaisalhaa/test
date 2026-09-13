import React from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Layers, 
  Briefcase, 
  Sparkles, 
  X,
  Filter
} from 'lucide-react';
import { FilterState } from '../types';
import { CATEGORIES_LIST, SOFTWARE_LIST } from '../data/mockData';

interface CategoryFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: Partial<FilterState>) => void;
  toolsCount: number;
  servicesCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filter,
  onFilterChange,
  toolsCount,
  servicesCount,
}) => {
  return (
    <div className="bg-[#13161f] border-y border-white/10 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* Top Controls Row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Type Selector Tabs */}
          <div className="flex items-center bg-black/40 p-1.5 rounded-xl border border-white/10 self-start sm:self-auto overflow-x-auto max-w-full">
            <button
              onClick={() => onFilterChange({ selectedType: 'all', selectedCategory: 'all' })}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                filter.selectedType === 'all'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              جميع المعروضات ({toolsCount + servicesCount})
            </button>
            <button
              onClick={() => onFilterChange({ selectedType: 'tools', selectedCategory: 'all' })}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                filter.selectedType === 'tools'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              أدوات وملحقات ({toolsCount})
            </button>
            <button
              onClick={() => onFilterChange({ selectedType: 'services', selectedCategory: 'all' })}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors ${
                filter.selectedType === 'services'
                  ? 'bg-amber-500 text-black shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              خدمات التصميم ({servicesCount})
            </button>
          </div>

          {/* Search Input & Sort */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={filter.searchQuery}
                onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
                placeholder="ابحث عن أداة، خط، قالب، أو خدمة..."
                className="w-full bg-black/40 border border-white/15 rounded-xl pr-10 pl-9 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
              {filter.searchQuery && (
                <button
                  onClick={() => onFilterChange({ searchQuery: '' })}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Software filter (if in tools or all) */}
            {filter.selectedType !== 'services' && (
              <select
                aria-label="تصفية حسب البرنامج"
                value={filter.selectedSoftware}
                onChange={(e) => onFilterChange({ selectedSoftware: e.target.value })}
                className="bg-black/40 text-neutral-300 border border-white/15 rounded-xl text-xs sm:text-sm py-2 px-3 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="الكل">جميع البرامج</option>
                {SOFTWARE_LIST.filter(s => s !== 'الكل').map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            )}

            {/* Sort Dropdown */}
            <select
              aria-label="ترتيب النتائج"
              value={filter.sortBy}
              onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
              className="bg-black/40 text-neutral-300 border border-white/15 rounded-xl text-xs sm:text-sm py-2 px-3 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="popular">الأكثر طلباً</option>
              <option value="newest">الأحدث إضافة</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="price-low">السعر: من الأقل</option>
              <option value="price-high">السعر: من الأعلى</option>
            </select>
          </div>

        </div>

        {/* Categories Pills & Quick Toggles */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = filter.selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onFilterChange({ selectedCategory: cat.id })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                      : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Free tools filter toggle */}
          {filter.selectedType !== 'services' && (
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-300 select-none bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-amber-400/30">
              <input
                type="checkbox"
                checked={filter.onlyFree}
                onChange={(e) => onFilterChange({ onlyFree: e.target.checked })}
                className="w-3.5 h-3.5 rounded bg-black/50 border-neutral-600 text-amber-500 focus:ring-amber-500/20 accent-amber-500"
              />
              <span>الأدوات المجانية فقط</span>
            </label>
          )}

        </div>

      </div>
    </div>
  );
};
