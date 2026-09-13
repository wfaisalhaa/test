import React from 'react';
import { X, Printer, Download, CheckCircle2, QrCode, FileText } from 'lucide-react';
import { AdminOrder, Currency } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface AdminInvoiceModalProps {
  isOpen: boolean;
  order: AdminOrder | null;
  currency: Currency;
  onClose: () => void;
}

export const AdminInvoiceModal: React.FC<AdminInvoiceModalProps> = ({
  isOpen,
  order,
  currency,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white text-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Controls (Hidden when printing) */}
        <div className="flex items-center justify-between p-4 bg-neutral-900 text-white border-b border-neutral-800 print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm">فاتورة ضريبية مبسطة الإلكترونية (ZATCA Compliant)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>طباعة الفاتورة</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1 text-right text-xs bg-white text-neutral-900 leading-normal">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b pb-6">
            <div>
              <div className="text-2xl font-black text-amber-600 font-serif">مِداد ديزاين</div>
              <p className="text-xs text-neutral-500 mt-1">المتجر العربي للأدوات والخدمات الرقمية</p>
              <p className="text-[11px] text-neutral-500 font-mono mt-0.5">الرقم الضريبي: 310928475600003</p>
              <p className="text-[11px] text-neutral-500">الرياض، المملكة العربية السعودية</p>
            </div>

            <div className="text-left" dir="ltr">
              <div className="w-20 h-20 bg-neutral-100 border border-neutral-300 rounded-lg p-2 flex flex-col items-center justify-center text-center">
                <QrCode className="w-12 h-12 text-neutral-800" />
                <span className="text-[8px] text-neutral-500 mt-0.5">E-Invoice QR</span>
              </div>
            </div>
          </div>

          {/* Invoice Meta Grid */}
          <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <div>
              <span className="text-neutral-500 text-[11px] block">بيانات العميل:</span>
              <p className="font-bold text-neutral-900 mt-0.5">{order.customerName}</p>
              <p className="text-neutral-600 font-mono text-[11px]" dir="ltr">{order.customerEmail}</p>
              {order.customerPhone && <p className="text-neutral-600 font-mono text-[11px]" dir="ltr">{order.customerPhone}</p>}
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-neutral-600">
                <span>رقم الفاتورة:</span>
                <span className="font-mono font-bold text-neutral-900">{order.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-600 mt-1">
                <span>رقم الطلب:</span>
                <span className="font-mono text-neutral-900">{order.id}</span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-600 mt-1">
                <span>تاريخ الفاتورة:</span>
                <span className="text-neutral-900">{order.createdAt}</span>
              </div>
              <div className="flex justify-between text-[11px] text-neutral-600 mt-1">
                <span>طريقة الدفع:</span>
                <span className="uppercase font-bold text-neutral-900">{order.paymentMethod}</span>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr className="border-b-2 border-neutral-900 text-neutral-900 font-bold">
                  <th className="py-2.5">الوصف / البند</th>
                  <th className="py-2.5 text-center">النوع</th>
                  <th className="py-2.5 text-center">الكمية</th>
                  <th className="py-2.5 text-left">السعر الإفرادي</th>
                  <th className="py-2.5 text-left">الإجمالي</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-medium">
                      <div>{item.title}</div>
                      {item.licenseOrPackage && (
                        <div className="text-[10px] text-neutral-500 font-normal">
                          {item.licenseOrPackage}
                        </div>
                      )}
                    </td>
                    <td className="py-3 text-center text-neutral-600">
                      {item.itemType === 'tool' ? 'أداة رقمية' : 'خدمة استوديو'}
                    </td>
                    <td className="py-3 text-center font-mono font-bold">
                      {item.quantity}
                    </td>
                    <td className="py-3 text-left font-mono" dir="ltr">
                      {item.price} SAR
                    </td>
                    <td className="py-3 text-left font-mono font-bold" dir="ltr">
                      {(item.price * item.quantity).toFixed(2)} SAR
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Breakdown */}
          <div className="flex justify-end pt-4 border-t">
            <div className="w-64 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>المجموع الفرعي:</span>
                <span className="font-mono" dir="ltr">{order.subtotal.toFixed(2)} SAR</span>
              </div>

              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>خصم كود التخفيض ({order.couponCode || 'خصم خاص'}):</span>
                  <span className="font-mono" dir="ltr">-{order.discount.toFixed(2)} SAR</span>
                </div>
              )}

              <div className="flex justify-between text-neutral-600">
                <span>ضريبة القيمة المضافة (15%):</span>
                <span className="font-mono" dir="ltr">{order.taxAmount.toFixed(2)} SAR</span>
              </div>

              <div className="flex justify-between text-base font-black text-neutral-900 pt-2 border-t border-neutral-300">
                <span>الإجمالي النهائي:</span>
                <span className="font-mono text-amber-600" dir="ltr">{order.totalAmount.toFixed(2)} SAR</span>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t text-center text-[10px] text-neutral-500 space-y-1">
            <p>شكراً لتعاملكم مع مِداد ديزاين ستور. جميع الملفات الرقمية مشمولة بضمان الترخيص المرفق.</p>
            <p>للدعم الفني والاستفسارات: support@medad-design.store</p>
          </div>

        </div>
      </div>
    </div>
  );
};
