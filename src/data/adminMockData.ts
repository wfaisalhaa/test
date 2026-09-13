import { 
  AdminOrder, 
  AdminServiceProject, 
  AdminCoupon, 
  AdminCustomer, 
  StoreSettings, 
  ActivityLog 
} from '../types';

export const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'ORD-2026-908',
    customerName: 'فيصل الهذلي',
    customerEmail: 'wfaisalhaa@gmail.com',
    customerPhone: '+966 50 123 4567',
    items: [
      {
        id: 'tool-1',
        title: 'نظام تصميم «أفق» المتكامل للواجهات وتطبيقات الجوال',
        itemType: 'tool',
        price: 189,
        quantity: 1,
        licenseOrPackage: 'ترخيص تجاري وشخصي'
      },
      {
        id: 'tool-2',
        title: 'حزمة خط «سندباد» العربي المعاصر (8 أوزان)',
        itemType: 'tool',
        price: 120,
        quantity: 1,
        licenseOrPackage: 'ترخيص تجاري وشخصي'
      }
    ],
    subtotal: 309,
    discount: 61.8,
    couponCode: 'MEDAD20',
    totalAmount: 247.2,
    taxAmount: 32.24,
    paymentMethod: 'apple-pay',
    status: 'completed',
    createdAt: '2026-09-13 11:20 ص',
    invoiceNumber: 'INV-2026-0908',
    downloadLink: 'https://medad-design.store/download/ord-908-secure-token'
  },
  {
    id: 'ORD-2026-907',
    customerName: 'سارة القحطاني',
    customerEmail: 'sara.alqahtani@techhub.sa',
    customerPhone: '+966 55 987 6543',
    items: [
      {
        id: 'srv-1',
        title: 'خدمة: تصميم هوية بصرية واستراتيجية علامة تجارية',
        itemType: 'service',
        price: 4900,
        quantity: 1,
        licenseOrPackage: 'باقة التوسع الشامل (Pro Brand)'
      }
    ],
    subtotal: 4900,
    discount: 0,
    totalAmount: 4900,
    taxAmount: 639.13,
    paymentMethod: 'bank-transfer',
    status: 'completed',
    createdAt: '2026-09-12 04:45 م',
    invoiceNumber: 'INV-2026-0907'
  },
  {
    id: 'ORD-2026-906',
    customerName: 'م. عمر بن خالد',
    customerEmail: 'omar.khalid@venture.ae',
    customerPhone: '+971 52 441 9090',
    items: [
      {
        id: 'tool-3',
        title: 'مكتبة عناصر ثلاثية الأبعاد 3D للمنتجات والتقنية',
        itemType: 'tool',
        price: 95,
        quantity: 1,
        licenseOrPackage: 'ترخيص تجاري وشخصي'
      }
    ],
    subtotal: 95,
    discount: 0,
    totalAmount: 95,
    taxAmount: 12.39,
    paymentMethod: 'mada',
    status: 'completed',
    createdAt: '2026-09-12 02:15 م',
    invoiceNumber: 'INV-2026-0906',
    downloadLink: 'https://medad-design.store/download/ord-906-secure-token'
  },
  {
    id: 'ORD-2026-905',
    customerName: 'نورة الدوسري',
    customerEmail: 'noura.design@gmail.com',
    customerPhone: '+966 54 332 1100',
    items: [
      {
        id: 'tool-5',
        title: 'حزمة فرش وحبر الخط العربي الرقمي لـ Procreate',
        itemType: 'tool',
        price: 65,
        quantity: 1,
        licenseOrPackage: 'ترخيص استخدام شخصي'
      },
      {
        id: 'tool-4',
        title: 'استوديو موك اب الشاشات والقرطاسية الفاخرة',
        itemType: 'tool',
        price: 85,
        quantity: 1,
        licenseOrPackage: 'ترخيص تجاري وشخصي'
      }
    ],
    subtotal: 150,
    discount: 30,
    couponCode: 'MEDAD20',
    totalAmount: 120,
    taxAmount: 15.65,
    paymentMethod: 'visa',
    status: 'completed',
    createdAt: '2026-09-11 09:30 م',
    invoiceNumber: 'INV-2026-0905',
    downloadLink: 'https://medad-design.store/download/ord-905-secure-token'
  },
  {
    id: 'ORD-2026-904',
    customerName: 'شركة مسار للحلول الرقمية',
    customerEmail: 'finance@masar-tech.com',
    customerPhone: '+966 11 456 7890',
    items: [
      {
        id: 'srv-2',
        title: 'خدمة: تصميم وتطوير واجهات وتجربة المستخدم UI/UX',
        itemType: 'service',
        price: 7800,
        quantity: 1,
        licenseOrPackage: 'باقة التطبيق المتكامل (Enterprise App)'
      }
    ],
    subtotal: 7800,
    discount: 500,
    couponCode: 'VIPENTERPRISE',
    totalAmount: 7300,
    taxAmount: 952.17,
    paymentMethod: 'bank-transfer',
    status: 'pending',
    createdAt: '2026-09-11 01:10 م',
    invoiceNumber: 'INV-2026-0904'
  },
  {
    id: 'ORD-2026-903',
    customerName: 'أحمد الزهراني',
    customerEmail: 'ahmed.zahrani@outlook.com',
    customerPhone: '+966 56 777 8899',
    items: [
      {
        id: 'tool-6',
        title: 'قوالب موشن جرافيك متحركة لإعلانات السوشيال ميديا',
        itemType: 'tool',
        price: 110,
        quantity: 1,
        licenseOrPackage: 'ترخيص تجاري وشخصي'
      }
    ],
    subtotal: 110,
    discount: 0,
    totalAmount: 110,
    taxAmount: 14.35,
    paymentMethod: 'mada',
    status: 'completed',
    createdAt: '2026-09-10 06:40 م',
    invoiceNumber: 'INV-2026-0903',
    downloadLink: 'https://medad-design.store/download/ord-903-secure-token'
  },
  {
    id: 'ORD-2026-902',
    customerName: 'طارق الصالح',
    customerEmail: 'tariq.s@creatives.io',
    customerPhone: '+965 99 123 456',
    items: [
      {
        id: 'tool-1',
        title: 'نظام تصميم «أفق» المتكامل للواجهات وتطبيقات الجوال',
        itemType: 'tool',
        price: 189,
        quantity: 1
      }
    ],
    subtotal: 189,
    discount: 0,
    totalAmount: 189,
    taxAmount: 24.65,
    paymentMethod: 'apple-pay',
    status: 'refunded',
    createdAt: '2026-09-09 11:15 ص',
    invoiceNumber: 'INV-2026-0902'
  }
];

