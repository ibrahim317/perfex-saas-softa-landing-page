// Testimonial Slider Functionality
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

// Export for global access
window.initTestimonialSlider = initTestimonialSlider;
