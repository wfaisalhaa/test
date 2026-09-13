import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Layers, 
  Sparkles, 
  Edit3, 
  Trash2, 
  Eye, 
  DownloadCloud, 
  Star, 
  SlidersHorizontal,
  CheckCircle2
} from 'lucide-react';
import { DesignTool, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface AdminToolsTabProps {
  tools: DesignTool[];
  currency: Currency;
  onAddNewTool: () => void;
  onEditTool: (tool: DesignTool) => void;
  onDeleteTool: (toolId: string) => void;
  onToggleFeatured: (toolId: string) => void;
  onPreviewTool: (tool: DesignTool) => void;
}

export const AdminToolsTab: React.FC<AdminToolsTabProps> = ({
  tools,
  currency,
  onAddNewTool,
  onEditTool,
  onDeleteTool,
  onToggleFeatured,
  onPreviewTool,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (search) {
        const q = search.toLowerCase();
        const matches = 
          tool.title.toLowerCase().includes(q) ||
          tool.titleEn.toLowerCase().includes(q) ||
          tool.tags.some((t) => t.toLowerCase().includes(q));
        if (!matches) return false;
      }

      if (selectedCat !== 'all' && tool.category !== selectedCat) {
        return false;
      }

      return true;
    });
  }, [tools, search, selectedCat]);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Action & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#141722] p-4 rounded-2xl border border-white/10 shadow-lg">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث باسم الأداة، الواسمات، أو البرنامج..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        {/* Filter Category */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-neutral-900 text-white border border-white/10 rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">جميع الفئات ({tools.length})</option>
            <option value="ui-ux">واجهات UI/UX وأنظمة Figma</option>
            <option value="fonts">الخطوط العربية والطباعة</option>
            <option value="3d-icons">أيقونات وعناصر 3D</option>
            <option value="mockups">نماذج العرض والموك اب</option>
            <option value="brushes">فرش وأدوات الرسم</option>
            <option value="motion">قوالب الموشن جرافيك</option>
          </select>

          {/* Add Tool Button */}
          <button
            onClick={onAddNewTool}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 shrink-0 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة أداة جديدة</span>
          </button>
        </div>

      </div>

      {/* Delete Confirmation Alert if triggered */}
      {deleteConfirmId && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 text-xs animate-fade-in">
          <div className="text-rose-300">
            <strong>تأكيد الحذف:</strong> هل أنت متأكد من رغبتك في إزالة هذه الأداة من المتجر؟ لا يمكن التراجع عن هذا الإجراء.
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onDeleteTool(deleteConfirmId);
                setDeleteConfirmId(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500 text-white font-bold hover:bg-rose-600"
            >
              نعم، حذف
            </button>
            <button
              onClick={() => setDeleteConfirmId(null)}
              className="px-3 py-1.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/15"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      {/* Tools Table */}
      <div className="rounded-2xl bg-[#141722] border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#10121a] text-neutral-400 font-semibold">
                <th className="py-3.5 pr-4">الأداة / المنتج الرقمي</th>
                <th className="py-3.5">الفئة</th>
                <th className="py-3.5">السعر</th>
                <th className="py-3.5">التحميلات</th>
                <th className="py-3.5">التقييم</th>
                <th className="py-3.5">البرامج المتوافقة</th>
                <th className="py-3.5 text-center">مميز</th>
                <th className="py-3.5 pl-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredTools.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400">
                    لم يتم العثور على أدوات تطابق خيارات البحث
                  </td>
                </tr>
              ) : (
                filteredTools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-white/5 transition-colors">
                    
                    {/* Tool Info */}
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={tool.image}
                          alt={tool.title}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover bg-neutral-900 shrink-0 border border-white/10"
                        />
                        <div className="min-w-0 max-w-xs">
                          <h4 
                            onClick={() => onPreviewTool(tool)}
                            className="font-bold text-white hover:text-amber-400 cursor-pointer truncate"
                            title={tool.title}
                          >
                            {tool.title}
                          </h4>
                          <span className="text-[11px] text-neutral-400 font-sans block truncate" dir="ltr">
                            {tool.titleEn}
                          </span>
                          <span className="text-[10px] text-neutral-500 font-mono">
                            {tool.version} • {tool.fileSize}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 text-neutral-300">
                      <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px]">
                        {tool.categoryLabel}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 font-mono font-bold">
                      {tool.isFree ? (
                        <span className="text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[11px]">
                          مجاني
                        </span>
                      ) : (
                        <div className="text-amber-400">
                          {formatPrice(tool.price, currency)}
                        </div>
                      )}
                    </td>

                    {/* Downloads */}
                    <td className="py-4 font-mono text-neutral-200">
                      <div className="flex items-center gap-1.5">
                        <DownloadCloud className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{tool.downloadsCount.toLocaleString()}</span>
                      </div>
                    </td>

                    {/* Rating */}
                    <td className="py-4 font-mono">
                      <div className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{tool.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-neutral-500 font-normal">
                          ({tool.reviewsCount})
                        </span>
                      </div>
                    </td>

                    {/* Software */}
                    <td className="py-4">
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {tool.software.map((sw) => (
                          <span 
                            key={sw} 
                            className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-neutral-300 border border-white/5"
                          >
                            {sw}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Featured toggle */}
                    <td className="py-4 text-center">
                      <button
                        onClick={() => onToggleFeatured(tool.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          tool.featured 
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                            : 'bg-white/5 text-neutral-500 border-white/5 hover:text-white'
                        }`}
                        title={tool.featured ? 'أداة مميزة' : 'اضغط للتمييز'}
                      >
                        <Sparkles className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onPreviewTool(tool)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white"
                          title="معاينة في المتجر"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => onEditTool(tool)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-amber-400"
                          title="تعديل الأداة"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setDeleteConfirmId(tool.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400"
                          title="حذف الأداة"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
