import { DesignTool, DesignService } from '../types';

export const DESIGN_TOOLS: DesignTool[] = [
  {
    id: 'tool-1',
    type: 'tool',
    title: 'نظام تصميم «أفق» المتكامل للواجهات وتطبيقات الجوال',
    titleEn: 'Ufoq Enterprise UI Kit & Design System',
    category: 'ui-ux',
    categoryLabel: 'أنظمة وتصميم الواجهات',
    description: 'مكتبة مكونات Figma ضخمة تدعم الوضعين الداكن والفاتح ومصممة بالكامل لدعم اللغة العربية RTL والإنجليزية LTR مع أكثر من 1,800 مكون.',
    detailedDescription: 'نظام تصميم متطور مبني على أحدث معايير Auto Layout 5.0 ومُتغيرات Figma Variables. يحتوي على أكثر من 300 شاشة مسبقة الصنع لتطبيقات التجارة الإلكترونية، المالية، ولوحات التحكم الإدارية. جاهز للإنتاج والتسليم المباشر للمطورين.',
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviewsCount: 142,
    downloadsCount: 1840,
    software: ['Figma'],
    fileFormats: ['.fig', '.json (Tokens)'],
    fileSize: '142 MB',
    version: '3.2',
    license: 'ترخيص تجاري وشخصي',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    tags: ['Figma', 'UI Kit', 'RTL', 'Design System', 'Dark Mode'],
    contentsList: [
      '1,800+ مكون تفاعلي مع حالات التفاعل المختلفة (Hover, Pressed, Disabled)',
      '320 شاشة جاهزة للتطبيقات والمواقع الإلكترونية',
      'دعم كامل ومتقن للاتجاهين (RTL / LTR)',
      'نظام ألوان وتيبوغرافي مرن متصل بـ Figma Variables',
      'دليل إرشادي لاستخدام المكتبة وتخصيصها'
    ],
    sampleColors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  },
  {
    id: 'tool-2',
    type: 'tool',
    title: 'حزمة خط «سندباد» العربي المعاصر (8 أوزان)',
    titleEn: 'Sindbad Contemporary Arabic Font Family',
    category: 'fonts',
    categoryLabel: 'الخطوط العربية والطباعة',
    description: 'عائلة خطوط هندسية حديثة تدعم التشكيل العربي الكامل والأحرف اللاتينية، مثالية للشعارات والمنصات الرقمية والمطبوعات الفاخرة.',
    detailedDescription: 'تم تصميم خط سندباد ليلبي متطلبات الهويات البصرية الرقمية الحديثة. يتميز بالوضوح الفائق على الشاشات الصغيرة (Mobile Displays) والجمالية الرائدة في العناوين والملصقات الإعلانية. يشمل 8 أوزان من الرفيع (Thin) إلى الأسود الفائق (Black).',
    price: 120,
    originalPrice: 175,
    rating: 5.0,
    reviewsCount: 88,
    downloadsCount: 960,
    software: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Webflow'],
    fileFormats: ['.otf', '.ttf', '.woff2', '.woff'],
    fileSize: '18 MB',
    version: '2.0',
    license: 'ترخيص تجاري وشخصي',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    tags: ['خطوط عربية', 'Arabic Font', 'Typography', 'Branding', 'Web Font'],
    contentsList: [
      '8 أوزان رسمية: Thin, Light, Regular, Medium, SemiBold, Bold, ExtraBold, Black',
      'تضمين صيغ الويب الحديثة (WOFF2) لتحميل فائق السرعة في المواقع',
      'دعم كامل لعلامات الترقيم والتشكيل والأرقام العربية والمشرقية',
      'ترخيص للاستخدام على الويب والمطبوعات وتطبيقات الجوال'
    ],
    sampleFontText: 'الإبداع في التصميم يصنع الفارق في كل تفصيلة'
  },
  {
    id: 'tool-3',
    type: 'tool',
    title: 'مجموعة أيقونات ثلاثية الأبعاد «نيون 3D» للأعمال والتقنية',
    titleEn: 'Neon 3D Tech & Business Icon Pack',
    category: '3d-icons',
    categoryLabel: 'الأيقونات والعناصر ثلاثية الأبعاد',
    description: 'أكثر من 150 عنصراً ثلاثي الأبعاد بريندر فائق الدقة 4K مع ملفات Blender القابلة لتعديل الألوان والإضاءة بالكامل.',
    detailedDescription: 'حزمة غنية بعناصر التجارة الإلكترونية، الذكاء الاصطناعي، التحليلات، وسائل الدفع، والمكاتب الحديثة. مجهزة بزوايا رؤية متعددة (Front, Isometric) وخلفيات مفرغة PNG جاهزة للسحب والإفلات في Figma أو Photoshop.',
    price: 95,
    originalPrice: 130,
    rating: 4.8,
    reviewsCount: 65,
    downloadsCount: 1420,
    software: ['Blender', 'Figma', 'Adobe Photoshop'],
    fileFormats: ['.blend', '.png (4K)', '.obj', '.gltf'],
    fileSize: '1.4 GB',
    version: '1.5',
    license: 'ترخيص تجاري وشخصي',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    tags: ['3D Icons', 'Blender', 'Render 4K', 'Tech', 'Isometric'],
    contentsList: [
      '150+ أيقونة ثلاثية الأبعاد بزوايا متعددة',
      'ملف Blender 4.x متكامل بمواد وإضاءات احترافية Cycles / Eevee',
      'صور مفرغة PNG بدقة فائقة 4000x4000 بكسل',
      'مكتبة Figma Components للاستخدام الفوري'
    ]
  },
  {
    id: 'tool-4',
    type: 'tool',
    title: 'استوديو موك اب الهويات التجارية والأجهزة الذكية 2026',
    titleEn: 'Master Branding & Device Mockups Suite',
    category: 'mockups',
    categoryLabel: 'موك اب ونماذج العرض الواقعية',
    description: 'نماذج عرض واقعية فائقة الدقة تضم شاشات iPhone 16 Pro، ماك بوك، بطاقات العمل، الأكياس الفاخرة، ولوحات الإعلانات.',
    detailedDescription: 'تم تصويرها وإنشاؤها بتقنيات إضاءة ستوديو حقيقية. تتميز بطبقات كائنات ذكية (Smart Objects) في الفوتوشوب ونماذج سهلة التبديل في فيجما لتتيح لك استعراض تصاميمك للعميل بجاذبية بصرية سينمائية.',
    price: 110,
    originalPrice: 160,
    rating: 4.9,
    reviewsCount: 119,
    downloadsCount: 2210,
    software: ['Adobe Photoshop', 'Figma'],
    fileFormats: ['.psd', '.fig'],
    fileSize: '3.8 GB',
    version: '4.0',
    license: 'ترخيص تجاري وشخصي',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    tags: ['Mockup', 'Photoshop', 'Branding', 'iPhone', 'Smart Object'],
    contentsList: [
      '45 ملف PSD منفصل بطبقات منظمة ومعزولة',
      'تغيير الخلفيات والظلال وعمق الميدان (Depth of field)',
      'دقة تصوير 6000x4000 بكسل (300 DPI)',
      'فيديو تعليمي يشرح أسرار دمج تصاميمك بواقعية'
    ]
  },
  {
    id: 'tool-5',
    type: 'tool',
    title: 'حزمة فرش وخامات الرسم الرقمي والخط العربي لـ Procreate',
    titleEn: 'Arabic Calligraphy & Texture Master Brushes',
    category: 'brushes',
    categoryLabel: 'فرش وملحقات الرسم الرقمي',
    description: 'أكثر من 80 فرشاة مخصصة للرسم الرقمي تحاكي قصبات الخط العربي التقليدي، الأحبار المائية، وخامات الورق العتيق.',
    detailedDescription: 'صممت خصيصاً لمستخدمي iPad وقلم Apple Pencil مع حساسية ضغط وميلان دقيقة للغاية. تمكّنك من كتابة الخط الديواني، الثلث، الكوفي، والحر بأسلوب رقمي انسيابي كأنه على ورق طبيعي.',
    price: 65,
    originalPrice: 85,
    rating: 4.9,
    reviewsCount: 94,
    downloadsCount: 1750,
    software: ['Procreate', 'Adobe Photoshop'],
    fileFormats: ['.brushset', '.abr'],
    fileSize: '480 MB',
    version: '2.4',
    license: 'ترخيص غير محدود',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    tags: ['Procreate', 'Arabic Calligraphy', 'Brushes', 'iPad', 'Digital Art'],
    contentsList: [
      '85 فرشاة احترافية مقسمة لمجموعات (قصب، حبر، رذاذ، ورق مقوى)',
      '20 خامة ورقية عالية الدقة كطبقات خلفية',
      'كتيب إرشادي وضبط زوايا القصبة المناسبة لكل خط'
    ]
  },
  {
    id: 'tool-6',
    type: 'tool',
    title: 'قوالب موشن جرافيك وانتقالات بصرية احترافية للمحتوى والإعلانات',
    titleEn: 'Kinetic Motion & Social Ad Pack for After Effects',
    category: 'motion',
    categoryLabel: 'قوالب الرسوم المتحركة والموشن',
    description: 'مجموعة عناصر متحركة جاهزة لنصوص السوشيال ميديا، الشعارات، والشارات الإعلانية المتوافقة مع اللغة العربية.',
    detailedDescription: 'تتضمن أكثر من 120 قالباً ديناميكياً مع أدوات تحكم مرئية سهلة لتغيير الألوان والسرعة والنصوص دون الحاجة لخبرة معقدة في التحريك. تعمل بسلاسة على قياسات 16:9 و 9:16 (Reels & TikTok).',
    price: 140,
    originalPrice: 199,
    rating: 4.7,
    reviewsCount: 52,
    downloadsCount: 890,
    software: ['Adobe After Effects'],
    fileFormats: ['.aep', '.mogrt'],
    fileSize: '820 MB',
    version: '3.0',
    license: 'ترخيص تجاري وشخصي',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    tags: ['After Effects', 'Motion Graphics', 'Reels', 'Mogrt', 'Kinetic'],
    contentsList: [
      '120 قالب موشن احترافي مع دعم كامل للنصوص العربية',
      'حزم ملفات Mogrt للاستخدام المباشر داخل Premiere Pro',
      'مؤثرات صوتية متزامنة عالية النقاء مرخصة تجارياً'
    ]
  },
  {
    id: 'tool-7',
    type: 'tool',
    title: 'مكتبة أيقونات «شفرة» للواجهات البرمجية والتطبيقات (2,400+ أيقونة)',
    titleEn: 'Shafra Vector Icons for Modern Interfaces',
    category: 'ui-ux',
    categoryLabel: 'أنظمة وتصميم الواجهات',
    description: 'أيقونات فيكتور بدقة متناهية مبنية على شبكة 24px في 4 أنماط مختلفة (Line, Filled, Two-Tone, Duochrome).',
    detailedDescription: 'حزمة هندسية بالغة الدقة مصممة خصيصاً لمطوري ومصممي المنتجات الرقمية الحديثة. تدعم محاذاة النص والرموز في الواجهات العربية والإنجليزية بدون تشوه.',
    price: 0,
    isFree: true,
    rating: 5.0,
    reviewsCount: 310,
    downloadsCount: 6500,
    software: ['Figma', 'Adobe Illustrator', 'Webflow'],
    fileFormats: ['.svg', '.fig', '.png'],
    fileSize: '45 MB',
    version: '2.1',
    license: 'ترخيص غير محدود',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: true,
    tags: ['مجاني', 'Free', 'SVG Icons', 'Figma', 'UI Kit'],
    contentsList: [
      '2,400 أيقونة منظمة في 24 تصنيفاً وظيفياً',
      '4 أنماط رسم مختلفة (Line, Solid, Duotone, Broken)',
      'ملف Figma Components بنظام التبديل الفوري Instant Variant Swap',
      'حزمة كود SVG مجهزة للاستخدام في React و HTML'
    ]
  },
  {
    id: 'tool-8',
    type: 'tool',
    title: 'حزمة خط «ميسان» الكوفي الحديث للعناوين والهويات',
    titleEn: 'Maysan Modern Kufic Display Font',
    category: 'fonts',
    categoryLabel: 'الخطوط العربية والطباعة',
    description: 'خط كوفي رقمي متوازن يجمع بين صلابة الهندسة الكوفية وانسيابية التصميم العصري مع 5 أوزان متباينة.',
    detailedDescription: 'مثالي للشعارات الفاخرة، العناوين الصحفية، التغليف، والواجهات التقنية. يتمتع بتباعدات حروف مدروسة بدقة وتناسق عالي بين الارتفاع والعرض.',
    price: 85,
    originalPrice: 110,
    rating: 4.8,
    reviewsCount: 47,
    downloadsCount: 780,
    software: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Webflow'],
    fileFormats: ['.otf', '.ttf', '.woff2'],
    fileSize: '12 MB',
    version: '1.2',
    license: 'ترخيص تجاري وشخصي',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop'
    ],
    featured: false,
    tags: ['كوفي', 'Kufic', 'Arabic Font', 'Logo Design', 'Display'],
    contentsList: [
      '5 أوزان: Light, Regular, Medium, Bold, Heavy',
      'ملفات خطوط الويب للدمج في المواقع والتطبيقات',
      'حزمة أحرف إضافية وتراكيب فنية بديلة (Ligatures & Stylistic Alternates)'
    ],
    sampleFontText: 'الهندسة الكوفية برؤية رقمية حديثة'
  }
];

