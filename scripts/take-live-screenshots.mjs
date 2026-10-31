import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const workspaceScreenshotsDir = path.resolve(rootDir, 'screenshots');
const artifactScreenshotsDir = '/home/jsdrenthe/.gemini/antigravity/brain/41c3c8a0-42be-4f51-82c6-ec4c5cd5921a/screenshots';

fs.mkdirSync(workspaceScreenshotsDir, { recursive: true });
fs.mkdirSync(artifactScreenshotsDir, { recursive: true });

function saveScreenshotDual(buffer, filename) {
  fs.writeFileSync(path.join(workspaceScreenshotsDir, filename), buffer);
  fs.writeFileSync(path.join(artifactScreenshotsDir, filename), buffer);
  console.log(`  ✓ Opgeslagen van live https://spontiva.nl: ${filename} (${Math.round(buffer.length / 1024)} KB)`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('🌐 Starten van live screenshot sessie direct op https://spontiva.nl ...');

  const userDataDir = fs.mkdtempSync('/tmp/chrome-live-prof-');

  let browser;
  try {
    browser = await puppeteer.launch({
      executablePath: '/home/jsdrenthe/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome',
      env: { 
        ...process.env, 
        LD_LIBRARY_PATH: '/home/jsdrenthe/antigravity/spontiva-dev/.chrome-deps' 
      },
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        `--user-data-dir=${userDataDir}`
      ]
    });

    const liveUrl = 'https://spontiva.nl';

    // -------------------------------------------------------------
    // 1. Desktop Browser (1920x1080 @ 1.5x retina)
    // -------------------------------------------------------------
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1.5 });

    // 1. Live Homepage Hero
    console.log('📸 1. Live Homepage Hero & Navigatie (Desktop 1920x1080)...');
    await page.goto(`${liveUrl}/?ts=${Date.now()}`, { waitUntil: 'load', timeout: 30000 });
    await sleep(2000); // Wachten op WebGL Three.js canvas & animaties
    const heroBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(heroBuffer, '01-live-homepage-hero-desktop.png');

    // 2. Live Ecosysteem & Marquee (11 Bedrijven)
    console.log('📸 2. Live Ecosysteem Marquee & Bedrijven Grid...');
    await page.evaluate(() => {
      window.scrollTo({ top: 820, behavior: 'instant' });
    });
    await sleep(1000);
    const ecosystemBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(ecosystemBuffer, '02-live-ecosystem-marquee.png');

    // 3. Live Diensten Sectie
    console.log('📸 3. Live Diensten & TGC methodes...');
    await page.evaluate(() => {
      const el = document.getElementById('diensten');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await sleep(1000);
    const servicesBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(servicesBuffer, '03-live-diensten.png');

    // 4. Live Simulatie & Calculator
    console.log('📸 4. Live Simulatie & Liquiditeitscalculator...');
    await page.evaluate(() => {
      const el = document.getElementById('simulatie') || document.getElementById('kosten');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await sleep(1000);
    const simulationBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(simulationBuffer, '04-live-simulatie.png');

    // 5. Live Over Ons Pagina
    console.log('📸 5. Live Over Ons Pagina...');
    await page.goto(`${liveUrl}/#/about`, { waitUntil: 'load', timeout: 30000 });
    await sleep(1500);
    const aboutBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(aboutBuffer, '05-live-about-page.png');

    // 6. Live Contact & Intake Pagina
    console.log('📸 6. Live Contact & Intake Pagina...');
    await page.goto(`${liveUrl}/#/contact`, { waitUntil: 'load', timeout: 30000 });
    await sleep(1500);
    const contactBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(contactBuffer, '06-live-contact-page.png');

    // 7. Live Auth Modal (Inlogvenster)
    console.log('📸 7. Live Auth Modal...');
    await page.goto(`${liveUrl}/?auth=login`, { waitUntil: 'load', timeout: 30000 });
    await sleep(1200);
    const authBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(authBuffer, '07-live-auth-modal.png');

    // 8. Live Dashboard Portal
    console.log('📸 8. Live Dashboard Portal...');
    await page.goto(`${liveUrl}/#/dashboard`, { waitUntil: 'load', timeout: 30000 });
    await sleep(1500);
    const dashboardBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(dashboardBuffer, '08-live-dashboard-portal.png');

    // 9. Live 3D 404 Pagina
    console.log('📸 9. Live 3D 404 Pagina...');
    await page.goto(`${liveUrl}/404.html`, { waitUntil: 'load', timeout: 30000 });
    await sleep(1800);
    const page404Buffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(page404Buffer, '09-live-404-page.png');

    // -------------------------------------------------------------
    // 10. Mobiele Weergave (iPhone 15 - 390x844 @ 2x)
    // -------------------------------------------------------------
    console.log('📱 10. Live Mobiele Weergave (iPhone 15)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mobilePage.goto(`${liveUrl}/?ts=${Date.now()}`, { waitUntil: 'load', timeout: 30000 });
    await sleep(2000);
    const mobileHeroBuffer = await mobilePage.screenshot({ type: 'png' });
    saveScreenshotDual(mobileHeroBuffer, '10-live-mobile-iphone15.png');

    // 11. Mobiel Menu Drawer
    console.log('📱 11. Live Mobiel Menu Drawer...');
    await mobilePage.evaluate(() => {
      const menuBtn = document.querySelector('button[aria-label="Menu openen"]');
      if (menuBtn) menuBtn.click();
    });
    await sleep(800);
    const mobileMenuBuffer = await mobilePage.screenshot({ type: 'png' });
    saveScreenshotDual(mobileMenuBuffer, '11-live-mobile-menu.png');

    console.log('\n🎉 Alle live screenshots van Spontiva.nl zijn succesvol vastgelegd!');
  } finally {
    if (browser) await browser.close();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

run().catch(err => {
  console.error('❌ Fout bij live screenshots:', err);
  process.exit(1);
});
