# Delio Labaddan — Android & Web Developer Portfolio

A modern, high-performance single-page developer portfolio featuring an interactive Three.js 3D Android device hero, 48 3D embossed tech stack badges spanning retro DOS to modern cloud/mobile, animated physics neon green mouse gravity particles, and curated Android app showcases.

## 🚀 Live Demo
Once deployed to GitHub Pages, the site will be live at:
- **`https://dellpogie01.github.io/`** (if repo is named `dellpogie01.github.io`)
- or **`https://dellpogie01.github.io/<repo-name>/`**

---

## 🛠️ Tech Stack & Highlights
- **Vite & React 19**: Ultra-fast bundling with relative base path configured for zero-configuration GitHub Pages hosting.
- **Three.js PBR 3D Hero**: Interactive, continuously rotating 3D Android smartphone model with high-gloss camera lenses, metallic bevel accents, and embossed glowing Android emblem.
- **Physics Neon Gravity Particles**: Canvas-based orbital particle system where glowing neon green dots swarm, orbit, and respond to your cursor with gravitational physics and shockwave click interactions.
- **Retro-to-Modern 3D Tech Stack**: 48 custom 3D skeuomorphic circular badges honoring a journey from DOS era tools (C, Turbo Pascal, Clipper, FoxPro) through modern stacks (Android, Kotlin, TypeScript, React, Python).
- **Tailwind CSS v4**: Fluid typography, responsive grid layout, and vibrant animated neon gradient accents.

---

## 📦 Local Development

```bash
# Install dependencies
bun install   # or npm install

# Start local development server
bun run dev   # or npm run dev
```

Build for production:
```bash
bun run build # or npm run build
```

---

## 🌐 Deploy to GitHub Pages (Automated via GitHub Actions)

This repository includes a pre-configured automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Setup Steps:
1. Create a new repository on your GitHub account (`dellpogie01`).
2. Add your remote and push:
   ```bash
   git remote add origin https://github.com/dellpogie01/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. GitHub Actions will automatically run the build and publish your portfolio live!