export const DESIGN_SERVICES: DesignService[] = [
  {
    id: 'service-1',
    type: 'service',
    title: 'تصميم الهوية البصرية والعلامة التجارية الاستراتيجية المتكاملة',
    titleEn: 'Full Strategic Brand Identity & Visual Guidelines',
    category: 'branding',
    categoryLabel: 'الهوية البصرية والعلامة التجارية',
    description: 'نبتكر لشركتك أو منتجك هوية بصرية فريدة تعبر عن قيمك وتنافس في السوق: من الشعار والدليل الإرشادي الشامل حتى المطبوعات والتواجد الرقمي.',
    detailedDescription: 'خدمة احترافية تبدأ بدراسة الجمهور والمنافسين وتحديد التموضع الاستراتيجي، ثم الانتقال لصياغة المفاهيم البصرية وتطوير نظام الهوية كاملاً (الألوان، الخطوط العربية واللاتينية، الأشكال التعبيرية، والأدلة الإرشادية لتطبيقات العلامة).',
    startingPrice: 1650,
    deliveryTime: '10 - 18 يوم عمل',
    completedProjects: 84,
    rating: 5.0,
    reviewsCount: 68,
    image: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1200&auto=format&fit=crop',
    tags: ['هوية بصرية', 'Branding', 'شعار', 'دليل الهوية', 'قرطاسية'],
    deliverables: [
      'دراسة وتحليل العلامة والمنافسين (Brand Research & Moodboard)',
      '3 مفاهيم وتصاميم أولية مبتكرة للشعار لاختيار الأنسب',
      'دليل إرشادي شامل للهوية البصرية (Brand Guidelines Book)',
      'تصميم حزمة المطبوعات والقرطاسية (كروت، أوراق رسمية، أظرف)',
      'قوالب سوشيال ميديا مخصصة وتوقيع بريد إلكتروني رسمي',
      'جميع الملفات المصدرية المفتوحة (AI, EPS, PDF, SVG, PNG)'
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'الاستكشاف وموجز العمل', desc: 'جلسة استماع وتعبئة استبيان الأهداف والجمهور المستهدف' },
      { stepNumber: 2, title: 'البحث وتطوير المفاهيم', desc: 'إنشاء لوحة الإلهام وابتكار 3 نماذج بصرية مختلفة للشعار' },
      { stepNumber: 3, title: 'التنقيح وبناء النظام', desc: 'تطبيق التعديلات واختيار الألوان والخطوط التكميلية' },
      { stepNumber: 4, title: 'التسليم والتوجيه', desc: 'تسليم الملفات بدقة عالية مع دليل استخدام الهوية' }
    ],
    packages: [
      {
        id: 'pkg-b-1',
        name: 'باقة الانطلاق (Start)',
        price: 1650,
        deliveryDays: 10,
        revisions: 3,
        features: [
          'تصميم الشعار الأساسي والرمزي (مفهومان)',
          'تحديد لوحة الألوان والخطوط المعتمدة',
          'تصميم كارت العمل والورق الرسمي',
          'دليل هوية مختصر (12 صفحة)',
          'الملفات المصدرية الكاملة'
        ]
      },
      {
        id: 'pkg-b-2',
        name: 'باقة الأعمال المتقدمة (Pro)',
        price: 2900,
        deliveryDays: 15,
        revisions: 'غير محدود',
        recommended: true,
        features: [
          '3 مفاهيم بصرية استراتيجية للشعار',
          'نظام هوية بصرية متكامل مع أيقونات خاصة',
          'تصميم حزمة قرطاسية كاملة وتغليف مبدئي',
          '6 قوالب جاهزة للسوشيال ميديا (Figma / PSD)',
          'دليل إرشادي تفصيلي للعلامة التجارية (40+ صفحة)',
          'جلسة استشارية لتطبيق الهوية في السوق'
        ]
      },
      {
        id: 'pkg-b-3',
        name: 'باقة الهوية المؤسسية الكبرى (Enterprise)',
        price: 4800,
        deliveryDays: 22,
        revisions: 'غير محدود',
        features: [
          'كل مميزات باقة Pro مع أبحاث سوقية معمقة',
          'تصميم خط عربي مخصص ومعدل لاسم العلامة',
          'موشن للشعار (Logo Animation) احترافي 4K',
          'نماذج ثلاثية الأبعاد (3D Renders) للمنتجات والبيئة المكتبية',
          'دعم وتحديثات مستمرة لمدة 60 يوماً بعد التسليم'
        ]
      }
    ]
  },
  {
    id: 'service-2',
    type: 'service',
    title: 'تصميم واجهات وتجربة المستخدم للمنصات وتطبيقات الجوال (UI/UX)',
    titleEn: 'End-to-End Product UI/UX Design & Prototyping',
    category: 'ui-ux-design',
    categoryLabel: 'تصميم الواجهات وتجربة المستخدم',
    description: 'نحول أفكارك إلى منتجات رقمية سهلة الاستخدام، جذابة بصرياً، ومصممة بدقة لزيادة معدل التحويل ورضا المستخدمين وفق أحدث أبحاث السلوك.',
    detailedDescription: 'خدمة متكاملة تشمل هندسة المعلومات، المخططات الهيكلية (Wireframing)، النماذج التفاعلية الحية (Clickable Prototypes)، ونظام تصميم متكامل (Figma Design System) جاهز للمطورين ومطابق لأعلى معايير الوصول والـ RTL.',
    startingPrice: 2200,
    deliveryTime: '12 - 25 يوم عمل',
    completedProjects: 62,
    rating: 4.9,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    tags: ['UI/UX', 'Figma', 'Mobile App', 'Dashboard', 'Prototype'],
    deliverables: [
      'دراسة رحلة المستخدم ومخطط تدفق الشاشات (User Flow & Persona)',
      'هيكل أولي منخفض الدقة (Low-fidelity Wireframes)',
      'تصميم واجهات مستخدم عالية الدقة (Hi-Fi UI Design)',
      'نموذج تفاعلي متقدم (Interactive Clickable Prototype)',
      'نظام تصميم موحد (Design Tokens, Components, Auto-Layout)',
      'تجهيز ملفات التسليم للمبرمجين مع شروحات التفاعل (Developer Handoff)'
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'أبحاث المنتج والمستخدم', desc: 'تحليل المتطلبات وتحديد رحلات الاستخدام الأساسية' },
      { stepNumber: 2, title: 'المخططات الهيكلية', desc: 'رسم Wireframes لتأكيد تدفق المنطق السلس' },
      { stepNumber: 3, title: 'التصميم البصري التفاعلي', desc: 'بناء الواجهات عالية الدقة وتطبيق الهوية البصرية' },
      { stepNumber: 4, title: 'الاختبار والتسليم الهندسي', desc: 'مراجعة النموذج التفاعلي وتسليم مكتبة Figma للمطورين' }
    ],
    packages: [
      {
        id: 'pkg-u-1',
        name: 'تصميم صفحة هبوط أو لوحة تحكم (Landing / Dashboard)',
        price: 2200,
        deliveryDays: 10,
        revisions: 3,
        features: [
          'تصميم صفحة رئيسية مع 3 صفحات فرعية أو لوحة تحكم متكاملة',
          'تصميم متجاوب بالكامل للديسكتوب والموبايل',
          'نموذج تفاعلي Prototype في Figma',
          'مكتبة الأنماط والمكونات الأساسية'
        ]
      },
      {
        id: 'pkg-u-2',
        name: 'تطبيق جوال متكامل (Mobile App MVP)',
        price: 3900,
        deliveryDays: 18,
        revisions: 'غير محدود',
        recommended: true,
        features: [
          'حتى 18 شاشة تطبيق رئيسية وفرعية (iOS & Android)',
          'دعم أصيل للغة العربية والإنجليزية (RTL / LTR)',
          'نموذج تفاعلي كامل لاختبار المستخدمين والعرض للمستثمرين',
          'Design System مفصل مع Variables و Component Variants',
          'جلسة تسليم وتوجيه لفريق البرمجة'
        ]
      },
      {
        id: 'pkg-u-3',
        name: 'حل رقمي شامل مخصص (Enterprise Platform)',
        price: 6500,
        deliveryDays: 30,
        revisions: 'غير محدود',
        features: [
          'تطبيق جوال + منصة ويب أو لوحة تحكم إدارية (حتى 35 شاشة)',
          'أبحاث مستخدمين واختبارات قابلية الاستخدام (Usability Testing)',
          'نظام تصميم قياسي كامل للشركة (Multi-brand Token Architecture)',
          'دعم مستمر وإشراف على مرحلة التنفيذ البرمجي'
        ]
      }
    ]
  },
  {
    id: 'service-3',
    type: 'service',
    title: 'تصميم وإنتاج إعلانات الموشن جرافيك والفيديو الترويجي',
    titleEn: 'Creative Motion Graphics & Promotional Video Ads',
    category: 'motion-ads',
    categoryLabel: 'الموشن جرافيك والفيديو الإعلاني',
    description: 'فيديوهات موشن جرافيك إبداعية تشرح فكرة منتجك وتجذب عملاءك على منصات التواصل الاجتماعي ومحركات البحث برسم مخصص وتحريك سينمائي.',
    detailedDescription: 'إنتاج متكامل من كتابة السيناريو الإعلاني (Scriptwriting)، الرسم الرقمي المخصص (Custom Storyboard)، التعليق الصوتي الاحترافي باستوديو مرخص، وحتى التحريك والمؤثرات الصوتية.',
    startingPrice: 1400,
    deliveryTime: '7 - 14 يوم عمل',
    completedProjects: 78,
    rating: 4.9,
    reviewsCount: 43,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
    tags: ['Motion Graphics', 'موشن جرافيك', 'فيديو إعلاني', 'تعليق صوتي', 'Storyboarding'],
    deliverables: [
      'كتابة وتطوير النص الإعلاني (Scriptwriting)',
      'رسم لوحة القصة والمشاهد الفنية (Storyboard)',
      'تسجيل تعليق صوتي فصيح أو بلهجة محلية بأعلى نقاء',
      'تحريك احترافي ومؤثرات بصرية سينمائية',
      'مؤثرات صوتية متزامنة وموسيقى مرخصة تجارياً',
      'تسليم الفيديو بقياسات متعددة (16:9، 9:16، 1:1) بدقة 4K'
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'السيناريو والرسالة', desc: 'كتابة نص تسويقي مشوق يركز على نقطة قوة منتجك' },
      { stepNumber: 2, title: 'الستوري بورد والصوت', desc: 'رسم المشاهد الفنية واختيار المعلق الصوتي المناسب' },
      { stepNumber: 3, title: 'التحريك والمؤثرات', desc: 'بث الحياة في الرسوم وإضافة المؤثرات الصوتية والموسيقى' },
      { stepNumber: 4, title: 'الإخراج النهائي', desc: 'تصدير الفيديو بدقة 4K بالصيغ والقياسات المطلوبة للحملات' }
    ],
    packages: [
      {
        id: 'pkg-m-1',
        name: 'إعلان سريع للسوشيال (30 ثانية)',
        price: 1400,
        deliveryDays: 7,
        revisions: 2,
        features: [
          'مدة الفيديو: حتى 30 ثانية',
          'رسم مخصص وتحريك ديناميكي',
          'تعليق صوتي احترافي',
          'قياس واحد مخصص (Reels أو YouTube)'
        ]
      },
      {
        id: 'pkg-m-2',
        name: 'فيديو تسويقي وشرح منتج (60 ثانية)',
        price: 2400,
        deliveryDays: 12,
        revisions: 'غير محدود',
        recommended: true,
        features: [
          'مدة الفيديو: حتى 60 ثانية',
          'كتابة سيناريو استراتيجي + رسم Storyboard مفصل',
          'تعليق صوتي باستوديو متميز + هندسة صوتية كاملة',
          'تسليم بـ 3 قياسات لجميع المنصات (16:9 و 9:16 و 1:1)',
          'دقة 4K فائقة النقاء'
        ]
      }
    ]
  },
  {
    id: 'service-4',
    type: 'service',
    title: 'تصميم خط عربي مخصص وحصري لعلامتك التجارية',
    titleEn: 'Bespoke Custom Arabic Font Design & Development',
    category: 'custom-fonts',
    categoryLabel: 'تصميم الخطوط العربية المخصصة',
    description: 'نصمم لك خطاً عربياً أصيلاً يحمل بصمة علامتك التجارية وحدها، مرخصاً باسم مؤسستك وغير متاح لأي جهة أخرى في العالم.',
    detailedDescription: 'الخط هو الصوت البصري للعلامة. نقوم بدراسة سمات البراند لتطوير حروف عربية مطابقة للروح المطلوبة مع هندسة رقمية Opentype تضمن الأداء الأمثل في الويب وتطبيقات الجوال وحملات الإعلانات.',
    startingPrice: 3800,
    deliveryTime: '20 - 35 يوم عمل',
    completedProjects: 29,
    rating: 5.0,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop',
    tags: ['خط مخصص', 'Custom Typography', 'خط عربي', 'ترخيص حصري'],
    deliverables: [
      'تطوير النمط البصري وعينات الأحرف المفتاحية للموافقة',
      'رسم كامل لأحرف الأبجدية العربية، الأرقام، وعلامات الترقيم',
      'برمجة OpenType Features التلقائية والتراكيب التجميلية',
      'توليد ملفات الخط لجميع الاستخدامات (OTF, TTF, WOFF2)',
      'عقد تنازل وترخيص ملكية تجارية حصرية كاملة لعلامتك'
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'الدراسة والمسودات اليدوية', desc: 'تحديد الطابع الهندسي أو الانسيابي ورسم المسودات الأولية' },
      { stepNumber: 2, title: 'الرسم الرقمي للأبجدية', desc: 'بناء الحروف على شبكة دقيقة وضبط التباعدات (Kerning)' },
      { stepNumber: 3, title: 'البرمجة والاختبار', desc: 'برمجة التراكيب والتأكد من خلو الخط من الأخطاء التقنية' },
      { stepNumber: 4, title: 'التصدير والترخيص القانوني', desc: 'تسليم الخط مع التراخيص الحصرية الكاملة' }
    ],
    packages: [
      {
        id: 'pkg-f-1',
        name: 'وزن واحد مخصص للعناوين (Display Weight)',
        price: 3800,
        deliveryDays: 20,
        revisions: 3,
        features: [
          'وزن واحد (مثلاً Bold أو Regular)',
          'دعم الأحرف العربية والأرقام وعلامات الترقيم',
          'ملفات ويب وتطبيقات ومطبوعات',
          'ترخيص ملكية حصرية'
        ]
      },
      {
        id: 'pkg-f-2',
        name: 'عائلة خطوط متعددة الأوزان (3 أوزان)',
        price: 6800,
        deliveryDays: 35,
        revisions: 'غير محدود',
        recommended: true,
        features: [
          '3 أوزان متناسقة (Light, Regular, Bold)',
          'دعم ثنائي للغة العربية والإنجليزية بنفس الروح التصميمية',
          'تراكيب وحليات جمالية موسعة (Alternates)',
          'حقوق ملكية فكرية مطلقة وغير مقيدة'
        ]
      }
    ]
  },
  {
    id: 'service-5',
    type: 'service',
    title: 'جلسة استشارية وتدقيق تجربة الاستخدام وتصميم المنتج (Design Audit)',
    titleEn: 'Comprehensive UX/UI Design Audit & Optimization',
    category: 'design-audit',
    categoryLabel: 'استشارات وتدقيق التصميم',
    description: 'مراجعة نقدية دقيقة ومكثفة لتطبيقك أو موقعك الإلكتروني مع تقرير تنفيذي يحدد نقاط الضعف وفرص رفع المبيعات ومعدل التحويل.',
    detailedDescription: 'يقوم خبراؤنا بفحص كل شاشة وتدفق في منتجك استناداً إلى مبادئ نيلسن للاستخدامية (Heuristic Evaluation) وسيكولوجية التصميم، مع تقديم حلول بديلة ومقترحات واجهات واضحة يمكن لفريقك تنفيذها فوراً.',
    startingPrice: 850,
    deliveryTime: '3 - 5 أيام عمل',
    completedProjects: 110,
    rating: 4.9,
    reviewsCount: 85,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['تدقيق تصميم', 'Design Audit', 'UX Audit', 'تحسين التحويل', 'استشارة'],
    deliverables: [
      'تقرير مصور تفصيلي (Audit Report) يوضح نقاط الخلل والأولويات',
      'فحص التوافق مع معايير الوصول العالمية واللغة العربية (RTL Accessibility)',
      'اقتراحات تصميمية لشاشات الحلول البديلة في Figma',
      'جلسة فيديو حية (60 دقيقة) لمناقشة التقرير والإجابة عن استفسارات الفريق'
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'الوصول للمنتج', desc: 'مشاركة رابط الموقع أو حساب تجريبي في التطبيق' },
      { stepNumber: 2, title: 'الفحص والتقييم المعياري', desc: 'اختبار التدفقات وتقييم سهولة الاستخدام البصرية والمعرفية' },
      { stepNumber: 3, title: 'صياغة التقرير والحلول', desc: 'إعداد ملف الـ PDF وشاشات Figma المقترحة' },
      { stepNumber: 4, title: 'الجلسة الاستشارية', desc: 'عرض التوصيات ومناقشة أولويات التحسين المباشر' }
    ],
    packages: [
      {
        id: 'pkg-a-1',
        name: 'التدقيق السريع (Essential Audit)',
        price: 850,
        deliveryDays: 3,
        revisions: 1,
        features: [
          'مراجعة حتى 5 شاشات رئيسية في المنتج',
          'تقرير PDF بأبرز 15 ملاحظة حرجة',
          'جلسة نقاش 45 دقيقة عبر Google Meet'
        ]
      },
      {
        id: 'pkg-a-2',
        name: 'التدقيق الشامل + نماذج الحلول (Deep Audit + Fixes)',
        price: 1550,
        deliveryDays: 5,
        revisions: 2,
        recommended: true,
        features: [
          'مراجعة المنصة كاملة (حتى 15 شاشة ومسار دفع)',
          'تقرير استراتيجي مفصل يربط بين التصميم والنمو والمبيعات',
          'تصميم واجهات الحلول المقترحة مباشرة في ملف Figma',
          'جلسة فيديو 90 دقيقة + تسجيل مرئي للشرح'
        ]
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  { id: 'all', label: 'الكل' },
  { id: 'ui-ux', label: 'أنظمة وواجهات UI/UX' },
  { id: 'fonts', label: 'الخطوط والطباعة' },
  { id: '3d-icons', label: '3D والأيقونات' },
  { id: 'mockups', label: 'الموك اب والنماذج' },
  { id: 'brushes', label: 'الفرش والخامات' },
  { id: 'motion', label: 'الموشن والتحريك' },
  { id: 'branding', label: 'الهوية البصرية' },
  { id: 'design-audit', label: 'استشارات وتدقيق' }
];

export const SOFTWARE_LIST = [
  'الكل',
  'Figma',
  'Adobe Photoshop',
  'Adobe Illustrator',
  'Adobe After Effects',
  'Blender',
  'Procreate'
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
  SAR: { symbol: 'ر.س', rate: 1, label: 'ريال سعودي' },
  USD: { symbol: '$', rate: 0.266, label: 'دولار أمريكي' },
  AED: { symbol: 'د.إ', rate: 0.98, label: 'درهم إماراتي' },
  EGP: { symbol: 'ج.م', rate: 13.1, label: 'جنيه مصري' }
};
