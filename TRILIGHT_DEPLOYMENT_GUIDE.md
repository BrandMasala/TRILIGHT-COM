# The Trilight — Static HTML Deployment Guide

> How to deploy a custom static HTML/CSS/JS site on a WordPress-based cPanel hosting environment.

---

## Overview

The Trilight website runs as a **static HTML site** hosted inside a WordPress theme folder on cPanel shared hosting. WordPress is kept installed (for historical reasons / admin access) but the frontend is fully custom — no WordPress templates, no page builder.

**Tech stack:**
- Hosting: cPanel (GoDaddy / Secureserver)
- Server: Apache with LiteSpeed Cache
- Frontend: Pure HTML + Tailwind CSS (CDN) + Vanilla JS
- WordPress: Present but bypassed for the frontend

---

## Folder Structure on Server

```
public_html/
├── .htaccess               ← Controls routing (critical)
├── index.php               ← WordPress root (do not delete)
├── wp-admin/
├── wp-content/
│   └── themes/
│       └── trilight/       ← Your site lives here
│           ├── index.html  ← Main site file
│           ├── index.php   ← Bridges WordPress → HTML
│           ├── functions.php
│           ├── style.css   ← Must have theme header comment
│           ├── css/
│           │   └── style.css
│           ├── js/
│           │   ├── app.js
│           │   ├── galaxy.js
│           │   └── lazy-load.js
│           └── Assests/    ← Images folder (note spelling)
│               └── *.png, *.jpg, *.webp
```

---

## Critical Files Explained

### 1. `trilight/index.php`
Bridges WordPress to your static HTML. WordPress loads this file when the theme is active.

```php
<?php
readfile(__DIR__ . '/index.html');
```

### 2. `trilight/style.css` (top of file)
WordPress needs this comment to recognize the folder as a valid theme:

```css
/*
Theme Name: Trilight
*/

/* rest of your CSS below */
```

### 3. `trilight/functions.php`
Required by WordPress to fully register the theme. Can be empty:

```php
<?php
// blank
```

### 4. `public_html/.htaccess` (root)
This is the most important file. It routes the domain root directly to your HTML file, bypassing WordPress's default routing:

```apache
# BEGIN LSCACHE
# END LSCACHE
# BEGIN NON_LSCACHE
# END NON_LSCACHE

# Block the include-only files.
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^wp-admin/includes/ - [F,L]
RewriteRule !^wp-includes/ - [S=3]
RewriteRule ^wp-includes/[^/]+\.php$ - [F,L]
RewriteRule ^wp-includes/js/tinymce/langs/.+\.php - [F,L]
RewriteRule ^wp-includes/theme-compat/ - [F,L]
</IfModule>

<Files wp-config.php>
<IfModule !mod_authz_core.c>
order allow,deny
deny from all
</IfModule>
<IfModule mod_authz_core.c>
require all denied
</IfModule>
</Files>

# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
RewriteBase /
# ↓ THIS LINE IS THE KEY — routes root domain to your HTML file
RewriteRule ^$ /wp-content/themes/trilight/index.html [L]
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteCond %{HTTP:X-Forwarded-SSL} !on
RewriteCond %{HTTP_HOST} ^thetrilight\.com$ [OR]
RewriteCond %{HTTP_HOST} ^www\.thetrilight\.com$
RewriteRule ^(.*)$ "https\:\/\/thetrilight\.com\/$1" [R=301,L]
```

---

## Asset Paths in HTML

All paths must be **absolute from the domain root**:

```html
<!-- CSS -->
<link href="/wp-content/themes/trilight/css/style.css" rel="stylesheet" />

<!-- JS -->
<script src="/wp-content/themes/trilight/js/app.js" defer></script>
<script src="/wp-content/themes/trilight/js/galaxy.js" defer></script>
<script src="/wp-content/themes/trilight/js/lazy-load.js" defer></script>

<!-- Images -->
<img src="/wp-content/themes/trilight/Assests/Trilight.png" />
```

**Never use double paths like:**
```html
<!-- WRONG — causes 404 -->
<img src="/wp-content/themes/trilight//wp-content/themes/trilight/Assests/Trilight.png" />
```

---

## File Permissions

Linux servers are case-sensitive and permission-dependent. Wrong permissions = 404 even if the file exists.

| Type | Permission |
|------|-----------|
| Folders | `0755` |
| Files (.html, .css, .js, images) | `0644` |
| PHP files | `0644` |

**How to fix in cPanel File Manager:**
1. Select the folder (`css`, `js`, `Assests`)
2. Click **Permissions**
3. Set to `0755`
4. Go inside the folder, select all files
5. Set files to `0644`

**Common mistake:** Changing the folder permissions but not the files inside. Always do both.

Mac-created zip files can strip permissions on Linux. After uploading and extracting a zip from a Mac, always verify and reset permissions.

---

## WordPress Settings

1. **Appearance → Themes** — ensure `trilight` is the active theme
2. **Settings → Reading** — set to **Your latest posts** (not a static page)
3. If using **LiteSpeed Cache** — go to LiteSpeed Cache → **Purge All** after any changes

---

## Deployment Steps (Fresh Upload)

1. Zip your local `trilight/` folder (not from Mac Finder — use terminal: `zip -r trilight.zip trilight/`)
2. Upload zip to `public_html/wp-content/themes/` via cPanel File Manager
3. Extract in place
4. Set permissions:
   - `trilight/` folder → `0755`
   - All subfolders → `0755`
   - All files → `0644`
5. In WordPress admin → Appearance → Themes → Activate `trilight`
6. In WordPress admin → Settings → Reading → Your latest posts → Save
7. Edit `public_html/.htaccess` — add the `RewriteRule ^$ /wp-content/themes/trilight/index.html [L]` line inside the WordPress block
8. Purge LiteSpeed Cache
9. Hard refresh browser: `Cmd + Shift + R`

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| CSS/JS not loading | File permissions `0700` | Set files to `0644` |
| Site shows old WordPress page | `.htaccess` missing rewrite rule | Add `RewriteRule ^$ /wp-content/themes/trilight/index.html [L]` |
| `index.html` loads but blank/unstyled | Asset paths wrong or permissions wrong | Check paths and set `0644` on all files |
| 404 on direct file URL | WordPress intercepting the request | Expected behaviour — access via domain root, not direct path |
| Site shows blog posts | WordPress Reading settings wrong | Settings → Reading → Your latest posts |
| Changes not showing | LiteSpeed Cache serving old version | Purge All Cache from wp-admin |
| Doubled image path in HTML | Old WordPress template tag leftover | Manually fix path to single `/wp-content/themes/trilight/Assests/` |

---

## Notes

- The `Assests` folder name has a typo (should be `Assets`) but is intentional to match existing references in code — do not rename without updating all paths in `index.html`
- The `__MACOSX` folder from zip extraction can be safely deleted from the server
- WordPress admin remains accessible at `thetrilight.com/wp-admin` — keep WordPress updated for security
- The LiteSpeed Cache plugin is active — always purge after deployments
