/**
 * Lazy Loading & Performance Optimization Script
 * Handles progressive image loading, intersection observers, and resource management
 */

(function() {
    'use strict';

    // Configuration
    const config = {
        rootMargin: '50px',
        threshold: 0.01,
        videoRootMargin: '200px'
    };

    /**
     * Lazy load images with blur-up effect
     */
    function initLazyImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            // Browser supports native lazy loading
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                }
            });
        } else {
            // Fallback to Intersection Observer
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                        }
                        
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: config.rootMargin,
                threshold: config.threshold
            });

            images.forEach(img => imageObserver.observe(img));
        }
    }

    /**
     * Lazy load videos
     */
    function initLazyVideos() {
        const videos = document.querySelectorAll('video[data-src]');
        
        const videoObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const video = entry.target;
                    const sources = video.querySelectorAll('source[data-src]');
                    
                    sources.forEach(source => {
                        source.src = source.dataset.src;
                    });
                    
                    video.load();
                    video.play().catch(() => {
                        // Auto-play failed, user interaction required
                    });
                    
                    observer.unobserve(video);
                }
            });
        }, {
            rootMargin: config.videoRootMargin,
            threshold: config.threshold
        });

        videos.forEach(video => videoObserver.observe(video));
    }

    /**
     * Pause video when out of viewport to save resources
     */
    function initVideoPauseOnExit() {
        const videos = document.querySelectorAll('video');
        
        const pauseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                } else if (entry.isIntersecting && video.paused && video.hasAttribute('autoplay')) {
                    video.play().catch(() => {});
                }
            });
        }, {
            threshold: 0.25
        });

        videos.forEach(video => pauseObserver.observe(video));
    }

    /**
     * Optimize scroll event listeners with throttling
     */
    function throttle(func, wait) {
        let timeout;
        let previous = 0;
        
        return function(...args) {
            const now = Date.now();
            const remaining = wait - (now - previous);
            
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                func.apply(this, args);
            } else if (!timeout) {
                timeout = setTimeout(() => {
                    previous = Date.now();
                    timeout = null;
                    func.apply(this, args);
                }, remaining);
            }
        };
    }

    /**
     * Debounce function for resize events
     */
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * Optimize existing scroll handlers
     */
    function optimizeScrollHandlers() {
        // Store original scroll handlers
        const originalHandlers = [];
        
        // Replace with throttled versions
        window.addEventListener('scroll', throttle(() => {
            // Scroll handlers will be called here
        }, 16), { passive: true }); // 60fps = ~16ms
    }

    /**
     * Add will-change strategically
     */
    function optimizeAnimations() {
        const animatedElements = document.querySelectorAll('.reveal-on-scroll, .project-card, .timeline-item');
        
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add will-change just before animation
                    entry.target.style.willChange = 'transform, opacity';
                    
                    // Remove after animation completes
                    setTimeout(() => {
                        entry.target.style.willChange = 'auto';
                    }, 1500);
                }
            });
        }, {
            rootMargin: '100px',
            threshold: 0.01
        });

        animatedElements.forEach(el => animationObserver.observe(el));
    }

    /**
     * Reduce starfield complexity on low-end devices
     */
    function optimizeStarfield() {
        const canvas = document.getElementById('starfield');
        if (!canvas) return;

        // Detect device performance
        const isLowEnd = navigator.hardwareConcurrency <= 4 || 
                        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isLowEnd) {
            // Reduce star count and complexity
            canvas.style.opacity = '0.5';
            
            // Signal to starfield script to reduce particles
            window.STARFIELD_QUALITY = 'low';
        }
    }

    /**
     * Preload critical resources
     */
    function preloadCriticalResources() {
        // Preload hero image if exists
        const heroImg = document.querySelector('.hero-video-wrapper img');
        if (heroImg && heroImg.dataset.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = heroImg.dataset.src;
            document.head.appendChild(link);
        }
    }

    /**
     * Initialize all optimizations
     */
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        initLazyImages();
        initLazyVideos();
        initVideoPauseOnExit();
        optimizeScrollHandlers();
        optimizeAnimations();
        optimizeStarfield();
        preloadCriticalResources();

        // Export throttle and debounce for use by other scripts
        window.performanceUtils = {
            throttle,
            debounce
        };
    }

    // Start initialization
    init();

})();
