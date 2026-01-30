# Trilight Group Website - Code Documentation

> **Version:** 1.0  
> **Last Updated:** January 30, 2026  
> **Framework:** Vanilla HTML/CSS/JS with Tailwind CSS  
> **3D Engine:** Three.js

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Typography & Fonts](#typography--fonts)
4. [Color Palette](#color-palette)
5. [Animations & Keyframes](#animations--keyframes)
6. [CSS Architecture](#css-architecture)
7. [JavaScript Modules](#javascript-modules)
8. [Navigation System](#navigation-system)
9. [Performance Optimizations](#performance-optimizations)
10. [Line Number Reference Guide](#line-number-reference-guide)

---

## 🎯 Project Overview

The Trilight Group website is a premium real estate showcase featuring:
- **3D Galaxy Animation** (Three.js)
- **Corner-Based Navigation** (Architectural UI)
- **Scroll-Driven Animations**
- **Full-Screen Menu Overlay**
- **Performance-Optimized** rendering

---

## 📁 File Structure

```
TRILIGHT-COM/
├── index.html              # Main website file (2,690 lines)
├── bp.html                 # Blueprint/alternate version (2,730 lines)
├── galaxy.js               # Three.js galaxy animation (283 lines)
├── lazy-load.js            # Performance & lazy loading (255 lines)
├── performance-optimizer.js # GPU acceleration & optimization (234 lines)
├── Assests/                # Images and media files
│   ├── Trilight.png
│   ├── Trilight_Logo_Final.png
│   ├── RW9.png
│   ├── T1.webp, T2.webp, T3.webp
│   └── [other assets]
└── README.md               # This file
```

---

## 🔤 Typography & Fonts

### Font Families

| Font Name | Usage | Line Reference |
|-----------|-------|----------------|
| **Playfair Display** | Headings, serif elements | Lines 108, 661 |
| **Montserrat** | Body text, sans-serif | Lines 109, 345 |
| **Manrope** | Timeline, UI elements | Line 109 |
| **Inter** | Modern UI text | Line 110 |
| **Cormorant Garamond** | Menu overlay (bp.html) | Line 661 |

### Font Loading (Lines 108-110)

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
```

### Tailwind Font Configuration (Lines 36-40)

```javascript
fontFamily: {
    serif: ['Playfair Display', 'serif'],
    sans: ['Montserrat', 'sans-serif'],
    inter: ['Inter', 'sans-serif'],
}
```

---

## 🎨 Color Palette

### CSS Variables (Lines 112-130)

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-silver` | #e2e8f0 | Primary light text |
| `--color-accent` | #94a3b8 | Muted accents |
| `--color-navy` | 2 6 23 (#020617) | Background |
| `--color-surface` | 15 23 42 (#0f172a) | Card surfaces |
| `--color-contrast` | 248 250 252 (#f8fafc) | High contrast text |
| `--color-muted` | 148 163 184 (#94a3b8) | Muted text |
| `--c-gold` | #C5A47E | Brand gold accent |

### Tailwind Extended Colors (Lines 26-34)

```javascript
colors: {
    silver: 'var(--color-silver)',
    accent: 'var(--color-accent)',
    navy: 'rgb(var(--color-navy) / <alpha-value>)',
    dark: '#030712',
    gold: '#C5A47E',
}
```

---

## ✨ Animations & Keyframes

### Core Animations (Lines 49-69)

| Animation Name | Duration | Easing | Line Reference |
|----------------|----------|--------|----------------|
| `fade-in-up` | 1.5s | cubic-bezier(0.19, 1, 0.22, 1) | Lines 50, 57-60 |
| `spin-slow` | 8s | linear | Line 51 |
| `spin-revolve` | 4s | linear | Line 52 |
| `pulse-glow` | 2s | infinite | Lines 53, 61-65 |
| `marquee` | 80s | linear infinite | Lines 54, 66-69 |

### Timeline Animations (Lines 132-339)

```css
/* Timeline fade-in */
.timeline-item {
    opacity: 0;
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-item.visible {
    opacity: 1;
    transform: translateY(0);
}
```

### Contact Section Animations (Lines 592-636)

| Keyframe | Purpose | Line Range |
|----------|---------|------------|
| `rise` | Cinematic text entrance | 593-596 |
| `float-slow` | Floating orb movement | 599-603 |
| `grain` | Film grain effect | 606-617 |
| `slide-up-fade` | Form element entrance | 620-623 |
| `reveal-wipe` | Text wipe reveal | 626-629 |

### Menu Animations (Lines 704-731)

```css
/* Corner reveal animation */
.reveal-corner {
    opacity: 0;
    animation: fadeIn 1.5s ease forwards;
}

/* Menu link stagger */
.menu-link-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
```

---

## 🏗️ CSS Architecture

### Layout Sections

| Section | Line Range | Description |
|---------|------------|-------------|
| **CSS Variables** | 112-130 | Color system, theme variables |
| **Timeline Styles** | 132-339 | Vertical timeline with nodes |
| **Body & Global** | 344-350 | Base typography, background |
| **Starfield Canvas** | 352-359 | Fixed background stars |
| **Custom Cursor** | 361-374 | Magnetic cursor (disabled) |
| **Scrollbar** | 376-380 | Minimal custom scrollbar |
| **Utilities** | 382-398 | Hover effects, parallax |
| **Constellation Scroll** | 400-445 | Project timeline animation |
| **Deck Animation** | 447-513 | Glassmorphism card deck |
| **Scroll Animations** | 516-552 | Waterfall, pulse effects |
| **Journal Styles** | 554-589 | Lens effect transitions |
| **Contact Styles** | 591-657 | Cinematic form animations |
| **Menu Styles** | 659-729 | Corner nav, grid lines |
| **Performance CSS** | 662-754 | GPU acceleration, containment |

### Grid System (Lines 665-674)

```css
.grid-line {
    position: fixed;
    background-color: rgba(255, 255, 255, 0.08);
    z-index: 40;
    pointer-events: none;
}

.grid-vertical-left { top: 0; bottom: 0; left: 4rem; width: 1px; }
.grid-vertical-right { top: 0; bottom: 0; right: 4rem; width: 1px; }
.grid-horizontal-top { left: 0; right: 0; top: 5rem; height: 1px; }
.grid-horizontal-bottom { left: 0; right: 0; bottom: 5rem; height: 1px; }
```

---

## 🎮 JavaScript Modules

### 1. Galaxy Animation (galaxy.js)

**File:** `galaxy.js` (283 lines)  
**Purpose:** Three.js particle galaxy with scroll-driven zoom

| Function | Line Range | Description |
|----------|------------|-------------|
| `generateGalaxy()` | 43-172 | Creates 3 layers of star particles |
| `getStarTexture()` | 53-113 | Generates procedural star textures |
| `tick()` | 246-278 | Animation loop with camera orbit |

**Key Features:**
- Adaptive quality based on device (Lines 24-26)
- 3 star types with different textures (Lines 73-102)
- Scroll-driven camera zoom (Lines 260-271)

### 2. Performance Optimizer (performance-optimizer.js)

**File:** `performance-optimizer.js` (234 lines)  
**Purpose:** GPU acceleration and scroll optimization

| Function | Line Range | Description |
|----------|------------|-------------|
| `enableGPUAcceleration()` | 18-42 | Forces GPU layers on animated elements |
| `optimizeScrollHandling()` | 47-66 | RAF-based scroll throttling |
| `optimizeWillChange()` | 71-97 | Smart will-change management |
| `optimizeThreeJS()` | 115-124 | Canvas hardware acceleration |

### 3. Lazy Loading (lazy-load.js)

**File:** `lazy-load.js` (255 lines)  
**Purpose:** Progressive image/video loading

| Function | Line Range | Description |
|----------|------------|-------------|
| `initLazyImages()` | 19-57 | Intersection Observer for images |
| `initLazyVideos()` | 62-89 | Video lazy loading |
| `throttle()` | 116-139 | Scroll event throttling |
| `optimizeStarfield()` | 194-209 | Reduce stars on low-end devices |

### 4. Main JavaScript (index.html)

**Location:** Lines 1838-2680  
**Key Sections:**

| Section | Line Range | Description |
|---------|------------|-------------|
| **Scroll Reveal** | 1838-1863 | Intersection Observer for fade-in |
| **Counter Animation** | 1865-1892 | Number counting on scroll |
| **Magnetic Effect** | 1894-1925 | Cursor magnetic attraction |
| **Timeline Scroll** | 1927-2006 | Timeline progress animation |
| **Constellation Scroll** | 2008-2106 | Project line drawing |
| **Journal Lens** | 2108-2184 | Tab switching with blur effect |
| **Testimonial Waterfall** | 2186-2340 | Infinite scroll testimonials |
| **Contact Form** | 2342-2500 | Multi-step form with validation |
| **Wave Path** | 2502-2616 | Scroll-driven wave animation |
| **Menu Toggle** | 2619-2680 | Full-screen menu overlay |

---

## 🧭 Navigation System

### Corner-Based Layout

**Lines 805-905** - Four fixed corner elements:

| Corner | Element | Line Range | Purpose |
|--------|---------|------------|---------|
| **Top Left** | Logo | 805-818 | Brand identity |
| **Top Right** | Inquire Button | 821-831 | Primary CTA |
| **Bottom Right** | Menu Trigger | 834-843 | Hamburger menu |
| **Overlay** | Full Menu | 846-905 | Full-screen navigation |

### Menu Trigger (Lines 834-843)

```html
<button id="menu-trigger" class="flex flex-col gap-1.5 group...">
    <span class="w-8 h-[1px] bg-white menu-bar"></span>
    <span class="w-5 h-[1px] bg-white menu-bar"></span>
    <span class="w-8 h-[1px] bg-white menu-bar"></span>
</button>
```

### Menu JavaScript (Lines 2619-2680)

```javascript
function toggleMenu() {
    if (isMenuOpen) {
        // Animate hamburger to X
        menuBars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
        menuBars[1].style.opacity = '0';
        menuBars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
        // Animate X back to hamburger
        menuBars[0].style.transform = 'none';
        menuBars[1].style.opacity = '1';
        menuBars[2].style.transform = 'none';
    }
}
```

---

## ⚡ Performance Optimizations

### GPU Acceleration (Lines 662-754)

```css
/* Force GPU layers */
.reveal-on-scroll,
.project-card,
.timeline-item,
#star-cluster,
canvas.webgl {
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
}
```

### CSS Containment (Lines 695-715)

```css
/* Reduce paint areas */
section, header {
    contain: layout style;
}

.timeline-container,
#constellation-container {
    contain: layout style paint;
}
```

### Scroll Optimization

- **RAF Throttling:** Lines 47-66 (performance-optimizer.js)
- **Passive Listeners:** Lines 160-162 (lazy-load.js)
- **Debounced Resize:** Lines 144-150 (lazy-load.js)

---

## 📍 Line Number Reference Guide

### Quick Navigation

| Feature | File | Line Numbers |
|---------|------|--------------|
| **Tailwind Config** | index.html | 22-73 |
| **CSS Variables** | index.html | 112-130 |
| **Timeline Styles** | index.html | 132-339 |
| **Menu Styles** | index.html | 659-729 |
| **Performance CSS** | index.html | 662-754 |
| **Navigation HTML** | index.html | 805-905 |
| **Hero Section** | index.html | 907-950 |
| **Philosophy** | index.html | 952-978 |
| **Projects** | index.html | 980-1148 |
| **Signature Collection** | index.html | 1150-1176 |
| **Virtual Tour** | index.html | 1178-1214 |
| **Testimonials** | index.html | 1217-1350 |
| **Visionary** | index.html | 1353-1441 |
| **Journal** | index.html | 1443-1572 |
| **Timeline** | index.html | 1574-1692 |
| **Contact** | index.html | 1694-1821 |
| **Footer** | index.html | 1823-1861 |
| **Scroll Reveal JS** | index.html | 1838-1863 |
| **Counter Animation** | index.html | 1865-1892 |
| **Timeline JS** | index.html | 1927-2006 |
| **Menu Toggle JS** | index.html | 2619-2680 |
| **Galaxy Animation** | galaxy.js | 1-283 |
| **Performance Optimizer** | performance-optimizer.js | 1-234 |
| **Lazy Loading** | lazy-load.js | 1-255 |

### Critical Code Blocks

#### 1. Three.js Galaxy Setup (galaxy.js: 43-172)
```javascript
const generateGalaxy = () => {
    // Creates 3 layers of stars with different textures
    for(let t = 0; t < starTypes; t++) {
        const geometry = new THREE.BufferGeometry();
        // ... particle generation
    }
}
```

#### 2. Scroll-Driven Wave (index.html: 2502-2616)
```javascript
function updateWaveScroll() {
    const scrollTop = window.pageYOffset;
    const viewportY = scrollTop + winHeight * 0.5;
    // Calculate wave position and star movement
}
```

#### 3. Timeline Progress (index.html: 1927-2006)
```javascript
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const maxScroll = timelineContainer.offsetHeight;
    const progress = (scrolled / maxScroll) * 100;
    timelineFill.style.height = `${progress}%`;
});
```

---

## 🎯 Key Features by Section

### Hero Section (Lines 907-950)
- **3D Galaxy Background** - Three.js particle system
- **Scroll-driven zoom** - Camera moves closer on scroll
- **Sticky positioning** - Hero stays while content scrolls

### Projects/Constellation (Lines 980-1148)
- **Vertical timeline** - Grows on scroll
- **Pathfinder star** - Follows scroll position
- **Card reveal** - Fade in on intersection

### Timeline (Lines 1574-1692)
- **Alternating layout** - Left/right positioning
- **Node activation** - Gold glow on scroll
- **Line fill** - Progress indicator

### Contact Form (Lines 1694-1821)
- **Multi-step** - Progressive disclosure
- **Focus states** - Blur inactive fields
- **Validation** - Real-time feedback

---

## 🔧 Development Notes

### Browser Compatibility
- **Modern browsers** - Chrome 90+, Firefox 88+, Safari 14+
- **Mobile optimized** - Responsive breakpoints at 768px, 480px
- **GPU acceleration** - Requires hardware acceleration enabled

### Performance Targets
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3.5s
- **Lighthouse Score:** 90+

### Known Issues
- Custom cursor disabled (Line 762 - removed)
- Chat button removed (Lines 1763-1791 - commented out)

---

## 📝 Maintenance Guide

### Adding New Sections
1. Add HTML structure after line 1821
2. Add CSS styles in appropriate section (Lines 132-754)
3. Add JavaScript if needed (Lines 1838-2680)
4. Update navigation menu (Lines 846-905)

### Modifying Colors
- Update CSS variables (Lines 112-130)
- Update Tailwind config (Lines 26-34)

### Changing Fonts
- Update Google Fonts import (Lines 108-110)
- Update Tailwind fontFamily (Lines 36-40)

---

## 📞 Support

For questions or issues, contact the development team.

**Last Updated:** January 30, 2026  
**Version:** 1.0.0
