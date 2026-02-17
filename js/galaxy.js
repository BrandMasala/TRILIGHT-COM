import * as THREE from "https://cdn.skypack.dev/three@0.132.2";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Device detection
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
const count = isMobile ? 45000 : 105000;

const params = {
    size: isMobile ? 0.025 : 0.018,
    radius: 3.5,
    branches: 4,
    spin: 3,
    randomness: 7,
    randomnessPower: 4,
    insideColor: "#4e54c8",
    midColor: "#6a73ee",
    outsideColor: "#1e2c50",
};

/**
 * Interaction Systems
 */
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
let isDragging = false;
let dragRotX = 0, dragRotY = 0;
let prevMouseX = 0, prevMouseY = 0;

const onMouseMove = (e) => {
    mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    if (isDragging) {
        dragRotY += (e.clientX - prevMouseX) * 0.005;
        dragRotX += (e.clientY - prevMouseY) * 0.005;
        dragRotX = Math.max(-1, Math.min(1, dragRotX));
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
    }
};

const onMouseDown = (e) => {
    isDragging = true;
    prevMouseX = e.clientX;
    prevMouseY = e.clientY;
};

const onMouseUp = () => { isDragging = false; };

// Touch support
const onTouchMove = (e) => {
    const t = e.touches[0];
    mouse.targetX = (t.clientX / window.innerWidth - 0.5) * 2;
    mouse.targetY = (t.clientY / window.innerHeight - 0.5) * 2;
    if (isDragging) {
        dragRotY += (t.clientX - prevMouseX) * 0.005;
        dragRotX += (t.clientY - prevMouseY) * 0.005;
        dragRotX = Math.max(-1, Math.min(1, dragRotX));
        prevMouseX = t.clientX;
        prevMouseY = t.clientY;
    }
};

const onTouchStart = (e) => {
    isDragging = true;
    prevMouseX = e.touches[0].clientX;
    prevMouseY = e.touches[0].clientY;
};

const onTouchEnd = () => { isDragging = false; };

canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("touchstart", onTouchStart, { passive: true });
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("mouseup", onMouseUp);
window.addEventListener("touchmove", onTouchMove, { passive: true });
window.addEventListener("touchend", onTouchEnd);
canvas.style.pointerEvents = "auto";

/**
 * Star System
 */
