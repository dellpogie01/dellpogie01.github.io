# JuanMediaHubPH — Android Developer Portfolio

A professional, interactive developer portfolio website showcasing Android apps created by JuanMediaHubPH with vibrant cyan/violet neon styling, an interactive Three.js 3D Android device hero, searchable app showcase, screenshot modal carousel, and Gemini AI assistant & generative studio tools.

## Features
- **Responsive Navigation**: Translucent navbar with scroll progress indicator, mobile menu, and theme toggle (persisted via `localStorage`).
- **Three.js 3D Hero**: Interactive 3D floating Android phone model built with studio PBR lighting (`RoomEnvironment`, `ACESFilmicToneMapping`) and smooth rotation.
- **App Showcase**: Filter apps by category (*Education*, *Games*, *Productivity*, *Lifestyle*) or search by keywords.
- **Initial Projects**: *Colors of Faith*, *Holy Bible KJV 1611*, *Pic To PDF*, *MedsAlarm*, *CapybaRun*, *GALA*, and *SoloChess3D*. Publication statuses default to `"Add publication status"`.
- **App Details Modal**: Accessible modal with screenshot carousel (previous/next controls, keyboard support), feature list, and conditional Google Play / GitHub links.
- **Juan AI Assistant Studio**: Integrated Gemini chat interface with high thinking mode toggle, plus an AI concept and asset generator.
- **Contact & Footer**: Direct links to GitHub (`https://github.com/dellpogie01`) and email.

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your browser.

### Building for Production
```bash
npm run build
```

## Customization Guide
- **Edit Branding & Bio**: Update `src/components/About.tsx` and `src/components/Hero.tsx`.
- **Edit Portfolio Projects**: Update `src/data/appsData.ts` to add/edit apps, features, screenshots, publication statuses, and Google Play URLs.
- **Configure Gemini API**: Set `GEMINI_API_KEY` in your `.env` file or AI Studio secrets panel.
