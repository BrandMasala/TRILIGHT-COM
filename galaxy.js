// import './style.css'
import * as THREE from "https://cdn.skypack.dev/three@0.132.2";



// import { Geometry, TetrahedronGeometry } from 'three'

/**
 * Base
 */
// Debug

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Big Bang Universe
const parameters = {}
parameters.count = 90000;
parameters.size = 0.039; // Bigger stars
parameters.radius = 0.5;   // Wider initial spread
parameters.colors = [
    new THREE.Color('#1b3984'), // Deep Royal Blue
    new THREE.Color('#00bfff'), // Bright Blue
    new THREE.Color('#ff66b2'), // Soft Pink
    new THREE.Color('#4b0082'), // Deep Indigo
    new THREE.Color('#ffddcc')  // Warm White
];
// ... (rest of file until tick) ...



let material = null; 
let geometry = null; 
let points = null; 
let linesMesh = null; // Global reference
let galaxyGroups = []; 

const getTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    // Core: Super bright white
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    // Mid: Sustained brightness
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    // Outer: Brighter glow
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
} 

const generateMiniGalaxy = (position, scale) => {
    const count = 2000;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const inside = new THREE.Color('#ffddcc');
    const outside = new THREE.Color('#1b3984');

    for(let i=0; i<count; i++){
        const i3 = i*3;
        const r = Math.random() * 2; 
        const spin = r * 5;
        const branch = ((i % 3)/3) * Math.PI * 2;
        
        const randomX = (Math.random() - 0.5) * 0.5;
        const randomY = (Math.random() - 0.5) * 0.5;
        const randomZ = (Math.random() - 0.5) * 0.5;

        pos[i3] = Math.cos(branch + spin) * r + randomX;
        pos[i3+1] = randomY * (r<0.5 ? 2 : 0.5); 
        pos[i3+2] = Math.sin(branch + spin) * r + randomZ;

        const mixed = inside.clone();
        mixed.lerp(outside, r/2);
        
        col[i3] = mixed.r;
        col[i3+1] = mixed.g;
        col[i3+2] = mixed.b;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
    
    const mat = new THREE.PointsMaterial({
        size: parameters.size * scale,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        map: getTexture(),
        transparent: true
    });

    const mesh = new THREE.Points(geo, mat);
    mesh.position.set(position.x, position.y, position.z);
    mesh.rotation.x = Math.random() * Math.PI;
    mesh.rotation.y = Math.random() * Math.PI;
    mesh.scale.set(scale, scale, scale);
    
    scene.add(mesh);
    galaxyGroups.push(mesh);
}

const generateBigBang = () => {
    if(points !== null){
        geometry.dispose();
        material.dispose();
        scene.remove(points);
    }
    
    // --- 1. The Blast (Spherical) ---
    geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(parameters.count * 3);
    const colors = new Float32Array(parameters.count * 3);

    for(let i=0; i<parameters.count; i++){
        const i3 = i*3;
        
        // Chaotic Direction (Random Vector)
        const randomX = (Math.random() - 0.5) * 2;
        const randomY = (Math.random() - 0.5) * 2;
        const randomZ = (Math.random() - 0.5) * 2;
        const direction = new THREE.Vector3(randomX, randomY, randomZ).normalize();
        
        // Chaotic Distance: Concentrate mass in core, fling outliers
        let r = Math.random();
        r = Math.pow(r, 3) * parameters.radius; // Power 3 to keep 80% stars close to center
        
        // Add "Jets" / Spikes (15% of particles go SUPER far to make rough edges)
        if(Math.random() < 0.15) r *= (3.0 + Math.random() * 5.0); 
        
        // Apply position with irregularity (Flatten Y slightly for 'disk-ish' explosion look)
        positions[i3] = direction.x * r;
        positions[i3+1] = direction.y * r * 0.7; // Flatten height slightly
        positions[i3+2] = direction.z * r;

        const color = parameters.colors[Math.floor(Math.random() * parameters.colors.length)];
        colors[i3] = color.r;
        colors[i3+1] = color.g;
        colors[i3+2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        map: getTexture(),
        transparent: true,
        alphaMap: getTexture() 
    });

    points = new THREE.Points(geometry, material);
    // Align with 'i' in Horizons
    points.position.set(-0.110, -0.1, 0.027);
    scene.add(points);

    // --- 2. Mini Galaxies ---
    // Add a few distant ones
    generateMiniGalaxy({x: 4, y: 2, z: -3}, 0.2);
    generateMiniGalaxy({x: -4, y: -2, z: -2}, 0.3);
    generateMiniGalaxy({x: 2, y: 4, z: 2}, 0.25);
    generateMiniGalaxy({x: -3, y: 3, z: 4}, 0.2);

    // --- 3. Constellations Lines ---
    const linesGeo = new THREE.BufferGeometry();
    const linePos = [];
    // Try to connect some random points
    for(let i=0; i<300; i++) {
        // Pick a random star
        const idx1 = Math.floor(Math.random() * parameters.count);
        // Look for neighbors (simplified check of random samples)
        for(let j=0; j<10; j++) { 
             const idx2 = Math.floor(Math.random() * parameters.count);
             if(idx1 === idx2) continue;
             
             const p1 = new THREE.Vector3(positions[idx1*3], positions[idx1*3+1], positions[idx1*3+2]);
             const p2 = new THREE.Vector3(positions[idx2*3], positions[idx2*3+1], positions[idx2*3+2]);
             
             if(p1.distanceTo(p2) < 0.8) { 
                 linePos.push(p1.x, p1.y, p1.z);
                 linePos.push(p2.x, p2.y, p2.z);
             }
        }
    }
    
    if(linePos.length > 0) {
        linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
        const linesMat = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.08
        });
        linesMesh = new THREE.LineSegments(linesGeo, linesMat);
        // Align lines with the points
        linesMesh.position.set(-0.3, -1.2, 0);
        
    }
}

