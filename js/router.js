// ==========================================================================
// SPA Router using Vanilla JS and GSAP Page Transitions
// ==========================================================================

const routes = {
    '/': { title: 'الرئيسية | كنيسة مارجرجس', render: renderHome },
    '/about': { title: 'عن الكنيسة | كنيسة مارجرجس', render: renderAbout },
    '/services': { title: 'الخدمات | كنيسة مارجرجس', render: renderServices },
    '/masses': { title: 'المواعيد | كنيسة مارجرجس', render: renderMasses },
    '/store': { title: 'المتجر | كنيسة مارجرجس', render: renderStore },
    '/donate': { title: 'تبرع | كنيسة مارجرجس', render: renderDonate }
};

// --- Page Templates ---

function renderHome() {
    return `
        <!-- Hero Section -->
        <section class="min-vh-100 d-flex flex-column justify-content-center position-relative pt-5 overflow-hidden">
            <div class="light-rays"></div>
            <div class="container position-relative z-1 pt-5 mt-4">
                <div class="row align-items-center justify-content-center" id="hero-content">
                    
                    <!-- Right Side (Diocese & Pope) -->
                    <div class="col-lg-5 text-center mb-5 mb-lg-0 d-flex flex-column align-items-center" id="hero-right">
                        <span class="badge bg-transparent border border-warning text-warning mb-4 py-2 px-4 fs-6 rounded-pill" style="box-shadow: 0 0 15px rgba(212,175,55,0.2);">
                            <i class="fas fa-cross me-2"></i> مطرانية شبرا الخيمة وتوابعها
                        </span>
                        
                        <div class="card-3d-wrapper mb-4">
                            <div class="card-3d rounded-circle overflow-hidden shadow-lg p-2" style="width: 280px; height: 280px; background: rgba(212,175,55,0.1); border: 2px solid var(--color-accent);">
                                <img src="anba-morcos.jpg" onerror="this.src='church.jpg'" alt="الأنبا مرقس" class="w-100 h-100 rounded-circle object-fit-cover">
                                <div class="position-absolute top-0 start-0 w-100 h-100 rounded-circle" style="box-shadow: inset 0 0 40px rgba(6,10,23,0.9);"></div>
                            </div>
                        </div>
                        
                        <h3 class="fs-4 text-white mb-0 fw-normal opacity-75">تحت رعاية نيافة الحبر الجليل</h3>
                        <h2 class="display-4 fw-bold text-white mt-2 mb-0" style="text-shadow: 0 0 20px rgba(255,255,255,0.3);">الأنبا مرقس</h2>
                    </div>

                    <!-- Divider (Optional, for visual separation on desktop) -->
                    <div class="col-lg-2 d-none d-lg-flex justify-content-center align-items-center" style="height: 400px;">
                        <div style="width: 2px; height: 100%; background: linear-gradient(to bottom, transparent, var(--color-accent), transparent); opacity: 0.5;"></div>
                    </div>

                    <!-- Left Side (Church & St George) -->
                    <div class="col-lg-5 text-center d-flex flex-column align-items-center mt-5 mt-lg-0" id="hero-left">
                        <h1 class="display-4 fw-bolder mb-4 lh-base text-gold-3d" style="text-shadow: 0 0 30px rgba(212,175,55,0.5);">
                            كنيسة الشهيد العظيم <br> مارجرجس بسندبيس
                        </h1>
                        
                        <div class="card-3d-wrapper mb-4">
                            <div class="card-3d rounded-circle overflow-hidden shadow-lg p-2" style="width: 280px; height: 280px; background: rgba(212,175,55,0.1); border: 2px solid var(--color-accent);">
                                <img src="st-george.jpg" onerror="this.src='church.jpg'" alt="الشهيد مارجرجس" class="w-100 h-100 rounded-circle object-fit-cover">
                                <div class="position-absolute top-0 start-0 w-100 h-100 rounded-circle" style="box-shadow: inset 0 0 40px rgba(6,10,23,0.9);"></div>
                            </div>
                        </div>
                    </div>

                </div>
                
                <!-- Center Actions (Buttons) -->
                <div class="row mt-5" id="hero-actions">
                    <div class="col-12 text-center d-flex gap-4 justify-content-center flex-wrap">
                        <a href="/services" data-link class="btn-gold-3d" style="font-size: 1.1rem; padding: 15px 40px;">
                            اكتشف خدماتنا
                        </a>
                        <a href="/masses" data-link class="btn btn-outline-light rounded-pill px-5 py-3 d-flex align-items-center gap-2 transition-fast hover-gold" style="font-size: 1.1rem; border-width: 2px;">
                            <i class="far fa-calendar-alt"></i> مواعيد القداسات
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Fathers Section -->
        <section class="py-5 my-5 position-relative">
            <div class="container">
                <div class="text-center mb-5">
                    <h2 class="display-5 text-gold-3d fw-bold mb-3">آباؤنا ورعاتنا</h2>
                    <p class="text-text-muted fs-5">الذين يسهرون على نفوسنا كأنهم سوف يعطون حساباً</p>
                </div>
                <div class="row g-4 justify-content-center" id="fathers-grid">
                    <!-- Father Card 1 -->
                    <div class="col-lg-4 col-md-6">
                        <div class="card-3d-wrapper h-100">
                            <div class="card-3d text-center p-4 h-100 d-flex flex-column align-items-center glass-panel">
                                <img src="anba-morcos.jpg" alt="الأنبا مرقس" class="rounded-circle mb-3 border border-2" style="width:120px; height:120px; object-fit:cover; border-color: var(--color-accent) !important;">
                                <h3 class="text-white fs-4 mb-1">الأنبا مرقس</h3>
                                <p class="text-gold-3d small mb-3">مطران شبرا الخيمة وتوابعها</p>
                            </div>
                        </div>
                    </div>
                    <!-- Father Card 2 -->
                    <div class="col-lg-4 col-md-6">
                        <div class="card-3d-wrapper h-100">
                            <div class="card-3d text-center p-4 h-100 d-flex flex-column align-items-center glass-panel">
                                <img src="church.jpg" alt="القمص ويصا عزيز" class="rounded-circle mb-3 border border-2" style="width:120px; height:120px; object-fit:cover; border-color: var(--color-accent) !important;">
                                <h3 class="text-white fs-4 mb-1">القمص ويصا عزيز</h3>
                                <p class="text-gold-3d small mb-3">كاهن الكنيسة</p>
                            </div>
                        </div>
                    </div>
                    <!-- Father Card 3 -->
                    <div class="col-lg-4 col-md-6">
                        <div class="card-3d-wrapper h-100">
                            <div class="card-3d text-center p-4 h-100 d-flex flex-column align-items-center glass-panel">
                                <img src="church.jpg" alt="القس بفنوتي عوض" class="rounded-circle mb-3 border border-2" style="width:120px; height:120px; object-fit:cover; border-color: var(--color-accent) !important;">
                                <h3 class="text-white fs-4 mb-1">القس بفنوتي عوض</h3>
                                <p class="text-gold-3d small mb-3">كاهن الكنيسة</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Grid -->
        <section class="py-5 my-5 bg-black bg-opacity-25 border-top border-bottom" style="border-color: rgba(212, 175, 55, 0.1) !important;">
            <div class="container pb-5">
                <div class="text-center mb-5">
                    <h2 class="display-5 text-gold-3d fw-bold mb-3">أقسام وخدمات الكنيسة</h2>
                    <p class="text-text-muted fs-5">تعرف على كافة الخدمات والأنشطة المتاحة</p>
                </div>
                <!-- Categories will be injected here dynamically -->
                ${renderServicesGridOnly()}
            </div>
        </section>
    `;
}

