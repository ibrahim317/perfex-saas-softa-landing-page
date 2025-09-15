// Theme Management System
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
            const logoPath = '/modules/landing_pages/assets/images/logo-whitetheme.png';
            if (this.currentTheme === 'dark') {
                logoImage.src = logoPath;
                logoImage.alt = 'ProEase Hub Logo - Dark Theme';
            } else {
                logoImage.src = logoPath;
                logoImage.alt = 'ProEase Hub Logo - Light Theme';
            }
        }
        
        // Update footer logo based on theme
        const footerLogoImage = document.getElementById('footer-logo-image');
        if (footerLogoImage) {
            const logoPath = '/modules/landing_pages/assets/images/logo-whitetheme.png';
            if (this.currentTheme === 'dark') {
                footerLogoImage.src = logoPath;
                footerLogoImage.alt = 'ProEase Hub Logo - Dark Theme';
            } else {
                footerLogoImage.src = logoPath;
                footerLogoImage.alt = 'ProEase Hub Logo - Light Theme';
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

// Export for global access
window.ThemeManager = ThemeManager;