export const INITIAL_PROJECTS: AdminServiceProject[] = [
  {
    id: 'PRJ-501',
    serviceId: 'srv-1',
    serviceTitle: 'تصميم هوية بصرية واستراتيجية علامة تجارية',
    packageName: 'باقة التوسع الشامل (Pro Brand)',
    clientName: 'سارة القحطاني',
    clientCompany: 'تك هب سوليوشنز (TechHub SA)',
    clientEmail: 'sara.alqahtani@techhub.sa',
    clientPhone: '+966 55 987 6543',
    budget: 4900,
    deadline: '2026-10-02',
    status: 'in_progress',
    progressPercent: 65,
    createdAt: '2026-09-12',
    briefDescription: 'إعادة تصميم الهوية البصرية لشركة ناشئة في مجال الحوسبة السحابية وحلول الذكاء الاصطناعي مع خط كوفي وشعار رمزي مبتكر.',
    deliverablesLink: 'https://figma.com/file/techhub-identity-v2',
    designerNotes: 'تم اعتماد مفاهيم الشعار الثلاثة الأولى، وجاري إتمام دليل الألوان والقرطاسية.',
    assignedDesigner: 'مِداد ستوديو - فريق الهويات'
  },
  {
    id: 'PRJ-502',
    serviceId: 'srv-2',
    serviceTitle: 'تصميم وتطوير واجهات وتجربة المستخدم UI/UX',
    packageName: 'باقة التطبيق المتكامل (Enterprise App)',
    clientName: 'م. راشد المهيدب',
    clientCompany: 'شركة مسار للحلول الرقمية',
    clientEmail: 'finance@masar-tech.com',
    clientPhone: '+966 11 456 7890',
    budget: 7800,
    deadline: '2026-10-25',
    status: 'new_brief',
    progressPercent: 15,
    createdAt: '2026-09-11',
    briefDescription: 'تصميم تجربة مستخدم لتطبيق توصيل لوجستي B2B يشمل لوحة إدارة وسائقي أسطول وتطبيق عملاء مع تدقيق كامل لسهولة الاستخدام.',
    deliverablesLink: '',
    designerNotes: 'بانتظار تأكيد التحويل البنكي ومراجعة مخططات تدفق المستخدم (User Flows).',
    assignedDesigner: 'فريق واجهات المستخدم'
  },
  {
    id: 'PRJ-503',
    serviceId: 'srv-4',
    serviceTitle: 'تصميم وبرمجة خط عربي حصري ومخصص',
    packageName: 'باقة الخط المخصص (Custom Arabic Font)',
    clientName: 'د. خالد التميمي',
    clientCompany: 'مجموعة الميراث القابضة',
    clientEmail: 'k.tamimi@almirath.com',
    clientPhone: '+966 50 882 3344',
    budget: 6500,
    deadline: '2026-09-28',
    status: 'client_review',
    progressPercent: 90,
    createdAt: '2026-08-25',
    briefDescription: 'تصميم عائلة خطوط نسخية فخمة لعلامة فاخرة، 4 أوزان مع الحروف والأرقام العربية واللاتينية الموحدة.',
    deliverablesLink: 'https://drive.google.com/font-drafts/almirath-v4',
    designerNotes: 'تم إرسال ملفات الاختبار OTF للعميل لتجربتها على المطبوعات والحملات الإعلانية.',
    assignedDesigner: 'خطاط ومصمم الخطوط الرقمية'
  },
  {
    id: 'PRJ-504',
    serviceId: 'srv-3',
    serviceTitle: 'إنتاج موشن جرافيك وفيديو إعلاني سينمائي',
    packageName: 'فيديو إعلاني ترويجي (Full 3D / 2D Motion)',
    clientName: 'ليلى الهاشمي',
    clientCompany: 'تطبيق وفير للمدفوعات',
    clientEmail: 'layla@wafeer.app',
    clientPhone: '+971 50 112 3344',
    budget: 3800,
    deadline: '2026-09-10',
    status: 'completed',
    progressPercent: 100,
    createdAt: '2026-08-18',
    briefDescription: 'فيديو ترويجي 45 ثانية لإطلاق النسخة الجديدة من التطبيق، تعليق صوتي فصيح، تحريك واجهات 3D وتأثيرات بصرية جذابة.',
    deliverablesLink: 'https://vimeo.com/wafeer-launch-final-4k',
    designerNotes: 'تم تسليم النسخة النهائية بدقة 4K مع الملفات المصدرية لـ After Effects وتم استلام التقييم 5 نجوم.',
    assignedDesigner: 'فريق الموشن والمونتاج'
  }
];

