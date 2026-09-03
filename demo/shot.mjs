// Renders demo/index.html and writes card screenshots to docs/.
// Usage: node demo/shot.mjs   (a static server must serve the repo root on :8779)
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

mkdirSync("docs", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 2 });
await page.goto("http://localhost:8779/demo/index.html", { waitUntil: "networkidle" });
await page.waitForTimeout(500);

await page.locator("#cleaner").screenshot({ path: "docs/cleaner-card.png" });
await page.locator("#monitor").screenshot({ path: "docs/monitor-card.png" });
await page.screenshot({ path: "docs/cards.png", fullPage: true });

await browser.close();
console.log("wrote docs/cleaner-card.png, docs/monitor-card.png, docs/cards.png");
