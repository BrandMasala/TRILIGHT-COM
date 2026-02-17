// --- TAILWIND CONFIG ---
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                silver: 'var(--color-silver)', 
                accent: 'var(--color-accent)', 
                navy: 'rgb(var(--color-navy) / <alpha-value>)', 
                dark: '#030712', 
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                contrast: 'rgb(var(--color-contrast) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                gold: '#C5A47E',
            },
            fontFamily: {
                serif: ['Optima', 'Segoe UI', 'sans-serif'],
                avenir: ['Avenir Next', 'Avenir', 'sans-serif'],
                sans: ['Dosis', 'sans-serif'],
            },
            letterSpacing: {
                tightest: '-.05em',
                widest: '.25em',
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
            },
            animation: {
                'fade-in-up': 'fadeInUp 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
                'spin-slow': 'spin 8s linear infinite',
                'spin-revolve': 'spin 4s linear infinite',
                'pulse-glow': 'pulseGlow 2s infinite',
                'marquee': 'marquee 80s linear infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(40px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                pulseGlow: {
                    '0%': { boxShadow: '0 0 0 0 rgba(226, 232, 240, 0.4)' },
                    '70%': { boxShadow: '0 0 0 10px rgba(226, 232, 240, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(226, 232, 240, 0)' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' },
                }
            }
        }
    }
}

// --- SCROLL RESTORATION ---
// Force scroll to top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

window.addEventListener('load', function() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
    });
    // Double check after a short delay to override any browser restoration
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, 10);
});

// --- PROJECT 2 VIDEO LAZY LOAD ---
document.addEventListener("DOMContentLoaded", () => {
    const rootContainer = document.getElementById('project-2-video-container');
    const loader = document.getElementById('p2-loader');
    
    // The actual "screen" container is the parent of the loader (the inner div with aspect-video)
    // Fallback to rootContainer if loader structure changes, but loader.parentElement is safer for the specific layout
    const videoContainer = loader ? loader.parentElement : rootContainer;

    // Find the preview image within the container
    const previewImage = videoContainer ? videoContainer.querySelector('img') : null;
    
    if(previewImage) {
        previewImage.id = 'p2-preview';
        previewImage.style.transition = 'opacity 0.8s ease-out';
        previewImage.style.position = 'absolute';
        previewImage.style.top = '0';
        previewImage.style.left = '0';
        previewImage.style.width = '100%';
        previewImage.style.height = '100%';
        previewImage.style.zIndex = '20'; // Stay on top initially
        previewImage.style.objectFit = 'cover';
    }

    let loaded = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !loaded) {
                loaded = true;
                if(loader) loader.style.opacity = '1';
                
                // Slight delay to ensure smooth entry before fetching
                setTimeout(() => {
                    if(!videoContainer) return;
                    
                    // Create Wrapper
                    const wrapper = document.createElement('div');
                    // We want this wrapper to FILL the videoContainer (which is relative + aspect-video)
                    wrapper.style.position = 'absolute';
                    wrapper.style.top = '0';
                    wrapper.style.left = '0';
                    wrapper.style.width = '100%';
                    wrapper.style.height = '100%';
                    wrapper.style.zIndex = '10'; // Below preview initially

                    // Create Iframe
                    const iframe = document.createElement('iframe');
                    iframe.src = "https://player.vimeo.com/video/1164915625?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&background=1&dnt=1&playsinline=1";
                    iframe.frameBorder = "0";
                    iframe.allow = "autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share";
                    iframe.style.position = "absolute";
                    iframe.style.top = "0";
                    iframe.style.left = "0";
                    iframe.style.width = "100%";
                    iframe.style.height = "100%";
                    iframe.title = "18TH HOUR SNIP 2";
                    
                    // Handle Load
                    iframe.onload = () => {
                        // Video loaded, fade out preview
                        if(previewImage) {
                            previewImage.style.opacity = '0';
                            setTimeout(() => {
                                previewImage.style.display = 'none';
                            }, 800);
                        }
                        if(loader) loader.style.opacity = '0';
                    };

                    wrapper.appendChild(iframe);
                    
                    // Append script
                    const script = document.createElement('script');
                    script.src = "https://player.vimeo.com/api/player.js";
                    wrapper.appendChild(script);

                    // Append to videoContainer (the inner div)
                    videoContainer.appendChild(wrapper);

                }, 100); 
                
                observer.unobserve(rootContainer); // Unobserve the root
            }
        });
    }, { threshold: 0.25 }); // Trigger when 25% visible

    if(rootContainer) observer.observe(rootContainer);
});

