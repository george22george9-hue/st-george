// ==========================================================================
// SPA Router using Vanilla JS, GSAP Page Transitions, and API Fetching
// ==========================================================================

const routes = {
    '/': { title: 'الرئيسية | كنيسة مارجرجس', render: renderHome },
    '/about': { title: 'عن الكنيسة | كنيسة مارجرجس', render: renderAbout },
    '/services': { title: 'الخدمات | كنيسة مارجرجس', render: renderServices },
    '/masses': { title: 'المواعيد | كنيسة مارجرجس', render: renderMasses },
    '/store': { title: 'المتجر | كنيسة مارجرجس', render: renderStore },
    '/donate': { title: 'تبرع | كنيسة مارجرجس', render: renderDonate }
};

// Handle Dynamic Routing
function matchRoute(path) {
    if (routes[path]) return { route: routes[path], params: {} };
    
    // Check for /service/:id
    const serviceMatch = path.match(/^\/service\/(\d+)$/);
    if (serviceMatch) {
        return { 
            route: { title: 'تفاصيل الخدمة | كنيسة مارجرجس', render: renderSingleService }, 
            params: { id: serviceMatch[1] } 
        };
    }
    
    return { route: routes['/'], params: {} };
}

// --- API Helpers ---
async function fetchPage(id) {
    try {
        const res = await fetch(`/api/pages/${id}`);
        return await res.json();
    } catch {
        return { content: 'حدث خطأ في تحميل المحتوى.' };
    }
}

async function fetchServices() {
    try {
        const res = await fetch('/api/services');
        return await res.json();
    } catch {
        return [];
    }
}

// --- Page Templates ---

