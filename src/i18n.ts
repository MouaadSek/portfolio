import * as en from './data/site';
import * as frSite from './data/site.fr';
import { cases as casesEn } from './data/cases';
import { cases as casesFr } from './data/cases.fr';

export type Lang = 'en' | 'fr';

export function content(lang: Lang) {
  if (lang === 'fr') {
    return { ...frSite, cases: casesFr };
  }
  const trackLabel: Record<string, string> = { All: 'All', Products: 'Products', DevSecOps: 'DevSecOps', 'Cloud & SRE': 'Cloud & SRE', 'Security audit': 'Security audit' };
  return { person: en.person, projects: en.projects, tracks: en.tracks, toolbox: en.toolbox, timeline: en.timeline, stats: en.stats, trackLabel, cases: casesEn };
}

/** Prefix a site path with the language. */
export const path = (lang: Lang, p: string) => (lang === 'fr' ? `/fr${p === '/' ? '/' : p}` : p);
export const cvPdf = (lang: Lang) => (lang === 'fr' ? '/Mouaad-Sekkouri-CV-FR.pdf' : '/Mouaad-Sekkouri-CV.pdf');

export const ui = {
  en: {
    metaTitle: 'Mouaad Sekkouri · Cloud Security & DevSecOps',
    metaDesc: 'Cybersecurity engineer in training (M2, SUPINFO Lille). DevSecOps, cloud security and audits, plus real products shipped to production.',
    nav: { work: 'Work', about: 'About', services: 'Services', cv: 'CV', contact: 'Contact', search: 'Search', switchTo: 'FR', switchLabel: 'Version française' },
    skip: 'Skip to content',
    heroTitleA: 'I secure systems.', heroTitleB1: 'I ', heroTitleShip: 'ship', heroTitleB2: ' them too.',
    heroLead: 'Mouaad Sekkouri. M2 Cybersecurity at SUPINFO Lille, heading for Cloud Security and DevSecOps. Four years in IT, 19 projects from Kubernetes admission control to a product live in production.',
    hire: 'Hire me', workWith: 'Work with me', cvPdf: 'CV (PDF)',
    term: { base: 'Lille, FR (Belgium-ready)', live: 'travistello in production', done: 'internship @ Baïfall Dream', open: 'stage, Mar 2027, 6 months' },
    statsLabel: 'Key numbers',
    s1: '01 / COVERAGE', s1Title: 'Break it. Harden it. Ship it.', s1Lead: 'Most security students only have labs. I also build and run real products, so I know what securing them costs the team that ships.', projectsWord: 'projects',
    s2: '02 / CASE FILES', s2Title: 'Selected work, written like incident reports.', readCase: 'Read the case file', live: 'LIVE',
    s3: '03 / FULL INDEX', s3Title: 'All projects', showing: 'showing', filterLabel: 'Filter projects by track',
    th: ['ID', 'PROJECT', 'TRACK', 'STACK', 'PROOF'], tableCaption: 'All projects with track, stack and proof',
    proof: { Live: 'Live', Repo: 'Repo', Report: 'Report', Brief: 'Brief' } as Record<string, string>,
    proofLegend: 'Live: public URL · Repo: code on GitHub (some private, shown on request) · Report: written deliverable · Brief: internship work, sanitized',
    s4: '04 / TOOLBOX', s4Title: 'What I work with', s4Lead: 'Solid: used in the projects above. Dashed: practiced in labs, school modules and mini-projects.', labsSr: 'Labs: ', toolsSr: 'tools', langCert: 'Languages & certification',
    s5: '05 / ABOUT', s5Title: 'From the support desk to the security stack.',
    about1: "I started in software QA, testing products before they reached users. Then two years on the front line at Concentrix, troubleshooting network security issues for Netgear customers at scale. Now a master's in cybersecurity, and an internship building an e-invoicing platform.",
    about2: 'That path gave me something most juniors lack: I know how systems break in production, and how people actually use them. Trilingual, based in Lille, a short ride from Brussels. Open to France and Belgium.',
    photo: '[ photo coming soon ]', timelineLabel: 'Experience and education',
    s6: '06 / FOR CLIENTS', s6Title: 'Need it secured, or built?',
    services: [
      { t: 'Security audit', d: 'Workstation, network or web app review against CIS and OWASP, with every finding backed by evidence and a prioritized fix plan.', l: 'See an example audit →', h: '/work/canritco-audit' },
      { t: 'CI/CD and container hardening', d: 'Image and dependency scanning, secret hygiene and Kubernetes admission policies, added to your pipeline without slowing the team down.', l: 'See the pipeline →', h: '/work/supply-chain-security' },
      { t: 'Websites and web apps', d: 'Fast, secure-by-default sites and internal tools for small businesses: reservations, forms, admin area, all with proper validation and access control.', l: 'See a client site →', h: '/work/ladress' },
    ],
    s7: '07 / CONTACT', s7Title: "Let's open a ticket.", s7Lead: 'Recruiting for a 6-month internship from March 2027, or need help on a project? I reply within 24 hours.',
    copyEmail: 'Copy email', copied: 'Copied', clipboard: 'clipboard',
    footerNote: 'Lille, FR · strict CSP, zero trackers',
    // case page
    allCases: 'All case files', role: 'ROLE', when: 'WHEN', stack: 'STACK', link: 'LINK', privateRepo: 'Private repo, demo on request',
    secContext: 'Context', secApproach: 'Approach', secOutcome: 'Outcome', secLessons: 'Lessons', sectionsLabel: 'Case file sections',
    problem: 'The problem', results: 'Results', differently: "What I'd do differently", nextCase: 'NEXT CASE FILE', caseFile: 'Case file',
    // palette
    pal: { goto: 'Go to', cases: 'Case files', projects: 'Projects', actions: 'Actions', section: 'section', work: 'Selected work', index: 'All projects', toolbox: 'Toolbox', about: 'About and experience', services: 'Services for clients', contact: 'Contact', openCv: 'Open CV', dlCv: 'Download CV (PDF)', copy: 'Copy email address', gh: 'GitHub profile', li: 'LinkedIn profile', external: 'external', page: 'page', placeholder: 'grep projects, sections, actions...', inputLabel: 'Search projects, sections and actions', results: 'Results', empty: 'No match. Try "kubernetes" or "audit".', help: '↑↓ navigate · Enter open · Esc close', lang: 'Version française' },
  },
  fr: {
    metaTitle: 'Mouaad Sekkouri · Sécurité Cloud & DevSecOps',
    metaDesc: 'Futur ingénieur cybersécurité (M2, SUPINFO Lille). DevSecOps, sécurité cloud et audits, et de vrais produits livrés en production.',
    nav: { work: 'Projets', about: 'Parcours', services: 'Services', cv: 'CV', contact: 'Contact', search: 'Rechercher', switchTo: 'EN', switchLabel: 'English version' },
    skip: 'Aller au contenu',
    heroTitleA: 'Je sécurise les systèmes.', heroTitleB1: 'Et je les ', heroTitleShip: 'livre', heroTitleB2: '.',
    heroLead: 'Mouaad Sekkouri. M2 Cybersécurité à SUPINFO Lille, cap sur la sécurité cloud et le DevSecOps. Quatre ans dans l’IT, 19 projets, du contrôle d’admission Kubernetes à un produit en production.',
    hire: 'Me recruter', workWith: 'Travailler ensemble', cvPdf: 'CV (PDF)',
    term: { base: 'Lille, FR (Belgique OK)', live: 'travistello en production', done: 'stage @ Baïfall Dream', open: 'stage, mars 2027, 6 mois' },
    statsLabel: 'Chiffres clés',
    s1: '01 / COUVERTURE', s1Title: 'Casser. Durcir. Livrer.', s1Lead: 'La plupart des étudiants en sécurité n’ont que des labs. Je construis et fais tourner de vrais produits, donc je sais ce que la sécurité coûte à l’équipe qui livre.', projectsWord: 'projets',
    s2: '02 / DOSSIERS', s2Title: 'Projets choisis, rédigés comme des rapports d’incident.', readCase: 'Lire le dossier', live: 'EN LIGNE',
    s3: '03 / INDEX COMPLET', s3Title: 'Tous les projets', showing: 'affichés', filterLabel: 'Filtrer les projets par domaine',
    th: ['ID', 'PROJET', 'DOMAINE', 'STACK', 'PREUVE'], tableCaption: 'Tous les projets avec domaine, stack et preuve',
    proof: { Live: 'En ligne', Repo: 'Repo', Report: 'Rapport', Brief: 'Synthèse' } as Record<string, string>,
    proofLegend: 'En ligne : URL publique · Repo : code sur GitHub (certains privés, montrés sur demande) · Rapport : livrable écrit · Synthèse : travail de stage, anonymisé',
    s4: '04 / BOÎTE À OUTILS', s4Title: 'Mes outils', s4Lead: 'Plein : utilisé dans les projets ci-dessus. Pointillé : pratiqué en labs, modules d’école et mini-projets.', labsSr: 'Labs : ', toolsSr: 'outils', langCert: 'Langues et certification',
    s5: '05 / PARCOURS', s5Title: 'Du support au cœur de la sécurité.',
    about1: 'J’ai commencé en QA logicielle, à tester des produits avant qu’ils n’arrivent aux utilisateurs. Puis deux ans en première ligne chez Concentrix, à résoudre des incidents réseau et sécurité pour les clients Netgear. Aujourd’hui un master en cybersécurité, et un stage sur une plateforme de facturation électronique.',
    about2: 'Ce parcours m’a donné ce qui manque à beaucoup de juniors : je sais comment les systèmes cassent en production, et comment les gens les utilisent vraiment. Trilingue, basé à Lille, à un saut de Bruxelles. Ouvert à la France et à la Belgique.',
    photo: '[ photo bientôt ]', timelineLabel: 'Expérience et formation',
    s6: '06 / POUR LES CLIENTS', s6Title: 'Besoin de sécuriser, ou de construire ?',
    services: [
      { t: 'Audit de sécurité', d: 'Revue de poste, de réseau ou d’application web selon CIS et OWASP, chaque constat appuyé par une preuve, avec un plan de correction priorisé.', l: 'Voir un exemple d’audit →', h: '/work/canritco-audit' },
      { t: 'Durcissement CI/CD et conteneurs', d: 'Scan d’images et de dépendances, gestion des secrets et politiques d’admission Kubernetes, ajoutés à votre pipeline sans ralentir l’équipe.', l: 'Voir le pipeline →', h: '/work/supply-chain-security' },
      { t: 'Sites et applications web', d: 'Sites rapides et sécurisés par défaut, outils internes pour petites entreprises : réservations, formulaires, espace admin, avec validation et contrôle d’accès.', l: 'Voir un site client →', h: '/work/ladress' },
    ],
    s7: '07 / CONTACT', s7Title: 'Ouvrons un ticket.', s7Lead: 'Vous recrutez un stagiaire pour 6 mois dès mars 2027, ou vous avez besoin d’aide sur un projet ? Je réponds sous 24 heures.',
    copyEmail: 'Copier l’email', copied: 'Copié', clipboard: 'presse-papiers',
    footerNote: 'Lille, FR · CSP stricte, zéro traceur',
    allCases: 'Tous les dossiers', role: 'RÔLE', when: 'QUAND', stack: 'STACK', link: 'LIEN', privateRepo: 'Repo privé, démo sur demande',
    secContext: 'Contexte', secApproach: 'Approche', secOutcome: 'Résultats', secLessons: 'Retour d’expérience', sectionsLabel: 'Sections du dossier',
    problem: 'Le problème', results: 'Résultats', differently: 'Ce que je ferais autrement', nextCase: 'DOSSIER SUIVANT', caseFile: 'Dossier',
    pal: { goto: 'Aller à', cases: 'Dossiers', projects: 'Projets', actions: 'Actions', section: 'section', work: 'Projets choisis', index: 'Tous les projets', toolbox: 'Boîte à outils', about: 'Parcours et expérience', services: 'Services pour les clients', contact: 'Contact', openCv: 'Ouvrir le CV', dlCv: 'Télécharger le CV (PDF)', copy: 'Copier l’adresse email', gh: 'Profil GitHub', li: 'Profil LinkedIn', external: 'externe', page: 'page', placeholder: 'grep projets, sections, actions...', inputLabel: 'Rechercher projets, sections et actions', results: 'Résultats', empty: 'Aucun résultat. Essayez « kubernetes » ou « audit ».', help: '↑↓ naviguer · Entrée ouvrir · Échap fermer', lang: 'English version' },
  },
};
