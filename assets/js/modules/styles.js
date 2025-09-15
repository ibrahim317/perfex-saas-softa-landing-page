// CSS Styles and Animations
function addGlobalStyles() {
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
        
        /* Theme transitions */
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
        
        /* Mouse trail animation */
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
    document.head.appendChild(style);
}

// Export for global access
window.addGlobalStyles = addGlobalStyles;
