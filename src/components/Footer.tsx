import React, { useState } from 'react';
import { 
  Palette, 
  ShieldCheck, 
  DownloadCloud, 
  Headphones, 
  Sparkles, 
  Send, 
  Check, 
  Heart,
  FileText
} from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onOpenLab: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenLab, onOpenAdmin }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="bg-[#0b0d13] border-t border-white/10 text-neutral-400 text-xs">
      
      {/* Guarantees Bar */}
      <div className="border-b border-white/10 py-8 bg-[#0f1118]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <DownloadCloud className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">تنزيل فوري مباشر</h5>
                <p className="text-[11px] text-neutral-400">وصول فوري لكافة الملفات بعد الدفع</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">تراخيص تجارية معتمدة</h5>
                <p className="text-[11px] text-neutral-400">استخدام غير محدود في أعمالك وعملائك</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-violet-400" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">دعم وتوجيه للمصممين</h5>
                <p className="text-[11px] text-neutral-400">فريقنا متواجد للمساعدة في التثبيت والتخصيص</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">تحديثات دورية مجانية</h5>
                <p className="text-[11px] text-neutral-400">تحسين مستمر وإضافة مكونات جديدة مجاناً</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black">
                <Palette className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white font-serif tracking-tight">مِداد</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              المتجر العربي المتخصص في تزويد المصممين والمطورين والشركات بأرقى أدوات الواجهات الرقمية، الخطوط العربية المتقنة، وخدمات الهوية البصرية وتجربة المستخدم بمعايير عالمية.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300">
              <Sparkles className="w-4 h-4" />
              <span>صنع بشغف للمجتمع الإبداعي العربي</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">أدوات وملحقات التصميم</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('ui-ux')} className="hover:text-amber-400 transition-colors">
                  أنظمة تصميم Figma وواجهات UI
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('fonts')} className="hover:text-amber-400 transition-colors">
                  الخطوط العربية المعاصرة
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('3d-icons')} className="hover:text-amber-400 transition-colors">
                  أيقونات وعناصر 3D لـ Blender
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('mockups')} className="hover:text-amber-400 transition-colors">
                  موك اب ونماذج العرض الواقعية
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('brushes')} className="hover:text-amber-400 transition-colors">
                  فرش Procreate والرسم الرقمي
                </button>
              </li>
            </ul>
          </div>

          {/* Design Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">خدمات الاستوديو</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectCategory('branding')} className="hover:text-violet-400 transition-colors">
                  تصميم الهوية البصرية المتكاملة
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('ui-ux')} className="hover:text-violet-400 transition-colors">
                  تصميم وتطوير واجهات UI/UX
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('all')} className="hover:text-violet-400 transition-colors">
                  إنتاج موشن جرافيك وفيديو إعلاني
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('fonts')} className="hover:text-violet-400 transition-colors">
                  تصميم خطوط عربية مخصصة
                </button>
              </li>
              <li>
                <button onClick={onOpenLab} className="text-amber-400 hover:underline flex items-center gap-1 font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>مختبر المصمم وحاسبة التكلفة</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">نشرة الإلهام الأسبوعية</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              اشترك لتصلك أدوات مجانية أسبوعية، ملحقات Figma حصرية، ومقالات في فلسفة التصميم.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="بريدك الإلكتروني..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>تم الاشتراك بنجاح!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>اشترك الآن</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© 2026 مِداد ديزاين (Medad Design Store). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hover:text-neutral-400 cursor-pointer">سياسة الخصوصية</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">شروط الاستخدام والتراخيص</span>
            <span>•</span>
            <span className="hover:text-neutral-400 cursor-pointer">الأسئلة الشائعة</span>
            {onOpenAdmin && (
              <>
                <span>•</span>
                <button
                  onClick={onOpenAdmin}
                  className="text-amber-400 hover:text-amber-300 font-bold transition-colors"
                >
                  لوحة التحكم (Admin)
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
