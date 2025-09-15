// ProEase Hup Landing Page JavaScript
// Main entry point that loads and initializes all modules

// Load all modules
const modules = [
    'modules/language-manager.js',
    'modules/theme-manager.js', 
    'modules/mobile-menu-manager.js',
    'modules/pricing-manager.js',
    'modules/hero-background-manager.js',
    'modules/testimonial-slider.js',
    'modules/faq-manager.js',
    'modules/utilities.js',
    'modules/styles.js'
];

// Load modules dynamically, resolving from configured base or script's directory
function loadModules() {
    const configuredBase = window.PROEASE_ASSETS_BASE; // provided by layout
    let basePath = configuredBase;
    if (!basePath) {
        const currentScript = document.currentScript || document.querySelector('script[src*="modules/landing_pages/assets/js/script.js"]') || document.querySelector('script[src*="script.js"]');
        basePath = currentScript
            ? currentScript.src.replace(/script\.js(\?.*)?$/, '')
            : window.location.origin + '/modules/landing_pages/assets/js/';
    }

    modules.forEach(module => {
        const script = document.createElement('script');
        script.src = basePath + module; // absolute URL based on known base
        script.async = false; // execute in order
        document.head.appendChild(script);
    });
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load all modules first
    loadModules();
    
    // Wait a bit for modules to load, then initialize
    setTimeout(() => {
        initializeApp();
    }, 100);
});

function initializeApp() {
    // Add global styles first
    if (typeof addGlobalStyles === 'function') {
        addGlobalStyles();
    }
    
    // Initialize language manager
    if (typeof LanguageManager === 'function') {
    window.languageManager = new LanguageManager();
    }
    
    // Initialize theme manager
    if (typeof ThemeManager === 'function') {
    window.themeManager = new ThemeManager();
    
    // Sync theme manager with language manager if available
    if (window.languageManager) {
        window.themeManager.syncWithLanguageManager(window.languageManager);
    }
    }
    
    // Initialize mobile menu manager
    if (typeof MobileMenuManager === 'function') {
        window.mobileMenuManager = new MobileMenuManager();
    }
    
    // Initialize pricing manager
    if (typeof PricingManager === 'function') {
        window.pricingManager = new PricingManager();
    }
    
    // Initialize hero background manager
    if (typeof HeroBackgroundManager === 'function') {
        window.heroBackgroundManager = new HeroBackgroundManager();
    }
    
    // Initialize utility functions
    if (typeof setupSmoothScrolling === 'function') {
        setupSmoothScrolling();
    }
    
    if (typeof initStatsCounter === 'function') {
        initStatsCounter();
    }
    
    if (typeof initSaasPackages === 'function') {
        initSaasPackages();
    }
    
    if (typeof initScrollAnimations === 'function') {
        initScrollAnimations();
    }
    
    // Initialize optional functions if they exist
    if (typeof initTestimonialSlider === 'function') {
        initTestimonialSlider();
    }
    
    console.log('ProEase Hup website initialized successfully with modular architecture!');
}