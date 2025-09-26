document.addEventListener('DOMContentLoaded', function() {
    // Stats Counter Animation
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const steps = 50;
        const stepValue = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += stepValue;
            element.textContent = Math.round(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, duration / steps);
    }

    // Initialize counters when they become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('.counter').forEach(counter => {
        observer.observe(counter);
    });

    // Mobile Menu Toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const closeButton = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuButton?.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });
    
    closeButton?.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                mobileMenu?.classList.remove('active');
            }
        });
    });
});