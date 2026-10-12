# Mouaad Sekkouri · Portfolio

Personal portfolio: Cloud Security / DevSecOps profile, 19 projects, 6 case studies, general CV.

## Stack

- Astro 5 (static output), Tailwind CSS 4, TypeScript
- Self-hosted fonts (Bricolage Grotesque, Geist, JetBrains Mono): no Google Fonts call
- Zero inline scripts and styles, so a strict Content-Security-Policy works (see `vercel.json`)
- No analytics, no trackers, no third-party requests

## Where things live

| What | File |
|---|---|
| Profile, projects, toolbox, timeline, stats | `src/data/site.ts` |
| The 6 case studies | `src/data/cases.ts` |
| Cover art drawn in code for each case | `src/components/Art.astro` |
| Homepage | `src/pages/index.astro` |
| Case study template | `src/pages/work/[slug].astro` |
| CV (HTML, A4) | `src/pages/cv.astro` |
| Interactivity (command palette, filters, counters) | `src/scripts/ui.ts` |
| Security headers | `vercel.json` |

To change content, edit the two data files. Everything else reads from them.

## Commands

| Command | Does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server on http://localhost:4321 |
| `npm run build` | Build the static site to `dist/` |
| `npm run cv` | Regenerate `public/Mouaad-Sekkouri-CV.pdf` from `/cv` (run after `build`, needs Playwright Chromium) |

## To do

- Replace the photo placeholder in the About section (`src/pages/index.astro`, search `photo coming soon`)
- If a custom domain is bought: update `site` in `astro.config.mjs` and `site` in `src/pages/cv.astro`, then rebuild the CV
- Add real screenshots to case studies when available
