# 🚀 Trilight Group - Deployment Guide

## 📋 Pre-Deployment Checklist

### ✅ Required Before Deployment
- [x] Project built successfully (`npm run build`)
- [x] All features tested locally
- [x] Git repository initialized
- [x] README.md completed
- [ ] Cloudflare account created
- [ ] Custom domain registered (optional)
- [ ] Contact email addresses configured
- [ ] Social media links updated
- [ ] Professional images/videos prepared

## 🌐 Current Status

### Development Environment
- **Local URL**: http://localhost:3000
- **Public Dev URL**: https://3000-is2m9x27x19117sqtucbf-b237eb32.sandbox.novita.ai
- **Status**: ✅ Running
- **Process Manager**: PM2
- **Build Output**: `/home/user/webapp/dist/`

## 📦 Deployment Options

### Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages provides:
- ✅ Global CDN distribution
- ✅ Automatic SSL certificates
- ✅ Unlimited bandwidth
- ✅ Edge computing capabilities
- ✅ Built-in DDoS protection
- ✅ Free tier available

#### Step 1: Setup Cloudflare API Key

```bash
# IMPORTANT: Call setup_cloudflare_api_key first
# This will guide you through the API key configuration

# Verify authentication
npx wrangler whoami
```

If authentication fails, you'll need to:
1. Go to the Deploy tab in your interface
2. Set up your Cloudflare API key
3. Return and run the setup command again

#### Step 2: Build the Project

```bash
cd /home/user/webapp

# Clean any previous builds
rm -rf dist/

# Build for production
npm run build

# Verify build output
ls -la dist/
```

#### Step 3: Create Cloudflare Pages Project

```bash
# Create the project (one-time setup)
npx wrangler pages project create trilight-group \
  --production-branch main \
  --compatibility-date 2025-10-23

# This will output:
# ✨ Successfully created the 'trilight-group' project.
```

#### Step 4: Deploy to Production

```bash
# Deploy the dist directory
npx wrangler pages deploy dist --project-name trilight-group

# You'll receive URLs like:
# ✨ Deployment complete!
# 🌎 https://trilight-group.pages.dev
# 🌎 https://main.trilight-group.pages.dev (branch deployment)
```

#### Step 5: Verify Deployment

```bash
# Test the production URL
curl https://trilight-group.pages.dev

# Check specific assets
curl https://trilight-group.pages.dev/static/styles.css
curl https://trilight-group.pages.dev/static/app.js
```

### Option 2: Custom Domain Setup

#### Add Your Domain to Cloudflare Pages

```bash
# Add custom domain (e.g., trilightgroup.com)
npx wrangler pages domain add trilightgroup.com \
  --project-name trilight-group

# Add www subdomain
npx wrangler pages domain add www.trilightgroup.com \
  --project-name trilight-group
```

#### Configure DNS

In your Cloudflare dashboard:
1. Go to DNS settings
2. Add CNAME records:
   - `trilightgroup.com` → `trilight-group.pages.dev`
   - `www.trilightgroup.com` → `trilight-group.pages.dev`
3. Enable "Proxied" status for both records

Wait 5-15 minutes for DNS propagation.

### Option 3: GitHub Integration (Continuous Deployment)

#### Setup GitHub Repository

```bash
# Initialize GitHub environment
# IMPORTANT: Call setup_github_environment first
# This configures git and gh authentication

# Add remote repository (use existing user-selected repo if available)
git remote add origin https://github.com/YOUR_USERNAME/trilight-group.git

# Push to GitHub
git push -u origin main
```

#### Connect to Cloudflare Pages

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Click "Create a project"
3. Select "Connect to Git"
4. Choose your GitHub repository
5. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
6. Click "Save and Deploy"

Now every push to `main` branch triggers automatic deployment!

## 🔧 Environment Variables & Secrets

### Local Development (.dev.vars)

Create `.dev.vars` file for local secrets:
```bash
# Never commit this file!
API_KEY=your-local-api-key
DATABASE_URL=your-local-db-url
```

### Production Secrets

Add secrets to Cloudflare Pages:

```bash
# Add API keys
npx wrangler pages secret put API_KEY --project-name trilight-group
# Enter the secret value when prompted

# Add email configuration
npx wrangler pages secret put SENDGRID_API_KEY --project-name trilight-group

# List all secrets
npx wrangler pages secret list --project-name trilight-group

# Remove a secret
npx wrangler pages secret delete API_KEY --project-name trilight-group
```

## 📊 Post-Deployment Tasks

### 1. Test Production Deployment

