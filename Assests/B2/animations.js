
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
(function() {
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
})();

// --- Constellation Scroll Logic (Pathfinder) ---
(function() {
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
            
            // Calculate dynamic safe limit (bottom of last project minus buffer)
            const lastProject = document.querySelector('[data-project="6"]');
            let maxProgress = 1.0; // Default to full height if last project is missing
            
            if(lastProject) {
                const lastProjectBottom = lastProject.offsetTop + lastProject.offsetHeight;
                // Stop at the bottom of the last project
                maxProgress = lastProjectBottom / sectionHeight;
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
})();


document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.timeline-container');
    if(!container) return; // Guard clause if section is missing

    const lineFill = document.getElementById('progressLine');
    const items = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
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

    items.forEach(item => timelineObserver.observe(item));

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
let vimeoPlayer = null;

function initVideoPlayer() {
    const iframe = document.getElementById('testimonial-video');
    if(iframe && window.Vimeo) {
        vimeoPlayer = new Vimeo.Player(iframe);
        vimeoPlayer.setVolume(0); // Ensure muted start
    }
}

// Initialize when Vimeo API is loaded
window.addEventListener('load', initVideoPlayer);

window.toggleMute = function() {
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
        id: 1, type: "video", name: "Sarah Chen", role: "Lead Designer, Flow",
        thumbnailGradient: "from-pink-900/50 to-purple-900/50",
        content: "This venture truly distinguished itself from others in the area. Its design was noticeably different from nearby projects, making it a standout opportunity worth exploring.", tag: "Design Story"
    },
    {
        id: 2, type: "text", name: "Alex Rivera", role: "CTO, Nexus",
        content: "Engaged in construction and business since age 15, I instantly recognize project potential. The marketing team's rare honesty, openness, and knowledge were genuinely comforting, a quality I haven't seen in the hundreds of projects I've reviewed", rating: 5, tag: "Enterprise"
    },
    {
        id: 3, type: "text", name: "David Park", role: "Frontend Dev, Stripe",
        content: "This property's unique design is very appealing, and the entire experience feels almost surreal given how rapidly the surrounding area is developing", rating: 5, tag: "UI/UX"
    },
    {
        id: 4, type: "text", name: "Marcus Thorne", role: "Founder, Zenith",
        content: "After I saw the model house, immediately I fell in love. I was like, no matter what, you know, we have to buy this. I started eating my husband's brain like anything! Finally, I was able to convince him", rating: 5, tag: "SaaS"
    },
    {
        id: 5, type: "video", name: "Jessica Wu", role: "Director, Trilight Inc",
        thumbnailGradient: "from-violet-900/50 to-indigo-900/50",
        content: "The location is perfect, the amenities are top-notch, and the community here is just wonderful. I couldn't be happier with my decision to move here.", tag: "Founder Talk"
    },
    {
        id: 6, type: "text", name: "Elena Vost", role: "Product Manager",
        content: "The moment I saw the model house, I was absolutely captivated. I instantly felt, \"no matter what, we have to buy this.\" I put constant pressure on my husband, and ultimately, I succeeded in convincing him.", rating: 5, tag: "Product"
    },
    {
        id: 7, type: "text", name: "James Wilson", role: "Indie Hacker",
        content: "It’s great actually. I think it’s starting early, I think even before giving the flat. I think it’s very early and we like that concept actually, celebrating. We actually love the concept of celebrating this, especially since it's starting so early even before the flat is handed over. It's truly great.", rating: 5, tag: "Indie"
    },
    {
        id: 8, type: "video", name: "Anna K.", role: "Creative Director",
        thumbnailGradient: "from-blue-900/50 to-cyan-900/50",
        content: "We were house hunting and immediately fell in love. The hospitality and presentation of the features here sealed the deal. What truly impressed me was Mr. Sanjeev Reddy's absolute commitment. He promised, \"We may promise you nine, but at the end of the day, we give you the tenth one also, without promising.\" This level of commitment—down-to-earth and dedicated to delivering the expected project—is why we chose this location, the project, and the people behind it.", tag: "Creative"
    },
];

function createStars() {
    return Array(5).fill(0).map(() => 
        `<i data-lucide="star" class="w-[10px] h-[10px] fill-current"></i>`
    ).join('');
}

function createCard(item) {
    const isVideo = item.type === 'video';
    
    // Common wrapper
    let cardContent = '';

    if (isVideo) {
        cardContent = `
            <div class="flex flex-col gap-4">
                <!-- Video Thumbnail -->
                <div class="relative w-full h-40 rounded-xl overflow-hidden bg-black/50 border border-white/5 group-hover:border-white/20 transition-colors">
                    <div class="absolute inset-0 bg-gradient-to-br ${item.thumbnailGradient} opacity-60"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                            <i data-lucide="play" class="w-4 h-4 fill-white ml-1"></i>
                        </div>
                    </div>
                    <div class="absolute top-2 right-2 px-2 py-0.5 bg-black/60 rounded text-[10px] font-mono border border-white/10 text-gray-300">0:45</div>
                </div>
                
                <div>
                    <p class="text-lg font-medium leading-snug text-gray-200">"${item.content}"</p>
                    <div class="mt-4 flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">${item.name[0]}</div>
                        <div class="text-xs text-muted">
                            <span class="text-white block font-medium">${item.name}</span>
                            ${item.role}
                        </div>
                    </div>
                </div>
            </div>
        `;
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
                    <span class="text-purple-400 font-serif text-2xl mr-1">“</span>
                    ${item.content}
                </p>

                <div class="flex items-center gap-3 border-t border-white/5 pt-4">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-800 to-black border border-white/10 flex items-center justify-center text-xs font-bold shadow-inner">
                        ${item.name[0]}
                    </div>
                    <div>
                        <h4 class="text-sm font-medium text-white">${item.name}</h4>
                        <p class="text-xs text-muted">${item.role}</p>
                    </div>
                </div>
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

function initWaterfall() {
    const leftCol = document.getElementById('waterfall-left');
    const rightCol = document.getElementById('waterfall-right');
    
    // Split data
    const col1 = [reviews[0], reviews[3], reviews[6], reviews[1]];
    const col3 = [reviews[2], reviews[5], reviews[0], reviews[3]];

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

// --- Global Wave Path & Revolving Stars Logic ---
(function() {
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
})();

// Initialize Lucide Icons
if(window.lucide) {
    lucide.createIcons();
}

// Menu Logic
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
if(menuLinks) {
    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            const letter = link.getAttribute('data-letter');
            if(letter && watermark) {
                watermark.innerText = letter;
                watermark.style.opacity = '0.1';
                watermark.style.transform = 'translateX(-20px) scale(1.1)';
            }
        });

        link.addEventListener('mouseleave', () => {
            if(watermark) {
                watermark.style.opacity = '0.03';
                watermark.style.transform = 'translateX(0) scale(1)';
            }
        });
        
        // Close menu on click
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });
}
