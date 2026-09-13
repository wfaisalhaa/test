import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowLeft, 
  ShieldCheck, 
  DownloadCloud, 
  Tag, 
  Check, 
  FileText,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: Currency;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [customerEmail, setCustomerEmail] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'MEDAD20' || code === 'DESIGN2026') {
      setDiscountPercent(20);
    } else if (code === 'VIP10') {
      setDiscountPercent(10);
    } else {
      setCouponError('كوبون غير صالح. جرب كود MEDAD20');
    }
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail) {
      alert('يرجى إدخال البريد الإلكتروني لاستلام روابط التحميل والفاتورة');
      return;
    }
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutComplete(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#131620] border-r border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 bg-[#0f1118] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">سلة المشتريات</h3>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-neutral-300 font-bold">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content or Empty State or Success */}
          {checkoutComplete ? (
            <div className="flex-1 p-6 text-center overflow-y-auto space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-black text-white mb-1">اكتمل الطلب بنجاح!</h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  تم إرسال روابط التحميل والتراخيص والفاتورة إلى بريدك الإلكتروني:
                  <strong className="block text-amber-400 font-mono mt-1">{customerEmail}</strong>
                </p>
              </div>

              {/* Download Keys List */}
              <div className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-3 text-right">
                <span className="text-xs font-bold text-neutral-300 block mb-2">روابط التحميل المباشرة:</span>
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs">
                    <div className="truncate flex-1 min-w-0 pr-1">
                      <span className="font-bold text-white block truncate">{item.title}</span>
                      <span className="text-[10px] text-emerald-400 font-mono">رخصة تجارية مفعلة</span>
                    </div>
                    <button 
                      onClick={() => alert(`جاري تنزيل حزمة: ${item.title}`)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold text-[11px] shrink-0 hover:bg-amber-400"
                    >
                      <DownloadCloud className="w-3.5 h-3.5" />
                      <span>تحميل</span>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setCheckoutComplete(false);
                  onClearCart();
                  onClose();
                }}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs"
              >
                متابعة التسوق
              </button>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-white">السلة فارغة حالياً</h4>
              <p className="text-xs text-neutral-400 max-w-xs leading-relaxed">
                استكشف أنظمة التصميم، قوالب Figma، والخطوط العربية وأضف أدواتك المفضلة لبدء العمل.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-md"
              >
                تصفح الأدوات والخدمات
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex gap-3 items-center text-right"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-white truncate leading-snug">
                      {item.title}
                    </h5>
                    {item.selectedPackage && (
                      <span className="text-[10px] text-violet-300 font-medium block">
                        باقة: {item.selectedPackage}
                      </span>
                    )}
                    <span className="text-xs font-black text-amber-400 block mt-1">
                      {formatPrice(item.price, currency)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-black/50 rounded-lg border border-white/10 px-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-neutral-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                        title="حذف العنصر"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyCoupon} className="pt-2">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="كوبون الخصم (جرب MEDAD20)"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 uppercase font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-neutral-200 text-xs font-bold shrink-0 border border-white/10"
                  >
                    تطبيق
                  </button>
                </div>
                {discountPercent > 0 && (
                  <p className="text-[11px] text-emerald-400 mt-1 font-bold">
                    تم تطبيق خصم {discountPercent}% بنجاح!
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-rose-400 mt-1 font-medium">
                    {couponError}
                  </p>
                )}
              </form>

              {/* Quick license guarantee */}
              <div className="flex items-center gap-2 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-[11px] text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>جميع الأدوات تشمل ترخيصاً تجارياً مفتوحاً للمشاريع.</span>
              </div>
            </div>
          )}

          {/* Footer Subtotal & Checkout */}
          {!checkoutComplete && cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-[#0f1118] space-y-4">
              
              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>المجموع الفرعي:</span>
                  <span className="font-mono">{formatPrice(subtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>خصم الكوبون ({discountPercent}%):</span>
                    <span className="font-mono">-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/10">
                  <span>المبلغ الإجمالي:</span>
                  <span className="text-amber-400 font-mono text-base">{formatPrice(total, currency)}</span>
                </div>
              </div>

              {/* Email prompt for download keys delivery */}
              <div className="space-y-1.5 text-right">
                <label className="text-[11px] text-neutral-300 font-bold block">
                  البريد الإلكتروني لاستلام روابط التنزيل الفورية:
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 text-left"
                />
              </div>

              {/* Submit Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>جاري معالجة الطلب...</span>
                ) : (
                  <>
                    <DownloadCloud className="w-4 h-4" />
                    <span>إتمام الدفع واستلام الملفات فوراً</span>
                  </>
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
