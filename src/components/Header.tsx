import React, { useState } from 'react';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Search, 
  SlidersHorizontal, 
  Wand2, 
  Layers, 
  Briefcase, 
  Menu, 
  X,
  Palette,
  LayoutDashboard
} from 'lucide-react';
import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/mockData';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAdmin: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeSection: 'all' | 'tools' | 'services' | 'lab';
  onSelectSection: (s: 'all' | 'tools' | 'services' | 'lab') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenWishlist,
  onOpenAdmin,
  searchQuery,
  onSearchChange,
  activeSection,
  onSelectSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0f1117]/90 backdrop-blur-md">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-500/20 via-violet-500/20 to-amber-500/20 border-b border-white/5 py-1.5 px-4 text-center text-xs font-medium text-amber-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>عروض موسم التصميم: استخدم كود <strong className="font-bold underline tracking-wider">MEDAD20</strong> للحصول على خصم 20% على جميع الأدوات والخدمات</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => onSelectSection('all')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="site-logo"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200">
              <Palette className="w-6 h-6 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white font-serif">مِداد</span>
                <span className="text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">DESIGN</span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">متجر أدوات وخدمات التصميم</p>
            </div>
          </div>

          {/* Center Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              id="nav-all"
              onClick={() => onSelectSection('all')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeSection === 'all'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              الرئيسية والمتجر
            </button>
            <button
              id="nav-tools"
              onClick={() => onSelectSection('tools')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeSection === 'tools'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              أدوات وملحقات رقمية
            </button>
            <button
              id="nav-services"
              onClick={() => onSelectSection('services')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeSection === 'services'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              خدمات التصميم
            </button>
            <button
              id="nav-lab"
              onClick={() => onSelectSection('lab')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeSection === 'lab'
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              مختبر المصمم
            </button>
          </nav>

          {/* Right Action Icons & Currency */}
          <div className="flex items-center gap-3">
            
            {/* Currency Switcher */}
            <div className="relative">
              <select
                aria-label="اختر العملة"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-neutral-800/90 text-neutral-200 border border-white/10 rounded-lg text-xs font-semibold py-2 px-2.5 cursor-pointer hover:border-amber-400/50 focus:outline-none focus:ring-1 focus:ring-amber-400"
              >
                {Object.entries(CURRENCY_RATES).map(([code, item]) => (
                  <option key={code} value={code} className="bg-neutral-900 text-white">
                    {code} ({item.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-btn"
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-amber-400 transition-colors"
              title="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0f1117]">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button
              id="cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 py-2 px-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-md shadow-amber-500/20 transition-all duration-150"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">السلة</span>
              {cartCount > 0 && (
                <span className="bg-black text-amber-400 text-xs px-2 py-0.5 rounded-full font-black">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin Dashboard Trigger */}
            <button
              id="admin-btn"
              onClick={onOpenAdmin}
              className="hidden lg:flex items-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/30 text-neutral-300 hover:text-amber-400 font-bold text-xs transition-all duration-150"
              title="لوحة تحكم المتجر الكاملة"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-400" />
              <span>لوحة التحكم</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-white/5 text-neutral-300 border border-white/10"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => { onSelectSection('all'); setIsMobileMenuOpen(false); }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-semibold ${
                activeSection === 'all' ? 'bg-amber-500 text-black' : 'text-neutral-300 hover:bg-white/5'
              }`}
            >
              الرئيسية والمتجر
            </button>
            <button
              onClick={() => { onSelectSection('tools'); setIsMobileMenuOpen(false); }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                activeSection === 'tools' ? 'bg-amber-500 text-black' : 'text-neutral-300 hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              أدوات وملحقات رقمية
            </button>
            <button
              onClick={() => { onSelectSection('services'); setIsMobileMenuOpen(false); }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                activeSection === 'services' ? 'bg-amber-500 text-black' : 'text-neutral-300 hover:bg-white/5'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              خدمات التصميم
            </button>
            <button
              onClick={() => { onSelectSection('lab'); setIsMobileMenuOpen(false); }}
              className={`text-right px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                activeSection === 'lab' ? 'bg-amber-500 text-black' : 'text-neutral-300 hover:bg-white/5'
              }`}
            >
              <Wand2 className="w-4 h-4" />
              مختبر المصمم
            </button>
            <button
              onClick={() => { onOpenAdmin(); setIsMobileMenuOpen(false); }}
              className="text-right px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 text-amber-400 bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20"
            >
              <LayoutDashboard className="w-4 h-4" />
              لوحة التحكم الكاملة (Admin)
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
