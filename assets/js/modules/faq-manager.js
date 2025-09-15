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

// Export for global access
window.toggleFAQ = toggleFAQ;
