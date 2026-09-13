import React, { useState } from 'react';
import { 
  X, 
  Briefcase, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  Sparkles, 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  Link2,
  CheckCircle
} from 'lucide-react';
import { DesignService, ServicePackage, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface ServiceBookingModalProps {
  service: DesignService | null;
  currency: Currency;
  onClose: () => void;
  onConfirmBooking: (bookingData: {
    serviceId: string;
    serviceTitle: string;
    packageId: string;
    packageName: string;
    price: number;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    projectField: string;
    projectBrief: string;
    targetDeadline: string;
  }) => void;
}

export const ServiceBookingModal: React.FC<ServiceBookingModalProps> = ({
  service,
  currency,
  onClose,
  onConfirmBooking,
}) => {
  if (!service) return null;

  const [selectedPackage, setSelectedPackage] = useState<ServicePackage>(
    service.packages.find((p) => p.recommended) || service.packages[0]
  );
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectField, setProjectField] = useState('تقنية وتطبيقات');
  const [projectBrief, setProjectBrief] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [targetDeadline, setTargetDeadline] = useState('خلال شهر');

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) {
      alert('يرجى كتابة الاسم والبريد الإلكتروني لإتمام طلب الخدمة');
      return;
    }

    onConfirmBooking({
      serviceId: service.id,
      serviceTitle: service.title,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      price: selectedPackage.price,
      clientName,
      clientEmail,
      clientPhone,
      projectField,
      projectBrief,
      targetDeadline,
    });

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-[#141722] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#10121a]">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-violet-400" />
            <div>
              <span className="text-sm font-bold text-white block">طلب خدمة تصميم وموجز المشروع</span>
              <span className="text-xs text-neutral-400">{service.title}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Confirmation View */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white mb-2">تم تسجيل طلبك وموجز المشروع بنجاح!</h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                شكراً لك يا <strong>{clientName}</strong>. تم فتح ملف المشروع رقم <span className="font-mono text-amber-400">#MD-{Math.floor(1000 + Math.random() * 9000)}</span>. سيقوم المدير الإبداعي بالتواصل معك عبر البريد الإلكتروني أو الواتساب خلال أقل من ساعتين عمل لبدء التنفيذ.
              </p>
            </div>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 max-w-md mx-auto text-right text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">الخدمة المطلوبة:</span>
                <span className="font-bold text-white">{service.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">الباقة المختارة:</span>
                <span className="font-bold text-violet-300">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">القيمة المقدرة:</span>
                <span className="font-bold text-amber-400">{formatPrice(selectedPackage.price, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">مدة التسليم:</span>
                <span className="font-bold text-neutral-200">{selectedPackage.deliveryDays} يوم عمل</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm"
            >
              العودة للمتجر
            </button>
          </div>
        ) : (
          /* Multi-step flow */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-3 border-b border-white/10 pb-4">
              <div className={`flex items-center gap-2 text-xs font-bold ${step === 1 ? 'text-violet-400' : 'text-neutral-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-violet-600 text-white' : 'bg-white/10'}`}>1</span>
                <span>اختيار الباقة</span>
              </div>
              <span className="text-neutral-600">———</span>
              <div className={`flex items-center gap-2 text-xs font-bold ${step === 2 ? 'text-violet-400' : 'text-neutral-400'}`}>
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-violet-600 text-white' : 'bg-white/10'}`}>2</span>
                <span>موجز المشروع (Brief)</span>
              </div>
            </div>

            {/* STEP 1: Package Selection */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="text-right">
                  <h4 className="text-base font-bold text-white mb-1">اختر الباقة المناسبة لميزانيتك واحتياجك:</h4>
                  <p className="text-xs text-neutral-400">جميع الباقات تشمل ملفات مصدرية مفتوحة وتسليماً رسمياً مع ضمان الجودة.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {service.packages.map((pkg) => {
                    const isSelected = selectedPackage.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`relative rounded-2xl p-5 border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-violet-950/30 border-violet-400 shadow-lg shadow-violet-500/10 scale-[1.02]'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        {pkg.recommended && (
                          <div className="absolute -top-3 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-black text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                            الأكثر طلباً
                          </div>
                        )}

                        <div>
                          <h5 className="text-sm font-bold text-white mb-1">{pkg.name}</h5>
                          <div className="text-xl font-black text-amber-400 mb-3">
                            {formatPrice(pkg.price, currency)}
                          </div>

                          <div className="flex items-center gap-2 text-xs text-neutral-300 mb-4 font-medium">
                            <Clock className="w-3.5 h-3.5 text-amber-400" />
                            <span>تسليم خلال {pkg.deliveryDays} يوم عمل</span>
                          </div>

                          <div className="space-y-2 border-t border-white/10 pt-3">
                            {pkg.features.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`mt-5 w-full py-2 rounded-xl text-xs font-bold transition-colors ${
                            isSelected
                              ? 'bg-violet-600 text-white'
                              : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                          }`}
                        >
                          {isSelected ? 'الباقة المحددة' : 'تحديد هذه الباقة'}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4 border-t border-white/10">
                  <button
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg"
                  >
                    <span>المتابعة لتعبئة موجز المشروع</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Brief & Contact Info */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4 text-right">
                <div className="bg-violet-950/20 p-3.5 rounded-xl border border-violet-500/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-neutral-400">الباقة المختارة: </span>
                    <span className="font-bold text-white">{selectedPackage.name}</span>
                  </div>
                  <div className="font-black text-amber-400 text-sm">
                    {formatPrice(selectedPackage.price, currency)}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">اسمك الكريم أو اسم الشركة *</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="مثال: فيصل العتيبي / شركة أفق"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">البريد الإلكتروني *</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-400 text-left"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">رقم الواتساب للتنسيق السريع</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+966 5X XXX XXXX"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-400 text-left"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">قطاع أو مجال العمل</label>
                    <select
                      value={projectField}
                      onChange={(e) => setProjectField(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-violet-400 cursor-pointer"
                    >
                      <option value="تقنية وتطبيقات">تقنية وتطبيقات ذكية</option>
                      <option value="تجارة إلكترونية">تجارة إلكترونية وتجزئة</option>
                      <option value="مطاعم ومقاهي">أغذية ومقاهي (F&B)</option>
                      <option value="عقارات واستثمار">عقارات واستثمار</option>
                      <option value="صحة وجمال">صحة وعناية طبية</option>
                      <option value="خدمات تعليمية">تعليم وتدريب</option>
                      <option value="أخرى">مجال آخر</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-300 block mb-1">الموعد المستهدف للإطلاق</label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={targetDeadline}
                        onChange={(e) => setTargetDeadline(e.target.value)}
                        placeholder="مثال: خلال شهر، أو عاجل"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-400"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    موجز المشروع (ما هي رؤيتك، رسالتك، والجمهور المستهدف؟)
                  </label>
                  <textarea
                    rows={3}
                    value={projectBrief}
                    onChange={(e) => setProjectBrief(e.target.value)}
                    placeholder="اشرح لنا فكرة مشروعك باختصار، ما الذي يميزك؟ ما الأسلوب البصري الذي تفضله (بسيط، فاخر، تقني، دافئ)؟"
                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-400 leading-relaxed"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-300 block mb-1">
                    روابط تصاميم ملهمة أو موقعكم الحالي (اختياري)
                  </label>
                  <div className="relative">
                    <Link2 className="w-4 h-4 text-neutral-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={referenceUrl}
                      onChange={(e) => setReferenceUrl(e.target.value)}
                      placeholder="https://behance.net/... أو رابط موقعك"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-400 text-left"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-xs font-bold"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>تغيير الباقة</span>
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black text-xs font-black shadow-lg shadow-amber-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>إرسال طلب الخدمة وتأكيد الحجز</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
