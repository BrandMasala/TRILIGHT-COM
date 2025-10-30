// ===================================
// TRILIGHT GROUP - FUTURISTIC WEBSITE
// Modern Interactive Features
// ===================================

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initProjectCarousel();
    initScrollAnimations();
    initStatsCounter();
    initContactForm();
    initStickyHeader();
});

// ========== NAVIGATION ==========
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Active link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ========== STICKY HEADER ==========
function initStickyHeader() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    const threshold = 120;
    const delta = 8; // small movement ignored
    let ticking = false;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            // Add shadow after threshold
            if (currentScroll > threshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide on scroll down, show on scroll up
            const diff = currentScroll - lastScroll;
            const menuOpen = document.getElementById('navLinks')?.classList.contains('active');
            if (!menuOpen && currentScroll > threshold && diff > delta) {
                navbar.classList.add('hidden');
            } else if (diff < -delta || currentScroll <= threshold) {
                navbar.classList.remove('hidden');
            }

            lastScroll = currentScroll;
            ticking = false;
        });
    }, { passive: true });
}

// ========== PROJECT CAROUSEL ==========
function initProjectCarousel() {
    if (typeof Swiper !== 'undefined') {
        let revealTimers = [];
        const ZOOM_DELAY_MS = 1800; // wait before zooming out
        const ZOOM_DURATION_MS = 1200; // matches CSS transition for image

        const clearTimers = () => {
            revealTimers.forEach(t => clearTimeout(t));
            revealTimers = [];
        };

        const triggerProjectReveal = (swiper) => {
            clearTimers();
            // Reset classes for all slides
            swiper.slides.forEach(slide => {
                const card = slide.querySelector('.project-card');
                if (card) {
                    card.classList.remove('zooming');
                    card.classList.remove('content-visible');
                }
            });
            // Apply animation to active slide
            const active = swiper.slides[swiper.activeIndex];
            if (!active) return;
            const card = active.querySelector('.project-card');
            if (!card) return;
            // Hold the zoomed-in image for a moment, then zoom out
            const zoomTimer = setTimeout(() => {
                card.classList.add('zooming');
            }, ZOOM_DELAY_MS);
            revealTimers.push(zoomTimer);

            // Reveal content after zoom-out completes
            const contentTimer = setTimeout(() => {
                card.classList.add('content-visible');
            }, ZOOM_DELAY_MS + ZOOM_DURATION_MS);
            revealTimers.push(contentTimer);
        };

        new Swiper('.projects-carousel', {
            slidesPerView: 1,
            spaceBetween: 0,
            centeredSlides: true,
            speed: 800,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init(swiper) {
                    triggerProjectReveal(swiper);
                },
                slideChange(swiper) {
                    triggerProjectReveal(swiper);
                }
            }
        });
    }
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.pillar-card, .info-card, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========== STATS COUNTER ==========
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
                observer.unobserve(stat);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas if > 999
        const displayValue = Math.floor(current);
        element.textContent = displayValue > 999 ? displayValue.toLocaleString() : displayValue;
    }, 16);
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                showNotification('Thank you! We will contact you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                
                // In production, replace with actual API call:
                /*
                fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    showNotification('Thank you! We will contact you soon.', 'success');
                    form.reset();
                })
                .catch(error => {
                    showNotification('Sorry, something went wrong. Please try again.', 'error');
                })
                .finally(() => {
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                });
                */
            }, 1500);
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            const btn = this.querySelector('button');
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            setTimeout(function() {
                showNotification('Successfully subscribed to newsletter!', 'success');
                newsletterForm.reset();
                btn.innerHTML = '<i class="fas fa-arrow-right"></i>';
                btn.disabled = false;
            }, 1000);
        });
    }
}

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '-400px',
        minWidth: '300px',
        maxWidth: '500px',
        background: type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
        color: '#ffffff',
        padding: '1.25rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        transition: 'right 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.95rem',
        fontWeight: '500'
    });
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
        notification.style.right = '2rem';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.right = '-400px';
        setTimeout(() => notification.remove(), 500);
    }, 5000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-content i:first-child {
        font-size: 1.5rem;
    }
    
    .notification-content span {
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #ffffff;
        cursor: pointer;
        padding: 0.25rem;
        opacity: 0.8;
        transition: opacity 0.2s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// ========== BUTTON INTERACTIONS ==========
document.addEventListener('DOMContentLoaded', function() {
    // Enquire Now button
    const enquireBtn = document.querySelector('.btn-enquire');
    if (enquireBtn) {
        enquireBtn.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Hero Explore Projects button
    const exploreBtn = document.querySelector('.hero-actions .btn-primary');
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Learn More button
    const learnMoreBtn = document.querySelector('.about .btn-primary');
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function() {
            showNotification('More information coming soon!', 'success');
        });
    }
    
    // Project View Details buttons
    const viewDetailsButtons = document.querySelectorAll('.btn-view-details');
    viewDetailsButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const projectCard = this.closest('.project-card');
            const projectName = projectCard.querySelector('.project-name').textContent;
            showNotification(`More details about ${projectName} coming soon!`, 'success');
        });
    });
    
    // Sticky CTA buttons
    const stickyButtons = document.querySelectorAll('.btn-sticky');
    stickyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-phone')) {
                window.location.href = 'tel:+914012345678';
            } else if (icon.classList.contains('fa-whatsapp')) {
                window.open('https://wa.me/914012345678', '_blank');
            }
        });
    });
});

// ========== PARALLAX EFFECT ==========
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========== PERFORMANCE ==========
// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ========== CONSOLE BRANDING ==========
console.log(
    '%c★★★ TRILIGHT GROUP ★★★',
    'color: #d4af37; font-size: 24px; font-weight: 900; font-family: "Space Grotesk", sans-serif; letter-spacing: 0.1em;'
);
console.log(
    '%cLuxury Real Estate Development',
    'color: #606060; font-size: 14px; font-family: "Inter", sans-serif;'
);
console.log(
    '%cWebsite crafted with futuristic design',
    'color: #d4af37; font-size: 12px; font-family: "Inter", sans-serif;'
);