// --- JOURNAL SECTION SCRIPT ---
(function() {
    // --- DATA SOURCE ---
    const articles = [
        {
            id: 1,
            type: 'journal',
            category: 'Zoya Tata Product',
            date: 'AUG, 2024',
            title: 'August Edition 24',
            excerpt: 'Stay updated with the latest from The Trilight – where luxury living meets unparalleled exclusivity. In this edition, we bring you exciting community news, exclusive events, and insider updates on our exquisite residences. Dive in and explore what’s new this month!',
            readTime: '2 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2024/09/trilight-Newsletter-Aug2024.pdf'
        },
        {
            id: 2,
            type: 'journal',
            category: 'Winning Architecture & Innovation',
            date: 'JUL, 2024',
            title: 'July Edition 24',
            excerpt: "We are excited to share the news that The Trilight, in Kokapet, has been honored with two prestigious Golden Brick Awards from Dubai. Recognized for 'Innovative Concept of the Year' and 'Emerging Developer of the Year (Regional)'. Also, the Construction is progressing smoothly, promising a timely completion to deliver a life beyond experience.",
            readTime: '4 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2024/07/Newsletter-July-Awards-2.pdf'
        },
        {
            id: 3,
            type: 'journal',
            category: 'Flash Back of Sucessful Year',
            date: 'JAN, 2024',
            title: 'January Edition 24',
            excerpt: 'We are excited to update you on the progress of The Trilight project. Our construction team has been working tirelessly to ensure that the project is completed on time and to the highest quality standards',
            readTime: '3 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2024/01/Trilight-Newsletter-2024.pdf'
        },
        {
            id: 4,
            type: 'journal',
            category: 'Media validation',
            date: 'SEP, 2023',
            title: 'September Edition',
            excerpt: 'The Trilight Towers will contribute to the flourishing and rapidly evolving community in and around Kokapet, which is rapidly establishing itself as the gold standard. Our commitment is to ensure that the construction of your new dream home not only meets but exceeds your expectations in terms of quality. We are delighted to announce that the construction progress has been consistently on course, and we are well-positioned to bring your vision to life within the scheduled timeline.',
            readTime: '6 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2023/10/September-Newsletter.pdf' 
        },
        {
            id: 5,
            type: 'journal',
            category: 'Saviour of Society',
            date: 'JUL, 2023',
            title: 'July Edition',
            excerpt: 'The Trilight team has diligently adhered to the project schedule to ensure that the construction of your dream home not only meets but possibly exceeds your expectations in terms of quality. We are thrilled to convey that construction progress has remained steady, and we are right on track to realize your vision as per the scheduled timeline.',
            readTime: '2 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2023/08/July-Newsletter.pdf'
        },
        {
            id: 6,
            type: 'journal',
            category: 'Monthly Construction Updates',
            date: 'MAY, 2023',
            title: 'May Edition',
            excerpt: 'The Trilight team has been working on schedule to make sure that the construction procedure of your new dream abode is able to match or even surpass the level of your expectations in the realm of quality. Our team is delighted to inform you that the progress on the construction has been consistent, and we are at par with the schedule for achieving your vision on time',
            readTime: '2 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2023/06/Newsletter-May23.pdf'
        },
        {
            id: 7,
            type: 'journal',
            category: 'Real Estate Marketing Collateral',
            date: 'MAR, 2023',
            title: 'March Edition',
            excerpt: 'We are excited to update you on the progress of The Trilight project. Our construction team has been working tirelessly to ensure that the project is completed on time and to the highest quality standards',
            readTime: '2 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2023/04/Trilight-Newsletter_March23.pdf'
        },
        {
            id: 8,
            type: 'journal',
            category: 'Property Development Newsletter',
            date: 'FEB, 2023',
            title: 'February Edition',
            excerpt: 'The Trilight towers will add to the grandeur and fast-growing community in and around the Kokapet which is quickly becoming the gold standard for the major real estate players in Hyderabad.',
            readTime: '2 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2023/04/Newsletter_Feb23.pdf'
        },
        {
            id: 9,
            type: 'journal',
            category: 'Launch',
            date: 'JAN, 2023',
            title: 'January Edition',
            excerpt: 'We look forward to the next phase of the project and will keep you posted with regular updates. In the meantime, we are grateful for your trust in us, and wish you good health and warm wishes for 2023.',
            readTime: '2 min read',
            link: 'https://thetrilight.com/wp-content/uploads/2023/04/Trilight_Newsletter_Jan23.pdf'
        }
    ];

    const riseArticles = [
            {
            id: 101, // Start well above normal IDs
            type: 'journal',
            category: 'Rise with 9',
            date: 'COMING SOON',
            title: 'New Horizons',
            excerpt: 'Explore the future of luxury living with our upcoming Rise with 9 collection. Stay tuned for exclusive updates and architectural marvels.',
            readTime: '1 min read',
            link: '#' 
        }
    ];

    // --- DOM ELEMENTS ---
    const trilightListContainer = document.getElementById('trilight-list');
    const riseListContainer = document.getElementById('rise-list');
    const lensContainer = document.getElementById('lens-container');
    
    // Lens Elements
    const lensType = document.getElementById('lens-type');
    const lensDate = document.getElementById('lens-date');
    const lensReadTime = document.getElementById('lens-readTime');
    const lensTitle = document.getElementById('lens-title');
    const lensExcerpt = document.getElementById('lens-excerpt');
    const lensLink = document.getElementById('lens-link');

    let currentActiveId = 1;

    // --- INITIALIZATION ---
    function init() {
        renderList();
        
        // Lucide icons are re-initialized after rendering list
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // --- RENDER LIST ---
    function renderList() {
        renderSection(trilightListContainer, articles);
        renderSection(riseListContainer, riseArticles);
    }

    function renderSection(container, items) {
        if (!container) return;
        container.innerHTML = '';
        
        items.forEach(item => {
            const isActive = item.id === currentActiveId;
            
            const div = document.createElement('div');
            div.className = `group relative p-4 md:p-6 rounded-xl cursor-pointer transition-all duration-500 border h-full ${
                isActive ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent hover:bg-white/[0.02]'
            }`;
            div.setAttribute('data-id', item.id);
            
            // Active Indicator (Blue Line)
            const activeLine = isActive ? `
                <div class="absolute left-0 top-6 bottom-6 w-1 bg-gold rounded-r-full animate-in fade-in zoom-in-y duration-300"></div>
            ` : '';

            // Arrow State
            const arrowClass = isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4';

            // Title Color
            const titleClass = isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200';

            div.innerHTML = `
                ${activeLine}
                <div class="flex flex-col h-full justify-between gap-2 pointer-events-none">
                    <div class="flex-1">
                        <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                            <span class="text-[8px] md:text-[10px] font-bold tracking-widest uppercase text-gold">${item.category}</span>
                            <span class="hidden md:block w-1 h-1 rounded-full bg-gray-600"></span>
                            <span class="text-[8px] md:text-[10px] text-gray-500 font-mono">${item.date}</span>
                        </div>
                        <h3 class="text-sm md:text-xl font-light transition-colors duration-300 ${titleClass} line-clamp-2">
                            ${item.title}
                        </h3>
                    </div>

                    <div class="mt-2 text-right transition-all duration-300 ${arrowClass}">
                        <i data-lucide="arrow-right" class="w-4 h-4 md:w-5 md:h-5 text-gold ml-auto"></i>
                    </div>
                </div>
            `;

            // Event Listeners
            div.addEventListener('mouseenter', () => updateActiveItem(item.id));
            div.addEventListener('click', () => updateActiveItem(item.id)); // For mobile

            container.appendChild(div);
        });
    }
        


    // --- UPDATE LOGIC ---
    function updateActiveItem(id) {
        if (id === currentActiveId) return;
        
        currentActiveId = id;
        
        // 1. Update List Styles
        renderList();

        // 2. Animate Lens Content
        // Add 'switching' class to trigger blur/fade out
        if (lensContainer) {
            lensContainer.classList.add('switching');
            
            // Wait for fade out, then swap data and fade in
            setTimeout(() => {
                const allArticles = [...articles, ...riseArticles];
                const item = allArticles.find(i => i.id === id);
                if (item) {
                    // Update Text
                    if (lensType) {
                        lensType.textContent = item.type;
                        // Update Badge Styles
                        if (item.type === 'press') {
                            lensType.className = "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-avenir border transition-colors border-blue-500/30 text-blue-300 bg-blue-500/10";
                        } else {
                            lensType.className = "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest font-avenir border transition-colors border-blue-500/30 text-blue-300 bg-blue-500/10";
                        }
                    }
                    if (lensDate) lensDate.textContent = item.date;
                    if (lensReadTime) lensReadTime.textContent = item.readTime;
                    if (lensTitle) lensTitle.textContent = item.title;
                    if (lensExcerpt) lensExcerpt.textContent = item.excerpt;
                    
                    // Update Link
                    if (lensLink) {
                        lensLink.href = item.link || '#';
                        // Optional: Hide button if no link? For now just default to #
                    }
                }
                
                // Remove class to trigger fade in
                lensContainer.classList.remove('switching');
            }, 300); // 300ms matches the transition duration partway
        }
    }

    // --- TAB LOGIC ---
    window.switchTab = function(tab) {
        const trilightSection = document.getElementById('section-trilight');
        const riseSection = document.getElementById('section-rise');
        const tabTrilight = document.getElementById('tab-trilight');
        const tabRise = document.getElementById('tab-rise');

        // Reset Classes
        const activeClasses = ['text-gold', 'border-gold'];
        const inactiveClasses = ['text-gray-500', 'border-transparent'];

        if (tab === 'trilight') {
            // Show Trilight
            trilightSection.classList.remove('hidden', 'opacity-0');
            riseSection.classList.add('hidden', 'opacity-0');
            
            // Update Buttons
            tabTrilight.classList.add(...activeClasses);
            tabTrilight.classList.remove('text-gray-500', 'border-transparent');
            
            tabRise.classList.remove('text-gold', 'border-gold');
            tabRise.classList.add(...inactiveClasses);

        } else {
            // Show Rise
            riseSection.classList.remove('hidden', 'opacity-0');
            trilightSection.classList.add('hidden', 'opacity-0');

            // Update Buttons
            tabRise.classList.add(...activeClasses);
            tabRise.classList.remove('text-gray-500', 'border-transparent');
            
            tabTrilight.classList.remove('text-gold', 'border-gold');
            tabTrilight.classList.add(...inactiveClasses);
        }
    };

    // Start
    document.addEventListener("DOMContentLoaded", init);
})();

// --- VELOCITY LOGIC SCRIPT ---
(function() {
    // --- 0. NO STARFIELD (REMOVED) ---
    
    // Warp Speed Function (Kept as dummy to prevent errors in form calls)
    window.triggerWarp = function() {
        // No-op since starfield is gone
    }

    // --- 2. FORM INTERACTION LOGIC ---
    let currentStep = 1;
    const totalSteps = 3;

    // Re-init Icons for this section
    if(window.lucide) window.lucide.createIcons();

    function focusInput(step) {
        setTimeout(() => {
            const input = document.querySelector(`#step-${step} input`);
            if(input) input.focus();
        }, 500);
    }

    // Global Keydown (scoped to when form is visible ideally, but here globally is ok for demo)
    // Ideally attach to inputs
    const inputs = document.querySelectorAll('.velocity-input');
    inputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (currentStep < totalSteps) nextStep(currentStep);
                else if (currentStep === totalSteps) submitForm();
            }
        });
    });

    window.nextStep = function(step) {
        const input = document.querySelector(`#step-${step} input`);
        if (input && !input.value.trim()) {
            input.classList.add('animate-pulse'); // Tailwind pulse
            // Custom heavy pulse
            const originalBorder = input.style.borderColor;
            input.style.borderColor = '#ef4444'; // Red error
            setTimeout(() => {
                input.classList.remove('animate-pulse');
                input.style.borderColor = ''; // Reset
            }, 500);
            return;
        }

        if (step === 1) {
            const name = input.value.split(' ')[0];
            const display = document.getElementById('display-name');
            if(display) display.textContent = name;
        }

        transitionStep(step, step + 1);
    };

    window.prevStep = function(step) {
        transitionStep(step, step - 1);
    };

    function transitionStep(current, next) {
        triggerWarp(); // Visual Flare

        const currentEl = document.getElementById(`step-${current}`);
        const nextEl = document.getElementById(`step-${next}`);

        if(!currentEl || !nextEl) return;

        currentEl.classList.remove('step-active'); 
        currentEl.classList.add('hidden'); // Add hidden after transition? 
        
        
        // Logic:
        // 1. Fade out current
        const currentChildren = currentEl.children;
        for(let child of currentChildren) {
            child.classList.remove('opacity-100', 'translate-y-0');
            child.classList.add('opacity-0', '-translate-y-5'); // Move UP on exit
        }

        updateDots(next);

        setTimeout(() => {
            currentEl.classList.add('hidden');
            // Reset positions for next time
            for(let child of currentChildren) {
                    child.classList.remove('-translate-y-5');
                    child.classList.add('translate-y-5'); 
            }

            nextEl.classList.remove('hidden');
            
            // Trigger reflow
            void nextEl.offsetWidth;

            // Animate In
            const nextChildren = nextEl.children;
            for(let child of nextChildren) {
                child.classList.remove('opacity-0', 'translate-y-5');
                child.classList.add('opacity-100', 'translate-y-0');
            }
            
            focusInput(next);
            currentStep = next;
        }, 500);
    }

    window.submitForm = function() {
        triggerWarp();
        
        const dots = document.getElementById('progress-dots');
        if(dots) dots.style.opacity = '0';

        const currentEl = document.getElementById(`step-3`);
        
        // Fade out step 3
        const currentChildren = currentEl.children;
        for(let child of currentChildren) {
            child.classList.remove('opacity-100', 'translate-y-0');
            child.classList.add('opacity-0', '-translate-y-5'); 
        }

        setTimeout(() => {
            currentEl.classList.add('hidden');
            
            const successEl = document.getElementById('step-success');
            successEl.classList.remove('hidden');
            
            // Trigger reflow
            void successEl.offsetWidth;

            // Fade in success items staggered
            const items = successEl.querySelectorAll('.reveal-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('opacity-0', 'translate-y-5', 'scale-90');
                    item.classList.add('opacity-100', 'translate-y-0', 'scale-100');
                }, index * 100);
            });

        }, 500);
    };

    window.resetForm = function() {
        // Ideally reset values and go to step 1
        // Simple reload for demo, or reset state
        document.getElementById('velocity-form').reset();
        const successEl = document.getElementById('step-success');
        successEl.classList.add('hidden');
        // Hide items again
        const items = successEl.querySelectorAll('.reveal-item');
        items.forEach(item => {
            item.classList.add('opacity-0', 'translate-y-5', 'scale-90');
            item.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        });

        const dots = document.getElementById('progress-dots');
        if(dots) dots.style.opacity = '1';

        const step1 = document.getElementById('step-1');
        step1.classList.remove('hidden');
        
        // Animate Step 1 In
        const children = step1.children;
        for(let child of children) {
            child.classList.remove('opacity-0', 'translate-y-5', '-translate-y-5');
            child.classList.add('opacity-100', 'translate-y-0');
        }
        
        currentStep = 1;
        updateDots(1);
        focusInput(1);
    };

    function updateDots(step) {
        // Tailwind Active: bg-gold shadow...
        // Inactive: bg-white/10
        for (let i = 1; i <= totalSteps; i++) {
            const dot = document.getElementById(`dot-${i}`);
            if(!dot) continue;

            // Reset to base
            dot.className = 'progress-dot w-12 h-1 rounded-full transition-all duration-500';
            
            if (i === step) {
                dot.className += ' bg-gold shadow-[0_0_15px_rgba(197,164,126,0.4)]';
            } else if (i < step) {
                dot.className += ' bg-slate-600'; // Completed
            } else {
                dot.className += ' bg-white/10'; // Inactive
            }
        }
    }
    
    // Initial Animation Trigger for Step 1
    setTimeout(() => {
            const step1 = document.getElementById('step-1');
            if(step1) {
            const children = step1.querySelectorAll('.question-text, .velocity-input, .nav-controls');
            children.forEach((child) => {
                    child.classList.remove('opacity-0', 'translate-y-5');
                    child.classList.add('opacity-100', 'translate-y-0');
            });
                // Force remove overrides from HTML if any
                // The HTML had classes 'opacity-0 translate-y-5'. We remove them.
            }
    }, 100);

})();

