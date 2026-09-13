import React from 'react';
import { 
  Star, 
  Download, 
  ShoppingBag, 
  Eye, 
  Heart, 
  Layers, 
  Sparkles,
  FileCheck2
} from 'lucide-react';
import { DesignTool, Currency } from '../types';
import { formatPrice, calculateDiscountPercentage } from '../utils/formatters';

interface ProductCardProps {
  tool: DesignTool;
  currency: Currency;
  isWishlisted: boolean;
  onToggleWishlist: (tool: DesignTool) => void;
  onAddToCart: (tool: DesignTool) => void;
  onOpenPreview: (tool: DesignTool) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  tool,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onOpenPreview,
}) => {
  const discount = calculateDiscountPercentage(tool.price, tool.originalPrice);

  return (
    <div 
      className="group relative flex flex-col bg-[#161922] rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-amber-500/10"
      id={`product-card-${tool.id}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        <img
          src={tool.image}
          alt={tool.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-300 border border-white/15">
            {tool.categoryLabel}
          </span>
          {discount && (
            <span className="text-[11px] font-black px-2 py-1 rounded-md bg-rose-500 text-white shadow-sm">
              -{discount}%
            </span>
          )}
          {tool.isFree && (
            <span className="text-[11px] font-black px-2.5 py-1 rounded-md bg-emerald-500 text-white shadow-sm">
              مجاني
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(tool);
          }}
          className={`absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md transition-colors ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-black/60 text-neutral-300 hover:text-white hover:bg-black/80'
          }`}
          title="حفظ في المفضلة"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Software compatibility pills on thumbnail */}
        <div className="absolute bottom-2.5 right-3 flex items-center gap-1.5 flex-wrap">
          {tool.software.slice(0, 3).map((soft) => (
            <span 
              key={soft} 
              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-300 border border-white/10"
            >
              {soft}
            </span>
          ))}
          {tool.software.length > 3 && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-neutral-900/90 text-neutral-400">
              +{tool.software.length - 3}
            </span>
          )}
        </div>

        {/* Quick View Button on hover overlay */}
        <button
          onClick={() => onOpenPreview(tool)}
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <span className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-white text-black shadow-xl hover:scale-105 transition-transform">
            <Eye className="w-4 h-4" />
            معاينة سريعة
          </span>
        </button>
      </div>

      {/* Body Information */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          {/* Rating and Downloads */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{tool.rating.toFixed(1)}</span>
              <span className="text-neutral-500 font-normal">({tool.reviewsCount})</span>
            </div>
            <div className="flex items-center gap-1 text-neutral-400 font-medium">
              <Download className="w-3.5 h-3.5 text-neutral-500" />
              <span>{tool.downloadsCount.toLocaleString('ar-SA')} تحميل</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onOpenPreview(tool)}
            className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-2 leading-snug mb-1.5"
          >
            {tool.title}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-4">
            {tool.description}
          </p>

          {/* File format & size info */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 pb-3 mb-4 border-b border-white/5">
            <span className="flex items-center gap-1 font-mono text-neutral-300">
              <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
              {tool.fileFormats.join(', ')}
            </span>
            <span>•</span>
            <span>{tool.fileSize}</span>
          </div>
        </div>

        {/* Pricing and Action Button */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-lg font-black text-amber-400">
              {formatPrice(tool.price, currency)}
            </div>
            {tool.originalPrice && tool.originalPrice > tool.price && (
              <div className="text-xs text-neutral-500 line-through">
                {formatPrice(tool.originalPrice, currency)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenPreview(tool)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
              title="التفاصيل والمعاينة"
            >
              <Eye className="w-4 h-4" />
            </button>

            <button
              id={`add-to-cart-${tool.id}`}
              onClick={() => onAddToCart(tool)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                tool.isFree
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20'
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
              }`}
            >
              {tool.isFree ? (
                <>
                  <Download className="w-4 h-4" />
                  <span>تحميل مباشر</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>شراء الآن</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
