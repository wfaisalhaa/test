import React from 'react';
import { 
  Sparkles, 
  ArrowLeft, 
  Layers, 
  Briefcase, 
  ShieldCheck, 
  DownloadCloud, 
  Star, 
  CheckCircle2 
} from 'lucide-react';

interface HeroBannerProps {
  onExploreTools: () => void;
  onExploreServices: () => void;
  onOpenLab: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreTools,
  onExploreServices,
  onOpenLab,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#161922] via-[#0f1117] to-[#0f1117] border-b border-white/5 py-12 md:py-16">
      {/* Background glow accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>المتجر الرقمي الأول لمجتمع المصممين والشركات الإبداعية</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.25] tracking-tight mb-5">
              كل ما تحتاجه لصناعة تصاميم استثنائية:
              <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-l from-amber-300 via-amber-400 to-amber-500">
                أدوات رقمية احترافية وخدمات تصميم نخبوية
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-8">
              ارتقِ بمشاريعك الرقمية مع أنظمة Figma الجاهزة، الخطوط العربية المعاصرة، عناصر 3D الواقعية، أو اطلب خدمات الهوية البصرية وتجربة المستخدم من فريق مصممين متمرس.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <button
                id="hero-cta-tools"
                onClick={onExploreTools}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm sm:text-base shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Layers className="w-5 h-5" />
                <span>استكشف أدوات وملحقات التصميم</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                id="hero-cta-services"
                onClick={onExploreServices}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm sm:text-base transition-all transform hover:-translate-y-0.5"
              >
                <Briefcase className="w-5 h-5 text-amber-400" />
                <span>حجز خدمات وتدقيق الهوية</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-neutral-300 text-xs font-medium">
              <div className="flex items-center gap-2">
                <DownloadCloud className="w-4 h-4 text-amber-400 shrink-0" />
                <span>تحميل فوري مع تحديثات مجانية</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>تراخيص تجارية معتمدة رسمياً</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>دعم عربي أصيل وتوافق RTL</span>
              </div>
            </div>
          </div>

          {/* Featured Highlights Bento Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-white/10 to-white/5 p-6 border border-white/15 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold text-neutral-200">الجديد هذا الأسبوع</span>
                </div>
                <span className="text-[11px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  تحديثات ربيع 2026
                </span>
              </div>

              {/* Highlight 1: Figma System */}
              <div 
                onClick={onExploreTools} 
                className="group cursor-pointer p-3.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-amber-400/40 transition-all mb-3.5 flex items-center gap-3.5"
              >
                <div className="w-14 h-14 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <Layers className="w-7 h-7 text-amber-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                      نظام تصميم «أفق» v3.2
                    </h4>
                    <span className="text-xs font-black text-amber-400">189 ر.س</span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    1,800+ مكون Figma تفاعلي مع دعم RTL ومكتبة Tokens
                  </p>
                </div>
              </div>

              {/* Highlight 2: Branding Service */}
              <div 
                onClick={onExploreServices} 
                className="group cursor-pointer p-3.5 rounded-xl bg-black/40 hover:bg-black/60 border border-white/10 hover:border-violet-400/40 transition-all mb-3.5 flex items-center gap-3.5"
              >
                <div className="w-14 h-14 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                  <Briefcase className="w-7 h-7 text-violet-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors truncate">
                      خدمة الهوية البصرية المتكاملة
                    </h4>
                    <span className="text-xs font-black text-violet-300">تبدأ من 1,650 ر.س</span>
                  </div>
                  <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                    3 مفاهيم بصرية، دليل الهوية الشامل، ومطبوعات وقوالب
                  </p>
                </div>
              </div>

              {/* Quick stats ribbon */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10 text-center">
                <div className="p-2 rounded-lg bg-white/5">
                  <span className="block text-base font-black text-white">+5,200</span>
                  <span className="text-[11px] text-neutral-400 font-medium">عملية تحميل</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <span className="block text-base font-black text-amber-400">4.9 / 5</span>
                  <span className="text-[11px] text-neutral-400 font-medium">تقييم العملاء</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5">
                  <span className="block text-base font-black text-white">+180</span>
                  <span className="text-[11px] text-neutral-400 font-medium">مشروع هوية منجز</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
