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

// Export for global access
window.HeroBackgroundManager = HeroBackgroundManager;
