import React, { useState, useMemo } from 'react';
import { 
  Briefcase, 
  Search, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  AlertCircle, 
  ArrowUpRight, 
  Edit3, 
  FileText, 
  ExternalLink,
  Users
} from 'lucide-react';
import { AdminServiceProject, ProjectStage, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface AdminProjectsTabProps {
  projects: AdminServiceProject[];
  currency: Currency;
  onSelectProject: (project: AdminServiceProject) => void;
  onQuickUpdateStatus: (projectId: string, newStage: ProjectStage) => void;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  currency,
  onSelectProject,
  onQuickUpdateStatus,
}) => {
  const [search, setSearch] = useState('');
  const [filterStage, setFilterStage] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (search) {
        const q = search.toLowerCase();
        const matches = 
          p.id.toLowerCase().includes(q) ||
          p.clientName.toLowerCase().includes(q) ||
          p.serviceTitle.toLowerCase().includes(q) ||
          p.clientCompany.toLowerCase().includes(q);
        if (!matches) return false;
      }

      if (filterStage !== 'all' && p.status !== filterStage) {
        return false;
      }

      return true;
    });
  }, [projects, search, filterStage]);

  const getStageBadge = (stage: ProjectStage) => {
    switch (stage) {
      case 'new_brief':
        return { label: 'موجز جديد', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
      case 'in_progress':
        return { label: 'جاري التنفيذ', bg: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
      case 'client_review':
        return { label: 'مراجعة العميل', bg: 'bg-purple-500/20 text-purple-400 border-purple-500/30' };
      case 'completed':
        return { label: 'مكتمل ومسلّم', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
      case 'cancelled':
        return { label: 'ملغي', bg: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#141722] p-4 rounded-2xl border border-white/10 shadow-lg">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث برقم المشروع، اسم العميل، أو الخدمة..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Stage Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
          <button
            onClick={() => setFilterStage('all')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              filterStage === 'all' ? 'bg-amber-500 text-black' : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            الكل ({projects.length})
          </button>
          <button
            onClick={() => setFilterStage('new_brief')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              filterStage === 'new_brief' ? 'bg-amber-500 text-black' : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            موجز جديد
          </button>
          <button
            onClick={() => setFilterStage('in_progress')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              filterStage === 'in_progress' ? 'bg-amber-500 text-black' : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            جاري العمل
          </button>
          <button
            onClick={() => setFilterStage('client_review')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              filterStage === 'client_review' ? 'bg-amber-500 text-black' : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            مراجعة العميل
          </button>
          <button
            onClick={() => setFilterStage('completed')}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              filterStage === 'completed' ? 'bg-amber-500 text-black' : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            مكتمل
          </button>
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-[#141722] rounded-2xl border border-white/10 text-neutral-400 space-y-2">
            <Briefcase className="w-10 h-10 text-neutral-600 mx-auto" />
            <p className="text-sm font-bold text-white">لا توجد مشاريع مطابقة للبحث</p>
          </div>
        ) : (
          filteredProjects.map((project) => {
            const badge = getStageBadge(project.status);
            return (
              <div 
                key={project.id}
                className="p-5 rounded-2xl bg-[#141722] border border-white/10 shadow-lg hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                {/* Card Top */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {project.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {project.serviceTitle}
                  </h3>
                  <span className="text-xs text-neutral-400 block font-medium">
                    {project.packageName}
                  </span>
                </div>

                {/* Client and Company */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">العميل</span>
                    <span className="font-bold text-neutral-200 truncate block">{project.clientName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block">الجهة / الشركة</span>
                    <span className="text-neutral-300 truncate block">{project.clientCompany || 'عميل فردي'}</span>
                  </div>
                </div>

                {/* Brief excerpt */}
                <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {project.briefDescription}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-neutral-400">نسبة الإنجاز</span>
                    <span className="font-mono font-bold text-white">{project.progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        project.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${project.progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-500 block">قيمة العقد:</span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      {formatPrice(project.budget, currency)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>إدارة ومتابعة</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
