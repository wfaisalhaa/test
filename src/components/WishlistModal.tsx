import React from 'react';
import { X, Heart, Trash2, ShoppingBag, Eye } from 'lucide-react';
import { DesignTool, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: DesignTool[];
  currency: Currency;
  onAddToCart: (tool: DesignTool) => void;
  onRemoveFromWishlist: (tool: DesignTool) => void;
  onOpenPreview: (tool: DesignTool) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  currency,
  onAddToCart,
  onRemoveFromWishlist,
  onOpenPreview,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl bg-[#141722] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#10121a]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-bold text-white">قائمة المفضلة ({wishlistItems.length})</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {wishlistItems.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 space-y-2">
              <Heart className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-sm font-bold text-neutral-300">لم تضف أي أدوات إلى المفضلة بعد</p>
              <p className="text-xs text-neutral-500">انقر على رمز القلب على أي أداة لحفظها هنا والرجوع إليها لاحقاً.</p>
            </div>
          ) : (
            wishlistItems.map((tool) => (
              <div 
                key={tool.id}
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-3 text-right"
              >
                <img
                  src={tool.image}
                  alt={tool.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover bg-neutral-900 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 
                    onClick={() => { onOpenPreview(tool); onClose(); }}
                    className="text-xs font-bold text-white truncate cursor-pointer hover:text-amber-300"
                  >
                    {tool.title}
                  </h4>
                  <span className="text-[11px] text-neutral-400 block">{tool.categoryLabel}</span>
                  <span className="text-xs font-black text-amber-400 font-mono mt-0.5 block">
                    {formatPrice(tool.price, currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      onAddToCart(tool);
                      onRemoveFromWishlist(tool);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>للسلة</span>
                  </button>

                  <button
                    onClick={() => onRemoveFromWishlist(tool)}
                    className="p-1.5 text-neutral-500 hover:text-rose-400"
                    title="إزالة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
