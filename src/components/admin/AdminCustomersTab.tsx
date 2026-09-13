import React, { useState } from 'react';
import { Users, Search, Mail, Phone, MapPin, Award, ShoppingBag, Briefcase, ExternalLink } from 'lucide-react';
import { AdminCustomer, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface AdminCustomersTabProps {
  customers: AdminCustomer[];
  currency: Currency;
  onToast: (msg: string) => void;
}

export const AdminCustomersTab: React.FC<AdminCustomersTabProps> = ({
  customers,
  currency,
  onToast,
}) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.phone.includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#141722] p-4 rounded-2xl border border-white/10 shadow-lg">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="البحث باسم العميل، البريد، المدينة، أو الهاتف..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex items-center gap-3 text-xs text-neutral-400 shrink-0">
          <span className="bg-white/5 px-3 py-2 rounded-xl border border-white/5">
            إجمالي العملاء: <strong className="text-white font-mono">{customers.length}</strong>
          </span>
          <span className="bg-amber-500/10 text-amber-400 px-3 py-2 rounded-xl border border-amber-500/20 font-bold">
            عملاء VIP: <span className="font-mono">{customers.filter(c => c.tier === 'VIP').length}</span>
          </span>
        </div>
      </div>

      {/* Customers Table */}
      <div className="rounded-2xl bg-[#141722] border border-white/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-[#10121a] text-neutral-400 font-semibold">
                <th className="py-3.5 pr-4">بيانات العميل</th>
                <th className="py-3.5">الموقع</th>
                <th className="py-3.5">التصنيف</th>
                <th className="py-3.5">عدد الطلبات</th>
                <th className="py-3.5">مشاريع الاستوديو</th>
                <th className="py-3.5">إجمالي المشتريات</th>
                <th className="py-3.5 pl-4 text-center">تواصل مباشر</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-white/5 transition-colors">
                  
                  {/* Customer Info */}
                  <td className="py-4 pr-4">
                    <div className="font-bold text-white text-sm">{customer.name}</div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-0.5" dir="ltr">
                      {customer.email}
                    </div>
                    <div className="text-[10px] text-neutral-500 font-mono" dir="ltr">
                      {customer.phone}
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 text-neutral-300">
                    <div className="flex items-center gap-1 text-[11px]">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{customer.city}، {customer.country}</span>
                    </div>
                  </td>

                  {/* Tier */}
                  <td className="py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      customer.tier === 'VIP'
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        : 'bg-white/5 text-neutral-400 border-white/10'
                    }`}>
                      {customer.tier === 'VIP' ? '★ عميل مميز VIP' : 'عميل معتاد'}
                    </span>
                  </td>

                  {/* Orders count */}
                  <td className="py-4 font-mono text-neutral-200">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{customer.ordersCount} طلبات</span>
                    </div>
                  </td>

                  {/* Projects count */}
                  <td className="py-4 font-mono text-neutral-200">
                    <div className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
                      <span>{customer.projectsCount} مشاريع</span>
                    </div>
                  </td>

                  {/* Total Spend */}
                  <td className="py-4 font-mono font-black text-amber-400">
                    {formatPrice(customer.totalSpent, currency)}
                  </td>

                  {/* Contact Action */}
                  <td className="py-4 pl-4 text-center">
                    <a
                      href={`mailto:${customer.email}?subject=تواصل من مِداد ستور`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span>مراسلة</span>
                    </a>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