// --- Intersection Observer for Reveals ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const inc = target / 50; 
                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
});


// --- Global Constellation Starfield ---
const canvas = document.getElementById('starfield');
if(canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, stars = [], shootingStars = [], nebulas = [];

    // Colors for stars to look more realistic with navy theme
    const starColors = ['#ffffff', '#e2e8f0', '#94a3b8']; 
    // Nebula colors: Deep cosmic purples and blues
    const nebulaColors = [
        { r: 76, g: 29, b: 149 },   // Deep Purple
        { r: 30, g: 58, b: 138 },   // Deep Blue
        { r: 88, g: 28, b: 135 },   // Dark Violet
        { r: 15, g: 23, b: 42 }     // Slate/Navy
    ];

    function initStars() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        
        stars = [];
        // Adaptive star count based on device
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const starCount = isMobile ? 75 : 150; // Reduced from 150 on mobile
        
        for(let i=0; i<starCount; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2 + 1,
                vx: (Math.random() - 0.5) * 0.2, // Velocity X
                vy: (Math.random() - 0.5) * 0.2, // Velocity Y
                alpha: Math.random() * 0.5 + 0.5, // Brighter stars (0.5 - 1.0)
                color: starColors[Math.floor(Math.random() * starColors.length)]
            });
        }

        nebulas = [];
        // Create fewer, larger nebula clouds with much lower opacity for "simple" look
        for(let i=0; i<5; i++) {
            nebulas.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 300 + 300, 
                color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
                vx: (Math.random() - 0.5) * 0.05, 
                vy: (Math.random() - 0.5) * 0.05,
                opacity: Math.random() * 0.1 + 0.05 // Reduced from 0.3+0.1 to 0.1+0.05
            });
        }
    }

    function spawnShootingStar() {
        const startX = Math.random() < 0.5 ? 0 : Math.random() * width;
        const startY = startX === 0 ? Math.random() * height : 0;
        
        shootingStars.push({
            x: startX,
            y: startY,
            len: Math.random() * 80 + 50,
            speed: Math.random() * 10 + 6,
            size: Math.random() * 2 + 0.1,
            angle: 45 * (Math.PI / 180), 
            opacity: 1
        });
    }

    function drawStars() {
        ctx.clearRect(0, 0, width, height);

        // --- Draw Nebulas (Background Layer) ---
        nebulas.forEach(nebula => {
            nebula.x += nebula.vx;
            nebula.y += nebula.vy;

            // Wrap around screen
            if(nebula.x < -nebula.radius) nebula.x = width + nebula.radius;
            if(nebula.x > width + nebula.radius) nebula.x = -nebula.radius;
            if(nebula.y < -nebula.radius) nebula.y = height + nebula.radius;
            if(nebula.y > height + nebula.radius) nebula.y = -nebula.radius;

            const gradient = ctx.createRadialGradient(nebula.x, nebula.y, 0, nebula.x, nebula.y, nebula.radius);
            const { r, g, b } = nebula.color;
            gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${nebula.opacity})`);
            gradient.addColorStop(0.6, `rgba(${r}, ${g}, ${b}, ${nebula.opacity * 0.4})`);
            gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

            ctx.globalCompositeOperation = 'screen'; // Blend mode for glowing effect
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over'; // Reset blend mode
        });

        // Silver lines
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.3)'; // Brighter lines 
        
        stars.forEach((star, index) => {
            star.x += star.vx;
            star.y += star.vy;

            if(star.x < 0 || star.x > width) star.vx *= -1;
            if(star.y < 0 || star.y > height) star.vy *= -1;

            ctx.beginPath();
            ctx.globalAlpha = star.alpha;
            ctx.fillStyle = star.color;
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            // Connect constellation lines
            for(let j = index + 1; j < stars.length; j++) {
                let other = stars[j];
                let dx = star.x - other.x;
                let dy = star.y - other.y;
                let dist = Math.sqrt(dx*dx + dy*dy);

                if(dist < 180) { // Increased distance
                    ctx.beginPath();
                    ctx.globalAlpha = 1 - (dist / 180); 
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(star.x, star.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.stroke();
                }
            }
        });

        // Shooting Stars
        for (let i = 0; i < shootingStars.length; i++) {
            let s = shootingStars[i];
            s.x += s.speed * Math.cos(s.angle);
            s.y += s.speed * Math.sin(s.angle);
            s.opacity -= 0.02;
            
            if (s.opacity <= 0 || s.x > width || s.y > height) {
                shootingStars.splice(i, 1);
                i--;
                continue;
            }

            let tailX = s.x - s.len * Math.cos(s.angle);
            let tailY = s.y - s.len * Math.sin(s.angle);
            
            let gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
            gradient.addColorStop(0, "rgba(255, 255, 255, " + s.opacity + ")");
            gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
        }

        if (Math.random() < 0.01) { 
            spawnShootingStar();
        }
        
        requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', initStars);
    initStars();
    drawStars();
} 

// --- Constellation Scroll Logic (Pathfinder) ---
const pathfinderStar = document.getElementById('pathfinder-star');
const drawingLine = document.getElementById('drawing-line');
const constellationContainer = document.getElementById('constellation-container');
const projectRows = document.querySelectorAll('.project-row');

if(constellationContainer && pathfinderStar) {
    window.addEventListener('scroll', () => {
        const rect = constellationContainer.getBoundingClientRect();
        const sectionHeight = constellationContainer.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Start calculating when section enters view (matches global wave landing)
        const startOffset = windowHeight / 2;
        let scrollDist = -rect.top + startOffset;
        let progress = scrollDist / sectionHeight;
        
        // Calculate dynamic safe limit (stop ABOVE the Upcoming Box)
        const lastProject = document.querySelector('[data-project="3"]');
        let maxProgress = 1.0; // Default to full height if target is missing
        
        if(lastProject) {
            // Stop at the TOP of the Upcoming Box
            maxProgress = lastProject.offsetTop / sectionHeight;
        }

        // Cap progress
        progress = Math.max(0, Math.min(maxProgress, progress));

        // Update Line & Star
        if (progress > 0 && progress < maxProgress) {
            pathfinderStar.style.opacity = '1';
            if(drawingLine) drawingLine.style.height = `${progress * 100}%`;
            pathfinderStar.style.top = `${progress * 100}%`;
        } else if (progress <= 0) {
            // Hide it until the wave arrives
            pathfinderStar.style.opacity = '0';
            if(drawingLine) drawingLine.style.height = '0%';
            pathfinderStar.style.top = '0%';
        } else {
            // When capped
            pathfinderStar.style.opacity = '1'; 
            if(drawingLine) drawingLine.style.height = `${maxProgress * 100}%`;
            pathfinderStar.style.top = `${maxProgress * 100}%`;
        }
            // Activate Projects
            projectRows.forEach(row => {
                const rowTop = row.offsetTop;
                // Trigger slightly before
                if (scrollDist > rowTop - 100) {
                    row.classList.add('active');
                }
            });
        });
    }


document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.timeline-container');
    if(!container) return; // Guard clause if section is missing

    const lineFill = document.getElementById('progressLine');
    const items = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const rect = entry.target.getBoundingClientRect();
                // Activate slightly earlier for smoother feel
                if(rect.top < window.innerHeight * 0.8) {
                        entry.target.classList.add('active');
                }
            }
        });
    }, { threshold: 0.1 });

    items.forEach(item => observer.observe(item));

    window.addEventListener('scroll', () => {
        if(!container) return;
        
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const containerHeight = containerRect.height;
        
        // Trigger point: Lower Middle of screen
        const scrollPos = window.scrollY + window.innerHeight * 0.6; 
        
        // Calculate how much of the timeline we have scrolled past
        let drawHeight = scrollPos - containerTop;

        // We use containerHeight - 100 to account for the bottom padding
        // This ensures the line reaches 100% just as we pass the last item
        let percentage = (drawHeight / (containerHeight - 100)) * 100;
        
        percentage = Math.max(0, Math.min(percentage, 100));
        
        if(lineFill) lineFill.style.height = `${percentage}%`;

        // Active State Logic
        items.forEach(item => {
            const itemTop = item.getBoundingClientRect().top + window.scrollY;
            if (scrollPos > itemTop) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });
});

// --- Video Mute Toggle ---
// --- Video Mute Toggle (Vimeo API version) ---
let vimeoPlayer = null;

function initVideoPlayer() {
    const iframe = document.getElementById('testimonial-video');
    
    // Lazy load support: If src is missing but data-src exists, wait for load
    if (iframe && !iframe.getAttribute('src') && iframe.getAttribute('data-src')) {
        iframe.addEventListener('load', () => initVideoPlayer(), { once: true });
        return;
    }

    if(iframe && window.Vimeo) {
        // Ensure we don't double-init
        if (!vimeoPlayer) {
            try {
                vimeoPlayer = new Vimeo.Player(iframe);
                vimeoPlayer.ready().then(() => {
                    vimeoPlayer.setMuted(true);
                    vimeoPlayer.setLoop(true);
                    vimeoPlayer.play().catch(error => {
                        console.log('Autoplay blocked:', error);
                    });
                }).catch(err => console.warn("Vimeo Init Error:", err));
            } catch (e) {
                    console.warn("Vimeo Player Instantiation failed:", e);
            }
        }
    }
}

// Initialize when Vimeo API is loaded
window.addEventListener('load', initVideoPlayer);

function toggleMute() {
    const icon = document.getElementById('mute-icon');
    if(!vimeoPlayer) {
        // Try init again if missed
        initVideoPlayer();
        if(!vimeoPlayer) return;
    }
    
    vimeoPlayer.getMuted().then(function(muted) {
        if(muted) {
            vimeoPlayer.setMuted(false);
            vimeoPlayer.setVolume(1);
            icon.classList.remove('fa-volume-mute');
            icon.classList.add('fa-volume-up');
        } else {
            vimeoPlayer.setMuted(true);
            vimeoPlayer.setVolume(0);
            icon.classList.remove('fa-volume-up');
            icon.classList.add('fa-volume-mute');
        }
    }).catch(function(error) {
        console.error('Error toggling mute:', error);
    });
}

// --- Waterfall Testimonials Data & Logic ---
const reviews = [
{
id: 1, type: "video", 
// content: "A design that stands apart, making the project impossible to ignore.",
videoEmbed: `<div style="padding:42.19% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1161472686?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1" loading="lazy" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="TESTMONIAL"></iframe></div>`
},
{
id: 2, type: "text", 
content: "Years of experience taught me one thing this project’s potential and honest team are rare.", rating: 5, 
},
{
id: 3, type: "text", 
content: "A distinctive design in a rapidly growing neighborhood makes this opportunity exceptional.", rating: 5,   
},
{
id: 4, type: "text", 
content: "One visit to the model home, and I knew it had to be ours.", rating: 5, 
},
{
id: 5, type: "video", 
// content: "Perfect location, premium amenities, and a community that feels like home.", rating: 5, 
videoEmbed: `<div style="padding:42.19% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1162425490?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1" loading="lazy" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="testicopy"></iframe></div><script src="https://player.vimeo.com/api/player.js"><\/script>`
},
{
id: 6, type: "text", 
content: "The moment we saw the model home, the decision was already made.", rating: 5, 
},
{
id: 7, type: "text", 
content: "Strong commitment, genuine leadership, and unwavering delivery confidence made us choose this project.", rating: 5, 
},
{
id: 8, type: "video",
content: "Celebrating progress even before handover reflects a refreshing, forward-thinking vision.", rating: 5, 
},
];

// --- Render Functions ---

function createStars() {
    return Array(5).fill(0).map(() => 
        `<i data-lucide="star" class="w-[10px] h-[10px] fill-current"></i>`
    ).join('');
}

function createCard(item) {
    // Only treat as video if embed exists
    const isVideo = item.type === 'video' && item.videoEmbed;
    const gradient = item.thumbnailGradient || 'from-gray-900 to-black';
    
    // Common wrapper
    let cardContent = '';

    if (isVideo) {
        if (item.videoEmbed) {
            cardContent = `
                <div class="flex flex-col gap-4">
                    <!-- Video Embed -->
                    <div class="relative w-full rounded-xl overflow-hidden border border-white/5 bg-black">
                        ${item.videoEmbed}
                    </div>
                    
                    
                </div>
            `;
        } else {
            cardContent = `
                <div class="flex flex-col gap-4">
                    <!-- Video Thumbnail -->
                    <div class="relative w-full h-40 rounded-xl overflow-hidden bg-black/50 border border-white/5 group-hover:border-white/20 transition-colors">
                        <div class="absolute inset-0 bg-gradient-to-br ${gradient} opacity-60"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                <i data-lucide="play" class="w-4 h-4 fill-white ml-1"></i>
                            </div>
                        </div>
                        <div class="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-mono border border-white/10 text-gray-300">0:45</div>
                    </div>
                    
                    <div>
                        <p class="text-lg font-medium leading-snug text-gray-200">"${item.content}"</p>
                    </div>
                </div>
            `;
        }
    } else {
        cardContent = `
            <div class="flex flex-col h-full justify-between gap-6">
                <div class="flex justify-between items-start opacity-50">
                    <i data-lucide="quote" class="w-5 h-5"></i>
                    <div class="flex text-yellow-500/80 gap-0.5 items-center">
                        ${createStars()}
                    </div>
                </div>

                <p class="text-lg font-light leading-relaxed text-gray-200">
                    <span class="text-purple-400 font-serif text-2xl">“</span>${item.content}<span class="text-purple-400 font-serif text-2xl">”</span>
                </p>
            </div>
        `;
    }

    return `
        <div class="group relative w-full flex-shrink-0 cursor-default">
            <!-- 1. Animated Border Gradient -->
            <div class="absolute -inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-2xl opacity-50 group-hover:opacity-100 transition duration-500"></div>
            
            <!-- 2. Glass Background -->
            <div class="relative bg-navy/60 backdrop-blur-xl rounded-2xl p-6 border border-white/5 overflow-hidden transition-transform duration-300 group-hover:scale-[1.02] shadow-2xl">
                <!-- Subtle Highlight -->
                <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                ${cardContent}
            </div>
        </div>
    `;
}

function createColumn(items, speed, direction, hiddenOnMobile = false) {
    // Duplicate items to ensure smooth infinite scroll
    const doubledItems = [...items, ...items];
    
    const animationClass = direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down';
    const displayClass = hiddenOnMobile ? 'hidden md:flex' : 'flex';
    const topPadding = (direction === 'down') ? 'pt-24' : '';

    const columnHtml = `
        <div class="flex flex-col gap-6 relative h-[200%] overflow-hidden ${displayClass} ${topPadding}">
            <div class="flex flex-col gap-6 w-full hover-pause ${animationClass}" style="animation-duration: ${speed};">
                ${doubledItems.map(item => createCard(item)).join('')}
            </div>
        </div>
    `;
    return columnHtml;
}

// --- Initialization ---

function initWaterfall() {
    const leftCol = document.getElementById('waterfall-left');
    const rightCol = document.getElementById('waterfall-right');
    
    // Split data (Ensure all 8 items are used uniquely)
    const col1 = [reviews[0], reviews[3], reviews[6], reviews[1]];
    const col3 = [reviews[2], reviews[5], reviews[4], reviews[7]];

    // Inject Columns if container exists
    if (leftCol) {
        leftCol.innerHTML = createColumn(col1, '40s', 'up');
    }
    if (rightCol) {
        rightCol.innerHTML = createColumn(col3, '45s', 'up');
    }

    // Initialize Icons
    if(window.lucide) {
        window.lucide.createIcons();
    }
}

// Run
document.addEventListener('DOMContentLoaded', initWaterfall);
// Fallback if already loaded
initWaterfall();

// --- Global Wave Path & Revolving Stars Logic ---
const waveContainer = document.getElementById('global-wave-container');
const wavePathBg = document.getElementById('wave-path-bg');
const wavePathDraw = document.getElementById('wave-path-draw');
const starCluster = document.getElementById('star-cluster');
const revolvingGroup = document.getElementById('revolving-group');

if (waveContainer && wavePathBg && wavePathDraw && starCluster) {
    let pathLength = 0;

    function initWave() {
        // Determine height: Stop at the "Constellation Container" (where the star starts)
        const pSection = document.getElementById('projects');
        const cContainer = document.getElementById('constellation-container');
        
        let limitHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight
        );

        if (pSection && cContainer) {
            const rect = cContainer.getBoundingClientRect();
            limitHeight = rect.top + window.scrollY;
        }

        // Fallback if something is wrong
        if (limitHeight < window.innerHeight) limitHeight = window.innerHeight * 2;
        
        const winWidth = document.documentElement.clientWidth;
        const winHeight = window.innerHeight;

        // Set container height to the limit
        waveContainer.style.position = 'absolute';
        waveContainer.style.height = `${limitHeight}px`;

        // Generate Path: A nice gentle sine wave down the center
        const amplitude = winWidth < 768 ? winWidth * 0.3 : 150; // Smaller wave on mobile
        const frequency = 0.002; // Adjust for wave tightness
        const centerX = winWidth / 2;
        
        // On mobile, constellation line is at left-4 (1rem = 16px) relative to its container
        // We need to calculate the actual position from viewport left
        const isMobile = winWidth < 768;
        let constellationX = centerX;
        
        if (isMobile) {
            // Get the constellation container to calculate its left offset
            const constellationContainer = document.getElementById('constellation-container');
            if (constellationContainer) {
                const containerRect = constellationContainer.getBoundingClientRect();
                // left-4 = 1rem = 16px from container's left edge
                constellationX = containerRect.left + 16;
            } else {
                // Fallback: estimate based on max-w-[95%] mx-auto
                const containerMargin = (winWidth * 0.05) / 2; // 2.5% on each side
                constellationX = containerMargin + 16;
            }
        }

        let d = `M ${centerX} 0`;
        const steps = 50; // Resolution
        
        for (let y = 0; y <= limitHeight; y += steps) {
            // Taper amplitude: Full amplitude at top, 0 at bottom (limitHeight)
            // We can start tapering halfway down or just linear taper from the start
            // Let's taper it drastically in the last 500px to ensure it aligns
            
            let currentAmp = amplitude;
            const remainingDist = limitHeight - y;
            
            if (remainingDist < 500) {
                // Linear fade out of amplitude in the last 500px
                currentAmp = amplitude * (remainingDist / 500);
            }
            
            // Gradually move from centerX to constellationX in the last 500px
            let targetX = centerX;
            if (remainingDist < 500) {
                const transitionProgress = 1 - (remainingDist / 500);
                targetX = centerX + (constellationX - centerX) * transitionProgress;
            }
            
            const x = targetX + Math.sin(y * frequency) * currentAmp;
            d += ` L ${x} ${y}`;
        }
        
        // FORCE Connection to constellation line position at the exact end point
        d += ` L ${constellationX} ${limitHeight}`;

        wavePathBg.setAttribute('d', d);
        wavePathDraw.setAttribute('d', d);

        pathLength = wavePathDraw.getTotalLength();
        
        // Hide the "draw" path initially
        wavePathDraw.style.strokeDasharray = pathLength;
        wavePathDraw.style.strokeDashoffset = pathLength;
    }

    function updateWaveScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const winHeight = window.innerHeight;
        const docHeight = waveContainer.offsetHeight; // This is valid limitHeight

        // Calculate progress
        const viewportY = scrollTop + winHeight * 0.5; 
        
        const winWidth = document.documentElement.clientWidth;
        const amplitude = winWidth < 768 ? winWidth * 0.3 : 150;
        const frequency = 0.002;
        const centerX = winWidth / 2;
        
        // On mobile, constellation line is at left-4 (1rem = 16px) relative to its container
        const isMobile = winWidth < 768;
        let constellationX = centerX;
        
        if (isMobile) {
            const constellationContainer = document.getElementById('constellation-container');
            if (constellationContainer) {
                const containerRect = constellationContainer.getBoundingClientRect();
                constellationX = containerRect.left + 16;
            } else {
                const containerMargin = (winWidth * 0.05) / 2;
                constellationX = containerMargin + 16;
            }
        }
        
        // Move Star Cluster logic - center the 48px container on the wave path
        let targetX = centerX; // Default to center

        if (viewportY <= docHeight) {
            // Apply the SAME amplitude tapering as the wave path
            let currentAmp = amplitude;
            const remainingDist = docHeight - viewportY;
            
            if (remainingDist < 500) {
                currentAmp = amplitude * (remainingDist / 500);
            }
            
            // Gradually move from centerX to constellationX in the last 500px
            let baseX = centerX;
            if (remainingDist < 500) {
                const transitionProgress = 1 - (remainingDist / 500);
                baseX = centerX + (constellationX - centerX) * transitionProgress;
            }
            
            targetX = baseX + Math.sin(viewportY * frequency) * currentAmp;
            
            starCluster.style.left = `${targetX}px`;
            starCluster.style.top = `${viewportY}px`;
            starCluster.style.marginLeft = '-24px';
            starCluster.style.marginTop = '-24px';
            
            // Reset Transition for smooth movement
            starCluster.style.transition = 'transform 0.1s ease-out'; 
            starCluster.style.opacity = '1';
            starCluster.style.transform = 'scale(1)';

        } else {
            // Lock at end AND Disappear into the constellation
            starCluster.style.left = `${constellationX}px`;
            starCluster.style.top = `${docHeight}px`;
            starCluster.style.marginLeft = '-24px';
            starCluster.style.marginTop = '-24px';
            
            // Disappear effect
            starCluster.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            starCluster.style.opacity = '0';
            starCluster.style.transform = 'scale(0.1)';
        }
        
        // --- MERGE LOGIC ---
        // Trail removed as requested

        // Update drawn path
        // Ratio is viewportY / full path height (limitHeight)
        let ratio = viewportY / docHeight;
        ratio = Math.min(ratio, 1);
        
        wavePathDraw.style.strokeDashoffset = pathLength - (pathLength * ratio);
    }

    window.addEventListener('resize', () => {
        initWave();
        updateWaveScroll();
    });
    
    window.addEventListener('scroll', updateWaveScroll);
    
    // Init
    initWave();
    updateWaveScroll(); // Set initial position
}

// Initialize Lucide Icons
if(window.lucide) {
    lucide.createIcons();
}

const menuTrigger = document.getElementById('menu-trigger');
const fullMenu = document.getElementById('full-menu');
const watermark = document.getElementById('watermark');
const menuLinks = document.querySelectorAll('.menu-link-item');
const menuBars = document.querySelectorAll('.menu-bar');

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        // Open Menu
        fullMenu.classList.remove('translate-y-full');
        setTimeout(() => fullMenu.classList.add('menu-open'), 100); // Trigger staggering
        
        // Animate Hamburger to X
        menuBars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        menuBars[1].style.opacity = '0';
        menuBars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        menuBars.forEach(bar => bar.style.width = '30px');
    } else {
        // Close Menu
        fullMenu.classList.remove('menu-open');
        setTimeout(() => fullMenu.classList.add('translate-y-full'), 300); // Wait for fade out
        
        // Animate X back to Hamburger
        menuBars[0].style.transform = 'none';
        menuBars[1].style.opacity = '1';
        menuBars[2].style.transform = 'none';
        menuBars[0].style.width = '32px'; // Reset widths
        menuBars[1].style.width = '20px';
        menuBars[2].style.width = '32px';
    }
}

if(menuTrigger) {
    menuTrigger.addEventListener('click', toggleMenu);
}

// Watermark Interaction
menuLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const letter = link.getAttribute('data-letter');
        if(letter) {
            watermark.innerText = letter;
            watermark.style.opacity = '0.1';
            watermark.style.transform = 'translateX(-20px) scale(1.1)';
        }
    });

    link.addEventListener('mouseleave', () => {
        watermark.style.opacity = '0.03';
        watermark.style.transform = 'translateX(0) scale(1)';
    });
    
    // Close menu on click
    link.addEventListener('click', () => {
        if (isMenuOpen) toggleMenu();
    });
});

window.addEventListener('load', function() {
    if (window.lucide) {
        lucide.createIcons();
    }
    initVideoPlayer(); // Ensure video init after script load
});
