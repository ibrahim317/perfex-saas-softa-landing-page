// ProEase Hup Landing Page JavaScript
// This file contains all interactive functionality for the website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initMobileMenu();
    if (typeof initFAQ === 'function') initFAQ();
    initPricingToggle();
    if (typeof initSmoothScrolling === 'function') initSmoothScrolling();
    if (typeof initAnimations === 'function') initAnimations();
    initStatsCounter();
    if (typeof initTestimonialSlider === 'function') initTestimonialSlider();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    initSaasPackages();
    
    console.log('ProEase Hup website initialized successfully!');
});
// ===== SAAS PACKAGES LOADER =====
function initSaasPackages() {
    const root = document.getElementById('pricing-cards-root');
    if (!root) return;

    // Resolve app base for portability (works if opened via CI or directly from /public/landing/index.html)
    const baseEl = document.querySelector('base');
    const appBase = "https://softa-solutions.com/";
    // Always hit CI front controller (works with/without rewrite)
    fetch(appBase + 'index.php/landing/packages_json')
        .then(r => r.json())
        .then(packages => {
            if (!Array.isArray(packages)) return;
            root.innerHTML = '';
            packages.forEach((p, idx) => {
                const color = idx % 3 === 0 ? 'blue' : (idx % 3 === 1 ? 'indigo' : 'green');
                const card = document.createElement('div');
                card.className = 'bg-white border-2 border-' + color + '-200 rounded-3xl p-8 relative shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 pricing-card';
                card.innerHTML = `
                    <div class="absolute -top-5 left-1/2 transform -translate-x-1/2">
                        <span class="bg-${color}-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">${escapeHtml(p.name)}</span>
                    </div>
                    <h3 class="text-3xl font-bold text-gray-900 mb-6">${escapeHtml(p.name)}</h3>
                    <div class="mb-8">
                        <span class="text-5xl font-bold text-gray-900">${formatPrice(p.price)}</span>
                        <span class="text-gray-600 text-xl">/ month</span>
                    </div>
                    <p class="text-gray-600 mb-6 text-center">${escapeHtml(p.description || '')}</p>
                    <div class="bg-white border-2 border-${color}-200 rounded-3xl p-8 relative shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 pricing-card">
                        <a href="${appBase}/authentication/register?package=${encodeURIComponent(p.slug)}" class="w-full bg-${color}-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-${color}-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 btn-hover-animate flex justify-center items-center">
                            اشترك الآن
                        </a>
                    </div>
                `;
                root.appendChild(card);
            });
        })
        .catch((err) => {
            console.error('Failed to load SaaS packages:', err);
        });
}

function formatPrice(v) {
    const n = Number(v || 0);
    return n === 0 ? 'Free' : `$${n}`;
}

function escapeHtml(str) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(str).replace(/[&<>"']/g, s => map[s]);
}

// ===== MOBILE MENU FUNCTIONALITY =====

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'fas fa-bars text-2xl';
                } else {
                    icon.className = 'fas fa-times text-2xl';
                }
            }
            
            // Add smooth animation
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.opacity = '0';
                mobileMenu.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    mobileMenu.style.opacity = '1';
                    mobileMenu.style.transform = 'translateY(0)';
                }, 10);
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars text-2xl';
                }
            }
        });
        
        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars text-2xl';
                }
            }
        });
        
        console.log('Mobile menu initialized successfully!');
    } else {
        console.error('Mobile menu elements not found!');
    }
}

// Language Management System
class LanguageManager {
    constructor() {
        this.currentLanguage = 'en'; // Default language
        this.init();
    }

    init() {
        // Set initial language from localStorage or default to English
        const savedLanguage = localStorage.getItem('proease-language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
        }
        
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
        
        // Add event listeners for language toggle buttons
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Desktop language toggle
        const languageToggle = document.getElementById('language-toggle');
        if (languageToggle) {
            languageToggle.addEventListener('click', () => this.toggleLanguage());
        }

        // Mobile language toggle
        const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
        if (mobileLanguageToggle) {
            mobileLanguageToggle.addEventListener('click', () => this.toggleLanguage());
        }
    }

    toggleLanguage() {
        const newLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.applyLanguage(newLanguage);
    }

