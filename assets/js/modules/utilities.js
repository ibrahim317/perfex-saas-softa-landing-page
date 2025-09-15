// Utility Functions
function formatPrice(v) {
    const n = Number(v || 0);
    return n === 0 ? 'Free' : `$${n}`;
}

function escapeHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(str).replace(/[&<>"']/g, s => map[s]);
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
                    }
                }
                
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Enhanced Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .stats-card, .pricing-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const stats = document.querySelectorAll('.stats-number');
    
    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current).toLocaleString();
            }, 20);
        });
    };

    // Trigger animation when stats section is visible
    const statsSection = document.querySelector('#stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(statsSection);
    }
}

// SAAS Packages Loader
function initSaasPackages() {
    const root = document.getElementById('pricing-cards-root');
    if (!root) return;

    // Fetch plans from OpenAPI server
    const API_BASE = window.PROEASE_API_BASE || '';
    // Use public proxy endpoint to avoid CORS and expose limited data
    const url = `${API_BASE}/landing_pages/api/plans`;

    root.innerHTML = '<div class="col-span-3 text-center text-gray-500">Loading plans...</div>';

    fetch(url, { method: 'GET' })
        .then(res => {
            if (!res.ok) throw new Error(`Failed to load plans: ${res.status}`);
            return res.json();
        })
        .then(plans => {
            if (!Array.isArray(plans) || plans.length === 0) {
                root.innerHTML = '<div class="col-span-3 text-center text-gray-500">No plans available at the moment.</div>';
                return;
            }
            root.innerHTML = '';
            plans.forEach(plan => {
                const card = document.createElement('div');
                card.className = 'pricing-card bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300';

                const name = escapeHtml(plan.name || 'Plan');
                const description = escapeHtml(plan.description || '');
                const price = typeof plan.price === 'number' ? `$${plan.price}` : 'Contact Us';
                const isDefault = plan.is_default ? '<span class="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Popular</span>' : '';

                const features = Array.isArray(plan.modules) ? plan.modules.slice(0, 6) : [];

                const registerUrl = `${window.APP_BASE_URL_DEFAULT}authentication/register`;
                const planParam = window.PERFEX_SAAS_PLAN_PARAM || 'plan';
                const ctaHref = `${registerUrl}?${encodeURIComponent(planParam)}=${encodeURIComponent(plan.slug || '')}`;

                card.innerHTML = `
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-2xl font-bold text-gray-900">${name}</h3>
                        ${isDefault}
                    </div>
                    <p class="text-gray-600 mb-6">${description}</p>
                    <div class="text-5xl font-extrabold text-gray-900 mb-6">${price}
                        <span class="text-base text-gray-500 font-medium">/mo</span>
                    </div>
                    <ul class="space-y-3 mb-8 text-gray-700">
                        ${features.map(f => `<li class="flex items-center"><i class="fas fa-check text-green-500 mr-3"></i> ${escapeHtml(f)}</li>`).join('')}
                    </ul>
                    <a href="${ctaHref}" class="block text-center bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl">Choose Plan</a>
                `;

                root.appendChild(card);
            });
        })
        .catch(err => {
            console.error(err);
            root.innerHTML = '<div class="col-span-3 text-center text-red-500">Failed to load plans. Please try again later.</div>';
        });
}

// Export for global access
window.formatPrice = formatPrice;
window.escapeHtml = escapeHtml;
window.setupSmoothScrolling = setupSmoothScrolling;
window.initScrollAnimations = initScrollAnimations;
window.initStatsCounter = initStatsCounter;
window.initSaasPackages = initSaasPackages;
