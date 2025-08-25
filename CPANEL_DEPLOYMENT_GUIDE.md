# MW Design Studio - cPanel Deployment Guide

## 📋 Complete Guide: From GitHub to cPanel Hosting

This comprehensive guide covers **three different deployment methods** for your Astro-powered MW Design Studio website, from manual upload to automated GitHub Actions deployment.

---

## 🎯 Understanding Your Astro Project

### What You're Deploying
- **Project Type**: Astro static site generator
- **Build Output**: Static HTML, CSS, JavaScript files
- **Target Location**: cPanel shared hosting environment
- **Repository**: https://github.com/HouseOfVibes/MW-Design-Studio-Website

### Astro Build Process
When you run `npm run build`, Astro creates a `dist/` folder containing:
- Static HTML pages
- Optimized CSS and JavaScript
- Image assets and fonts
- All files needed for your website to run

---

## 🚀 METHOD 1: Manual Upload (Simplest)

### Step 1: Build Your Project Locally

```bash
# Navigate to your project directory
cd /Users/sherimcdowell/Desktop/VScode\ Projects/Websites-Creations/MW-Design-Studio-Website

# Install dependencies (if not already done)
npm install

# Build the production version
npm run build
```

**What This Does:**
- Creates a `dist/` folder in your project
- Contains all optimized files for deployment
- Ready for upload to any web server

### Step 2: Access Your cPanel

1. **Log into cPanel**
   - Go to your hosting provider's cPanel URL
   - Enter your cPanel username and password
   - Look for the "Files" section

2. **Open File Manager**
   - Click on "File Manager" icon
   - Select "Web Root (public_html)" 
   - Click "Go"

### Step 3: Prepare Upload Directory

1. **Navigate to public_html**
   - This is your website's root directory
   - Files here become visible at your domain name
   - For subdomains, navigate to the appropriate folder

2. **Clear Existing Files** (if replacing an old site)
   - Select all existing files in public_html
   - Click "Delete" to remove old content
   - Confirm deletion

### Step 4: Upload Your Website

**Option A: Individual File Upload**
1. Click "Upload" button in File Manager toolbar
2. Click "Select File" or drag-and-drop files
3. Upload ALL contents of your local `dist/` folder
4. **Important**: Upload the contents inside dist/, not the dist folder itself

**Option B: Zip Upload (Recommended)**
1. **On Your Computer**: 
   - Navigate to your project's `dist/` folder
   - Select ALL files inside dist/ (not the folder itself)
   - Create a ZIP archive named "website.zip"

2. **In cPanel File Manager**:
   - Click "Upload" button
   - Upload the website.zip file
   - After upload, right-click the zip file
   - Select "Extract" 
   - Delete the zip file after extraction

### Step 5: Set Permissions and Test

1. **Check File Structure**
   - Ensure `index.html` is in the root of public_html
   - Verify `_astro/` folder exists with CSS/JS files
   - Confirm all images are in correct directories

2. **Set Permissions** (usually automatic)
   - Files should be 644 permissions
   - Directories should be 755 permissions

3. **Test Your Website**
   - Visit your domain in a web browser
   - Check that all pages load correctly
   - Verify images, styles, and functionality work

---

## ⚡ METHOD 2: GitHub Actions Automated Deployment

### Overview
This method automatically deploys your website every time you push changes to GitHub, eliminating manual uploads.

### Prerequisites
- Your cPanel hosting supports FTP/SFTP access
- FTP account credentials from your hosting provider

### Step 1: Create FTP Account in cPanel

1. **Access FTP Accounts**
   - Login to cPanel
   - Find "FTP Accounts" in Files section
   - Click to open

2. **Create New FTP Account**
   ```
   Username: mw-deploy (or your preferred name)
   Password: [Generate a strong password]
   Directory: public_html (for main domain)
   Quota: Unlimited
   ```

3. **Note Your FTP Details**
   ```
   FTP Host: your-domain.com (or ftp.your-domain.com)
   FTP Username: mw-deploy@your-domain.com
   FTP Password: [the password you created]
   FTP Directory: /public_html
   ```

### Step 2: Add GitHub Secrets

1. **Go to Your Repository**
   - Visit: https://github.com/HouseOfVibes/MW-Design-Studio-Website
   - Click "Settings" tab
   - Click "Secrets and variables" → "Actions"

