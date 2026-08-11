export type Language = 'ar' | 'en';

export const translations = {
  ar: {
    // Navigation
    nav: {
      diocese: 'مطرانية شبرا الخيمة وتوابعها',
      churchName: 'كنيسة الشهيد العظيم مارجرجس بسندبيس',
      home: 'الرئيسية',
      about: 'عن الكنيسة',
      services: 'الخدمات والأنشطة',
      library: 'المكتبة الرقمية',
      media: 'الوسائط',
      masses: 'المواعيد',
      store: 'المتجر',
      donate: 'تبرع للكنيسة',
      language: 'English',
      adminDashboard: 'لوحة التحكم',
    },

    // Hero Section
    hero: {
      dioceseBadge: 'مطرانية شبرا الخيمة وتوابعها',
      titleLine1: 'كنيسة الشهيد العظيم',
      titleLine2: 'مارجرجس بسندبيس',
      description: 'بيتاً للصلاة، والعبادة، والشركة الروحية، وتنشئة الأجيال على الإيمان الأرثوذكسي المستقيم تحت رعاية نيافة الحبر الجليل الأنبا مرقس مطران شبرا الخيمة وتوابعها.',
      ctaServices: 'اكتشف خدمات الكنيسة',
      ctaMasses: 'مواعيد القداسات',
      anbaMorcosTitle: 'الأنبا مرقس',
      anbaMorcosSub: 'مطران شبرا الخيمة وتوابعها',
    },

    // Fathers & Clergy
    fathers: {
      heading: 'رعاة وقادة الكنيسة',
      subheading: 'الرعاية الروحية تحت مظلة الأبوة والرعاية الكنسية',
      patriarchTitle: 'قداسة البابا تواضروس الثاني',
      patriarchSub: 'بابا الإسكندرية وبطريق الكرازة المرقسية',
      bishopTitle: 'نيافة الأنبا مرقس',
      bishopSub: 'مطران شبرا الخيمة وتوابعها',
      priestsTitle: 'آباء كنيسة مارجرجس بسندبيس',
      priestsSub: 'خدام المذبح والرعاية الروحية لشعب الكنيسة المبارك',
      wissaTitle: 'القمص ويصا عزيز',
      bevnotyTitle: 'القس بفنوتي عوض',
    },

    // Services & Categories
    services: {
      heading: 'أقسام وخدمات الكنيسة',
      subheading: 'تعرف على كافة الخدمات والأنشطة المتاحة لخدمة أبناء الكنيسة',
      viewService: 'عرض الخدمة',
      viewAllServices: 'العودة لكافة الخدمات',
      subcategories: 'التصنيفات والخدمات الفرعية',
      noServices: 'لا توجد أقسام أو خدمات متاحة حالياً',
      noServicesSub: 'جاري إعداد وتحديث الأنشطة والخدمات الكنسية.',
      serviceNotFound: 'الخدمة أو القسم المطلوب غير موجود.',
      serviceNotFoundSub: 'قد يكون القسم غير متاح حالياً أو تم تعديل اسمه.',
      postersHeading: 'بوسترات وإعلانات الخدمة',
      galleriesHeading: 'معارض الصور والأفواج',
      articlesHeading: 'مواضيع ومستندات الخدمة',
      booksHeading: 'الكتب والمؤلفات المرتبطة',
      mediaHeading: 'الوسائط المرئية والتسجيلات',
      downloadDoc: 'تحميل المستند المرفق',
      externalLink: 'الانتقال للرابط / التسجيل',
    },

    // Digital Library & Books
    library: {
      heading: 'المكتبة الرقمية الكنسية',
      subheading: 'كتب وقراءات روحية وطقسية متاحة للقراءة والاطلاع',
      viewAll: 'عرض كل الكتب',
      readBook: 'قراءة الكتاب أونلاين',
      downloadBook: 'تحميل الكتاب (PDF)',
      readAndDetails: 'تفاصيل وقراءة الكتاب',
      authorLabel: 'المؤلف',
      categoryLabel: 'التصنيف',
      noBooks: 'لا توجد كتب متاحة في المكتبة الرقمية حالياً.',
      readingDisabled: 'قراءة هذا الكتاب أونلاين غير متاحة حالياً بقرار من إدارة المكتبة.',
      downloadDisabled: 'تحميل ملف هذا الكتاب غير متاح حالياً بقرار من إدارة المكتبة.',
      publisher: 'مؤلفات كنيسة مارجرجس بسندبيس',
      closeViewer: 'إغلاق القارئ',
      bookDetails: 'تفاصيل الكتاب',
    },

    // Media Gallery
    media: {
      heading: 'معرض الوسائط والإنتاج المرئي',
      subheading: 'تسجيلات قداسات، ترانيم، وفعاليات كنسية مصورة',
      viewMedia: 'معاينة الوسائط',
      noMedia: 'لا توجد وسائط مرئية مسجلة حالياً.',
      allMedia: 'كافة الوسائط',
    },

    // Masses & Schedule
    masses: {
      heading: 'مواعيد القداسات والصلوات',
      subheading: 'جدول القداسات الإلهية والتسابيح الأسبوعية',
      firstMassTitle: 'القداس الأول (الصباحي)',
      firstMassTime: 'من 6:00 ص حتى 8:00 ص',
      secondMassTitle: 'القداس الثاني (الرئيسي)',
      secondMassTime: 'من 8:00 ص حتى 10:30 ص',
      vespersTitle: 'عشية وتسبحة نصف الليل',
      vespersTime: 'كل يوم سبت من 6:00 م حتى 9:00 م',
      note: 'ملاحظة: تختلف المواعيد في الأعياد والأصوام الكبيرة حسب جدول النهضات.',
    },

    // Store Section
    store: {
      heading: 'المتجر والكتب الكنسية',
      subheading: 'منتجات ومقتنيات وكتب روضية من إنتاج الكنيسة',
      noProducts: 'قريباً: سيتم إطلاق المتجر الكنسي الإلكتروني.',
    },

    // Donations Section
    donate: {
      heading: 'دعم وخدمة الكنيسة (العطاء والصدقة)',
      subheading: '«كُلُّ واحِدٍ كَمَا يَشْتَارُ بِقَلْبِهِ، لاَ عَنْ حُزْنٍ أَوِ اضْطِرَارٍ. لأَنَّ الْمُعْطِيَ المَسْرُورَ يُحِبُّهُ اللهُ.»',
      waysToDonate: 'طرائق العطاء والمساهمة',
      bankTransfer: 'تحويل بنكي مبارك',
      vodafoneCash: 'فودافون كاش / محفظة إلكترونية',
      inPerson: 'عن طريق مكتب الكنيسة مباشرة',
      trustNotice: 'تستخدم التبرعات في بناء وترميم خدمات الكنيسة ورعاية أخوة الرب والأنشطة الروحية.',
    },

    // Contact & Location Section
    contact: {
      heading: 'التواصل وموقع الكنيسة',
      subheading: 'تواصل مع خدام الكنيسة أو تعرف على عنوان وموقع الكنيسة بسندبيس',
      facebookTitle: 'فيسبوك',
      facebookSub: 'تابع صفحة الكنيسة والفعاليات الرسمية',
      youtubeTitle: 'يوتيوب',
      youtubeSub: 'شاهد عظات، قداسات، وترانيم الكنيسة',
      whatsappTitle: 'واتساب',
      whatsappSub: 'تواصل مباشر مع مكتب الكنيسة',
      locationTitle: 'موقع الكنيسة',
      locationSub: 'اعرف مكان الكنيسة واحصل على الاتجاهات',
      viewGoogleMaps: 'عرض الموقع على Google Maps',
      comingSoon: 'قريباً',
      churchLocationHeading: 'موقع الكنيسة الجغرافي',
      churchLocationSub: 'عنوان الكنيسة بسندبيس ومعلومات الوصول',
      addressPlaceholder: 'مصر - محافظة القليوبية - قرية سندبيس - كنيسة مارجرجس',
      getDirections: 'احصل على الاتجاهات عبر الخريطة',
    },

    // Footer
    footer: {
      diocese: 'مطرانية شبرا الخيمة وتوابعها',
      churchName: 'كنيسة الشهيد العظيم مارجرجس بسندبيس',
      aboutText: 'بيتاً للصلاة، والشركة الروحية، والنمو الإيماني تحت رعاية نيافة الحبر الجليل الأنبا مرقس مطران شبرا الخيمة وتوابعها.',
      quickLinks: 'أقسام المنصة',
      contactHeading: 'التواصل والمعلومات',
      rights: 'جميع الحقوق محفوظة.',
    },

    // Common UI Labels
    common: {
      loading: 'جاري التحميل...',
      back: 'العودة',
      error: 'حدث خطأ غير متوقع.',
      search: 'البحث...',
      filter: 'تصفية',
      all: 'الكل',
      close: 'إغلاق',
      copticOrthodox: 'الكنيسة القبطية الأرثوذكسية',
    },
  },

  en: {
    // Navigation
    nav: {
      diocese: 'Diocese of Shubra El-Kheima & Dependencies',
      churchName: 'St. George Coptic Orthodox Church – Sandbis',
      home: 'Home',
      about: 'About Church',
      services: 'Services & Activities',
      library: 'Digital Library',
      media: 'Media',
      masses: 'Schedule',
      store: 'Bookstore',
      donate: 'Donate',
      language: 'العربية',
      adminDashboard: 'Admin Panel',
    },

    // Hero Section
    hero: {
      dioceseBadge: 'Diocese of Shubra El-Kheima & Dependencies',
      titleLine1: 'St. George Great Martyr',
      titleLine2: 'Coptic Orthodox Church – Sandbis',
      description: 'A sanctuary of prayer, spiritual fellowship, and orthodox faith under the guidance of H.E. Metropolitan Anba Morcos, Metropolitan of Shubra El-Kheima & Dependencies.',
      ctaServices: 'Explore Church Services',
      ctaMasses: 'Divine Liturgy Schedule',
      anbaMorcosTitle: 'Anba Morcos',
      anbaMorcosSub: 'Metropolitan of Shubra El-Kheima & Dependencies',
    },

    // Fathers & Clergy
    fathers: {
      heading: 'Church Fathers & Leadership',
      subheading: 'Spiritual guardianship under the Coptic Orthodox patriarchal & episcopal care',
      patriarchTitle: 'H.H. Pope Tawadros II',
      patriarchSub: 'Pope of Alexandria & Patriarch of the See of St. Mark',
      bishopTitle: 'H.E. Anba Morcos',
      bishopSub: 'Metropolitan of Shubra El-Kheima & Dependencies',
      priestsTitle: 'Fathers of St. George Church',
      priestsSub: 'Servants of the Holy Altar and pastoral care for the congregation',
      wissaTitle: 'Fr. Wissa Aziz',
      bevnotyTitle: 'Fr. Bevnoty Awad',
    },

    // Services & Categories
    services: {
      heading: 'Church Services & Ministries',
      subheading: 'Discover all spiritual services, nurture, and youth ministries available for our congregation',
      viewService: 'View Ministry',
      viewAllServices: 'Back to All Ministries',
      subcategories: 'Sub-Services & Ministries',
      noServices: 'No active services available at the moment',
      noServicesSub: 'Church activities and services are being updated.',
      serviceNotFound: 'Requested Service Not Found',
      serviceNotFoundSub: 'The service might be currently unavailable or renamed.',
      postersHeading: 'Ministry Announcements & Posters',
      galleriesHeading: 'Photo Galleries & Congregational Albums',
      articlesHeading: 'Ministry Articles & Documents',
      booksHeading: 'Related Spiritual Books',
      mediaHeading: 'Audio-Visual Recordings',
      downloadDoc: 'Download Attached Document',
      externalLink: 'External Link / Registration',
    },

    // Digital Library & Books
    library: {
      heading: 'Church Digital Library',
      subheading: 'Spiritual, liturgical, and patristic books available for reading and download',
      viewAll: 'Browse All Books',
      readBook: 'Read Book Online',
      downloadBook: 'Download PDF',
      readAndDetails: 'Read & Book Details',
      authorLabel: 'Author',
      categoryLabel: 'Category',
      noBooks: 'No books currently available in the digital library.',
      readingDisabled: 'Online reading is currently disabled for this title by library administration.',
      downloadDisabled: 'PDF download is currently disabled for this title by library administration.',
      publisher: 'St. George Church Publications – Sandbis',
      closeViewer: 'Close Reader',
      bookDetails: 'Book Details',
    },

    // Media Gallery
    media: {
      heading: 'Media Gallery & Audio-Visual Production',
      subheading: 'Recorded Liturgies, spiritual hymns, and documented church events',
      viewMedia: 'Preview Media',
      noMedia: 'No media currently available in the gallery.',
      allMedia: 'All Media',
    },

    // Masses & Schedule
    masses: {
      heading: 'Divine Liturgies & Services Schedule',
      subheading: 'Weekly timetable for Holy Masses and Praises',
      firstMassTitle: 'First Divine Liturgy (Morning)',
      firstMassTime: '6:00 AM – 8:00 AM',
      secondMassTitle: 'Second Divine Liturgy (Main)',
      secondMassTime: '8:00 AM – 10:30 AM',
      vespersTitle: 'Vespers & Midnight Praise',
      vespersTime: 'Every Saturday 6:00 PM – 9:00 PM',
      note: 'Note: Schedule varies during Feast Days and Holy Fasts according to liturgical announcements.',
    },

    // Store Section
    store: {
      heading: 'Church Bookstore & Items',
      subheading: 'Spiritual publications, icons, and church items',
      noProducts: 'Coming Soon: Online Church Store is under preparation.',
    },

    // Donations Section
    donate: {
      heading: 'Support Church Service & Almsgiving',
      subheading: '“Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.”',
      waysToDonate: 'Ways to Contribute',
      bankTransfer: 'Bank Wire Transfer',
      vodafoneCash: 'E-Wallet / Vodafone Cash',
      inPerson: 'In-Person at Church Office',
      trustNotice: 'Contributions support church renovations, pastoral services, poor brethren care, and spiritual activities.',
    },

    // Contact & Location Section
    contact: {
      heading: 'Connect With Us & Church Location',
      subheading: 'Get in touch with church servants or find directions to St. George Church in Sandbis',
      facebookTitle: 'Facebook',
      facebookSub: 'Follow our official church page and announcements',
      youtubeTitle: 'YouTube',
      youtubeSub: 'Watch sermons, Holy Liturgies, and Coptic hymns',
      whatsappTitle: 'WhatsApp',
      whatsappSub: 'Direct messaging with church administration',
      locationTitle: 'Church Location',
      locationSub: 'Find church location and get driving directions',
      viewGoogleMaps: 'View Location on Google Maps',
      comingSoon: 'Coming Soon',
      churchLocationHeading: 'Geographic Location',
      churchLocationSub: 'Sandbis Church address and navigation information',
      addressPlaceholder: 'Egypt - Qalyubia Governorate - Sandbis Village - St. George Coptic Church',
      getDirections: 'Get Driving Directions via Maps',
    },

    // Footer
    footer: {
      diocese: 'Diocese of Shubra El-Kheima & Dependencies',
      churchName: 'St. George Coptic Orthodox Church – Sandbis',
      aboutText: 'A house of prayer, spiritual fellowship, and orthodox faith under the leadership of H.E. Metropolitan Anba Morcos.',
      quickLinks: 'Navigation',
      contactHeading: 'Contact & Information',
      rights: 'All rights reserved.',
    },

    // Common UI Labels
    common: {
      loading: 'Loading...',
      back: 'Back',
      error: 'An unexpected error occurred.',
      search: 'Search...',
      filter: 'Filter',
      all: 'All',
      close: 'Close',
      copticOrthodox: 'Coptic Orthodox Church',
    },
  },
};
