# Hostinger Deployment Guide for NZ Essentials

## Build & Deploy Process

### 1. Build the Production Version
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Upload to Hostinger

#### Option A: Using File Manager (cPanel)
1. Log in to your Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html/` (or your domain's root folder)
4. **Delete** all existing files in the folder (if any)
5. Upload all files from the `dist/` folder:
   - `index.html`
   - `assets/` folder
   - `.htaccess` file (important!)
   - Any other generated files

#### Option B: Using FTP
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your Hostinger account:
   - Host: Your domain or server IP
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (or 22 for SFTP)
3. Navigate to `public_html/`
4. Upload all files from `dist/` folder

### 3. Verify .htaccess File

**CRITICAL:** Make sure the `.htaccess` file is uploaded to your server root.

The `.htaccess` file is located in `public/` folder and will be automatically copied to `dist/` during build.

**What it does:**
- Redirects all routes to `index.html` (enables React Router)
- Enables clean URLs (no `#` in URLs)
- Adds compression for faster loading
- Sets cache headers for better performance
- Forces HTTPS (optional, can be enabled)

### 4. Configure Domain (if needed)

If you're using a subdomain or custom domain:
1. Update the `base` property in `vite.config.js` if deploying to a subdirectory
2. Rebuild: `npm run build`

Example for subdomain:
```javascript
// vite.config.js
export default defineConfig({
  base: '/subdirectory/', // if deploying to example.com/subdirectory/
  // ... rest of config
});
```

### 5. Test Your Deployment

After uploading, test these URLs directly:
- `https://yourdomain.com/` - Homepage
- `https://yourdomain.com/about` - About page
- `https://yourdomain.com/contact` - Contact page
- `https://yourdomain.com/services` - Services page

**All routes should work without 404 errors when refreshed.**

### 6. Enable HTTPS (Recommended)

1. In Hostinger cPanel, go to **SSL/TLS Status**
2. Enable SSL for your domain (usually free with Let's Encrypt)
3. Uncomment the HTTPS redirect lines in `.htaccess`:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## Troubleshooting

### Problem: Getting 404 errors on routes
**Solution:** Make sure `.htaccess` file is uploaded and Apache `mod_rewrite` is enabled (it usually is on Hostinger).

### Problem: CSS/Images not loading
**Solution:** 
- Check file paths in browser console
- Verify `assets/` folder uploaded correctly
- Clear browser cache

### Problem: Routes work but API calls fail
**Solution:** 
- Update API endpoints in your code to use production backend URL
- Check CORS settings on your backend

### Problem: Blank page after deployment
**Solution:**
- Check browser console for errors
- Verify `index.html` is in the root of `public_html/`
- Make sure all asset files uploaded correctly

## Quick Deployment Checklist

- [ ] Run `npm run build`
- [ ] Delete old files from `public_html/`
- [ ] Upload all files from `dist/` folder
- [ ] Verify `.htaccess` is present
- [ ] Test all routes (including direct URL access)
- [ ] Enable SSL/HTTPS
- [ ] Test contact form with production backend
- [ ] Check mobile responsiveness
- [ ] Run Lighthouse audit for performance

## Performance Tips

1. **Enable HTTP/2** (usually enabled by default on Hostinger)
2. **Use a CDN** for global distribution (optional)
3. **Monitor performance** with Google PageSpeed Insights
4. **Set up caching** through Hostinger cPanel
5. **Compress images** before deployment (already optimized in build)

## Contact Form Backend

Make sure to:
1. Update the API endpoint in `ContactPage.jsx` from `localhost:3000` to your production backend URL
2. Configure CORS on your backend to allow requests from your domain
3. Test form submission after deployment

## Notes

- Build size: ~180-200 KB (gzipped)
- First load: <3 seconds on 3G
- All routes use clean URLs (no `#`)
- Optimized for Hostinger's Apache servers
- Browser support: All modern browsers (ES2020+)

---

**Need help?** Check Hostinger's documentation or contact their support team.
