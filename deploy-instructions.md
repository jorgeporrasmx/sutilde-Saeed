# GoDaddy Deployment Guide for Sutilde Website

## Files to Upload to GoDaddy

### Main Website Files (Upload to public_html or www folder):
- `index.html` - Main homepage
- `blog.html` - Blog page
- `comunicacion.html` - Communication page
- `home.html` - Home page
- `styles.css` - Main stylesheet
- `layout-styles.css` - Layout styles
- `js/animations.js` - JavaScript animations
- `assets/logo.png` - Logo image
- `logo.png` - Logo (if different)

### Articles Folder:
- `articles/article1.html`
- `articles/article2.html`
- `articles/article3.html`

### Server Files (for API functionality):
- `server.py` - Python server (if using Python hosting)
- `package.json` - Node.js dependencies (if using Node.js hosting)

## Deployment Options

### Option 1: Static Hosting (Recommended for simple sites)
- Upload all HTML, CSS, JS, and image files
- Remove server.py (not needed for static hosting)
- Blog will need manual updates when adding new articles

### Option 2: Python Hosting (For dynamic blog)
- Requires GoDaddy Python hosting plan
- Upload server.py and all other files
- Configure Python environment

### Option 3: Node.js Hosting (Alternative for dynamic blog)
- Requires GoDaddy Node.js hosting plan
- Convert server.py to Node.js equivalent

## Step-by-Step Deployment

### 1. Choose Your GoDaddy Plan
- **Shared Hosting**: Good for static sites
- **Python Hosting**: For dynamic blog functionality
- **VPS/Dedicated**: More control, higher cost

### 2. Access Your Hosting Control Panel
- Log into GoDaddy account
- Go to Web Hosting → Manage
- Access cPanel or File Manager

### 3. Upload Files
- Use File Manager or FTP client
- Upload files to public_html folder
- Maintain folder structure (articles/, assets/, js/)

### 4. Configure Domain
- Point domain to hosting
- Set up SSL certificate (recommended)

### 5. Test Your Site
- Visit your domain
- Test all pages and functionality
- Check blog articles load correctly

## Important Notes

### For Static Hosting:
- Blog articles will need manual updates
- No dynamic API functionality
- Consider using a static site generator for blog

### For Dynamic Hosting:
- Ensure Python/Node.js is enabled
- Configure environment variables
- Set up proper file permissions

## Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] Images and assets display properly
- [ ] Blog articles are accessible
- [ ] Contact forms work (if any)
- [ ] SSL certificate is active
- [ ] Mobile responsiveness works
- [ ] SEO meta tags are present
- [ ] Analytics tracking is set up

## Support Resources

- GoDaddy Help Center
- GoDaddy Community Forums
- GoDaddy Support Chat/Phone

## Alternative: Static Site Generator

For easier blog management, consider converting to a static site generator like:
- Jekyll
- Hugo
- Next.js (static export)
- Gatsby

This would allow you to add new blog posts by simply adding markdown files and rebuilding the site.
