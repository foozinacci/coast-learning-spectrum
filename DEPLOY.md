# 🚀 Deploying Learning Spectrum to Vercel

## Quick Deploy (Recommended)

### Option 1: Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from this directory**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Set up and deploy? `Y`
   - Which scope? (select your account)
   - Link to existing project? `N` (first time)
   - What's your project's name? `learning-spectrum`
   - In which directory is your code located? `./` (press Enter)

5. **Production deployment**:
   ```bash
   vercel --prod
   ```

Your app will be live at: `https://learning-spectrum.vercel.app`

---

### Option 2: Vercel Dashboard (Easiest)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click** "Add New Project"
4. **Import** this repository: `foozinacci/coast-learning-spectrum`
5. **Configure**:
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: `./`
6. **Click** "Deploy"

That's it! Vercel will auto-deploy on every push to your branch.

---

### Option 3: One-Command Deploy

From this directory, run:

```bash
npx vercel --prod
```

Follow the prompts and your app will be live in ~30 seconds.

---

## 🔧 Configuration

The deployment is configured via `vercel.json`:

- **Static site**: Serves `index.html` as the main entry point
- **SPA routing**: All routes redirect to `index.html`
- **Caching**: Disabled for development (can enable for production)

---

## 📦 What Gets Deployed

Only the essential files:
- ✅ `index.html` - The full application
- ✅ `package.json` - Project metadata
- ✅ `LICENSE` - MIT license
- ✅ `README.md` - Documentation

**Excluded** (via `.vercelignore`):
- ❌ `.git/` - Version control history
- ❌ `.env.example` - Environment template
- ❌ `CLAUDE.md` - Development guide
- ❌ `BRAND.md` - Brand guidelines

---

## 🌐 Custom Domain (Optional)

After deployment, you can add a custom domain:

1. Go to your project dashboard on Vercel
2. Click **Settings** → **Domains**
3. Add your domain (e.g., `learningspectrum.app`)
4. Follow DNS configuration instructions

---

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to GitHub:

- **Push to branch** → Auto-deploy preview
- **Merge to main** → Auto-deploy production

To enable:
1. Connect your GitHub repository in Vercel dashboard
2. Vercel will watch for changes and auto-deploy

---

## ✅ Deployment Checklist

Before deploying, verify:

- [x] **Stability check passed**: All functions defined ✅
- [x] **Features complete**: Export, Import, Resume, Three-Grade System ✅
- [x] **localStorage works**: Data persistence tested ✅
- [x] **Responsive**: Mobile and desktop layouts ✅
- [x] **No console errors**: Clean execution ✅
- [x] **Accessibility**: ARIA labels, keyboard navigation ✅

---

## 🐛 Troubleshooting

### "Command not found: vercel"
**Solution**: Install Vercel CLI globally:
```bash
npm install -g vercel
```

### "No token found"
**Solution**: Login first:
```bash
vercel login
```

### "Build failed"
**Solution**: This is a static site (no build step). Check `vercel.json` configuration.

### App not loading on Vercel
**Solution**:
1. Check browser console for errors
2. Verify `index.html` is in root directory
3. Check Vercel deployment logs

---

## 📊 Post-Deployment

Once deployed, you can:

1. **Share the URL**: `https://your-project.vercel.app`
2. **Test all features**: Especially export/import and localStorage
3. **Monitor**: Check Vercel analytics for usage
4. **Update**: Push to GitHub → Auto-deploys

---

## 🎓 Your Deployment URL

After running `vercel --prod`, you'll get a URL like:

```
✅ Production: https://learning-spectrum-xyz.vercel.app
```

**Share this with**:
- Teachers at Hugh Gregg Elementary
- Parents for home use
- SST teams for evaluation

---

**Ready to deploy?** Run:

```bash
vercel --prod
```

🌈 **Learning Spectrum: Every color of how they learn.** 🐊