export const INITIAL_COUPONS: AdminCoupon[] = [
  {
    id: 'cpn-1',
    code: 'MEDAD20',
    discountPercent: 20,
    usageCount: 148,
    usageLimit: 500,
    expiryDate: '2026-12-31',
    isActive: true,
    minOrderAmount: 50
  },
  {
    id: 'cpn-2',
    code: 'VIPENTERPRISE',
    discountPercent: 15,
    usageCount: 12,
    usageLimit: 50,
    expiryDate: '2026-11-15',
    isActive: true,
    minOrderAmount: 2000
  },
  {
    id: 'cpn-3',
    code: 'DESIGNER10',
    discountPercent: 10,
    usageCount: 320,
    usageLimit: 1000,
    expiryDate: '2026-10-31',
    isActive: true,
    minOrderAmount: 0
  },
  {
    id: 'cpn-4',
    code: 'RAMADAN_PREVIEW',
    discountPercent: 25,
    usageCount: 200,
    usageLimit: 200,
    expiryDate: '2026-04-10',
    isActive: false,
    minOrderAmount: 100
  }
];

export const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'CUST-101',
    name: 'فيصل الهذلي',
    email: 'wfaisalhaa@gmail.com',
    phone: '+966 50 123 4567',
    country: 'المملكة العربية السعودية',
    city: 'الرياض',
    ordersCount: 4,
    projectsCount: 1,
    totalSpent: 1250,
    joinedDate: '2026-01-15',
    tier: 'VIP'
  },
  {
    id: 'CUST-102',
    name: 'سارة القحطاني',
    email: 'sara.alqahtani@techhub.sa',
    phone: '+966 55 987 6543',
    country: 'المملكة العربية السعودية',
    city: 'الخبر',
    ordersCount: 2,
    projectsCount: 1,
    totalSpent: 5180,
    joinedDate: '2026-03-20',
    tier: 'VIP'
  },
  {
    id: 'CUST-103',
    name: 'م. عمر بن خالد',
    email: 'omar.khalid@venture.ae',
    phone: '+971 52 441 9090',
    country: 'الإمارات العربية المتحدة',
    city: 'دبي',
    ordersCount: 3,
    projectsCount: 0,
    totalSpent: 420,
    joinedDate: '2026-05-11',
    tier: 'Regular'
  },
  {
    id: 'CUST-104',
    name: 'شركة مسار للحلول الرقمية',
    email: 'finance@masar-tech.com',
    phone: '+966 11 456 7890',
    country: 'المملكة العربية السعودية',
    city: 'جدة',
    ordersCount: 1,
    projectsCount: 1,
    totalSpent: 7300,
    joinedDate: '2026-09-01',
    tier: 'VIP'
  },
  {
    id: 'CUST-105',
    name: 'نورة الدوسري',
    email: 'noura.design@gmail.com',
    phone: '+966 54 332 1100',
    country: 'المملكة العربية السعودية',
    city: 'الدمام',
    ordersCount: 5,
    projectsCount: 0,
    totalSpent: 580,
    joinedDate: '2026-02-04',
    tier: 'Regular'
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'مِداد ديزاين ستور',
  storeTagline: 'المتجر العربي المتخصص في أدوات الواجهات الرقمية وخدمات التصميم الاحترافية',
  contactEmail: 'contact@medad-design.store',
  supportPhone: '+966 11 234 5678',
  announcementBar: 'عروض موسم التصميم: استخدم كود MEDAD20 للحصول على خصم 20% على جميع الأدوات والخدمات',
  isAnnouncementEnabled: true,
  taxRatePercent: 15,
  enableMada: true,
  enableApplePay: true,
  enableCreditCard: true,
  enableBankTransfer: true,
  maintenanceMode: false,
  autoApproveDownloads: true
};

