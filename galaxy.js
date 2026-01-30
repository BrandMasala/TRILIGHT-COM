// import './style.css'
import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js";


// import { Geometry, TetrahedronGeometry } from 'three'

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//galaxy - Optimized for performance
const parameters = {}

// Detect device capabilities for adaptive quality
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const isLowEnd = navigator.hardwareConcurrency <= 4;
const qualityLevel = window.STARFIELD_QUALITY || (isMobile || isLowEnd ? 'low' : 'high');

// Adaptive particle count based on device
parameters.count = qualityLevel === 'low' ? 40000 : 80000; // Increased count
parameters.size = 0.02; // Slightly larger stars
parameters.radius = 5.0; // Larger radius to fill screen 
parameters.branches = 4; 
parameters.spin = 3;
parameters.randomness = 5;
parameters.randomnessPower = 4;
parameters.insideColor = '#6a73ee';
parameters.outsideColor = '#1e2c50';

let materials = [];
let geometries = [];
let galaxyPoints = [];

const generateGalaxy = () => {
    // Cleanup
    galaxyPoints.forEach(points => scene.remove(points));
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    
    galaxyPoints = [];
    geometries = [];
    materials = [];

    const getStarTexture = (type) => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');
        
        const cx = 64;
        const cy = 64;

        // Common Glow
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);

        ctx.fillStyle = 'rgba(255, 255, 255, 1)';

        if (type === 0) {
            // Type 0: 4-Point Shiny Star (Original)
            ctx.beginPath();
            ctx.ellipse(cx, cy, 2, 40, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(cx, cy, 40, 2, 0, 0, Math.PI * 2);
            ctx.fill();
        } else if (type === 1) {
            // Type 1: 6-Point Star (More complex)
            ctx.beginPath();
            ctx.ellipse(cx, cy, 2, 40, 0, 0, Math.PI * 2); // Vertical
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(cx, cy, 40, 2, 0, 0, Math.PI * 2); // Horizontal
            ctx.fill();
            
            // Diagonals (smaller)
            ctx.beginPath();
            ctx.ellipse(cx, cy, 2, 25, Math.PI/4, 0, Math.PI * 2); 
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(cx, cy, 2, 25, -Math.PI/4, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Type 2: Simple Round Star (Distant/Small)
            ctx.beginPath();
            ctx.arc(cx, cy, 6, 0, Math.PI * 2);
            ctx.fill();
        }

        // Core for all
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;
        return texture;
    }

    // Create 3 layers of stars with different shapes
    const starTypes = 3;
    const particlesPerType = Math.floor(parameters.count / starTypes);

    for(let t = 0; t < starTypes; t++) {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particlesPerType * 3);
        const colors = new Float32Array(particlesPerType * 3);
        
        const colorInside = new THREE.Color(parameters.insideColor);
        const colorOutside = new THREE.Color(parameters.outsideColor);

        for(let i = 0; i < particlesPerType; i++) {
            const i3 = i * 3;
            const radius = Math.pow(Math.random() * parameters.randomness, Math.random() * parameters.radius);
            const spinAngle = radius * parameters.spin;
            const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
            
            const negPos = [1,-1];
            const randomX = Math.pow(Math.random(), parameters.randomnessPower) * negPos[Math.floor(Math.random() * negPos.length)];
            const randomY = Math.pow(Math.random(), parameters.randomnessPower) * negPos[Math.floor(Math.random() * negPos.length)];
            const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * negPos[Math.floor(Math.random() * negPos.length)];

            positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
            positions[i3+1] = randomY;
            positions[i3+2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

            const mixedColor = colorInside.clone();
            mixedColor.lerp(colorOutside, Math.random() * radius / parameters.radius);

            colors[i3] = mixedColor.r;
            colors[i3+1] = mixedColor.g;
            colors[i3+2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: parameters.size * (t === 2 ? 1.5 : 2), // Adjust size: simple stars slightly smaller
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true,
            map: getStarTexture(t),
            transparent: true,
            alphaMap: getStarTexture(t)
        });

        const points = new THREE.Points(geometry, material);
        scene.add(points);
        
        // Save to arrays
        geometries.push(geometry);
        materials.push(material);
        galaxyPoints.push(points);
    }
}
generateGalaxy();

/**
 * Test cube
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new 
THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enableZoom = false; // Disable native zoom so page scroll drives the camera distance
// Wait, if they want "OrbitControl" they usually want interaction. 
// "match with the site" -> The site is a scroll experience.
// Let's enable AutoRotate but keep Zoom/Pan optional or default. 
// User previously removed "controls.autoRotate = true". I will put it back.
controls.autoRotate = true;
controls.autoRotateSpeed = 0.01;

/**
 * Renderer - Optimized for performance
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    powerPreference: "high-performance",
    antialias: !isMobile, // Disable antialiasing on mobile for better performance
    alpha: false // Opaque background is faster
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Additional optimizations
if (qualityLevel === 'low') {
    renderer.setPixelRatio(1); // Force 1x pixel ratio on low-end devices
}

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // 3. Scroll-Driven Zoom
    // Map scroll range (0 to 1200px approx) to camera distance (5 to 2.5)
    // As we scroll down (ratio increases), we zoom in (distance decreases)
    
    // Smooth scroll ratio is already calculated as window.currentScrollRatio (0 to 0.8)
    // We can use that or calculate a dedicated zoom ratio
    
    const maxZoomScroll = window.innerHeight * 2;
    const zoomRatio = Math.min(scrollY / maxZoomScroll, 1);
    
    // Distance moves from 5 (far) to 2 (close)
    const startDist = 4;
    const endDist = 2;
    const camDist = startDist - (zoomRatio * (startDist - endDist));

    // Camera Orbit 
    camera.position.x = Math.cos(elapsedTime * 0.05) * camDist;
    camera.position.z = Math.sin(elapsedTime * 0.05) * camDist;
    camera.lookAt(0, 0, 0);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


