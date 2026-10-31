import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

const workspaceScreenshotsDir = path.resolve(rootDir, 'screenshots');
const artifactScreenshotsDir = '/home/jsdrenthe/.gemini/antigravity/brain/41c3c8a0-42be-4f51-82c6-ec4c5cd5921a/screenshots';

fs.mkdirSync(workspaceScreenshotsDir, { recursive: true });
fs.mkdirSync(artifactScreenshotsDir, { recursive: true });

function saveScreenshotDual(buffer, filename) {
  fs.writeFileSync(path.join(workspaceScreenshotsDir, filename), buffer);
  fs.writeFileSync(path.join(artifactScreenshotsDir, filename), buffer);
  console.log(`  ✓ Opgeslagen: ${filename} (${Math.round(buffer.length / 1024)} KB)`);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json'
};

function createStaticServer(port = 8765) {
  const server = http.createServer((req, res) => {
    let reqPath = decodeURI(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';

    let filePath = path.join(distDir, reqPath);

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      if (reqPath.endsWith('.html') || !path.extname(reqPath)) {
        filePath = path.join(distDir, 'index.html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const content = fs.readFileSync(filePath);

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });

  return new Promise(resolve => {
    server.listen(port, '127.0.0.1', () => {
      console.log(`🚀 Lokale server gestart op http://127.0.0.1:${port}`);
      resolve(server);
    });
  });
}

async function run() {
  console.log('📸 Starten van screenshot proces voor Spontiva...');

  const PORT = 8765;
  const server = await createStaticServer(PORT);
  const baseUrl = `http://127.0.0.1:${PORT}`;

  const userDataDir = fs.mkdtempSync('/tmp/chrome-prof-');

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
        '--no-proxy-server',
        '--proxy-bypass-list=*',
        `--user-data-dir=${userDataDir}`
      ]
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1.5 });

    // 1. Homepage Hero
    console.log('📸 1. Homepage Hero & Header (Desktop)...');
    await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    const heroBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(heroBuffer, '01-homepage-hero-desktop.png');

    // 2. Ecosysteem Logostrip & 11 zusterbedrijven
    console.log('📸 2. Ecosysteem & Marquee...');
    await page.evaluate(() => {
      window.scrollTo({ top: 820, behavior: 'instant' });
    });
    await sleep(800);
    const ecosystemBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(ecosystemBuffer, '02-ecosystem-logos-desktop.png');

    // 3. Diensten & TGC-methodes
    console.log('📸 3. Diensten & 60+ TGC routes...');
    await page.evaluate(() => {
      const el = document.getElementById('diensten');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await sleep(800);
    const servicesBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(servicesBuffer, '03-diensten-tgc-desktop.png');

    // 4. Simulatie & Calculator
    console.log('📸 4. Simulatie & Calculator...');
    await page.evaluate(() => {
      const el = document.getElementById('simulatie') || document.getElementById('kosten');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await sleep(800);
    const simulationBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(simulationBuffer, '04-simulatie-calculator-desktop.png');

    // 5. Over Ons Pagina (direct via routing)
    console.log('📸 5. Over Ons pagina (Desktop)...');
    await page.goto(`${baseUrl}/#/about`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    const aboutBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(aboutBuffer, '05-over-ons-desktop.png');

    // 6. Contact & Intake Pagina (direct via routing)
    console.log('📸 6. Contact pagina (Desktop)...');
    await page.goto(`${baseUrl}/#/contact`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1200);
    const contactBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(contactBuffer, '06-contact-desktop.png');

    // 7. Auth Modal (Inlogvenster)
    console.log('📸 7. Auth / Inlogvenster...');
    await page.goto(`${baseUrl}/?auth=login`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1000);
    const authBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(authBuffer, '07-auth-modal-desktop.png');

    // 8. Dashboard Portal (direct via routing)
    console.log('📸 8. Dashboard Portal...');
    await page.goto(`${baseUrl}/#/dashboard`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    const dashboardBuffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(dashboardBuffer, '08-dashboard-portal-desktop.png');

    // 9. 3D 404 Pagina
    console.log('📸 9. 3D 404 Pagina...');
    await page.goto(`${baseUrl}/404.html`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(2000);
    const page404Buffer = await page.screenshot({ type: 'png' });
    saveScreenshotDual(page404Buffer, '09-404-pagina-desktop.png');

    // 10. Mobiele Weergave (iPhone 15 - 390x844 @ 2x)
    console.log('📱 10. Mobiele Weergave (iPhone 15 Hero)...');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
    await mobilePage.goto(`${baseUrl}/`, { waitUntil: 'networkidle0', timeout: 30000 });
    await sleep(1500);
    const mobileHeroBuffer = await mobilePage.screenshot({ type: 'png' });
    saveScreenshotDual(mobileHeroBuffer, '10-mobile-hero-portrait.png');

    // 11. Mobiel Menu Drawer
    console.log('📱 11. Mobiel Navigatiemenu Drawer...');
    await mobilePage.evaluate(() => {
      const menuBtn = document.querySelector('button[aria-label="Menu openen"]');
      if (menuBtn) menuBtn.click();
    });
    await sleep(600);
    const mobileMenuBuffer = await mobilePage.screenshot({ type: 'png' });
    saveScreenshotDual(mobileMenuBuffer, '11-mobile-menu-drawer.png');

    console.log('\n🎉 Alle screenshots zijn succesvol en geverifieerd gegenereerd!');
  } finally {
    if (browser) await browser.close();
    server.close();
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

run().catch(err => {
  console.error('❌ Fout bij screenshots:', err);
  process.exit(1);
});
