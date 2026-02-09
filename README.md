# Trilight WordPress Integration Guide

This guide outlines the steps to integrate the static `wp.html` template into a WordPress theme.

## 1. Enqueue Assets in `functions.php`

Add the following code to your theme's `functions.php` to load all necessary fonts, icons, and frameworks.

```php
function trilight_enqueue_assets() {
    // 1. Google Fonts (Playfair Display, Montserrat, Manrope, Inter)
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Manrope:wght@300;400;500;600&family=Montserrat:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap', array(), null);

    // 2. Font Awesome
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css', array(), '6.0.0');

    // 3. Tailwind CSS (CDN)
    // Note: For production, it is highly recommended to compile Tailwind locally instead of using the CDN.
    wp_enqueue_script('tailwindcss', 'https://cdn.tailwindcss.com', array(), null, false);

    // 4. Lucide Icons
    wp_enqueue_script('lucide-icons', 'https://unpkg.com/lucide@latest', array(), null, true);

    // 5. Vimeo Player API (for Testimonials)
    wp_enqueue_script('vimeo-player', 'https://player.vimeo.com/api/player.js', array(), null, true);

    // 6. Main Theme Stylesheet
    wp_enqueue_style('trilight-style', get_stylesheet_uri());

    // 7. Tailwind Config (Inline)
    $tailwind_config = "
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        silver: '#e2e8f0', 
                        accent: '#94a3b8', 
                        navy: '#020617', 
                        dark: '#030712', 
                        surface: '#0f172a',
                        contrast: '#f8fafc',
                        muted: '#94a3b8',
                        gold: '#C5A47E',
                    },
                    fontFamily: {
                        serif: ['Playfair Display', 'serif'],
                        sans: ['Montserrat', 'sans-serif'],
                        inter: ['Inter', 'sans-serif'],
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards',
                        'spin-slow': 'spin 8s linear infinite',
                        'spin-revolve': 'spin 4s linear infinite',
                        'pulse-glow': 'pulseGlow 2s infinite',
                        'marquee': 'marquee 80s linear infinite',
                    }
                }
            }
        }
    ";
    wp_add_inline_script('tailwindcss', $tailwind_config);
}
add_action('wp_enqueue_scripts', 'trilight_enqueue_assets');
```

## 2. Handling Inline Scripts

The `wp.html` file contains several inline scripts that manage animations and interactivity. For a clean WordPress structure, move these into separate JS files in your theme folder (e.g., `assets/js/`) and enqueue them.

### Recommended File Structure
- `assets/js/starfield.js` (Starfield canvas logic)
- `assets/js/animations.js` (Reveal on scroll, timeline, and general animations)
- `assets/js/velocity-form.js` (Velocity inquiry form logic)
- `assets/js/journal.js` (Journal section logic)

**Enqueue Example:**
```php
wp_enqueue_script('trilight-starfield', get_template_directory_uri() . '/assets/js/starfield.js', array(), '1.0', true);
wp_enqueue_script('trilight-animations', get_template_directory_uri() . '/assets/js/animations.js', array(), '1.0', true);
```

## 3. Image Paths

All static image references in `wp.html` pointing to `/wp-content/themes/trilight/Assests/` must be updated to use the WordPress function `get_template_directory_uri()`.

**Static HTML:**
```html
<img src="/wp-content/themes/trilight/Assests/Trilight.png" ...>
```

**WordPress PHP:**
```php
<img src="<?php echo get_template_directory_uri(); ?>/Assests/Trilight.png" ...>
```

## 4. Header & Footer

Split the `wp.html` content:
- **`header.php`**: Everything from `<!DOCTYPE html>` down to the opening `<body>` tag and the main navigation/header.
- **`footer.php`**: The `<footer>` section and closing `</body>` `</html>` tags.
- **`index.php` / `front-page.php`**: The main content sections (Projects, Journal, Timeline, etc.).

Ensure `<?php wp_head(); ?>` is in `header.php` before `</head>` and `<?php wp_footer(); ?>` is in `footer.php` before `</body>`.
