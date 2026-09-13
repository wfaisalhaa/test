import React, { useState, useEffect } from 'react';
import { X, Save, Layers, Sparkles, Image as ImageIcon } from 'lucide-react';
import { DesignTool, SoftwareCompatibility } from '../../types';

interface AdminToolModalProps {
  isOpen: boolean;
  tool: DesignTool | null; // null means adding new tool
  onClose: () => void;
  onSave: (toolData: Partial<DesignTool>) => void;
}

const ALL_SOFTWARE: SoftwareCompatibility[] = [
  'Figma',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe After Effects',
  'Blender',
  'Procreate',
  'Webflow'
];

export const AdminToolModal: React.FC<AdminToolModalProps> = ({
  isOpen,
  tool,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    category: 'ui-ux' as DesignTool['category'],
    categoryLabel: 'أنظمة وتصميم الواجهات',
    description: '',
    detailedDescription: '',
    price: 99,
    originalPrice: 149,
    isFree: false,
    fileSize: '45 MB',
    version: '1.0',
    license: 'ترخيص تجاري وشخصي' as DesignTool['license'],
    software: ['Figma'] as SoftwareCompatibility[],
    fileFormats: ['.fig', '.json'],
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=800&auto=format&fit=crop',
    tags: ['Figma', 'UI Kit', 'RTL'],
    featured: false,
  });

  useEffect(() => {
    if (tool) {
      setFormData({
        title: tool.title,
        titleEn: tool.titleEn,
        category: tool.category,
        categoryLabel: tool.categoryLabel,
        description: tool.description,
        detailedDescription: tool.detailedDescription,
        price: tool.price,
        originalPrice: tool.originalPrice || Math.round(tool.price * 1.3),
        isFree: !!tool.isFree,
        fileSize: tool.fileSize,
        version: tool.version,
        license: tool.license,
        software: [...tool.software],
        fileFormats: [...tool.fileFormats],
        image: tool.image,
        tags: [...tool.tags],
        featured: !!tool.featured,
      });
    } else {
      setFormData({
        title: '',
        titleEn: '',
        category: 'ui-ux',
        categoryLabel: 'أنظمة وتصميم الواجهات',
        description: '',
        detailedDescription: '',
        price: 99,
        originalPrice: 149,
        isFree: false,
        fileSize: '45 MB',
        version: '1.0',
        license: 'ترخيص تجاري وشخصي',
        software: ['Figma'],
        fileFormats: ['.fig'],
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
        tags: ['تصميم', 'جديد'],
        featured: false,
      });
    }
  }, [tool, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (cat: DesignTool['category']) => {
    const labels: Record<DesignTool['category'], string> = {
      'ui-ux': 'أنظمة وتصميم الواجهات',
      'fonts': 'الخطوط العربية والطباعة',
      '3d-icons': 'عناصر وأيقونات ثلاثية الأبعاد',
      'mockups': 'الموك اب وقوالب العرض',
      'brushes': 'فرش وأدوات الرسم الرقمي',
      'motion': 'قوالب الموشن جرافيك والمونتاج',
    };
    setFormData((prev) => ({
      ...prev,
      category: cat,
      categoryLabel: labels[cat] || 'أداة تصميم',
    }));
  };

  const toggleSoftware = (sw: SoftwareCompatibility) => {
    setFormData((prev) => {
      const exists = prev.software.includes(sw);
      return {
        ...prev,
        software: exists ? prev.software.filter((s) => s !== sw) : [...prev.software, sw],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-3xl bg-[#141722] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#10121a]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {tool ? 'تعديل بيانات الأداة الرقمية' : 'إضافة أداة / ملحق تصميم جديد'}
              </h3>
              <p className="text-xs text-neutral-400">
                {tool ? `معرّف المنتج: ${tool.id}` : 'نشر أداة جديدة لتكون متاحة للبيع في المتجر فوراً'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-right text-xs">
          
          {/* Titles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-white">اسم الأداة (بالعربية) *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="مثال: نظام تصميم «أفق» المتكامل للواجهات"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">اسم الأداة (بالإنجليزية) *</label>
              <input
                type="text"
                required
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                placeholder="e.g. Ufoq UI Kit & Design System"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-sans"
                dir="ltr"
              />
            </div>
          </div>

          {/* Category & License */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-white">الفئة الرئيسية *</label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value as any)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="ui-ux">أنظمة وتصميم الواجهات UI/UX</option>
                <option value="fonts">الخطوط العربية والطباعة</option>
                <option value="3d-icons">أيقونات وعناصر 3D</option>
                <option value="mockups">نماذج العرض والموك اب</option>
                <option value="brushes">فرش وأدوات الرسم الرقمي</option>
                <option value="motion">قوالب الموشن جرافيك</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">نوع الترخيص الافتراضي *</label>
              <select
                value={formData.license}
                onChange={(e) => setFormData({ ...formData, license: e.target.value as any })}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              >
                <option value="ترخيص تجاري وشخصي">ترخيص تجاري وشخصي</option>
                <option value="ترخيص استخدام شخصي">ترخيص استخدام شخصي فقط</option>
                <option value="ترخيص غير محدود">ترخيص غير محدود للمؤسسات</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-white">الإصدار والحجم</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  placeholder="v2.1"
                  className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-2.5 text-white focus:outline-none text-center font-mono"
                />
                <input
                  type="text"
                  value={formData.fileSize}
                  onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                  placeholder="85 MB"
                  className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-2.5 text-white focus:outline-none text-center font-mono"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Free Toggle */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isFree}
                onChange={(e) => setFormData({ ...formData, isFree: e.target.checked, price: e.target.checked ? 0 : 99 })}
                className="w-4 h-4 rounded text-amber-500 focus:ring-0"
              />
              <span className="font-bold text-amber-400">أداة مجانية للتحميل المباشر</span>
            </label>

            {!formData.isFree && (
              <>
                <div className="space-y-1">
                  <label className="text-neutral-400 font-medium">السعر (ر.س) *</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 font-medium">السعر قبل الخصم (ر.س)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </>
            )}
          </div>

          {/* Software Compatibility */}
          <div className="space-y-2">
            <label className="font-bold text-white block">البرمجيات المتوافقة *</label>
            <div className="flex flex-wrap gap-2">
              {ALL_SOFTWARE.map((sw) => {
                const isSelected = formData.software.includes(sw);
                return (
                  <button
                    type="button"
                    key={sw}
                    onClick={() => toggleSoftware(sw)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isSelected 
                        ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20' 
                        : 'bg-white/5 text-neutral-400 border border-white/5 hover:bg-white/10'
                    }`}
                  >
                    {sw}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Image URL & Preview */}
          <div className="space-y-2">
            <label className="font-bold text-white">رابط صورة الغلاف / المعاينة *</label>
            <div className="flex items-center gap-3">
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                dir="ltr"
              />
              <img 
                src={formData.image} 
                alt="معاينة" 
                referrerPolicy="no-referrer"
                className="w-11 h-11 rounded-lg object-cover bg-neutral-900 border border-white/10 shrink-0" 
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-1.5">
            <label className="font-bold text-white">الوصف المختصر (يظهر في البطاقة) *</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="وصف جذاب من سطرين يوضح مزايا الأداة..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-white">الوصف التفصيلي وقائمة المكونات</label>
            <textarea
              rows={3}
              value={formData.detailedDescription}
              onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
              placeholder="شرح كامل لمكونات الحزمة وما يحصل عليه المصمم..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div>
              <span className="font-bold text-white block">تمييز الأداة في الصفحة الرئيسية</span>
              <span className="text-[11px] text-neutral-400">وضع شارة "مميز" وإظهارها في صدارة التوصيات</span>
            </div>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-5 h-5 rounded text-amber-500 focus:ring-0"
            />
          </div>

          {/* Actions */}
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
              <span>{tool ? 'حفظ التعديلات' : 'نشر الأداة الآن'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