async function renderHome() {
    const servicesHtml = await renderServicesGridOnly();
    
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
                <div class="row g-4 justify-content-center mb-4" id="fathers-grid-1">
                    <div class="col-lg-4 col-md-6">
                        <div class="card-3d-wrapper h-100">
                            <div class="card-3d text-center p-4 h-100 d-flex flex-column align-items-center glass-panel" style="border: 1px solid rgba(212,175,55,0.4);">
                                <img src="anba-morcos.jpg" alt="الأنبا مرقس" class="rounded-circle mb-3 border border-2" style="width:140px; height:140px; object-fit:cover; border-color: var(--color-accent) !important;">
                                <h3 class="text-white fs-3 mb-1 mt-2">الأنبا مرقس</h3>
                                <p class="text-gold-3d small mb-0 fs-6">مطران شبرا الخيمة وتوابعها</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row g-4 justify-content-center" id="fathers-grid-2">
                    <div class="col-lg-4 col-md-6">
                        <div class="card-3d-wrapper h-100">
                            <div class="card-3d text-center p-4 h-100 d-flex flex-column align-items-center glass-panel">
                                <img src="church.jpg" alt="القمص ويصا عزيز" class="rounded-circle mb-3 border border-2" style="width:120px; height:120px; object-fit:cover; border-color: var(--color-accent) !important;">
                                <h3 class="text-white fs-4 mb-1">القمص ويصا عزيز</h3>
                                <p class="text-gold-3d small mb-3">كاهن الكنيسة</p>
                            </div>
                        </div>
                    </div>
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
                ${servicesHtml}
            </div>
        </section>
    `;
}

async function renderServicesGridOnly() {
    const categories = await fetchServices();
    let html = '';
    categories.forEach(category => {
        html += `<h3 class="text-white border-bottom border-warning pb-2 mt-5 mb-4" style="border-color: rgba(212,175,55,0.4) !important;">${category.title}</h3>
                 <div class="row g-4 mb-4">`;
        
        category.items.forEach(item => {
            html += `
                <div class="col-lg-3 col-md-4 col-sm-6">
                    <a href="/service/${item.id}" data-link class="text-decoration-none">
                        <div class="card-3d-wrapper h-100">
                            <div class="card-3d p-4 text-center h-100 glass-panel d-flex flex-column justify-content-center align-items-center hover-gold-effect">
                                <i class="fas ${item.icon} fs-1 text-gold-3d mb-3"></i>
                                <h5 class="text-white fs-5 mb-0">${item.name}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            `;
        });
        html += `</div>`;
    });
    return html;
}

async function renderAbout() {
    const data = await fetchPage('about');
    return `
        <section class="pt-5 mt-5 container min-vh-100">
            <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">${data.title || 'عن الكنيسة'}</h1>
            <div class="glass-panel p-5 text-white lh-lg fs-5">
                ${data.content || 'جاري التحميل...'}
                <div class="mt-4 text-center">
                    <img src="church.jpg" class="img-fluid rounded border border-warning opacity-75" alt="كنيسة مارجرجس" style="max-height: 400px; object-fit: cover; width: 100%;">
                </div>
            </div>
        </section>
    `;
}

async function renderServices() {
    const servicesHtml = await renderServicesGridOnly();
    return `<section class="pt-5 mt-5 container min-vh-100 pb-5">
        <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">خدمات الكنيسة والأنشطة</h1>
        ${servicesHtml}
    </section>`;
}

async function renderSingleService(params) {
    try {
        const res = await fetch(`/api/services/${params.id}`);
        const service = await res.json();
        
        if (service.error) throw new Error();

        return `
            <section class="pt-5 mt-5 container min-vh-100">
                <div class="text-center mb-5 mt-4">
                    <i class="fas ${service.icon} text-gold-3d mb-3" style="font-size: 4rem;"></i>
                    <h1 class="text-gold-3d display-4">${service.name}</h1>
                    <span class="badge border border-warning text-warning p-2 fs-6 rounded-pill mt-2">${service.category}</span>
                </div>
                
                <div class="glass-panel p-5 text-white lh-lg fs-5">
                    ${service.content.replace(/\n/g, '<br>')}
                </div>
                
                <div class="text-center mt-5">
                    <a href="/services" data-link class="btn btn-outline-light rounded-pill px-4 py-2"><i class="fas fa-arrow-right me-2"></i> العودة للخدمات</a>
                </div>
            </section>
        `;
    } catch {
        return `<section class="pt-5 mt-5 container min-vh-100 text-center text-white"><h2 class="mt-5 pt-5">الخدمة غير موجودة.</h2></section>`;
    }
}

async function renderMasses() {
    const data = await fetchPage('masses');
    return `
        <section class="pt-5 mt-5 container min-vh-100">
            <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">${data.title || 'مواعيد القداسات'}</h1>
            <div class="glass-panel p-4 p-md-5 text-white fs-5 lh-lg" style="white-space: pre-wrap;">
                ${data.content || 'جاري التحميل...'}
            </div>
        </section>
    `;
}

async function renderDonate() {
    const data = await fetchPage('donate');
    return `
        <section class="pt-5 mt-5 container min-vh-100 text-center">
            <h1 class="text-gold-3d display-4 mb-4 mt-4">${data.title || 'تبرع للكنيسة'}</h1>
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="glass-panel p-5 text-white fs-4 lh-lg text-center" style="white-space: pre-wrap;">
                        ${data.content || 'جاري التحميل...'}
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderStore() {
    return `
        <section class="pt-5 mt-5 container min-vh-100">
            <h1 class="text-gold-3d display-4 mb-5 text-center mt-4">متجر الكنيسة</h1>
            <div class="text-center text-white"><p class="fs-4">قريباً...</p></div>
        </section>
    `;
}


// --- Router Core Logic ---

const app = document.getElementById('app-router-view');

async function navigateTo(url) {
    history.pushState(null, null, url);
    await router();
}

async function router() {
    // Scroll to top
    window.scrollTo(0, 0);

    // Fade out current content
    gsap.to(app, { opacity: 0, duration: 0.3, onComplete: async () => {
        
        // Match route
        const match = matchRoute(location.pathname);
        
        // Update Title
        document.title = match.route.title || 'كنيسة مارجرجس بسندبيس';

        // Render Async Content
        app.innerHTML = await match.route.render(match.params);

        // Hide preloader if it exists
        const loader = document.getElementById('page-transition');
        if (loader && loader.style.display !== 'none') {
            gsap.to(loader, { opacity: 0, duration: 0.5, onComplete: () => loader.style.display = 'none' });
        }

        // Re-initialize animations and interactivity
        if (window.initGSAPAnimations) window.initGSAPAnimations();
        if (window.init3DInteractions) window.init3DInteractions();

        // Fade in new content
        gsap.to(app, { opacity: 1, duration: 0.5 });
    }});
}

// Intercept Link Clicks
document.body.addEventListener('click', e => {
    const link = e.target.closest('[data-link]');
    if (link) {
        e.preventDefault();
        navigateTo(link.getAttribute('href'));
    }
});

// Handle Browser Back/Forward
window.addEventListener('popstate', router);

// Initial Load
document.addEventListener('DOMContentLoaded', router);