2. **Add Repository Secrets**
   Click "New repository secret" for each:
   
   ```
   FTP_HOST: your-domain.com
   FTP_USERNAME: mw-deploy@your-domain.com  
   FTP_PASSWORD: [your FTP password]
   FTP_DIR: /public_html
   ```

### Step 3: Create GitHub Action Workflow

Create this file in your repository: `.github/workflows/deploy.yml`

```yaml
name: Deploy to cPanel

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build Astro site
      run: npm run build
      
    - name: Deploy to cPanel via FTP
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.FTP_HOST }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        server-dir: ${{ secrets.FTP_DIR }}/
        local-dir: ./dist/
        exclude: |
          **/.git*
          **/.git*/**
          **/node_modules/**
```

### Step 4: Test Automated Deployment

1. **Make a Small Change**
   - Edit any file in your repository
   - Commit and push to main branch

2. **Monitor Deployment**
   - Go to GitHub → Actions tab
   - Watch the deployment process
   - Check for any errors

3. **Verify Website Update**
   - Visit your website
   - Confirm changes are live

---

## 🔧 METHOD 3: GitHub Actions + Deployment Branch (RECOMMENDED)

### Overview ⭐ **BEST APPROACH**
GitHub Actions builds your site and pushes the built files to a separate branch that cPanel can directly clone and pull from. This gives you:
- **Automated builds** on every push
- **No manual build/upload steps**
- **Full Git integration** with cPanel
- **Automatic updates** when you push changes

### How It Works
```
main branch (source code) → GitHub Actions builds → gh-pages branch (built files)
                                                              ↓
                                                    cPanel Git pulls automatically
```

### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Build and Deploy to cPanel

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout source code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build Astro site
      run: npm run build
      
    - name: Deploy to gh-pages branch
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
        publish_branch: gh-pages
        force_orphan: true
```

### Step 2: Enable GitHub Pages (Optional)
1. Go to your repository settings
2. Navigate to "Pages" section  
3. Source: "Deploy from a branch"
4. Branch: `gh-pages` / `/ (root)`
5. This creates a backup URL for testing

### Step 3: Configure cPanel Git Integration for mwdesign.agency

1. **Access Git Version Control in cPanel**
   - Login to your InMotion cPanel account
   - Find "Git Version Control" in Files section
   - Click to open

2. **Create Repository Connection for Your Domain**
   ```
   Repository URL: https://github.com/HouseOfVibes/MW-Design-Studio-Website.git
   Repository Branch: gh-pages  ← KEY: Use the deployment branch!
   Repository Path: /public_html/mwdesign.agency (or /public_html if primary domain)
   Repository Name: mw-design-studio
   ```

3. **Domain-Specific Path Setup**
   - **If mwdesign.agency is your PRIMARY domain**: Use `/public_html`
   - **If mwdesign.agency is an ADDON domain**: Use `/public_html/mwdesign.agency`
   - **If using a subdomain**: Use `/public_html/subdomain.mwdesign.agency`

4. **Initial Setup**
   - Click "Create" to clone the gh-pages branch
   - cPanel will download all built files to your domain folder
   - Visit mwdesign.agency - your website should be live immediately

### Step 4: Enable Auto-Deployment

1. **Set Up Webhook (if supported)**
   - In cPanel Git settings, look for "Pull/Deploy" tab
   - Enable automatic pulls when repository updates
   - This triggers automatic deployment on every push

2. **Manual Pull Alternative**
   - If webhooks not supported, you'll need to click "Pull" in cPanel after changes
   - Still much easier than manual file uploads

### Workflow Benefits

✅ **Push to main** → Automatic build → Built files pushed to gh-pages → cPanel pulls changes  
✅ **No manual building** required on your end  
✅ **No file uploads** through File Manager  
✅ **Full version control** of both source and deployed files  
✅ **Rollback capability** to any previous version  
✅ **Team collaboration** friendly

### Testing Your Setup

1. **Make a small change** to any file in main branch
2. **Commit and push** to GitHub
3. **Check GitHub Actions** tab - should see build process
4. **Verify gh-pages branch** updated with new built files
5. **Check cPanel Git** - pull latest changes (or automatic if webhook enabled)
6. **Visit your website** - changes should be live

---

## 🌐 Environment Variables Setup

### Required Environment Variables for Production

Your MW Design Studio website uses these environment variables:

```env
# Required for Chatbot Functionality
GEMINI_API_KEY=your_gemini_api_key_here

