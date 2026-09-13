import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  Layers, 
  Briefcase, 
  Wand2, 
  Search, 
  CheckCircle2, 
  ArrowLeft, 
  Heart,
  SlidersHorizontal,
  PackageOpen
} from 'lucide-react';
import { 
  DesignTool, 
  DesignService, 
  CartItem, 
  Currency, 
  FilterState,
  AdminOrder,
  AdminServiceProject,
  AdminCoupon,
  AdminCustomer,
  StoreSettings,
  ActivityLog,
  OrderStatus,
  ProjectStage
} from './types';
import { DESIGN_TOOLS, DESIGN_SERVICES } from './data/mockData';
import { 
  MOCK_ADMIN_ORDERS, 
  MOCK_ADMIN_PROJECTS, 
  MOCK_ADMIN_COUPONS, 
  MOCK_ADMIN_CUSTOMERS, 
  MOCK_STORE_SETTINGS, 
  MOCK_ACTIVITY_LOGS 
} from './data/adminMockData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ServiceCard } from './components/ServiceCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ServiceBookingModal } from './components/ServiceBookingModal';
import { InteractiveDesignTools } from './components/InteractiveDesignTools';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  // Currency State
  const [currency, setCurrency] = useState<Currency>('SAR');

  // Admin Panel Toggle
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Dynamic Store Data & Admin State
  const [tools, setTools] = useState<DesignTool[]>(DESIGN_TOOLS);
  const [orders, setOrders] = useState<AdminOrder[]>(MOCK_ADMIN_ORDERS);
  const [projects, setProjects] = useState<AdminServiceProject[]>(MOCK_ADMIN_PROJECTS);
  const [coupons, setCoupons] = useState<AdminCoupon[]>(MOCK_ADMIN_COUPONS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(MOCK_ADMIN_CUSTOMERS);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(MOCK_STORE_SETTINGS);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(MOCK_ACTIVITY_LOGS);

  // Active Main Navigation Section
  const [activeSection, setActiveSection] = useState<'all' | 'tools' | 'services' | 'lab'>('all');

  // Filter State
  const [filter, setFilter] = useState<FilterState>({
    searchQuery: '',
    selectedType: 'all',
    selectedCategory: 'all',
    selectedSoftware: 'الكل',
    onlyFree: false,
    onlyFeatured: false,
    sortBy: 'popular',
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [previewTool, setPreviewTool] = useState<DesignTool | null>(null);
  const [bookingService, setBookingService] = useState<DesignService | null>(null);

  // Cart State (Initialized with 1 sample item for immediate delight)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return [
      {
        id: 'tool-1',
        itemType: 'tool',
        title: 'نظام تصميم «أفق» المتكامل للواجهات',
        price: 189,
        image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=600&auto=format&fit=crop',
        quantity: 1,
        licenseType: 'ترخيص تجاري وشخصي'
      }
    ];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<DesignTool[]>(() => {
    return [DESIGN_TOOLS[1]]; // sindbad font
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Tool Handlers for Admin
  const handleSaveTool = (toolData: Partial<DesignTool>, isEdit: boolean, originalId?: string) => {
    if (isEdit && originalId) {
      setTools((prev) =>
        prev.map((t) => (t.id === originalId ? { ...t, ...toolData } : t))
      );
      setActivityLogs((prev) => [
        {
          id: `act-${Date.now()}`,
          type: 'tool_updated',
          title: `تعديل أداة: ${toolData.title || ''}`,
          description: 'تم تحديث البيانات والتسعير في المتجر',
          timestamp: 'الآن',
          user: 'فيصل (المدير)',
        },
        ...prev,
      ]);
    } else {
      const newTool: DesignTool = {
        id: `tool-${Date.now()}`,
        type: 'tool',
        title: toolData.title || 'أداة جديدة',
        titleEn: toolData.titleEn || 'New Design Tool',
        category: toolData.category || 'ui-ux',
        categoryLabel: toolData.categoryLabel || 'أنظمة وتصميم الواجهات',
        description: toolData.description || '',
        detailedDescription: toolData.detailedDescription || '',
        price: toolData.price ?? 99,
        originalPrice: toolData.originalPrice,
        isFree: toolData.isFree,
        rating: 5.0,
        reviewsCount: 1,
        downloadsCount: 0,
        fileSize: toolData.fileSize || '30 MB',
        version: toolData.version || '1.0',
        license: toolData.license || 'ترخيص تجاري وشخصي',
        software: toolData.software || ['Figma'],
        fileFormats: toolData.fileFormats || ['.fig'],
        image: toolData.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
        galleryImages: toolData.galleryImages || [
          toolData.image || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop'
        ],
        contentsList: toolData.contentsList || [
          'الملفات المصدرية الكاملة',
          'دليل الإرشادات والخطوط المستخدمة',
          'تحديثات مجانية مدى الحياة'
        ],
        tags: toolData.tags || ['تصميم'],
        featured: toolData.featured,
      };
      setTools((prev) => [newTool, ...prev]);
      setActivityLogs((prev) => [
        {
          id: `act-${Date.now()}`,
          type: 'tool_added',
          title: `إضافة أداة جديدة: ${newTool.title}`,
          description: 'نشر المنتج الرقمي الجديد في واجهة المتجر',
          timestamp: 'الآن',
          user: 'فيصل (المدير)',
        },
        ...prev,
      ]);
    }
  };

  const handleDeleteTool = (toolId: string) => {
    setTools((prev) => prev.filter((t) => t.id !== toolId));
    setWishlist((prev) => prev.filter((t) => t.id !== toolId));
  };

  const handleToggleFeaturedTool = (toolId: string) => {
    setTools((prev) =>
      prev.map((t) => (t.id === toolId ? { ...t, featured: !t.featured } : t))
    );
  };

  const handleSaveProject = (updatedProject: AdminServiceProject) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    );
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleSaveCoupon = (couponData: Omit<AdminCoupon, 'id' | 'usageCount'>) => {
    const newCoupon: AdminCoupon = {
      id: `cpn-${Date.now()}`,
      ...couponData,
      usageCount: 0,
    };
    setCoupons((prev) => [newCoupon, ...prev]);
  };

  const handleToggleCoupon = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
  };

  // Sync active section with filter.selectedType
  const handleSelectSection = (section: 'all' | 'tools' | 'services' | 'lab') => {
    setActiveSection(section);
    if (section === 'all') {
      setFilter((prev) => ({ ...prev, selectedType: 'all', selectedCategory: 'all' }));
    } else if (section === 'tools') {
      setFilter((prev) => ({ ...prev, selectedType: 'tools', selectedCategory: 'all' }));
    } else if (section === 'services') {
      setFilter((prev) => ({ ...prev, selectedType: 'services', selectedCategory: 'all' }));
    } else if (section === 'lab') {
      const el = document.getElementById('designer-lab');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (tool: DesignTool, license?: string) => {
    const existingIndex = cartItems.findIndex((item) => item.id === tool.id);
    if (existingIndex > -1) {
      setCartItems((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      showToast(`تم زيادة كمية "${tool.title}" في السلة`);
    } else {
      const finalPrice = license === 'extended' ? Math.round(tool.price * 1.8) : tool.price;
      setCartItems((prev) => [
        ...prev,
        {
          id: tool.id,
          itemType: 'tool',
          title: tool.title,
          price: finalPrice,
          image: tool.image,
          quantity: 1,
          licenseType: license || tool.license,
        },
      ]);
      showToast(`تمت إضافة "${tool.title}" إلى السلة`);
    }
    setIsCartOpen(true);
  };

  // Handle Service Booking Confirmation
  const handleConfirmBooking = (data: {
    serviceId: string;
    serviceTitle: string;
    packageId: string;
    packageName: string;
    price: number;
    clientName: string;
  }) => {
    // Add down-payment or service reservation to cart
    setCartItems((prev) => [
      ...prev,
      {
        id: `srv-order-${Date.now()}`,
        itemType: 'service',
        title: `${data.serviceTitle}`,
        price: data.price,
        image: bookingService?.image || 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=400&auto=format&fit=crop',
        quantity: 1,
        selectedPackage: data.packageName,
      },
    ]);

    // Create real record in admin studio projects pipeline
    const newProject: AdminServiceProject = {
      id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceId: data.serviceId,
      serviceTitle: data.serviceTitle,
      packageName: data.packageName,
      clientName: data.clientName,
      clientEmail: 'client@example.com',
      clientPhone: '+966 55 123 4567',
      clientCompany: 'مشروع جديد',
      budget: data.price,
      deadline: 'خلال أسبوعين',
      briefDescription: `طلب حجز باقة «${data.packageName}» لخدمة «${data.serviceTitle}» ومناقشة متطلبات المشروع والتسليم.`,
      status: 'new_brief',
      progressPercent: 10,
      createdAt: new Date().toISOString().split('T')[0],
      assignedDesigner: 'مِداد ستوديو',
    };

    setProjects((prev) => [newProject, ...prev]);

    setActivityLogs((prev) => [
      {
        id: `act-${Date.now()}`,
        type: 'project_created',
        title: `حجز خدمة جديد: ${data.serviceTitle}`,
        description: `العميل ${data.clientName} حجز باقة ${data.packageName} بقيمة ${data.price} ر.س`,
        timestamp: 'الآن',
        user: data.clientName,
      },
      ...prev,
    ]);

    showToast(`تم تسجيل حجز الخدمة بنجاح!`);
  };

  // Handle Custom Project Request from Cost Estimator
  const handleRequestCustomProject = (data: {
    service: string;
    budget: number;
    days: number;
    scope: string;
  }) => {
    const matchedService = DESIGN_SERVICES.find((s) => s.category.includes('ui') || s.category.includes('branding')) || DESIGN_SERVICES[0];
    setBookingService(matchedService);
  };

  // Handle Wishlist Toggle
  const handleToggleWishlist = (tool: DesignTool) => {
    const exists = wishlist.some((item) => item.id === tool.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== tool.id));
      showToast(`تمت إزالة "${tool.title}" من المفضلة`);
    } else {
      setWishlist((prev) => [...prev, tool]);
      showToast(`تم حفظ "${tool.title}" في المفضلة`);
    }
  };

  // Filtered Tools using dynamic state tools
  const filteredTools = useMemo(() => {
    if (filter.selectedType === 'services') return [];

    return tools.filter((tool) => {
      // Search
      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase();
        const matchTitle = tool.title.toLowerCase().includes(q) || tool.titleEn.toLowerCase().includes(q);
        const matchDesc = tool.description.toLowerCase().includes(q);
        const matchTags = tool.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }

      // Category
      if (filter.selectedCategory !== 'all' && tool.category !== filter.selectedCategory) {
        return false;
      }

      // Software
      if (filter.selectedSoftware !== 'الكل') {
        if (!tool.software.includes(filter.selectedSoftware as any)) {
          return false;
        }
      }

      // Free Only
      if (filter.onlyFree && !tool.isFree) {
        return false;
      }

      // Featured Only
      if (filter.onlyFeatured && !tool.featured) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'popular') return b.downloadsCount - a.downloadsCount;
      if (filter.sortBy === 'rating') return b.rating - a.rating;
      if (filter.sortBy === 'price-low') return a.price - b.price;
      if (filter.sortBy === 'price-high') return b.price - a.price;
      return 0;
    });
  }, [filter, tools]);

  // Filtered Services
  const filteredServices = useMemo(() => {
    if (filter.selectedType === 'tools' || filter.onlyFree) return [];

    return DESIGN_SERVICES.filter((service) => {
      // Search
      if (filter.searchQuery) {
        const q = filter.searchQuery.toLowerCase();
        const matchTitle = service.title.toLowerCase().includes(q) || service.titleEn.toLowerCase().includes(q);
        const matchDesc = service.description.toLowerCase().includes(q);
        const matchTags = service.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) return false;
      }

      // Category
      if (filter.selectedCategory !== 'all') {
        const isMatch = service.category === filter.selectedCategory ||
          (filter.selectedCategory === 'branding' && service.category === 'branding') ||
          (filter.selectedCategory === 'ui-ux' && service.category === 'ui-ux-design') ||
          (filter.selectedCategory === 'fonts' && service.category === 'custom-fonts') ||
          (filter.selectedCategory === 'motion' && service.category === 'motion-ads') ||
          (filter.selectedCategory === 'design-audit' && service.category === 'design-audit');
        if (!isMatch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'popular') return b.completedProjects - a.completedProjects;
      if (filter.sortBy === 'rating') return b.rating - a.rating;
      if (filter.sortBy === 'price-low') return a.startingPrice - b.startingPrice;
      if (filter.sortBy === 'price-high') return b.startingPrice - a.startingPrice;
      return 0;
    });
  }, [filter]);

  // If Admin Panel is Active, show full Admin Dashboard
  if (isAdminOpen) {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 bg-[#161922] text-white px-4 py-3 rounded-xl border border-amber-400/40 shadow-2xl animate-fade-in text-xs font-bold">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AdminDashboard
          currency={currency}
          tools={tools}
          orders={orders}
          projects={projects}
          coupons={coupons}
          customers={customers}
          settings={storeSettings}
          activityLogs={activityLogs}
          onExitAdmin={() => setIsAdminOpen(false)}
          onSaveTool={handleSaveTool}
          onDeleteTool={handleDeleteTool}
          onToggleFeaturedTool={handleToggleFeaturedTool}
          onSaveProject={handleSaveProject}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onSaveCoupon={handleSaveCoupon}
          onToggleCoupon={handleToggleCoupon}
          onDeleteCoupon={handleDeleteCoupon}
          onSaveSettings={(newSet) => setStoreSettings(newSet)}
          onPreviewToolInStore={(t) => {
            setIsAdminOpen(false);
            setPreviewTool(t);
          }}
          onToast={showToast}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-[#e5e7eb] flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 flex items-center gap-2.5 bg-[#161922] text-white px-4 py-3 rounded-xl border border-amber-400/40 shadow-2xl animate-fade-in text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Announcement Bar from Store Settings */}
      {storeSettings.isAnnouncementEnabled && storeSettings.announcementBar && (
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-black py-2 px-4 text-xs font-bold text-center flex items-center justify-center gap-2 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{storeSettings.announcementBar}</span>
        </div>
      )}

      {/* Header */}
      <Header
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        searchQuery={filter.searchQuery}
        onSearchChange={(q) => setFilter((prev) => ({ ...prev, searchQuery: q }))}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Hero Section (Visible on 'all' and 'tools') */}
      {activeSection === 'all' && (
        <HeroBanner
          onExploreTools={() => handleSelectSection('tools')}
          onExploreServices={() => handleSelectSection('services')}
          onOpenLab={() => handleSelectSection('lab')}
        />
      )}

      {/* Main Filter Toolbar */}
      <CategoryFilter
        filter={filter}
        onFilterChange={(newF) => setFilter((prev) => ({ ...prev, ...newF }))}
        toolsCount={filteredTools.length}
        servicesCount={filteredServices.length}
      />

      {/* Main Store Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Section 1: Digital Design Tools */}
        {(filter.selectedType === 'all' || filter.selectedType === 'tools') && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    أدوات وملحقات التصميم الرقمية
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  أنظمة تصميم Figma، خطوط عربية، أيقونات 3D، قوالب موشن، وفرش رقمية جاهزة للاستخدام الفوري
                </p>
              </div>

              <span className="text-xs font-bold text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                عرض {filteredTools.length} أداة وملحق
              </span>
            </div>

            {filteredTools.length === 0 ? (
              <div className="py-14 text-center bg-white/5 rounded-2xl border border-white/5 space-y-3">
                <PackageOpen className="w-10 h-10 text-neutral-500 mx-auto" />
                <h3 className="text-base font-bold text-white">لم يتم العثور على أدوات مطابقة</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  حاول إزالة عوامل التصفية أو البحث عن مصطلح آخر مثل "Figma", "خطوط", أو "3D".
                </p>
                <button
                  onClick={() => setFilter({
                    searchQuery: '',
                    selectedType: 'all',
                    selectedCategory: 'all',
                    selectedSoftware: 'الكل',
                    onlyFree: false,
                    onlyFeatured: false,
                    sortBy: 'popular',
                  })}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-bold"
                >
                  إعادة ضبط التصفية
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTools.map((tool) => (
                  <ProductCard
                    key={tool.id}
                    tool={tool}
                    currency={currency}
                    isWishlisted={wishlist.some((item) => item.id === tool.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onAddToCart={(t) => handleAddToCart(t)}
                    onOpenPreview={setPreviewTool}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 2: Professional Design Services */}
        {(filter.selectedType === 'all' || filter.selectedType === 'services') && !filter.onlyFree && (
          <div className="space-y-6 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-violet-400" />
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    خدمات التصميم الاحترافية والاستوديو
                  </h2>
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  نصمم هويتك البصرية، واجهات منتجك الرقمي، خطوطك الحصرية، ونقدم استشارات تدقيق معتمدة
                </p>
              </div>

              <span className="text-xs font-bold text-neutral-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                {filteredServices.length} خدمات متاحة للحجز
              </span>
            </div>

            {filteredServices.length === 0 ? (
              <div className="py-14 text-center bg-white/5 rounded-2xl border border-white/5 space-y-3">
                <Briefcase className="w-10 h-10 text-neutral-500 mx-auto" />
                <h3 className="text-base font-bold text-white">لم يتم العثور على خدمات مطابقة</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  حاول تغيير فئة الخدمة أو البحث عن "هوية", "واجهات", أو "موشن".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    currency={currency}
                    onBookService={setBookingService}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Section 3: Interactive Designer Playground & Cost Estimator */}
        <InteractiveDesignTools
          currency={currency}
          onRequestCustomProject={handleRequestCustomProject}
        />

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => setFilter((prev) => ({ ...prev, selectedCategory: cat }))}
        onOpenLab={() => handleSelectSection('lab')}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Product Detail & Live Sandbox Modal */}
      <ProductDetailModal
        tool={previewTool}
        currency={currency}
        onClose={() => setPreviewTool(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Service Booking & Brief Builder Modal */}
      <ServiceBookingModal
        service={bookingService}
        currency={currency}
        onClose={() => setBookingService(null)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={(id, newQty) => {
          setCartItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
          );
        }}
        onRemoveItem={(id) => {
          setCartItems((prev) => prev.filter((item) => item.id !== id));
          showToast('تم حذف العنصر من السلة');
        }}
        onClearCart={() => setCartItems([])}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        currency={currency}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={handleToggleWishlist}
        onOpenPreview={setPreviewTool}
      />

    </div>
  );
}
