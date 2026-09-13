import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Download, 
  ShoppingBag, 
  Check, 
  Copy, 
  ShieldCheck, 
  Sliders, 
  Type, 
  Layers, 
  FileCheck2, 
  ExternalLink 
} from 'lucide-react';
import { DesignTool, Currency } from '../types';
import { formatPrice, calculateDiscountPercentage } from '../utils/formatters';

interface ProductDetailModalProps {
  tool: DesignTool | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (tool: DesignTool, license?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  tool,
  currency,
  onClose,
  onAddToCart,
}) => {
  if (!tool) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedLicense, setSelectedLicense] = useState<'standard' | 'extended'>('standard');
  const [testText, setTestText] = useState(tool.sampleFontText || 'خط عربي معاصر يفيض بالجمال والاتزان الهندسي');
  const [fontSize, setFontSize] = useState(32);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const images = tool.galleryImages?.length > 0 ? tool.galleryImages : [tool.image];
  const discount = calculateDiscountPercentage(tool.price, tool.originalPrice);

  const finalPrice = selectedLicense === 'extended' ? Math.round(tool.price * 1.8) : tool.price;

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#141722] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#10121a]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
              {tool.categoryLabel}
            </span>
            <span className="text-xs text-neutral-400 font-mono">الإصدار {tool.version}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Main Hero Media & Purchase Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Gallery Column */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
                <img
                  src={images[activeImageIndex] || tool.image}
                  alt={tool.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx ? 'border-amber-400 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Software compatibility specs */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                <span className="text-xs font-bold text-neutral-300 block">المواصفات التقنية والبرمجية:</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[11px]">البرامج المتوافقة:</span>
                    <span className="text-neutral-200 font-medium">{tool.software.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">صيغ الملفات:</span>
                    <span className="text-neutral-200 font-mono font-medium">{tool.fileFormats.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">حجم الملف:</span>
                    <span className="text-neutral-200 font-medium">{tool.fileSize}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Meta & Pricing Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1 text-amber-400 font-bold text-xs">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{tool.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-neutral-400 text-xs">({tool.reviewsCount} تقييم)</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400 text-xs">{tool.downloadsCount} تنزيل</span>
                </div>

                <h2 className="text-xl font-black text-white leading-snug mb-2">
                  {tool.title}
                </h2>
                <p className="text-xs font-mono text-amber-400/80 mb-3">{tool.titleEn}</p>

                <p className="text-xs text-neutral-300 leading-relaxed mb-6">
                  {tool.detailedDescription}
                </p>

                {/* License Picker */}
                {!tool.isFree && (
                  <div className="space-y-2 mb-6">
                    <label className="text-xs font-bold text-neutral-300 block">اختر نوع الترخيص:</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedLicense('standard')}
                        className={`p-3 rounded-xl text-right border text-xs transition-all ${
                          selectedLicense === 'standard'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="block font-bold">ترخيص تجاري فردي</span>
                        <span className="text-[10px] text-neutral-400">مشروع تجاري واحد غير محدود</span>
                      </button>

                      <button
                        onClick={() => setSelectedLicense('extended')}
                        className={`p-3 rounded-xl text-right border text-xs transition-all ${
                          selectedLicense === 'extended'
                            ? 'bg-amber-400/10 border-amber-400 text-white'
                            : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <span className="block font-bold">ترخيص وكالات موسع</span>
                        <span className="text-[10px] text-neutral-400">مشاريع غير محدودة لعملائك</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Price & Checkout Area */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-black text-amber-400">
                      {formatPrice(finalPrice, currency)}
                    </span>
                    {tool.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through mr-2">
                        {formatPrice(tool.originalPrice, currency)}
                      </span>
                    )}
                  </div>

                  {discount && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      وفرت {discount}%
                    </span>
                  )}
                </div>

                <button
                  id="modal-purchase-btn"
                  onClick={() => {
                    onAddToCart(tool, selectedLicense);
                    onClose();
                  }}
                  className={`w-full py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
                    tool.isFree
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/25'
                      : 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/25'
                  }`}
                >
                  {tool.isFree ? (
                    <>
                      <Download className="w-4 h-4" />
                      <span>تحميل فوري مجاني</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>إضافة إلى السلة والدفع</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>تحميل مباشر وتحديثات مدى الحياة مجاناً</span>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Font Previewer (If Category is Fonts) */}
          {tool.category === 'fonts' && (
            <div className="bg-[#10121a] p-5 rounded-2xl border border-amber-400/20 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">مختبر تجربة الخط التفاعلي</span>
                </div>
                
                {/* Font Size Slider */}
                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-400 font-mono">{fontSize}px</span>
                  <input
                    type="range"
                    min="18"
                    max="72"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-28 sm:w-36 accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Text Input */}
              <input
                type="text"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="اكتب أي نص لمعاينته بالخط..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />

              {/* Preview Canvas Box */}
              <div 
                className="p-6 rounded-xl bg-black/60 border border-white/5 text-amber-100 text-center select-all min-h-[100px] flex items-center justify-center leading-normal"
                style={{ fontSize: `${fontSize}px` }}
              >
                {testText || 'أدخل نصاً للتجربة'}
              </div>
            </div>
          )}

          {/* Sample Colors Swatches (If UI Kit) */}
          {tool.sampleColors && (
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2">
              <span className="text-xs font-bold text-neutral-300 block">لوحة الألوان المدمجة في النظام (انقر للنسخ):</span>
              <div className="flex items-center gap-2 flex-wrap">
                {tool.sampleColors.map((hex) => (
                  <button
                    key={hex}
                    onClick={() => handleCopyColor(hex)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 hover:border-amber-400 text-xs font-mono text-neutral-300"
                  >
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: hex }} />
                    <span>{hex}</span>
                    {copiedColor === hex && <Check className="w-3 h-3 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Included Features List */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-400" />
              <span>محتويات الحزمة بالتفصيل:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tool.contentsList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 bg-white/5 p-3 rounded-xl border border-white/5 text-xs text-neutral-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