export const MONTHLY_SALES_DATA = [
  { month: 'أكتوبر', toolsSales: 12400, servicesSales: 24000, total: 36400, orders: 120 },
  { month: 'نوفمبر', toolsSales: 15600, servicesSales: 28500, total: 44100, orders: 145 },
  { month: 'ديسمبر', toolsSales: 19800, servicesSales: 35000, total: 54800, orders: 180 },
  { month: 'يناير', toolsSales: 18200, servicesSales: 31000, total: 49200, orders: 165 },
  { month: 'فبراير', toolsSales: 22400, servicesSales: 42000, total: 64400, orders: 210 },
  { month: 'مارس', toolsSales: 25900, servicesSales: 38000, total: 63900, orders: 225 },
  { month: 'أبريل', toolsSales: 28500, servicesSales: 46000, total: 74500, orders: 250 },
  { month: 'مايو', toolsSales: 31200, servicesSales: 52000, total: 83200, orders: 285 },
  { month: 'يونيو', toolsSales: 29800, servicesSales: 49000, total: 78800, orders: 260 },
  { month: 'يوليو', toolsSales: 34100, servicesSales: 58000, total: 92100, orders: 310 },
  { month: 'أغسطس', toolsSales: 38900, servicesSales: 64000, total: 102900, orders: 345 },
  { month: 'سبتمبر', toolsSales: 43500, servicesSales: 71000, total: 114500, orders: 390 },
];

export const CATEGORY_DISTRIBUTION = [
  { name: 'واجهات UI/UX وأنظمة Figma', value: 38, color: '#f59e0b' },
  { name: 'الخطوط العربية المعاصرة', value: 24, color: '#8b5cf6' },
  { name: 'عناصر 3D ونماذج Blender', value: 16, color: '#3b82f6' },
  { name: 'الموك اب وقوالب العرض', value: 12, color: '#10b981' },
  { name: 'الموشن جرافيك وفرش Procreate', value: 10, color: '#ec4899' },
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'act-1',
    type: 'sale',
    title: 'طلب جديد #ORD-908',
    description: 'قام فيصل بشراء نظام «أفق» وحزمة خط سندباد بقيمة 247.2 ر.س',
    timestamp: 'منذ 15 دقيقة',
    amount: 247.2
  },
  {
    id: 'act-2',
    type: 'brief',
    title: 'طلب خدمة استوديو جديد',
    description: 'تم تسجيل موجز مشروع UI/UX جديد من شركة مسار للحلول',
    timestamp: 'منذ ساعة',
    amount: 7800
  },
  {
    id: 'act-3',
    type: 'download',
    title: 'تنزيل ملف رقمي',
    description: 'تم تنزيل حزمة عناصر 3D التقنية (Blender + PNG) من قبل م. عمر',
    timestamp: 'منذ ساعتين'
  },
  {
    id: 'act-4',
    type: 'coupon',
    title: 'استخدام كود تخفيض',
    description: 'تم تفعيل كود الخصم MEDAD20 وحسم 20% على الطلب #ORD-905',
    timestamp: 'منذ 4 ساعات'
  },
  {
    id: 'act-5',
    type: 'review',
    title: 'تسليم مشروع واكتماله',
    description: 'تم اعتماد التسليم النهائي لفيديو موشن تطبيق وفير وتقييم 5 نجوم',
    timestamp: 'منذ يوم'
  }
];

// Aliases for convenience
export const MOCK_ADMIN_ORDERS = INITIAL_ORDERS;
export const MOCK_ADMIN_PROJECTS = INITIAL_PROJECTS;
export const MOCK_ADMIN_COUPONS = INITIAL_COUPONS;
export const MOCK_ADMIN_CUSTOMERS = INITIAL_CUSTOMERS;
export const MOCK_STORE_SETTINGS = INITIAL_SETTINGS;
export const MOCK_ACTIVITY_LOGS = INITIAL_ACTIVITY_LOGS;

