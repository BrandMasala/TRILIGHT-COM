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

        // Animate Out: Slide up and fade out
        // Remove 'step-active' to revert to base state (hidden/opacity 0)
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