    applyLanguage(language) {
        this.currentLanguage = language;
        
        // Save to localStorage
        localStorage.setItem('proease-language', language);
        
        // Update HTML lang and dir attributes
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        
        // Update language display
        this.updateLanguageDisplay();
        
        // Translate all translatable elements
        this.translatePage();
        
        // Apply RTL/LTR specific styles
        this.applyDirectionalStyles(language);
        
        // Add smooth transition effect
        document.body.classList.add('language-switch');
        setTimeout(() => {
            document.body.classList.remove('language-switch');
        }, 300);
    }

    updateLanguageDisplay() {
        const currentLangElements = document.querySelectorAll('#current-lang, #mobile-current-lang');
        currentLangElements.forEach(element => {
            element.textContent = this.currentLanguage.toUpperCase();
        });
    }

    translatePage() {
        // Get all elements with translation data
        const translatableElements = document.querySelectorAll('[data-en][data-ar]');
        
        translatableElements.forEach(element => {
            const englishText = element.getAttribute('data-en');
            const arabicText = element.getAttribute('data-ar');
            
            if (this.currentLanguage === 'ar') {
                // Handle HTML content for Arabic
                if (element.tagName === 'H1' && element.innerHTML.includes('<br>')) {
                    // Special handling for hero title with line breaks
                    element.innerHTML = arabicText;
                } else {
                    element.textContent = arabicText;
                }
            } else {
                // Handle HTML content for English
                if (element.tagName === 'H1' && element.innerHTML.includes('<br>')) {
                    // Special handling for hero title with line breaks
                    element.innerHTML = englishText;
                } else {
                    element.textContent = englishText;
                }
            }
        });
    }

    applyDirectionalStyles(language) {
        const body = document.body;
        
        if (language === 'ar') {
            // Apply RTL styles
            body.classList.add('rtl');
            body.classList.remove('ltr');
            
            // Update spacing classes for RTL
            this.updateSpacingForRTL();
        } else {
            // Apply LTR styles
            body.classList.add('ltr');
            body.classList.remove('rtl');
            
            // Update spacing classes for LTR
            this.updateSpacingForLTR();
        }
        
        // Sync with theme manager if available
        if (window.themeManager) {
            window.themeManager.syncWithLanguageManager(this);
        }
    }

    updateSpacingForRTL() {
        // Update margin and padding classes for RTL
        const elements = document.querySelectorAll('.mr-2, .mr-3, .mr-4, .mr-6, .ml-2, .ml-3, .ml-4, .ml-6, .space-x-2, .space-x-4, .space-x-6, .space-x-8, .space-x-10');
        elements.forEach(element => {
            element.classList.forEach(className => {
                if (className.startsWith('mr-')) {
                    const value = className.replace('mr-', '');
                    element.classList.remove(className);
                    element.classList.add(`ml-${value}`);
                } else if (className.startsWith('ml-')) {
                    const value = className.replace('ml-', '');
                    element.classList.remove(className);
                    element.classList.add(`mr-${value}`);
                }
            });
        });
    }

    updateSpacingForLTR() {
        // Update margin and padding classes for LTR
        const elements = document.querySelectorAll('.ml-2, .ml-3, .ml-4, .ml-6, .mr-2, .mr-3, .mr-4, .mr-6, .space-x-2, .space-x-4, .space-x-6, .space-x-8, .space-x-10');
        elements.forEach(element => {
            element.classList.forEach(className => {
                if (className.startsWith('ml-')) {
                    const value = className.replace('ml-', '');
                    element.classList.remove(className);
                    element.classList.add(`mr-${value}`);
                } else if (className.startsWith('mr-') && !className.includes('ml-')) {
                    const value = className.replace('mr-', '');
                    element.classList.remove(className);
                    element.classList.add(`ml-${value}`);
                }
            });
        });
    }
}

// Mobile Menu Management
class MobileMenuManager {
    constructor() {
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.init();
    }

    init() {
        if (this.mobileMenuBtn && this.mobileMenu) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!this.mobileMenu.contains(e.target) && !this.mobileMenuBtn.contains(e.target)) {
                    this.closeMenu();
                }
            });
        }
    }

    toggleMenu() {
        const isHidden = this.mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
    }

    openMenu() {
        this.mobileMenu.classList.remove('hidden');
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-times text-2xl"></i>';
        
        // Add slide-in animation
        this.mobileMenu.style.animation = 'slideInDown 0.3s ease-out';
    }

    closeMenu() {
        this.mobileMenu.classList.add('hidden');
        this.mobileMenuBtn.innerHTML = '<i class="fas fa-bars text-2xl"></i>';
    }
}

