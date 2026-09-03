// Rasterises assets/social-preview.svg to docs/social-preview.png (1280x640),
// the size GitHub uses for the repository social preview.
// Usage: npm i --no-save playwright && node assets/render-social.mjs
import { chromium } from "playwright";
import { readFileSync } from "node:fs";

const svg = readFileSync(new URL("./social-preview.svg", import.meta.url), "utf8");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1280, height: 640 },
  deviceScaleFactor: 2,
});
await page.setContent(
  `<!doctype html><meta charset="utf-8"><style>html,body{margin:0}</style>${svg}`,
  { waitUntil: "networkidle" },
);
await page.waitForTimeout(200);
await page.screenshot({ path: "docs/social-preview.png", clip: { x: 0, y: 0, width: 1280, height: 640 } });
await browser.close();
console.log("wrote docs/social-preview.png");
