export interface ServiceItem {
  id: number;
  name: string;
  icon: string;
  category: string;
  content?: string;
}

export interface ServiceCategoryGroup {
  title: string;
  items: ServiceItem[];
}

export const INITIAL_SERVICES: ServiceCategoryGroup[] = [
  {
    title: "عن الكنيسة",
    items: [
      { id: 1, name: "تعريف عن الكنيسة", icon: "fa-church", category: "عن الكنيسة", content: "كنيسة الشهيد العظيم مارجرجس بسندبيس هي إحدى كنائس إيبارشية شبرا الخيمة وتوابعها، بيت للصلاة والعبادة والشركة الروحية." },
      { id: 2, name: "نبذة عن تاريخ الكنيسة", icon: "fa-history", category: "عن الكنيسة", content: "تاريخ عريق من الخدمة والإيمان الممتد عبر الأجيال في قرية سندبيس." },
      { id: 3, name: "الكنيسة الأثرية", icon: "fa-landmark", category: "عن الكنيسة", content: "تتميز الكنيسة بتاريخ أثري وروحاني يربط بين الأصالة والخدمة المعاصرة." },
      { id: 4, name: "مكان الكنيسة", icon: "fa-map-marker-alt", category: "عن الكنيسة", content: "تقع الكنيسة في قرية سندبيس - شبرا الخيمة - محافظة القليوبية." }
    ]
  },
  {
    title: "الخدمات الروحية",
    items: [
      { id: 5, name: "القداسات والصلوات", icon: "fa-pray", category: "الخدمات الروحية", content: "تقام القداسات الإلهية بانتظام خلال أيام الأسبوع وخاصة يومي الجمعة والأحد." },
      { id: 6, name: "الاجتماعات", icon: "fa-users", category: "الخدمات الروحية", content: "اجتماعات روحية لمختلف المراحل العمرية (شباب، خريجين، أسرات، سيدات)." },
      { id: 7, name: "المناسبات والنهضات", icon: "fa-calendar-alt", category: "الخدمات الروحية", content: "نهضات سنوية في أعياد مارجرجس والعذراء مريم والصوم الكبير وأسبوع الآلام." }
    ]
  },
  {
    title: "التعليم والتنشئة",
    items: [
      { id: 8, name: "التربية الكنسية", icon: "fa-child", category: "التعليم والتنشئة", content: "تربية كنسية وإعداد روحي لأبناء الكنيسة منذ الصغر." },
      { id: 9, name: "مدارس الأحد", icon: "fa-book-open", category: "التعليم والتنشئة", content: "فصول مدارس الأحد للمراحل الابتدائية والإعدادية والثانوية." },
      { id: 10, name: "مدرسة الشمامسة", icon: "fa-music", category: "التعليم والتنشئة", content: "تعليم الألحان والطقوس واللغة القبطية لأبنائنا الشمامسة." },
      { id: 11, name: "الكورسات", icon: "fa-laptop-code", category: "التعليم والتنشئة", content: "دورات كنسية وتثقيفية وتنمية مهارات الشباب." }
    ]
  },
  {
    title: "الأنشطة الكنسية",
    items: [
      { id: 12, name: "الكورال", icon: "fa-microphone", category: "الأنشطة الكنسية", content: "فرق كورال لتقديم الترنيم والتسابيح الروحية في المناسبات." },
      { id: 13, name: "الكشافة", icon: "fa-campground", category: "الأنشطة الكنسية", content: "مجموعات كشفية لبناء النظام والانضباط والخدمة العامة." },
      { id: 14, name: "الرحلات", icon: "fa-bus", category: "الأنشطة الكنسية", content: "رحلات وزيارات للأديرة والكنائس الأثرية." },
      { id: 15, name: "بيت الخلوة والمؤتمرات", icon: "fa-home", category: "الأنشطة الكنسية", content: "مؤتمرات روحية وأيام خلوة في بيوت المؤتمرات." }
    ]
  },
  {
    title: "الخدمات العامة والدعم",
    items: [
      { id: 16, name: "العيادة", icon: "fa-clinic-medical", category: "الخدمات العامة والدعم", content: "خدمات طبية ورعاية صحية لأبناء الكنيسة والمجتمع." },
      { id: 17, name: "مكتبة الاستعارة", icon: "fa-book", category: "الخدمات العامة والدعم", content: "استعارة الكتب الروحية والطقسية والآبائية." },
      { id: 18, name: "الاستضافات", icon: "fa-bed", category: "الخدمات العامة والدعم", content: "استضافة المغتربين والأنشطة الإنسانية." },
      { id: 19, name: "التبرعات", icon: "fa-hand-holding-heart", category: "الخدمات العامة والدعم", content: "دعم إخوة الرب وخدمات إخوة الرعية." },
      { id: 20, name: "الدفع والتبرع لتطوير المحتوى", icon: "fa-credit-card", category: "الخدمات العامة والدعم", content: "مساهمات في تطوير الخدمة الرقمية ووسائل الإيضاح." }
    ]
  },
  {
    title: "متجر الكنيسة",
    items: [
      { id: 21, name: "منتجات الكنيسة والكانتين", icon: "fa-shopping-basket", category: "متجر الكنيسة", content: "منتجات كنسية وهدايا وكتب صور وأيقونات." },
      { id: 22, name: "الألعاب الكنسية", icon: "fa-puzzle-piece", category: "متجر الكنيسة", content: "ألعاب كنسية هادفة للأطفال والمكافآت." },
      { id: 23, name: "ورش العمل", icon: "fa-tools", category: "متجر الكنيسة", content: "مشغولات يدوية وحرفية صنع أبناء الخدمة." }
    ]
  }
];

export const STATIC_PAGES: Record<string, { title: string; content: string }> = {
  about: {
    title: 'عن الكنيسة',
    content: 'كنيسة الشهيد العظيم مارجرجس بسندبيس هي إحدى كنائس إيبارشية شبرا الخيمة وتوابعها. تتميز بتاريخ عريق من الخدمة والإيمان، وتسعى دائماً لتوفير بيئة روحية ومحبة لجميع أبنائها للصلاة، والنمو الروحي، والشركة المقدسة.'
  },
  masses: {
    title: 'مواعيد القداسات والصلوات',
    content: 'الجمعة: 6:00 صباحاً - 8:30 صباحاً (القداس الأول)\nالجمعة: 8:30 صباحاً - 11:00 صباحاً (القداس الثاني)\nالأحد: 7:00 صباحاً - 9:30 صباحاً\nالأربعاء: 7:00 صباحاً - 9:00 صباحاً\nالعشيات والتسبحة: يومياً الساعة 6:00 مساءً'
  },
  donate: {
    title: 'تبرع للكنيسة',
    content: 'فودافون كاش: 01234567890\nالحساب البنكي (البنك الأهلي المصري): EG00000000000000000000000\nمكتب التبرعات بمقر الكنيسة: يومياً من 9:00 صباحاً حتى 9:00 مساءً\n"مَنْ يَرْحَمُ الْفَقِيرَ يُقْرِضُ الرَّبَّ، وَعَنْ مَعْرُوفِهِ يُجَازِيهِ" (أم 19: 17)'
  }
};

export function getAllServicesFlat(): ServiceItem[] {
  return INITIAL_SERVICES.flatMap(group => group.items);
}

export function getServiceById(id: number): ServiceItem | undefined {
  return getAllServicesFlat().find(item => item.id === id);
}
