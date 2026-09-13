import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  CreditCard, 
  Megaphone, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  HelpCircle,
  Building
} from 'lucide-react';
import { StoreSettings } from '../../types';

interface AdminSettingsTabProps {
  settings: StoreSettings;
  onSaveSettings: (newSettings: StoreSettings) => void;
  onToast: (msg: string) => void;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({
  settings,
  onSaveSettings,
  onToast,
}) => {
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    onToast('تم حفظ وتحديث إعدادات المتجر بنجاح!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in text-right text-xs">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-[#141722] p-5 rounded-2xl border border-white/10 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">إعدادات المنصة والمتجر</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            إدارة بيانات المتجر، بوابات الدفع الإلكتروني، الضرائب والإعلانات العلوية
          </p>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg shadow-amber-500/20"
        >
          <Save className="w-4 h-4" />
          <span>حفظ التغييرات</span>
        </button>
      </div>

      {/* General Store Details */}
      <div className="p-6 rounded-2xl bg-[#141722] border border-white/10 shadow-xl space-y-5">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <Building className="w-4 h-4 text-amber-400" />
          <span>المعلومات الأساسية للمتجر</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-white">اسم المتجر / العلامة</label>
            <input
              type="text"
              required
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-white">الشعار اللفظي (Tagline)</label>
            <input
              type="text"
              value={formData.storeTagline}
              onChange={(e) => setFormData({ ...formData, storeTagline: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-white">البريد الإلكتروني الرسمي للتواصل</label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
              dir="ltr"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-white">هاتف الدعم وخدمة العملاء</label>
            <input
              type="text"
              value={formData.supportPhone}
              onChange={(e) => setFormData({ ...formData, supportPhone: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono"
              dir="ltr"
            />
          </div>
        </div>
      </div>

      {/* Payment Gateways & Tax */}
      <div className="p-6 rounded-2xl bg-[#141722] border border-white/10 shadow-xl space-y-5">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>بوابات الدفع الإلكتروني والضرائب</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <label className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20">
            <div>
              <span className="font-bold text-white block">مدى (Mada)</span>
              <span className="text-[10px] text-neutral-400">بطاقات الصراف السعودية</span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableMada}
              onChange={(e) => setFormData({ ...formData, enableMada: e.target.checked })}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0"
            />
          </label>

          <label className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20">
            <div>
              <span className="font-bold text-white block">Apple Pay</span>
              <span className="text-[10px] text-neutral-400">الدفع السريع بنقرة واحدة</span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableApplePay}
              onChange={(e) => setFormData({ ...formData, enableApplePay: e.target.checked })}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0"
            />
          </label>

          <label className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20">
            <div>
              <span className="font-bold text-white block">فيزا وماستركارد</span>
              <span className="text-[10px] text-neutral-400">البطاقات الائتمانية العالمية</span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableCreditCard}
              onChange={(e) => setFormData({ ...formData, enableCreditCard: e.target.checked })}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0"
            />
          </label>

          <label className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between cursor-pointer hover:border-white/20">
            <div>
              <span className="font-bold text-white block">التحويل البنكي المباشر</span>
              <span className="text-[10px] text-neutral-400">لعقود ومشاريع الشركات</span>
            </div>
            <input
              type="checkbox"
              checked={formData.enableBankTransfer}
              onChange={(e) => setFormData({ ...formData, enableBankTransfer: e.target.checked })}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0"
            />
          </label>

        </div>

        <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-white">نسبة ضريبة القيمة المضافة (VAT %)</label>
            <input
              type="number"
              min="0"
              max="50"
              value={formData.taxRatePercent}
              onChange={(e) => setFormData({ ...formData, taxRatePercent: Number(e.target.value) })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono font-bold"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <div>
              <span className="font-bold text-white block">إتاحة التحميل المباشر التلقائي</span>
              <span className="text-[10px] text-neutral-400">إرسال روابط التنزيل فور تأكيد السداد</span>
            </div>
            <input
              type="checkbox"
              checked={formData.autoApproveDownloads}
              onChange={(e) => setFormData({ ...formData, autoApproveDownloads: e.target.checked })}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0"
            />
          </div>
        </div>

      </div>

      {/* Announcement Bar & Maintenance */}
      <div className="p-6 rounded-2xl bg-[#141722] border border-white/10 shadow-xl space-y-5">
        <h4 className="font-bold text-white text-sm flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-amber-400" />
          <span>شريط الإعلانات الترويجي العلوي</span>
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-bold text-white">نص الإعلان أو كود الخصم المعروض في أعلى المتجر</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnnouncementEnabled}
                onChange={(e) => setFormData({ ...formData, isAnnouncementEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-0"
              />
              <span className="text-neutral-300 font-bold">تفعيل الشريط</span>
            </label>
          </div>

          <input
            type="text"
            value={formData.announcementBar}
            onChange={(e) => setFormData({ ...formData, announcementBar: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
          <div>
            <span className="font-bold text-rose-300 block">وضع الصيانة المؤقت</span>
            <span className="text-[10px] text-neutral-400">إغلاق واجهة المتجر للمستخدمين العاديين للتطوير</span>
          </div>
          <input
            type="checkbox"
            checked={formData.maintenanceMode}
            onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
            className="w-5 h-5 rounded text-rose-500 focus:ring-0"
          />
        </div>
      </div>

    </form>
  );
};