# Optional - for Chat Notifications  
GOOGLE_CHAT_WEBHOOK_URL=your_webhook_url_here
```

### Setting Environment Variables in cPanel

**Method 1: Through .env File**
1. Create `.env` file in your public_html directory
2. Add your variables (be careful with file permissions)
3. **Security Risk**: Environment files in public directories can be accessed via web

**Method 2: Contact Hosting Provider**
- Many shared hosts don't support custom environment variables
- Contact support to ask about Node.js environment variable support

**Method 3: Hardcode for Production** (Not Recommended)
- Replace `import.meta.env.GEMINI_API_KEY` with actual key in build
- **Major Security Risk**: API keys become visible in source code

### Environment Variable Alternatives

**Recommended Approach for Shared Hosting:**

1. **Disable Chatbot for Static Deployment**
   - Comment out chatbot functionality
   - Display static contact form instead
   - Add note: "Contact us directly at hello@mwdesignstudio.com"

2. **Use Client-Side Contact Forms**
   - Implement Formspree, Netlify Forms, or similar service
   - No server-side processing needed
   - Secure API key handling through third-party service

---

## 📁 File Structure After Deployment

Your cPanel public_html should contain:

```
public_html/
├── index.html                 # Homepage
├── about/
│   └── index.html            # About page
├── services/
│   ├── index.html            # Services overview
│   ├── brand-services/
│   ├── marketing-services/
│   └── social-media-services/
├── portfolio/
│   └── index.html            # Portfolio page
├── blog/
│   ├── index.html            # Blog index
│   └── elevate-your-digital-presence/
├── resources/
│   └── index.html            # Resources page
├── contact/
│   └── index.html            # Contact page
├── _astro/                   # Optimized CSS/JS files
├── images/                   # Image assets
└── favicon.ico               # Site icon
```

---

## 🔍 Troubleshooting Common Issues

### Issue 1: Blank Page After Upload

**Symptoms:** Website shows blank page or "Index of /" directory listing

**Solutions:**
1. **Check index.html Location**
   - Ensure `index.html` is directly in public_html
   - Not in a subfolder like public_html/dist/index.html

2. **Verify File Permissions**
   - Files: 644 permissions
   - Directories: 755 permissions

3. **Check for Upload Errors**
   - Re-upload any missing files
   - Verify all folders were created

### Issue 2: Broken Styles/Images

**Symptoms:** Website loads but looks unstyled, images missing

**Solutions:**
1. **Check Asset Paths**
   - Verify `_astro/` folder exists and contains CSS/JS files
   - Confirm image paths are correct

2. **Astro Configuration**
   - May need to adjust `base` setting in astro.config.mjs for subdirectories
   
   ```js
   export default defineConfig({
     base: '/subdirectory/', // if deploying to subdirectory
   })
   ```

### Issue 3: Chatbot Not Working

**Symptoms:** Chatbot appears but doesn't respond

**Solutions:**
1. **Environment Variables Missing**
   - Most shared hosting doesn't support Node.js environment variables
   - Consider disabling chatbot for static deployment

2. **API Key Security**
   - Don't hardcode API keys in production builds
   - Use server-side proxy or disable feature

### Issue 4: GitHub Actions Failing

**Symptoms:** Deployment workflow fails, red X on GitHub Actions

**Common Fixes:**
1. **Check FTP Credentials**
   - Verify all secrets are correctly entered
   - Test FTP connection manually

2. **Build Errors**
   - Check Node.js version compatibility
   - Verify all dependencies install correctly

3. **Permission Issues**
   - FTP user needs write access to target directory
   - Check cPanel FTP account permissions

### Issue 5: Website Shows Old Content

**Symptoms:** Changes don't appear after deployment

**Solutions:**
1. **Clear Browser Cache**
   - Force refresh with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
   - Test in incognito/private browsing mode

2. **Check Upload Completion**
   - Verify all files were uploaded successfully
   - Compare file timestamps in cPanel vs local

3. **CDN/Caching Issues**
   - Some hosting providers use caching
   - Wait 5-10 minutes for cache to clear
   - Contact support if caching persists

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:

### Content Review
- [ ] All placeholder content replaced with real content
- [ ] Team photos updated (currently showing initials)
- [ ] Portfolio examples clearly marked as examples
- [ ] Contact information correct throughout site
- [ ] Social media links functional

### Technical Checks  
- [ ] `npm run build` completes without errors
- [ ] All pages load correctly in local preview
- [ ] Images optimized for web (compressed file sizes)
- [ ] No console errors in browser developer tools
- [ ] Mobile responsiveness tested

### API & Environment Setup
- [ ] Decide on chatbot implementation (keep, disable, or modify)
- [ ] Environment variables configured if keeping chatbot
- [ ] Contact forms working (if using alternative to chatbot)
- [ ] Google Analytics/tracking codes added if needed

### Performance Optimization
- [ ] Run `npm run build` for optimized production files
- [ ] Images compressed and properly sized
- [ ] Unnecessary files removed from dist folder
- [ ] Test site speed with tools like PageSpeed Insights

---

## 🎯 Recommended Deployment Strategy

For MW Design Studio, I recommend **Method 3 (GitHub Actions + Deployment Branch)** because:

### Advantages:
- **True Git Integration**: Full version control with cPanel Git
- **Automated Builds**: GitHub Actions handles all building
- **Zero Manual Steps**: Push → Build → Deploy automatically
- **Professional Workflow**: Industry standard approach
- **Easy Rollbacks**: Can revert to any previous version through Git
- **Team Collaboration**: Multiple developers can work safely
- **Backup URLs**: GitHub Pages provides secondary testing URL

### Setup Priority:
1. **Week 1**: Start with Method 1 (Manual) to get site live quickly
2. **Week 2**: Implement Method 3 (GitHub Actions + Deployment Branch) 
3. **Week 3**: Set up cPanel Git integration to pull from gh-pages branch
4. **Ongoing**: Push changes to main branch, everything else is automatic

### Why This Beats Other Methods:
- **vs Method 1**: No more manual file uploads ever
- **vs Method 2**: Uses proper Git workflow instead of FTP
- **vs Traditional Git**: Handles build process automatically

### Environment Variables Strategy:
1. **Phase 1**: Deploy without chatbot (comment out functionality)
2. **Phase 2**: Research if hosting provider supports Node.js environment variables
3. **Phase 3**: If not supported, implement client-side contact form alternative

---

## 📞 Support & Next Steps

### If You Need Help:

1. **Hosting Provider Support**
   - Contact for FTP credentials and Node.js support
   - Ask about environment variable capabilities
   - Inquire about Git integration options

2. **GitHub Repository Issues**
   - Check GitHub Actions logs for deployment errors
   - Verify repository secrets are correctly configured

3. **Technical Issues**
   - Test locally first with `npm run dev`
   - Check browser developer console for errors
   - Verify file structure matches expected layout

### Post-Deployment Tasks:

1. **Monitor Performance**
   - Set up Google Analytics if desired
   - Test site speed and mobile responsiveness
   - Check all contact forms and links

2. **SEO Setup**
   - Submit sitemap to Google Search Console
   - Verify meta descriptions and titles
   - Set up social media Open Graph tags

3. **Ongoing Maintenance**
   - Regular content updates through GitHub
   - Monitor for broken links or images
   - Keep dependencies updated for security

---

## 🚀 **SPECIAL: InMotion Hosting Deployment**

### InMotion Hosting Advantages
- **Terminal/SSH Access**: Available on all plans (port 2222)
- **Node.js Support**: Power/Pro plans include "Setup Node.js App" feature
- **Environment Variables**: Built-in interface for secure API key management
- **Git Integration**: Full support for repository deployment

### **Recommended Approach for InMotion**

#### **Option 1: Static Site + Node.js API** (Best Performance)
```bash
# Deploy static site using Method 3 (GitHub Actions + Deployment Branch)
# Then add Node.js app for chatbot API only

