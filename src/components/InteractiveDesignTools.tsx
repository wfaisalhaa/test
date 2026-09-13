import React, { useState } from 'react';
import { 
  Wand2, 
  Palette, 
  Type, 
  Calculator, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowLeft, 
  Layers,
  Clock,
  Briefcase
} from 'lucide-react';
import { Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface InteractiveDesignToolsProps {
  currency: Currency;
  onRequestCustomProject: (data: { service: string; budget: number; days: number; scope: string }) => void;
}

export const InteractiveDesignTools: React.FC<InteractiveDesignToolsProps> = ({
  currency,
  onRequestCustomProject,
}) => {
  const [activeTab, setActiveTab] = useState<'font-tester' | 'palette-generator' | 'cost-calculator'>('font-tester');

  // Font Tester State
  const [sampleText, setSampleText] = useState('التصميم ليس مجرد شكل، بل هو طريقة عمل الأشياء.');
  const [fontSize, setFontSize] = useState(36);
  const [fontWeight, setFontWeight] = useState('700');
  const [lineHeight, setLineHeight] = useState('1.5');
  const [fontFamily, setFontFamily] = useState<'tajawal' | 'sans' | 'serif'>('tajawal');
  const [isLightModeCanvas, setIsLightModeCanvas] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);

  // Palette Studio State
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Cost Calculator State
  const [calcService, setCalcService] = useState<'mobile' | 'branding' | 'website' | 'motion'>('mobile');
  const [screenCount, setScreenCount] = useState(12);
  const [isUrgent, setIsUrgent] = useState(false);
  const [includeDesignSystem, setIncludeDesignSystem] = useState(true);

  // Palettes Data
  const PALETTES = [
    {
      name: 'هوية تقنية معاصرة (Cyber Fintech)',
      colors: ['#0f172a', '#1e293b', '#3b82f6', '#10b981', '#f8fafc'],
      description: 'أزرق تقني، كحلي عميق، وأخضر نقدي للواجهات المالية وتطبيقات الـ SaaS.'
    },
    {
      name: 'فخامة عربية دافئة (Luxury Sand & Amber)',
      colors: ['#1c1917', '#44403c', '#d97706', '#fbbf24', '#fef3c7'],
      description: 'درجات الكهرمان والرمال للعلامات التجارية الراقية والمقاهي المتخصصة.'
    },
    {
      name: 'حيوية رقمية جريئة (Neon Creative)',
      colors: ['#18181b', '#27272a', '#8b5cf6', '#ec4899', '#f43f5e'],
      description: 'بنفسجي ووردي متوهج لمنتجات الترفيه، المنصات الاجتماعية، والذكاء الاصطناعي.'
    },
    {
      name: 'طبيعة هادئة (Organic Sage)',
      colors: ['#14532d', '#166534', '#84cc16', '#e2e8f0', '#f1f5f9'],
      description: 'درجات خضراء نقية للمنتجات العضوية، الاستدامة، والمراكز الصحية.'
    }
  ];

  const handleCopyPaletteColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const handleCopyFontCSS = () => {
    const css = `font-family: 'Tajawal', sans-serif;\nfont-size: ${fontSize}px;\nfont-weight: ${fontWeight};\nline-height: ${lineHeight};`;
    navigator.clipboard.writeText(css);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 2000);
  };

  // Calculate project cost
  const calculateEstimate = () => {
    let basePrice = 1200;
    let baseDays = 7;

    if (calcService === 'mobile') {
      basePrice = 1500 + screenCount * 140;
      baseDays = Math.ceil(8 + screenCount * 0.8);
    } else if (calcService === 'branding') {
      basePrice = 1800;
      baseDays = 12;
    } else if (calcService === 'website') {
      basePrice = 1600 + screenCount * 180;
      baseDays = Math.ceil(7 + screenCount * 1.0);
    } else if (calcService === 'motion') {
      basePrice = 1400 + screenCount * 80;
      baseDays = Math.ceil(6 + screenCount * 0.5);
    }

    if (includeDesignSystem) {
      basePrice += 650;
      baseDays += 3;
    }

    if (isUrgent) {
      basePrice = Math.round(basePrice * 1.35);
      baseDays = Math.max(3, Math.round(baseDays * 0.6));
    }

    return { price: basePrice, days: baseDays };
  };

  const estimate = calculateEstimate();

  return (
    <section className="py-12 bg-[#0d0f15] border-t border-white/10" id="designer-lab">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold mb-3">
            <Wand2 className="w-3.5 h-3.5" />
            <span>مختبر المصمم الرقمي المجاني</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            أدوات تجربة تفاعلية مدمجة
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            جرب الخطوط العربية، انسخ لوحات الألوان العالمية، أو احسب التكلفة التقديرية لمشروعك التصميمي بدقة فورية.
          </p>

          {/* Sub Navigation Tabs */}
          <div className="inline-flex items-center bg-white/5 p-1.5 rounded-2xl border border-white/10 mt-6 gap-1">
            <button
              onClick={() => setActiveTab('font-tester')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'font-tester'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>مختبر الخطوط العربية</span>
            </button>

            <button
              onClick={() => setActiveTab('palette-generator')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'palette-generator'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>لوحات الألوان</span>
            </button>

            <button
              onClick={() => setActiveTab('cost-calculator')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'cost-calculator'
                  ? 'bg-amber-500 text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>حاسبة ميزانية المشاريع</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Live Arabic Font Tester */}
        {activeTab === 'font-tester' && (
          <div className="bg-[#141722] rounded-2xl border border-white/10 p-6 shadow-xl space-y-6">
            
            {/* Control Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-white/10 text-xs">
              <div>
                <label className="text-neutral-400 font-bold block mb-1.5">حجم الخط: {fontSize}px</label>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1.5">الوزن وسُمك الحرف:</label>
                <select
                  value={fontWeight}
                  onChange={(e) => setFontWeight(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="400">Regular (400) - عادي</option>
                  <option value="500">Medium (500) - متوسط</option>
                  <option value="700">Bold (700) - عريض</option>
                  <option value="900">Black (900) - فائق العرض</option>
                </select>
              </div>

              <div>
                <label className="text-neutral-400 font-bold block mb-1.5">تباعد الأسطر (Line Height):</label>
                <select
                  value={lineHeight}
                  onChange={(e) => setLineHeight(e.target.value)}
                  className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="1.2">ضيق (1.2 - للعناوين)</option>
                  <option value="1.5">متوازن (1.5 - قياسي)</option>
                  <option value="1.8">مريح (1.8 - للفقرات الطويلة)</option>
                </select>
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={() => setIsLightModeCanvas(!isLightModeCanvas)}
                  className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 font-bold"
                >
                  {isLightModeCanvas ? 'وضع داكن' : 'وضع فاتح'}
                </button>
                <button
                  onClick={handleCopyFontCSS}
                  className="flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold"
                  title="نسخ كود CSS"
                >
                  {copiedCSS ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCSS ? 'تم النسخ!' : 'كود CSS'}</span>
                </button>
              </div>
            </div>

            {/* Editable Phrase Input */}
            <div>
              <label className="text-xs font-bold text-neutral-400 block mb-1">
                اكتب أي عبارة لتجربة خطوط مِداد في الوقت الفعلي:
              </label>
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder="اكتب هنا..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Live Canvas */}
            <div 
              className={`p-8 rounded-2xl border transition-colors min-h-[160px] flex items-center justify-center text-center select-all leading-normal ${
                isLightModeCanvas 
                  ? 'bg-neutral-100 text-neutral-900 border-neutral-300' 
                  : 'bg-black/60 text-amber-200 border-white/10'
              }`}
              style={{
                fontSize: `${fontSize}px`,
                fontWeight: Number(fontWeight),
                lineHeight: lineHeight,
                fontFamily: `'Tajawal', sans-serif`,
              }}
            >
              {sampleText || 'أدخل نصاً هنا'}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-400 pt-2">
              <span>جميع الخطوط تدعم التشكيل والأرقام المشرقية والمغربية</span>
              <span className="font-mono text-amber-400">Font: Tajawal & Sindbad Engine</span>
            </div>
          </div>
        )}

        {/* TAB 2: Palette Generator */}
        {activeTab === 'palette-generator' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PALETTES.map((palette, idx) => (
              <div key={idx} className="bg-[#141722] rounded-2xl border border-white/10 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">{palette.name}</h4>
                  <span className="text-[11px] text-neutral-400">انقر على أي لون لنسخ الكود</span>
                </div>

                {/* Swatches strip */}
                <div className="flex h-20 rounded-xl overflow-hidden shadow-inner border border-white/10">
                  {palette.colors.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => handleCopyPaletteColor(hex)}
                      className="flex-1 group relative transition-transform hover:scale-105 flex flex-col justify-end p-2"
                      style={{ backgroundColor: hex }}
                      title={`انقر لنسخ ${hex}`}
                    >
                      <span className="text-[10px] font-mono px-1 py-0.5 rounded bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity mx-auto">
                        {copiedHex === hex ? 'تم!' : hex}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {palette.description}
                </p>

                {/* Color Hex Pills */}
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-white/5">
                  {palette.colors.map((hex) => (
                    <button
                      key={hex}
                      onClick={() => handleCopyPaletteColor(hex)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-neutral-300"
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hex }} />
                      <span>{hex}</span>
                      {copiedHex === hex && <Check className="w-3 h-3 text-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Project Cost Estimator */}
        {activeTab === 'cost-calculator' && (
          <div className="bg-[#141722] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Sliders and Options */}
              <div className="lg:col-span-7 space-y-6 text-right">
                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-2">نوع المشروع المطلوب تقديره:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      onClick={() => setCalcService('mobile')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        calcService === 'mobile'
                          ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                          : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      تطبيق جوال
                    </button>
                    <button
                      onClick={() => setCalcService('branding')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        calcService === 'branding'
                          ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                          : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      هوية بصرية
                    </button>
                    <button
                      onClick={() => setCalcService('website')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        calcService === 'website'
                          ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                          : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      موقع ومنصة ويب
                    </button>
                    <button
                      onClick={() => setCalcService('motion')}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        calcService === 'motion'
                          ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                          : 'bg-white/5 text-neutral-300 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      موشن وفيديو
                    </button>
                  </div>
                </div>

                {/* Scope Slider (e.g. number of screens / scenes) */}
                {calcService !== 'branding' && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-neutral-300">
                        {calcService === 'motion' ? 'مدة الفيديو بالثواني:' : 'عدد الشاشات / الصفحات:'}
                      </span>
                      <span className="text-amber-400 font-mono text-sm">
                        {screenCount} {calcService === 'motion' ? 'ثانية' : 'شاشة'}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={calcService === 'motion' ? 15 : 4}
                      max={calcService === 'motion' ? 120 : 35}
                      value={screenCount}
                      onChange={(e) => setScreenCount(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                )}

                {/* Add-on checkboxes */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/15">
                    <input
                      type="checkbox"
                      checked={includeDesignSystem}
                      onChange={(e) => setIncludeDesignSystem(e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <div className="text-right">
                      <span className="text-xs font-bold text-white block">بناء نظام تصميم متكامل (Figma Design System & Tokens)</span>
                      <span className="text-[11px] text-neutral-400">مكونات تفاعلية جاهزة للمطورين وتسهل التوسع المستقبلي</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/15">
                    <input
                      type="checkbox"
                      checked={isUrgent}
                      onChange={(e) => setIsUrgent(e.target.checked)}
                      className="w-4 h-4 accent-amber-500"
                    />
                    <div className="text-right">
                      <span className="text-xs font-bold text-white block">تسليم عاجل ومكثف (Fast-track Express)</span>
                      <span className="text-[11px] text-neutral-400">تقليص مدة العمل بنسبة 40% مع أولوية قصوى لفريق العمل</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Estimate Result Card */}
              <div className="lg:col-span-5 bg-black/60 p-6 rounded-2xl border border-amber-400/30 shadow-2xl text-center space-y-5">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                  التقدير الفوري التقريبي للمشروع
                </span>

                <div className="py-2">
                  <span className="text-3xl sm:text-4xl font-black text-amber-400 block font-mono">
                    {formatPrice(estimate.price, currency)}
                  </span>
                  <span className="text-xs text-neutral-400 mt-1 block">
                    (شامل جميع الملفات المصدرية المفتوحة والتسليم الهندسي)
                  </span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-300 bg-white/5 py-2.5 px-4 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>المدة المتوقعة للتسليم: قرابة {estimate.days} يوم عمل</span>
                </div>

                <button
                  onClick={() => onRequestCustomProject({
                    service: calcService,
                    budget: estimate.price,
                    days: estimate.days,
                    scope: `${screenCount} عناصر / شاشات`
                  })}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-transform hover:scale-[1.02]"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>طلب هذا النطاق وبدء التنفيذ</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