// FAQ Management with Enhanced Animations
function toggleFAQ(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    if (content.classList.contains('hidden')) {
        // Open FAQ
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
        
        // Add slide-down animation
        content.style.animation = 'slideDown 0.3s ease-out';
        
        // Close other open FAQs
        const allFAQs = document.querySelectorAll('.faq-content');
        allFAQs.forEach(faq => {
            if (faq !== content && !faq.classList.contains('hidden')) {
                faq.classList.add('hidden');
                const otherIcon = faq.previousElementSibling.querySelector('i');
                otherIcon.style.transform = 'rotate(0deg)';
            }
        });
    } else {
        // Close FAQ
        content.classList.add('hidden');
        icon.style.transform = 'rotate(0deg)';
    }
}

// Pricing Toggle Management with Enhanced UI
class PricingManager {
    constructor() {
        this.monthlyBtn = document.getElementById('monthly-btn');
        this.yearlyBtn = document.getElementById('yearly-btn');
        this.init();
    }

    init() {
        if (this.monthlyBtn && this.yearlyBtn) {
            this.monthlyBtn.addEventListener('click', () => this.switchToMonthly());
            this.yearlyBtn.addEventListener('click', () => this.switchToYearly());
        }
    }

    switchToMonthly() {
        this.monthlyBtn.classList.add('bg-white', 'shadow-lg', 'text-gray-900');
        this.monthlyBtn.classList.remove('text-gray-600');
        this.yearlyBtn.classList.remove('bg-white', 'shadow-lg', 'text-gray-900');
        this.yearlyBtn.classList.add('text-gray-600');
        
        // Add smooth transition
        this.monthlyBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.monthlyBtn.style.transform = 'scale(1)';
        }, 200);
    }

    switchToYearly() {
        this.yearlyBtn.classList.add('bg-white', 'shadow-lg', 'text-gray-900');
        this.yearlyBtn.classList.remove('text-gray-600');
        this.monthlyBtn.classList.remove('bg-white', 'shadow-lg', 'text-gray-900');
        this.monthlyBtn.classList.add('text-gray-600');
        
        // Add smooth transition
        this.yearlyBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.yearlyBtn.style.transform = 'scale(1)';
        }, 200);
    }
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

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize language manager
    window.languageManager = new LanguageManager();
    
    // Initialize mobile menu manager
    window.mobileMenuManager = new MobileMenuManager();
    
    // Initialize pricing manager
    window.pricingManager = new PricingManager();
    
    // Setup smooth scrolling
    setupSmoothScrolling();
    
    // Add enhanced CSS classes
    const style = document.createElement('style');
    style.textContent = `
        .rtl .text-left { text-align: right !important; }
        .rtl .text-right { text-align: left !important; }
        .rtl .ml-2 { margin-left: 0 !important; margin-right: 0.5rem !important; }
        .rtl .ml-3 { margin-left: 0 !important; margin-right: 0.75rem !important; }
        .rtl .ml-4 { margin-left: 0 !important; margin-right: 1rem !important; }
        .rtl .ml-6 { margin-left: 0 !important; margin-right: 1.5rem !important; }
        .rtl .mr-2 { margin-right: 0 !important; margin-left: 0.5rem !important; }
        .rtl .mr-3 { margin-right: 0 !important; margin-left: 0.75rem !important; }
        .rtl .mr-4 { margin-right: 0 !important; margin-left: 1rem !important; }
        .rtl .mr-6 { margin-right: 0 !important; margin-left: 1.5rem !important; }
        
        /* RTL Spacing adjustments */
        .rtl .space-x-2 > * + * { margin-left: 0 !important; margin-right: 0.5rem !important; }
        .rtl .space-x-4 > * + * { margin-left: 0 !important; margin-right: 1rem !important; }
        .rtl .space-x-6 > * + * { margin-left: 0 !important; margin-right: 1.5rem !important; }
        .rtl .space-x-8 > * + * { margin-left: 0 !important; margin-right: 2rem !important; }
        .rtl .space-x-10 > * + * { margin-left: 0 !important; margin-right: 2.5rem !important; }
        
        .ltr .text-left { text-align: left !important; }
        .ltr .text-right { text-align: right !important; }
        
        /* RTL specific adjustments */
        .rtl .fa-chevron-down { transform: scaleX(-1); }
        .rtl .fa-chevron-right { transform: scaleX(-1); }
        
        /* Mobile menu RTL adjustments */
        .rtl #mobile-menu .text-left { text-align: right !important; }
        .rtl #mobile-menu .mr-4 { margin-right: 0 !important; margin-left: 1rem !important; }
        .rtl #mobile-menu .mr-6 { margin-right: 0 !important; margin-left: 1.5rem !important; }
        
        /* Animation keyframes */
        @keyframes slideInDown {
            from {
                transform: translateY(-100%);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes animateIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .animate-in {
            animation: animateIn 0.6s ease-out forwards;
        }
        
        /* Enhanced hover effects */
        .feature-card:hover,
        .stats-card:hover,
        .pricing-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
    `;
    document.head.appendChild(style);
});