const getStarTexture = (type) => {
    const c = document.createElement("canvas");
    c.width = 128; c.height = 128;
    const ctx = c.getContext("2d");
    const cx = 64, cy = 64;

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
    // Reduced opacities for lower brightness
    gradient.addColorStop(0, "rgba(255,255,255,0.6)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.15)");
    gradient.addColorStop(0.5, "rgba(255,255,255,0.03)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);

    ctx.fillStyle = "rgba(255,255,255,0.7)"; // Lower point brightness
    if (type === 0) {
        ctx.beginPath(); ctx.ellipse(cx, cy, 2, 40, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx, cy, 40, 2, 0, 0, Math.PI * 2); ctx.fill();
    } else if (type === 1) {
        ctx.beginPath(); ctx.ellipse(cx, cy, 2, 40, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx, cy, 40, 2, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx, cy, 2, 25, Math.PI / 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(cx, cy, 2, 25, -Math.PI / 4, 0, Math.PI * 2); ctx.fill();
    } else {
        ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.beginPath(); ctx.arc(cx, cy, 4, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
    
    const texture = new THREE.Texture(c);
    texture.needsUpdate = true;
    return texture;
};

// Generate galaxy
const starTypes = 3;
const perType = Math.floor(count / starTypes);
const geometries = [];
const materials = [];
const allPoints = [];
const originalPositions = [];
const disperseDirections = [];

const galaxyGroup = new THREE.Group();
scene.add(galaxyGroup);

for (let t = 0; t < starTypes; t++) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(perType * 3);
    const colors = new Float32Array(perType * 3);
    const colorInside = new THREE.Color(params.insideColor);
    const colorMid = new THREE.Color(params.midColor);
    const colorOutside = new THREE.Color(params.outsideColor);
    const directions = new Float32Array(perType * 3);

    for (let i = 0; i < perType; i++) {
        const i3 = i * 3;
        const radius = Math.pow(Math.random() * params.randomness, Math.random() * params.radius);
        const spinAngle = radius * params.spin;
        const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2;
        const sign = () => (Math.random() > 0.5 ? 1 : -1);
        const rx = Math.pow(Math.random(), params.randomnessPower) * sign();
        const ry = Math.pow(Math.random(), params.randomnessPower) * sign();
        const rz = Math.pow(Math.random(), params.randomnessPower) * sign();

        positions[i3] = Math.cos(branchAngle + spinAngle) * radius + rx;
        positions[i3 + 1] = ry;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + rz;

        // Random outward dispersion direction
        const dx = positions[i3] + (Math.random() - 0.5) * 2;
        const dy = positions[i3 + 1] + (Math.random() - 0.5) * 4;
        const dz = positions[i3 + 2] + (Math.random() - 0.5) * 2;
        const len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
        const disperseStrength = 3 + Math.random() * 5;
        directions[i3] = (dx / len) * disperseStrength;
        directions[i3 + 1] = (dy / len) * disperseStrength;
        directions[i3 + 2] = (dz / len) * disperseStrength;

        // Multi-point gradient logic
        const mixedColor = colorInside.clone();
        const ratio = radius / params.radius;
        if (ratio < 0.5) {
            mixedColor.lerp(colorMid, ratio * 2);
        } else {
            mixedColor.copy(colorMid);
            mixedColor.lerp(colorOutside, (ratio - 0.5) * 2);
        }
        
        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    originalPositions.push(new Float32Array(positions));
    disperseDirections.push(directions);

    const tex = getStarTexture(t);
    const material = new THREE.PointsMaterial({
        size: params.size * (t === 2 ? 1.5 : 2),
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        map: tex,
        transparent: true,
        alphaMap: tex,
    });

    const points = new THREE.Points(geometry, material);
    galaxyGroup.add(points);
    geometries.push(geometry);
    materials.push(material);
    allPoints.push(points);
}

/**
 * Sizes
 */
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(3, 3, 3);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas,
    powerPreference: "high-performance",
    antialias: !isMobile,
    alpha: false,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// renderer.setClearColor(0x000000, 1); // Default is opaque black

window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Animate
 */
const clock = new THREE.Clock();
let smoothDisperse = 0;

const tick = () => {
    const elapsed = clock.getElapsedTime();

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Scroll-driven dispersion
    // Map scroll range to dispersion (0 to 1)
    const heroHeight = window.innerHeight * 2.5; // Match index.html
    const disperseStart = window.innerHeight * 0.5;
    const disperseEnd = heroHeight;
    const scrollY = window.scrollY;
    
    const targetDisperse = Math.max(0, Math.min(1, (scrollY - disperseStart) / (disperseEnd - disperseStart)));
    smoothDisperse += (targetDisperse - smoothDisperse) * 0.08;

    // Apply dispersion to particle positions
    for (let t = 0; t < starTypes; t++) {
        const posAttr = geometries[t].getAttribute("position");
        const pos = posAttr.array;
        const orig = originalPositions[t];
        const dir = disperseDirections[t];

        for (let i = 0; i < pos.length; i++) {
            pos[i] = orig[i] + dir[i] * smoothDisperse;
        }
        posAttr.needsUpdate = true;

        // Fade out as they disperse
        materials[t].opacity = Math.max(0, 1 - smoothDisperse * 1.5);
    }

    // Camera: orbit + mouse influence + drag
    // Closer base distance for "larger" feel
    const baseDist = 3 - smoothDisperse * 1.5; // Changed from 4 to 3
    const camDist = Math.max(baseDist, 1.2);
    const orbitSpeed = 0.05;

    camera.position.x = Math.cos(elapsed * orbitSpeed + dragRotY) * camDist + mouse.x * 0.5;
    camera.position.z = Math.sin(elapsed * orbitSpeed + dragRotY) * camDist;
    camera.position.y = 1.2 + dragRotX * 2 - mouse.y * 0.3; // Lowered Y slightly
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
};

tick();