```bash
# Test homepage
curl https://trilight-group.pages.dev

# Test all projects
curl https://trilight-group.pages.dev#rise
curl https://trilight-group.pages.dev#trisire
curl https://trilight-group.pages.dev#kompally

# Test contact section
curl https://trilight-group.pages.dev#contact
```

### 2. Performance Testing

Visit these tools to test your deployment:
- **Lighthouse**: Chrome DevTools > Lighthouse
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **GTmetrix**: https://gtmetrix.com/
- **WebPageTest**: https://www.webpagetest.org/

Target Scores:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

### 3. SEO Setup

#### Add to Google Search Console
1. Visit https://search.google.com/search-console
2. Add property: `https://trilight-group.pages.dev`
3. Verify ownership (DNS or HTML file method)
4. Submit sitemap (if created)

#### Create robots.txt
```bash
cat > public/static/robots.txt << 'EOF'
User-agent: *
Allow: /

Sitemap: https://trilight-group.pages.dev/sitemap.xml
EOF

# Rebuild and redeploy
npm run build
npx wrangler pages deploy dist --project-name trilight-group
```

### 4. Analytics Integration

#### Google Analytics (Recommended)

Add to `src/index.tsx` before `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 5. Form Backend Setup

#### Create API Route for Contact Form

Create `src/api/contact.ts`:
```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

app.post('/contact', async (c) => {
  const data = await c.req.json()
  
  // Validate data
  if (!data.name || !data.email || !data.message) {
    return c.json({ error: 'Missing required fields' }, 400)
  }
  
  // TODO: Send email via SendGrid/Mailgun
  // TODO: Store in Cloudflare D1 database
  
  return c.json({ success: true, message: 'Thank you for contacting us!' })
})

export default app
```

Update `src/index.tsx` to include API routes:
```typescript
import contactAPI from './api/contact'

// Add API routes
app.route('/api', contactAPI)
```

## 🔄 Update & Redeploy Workflow

### Making Changes

```bash
# 1. Make your changes to code
# Edit files in src/, public/static/, etc.

# 2. Test locally
npm run build
pm2 restart trilight-group
npm run test

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Deploy to production
npm run deploy:prod

# Or if using GitHub integration, just push:
git push origin main
# Cloudflare will auto-deploy
```

### Rollback to Previous Version

```bash
# List all deployments
npx wrangler pages deployments list --project-name trilight-group

# Rollback to specific deployment
npx wrangler pages deployment rollback <DEPLOYMENT_ID> \
  --project-name trilight-group
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules/ dist/ .wrangler/
npm install
npm run build
```

### Deployment Fails

```bash
# Check wrangler authentication
npx wrangler whoami

# Re-authenticate if needed
npx wrangler login

# Try deploying with verbose logs
npx wrangler pages deploy dist --project-name trilight-group --verbose
```

### Static Files Not Loading

```bash
# Verify files exist in dist/
ls -la dist/static/

# Check file paths in HTML
# Ensure paths start with /static/ not ./static/

# Rebuild and redeploy
npm run build
npm run deploy:prod
```

### Custom Domain Not Working

```bash
# Verify DNS records in Cloudflare dashboard
# Wait up to 24 hours for DNS propagation
# Clear browser cache
# Try incognito mode
```

## 📞 Support Resources

### Cloudflare Pages
- **Dashboard**: https://dash.cloudflare.com/pages
- **Documentation**: https://developers.cloudflare.com/pages/
- **Community**: https://community.cloudflare.com/

### Wrangler CLI
- **Documentation**: https://developers.cloudflare.com/workers/wrangler/
- **GitHub**: https://github.com/cloudflare/workers-sdk

### Hono Framework
- **Documentation**: https://hono.dev/
- **GitHub**: https://github.com/honojs/hono

## 🎉 Success Checklist

After successful deployment, verify:

- [ ] Website loads at production URL
- [ ] All navigation links work
- [ ] Contact form functional
- [ ] Mobile responsive on all devices
- [ ] All images and assets load
- [ ] Google Analytics tracking (if set up)
- [ ] SSL certificate active (https://)
- [ ] Custom domain connected (if applicable)
- [ ] SEO meta tags present
- [ ] Performance score > 90
- [ ] Social media links updated
- [ ] Contact information correct

---

## 🚀 Quick Deployment Commands

```bash
# Complete deployment from scratch
cd /home/user/webapp
npm run build
npx wrangler pages project create trilight-group --production-branch main
npx wrangler pages deploy dist --project-name trilight-group

# Quick redeploy after changes
npm run deploy:prod

# Check deployment status
npx wrangler pages deployments list --project-name trilight-group
```

---

**🌟 Your Trilight Group website is ready to shine on the global stage!**
