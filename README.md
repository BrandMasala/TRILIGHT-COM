# The Trilight - Ultra-Premium Real Estate Website

Welcome to the repository for **The Trilight** website. This project is a high-end, immersive web experience designed to showcase an ultra-premium residential destination in Hyderabad, featuring properties like the Trilight Residences and Rise with 9.

## 🌟 Project Overview

The website is crafted to deliver a visually stunning, high-performance user experience. It reflects the luxury and architectural brilliance of the properties it represents through elegant design, cinematic animations, and interactive 3D elements.

## 🚀 Technologies Used

* **HTML5 & CSS3:** Semantic structure with modern styling.
* **Tailwind CSS:** Utility-first CSS framework for rapid UI development and responsive design.
* **Vanilla JavaScript:** For robust DOM manipulation and performance-optimized scroll events.
* **Three.js:** Powers the interactive, scroll-driven 3D galaxy background.
* **Lucide & FontAwesome:** For sleek, scalable iconography.

## ✨ Key Features

* **3D Galaxy Experience:** An interactive, WebGL-powered particle background built with Three.js that responds to user scrolling.
* **Architectural Navigation:** A unique, corner-based UI with a full-screen, highly animated overlay menu.
* **Scroll-Driven Animations:** Cinematic reveal effects, parallax scrolling, and dynamic "constellation" timelines that track progress.
* **High-End Aesthetics:** Carefully curated HSL color palettes, custom gemstone cursors, and premium typography (Playfair Display, Montserrat, Inter).
* **Performance Optimized:** Features lazy-loaded media, smooth scrolling, and GPU-accelerated rendering to ensure a fluid experience even with complex visual effects.
* **Mobile Responsive:** Carefully adapted layouts to ensure the luxury feel translates perfectly to smaller screens.

## 📁 Project Structure

```text
TRILIGHT-COM/
├── index.html              # Main landing page containing the core structure and content
├── css/
│   └── style.css           # Custom CSS variables, keyframe animations, and overrides
├── js/
│   ├── galaxy.js           # Three.js configuration for the hero background
│   ├── lazy-load.js        # Intersection Observers for media assets
│   └── performance-optimizer.js # Scripts to handle frame rates and GPU acceleration
├── Assests/                # Directory containing all high-resolution images, videos, and icons
└── README.md               # Project documentation
```

## 🛠️ How to Run Locally

Since this project relies on vanilla web technologies, running it locally is extremely straightforward:

1. Clone or download the repository to your local machine.
2. Open the project folder in your preferred code editor (e.g., VS Code).
3. Serve the project using a local web server to ensure `canvas` elements and CORS policies work correctly. 
   * If using **VS Code**, install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, right-click `index.html`, and select "Open with Live Server".
   * Alternatively, use Python: `python3 -m http.server 8000` and visit `http://localhost:8000`.

## 🔄 Recent Updates & Enhancements

* **Mobile Optimization:** Refined layouts to prevent clumsiness and enhance touch interactions on mobile devices.
* **Smooth Scrolling:** Implemented native smooth scrolling behavior for seamless in-page navigation.
* **USP Refinements:** Updated statistics and copy to better highlight Trilight's luxury homes and exclusive clubhouses.
* **Color Palette Synchronization:** Harmonized precise HSL color codes (including the signature gold palette) across UI components.
* **Custom Cursor:** Enhanced the custom emerald cursor with realistic gradients and lighting effects.

---

*Designed and developed to redefine the skyline, both in architecture and digital experiences.*