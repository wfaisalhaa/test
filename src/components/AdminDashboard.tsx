import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Briefcase, 
  ShoppingBag, 
  Tag, 
  Users, 
  Settings, 
  Store, 
  Bell, 
  Sparkles, 
  Plus, 
  ChevronRight,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { 
  DesignTool, 
  AdminOrder, 
  AdminServiceProject, 
  AdminCoupon, 
  AdminCustomer, 
  StoreSettings, 
  Currency, 
  ActivityLog, 
  OrderStatus, 
  ProjectStage 
} from '../types';
import { AdminOverviewTab } from './admin/AdminOverviewTab';
import { AdminToolsTab } from './admin/AdminToolsTab';
import { AdminProjectsTab } from './admin/AdminProjectsTab';
import { AdminOrdersTab } from './admin/AdminOrdersTab';
import { AdminCouponsTab } from './admin/AdminCouponsTab';
import { AdminCustomersTab } from './admin/AdminCustomersTab';
import { AdminSettingsTab } from './admin/AdminSettingsTab';
import { AdminToolModal } from './admin/AdminToolModal';
import { AdminProjectModal } from './admin/AdminProjectModal';
import { AdminInvoiceModal } from './admin/AdminInvoiceModal';
import { AdminCouponModal } from './admin/AdminCouponModal';

export type AdminTab = 
  | 'overview' 
  | 'tools' 
  | 'projects' 
  | 'orders' 
  | 'coupons' 
  | 'customers' 
  | 'settings';

