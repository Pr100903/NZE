# NZ Essentials - Hostinger VPS Deployment Guide

## 📋 Prerequisites
- Hostinger VPS with Ubuntu 22.04 or later
- SSH access to your VPS
- Domain pointed to VPS (or use VPS IP)
- Email account: naveen@nzessentials.co.nz configured in Hostinger

---

## 🚀 Step 1: Connect to Your VPS

```bash
ssh root@your-vps-ip
```

---

## 🔧 Step 2: Install Node.js and Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
apt install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v   # Should show 10.x.x

# Install required system packages for Puppeteer
apt install -y \
  libx11-xcb1 \
  libxcomposite1 \
  libxcursor1 \
  libxdamage1 \
  libxi6 \
  libxtst6 \
  libnss3 \
  libcups2 \
  libxss1 \
  libxrandr2 \
  libasound2 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libpangocairo-1.0-0 \
  libgtk-3-0 \
  fonts-liberation \
  libgbm1 \
  wget \
  ca-certificates \
  --no-install-recommends

# Install PM2 globally (process manager)
npm install -g pm2
```

---

## 📁 Step 3: Upload Your Backend Files

### Option A: Using Git (Recommended)
```bash
# Create app directory
mkdir -p /var/www/nze-backend
cd /var/www/nze-backend

# Clone your repository
git clone https://github.com/Pr100903/NZE.git .

# Navigate to backend folder
cd backend
```

### Option B: Using SFTP
Upload the `backend` folder contents to `/var/www/nze-backend/` using FileZilla or similar SFTP client.

---

## ⚙️ Step 4: Configure Environment Variables

```bash
cd /var/www/nze-backend/backend

# Create .env file
nano .env
```

Add these lines (press Ctrl+O to save, Ctrl+X to exit):
```env
PORT=3000
FRONTEND_URL=https://indigo-coyote-536695.hostingersite.com
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
EMAIL_USER=naveen@nzessentials.co.nz
EMAIL_PASSWORD=YOUR_ACTUAL_EMAIL_PASSWORD
ADMIN_EMAIL=yadav.vipin95@outlook.com
```

⚠️ **Important:** Replace `YOUR_ACTUAL_EMAIL_PASSWORD` with the actual password for naveen@nzessentials.co.nz

---

## 📦 Step 5: Install Node Dependencies

```bash
cd /var/www/nze-backend/backend

# Install dependencies
npm install

# This will also install Puppeteer and download Chromium
```

---

## 🔄 Step 6: Copy format.html Template

Make sure `format.html` is in the root of your project (one level above backend):
```bash
# If using git clone, it should already be there
ls /var/www/nze-backend/format.html
```

---

## 🚀 Step 7: Start the Server with PM2

```bash
cd /var/www/nze-backend/backend

# Start the server
pm2 start server.js --name "nze-backend"

# Save PM2 configuration
pm2 save

# Enable PM2 to start on boot
pm2 startup

# Run the command it outputs (looks like: sudo env PATH=... pm2 startup ...)
```

### Useful PM2 Commands:
```bash
pm2 status         # Check server status
pm2 logs nze-backend   # View logs
pm2 restart nze-backend  # Restart server
pm2 stop nze-backend     # Stop server
```

---

## 🌐 Step 8: Configure Nginx (Reverse Proxy)

```bash
# Install Nginx
apt install nginx -y

# Create site configuration
nano /etc/nginx/sites-available/nze-backend
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name api.nzessentials.co.nz;  # Or your VPS IP

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Increase timeout for PDF generation
        proxy_read_timeout 120s;
        proxy_connect_timeout 120s;
    }
}
```

Enable the site:
```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/nze-backend /etc/nginx/sites-enabled/

# Test Nginx configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

---

## 🔒 Step 9: Enable HTTPS with Let's Encrypt (Optional but Recommended)

```bash
# Install Certbot
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
certbot --nginx -d api.nzessentials.co.nz

# Follow the prompts
```

---

## 🔥 Step 10: Configure Firewall

```bash
# Allow required ports
ufw allow 22/tcp   # SSH
ufw allow 80/tcp   # HTTP
ufw allow 443/tcp  # HTTPS

# Enable firewall
ufw enable
```

---

## ✅ Step 11: Test Your Setup

### Check if server is running:
```bash
pm2 status
curl http://localhost:3000/api/health
```

### Test from external (replace with your domain/IP):
```bash
curl https://api.nzessentials.co.nz/api/health
# or
curl http://YOUR_VPS_IP:3000/api/health
```

Expected response:
```json
{"status":"Server is running","timestamp":"2024-..."}
```

---

## 🔧 Frontend Configuration

Update your frontend to use the backend API URL.

Edit `frontend/src/components/ContactForm.jsx` and similar files to use:
```javascript
const API_URL = 'https://api.nzessentials.co.nz';
// or
const API_URL = 'http://YOUR_VPS_IP:3000';
```

---

## 📊 Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/submit-form` | POST | LOA Form (Join Us page) - Sends PDF to both user and admin |
| `/api/contact` | POST | Contact Form - Sends email to admin only |
| `/api/health` | GET | Health check |

---

## 🐛 Troubleshooting

### Check logs:
```bash
pm2 logs nze-backend
```

### Email not sending:
1. Verify email credentials in `.env`
2. Check Hostinger email settings
3. Test SMTP connection:
```bash
npm install -g email-tester
email-tester -h smtp.hostinger.com -p 465 -s -u naveen@nzessentials.co.nz -P YOUR_PASSWORD
```

### Puppeteer/PDF issues:
```bash
# Reinstall Puppeteer dependencies
apt install -y chromium-browser
npm rebuild puppeteer
```

### Permission issues:
```bash
chown -R www-data:www-data /var/www/nze-backend
chmod -R 755 /var/www/nze-backend
```

---

## 📞 Support

For issues with:
- **VPS/Server**: Contact Hostinger support
- **Email delivery**: Check spam folders, verify SPF/DKIM records
- **Backend bugs**: Check PM2 logs

---

## 🔄 Updating the Backend

```bash
cd /var/www/nze-backend

# Pull latest changes (if using git)
git pull origin main

# Reinstall dependencies
cd backend
npm install

# Restart server
pm2 restart nze-backend
```
