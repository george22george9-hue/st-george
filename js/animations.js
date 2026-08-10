// ==========================================================================
// GSAP Animations
// ==========================================================================

window.initGSAPAnimations = () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('main-nav');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(6, 10, 23, 0.98)';
                header.style.boxShadow = 'var(--shadow-glass)';
            } else {
                header.style.background = 'var(--gradient-glass)';
                header.style.boxShadow = 'none';
            }
        });
    }

    // 2. Page Reveal Animations
    gsap.fromTo("#hero-right > *", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 }
    );

    gsap.fromTo("#hero-left > *", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.6 }
    );

    gsap.fromTo("#hero-actions", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 1.0 }
    );

    // 3. ScrollTrigger for sections
    const fathersGrid = document.getElementById('fathers-grid');
    if (fathersGrid) {
        gsap.fromTo("#fathers-grid .col-lg-4",
            { y: 50, opacity: 0 },
            {
                y: 0, 
                opacity: 1, 
                duration: 0.8, 
                stagger: 0.2, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: "#fathers-grid",
                    start: "top 80%",
                }
            }
        );
    }
    
    // Services Grid Animation
    const servicesGridItems = document.querySelectorAll('.card-3d-wrapper');
    if (servicesGridItems.length > 0) {
        gsap.fromTo(servicesGridItems,
            { y: 30, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.6,
                stagger: 0.05,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: servicesGridItems[0],
                    start: "top 85%"
                }
            }
        );
    }
};

// Initialize on first load
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    // Slight delay to ensure DOM is ready and loader is gone
    setTimeout(() => {
        if(window.initGSAPAnimations) {
            window.initGSAPAnimations();
        }
    }, 600);
});