// Export for global access
window.toggleFAQ = toggleFAQ;

// ===== ANIMATED HERO BACKGROUND FUNCTIONALITY =====

// Hero Background Animation Manager
class HeroBackgroundManager {
    constructor() {
        this.isInitialized = false;
        this.animationFrame = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.setupEventListeners();
        this.initializeAnimations();
        this.startMouseTracking();
        this.isInitialized = true;
        
        console.log('Hero Background Animation initialized');
    }

    setupEventListeners() {
        // Mouse move tracking for parallax effect
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Scroll tracking for scroll-based animations
        window.addEventListener('scroll', () => {
            this.handleScrollAnimation();
        });

        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Theme change observer
        this.setupThemeObserver();
    }

    setupThemeObserver() {
        // Observe changes to the data-theme attribute
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.updateThemeEffects();
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }

    initializeAnimations() {
        // Initialize floating icons with random delays
        this.initializeFloatingIcons();
        
        // Initialize data points with counting animation
        this.initializeDataPoints();
        
        // Initialize chart animations
        this.initializeCharts();
        
        // Initialize particle system
        this.initializeParticles();
        
        // Start the main animation loop
        this.startAnimationLoop();
    }

    initializeFloatingIcons() {
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach((icon, index) => {
            // Add random rotation and scale variations
            icon.style.setProperty('--rotation', `${Math.random() * 360}deg`);
            icon.style.setProperty('--scale', `${0.8 + Math.random() * 0.4}`);
            
            // Add hover effect
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = '';
                icon.style.transition = '';
            });
        });
    }

    initializeDataPoints() {
        const dataPoints = document.querySelectorAll('.data-point');
        dataPoints.forEach((point, index) => {
            const numberElement = point.querySelector('.data-number');
            if (numberElement) {
                // Add counting animation on scroll
                this.observeElement(point, () => {
                    this.animateNumber(numberElement);
                });
            }
        });
    }

    initializeCharts() {
        const charts = document.querySelectorAll('.animated-chart');
        charts.forEach((chart, index) => {
            const bars = chart.querySelectorAll('.chart-bar');
            bars.forEach((bar, barIndex) => {
                // Set random heights for bars
                const height = 30 + Math.random() * 70;
                bar.style.setProperty('--target-height', `${height}%`);
                
                // Add staggered animation
                bar.style.animationDelay = `${barIndex * 0.2}s`;
            });
        });
    }

    initializeParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            // Add random movement patterns
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            particle.style.setProperty('--random-x', `${randomX}px`);
            particle.style.setProperty('--random-y', `${randomY}px`);
        });
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateParallaxEffects();
            this.updateParticlePositions();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    updateParallaxEffects() {
        const icons = document.querySelectorAll('.floating-icon');
        const speed = 0.02;
        
        icons.forEach((icon, index) => {
            const rect = icon.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (this.mouseX - centerX) * speed;
            const deltaY = (this.mouseY - centerY) * speed;
            
            icon.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    }

    // Update theme-specific effects
    updateThemeEffects() {
        const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
        
        if (isDarkMode) {
            // Add dark mode specific effects
            this.addDarkModeEffects();
        } else {
            // Add light mode specific effects
            this.addLightModeEffects();
        }
    }

    addDarkModeEffects() {
        // Add glow effects for dark mode
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach(icon => {
            icon.style.filter = 'drop-shadow(0 0 10px rgba(96, 165, 250, 0.3))';
        });
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.filter = 'drop-shadow(0 0 5px rgba(96, 165, 250, 0.4))';
        });
    }

    addLightModeEffects() {
        // Add glow effects for light mode
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach(icon => {
            icon.style.filter = 'drop-shadow(0 0 10px rgba(30, 41, 59, 0.3))';
        });
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.filter = 'drop-shadow(0 0 5px rgba(30, 41, 59, 0.4))';
        });
    }

    removeDarkModeEffects() {
        // Remove dark mode specific effects
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach(icon => {
            icon.style.filter = '';
        });
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.filter = '';
        });
    }

    updateParticlePositions() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const rect = particle.getBoundingClientRect();
            if (rect.top < -50) {
                // Reset particle position when it goes off screen
                particle.style.top = '100%';
                particle.style.left = `${Math.random() * 100}%`;
            }
        });
    }

    handleScrollAnimation() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        const rect = heroSection.getBoundingClientRect();
        const scrollProgress = 1 - (rect.top / window.innerHeight);
        
        if (scrollProgress > 0 && scrollProgress < 1) {
            // Add scroll-based animations
            this.updateScrollBasedAnimations(scrollProgress);
        }
    }

    updateScrollBasedAnimations(progress) {
        // Update opacity based on scroll
        const backgroundElements = document.querySelectorAll('.floating-icon, .data-point, .animated-chart');
        backgroundElements.forEach((element, index) => {
            const opacity = 0.3 + (0.7 * progress);
            element.style.opacity = opacity;
        });
    }

    handleResize() {
        // Recalculate positions on resize
        this.updateElementPositions();
    }

    updateElementPositions() {
        // Adjust element positions for different screen sizes
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Hide complex animations on mobile for performance
            document.querySelectorAll('.data-point, .animated-chart, .connection-line').forEach(el => {
                el.style.display = 'none';
            });
        } else {
            // Show all animations on desktop
            document.querySelectorAll('.data-point, .animated-chart, .connection-line').forEach(el => {
                el.style.display = '';
            });
        }
    }

    observeElement(element, callback) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    }

    animateNumber(element) {
        const finalNumber = element.textContent;
        const isPercentage = finalNumber.includes('%');
        const isTime = finalNumber.includes('/');
        
        let startNumber = 0;
        let endNumber = parseFloat(finalNumber.replace(/[^\d.]/g, ''));
        
        if (isTime) {
            // Handle time format like "24/7"
            endNumber = 24;
        }
        
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentNumber = Math.floor(startNumber + (endNumber - startNumber) * this.easeOutQuart(progress));
            
            if (isPercentage) {
                element.textContent = `${currentNumber}%`;
            } else if (isTime) {
                element.textContent = `${currentNumber}/7`;
            } else {
                element.textContent = currentNumber;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    startMouseTracking() {
        // Add mouse trail effect
        document.addEventListener('mousemove', (e) => {
            this.createMouseTrail(e.clientX, e.clientY);
        });
    }

    createMouseTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 4px;
            height: 4px;
            background: rgba(59, 130, 246, 0.6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: trailFade 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 600);
    }

    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.isInitialized = false;
    }
}

