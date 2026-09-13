export type ItemType = 'tool' | 'service';

export type SoftwareCompatibility = 
  | 'Figma'
  | 'Adobe Photoshop'
  | 'Adobe Illustrator'
  | 'Adobe After Effects'
  | 'Blender'
  | 'Procreate'
  | 'Webflow';

export interface DesignTool {
  id: string;
  type: 'tool';
  title: string;
  titleEn: string;
  category: 'ui-ux' | 'fonts' | '3d-icons' | 'mockups' | 'brushes' | 'motion';
  categoryLabel: string;
  description: string;
  detailedDescription: string;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  rating: number;
  reviewsCount: number;
  downloadsCount: number;
  software: SoftwareCompatibility[];
  fileFormats: string[];
  fileSize: string;
  version: string;
  license: 'ترخيص تجاري وشخصي' | 'ترخيص استخدام شخصي' | 'ترخيص غير محدود';
  image: string;
  galleryImages: string[];
  featured?: boolean;
  tags: string[];
  contentsList: string[];
  sampleFontText?: string;
  sampleColors?: string[];
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  deliveryDays: number;
  revisions: number | 'غير محدود';
  features: string[];
  recommended?: boolean;
}

export interface DesignService {
  id: string;
  type: 'service';
  title: string;
  titleEn: string;
  category: 'branding' | 'ui-ux-design' | 'motion-ads' | 'custom-fonts' | 'packaging' | 'design-audit';
  categoryLabel: string;
  description: string;
  detailedDescription: string;
  startingPrice: number;
  deliveryTime: string;
  completedProjects: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tags: string[];
  packages: ServicePackage[];
  deliverables: string[];
  workflowSteps: { stepNumber: number; title: string; desc: string }[];
}

export interface CartItem {
  id: string;
  itemType: ItemType;
  title: string;
  price: number;
  image: string;
  quantity: number;
  selectedPackage?: string; // for services
  licenseType?: string;
  fileFormat?: string;
}

export type Currency = 'SAR' | 'USD' | 'AED' | 'EGP';

export interface FilterState {
  searchQuery: string;
  selectedType: 'all' | 'tools' | 'services';
  selectedCategory: string;
  selectedSoftware: string;
  onlyFree: boolean;
  onlyFeatured: boolean;
  sortBy: 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

// Admin Panel Types
export type OrderStatus = 'completed' | 'pending' | 'refunded' | 'failed';
export type PaymentMethod = 'mada' | 'apple-pay' | 'visa' | 'bank-transfer' | 'stc-pay';

export interface OrderItem {
  id: string;
  title: string;
  itemType: ItemType;
  price: number;
  quantity: number;
  licenseOrPackage?: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  invoiceNumber: string;
  taxAmount: number;
  downloadLink?: string;
}

export type ProjectStage = 'new_brief' | 'in_progress' | 'client_review' | 'completed' | 'cancelled';

export interface AdminServiceProject {
  id: string;
  serviceId: string;
  serviceTitle: string;
  packageName: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  budget: number;
  deadline: string;
  status: ProjectStage;
  progressPercent: number;
  createdAt: string;
  briefDescription: string;
  deliverablesLink?: string;
  designerNotes?: string;
  assignedDesigner?: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountPercent: number;
  usageCount: number;
  usageLimit: number;
  expiryDate: string;
  isActive: boolean;
  minOrderAmount?: number;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  ordersCount: number;
  projectsCount: number;
  totalSpent: number;
  joinedDate: string;
  tier: 'VIP' | 'Regular' | 'New';
}

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  contactEmail: string;
  supportPhone: string;
  announcementBar: string;
  isAnnouncementEnabled: boolean;
  taxRatePercent: number;
  enableMada: boolean;
  enableApplePay: boolean;
  enableCreditCard: boolean;
  enableBankTransfer: boolean;
  maintenanceMode: boolean;
  autoApproveDownloads: boolean;
}

export interface ActivityLog {
  id: string;
  type: 'sale' | 'brief' | 'download' | 'review' | 'coupon';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
}

