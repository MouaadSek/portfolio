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
| Profile, projects, toolbox, timeline, stats | `src/data/site.ts` (EN), `src/data/site.fr.ts` (FR) |
| The 6 case studies | `src/data/cases.ts` (EN), `src/data/cases.fr.ts` (FR) |
| Code evidence shown in case studies | `src/data/evidence.ts` |
| "How this site is built" page | `src/views/SecurityPage.astro` (reads headers from `vercel.json`) |
| Interface strings, both languages | `src/i18n.ts` |
| Page templates shared by EN and FR | `src/views/` |
| Cover art drawn in code for each case | `src/components/Art.astro` |
| Routes | `src/pages/` (English) and `src/pages/fr/` (French) |
| CV (HTML, A4, both languages) | `src/views/CvPage.astro` |
| Interactivity (terminal, command palette, filters, counters) | `src/scripts/ui.ts` |
| Hero packet animation | `src/scripts/packets.ts` |
| CTF (5 flags, hashes only) | `src/scripts/ctf.ts`, flags in the home page source, `public/robots.txt`, `public/.well-known/security.txt`, the `X-CTF-Flag` header in `vercel.json`, and the console |
| "Try to hack me" CSP demo | `src/scripts/hackme.ts` (on the security page) |
| Recruiter match | `src/views/MatchPage.astro`, `src/scripts/match.ts`, skills in `src/data/match.ts` |
| Lab map (all projects by shared infrastructure) | `src/views/LabsPage.astro`, `src/scripts/labs.ts`, data in `src/data/labs.ts` |
| Skills constellation | `src/scripts/graph.ts`, project to tool links in `src/data/graph.ts` |
| Security headers | `vercel.json` |

To change content, edit the data files (EN and FR). Everything else reads from them.

## Commands

| Command | Does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local dev server on http://localhost:4321 |
| `npm run build` | Build the static site to `dist/` |
| `npm run cv` | Regenerate both CV PDFs (EN and FR) from `/cv` and `/fr/cv` (run after `build`, needs Playwright Chromium) |

## To do

- If a custom domain is bought: update `site` in `astro.config.mjs` and `site` in `src/views/CvPage.astro`, then rebuild the CV
- Add real screenshots to case studies when available