function renderServicesGridOnly() {
    const servicesCategories = [
        {
            title: "عن الكنيسة",
            items: [
                { name: "تعريف عن الكنيسة", icon: "fa-church" },
                { name: "نبذة عن تاريخ الكنيسة", icon: "fa-history" },
                { name: "الكنيسة الأثرية", icon: "fa-landmark" },
                { name: "مكان الكنيسة", icon: "fa-map-marker-alt" }
            ]
        },
        {
            title: "الخدمات الروحية",
            items: [
                { name: "القداسات والصلوات", icon: "fa-pray" },
                { name: "الاجتماعات", icon: "fa-users" },
                { name: "المناسبات والنهضات", icon: "fa-calendar-alt" }
            ]
        },
        {
            title: "التعليم والتنشئة",
            items: [
                { name: "التربية الكنسية", icon: "fa-child" },
                { name: "مدارس الأحد", icon: "fa-book-open" },
                { name: "مدرسة الشمامسة", icon: "fa-music" },
                { name: "الكورسات", icon: "fa-laptop-code" }
            ]
        },
        {
            title: "الأنشطة الكنسية",
            items: [
                { name: "الكورال", icon: "fa-microphone" },
                { name: "الكشافة", icon: "fa-campground" },
                { name: "الرحلات", icon: "fa-bus" },
                { name: "بيت الخلوة والمؤتمرات", icon: "fa-home" }
            ]
        },
        {
            title: "الخدمات العامة والدعم",
            items: [
                { name: "العيادة", icon: "fa-clinic-medical" },
                { name: "مكتبة الاستعارة", icon: "fa-book" },
                { name: "الاستضافات", icon: "fa-bed" },
                { name: "التبرعات", icon: "fa-hand-holding-heart" },
                { name: "الدفع والتبرع لتطوير المحتوى", icon: "fa-credit-card" }
            ]
        },
        {
            title: "متجر الكنيسة",
            items: [
                { name: "منتجات الكنيسة والكانتين", icon: "fa-shopping-basket" },
                { name: "الألعاب الكنسية", icon: "fa-puzzle-piece" },
                { name: "ورش العمل", icon: "fa-tools" }
            ]
        }
    ];

    let html = '';
    servicesCategories.forEach(category => {
        html += `<h3 class="text-white border-bottom border-warning pb-2 mt-5 mb-4" style="border-color: rgba(212,175,55,0.4) !important;">${category.title}</h3>
                 <div class="row g-4 mb-4">`;
        
        category.items.forEach(item => {
            html += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <div class="card-3d-wrapper h-100">
                        <div class="card-3d p-4 text-center h-100 glass-panel d-flex flex-column justify-content-center align-items-center">
                            <i class="fas ${item.icon} fs-1 text-gold-3d mb-3"></i>
                            <h5 class="text-white fs-5 mb-0">${item.name}</h5>
                        </div>
                    </div>
                </div>
            `;
        });
        html += `</div>`;
    });
    return html;
}

function renderAbout() {
    return `
        <section class="pt-5 mt-5 container min-vh-100">
            <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">عن الكنيسة</h1>
            <div class="glass-panel p-5">
                <p class="fs-5 text-white lh-lg">
                    كنيسة الشهيد العظيم مارجرجس بسندبيس هي إحدى كنائس إيبارشية شبرا الخيمة وتوابعها.
                    نسعى لتقديم الرعاية الروحية والاجتماعية والتعليمية لأبناء الكنيسة من خلال قداسات منتظمة، 
                    مدارس الأحد، اجتماعات الشباب، والعديد من الخدمات الأخرى التي تهدف لبناء إنسان روحي مرتبط بالله.
                </p>
                <img src="church.jpg" class="img-fluid rounded mt-4 border border-warning opacity-75" alt="كنيسة مارجرجس">
            </div>
        </section>
    `;
}

function renderServices() {
    return `<section class="pt-5 mt-5 container min-vh-100 pb-5">
        <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">خدمات الكنيسة والأنشطة</h1>
        ${renderServicesGridOnly()}
    </section>`;
}

function renderMasses() {
    return `
        <section class="pt-5 mt-5 container min-vh-100">
            <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">مواعيد القداسات والاجتماعات</h1>
            <div class="glass-panel p-4 p-md-5">
                <div class="table-responsive">
                    <table class="table table-dark table-hover align-middle border-primary">
                        <thead>
                            <tr class="text-gold-3d">
                                <th>اليوم</th>
                                <th>الخدمة</th>
                                <th>الوقت</th>
                                <th>المكان</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>الجمعة</td><td>القداس الإلهي الأول</td><td>6:00 ص - 8:30 ص</td><td>الكنيسة الكبيرة</td></tr>
                            <tr><td>الجمعة</td><td>القداس الإلهي الثاني</td><td>8:30 ص - 11:00 ص</td><td>الكنيسة الكبيرة</td></tr>
                            <tr><td>الأحد</td><td>القداس الإلهي</td><td>7:00 ص - 9:30 ص</td><td>الكنيسة الكبيرة</td></tr>
                            <tr><td>الأربعاء</td><td>عشية واجتماع</td><td>6:30 م - 8:30 م</td><td>الكنيسة</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
}

function renderStore() {
    return `
        <section class="pt-5 mt-5 container min-vh-100">
            <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">متجر الكنيسة</h1>
            <div class="row g-4">
                ${[1,2,3,4].map(i => `
                <div class="col-lg-3 col-md-6">
                    <div class="card-3d-wrapper h-100">
                        <div class="card-3d glass-panel text-center h-100">
                            <div class="bg-dark p-4 d-flex align-items-center justify-content-center" style="height:200px;">
                                <i class="fas fa-cross fs-1 text-secondary"></i>
                            </div>
                            <div class="p-3">
                                <h5 class="text-white mb-2">منتج كنسي ${i}</h5>
                                <p class="text-gold-3d fw-bold mb-3">150 ج.م</p>
                                <button class="btn btn-outline-warning btn-sm w-100">أضف للسلة</button>
                            </div>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </section>
    `;
}

function renderDonate() {
    return `
        <section class="pt-5 mt-5 container min-vh-100 text-center">
            <h1 class="text-gold-3d display-4 mb-4 mt-4">تبرع للكنيسة</h1>
            <p class="text-white fs-5 mb-5 max-w-700 mx-auto">"المعطي المسرور يحبه الرب"</p>
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="glass-panel p-5">
                        <h3 class="text-gold-3d mb-4"><i class="fas fa-mobile-alt me-2"></i> المحافظ الإلكترونية</h3>
                        <p class="text-white fs-4">01234567890 (Vodafone Cash)</p>
                        
                        <hr class="my-4" style="border-color: rgba(212,175,55,0.3);">
                        
                        <h3 class="text-gold-3d mb-4"><i class="fas fa-university me-2"></i> الحساب البنكي</h3>
                        <p class="text-white">البنك الأهلي المصري</p>
                        <p class="text-white fs-5 font-monospace">EG00001111222233334444555</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- Router Logic ---

const routerView = document.getElementById('app-router-view');
const pageTransition = document.getElementById('page-transition');

const navigateTo = (url) => {
    history.pushState(null, null, url);
    handleRoute();
};

const handleRoute = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes['/'];
    
    // Play transition OUT
    gsap.to(pageTransition, { opacity: 1, duration: 0.3, ease: "power2.inOut" });
    
    setTimeout(() => {
        // Update content
        document.title = route.title;
        routerView.innerHTML = route.render();
        
        // Ensure animations trigger on new content
        if (window.initGSAPAnimations) {
            window.initGSAPAnimations();
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Play transition IN
        gsap.to(pageTransition, { opacity: 0, duration: 0.5, ease: "power2.inOut", delay: 0.2 });
    }, 300);
};

// Event listeners for router links
document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]') || e.target.closest('[data-link]')) {
        e.preventDefault();
        const link = e.target.matches('[data-link]') ? e.target : e.target.closest('[data-link]');
        navigateTo(link.href);
    }
});

window.addEventListener('popstate', handleRoute);

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    // Hide initial loader
    setTimeout(() => {
        handleRoute();
    }, 500);
});
