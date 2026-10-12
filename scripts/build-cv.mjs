// Renders /cv from the built site to public/ and dist/ as an A4 PDF.
// Usage: npm run build && npm run cv   (Chromium from Playwright is required)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const dist = path.resolve('dist');
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  let p = path.join(dist, decodeURIComponent(req.url.split('?')[0]));
  if (!p.startsWith(dist)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': types[path.extname(p)] ?? 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
}).listen(4999);

const exe = process.env.CHROMIUM_PATH || undefined;
const browser = await chromium.launch(exe ? { executablePath: exe } : {});
const page = await browser.newPage();
await page.goto('http://localhost:4999/cv/', { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
const pdf = await page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true });
for (const out of ['public/Mouaad-Sekkouri-CV.pdf', 'dist/Mouaad-Sekkouri-CV.pdf']) fs.writeFileSync(out, pdf);
await browser.close();
server.close();
console.log('CV written to public/ and dist/');
