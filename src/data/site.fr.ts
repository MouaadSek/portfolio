// Version française du contenu. Même structure que site.ts.
import type { Project } from './site';
import { projects as projectsEn, person as personEn, tracks as tracksEn } from './site';

export const person = {
  ...personEn,
  availability: 'Disponible : stage de fin d’études de 6 mois dès mars 2027, et missions freelance',
  languages: [
    { name: 'Français', level: 'Bilingue' },
    { name: 'Anglais', level: 'C1' },
    { name: 'Arabe', level: 'Langue maternelle' },
    { name: 'Allemand', level: 'A2' },
  ],
  certifications: [{ name: 'Microsoft AZ-900, Azure Fundamentals', date: 'Mars 2026' }],
};

const fr: Record<string, { title: string; context: string }> = {
  'P-01': { title: 'Travistello', context: 'Produit personnel, en production' },
  'P-02': { title: 'JobPilot', context: 'Produit personnel' },
  'P-03': { title: "Site du restaurant L'Adress", context: 'Réalisé pour un bistrot lillois' },
  'P-04': { title: 'Interview Assist', context: 'Outil personnel, version desktop 1.1' },
  'P-05': { title: 'Loop & Linen', context: 'Produit personnel, MVP' },
  'P-06': { title: 'Moteur de facturation électronique Factur-X', context: 'Stage, Baïfall Dream' },
  'P-07': { title: 'Pipeline de génération de CV', context: 'Outil personnel' },
  'P-08': { title: 'SUPFile, stockage cloud sécurisé', context: 'École, projet en équipe' },
  'P-09': { title: 'Sécurité de la supply chain sur Kubernetes', context: 'Lab personnel' },
  'P-10': { title: 'Livraison DevSecOps d’une app Flask', context: 'Lab personnel' },
  'P-11': { title: 'Pipeline CI/CD multi-environnements', context: 'Mini-projet' },
  'P-12': { title: 'Microservices Fleetman sur Kubernetes', context: 'Projet d’école' },
  'P-13': { title: 'Automatisation d’une plateforme MySQL', context: 'Exercice technique, Worldline' },
  'P-14': { title: 'Stack de monitoring et d’alerting', context: 'Mini-projet' },
  'P-15': { title: 'Provisioning en infrastructure as code', context: 'Mini-projet' },
  'P-16': { title: 'Audit d’infrastructure Canritco', context: 'Projet d’école, binôme' },
  'P-17': { title: 'Audit réseau NetSecure Corp', context: 'Projet d’école' },
  'P-18': { title: 'Sécurisation d’infrastructure Secuvia', context: 'Projet d’école' },
  'P-19': { title: 'Messagerie sécurisée avec une PKI privée', context: 'Projet d’école' },
};
export const projects: Project[] = projectsEn.map((p) => ({ ...p, ...fr[p.id] }));

const trackFr: Record<string, { name: string; desc: string }> = {
  'Products': { name: 'Produits livrés', desc: 'Plateformes web, une app desktop et un système d’automatisation, dont un en production.' },
  'DevSecOps': { name: 'DevSecOps', desc: 'Contrôles de sécurité dans la CI/CD, scan d’images et contrôle d’admission Kubernetes.' },
  'Cloud & SRE': { name: 'Cloud & SRE', desc: 'Kubernetes, infrastructure as code, monitoring et automatisation sur Azure.' },
  'Security audit': { name: 'Audit de sécurité', desc: 'Audits d’infrastructure, de réseau et d’Active Directory avec plans de remédiation.' },
};
export const tracks = tracksEn.map((t) => ({ ...t, ...trackFr[t.key] }));
export const trackLabel: Record<string, string> = { All: 'Tous', Products: 'Produits', DevSecOps: 'DevSecOps', 'Cloud & SRE': 'Cloud & SRE', 'Security audit': 'Audit' };

export const toolbox = [
  { name: 'Cloud & conteneurs', shipped: ['Kubernetes', 'Docker', 'Azure', 'Terraform', 'Ansible', 'kind'], labs: ['Azure Sentinel', 'KQL', 'Defender for Cloud'] },
  { name: 'DevSecOps', shipped: ['GitLab CI', 'Trivy', 'Safety', 'OPA Gatekeeper', 'Kaniko', 'SonarQube'], labs: ['Semgrep', 'Bandit', 'OWASP ZAP'] },
  { name: 'Offensif & audit', shipped: ['Nmap', 'HardeningKitty', 'Hayabusa', 'Suricata', 'Wireshark', 'BloodHound'], labs: ['Burp Suite', 'PingCastle', 'Metasploit', 'Wazuh'] },
  { name: 'GRC', shipped: ['Inventaire DIC des actifs', 'Registre des risques', 'Plan de remédiation', 'MITRE ATT&CK'], labs: ['EBIOS RM', 'ISO 27001', 'NIS2', 'CIS Benchmarks'] },
  { name: 'Développement', shipped: ['Python', 'TypeScript', 'Next.js', 'React', 'PostgreSQL', 'FastAPI', 'Electron', 'Playwright'], labs: ['Flask', 'Node.js'] },
];

export const timeline = [
  { when: 'Juil. 2026 · Sept. 2026', org: 'Baïfall Dream', role: 'Stage, Paris', detail: 'Rédaction du cahier des charges d’une plateforme d’e-facturation B2B (95 exigences) et développement de son moteur Factur-X : isolation multi-tenant par RLS PostgreSQL, Argon2id, 950+ tests, validé par la FNFE avec 0 erreur.', active: true },
  { when: '2025 · aujourd’hui', org: 'SUPINFO Lille', role: 'Programme Grande École, M2 Cybersécurité', detail: 'M1 validé en 2025-2026. AZ-900 obtenue en mars 2026.', active: false },
  { when: 'Janv. 2024 · Déc. 2025', org: 'Concentrix', role: 'Technicien support informatique, Netgear', detail: '1 500+ incidents réseau et sécurité, 85 % de résolution au premier contact, 40+ procédures rédigées, délai de résolution réduit de 20 %.', active: false },
  { when: 'Mai 2023 · Janv. 2024', org: 'Lionbridge', role: 'Testeur logiciel QA', detail: '200 000+ chaînes localisées validées, taux d’erreur inférieur à 0,5 % sur 8 mois.', active: false },
  { when: 'Janv. 2022 · Mai 2023', org: 'Testronic', role: 'Testeur logiciel QA', detail: '1 500+ cas de test web et mobile exécutés, 90+ anomalies critiques détectées avant la production.', active: false },
  { when: '2021 · 2024', org: 'Vistula University', role: 'Bachelor Génie Informatique', detail: 'Varsovie, Pologne.', active: false },
];

export const stats = [
  { value: 4, suffix: 'ans', label: 'd’expérience IT dans 3 entreprises' },
  { value: 1500, suffix: '+', label: 'incidents réseau et sécurité traités' },
  { value: 85, suffix: '%', label: 'de résolution au premier contact' },
  { value: 19, suffix: '', label: 'projets avec code ou rapport à l’appui' },
];