# In InMotion cPanel:
1. Use Git Version Control for static site → public_html
2. Create Node.js App for chatbot API → subdirectory
3. Set environment variables in Node.js App interface
```

#### **Option 2: Full Node.js Deployment** (Full Featured)
```bash
# SSH to InMotion (port 2222)
ssh username@your-domain.com -p 2222

# Clone repository
git clone https://github.com/HouseOfVibes/MW-Design-Studio-Website.git
cd MW-Design-Studio-Website

# Install dependencies
npm install

# Build static files
npm run build

# Set up as Node.js app in cPanel
```

### **Environment Variables Setup on InMotion**

1. **Access cPanel** → Software → "Setup Node.js App"
2. **Create/Edit Application**
3. **Scroll to "Environment Variables" section**
4. **Add Variables**:
   ```
   Variable Name: GEMINI_API_KEY
   Variable Value: [your actual API key]
   
   Variable Name: GOOGLE_CHAT_WEBHOOK_URL  
   Variable Value: [your webhook URL]
   ```

### **InMotion-Specific Commands for mwdesign.agency**

```bash
# Connect to SSH (port 2222) - replace 'yourusername' with actual username
ssh yourusername@mwdesign.agency -p 2222

# Navigate to your domain directory
cd public_html/mwdesign.agency  # or just public_html if primary domain

