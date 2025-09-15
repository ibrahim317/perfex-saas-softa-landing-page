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

            // Close mobile menu on window resize
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    this.closeMenu();
                }
            });
            
            console.log('Mobile menu initialized successfully!');
        } else {
            console.error('Mobile menu elements not found!');
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

// Export for global access
window.MobileMenuManager = MobileMenuManager;
