import React, { useState, useEffect } from 'react';
import { 
  X, 
  Briefcase, 
  Save, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  User, 
  Building, 
  Mail, 
  Phone, 
  ExternalLink,
  DollarSign
} from 'lucide-react';
import { AdminServiceProject, ProjectStage, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface AdminProjectModalProps {
  isOpen: boolean;
  project: AdminServiceProject | null;
  currency: Currency;
  onClose: () => void;
  onSave: (updatedProject: AdminServiceProject) => void;
}

export const AdminProjectModal: React.FC<AdminProjectModalProps> = ({
  isOpen,
  project,
  currency,
  onClose,
  onSave,
}) => {
  const [status, setStatus] = useState<ProjectStage>('new_brief');
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [deliverablesLink, setDeliverablesLink] = useState('');
  const [assignedDesigner, setAssignedDesigner] = useState('');

  useEffect(() => {
    if (project) {
      setStatus(project.status);
      setProgress(project.progressPercent);
      setNotes(project.designerNotes || '');
      setDeliverablesLink(project.deliverablesLink || '');
      setAssignedDesigner(project.assignedDesigner || 'مِداد ستوديو');
    }
  }, [project, isOpen]);

  if (!isOpen || !project) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...project,
      status,
      progressPercent: progress,
      designerNotes: notes,
      deliverablesLink,
      assignedDesigner,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-3xl bg-[#141722] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#10121a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">{project.serviceTitle}</h3>
                <span className="font-mono text-xs text-neutral-400 font-bold">({project.id})</span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                {project.packageName} • العميل: {project.clientName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-right text-xs">
          
          {/* Client Details Grid */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <span className="text-neutral-400 flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>اسم العميل</span>
              </span>
              <p className="font-bold text-white mt-1">{project.clientName}</p>
            </div>

            <div>
              <span className="text-neutral-400 flex items-center gap-1">
                <Building className="w-3.5 h-3.5" />
                <span>الشركة / المشروع</span>
              </span>
              <p className="font-bold text-white mt-1">{project.clientCompany || 'مشروع فردي'}</p>
            </div>

            <div>
              <span className="text-neutral-400 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>البريد الإلكتروني</span>
              </span>
              <p className="font-mono text-neutral-200 mt-1 truncate" dir="ltr">{project.clientEmail}</p>
            </div>

            <div>
              <span className="text-neutral-400 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" />
                <span>رقم التواصل</span>
              </span>
              <p className="font-mono text-neutral-200 mt-1" dir="ltr">{project.clientPhone}</p>
            </div>
          </div>

          {/* Scope & Brief */}
          <div className="space-y-2">
            <span className="font-bold text-white block">موجز وتفاصيل متطلبات المشروع (Client Brief):</span>
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-neutral-300 leading-relaxed text-xs whitespace-pre-wrap">
              {project.briefDescription}
            </div>
          </div>

          {/* Budget & Deadlines */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-neutral-400 text-[11px] block">الميزانية المعتمدة:</span>
              <span className="text-lg font-black text-amber-400 font-mono mt-0.5 block">
                {formatPrice(project.budget, currency)}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-neutral-400 text-[11px] block">تاريخ التسجيل:</span>
              <span className="text-sm font-bold text-white font-mono mt-0.5 block">
                {project.createdAt}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5">
              <span className="text-neutral-400 text-[11px] block">الموعد النهائي المستهدف:</span>
              <span className="text-sm font-bold text-rose-400 font-mono mt-0.5 block">
                {project.deadline}
              </span>
            </div>
          </div>

          {/* Update Stage & Progress */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <h4 className="font-bold text-white text-sm">إدارة مرحلة التنفيذ والإنجاز</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-neutral-300">مرحلة المشروع الحالية *</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProjectStage)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-white font-bold focus:outline-none focus:border-amber-400"
                >
                  <option value="new_brief">موجز جديد - قيد الدراسة والمراجعة</option>
                  <option value="in_progress">جاري التصميم والتنفيذ</option>
                  <option value="client_review">بانتظار مراجعة واعتماد العميل</option>
                  <option value="completed">مكتمل ومسلّم نهائياً</option>
                  <option value="cancelled">ملغي</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-300">المصمم / الفريق المسؤول</label>
                <input
                  type="text"
                  value={assignedDesigner}
                  onChange={(e) => setAssignedDesigner(e.target.value)}
                  placeholder="مثال: فريق الهويات البصرية"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Progress Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-neutral-300">نسبة الإنجاز الفعلية:</label>
                <span className="font-mono font-black text-amber-400 text-sm">{progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Deliverables Link */}
            <div className="space-y-1.5">
              <label className="font-bold text-neutral-300">رابط ملفات ومخرجات التسليم (Figma / Drive / Vimeo)</label>
              <input
                type="url"
                value={deliverablesLink}
                onChange={(e) => setDeliverablesLink(e.target.value)}
                placeholder="https://figma.com/file/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400 font-mono text-[11px]"
                dir="ltr"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              <label className="font-bold text-neutral-300">ملاحظات داخلية وتحديثات مرحلية</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="تسجيل آخر الملاحظات ومراحل الاتفاق مع العميل..."
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

          </div>

          {/* Footer Actions */}
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
              <span>تحديث وحفظ بيانات المشروع</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
