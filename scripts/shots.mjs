import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { serve } from "./serve.mjs";

const PORT = 4173;
const URL = `http://localhost:${PORT}/`;
const server = await serve(PORT);
const browser = await chromium.launch();
await mkdir("screenshots", { recursive: true });
let failed = false;

for (const width of [320, 360, 768, 1024, 1280, 1440]) {
  // reducedMotion: las capturas muestran el estado final de cada animación.
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
  await page.goto(URL, { waitUntil: "networkidle" });
  const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  if (over > 0) { failed = true; console.error(`✗ ${width}px: ${over}px de scroll horizontal`); }
  else console.log(`✓ ${width}px`);
  if (width !== 320) await page.screenshot({ path: `screenshots/${width}.png`, fullPage: true });
  await page.close();
}

const nojs = await browser.newPage({ viewport: { width: 360, height: 900 }, javaScriptEnabled: false });
await nojs.goto(URL, { waitUntil: "networkidle" });
await nojs.screenshot({ path: "screenshots/360-sin-js.png", fullPage: true });

const zoom = await browser.newPage({ viewport: { width: 640, height: 900 }, deviceScaleFactor: 2 }); // 1280 al 200%
await zoom.goto(URL, { waitUntil: "networkidle" });
const overZoom = await zoom.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
if (overZoom > 0) { failed = true; console.error(`✗ zoom 200%: ${overZoom}px de scroll horizontal`); } else console.log("✓ zoom 200%");

await browser.close();
server.close();
process.exit(failed ? 1 : 0);