// Initialize Hero Background when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize hero background animations
    window.heroBackgroundManager = new HeroBackgroundManager();
});

// Add CSS for mouse trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
    
    .mouse-trail {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(trailStyle);

// ===== THEME MANAGEMENT SYSTEM =====

// Theme Manager Class
class ThemeManager {
    constructor() {
        this.currentTheme = 'light'; // Default theme
        this.init();
    }

    init() {
        // Set initial theme from localStorage or default to light
        const savedTheme = localStorage.getItem('proease-theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
            }
        }
        
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        
        // Add event listeners for theme toggle buttons
        this.setupEventListeners();
        
        // Listen for system theme changes
        this.setupSystemThemeListener();
    }

    setupEventListeners() {
        // Desktop theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Mobile theme toggle
        const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        if (mobileThemeToggle) {
            mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    setupSystemThemeListener() {
        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                if (!localStorage.getItem('proease-theme')) {
                    // Only auto-switch if user hasn't manually set a theme
                    this.applyTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        
        // Save to localStorage
        localStorage.setItem('proease-theme', theme);
        
        // Update HTML data attribute
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme display
        this.updateThemeDisplay();
        
        // Update theme icons
        this.updateThemeIcons();
        
        // Apply theme-specific animations
        this.applyThemeAnimations(theme);
        
        // Add smooth transition effect
        document.body.classList.add('theme-switch');
        setTimeout(() => {
            document.body.classList.remove('theme-switch');
        }, 300);
        
        console.log(`Theme switched to: ${theme}`);
    }

    updateThemeDisplay() {
        const mobileThemeText = document.getElementById('mobile-theme-text');
        if (mobileThemeText) {
            mobileThemeText.textContent = this.currentTheme === 'dark' ? 'Light Mode' : 'Dark Mode';
        }
    }

    updateThemeIcons() {
        const themeIcon = document.getElementById('theme-icon');
        const mobileThemeIcon = document.getElementById('mobile-theme-icon');
        const logoImage = document.getElementById('logo-image');
        
        if (themeIcon) {
            themeIcon.className = this.currentTheme === 'dark' 
                ? 'fas fa-sun text-yellow-400 text-lg theme-icon-transition' 
                : 'fas fa-moon text-gray-600 text-lg theme-icon-transition';
        }
        
        if (mobileThemeIcon) {
            mobileThemeIcon.className = this.currentTheme === 'dark' 
                ? 'fas fa-sun text-yellow-400 text-lg theme-icon-transition' 
                : 'fas fa-moon text-gray-600 text-lg theme-icon-transition';
        }
        
        // Update logo based on theme
        if (logoImage) {
            if (this.currentTheme === 'dark') {
                logoImage.src = 'assets/images/logo-darktheme.png';
                logoImage.alt = 'ProEase Hup Logo - Dark Theme';
            } else {
                logoImage.src = 'assets/images/logo-whitetheme.png';
                logoImage.alt = 'ProEase Hup Logo - Light Theme';
            }
        }
        
        // Update footer logo based on theme
        const footerLogoImage = document.getElementById('footer-logo-image');
        if (footerLogoImage) {
            if (this.currentTheme === 'dark') {
                footerLogoImage.src = 'assets/images/logo-darktheme.png';
                footerLogoImage.alt = 'ProEase Hup Logo - Dark Theme';
            } else {
                footerLogoImage.src = 'assets/images/logo-whitetheme.png';
                footerLogoImage.alt = 'ProEase Hup Logo - Light Theme';
            }
        }
    }

    applyThemeAnimations(theme) {
        // Add theme-specific animations
        if (theme === 'dark') {
            this.addDarkModeAnimations();
        } else {
            this.removeDarkModeAnimations();
        }
    }

    addDarkModeAnimations() {
        // Add subtle glow effects for dark mode
        const style = document.createElement('style');
        style.id = 'dark-mode-animations';
        style.textContent = `
            [data-theme="dark"] .floating-icon {
                animation: floatDark 6s ease-in-out infinite;
            }
            
            @keyframes floatDark {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                    opacity: 0.8;
                    filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.3));
                }
                50% {
                    transform: translateY(-20px) rotate(5deg);
                    opacity: 1;
                    filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.5));
                }
            }
            
            [data-theme="dark"] .particle {
                animation: particleFloatDark 10s linear infinite;
            }
            
            @keyframes particleFloatDark {
                0% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0;
                    filter: drop-shadow(0 0 5px rgba(96, 165, 250, 0.3));
                }
                50% {
                    filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.6));
                }
                100% {
                    transform: translateY(-100px) translateX(50px);
                    opacity: 0;
                    filter: drop-shadow(0 0 5px rgba(96, 165, 250, 0.3));
                }
            }
        `;
        document.head.appendChild(style);
    }

    removeDarkModeAnimations() {
        // Remove dark mode specific animations
        const darkModeStyle = document.getElementById('dark-mode-animations');
        if (darkModeStyle) {
            darkModeStyle.remove();
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    // Method to sync with other managers
    syncWithLanguageManager(languageManager) {
        // Update theme based on language direction for RTL/LTR specific themes
        if (languageManager.currentLanguage === 'ar') {
            // Arabic language specific theme adjustments
            this.applyArabicThemeAdjustments();
        } else {
            this.removeArabicThemeAdjustments();
        }
    }

    applyArabicThemeAdjustments() {
        // Add RTL specific theme adjustments
        const style = document.createElement('style');
        style.id = 'arabic-theme-adjustments';
        style.textContent = `
            [dir="rtl"][data-theme="dark"] .floating-icon {
                animation-direction: reverse;
            }
            
            [dir="rtl"][data-theme="dark"] .particle {
                animation-direction: reverse;
            }
        `;
        document.head.appendChild(style);
    }

    removeArabicThemeAdjustments() {
        const arabicStyle = document.getElementById('arabic-theme-adjustments');
        if (arabicStyle) {
            arabicStyle.remove();
        }
    }
}

// Initialize Theme Manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    window.themeManager = new ThemeManager();
    
    // Sync theme manager with language manager if available
    if (window.languageManager) {
        window.themeManager.syncWithLanguageManager(window.languageManager);
    }
});

// Add CSS for theme transitions
const themeTransitionStyle = document.createElement('style');
themeTransitionStyle.textContent = `
    .theme-switch {
        transition: all 0.3s ease;
    }
    
    .theme-switch * {
        transition: all 0.3s ease;
    }
    
    /* Theme toggle button hover effects */
    #theme-toggle:hover,
    #mobile-theme-toggle:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    [data-theme="dark"] #theme-toggle:hover,
    [data-theme="dark"] #mobile-theme-toggle:hover {
        box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
    }
    
    /* Smooth icon transitions */
    .theme-icon-transition {
        transition: all 0.3s ease;
    }
    
    /* Dark mode specific enhancements */
    [data-theme="dark"] .floating-icon:hover {
        filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.8));
        transform: scale(1.1);
    }
    
    [data-theme="dark"] .data-point:hover {
        transform: scale(1.05);
        filter: drop-shadow(0 0 15px rgba(96, 165, 250, 0.6));
    }
`;
document.head.appendChild(themeTransitionStyle);

// ===== TESTIMONIAL SLIDER FUNCTIONALITY =====
function initTestimonialSlider() {
    const testimonialsWrapper = document.querySelector('.testimonials-wrapper');
    const navDots = document.querySelectorAll('.nav-dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!testimonialsWrapper || !navDots.length) {
        console.error('Testimonial slider elements not found!');
        return;
    }
    
    let currentIndex = 0;
    const totalTestimonials = navDots.length;
    
    // Function to update testimonial position
    function updateTestimonialPosition() {
        const translateX = -currentIndex * 100;
        testimonialsWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        navDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active-dot');
                dot.classList.remove('bg-blue-300');
                dot.classList.add('bg-blue-500');
                dot.classList.add('w-4');
            } else {
                dot.classList.remove('active-dot');
                dot.classList.remove('bg-blue-500');
                dot.classList.add('bg-blue-300');
                dot.classList.remove('w-4');
            }
        });
    }
    
    // Function to go to next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials;
        updateTestimonialPosition();
    }
    
    // Function to go to previous testimonial
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonialPosition();
    }
    
    // Function to go to specific testimonial
    function goToTestimonial(index) {
        currentIndex = index;
        updateTestimonialPosition();
    }
    
    // Add event listeners for navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToTestimonial(index));
    });
    
    // Add event listeners for arrow buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevTestimonial);
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
    }
    
    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextTestimonial, 5000); // Change every 5 seconds
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Pause auto-play on hover
    const testimonialsContainer = document.querySelector('.testimonials-container');
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('mouseenter', stopAutoPlay);
        testimonialsContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Pause auto-play when user interacts with navigation
    [prevBtn, nextBtn, ...navDots].forEach(element => {
        if (element) {
            element.addEventListener('click', () => {
                stopAutoPlay();
                setTimeout(startAutoPlay, 3000); // Resume after 3 seconds
            });
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next testimonial
                nextTestimonial();
            } else {
                // Swipe right - previous testimonial
                prevTestimonial();
            }
        }
    }
    
    if (testimonialsContainer) {
        testimonialsContainer.addEventListener('touchstart', handleTouchStart);
        testimonialsContainer.addEventListener('touchend', handleTouchEnd);
    }
    
    // Initialize first testimonial
    updateTestimonialPosition();
    
    console.log('Testimonial slider initialized successfully!');
}