interface AdminDashboardProps {
  currency: Currency;
  tools: DesignTool[];
  orders: AdminOrder[];
  projects: AdminServiceProject[];
  coupons: AdminCoupon[];
  customers: AdminCustomer[];
  settings: StoreSettings;
  activityLogs: ActivityLog[];
  onExitAdmin: () => void;
  onSaveTool: (tool: Partial<DesignTool>, isEdit: boolean, originalId?: string) => void;
  onDeleteTool: (toolId: string) => void;
  onToggleFeaturedTool: (toolId: string) => void;
  onSaveProject: (project: AdminServiceProject) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onSaveCoupon: (coupon: Omit<AdminCoupon, 'id' | 'usageCount'>) => void;
  onToggleCoupon: (couponId: string) => void;
  onDeleteCoupon: (couponId: string) => void;
  onSaveSettings: (settings: StoreSettings) => void;
  onPreviewToolInStore: (tool: DesignTool) => void;
  onToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currency,
  tools,
  orders,
  projects,
  coupons,
  customers,
  settings,
  activityLogs,
  onExitAdmin,
  onSaveTool,
  onDeleteTool,
  onToggleFeaturedTool,
  onSaveProject,
  onUpdateOrderStatus,
  onSaveCoupon,
  onToggleCoupon,
  onDeleteCoupon,
  onSaveSettings,
  onPreviewToolInStore,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Modals
  const [isToolModalOpen, setIsToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<DesignTool | null>(null);

  const [selectedProject, setSelectedProject] = useState<AdminServiceProject | null>(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<AdminOrder | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  // Active projects count
  const pendingProjectsCount = projects.filter(
    (p) => p.status === 'new_brief' || p.status === 'in_progress'
  ).length;

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  // Handlers
  const handleAddNewTool = () => {
    setEditingTool(null);
    setIsToolModalOpen(true);
  };

  const handleEditTool = (tool: DesignTool) => {
    setEditingTool(tool);
    setIsToolModalOpen(true);
  };

  const handleSaveToolModal = (data: Partial<DesignTool>) => {
    onSaveTool(data, !!editingTool, editingTool?.id);
    onToast(editingTool ? 'تم تحديث الأداة بنجاح' : 'تمت إضافة أداة جديدة إلى المتجر');
  };

  const handleOpenProjectModal = (proj: AdminServiceProject) => {
    setSelectedProject(proj);
    setIsProjectModalOpen(true);
  };

  const handleOpenInvoiceModal = (order: AdminOrder) => {
    setSelectedInvoiceOrder(order);
    setIsInvoiceModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0d13] text-[#e5e7eb] flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Admin Top Header Bar */}
      <header className="sticky top-0 z-30 bg-[#10121a]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Brand & Admin Badge */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-black font-black font-serif text-xl shadow-lg shadow-amber-500/20">
            مِ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white">لوحة تحكم مِداد</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                إدارة الاستوديو والمتجر
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 font-medium">
              المدير المسؤول: فيصل (wfaisalhaa@gmail.com)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={handleAddNewTool}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة أداة</span>
          </button>

          {/* Return to storefront */}
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-all"
            title="الانتقال إلى واجهة المتجر العامة"
          >
            <Store className="w-4 h-4 text-amber-400" />
            <span>عرض المتجر</span>
          </button>

        </div>

      </header>

      {/* Main Admin Content Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Nav Tabs Bar */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#141722] border border-white/10 overflow-x-auto shadow-md">
          
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>الرئيسية والإحصائيات</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'tools'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>الأدوات والمنتجات ({tools.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>مشاريع الخدمات ({projects.length})</span>
            {pendingProjectsCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'projects' ? 'bg-black text-amber-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {pendingProjectsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>الطلبات والفواتير ({orders.length})</span>
            {pendingOrdersCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === 'orders' ? 'bg-black text-amber-400' : 'bg-rose-500/20 text-rose-400'
              }`}>
                {pendingOrdersCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'coupons'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>كوبونات الخصم ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'customers'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>العملاء ({customers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>إعدادات المتجر</span>
          </button>

        </div>

        {/* Tab View Container */}
        <div className="pb-16">
          {activeTab === 'overview' && (
            <AdminOverviewTab
              orders={orders}
              projects={projects}
              tools={tools}
              activityLogs={activityLogs}
              currency={currency}
              onNavigateTab={(tab) => setActiveTab(tab as AdminTab)}
              onViewOrder={handleOpenInvoiceModal}
              onViewProject={handleOpenProjectModal}
            />
          )}

          {activeTab === 'tools' && (
            <AdminToolsTab
              tools={tools}
              currency={currency}
              onAddNewTool={handleAddNewTool}
              onEditTool={handleEditTool}
              onDeleteTool={(id) => {
                onDeleteTool(id);
                onToast('تم حذف الأداة من المتجر');
              }}
              onToggleFeatured={(id) => {
                onToggleFeaturedTool(id);
                onToast('تم تحديث حالة التمييز للأداة');
              }}
              onPreviewTool={onPreviewToolInStore}
            />
          )}

          {activeTab === 'projects' && (
            <AdminProjectsTab
              projects={projects}
              currency={currency}
              onSelectProject={handleOpenProjectModal}
              onQuickUpdateStatus={(id, stage) => {
                const proj = projects.find((p) => p.id === id);
                if (proj) {
                  onSaveProject({ ...proj, status: stage });
                  onToast('تم تحديث مرحلة المشروع');
                }
              }}
            />
          )}

          {activeTab === 'orders' && (
            <AdminOrdersTab
              orders={orders}
              currency={currency}
              onViewInvoice={handleOpenInvoiceModal}
              onUpdateOrderStatus={(id, status) => {
                onUpdateOrderStatus(id, status);
                onToast('تم تحديث حالة الطلب');
              }}
              onToast={onToast}
            />
          )}

          {activeTab === 'coupons' && (
            <AdminCouponsTab
              coupons={coupons}
              onAddNewCoupon={() => setIsCouponModalOpen(true)}
              onToggleCoupon={(id) => {
                onToggleCoupon(id);
                onToast('تم تغيير حالة الكوبون');
              }}
              onDeleteCoupon={(id) => {
                onDeleteCoupon(id);
                onToast('تم حذف الكوبون');
              }}
              onToast={onToast}
            />
          )}

          {activeTab === 'customers' && (
            <AdminCustomersTab
              customers={customers}
              currency={currency}
              onToast={onToast}
            />
          )}

          {activeTab === 'settings' && (
            <AdminSettingsTab
              settings={settings}
              onSaveSettings={onSaveSettings}
              onToast={onToast}
            />
          )}
        </div>

      </div>

      {/* Tool Modal (Add / Edit) */}
      <AdminToolModal
        isOpen={isToolModalOpen}
        tool={editingTool}
        onClose={() => setIsToolModalOpen(false)}
        onSave={handleSaveToolModal}
      />

      {/* Project Status & Brief Modal */}
      <AdminProjectModal
        isOpen={isProjectModalOpen}
        project={selectedProject}
        currency={currency}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={(updated) => {
          onSaveProject(updated);
          onToast('تم حفظ وتحديث بيانات المشروع بنجاح');
        }}
      />

      {/* E-Invoice Modal */}
      <AdminInvoiceModal
        isOpen={isInvoiceModalOpen}
        order={selectedInvoiceOrder}
        currency={currency}
        onClose={() => setIsInvoiceModalOpen(false)}
      />

      {/* Coupon Modal */}
      <AdminCouponModal
        isOpen={isCouponModalOpen}
        onClose={() => setIsCouponModalOpen(false)}
        onSave={(newCoupon) => {
          onSaveCoupon(newCoupon);
          onToast(`تم تفعيل كود الخصم الجديد ${newCoupon.code}`);
        }}
      />

    </div>
  );
};
