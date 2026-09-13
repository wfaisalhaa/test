import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, XCircle, Trash2, Copy, Sparkles } from 'lucide-react';
import { AdminCoupon } from '../../types';

interface AdminCouponsTabProps {
  coupons: AdminCoupon[];
  onAddNewCoupon: () => void;
  onToggleCoupon: (couponId: string) => void;
  onDeleteCoupon: (couponId: string) => void;
  onToast: (msg: string) => void;
}

export const AdminCouponsTab: React.FC<AdminCouponsTabProps> = ({
  coupons,
  onAddNewCoupon,
  onToggleCoupon,
  onDeleteCoupon,
  onToast,
}) => {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    onToast(`تم نسخ الكود: ${code}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#141722] p-5 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">كوبونات الخصم والحملات التسويقية</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            إدارة الخصومات الترويجية وتحديد نسب التخفيض وحدود الاستخدام وتواريخ الانتهاء
          </p>
        </div>

        <button
          onClick={onAddNewCoupon}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md shadow-amber-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء كوبون جديد</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map((coupon) => {
          const usagePercent = Math.min(100, Math.round((coupon.usageCount / coupon.usageLimit) * 100));
          return (
            <div 
              key={coupon.id}
              className={`p-5 rounded-2xl border shadow-lg space-y-4 transition-all ${
                coupon.isActive 
                  ? 'bg-[#141722] border-white/10 hover:border-amber-500/30' 
                  : 'bg-[#10121a]/60 border-white/5 opacity-60'
              }`}
            >
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <div 
                  onClick={() => copyCode(coupon.code)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-black text-sm tracking-wider cursor-pointer hover:bg-amber-500/20 transition-colors"
                  title="انقر لنسخ الكود"
                >
                  <span>{coupon.code}</span>
                  <Copy className="w-3.5 h-3.5 opacity-60" />
                </div>

                <button
                  onClick={() => onToggleCoupon(coupon.id)}
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                    coupon.isActive
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                  }`}
                >
                  {coupon.isActive ? 'نشط ومفعل' : 'معطل مؤقتاً'}
                </button>
              </div>

              {/* Discount Percentage */}
              <div className="flex items-baseline gap-1.5 text-right">
                <span className="text-3xl font-black text-white font-mono">{coupon.discountPercent}%</span>
                <span className="text-xs text-neutral-400 font-bold">خصم فوري على السلة</span>
              </div>

              {/* Usage Progress */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[11px] text-neutral-400">
                  <span>تم الاستخدام:</span>
                  <span className="font-mono text-neutral-200">
                    {coupon.usageCount} من {coupon.usageLimit} مرة
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-500 transition-all"
                    style={{ width: `${usagePercent}%` }}
                  />
                </div>
              </div>

              {/* Meta & Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                <span className="text-[11px]">ينتهي: {coupon.expiryDate}</span>

                <button
                  onClick={() => onDeleteCoupon(coupon.id)}
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="حذف الكوبون"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