generateBigBang();

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
THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
scene.add(camera)

// Controls


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true // Added alpha true just in case
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // --- Scroll Logic ---
    const scrollY = window.scrollY;
    // Map animation to the first 1.5 screens of scrolling
    const maxScroll = window.innerHeight * 1.2; 
    let targetRatio = scrollY / maxScroll;
    targetRatio = Math.min(Math.max(targetRatio, 0), 0.8); 
    
    // Smooth the ratio using Linear Interpolation (Lerp) to prevent jitter
    // If currentRatio doesn't exist yet, init it
    if(typeof window.currentScrollRatio === 'undefined') window.currentScrollRatio = 0;
    
    // Lerp factor (0.1 = smooth, 1.0 = instant)
    window.currentScrollRatio += (targetRatio - window.currentScrollRatio) * 0.1;
    
    // Use the smoothed ratio for animation
    const ratio = window.currentScrollRatio;

    // 1. Galaxy Expansion (Scroll Controlled)
    if(points) {
        // Start as Singularity (0.1) -> Explode to Universe (60.0)
        const baseScale = 0.1 + (ratio * 60.0); 
        points.scale.set(baseScale, baseScale, baseScale);
        
        // Reduce Particles on Scroll (90000 -> 40000)
        // Ratio goes from 0 to 0.8 (as per user clamp)
        // Normalize ratio to 0-1 range relative to the 0.8 cap
        const normalizedRatio = Math.min(ratio / 0.9, 1.0);
        
        // Calculate current count: Lerp from Max to Min
        const minParticles = 40000;
        const currentCount = Math.floor(parameters.count - (normalizedRatio * (parameters.count - minParticles)));
        
        if(geometry) {
            geometry.setDrawRange(0, currentCount);
        }
        
        // Steady rotation
        points.rotation.y = elapsedTime * 0.05; 
        
        // Sync Constellation Lines
        if(linesMesh) {
            linesMesh.scale.set(baseScale, baseScale, baseScale);
            linesMesh.rotation.y = points.rotation.y;
            linesMesh.position.copy(points.position); 
        }
    }

    // 2. Mini Galaxies Appearance
    galaxyGroups.forEach((g, i) => {
        g.rotation.y += 0.001 * (i + 1);
        
        // Intro + Scroll visibility
        // Start invisible until intro is partly done? Or just rely on scroll?
        // Let's keep them hidden until scroll to keep focus on the text/core during intro.
        
        const appearThreshold = 0.05;
        let pRatio = (ratio - appearThreshold);
        pRatio = Math.max(0, pRatio); 
        
        const finalScale = 2.0; 
        const scale = Math.min(pRatio * 2.5, 1) * finalScale;
        
        g.scale.set(scale, scale, scale);
    });

    // Camera Orbit 
    // Stay relatively close (4) to feel the size of the blast passing you
    const camDist = 5;
    camera.position.x = Math.cos(elapsedTime * 0.1) * camDist;
    camera.position.z = Math.sin(elapsedTime * 0.1) * camDist;
    camera.lookAt(0, 0, 0);

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