# Clone repository (if doing manual setup)
git clone https://github.com/HouseOfVibes/MW-Design-Studio-Website.git
cd MW-Design-Studio-Website

# Install dependencies
npm install

# Build for production
npm run build

# Copy built files to domain directory
cp -r dist/* ../

# For Node.js app setup - activate environment (get exact command from cPanel)
source /home/yourusername/nodevenv/mw-design-studio/bin/activate

# Install dependencies in virtual environment
npm install
```

### **Why This Works Better on InMotion**

✅ **True Server-Side Rendering**: If needed later  
✅ **Secure Environment Variables**: Protected API keys  
✅ **Full Terminal Access**: Complete control over deployment  
✅ **Professional Hosting**: Better than basic shared hosting  
✅ **Chatbot Functionality**: Can work without security compromises  

### **Domain Setup for mwdesign.agency**

#### **Step 1: Verify Domain Configuration in cPanel**
1. **Login to InMotion cPanel**
2. **Check "Subdomains" or "Addon Domains"** section
3. **Verify mwdesign.agency points to correct directory**:
   - **Primary Domain**: `/public_html` 
   - **Addon Domain**: `/public_html/mwdesign.agency`
   - **Subdomain**: `/public_html/subdomain.mwdesign.agency`

#### **Step 2: DNS and SSL Configuration**
1. **DNS Settings**: Ensure mwdesign.agency A record points to InMotion server IP
2. **SSL Certificate**: Enable free Let's Encrypt SSL in cPanel → SSL/TLS
3. **Force HTTPS**: Redirect HTTP to HTTPS for security

#### **Step 3: Test Domain Access**
```bash
# Test your domain responds
curl -I https://mwdesign.agency

# Should return 200 OK status when site is deployed
```

### **API Key Placement Strategy**

#### **❌ NEVER PUT API KEYS IN GITHUB**
```bash
# DON'T do this in your code:
const API_KEY = "AIzaSyC...actual-key-here"  # SECURITY RISK!
```

#### **✅ PUT API KEYS IN CPANEL AFTER DEPLOYMENT**
1. **Deploy site first** without API keys (chatbot will be disabled)
2. **After deployment**, add keys in cPanel environment variables
3. **Enable chatbot functionality** once keys are secure

**Workflow:**
```
1. Push code to GitHub (no API keys) 
   ↓
2. GitHub Actions builds and deploys static site
   ↓  
3. Site goes live at mwdesign.agency (chatbot disabled)
   ↓
4. Add API keys in cPanel → Node.js App → Environment Variables
   ↓
5. Enable chatbot functionality with secure API access
```

### **Deployment Priority for mwdesign.agency**

1. **Phase 1**: Deploy static site using Method 3 (GitHub Actions + Git)
   - Site goes live at https://mwdesign.agency
   - All pages work except chatbot
   
2. **Phase 2**: Set up Node.js app for chatbot API endpoints  
   - Create Node.js application in cPanel
   - Point to /api/chat endpoint
   
3. **Phase 3**: Configure environment variables securely in cPanel
   - Add GEMINI_API_KEY in Node.js app settings
   - Add GOOGLE_CHAT_WEBHOOK_URL if needed
   
4. **Phase 4**: Enable chatbot functionality with proper API integration
   - Test chatbot on live site
   - Verify API keys work securely

---

*This comprehensive guide should get your MW Design Studio website successfully deployed to cPanel hosting. For InMotion Hosting specifically, you have enhanced options with Node.js support and secure environment variable management. Remember to test thoroughly after deployment and don't hesitate to reach out to your hosting provider's support team if you encounter any issues.*