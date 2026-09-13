import React from 'react';
import { 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Star, 
  ArrowLeft, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { DesignService, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface ServiceCardProps {
  service: DesignService;
  currency: Currency;
  onBookService: (service: DesignService) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  currency,
  onBookService,
}) => {
  return (
    <div 
      className="group relative flex flex-col bg-[#161922] rounded-2xl border border-white/10 hover:border-violet-400/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-violet-500/10"
      id={`service-card-${service.id}`}
    >
      {/* Cover Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-900">
        <img
          src={service.image}
          alt={service.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 right-3">
          <span className="text-xs font-bold px-3 py-1 rounded-md bg-violet-600/90 backdrop-blur-md text-white border border-violet-400/30 shadow">
            {service.categoryLabel}
          </span>
        </div>

        {/* Delivery & projects completed pill */}
        <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs text-white">
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-medium">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {service.deliveryTime}
          </span>
          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 font-medium">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            {service.completedProjects} مشروع منجز
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-2">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{service.rating.toFixed(1)}</span>
            <span className="text-neutral-400 font-normal">({service.reviewsCount} عميل راضٍ)</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onBookService(service)}
            className="text-lg font-extrabold text-white group-hover:text-violet-300 transition-colors cursor-pointer leading-snug mb-2"
          >
            {service.title}
          </h3>

          <p className="text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Key Deliverables Highlights */}
          <div className="space-y-1.5 mb-5 bg-white/5 p-3.5 rounded-xl border border-white/5">
            <span className="text-[11px] font-bold text-neutral-400 block mb-1">أبرز مخرجات الخدمة:</span>
            {service.deliverables.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          {/* Packages tiers count */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-4">
            <span className="text-neutral-500 font-medium">الباقات المتاحة:</span>
            <div className="flex items-center gap-1.5">
              {service.packages.map((pkg) => (
                <span 
                  key={pkg.id} 
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    pkg.recommended 
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40' 
                      : 'bg-white/5 text-neutral-400 border border-white/5'
                  }`}
                >
                  {pkg.name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div>
            <span className="text-[11px] text-neutral-400 block">يبدأ السعر من</span>
            <span className="text-lg font-black text-white">
              {formatPrice(service.startingPrice, currency)}
            </span>
          </div>

          <button
            id={`book-service-${service.id}`}
            onClick={() => onBookService(service)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg shadow-violet-600/25 transition-all transform hover:-translate-y-0.5"
          >
            <Briefcase className="w-4 h-4" />
            <span>طلب الخدمة والموجز</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
