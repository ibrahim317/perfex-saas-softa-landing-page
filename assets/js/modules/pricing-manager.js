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

// Export for global access
window.PricingManager = PricingManager;
