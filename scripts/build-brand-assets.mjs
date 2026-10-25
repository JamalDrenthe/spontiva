import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');

async function renderSvgToPngBuffer(svgString, width, height) {
  const resvg = new Resvg(svgString, {
    fitTo: {
      mode: 'width',
      value: width
    }
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  
  if (height && height !== width) {
    return sharp(pngBuffer).resize(width, height).png().toBuffer();
  }
  return pngBuffer;
}

async function buildAllAssets() {
  console.log('🚀 LogoAnywhere: Genereren van Spontiva Digital Asset Pack...');

  // 1. Read master SVGs
  const badgeSvgPath = path.join(publicDir, 'spontiva-s-badge.svg');
  const badgeSvg = fs.readFileSync(badgeSvgPath, 'utf8');

  // 2. Multi-size Favicon (favicon.ico: 16x16, 32x32, 48x48)
  console.log('📦 Renderen van ico-formaten...');
  const png16 = await renderSvgToPngBuffer(badgeSvg, 16, 16);
  const png32 = await renderSvgToPngBuffer(badgeSvg, 32, 32);
  const png48 = await renderSvgToPngBuffer(badgeSvg, 48, 48);

  const icoBuffer = await pngToIco([png16, png32, png48]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('  ✓ public/favicon.ico aangemaakt (16x16, 32x32, 48x48)');

  // 3. Apple Touch Icon (180x180 - Geen transparantie, dekkend #0F172A, logo safe-zone 140x140)
  const logo140 = await renderSvgToPngBuffer(badgeSvg, 140, 140);
  const appleTouchBuffer = await sharp({
    create: {
      width: 180,
      height: 180,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 } // #0F172A
    }
  })
    .composite([{ input: logo140, gravity: 'center' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleTouchBuffer);
  console.log('  ✓ public/apple-touch-icon.png aangemaakt (180x180, safe-zone)');

  // 4. Android / PWA Icons (192x192 en 512x512)
  const logo154 = await renderSvgToPngBuffer(badgeSvg, 154, 154);
  const android192Buffer = await sharp({
    create: {
      width: 192,
      height: 192,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
    .composite([{ input: logo154, gravity: 'center' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-192x192.png'), android192Buffer);
  console.log('  ✓ public/android-chrome-192x192.png aangemaakt');

  const logo410 = await renderSvgToPngBuffer(badgeSvg, 410, 410);
  const android512Buffer = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
    .composite([{ input: logo410, gravity: 'center' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'android-chrome-512x512.png'), android512Buffer);
  console.log('  ✓ public/android-chrome-512x512.png aangemaakt (maskable safe-zone)');

  // 5. Social Avatar (1000x1000 - 20% safe margin voor ronde profieluitsnedes)
  const logo700 = await renderSvgToPngBuffer(badgeSvg, 700, 700);
  const socialAvatarBuffer = await sharp({
    create: {
      width: 1000,
      height: 1000,
      channels: 4,
      background: { r: 15, g: 23, b: 42, alpha: 1 }
    }
  })
    .composite([{ input: logo700, gravity: 'center' }])
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(publicDir, 'social-avatar.png'), socialAvatarBuffer);
  console.log('  ✓ public/social-avatar.png aangemaakt (1000x1000)');

  // 6. Open Graph Preview (1200x630 - Link preview voor WhatsApp, LinkedIn, Twitter, etc.)
  // We craft an exquisite 1200x630 SVG canvas with gradients, Spontiva lockup, emerald accents, and render it to PNG
  const ogSvg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#020617"/>
        <stop offset="40%" stop-color="#0F172A"/>
        <stop offset="100%" stop-color="#020617"/>
      </linearGradient>
      <linearGradient id="brandGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34D399"/>
        <stop offset="50%" stop-color="#10B981"/>
        <stop offset="100%" stop-color="#059669"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#10B981" stop-opacity="0.22"/>
        <stop offset="70%" stop-color="#059669" stop-opacity="0.04"/>
        <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowTopRight" cx="90%" cy="10%" r="40%">
        <stop offset="0%" stop-color="#14B8A6" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
      </radialGradient>
      <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="630" fill="url(#bgGrad)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <rect width="1200" height="630" fill="url(#glowTopRight)"/>

    <!-- Subtle Grid / Border Accent -->
    <rect x="24" y="24" width="1152" height="582" rx="32" fill="none" stroke="#1E293B" stroke-width="2"/>
    <rect x="24" y="24" width="1152" height="582" rx="32" fill="none" stroke="url(#brandGreen)" stroke-width="1.5" stroke-opacity="0.3"/>

    <!-- Central Safe Zone Card (630x400 safe-zone compliant) -->
    <g transform="translate(600, 240)">
      <!-- Badge Icon -->
      <g transform="translate(-80, -110)" filter="url(#badgeShadow)">
        <rect width="160" height="160" rx="42" fill="#0F172A" stroke="#334155" stroke-width="2"/>
        <g transform="translate(24, 24) scale(0.22)">
          <path d="M 335 184 H 273 C 269 145 243 128 205 128 C 159 128 135 148 135 176 C 135 204 155 220 211 236 C 285 256 339 284 339 344 C 339 408 287 440 207 440 C 125 440 75 400 71 332 H 133 C 137 372 165 392 207 392 C 251 392 277 372 277 344 C 277 314 257 298 197 282 C 127 262 73 236 73 176 C 73 114 127 80 205 80 C 283 80 331 118 335 184 Z" fill="#FFFFFF"/>
          <circle cx="407" cy="406" r="34" fill="url(#brandGreen)"/>
        </g>
      </g>

      <!-- Brand Title -->
      <text x="0" y="115" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="64" font-weight="900" letter-spacing="-1.5" fill="#FFFFFF" text-anchor="middle">
        Spontiva<tspan fill="url(#brandGreen)">.</tspan>
      </text>

      <!-- Tagline Pill -->
      <g transform="translate(-160, 142)">
        <rect width="320" height="34" rx="17" fill="#134E4A" fill-opacity="0.5" stroke="#14B8A6" stroke-opacity="0.4" stroke-width="1.5"/>
        <text x="160" y="22" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="13" font-weight="800" letter-spacing="2.8" fill="#5EEAD4" text-anchor="middle">
          TIME GAP CASHFLOW
        </text>
      </g>
    </g>

    <!-- Description & Proposition (Lower Safe Zone) -->
    <text x="600" y="475" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="22" font-weight="500" fill="#94A3B8" text-anchor="middle">
      60+ Gespecialiseerde Methodes voor Direct Werkkapitaal
    </text>
    <text x="600" y="515" font-family="'Inter', system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" letter-spacing="1.5" fill="#38BDF8" text-anchor="middle">
      SPONTIVA.NL
    </text>
  </svg>
  `;

  const ogPngBuffer = await renderSvgToPngBuffer(ogSvg, 1200, 630);
  fs.writeFileSync(path.join(publicDir, 'og-image.png'), ogPngBuffer);
  console.log('  ✓ public/og-image.png aangemaakt (1200x630, safe-zone geoptimaliseerd)');

  // 7. PWA site.webmanifest
  const webmanifestContent = {
    name: "Spontiva | TIME GAP CASHFLOW",
    short_name: "Spontiva",
    description: "Spontiva overbrugt werkkapitaal met meer dan 60+ geavanceerde Time Gap Cashflow (TGC) methodes.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0F172A",
    theme_color: "#0F172A",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };
  fs.writeFileSync(
    path.join(publicDir, 'site.webmanifest'),
    JSON.stringify(webmanifestContent, null, 2)
  );
  console.log('  ✓ public/site.webmanifest aangemaakt');

  console.log('✨ LogoAnywhere: Alle brand assets succesvol gegenereerd!');
}

buildAllAssets().catch(err => {
  console.error('❌ Fout bij genereren van assets:', err);
  process.exit(1);
});
