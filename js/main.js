// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Enhanced Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Close all dropdowns
        closeAllDropdowns();
        
        // Reset icon
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 767) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.classList.remove('menu-open');
        
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
            closeAllDropdowns();
        }
    });
});

// Sticky Header
const header = document.querySelector('header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > headerHeight) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Reset form
            this.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            this.appendChild(successMessage);

            // Reset button
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;

            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        }, 1500);
    });
}

// Responsive Image Loading
function loadResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Touch Gesture Support for Mobile
function initTouchGestures() {
    let startX = 0;
    let startY = 0;
    let endX = 0;
    let endY = 0;

    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });

    document.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        endY = e.changedTouches[0].clientY;
        handleSwipe();
    });

    function handleSwipe() {
        const diffX = startX - endX;
        const diffY = startY - endY;
        const threshold = 50;

        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                // Swipe left
                handleSwipeLeft();
            } else {
                // Swipe right
                handleSwipeRight();
            }
        }
    }

    function handleSwipeLeft() {
        // Close mobile menu on swipe left
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    }

    function handleSwipeRight() {
        // Open mobile menu on swipe right (if closed)
        if (!navLinks.classList.contains('active')) {
            navLinks.classList.add('active');
            mobileMenuBtn.classList.add('active');
            body.classList.add('menu-open');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-times';
            }
        }
    }
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations
            handleScrollAnimations();
        }, 16); // 60fps
    });

    // Lazy load images
    if ('IntersectionObserver' in window) {
        loadResponsiveImages();
    }

    // Initialize touch gestures on mobile
    if ('ontouchstart' in window) {
        initTouchGestures();
    }
}

// Testimonials Slider
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Initialize testimonials
if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Call Button Animation
const callButton = document.querySelector('.call-button');
if (callButton) {
    callButton.addEventListener('mouseenter', () => {
        callButton.style.transform = 'scale(1.1)';
    });

    callButton.addEventListener('mouseleave', () => {
        callButton.style.transform = 'scale(1)';
    });
}

// Enhanced Dropdown Menu with Mobile Support
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    const content = dropdown.querySelector('.dropdown-content');

    if (link && content) {
        link.addEventListener('click', (e) => {
            // On mobile, toggle dropdown
            if (window.innerWidth <= 767) {
                e.preventDefault();
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active');
            }
            // On desktop, let the link work normally
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    }
});

// Close all dropdowns when mobile menu is closed
function closeAllDropdowns() {
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}

// Lazy Loading Images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for scroll to top button
const style = document.createElement('style');
style.textContent = `
    .scroll-top-btn {
        position: fixed;
        bottom: 30px;
        right: 100px;
        width: 40px;
        height: 40px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        z-index: 999;
    }

    .scroll-top-btn:hover {
        background-color: var(--secondary-color);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

// Handle regular navigation links to close mobile menu
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking on regular navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href]:not([href^="#"])');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Small delay to allow the link to work
            setTimeout(() => {
                if (window.innerWidth <= 767) {
                    document.querySelector('.nav-links').classList.remove('active');
                    document.querySelector('.mobile-menu-btn').classList.remove('active');
                    document.body.classList.remove('menu-open');
                    closeAllDropdowns();
                    
                    const icon = document.querySelector('.mobile-menu-btn i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            }, 100);
        });
    });
    
    // Initialize performance optimizations
    optimizePerformance();
    
    // Initialize responsive features on mobile
    if (window.innerWidth <= 767) {
        initTouchGestures();
    }
    
    // Handle window resize for responsive features
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 767) {
            initTouchGestures();
        }
    });
}); 