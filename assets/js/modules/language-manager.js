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
            const englishText = element.getAttribute('data-en') || '';
            const arabicText = element.getAttribute('data-ar') || '';
            const allowHtml = element.getAttribute('data-html') === 'true' || /<[a-z][\s\S]*>/i.test(englishText) || /<[a-z][\s\S]*>/i.test(arabicText);

            const content = this.currentLanguage === 'ar' ? arabicText : englishText;

            if (allowHtml) {
                element.innerHTML = content;
            } else {
                // Special handling for hero title with <br>
                if (element.tagName === 'H1' && (englishText.includes('<br>') || arabicText.includes('<br>'))) {
                    element.innerHTML = content;
                } else {
                    element.textContent = content;
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

// Export for global access
window.LanguageManager = LanguageManager;
