import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Search, 
  FileText, 
  DownloadCloud, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  ArrowUpRight, 
  Copy, 
  ExternalLink 
} from 'lucide-react';
import { AdminOrder, OrderStatus, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface AdminOrdersTabProps {
  orders: AdminOrder[];
  currency: Currency;
  onViewInvoice: (order: AdminOrder) => void;
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  onToast: (msg: string) => void;
}

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({
  orders,
  currency,
  onViewInvoice,
  onUpdateOrderStatus,
  onToast,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (search) {
        const q = search.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q);
        const matchName = o.customerName.toLowerCase().includes(q);
        const matchEmail = o.customerEmail.toLowerCase().includes(q);
        const matchItem = o.items.some((it) => it.title.toLowerCase().includes(q));
        if (!matchId && !matchName && !matchEmail && !matchItem) return false;
      }

      if (filterStatus !== 'all' && o.status !== filterStatus) {
        return false;
      }

      return true;
    });
  }, [orders, search, filterStatus]);

  const copyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    onToast('تم نسخ رابط التنزيل الآمن');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#141722] p-4 rounded-2xl border border-white/10 shadow-lg">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث برقم الطلب #ORD، اسم العميل، البريد..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-neutral-900 text-white border border-white/10 rounded-xl text-xs py-2 px-3 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">جميع الحالات ({orders.length})</option>
            <option value="completed">مكتمل ومدفوع</option>
            <option value="pending">قيد الدفع / التحويل</option>
            <option value="refunded">مسترجع</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#141722] border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#10121a] text-neutral-400 font-semibold">
                <th className="py-3.5 pr-4">الطلب</th>
                <th className="py-3.5">العميل</th>
                <th className="py-3.5">تفاصيل المشتريات</th>
                <th className="py-3.5">الإجمالي</th>
                <th className="py-3.5">وسيلة الدفع</th>
                <th className="py-3.5">حالة الطلب</th>
                <th className="py-3.5 pl-4 text-center">الفاتورة والتحميل</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    لم يتم العثور على طلبات تطابق معايير البحث
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-4 pr-4">
                      <span className="font-mono font-bold text-white block">
                        {order.id}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono block mt-0.5">
                        {order.createdAt}
                      </span>
                    </td>

                    {/* Customer */}
                    <td className="py-4">
                      <div className="font-bold text-neutral-200">{order.customerName}</div>
                      <div className="text-[11px] text-neutral-400 font-mono" dir="ltr">
                        {order.customerEmail}
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 text-neutral-300 max-w-xs">
                      <div className="space-y-1">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                            <span className="truncate">{it.title}</span>
                            <span className="text-[10px] text-neutral-500 font-mono shrink-0">
                              (x{it.quantity})
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Price & Discount */}
                    <td className="py-4 font-mono">
                      <div className="font-black text-amber-400 text-sm">
                        {formatPrice(order.totalAmount, currency)}
                      </div>
                      {order.discount > 0 && (
                        <span className="text-[10px] text-emerald-400 font-bold block">
                          وفر {order.discount} ر.س ({order.couponCode})
                        </span>
                      )}
                    </td>

                    {/* Payment Method */}
                    <td className="py-4">
                      <span className="uppercase text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-neutral-300">
                        {order.paymentMethod}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                          order.status === 'completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                            : order.status === 'pending'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                        }`}
                      >
                        <option value="completed" className="bg-neutral-900 text-white">مكتمل</option>
                        <option value="pending" className="bg-neutral-900 text-white">قيد الدفع</option>
                        <option value="refunded" className="bg-neutral-900 text-white">مسترجع</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onViewInvoice(order)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10"
                          title="عرض الفاتورة الضريبية"
                        >
                          <FileText className="w-3.5 h-3.5 text-amber-400" />
                          <span>فاتورة</span>
                        </button>

                        {order.downloadLink && (
                          <button
                            onClick={() => copyLink(order.downloadLink!)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-blue-400"
                            title="نسخ رابط التحميل المباشر للعميل"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        )}
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
