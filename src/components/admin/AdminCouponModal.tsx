import React, { useState } from 'react';
import { X, Tag, Plus, Save } from 'lucide-react';
import { AdminCoupon } from '../../types';

interface AdminCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (coupon: Omit<AdminCoupon, 'id' | 'usageCount'>) => void;
}

export const AdminCouponModal: React.FC<AdminCouponModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(20);
  const [usageLimit, setUsageLimit] = useState(200);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');
  const [minOrderAmount, setMinOrderAmount] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    onSave({
      code: code.toUpperCase().trim(),
      discountPercent,
      usageLimit,
      expiryDate,
      isActive: true,
      minOrderAmount,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#141722] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#10121a]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Tag className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">إنشاء كود تخفيض جديد</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-right text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-white">كود الخصم (Promo Code) *</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="مثال: DESIGN25"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white uppercase font-mono font-bold focus:outline-none focus:border-amber-400 text-center tracking-widest text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-white">نسبة الخصم (%) *</label>
              <input
                type="number"
                min="1"
                max="90"
                required
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">حد الاستخدام الأقصى</label>
              <input
                type="number"
                min="1"
                required
                value={usageLimit}
                onChange={(e) => setUsageLimit(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-white">تاريخ الانتهاء</label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">الحد الأدنى للطلب (ر.س)</label>
              <input
                type="number"
                min="0"
                value={minOrderAmount}
                onChange={(e) => setMinOrderAmount(Number(e.target.value))}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 font-bold"
            >
              إلغاء
            </button>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg shadow-amber-500/20"
            >
              <Save className="w-4 h-4" />
              <span>تفعيل الكود</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
