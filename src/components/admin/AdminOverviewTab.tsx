import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Briefcase, 
  DownloadCloud, 
  Users, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  ExternalLink,
  ChevronLeft
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  AdminOrder, 
  AdminServiceProject, 
  DesignTool, 
  Currency, 
  ActivityLog 
} from '../../types';
import { MONTHLY_SALES_DATA, CATEGORY_DISTRIBUTION } from '../../data/adminMockData';
import { formatPrice } from '../../utils/formatters';

interface AdminOverviewTabProps {
  orders: AdminOrder[];
  projects: AdminServiceProject[];
  tools: DesignTool[];
  activityLogs: ActivityLog[];
  currency: Currency;
  onNavigateTab: (tab: string) => void;
  onViewOrder: (order: AdminOrder) => void;
  onViewProject: (project: AdminServiceProject) => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  orders,
  projects,
  tools,
  activityLogs,
  currency,
  onNavigateTab,
  onViewOrder,
  onViewProject,
}) => {
  const [chartPeriod, setChartPeriod] = useState<'year' | 'last6'>('year');

  // Compute live aggregates
  const completedOrders = orders.filter((o) => o.status === 'completed');
  const totalRevenue = completedOrders.reduce((acc, o) => acc + o.totalAmount, 0) + 185400; // includes previous periods
  const totalDownloads = tools.reduce((acc, t) => acc + t.downloadsCount, 0);
  const activeProjectsCount = projects.filter((p) => p.status === 'in_progress' || p.status === 'new_brief').length;
  const avgOrderValue = Math.round(totalRevenue / (completedOrders.length + 320));

  const displayChartData = chartPeriod === 'last6' 
    ? MONTHLY_SALES_DATA.slice(-6) 
    : MONTHLY_SALES_DATA;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-[#1a1d27] to-[#12141c] border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
              إحصائيات فورية حية
            </span>
            <span className="text-xs text-neutral-400 font-mono">آخر تحديث: الآن</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1.5">
            مرحباً بك في مركز قيادة «مِداد» 🚀
          </h2>
          <p className="text-xs text-neutral-400 mt-1 max-w-xl">
            أداء المبيعات والمشاريع الإبداعية يسجل نمواً بنسبة +28.4% هذا الشهر. لديك 2 طلبات خدمات جديدة بانتظار المراجعة والاعتماد.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab('projects')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <Briefcase className="w-4 h-4" />
            <span>مراجعة طلبات الخدمات ({activeProjectsCount})</span>
          </button>

          <button
            onClick={() => onNavigateTab('tools')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-all"
          >
            <Layers className="w-4 h-4" />
            <span>إدارة المنتجات</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#141722] border border-white/10 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400">إجمالي المبيعات والإيرادات</span>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white font-mono">
              {formatPrice(totalRevenue, currency)}
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.6% عن الشهر السابق</span>
            </div>
          </div>
        </div>

        {/* Card 2: Orders Count */}
        <div className="p-5 rounded-2xl bg-[#141722] border border-white/10 shadow-lg relative overflow-hidden group hover:border-violet-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400">إجمالي الطلبات المكتملة</span>
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white font-mono">
              {orders.length + 328} <span className="text-xs text-neutral-400 font-normal">طلب</span>
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.2% معدل التحويل</span>
            </div>
          </div>
        </div>

        {/* Card 3: Digital Downloads */}
        <div className="p-5 rounded-2xl bg-[#141722] border border-white/10 shadow-lg relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400">التنزيلات الرقمية للأدوات</span>
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <DownloadCloud className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white font-mono">
              {totalDownloads.toLocaleString()} <span className="text-xs text-neutral-400 font-normal">تنزيل</span>
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-blue-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tools.length} أداة وملحق منشور</span>
            </div>
          </div>
        </div>

        {/* Card 4: Active Projects */}
        <div className="p-5 rounded-2xl bg-[#141722] border border-white/10 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-400">مشاريع وخدمات الاستوديو</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-2xl font-black text-white font-mono">
              {projects.length} <span className="text-xs text-neutral-400 font-normal">مشاريع مسجلة</span>
            </span>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] font-bold text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{activeProjectsCount} مشاريع نشطة قيد التنفيذ</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Revenue Area Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141722] border border-white/10 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-white">تطور الإيرادات الشهرية (الأدوات مقابل الخدمات)</h3>
              <p className="text-xs text-neutral-400 mt-0.5">مقارنة نمو مبيعات الأدوات الرقمية مع عقود تصميم الاستوديو</p>
            </div>

            <div className="flex items-center gap-1.5 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
              <button
                onClick={() => setChartPeriod('last6')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  chartPeriod === 'last6' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                آخر 6 أشهر
              </button>
              <button
                onClick={() => setChartPeriod('year')}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  chartPeriod === 'year' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                كامل العام (12 شهراً)
              </button>
            </div>
          </div>

          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={displayChartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="servicesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="toolsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262b3d" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={11} />
                <YAxis stroke="#6b7280" fontSize={11} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#10121a', borderColor: '#374151', borderRadius: '12px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="servicesSales" 
                  name="عقود وخدمات التصميم (ر.س)" 
                  stroke="#8b5cf6" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#servicesGrad)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="toolsSales" 
                  name="مبيعات الأدوات الرقمية (ر.س)" 
                  stroke="#f59e0b" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#toolsGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/10 text-xs text-neutral-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <strong className="text-white">الأدوات الرقمية:</strong> 34% من الإجمالي
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-violet-500 inline-block"></span>
                <strong className="text-white">خدمات الاستوديو:</strong> 66% من الإجمالي
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">متوسط العقد: {formatPrice(5400, currency)}</span>
          </div>
        </div>

        {/* Right 1 Col: Category Distribution & Ratio */}
        <div className="p-6 rounded-2xl bg-[#141722] border border-white/10 shadow-xl flex flex-col justify-between space-y-5">
          <div>
            <h3 className="text-base font-bold text-white">توزيع مبيعات الفئات الإبداعية</h3>
            <p className="text-xs text-neutral-400 mt-0.5">نسب الإقبال والطلب على الأقسام</p>
          </div>

          <div className="space-y-4 my-auto">
            {CATEGORY_DISTRIBUTION.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300 font-medium">{item.name}</span>
                  <span className="text-white font-bold font-mono">{item.value}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${item.value}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-xs flex items-center justify-between">
            <span className="text-neutral-400">الفئة الأكثر نمواً هذا الشهر:</span>
            <span className="font-bold text-amber-400">واجهات UI/UX (+42%)</span>
          </div>
        </div>

      </div>

      {/* Two columns: Recent Orders & Live Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141722] border border-white/10 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">أحدث الطلبات والمشتريات</h3>
              <p className="text-xs text-neutral-400 mt-0.5">العمليات الأخيرة المسجلة في المتجر</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>عرض جميع الطلبات</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-semibold">
                  <th className="pb-3 pr-2">رقم الطلب</th>
                  <th className="pb-3">العميل</th>
                  <th className="pb-3">العناصر</th>
                  <th className="pb-3">المبلغ</th>
                  <th className="pb-3">الدفع</th>
                  <th className="pb-3">الحالة</th>
                  <th className="pb-3 pl-2 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-2 font-mono font-bold text-white">
                      {order.id}
                    </td>
                    <td className="py-3.5 font-medium text-neutral-200">
                      <div>{order.customerName}</div>
                      <div className="text-[10px] text-neutral-400">{order.createdAt}</div>
                    </td>
                    <td className="py-3.5 text-neutral-300">
                      <span className="truncate block max-w-[160px]" title={order.items[0]?.title}>
                        {order.items[0]?.title} {order.items.length > 1 && `(+${order.items.length - 1})`}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold font-mono text-amber-400">
                      {formatPrice(order.totalAmount, currency)}
                    </td>
                    <td className="py-3.5 text-neutral-400">
                      <span className="uppercase text-[11px] bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        order.status === 'completed' 
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : order.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {order.status === 'completed' ? 'مكتمل' : order.status === 'pending' ? 'قيد الدفع' : 'مسترجع'}
                      </span>
                    </td>
                    <td className="py-3.5 pl-2 text-center">
                      <button
                        onClick={() => onViewOrder(order)}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5"
                      >
                        تفاصيل
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Feed (1 Col) */}
        <div className="p-6 rounded-2xl bg-[#141722] border border-white/10 shadow-xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">سجل النشاط المباشر</h3>
            <p className="text-xs text-neutral-400 mt-0.5">تحديثات فورية للأحداث في المنصة</p>
          </div>

          <div className="space-y-3.5 overflow-y-auto max-h-[340px]">
            {activityLogs.map((log) => (
              <div 
                key={log.id} 
                className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3 text-right"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  log.type === 'sale' ? 'bg-amber-500/20 text-amber-400' :
                  log.type === 'brief' ? 'bg-violet-500/20 text-violet-400' :
                  log.type === 'download' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {log.type === 'sale' ? <ShoppingBag className="w-4 h-4" /> :
                   log.type === 'brief' ? <Briefcase className="w-4 h-4" /> :
                   log.type === 'download' ? <DownloadCloud className="w-4 h-4" /> :
                   <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white truncate">{log.title}</span>
                    <span className="text-[10px] text-neutral-400 shrink-0 font-mono">{log.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                    {log.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
