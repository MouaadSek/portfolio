// Single source of truth for the portfolio content.
// Every project here has code, a report or a live site behind it.

export const person = {
  name: 'Mouaad Sekkouri',
  role: 'Cyber: audit, SOC, GRC, consulting',
  goal: 'cloud security, DevSecOps',
  location: 'Lille, France',
  email: 'mouaadsekkourii@gmail.com',
  linkedin: 'https://linkedin.com/in/sekkouri',
  github: 'https://github.com/MouaadSek',
  availability: 'Available now for an alternance · 6-month internship from March 2027 · mobile across France',
  languages: [
    { name: 'French', level: 'Bilingual' },
    { name: 'English', level: 'C1' },
    { name: 'Arabic', level: 'Native' },
    { name: 'German', level: 'A2' },
  ],
  certifications: [{ name: 'Microsoft AZ-900, Azure Fundamentals', date: 'March 2026' }],
};

export type Track = 'Products' | 'DevSecOps' | 'Cloud & SRE' | 'Security audit';
export type Proof = 'Live' | 'Repo' | 'Report' | 'Brief';

export interface Project {
  id: string;
  title: string;
  context: string;
  track: Track;
  stack: string;
  proof: Proof;
  slug?: string; // has a case study page
  href?: string; // public link
}

export const projects: Project[] = [
  { id: 'P-01', title: 'Travistello', context: 'Personal product, live in production', track: 'Products', stack: 'Next.js 16, Payload, Postgres, Three.js', proof: 'Live', slug: 'travistello', href: 'https://travistello.com' },
  { id: 'P-02', title: 'JobPilot', context: 'Personal product', track: 'Products', stack: 'Python, FastAPI, SQLite, Playwright', proof: 'Repo', slug: 'jobpilot' },
  { id: 'P-03', title: "L'Adress restaurant website", context: 'Built for a Lille bistro', track: 'Products', stack: 'Next.js 15, Supabase, Resend', proof: 'Repo', slug: 'ladress' },
  { id: 'P-04', title: 'Interview Assist', context: 'Personal tool, v1.1 desktop release', track: 'Products', stack: 'Electron, Deepgram, OpenAI', proof: 'Repo' },
  { id: 'P-05', title: 'Loop & Linen', context: 'Personal product, MVP', track: 'Products', stack: 'Next.js, Payload, Postgres', proof: 'Repo' },
  { id: 'P-06', title: 'Factur-X e-invoicing engine', context: 'Internship, Baïfall Dream', track: 'Products', stack: 'Python, FastAPI, PostgreSQL, Factur-X', proof: 'Brief' },
  { id: 'P-07', title: 'CV generation pipeline', context: 'Personal tool', track: 'Products', stack: 'Python, Playwright, HTML', proof: 'Repo' },
  { id: 'P-08', title: 'SUPFile secure cloud storage', context: 'School, team project', track: 'Products', stack: 'Next.js 14, Express, mobile', proof: 'Repo', href: 'https://github.com/MouaadSek/SupFilePersonal' },
  { id: 'P-09', title: 'Supply chain security on Kubernetes', context: 'Personal lab', track: 'DevSecOps', stack: 'Trivy, Safety, OPA Gatekeeper', proof: 'Repo', slug: 'supply-chain-security', href: 'https://github.com/MouaadSek/supply-chain-security' },
  { id: 'P-10', title: 'DevSecOps Flask delivery', context: 'Personal lab', track: 'DevSecOps', stack: 'GitLab CI, Kaniko, Kubernetes', proof: 'Repo', href: 'https://github.com/MouaadSek/python-devops-app' },
  { id: 'P-11', title: 'Multi-environment CI/CD pipeline', context: 'Mini-project', track: 'DevSecOps', stack: 'GitLab CI, Docker, SonarQube', proof: 'Report' },
  { id: 'P-12', title: 'Fleetman microservices on Kubernetes', context: 'School project', track: 'Cloud & SRE', stack: 'Kubernetes, kind, MongoDB', proof: 'Repo', href: 'https://github.com/MouaadSek/fleetman-kubernetes' },
  { id: 'P-13', title: 'MySQL platform automation', context: 'Technical exercise, Worldline', track: 'Cloud & SRE', stack: 'Ansible, Terraform, Azure', proof: 'Repo', href: 'https://github.com/MouaadSek/worldline-sre-exercise' },
  { id: 'P-14', title: 'Monitoring and alerting stack', context: 'Mini-project', track: 'Cloud & SRE', stack: 'Prometheus, Grafana, ELK', proof: 'Report' },
  { id: 'P-15', title: 'Infrastructure as code provisioning', context: 'Mini-project', track: 'Cloud & SRE', stack: 'Terraform, Ansible, Azure', proof: 'Report' },
  { id: 'P-16', title: 'Canritco infrastructure audit', context: 'School project, team of 2', track: 'Security audit', stack: 'Nmap, HardeningKitty, Hayabusa', proof: 'Repo', slug: 'canritco-audit', href: 'https://github.com/MouaadSek/infrastructure-security-assessment' },
  { id: 'P-17', title: 'NetSecure Corp network audit', context: 'School project', track: 'Security audit', stack: '802.1X, nftables, Suricata', proof: 'Report', slug: 'netsecure' },
  { id: 'P-18', title: 'Secuvia infrastructure hardening', context: 'School project', track: 'Security audit', stack: 'Active Directory, BloodHound', proof: 'Report' },
  { id: 'P-19', title: 'Secure messaging with a private CA', context: 'School project', track: 'Security audit', stack: 'OpenSSL, PKI, Bash', proof: 'Report' },
];

export const tracks: { key: Track; code: string; name: string; desc: string; bar: string }[] = [
  { key: 'Products', code: 'SHP', name: 'Products shipped', desc: 'Web platforms, a desktop app and an automation system, one live in production.', bar: 'w-full' },
  { key: 'DevSecOps', code: 'DSO', name: 'DevSecOps', desc: 'Security gates in CI/CD, image scanning and Kubernetes admission control.', bar: 'w-[38%]' },
  { key: 'Cloud & SRE', code: 'SRE', name: 'Cloud & SRE', desc: 'Kubernetes, infrastructure as code, monitoring and automation on Azure.', bar: 'w-[50%]' },
  { key: 'Security audit', code: 'AUD', name: 'Security audit', desc: 'Infrastructure, network and Active Directory audits with remediation plans.', bar: 'w-[50%]' },
];

export const toolbox = [
  { name: 'Cloud & containers', shipped: ['Kubernetes', 'Docker', 'Azure', 'Terraform', 'Ansible', 'kind'], labs: ['Azure Sentinel', 'KQL', 'Defender for Cloud', 'Entra ID'] },
  { name: 'DevSecOps', shipped: ['GitLab CI', 'Trivy', 'Safety', 'OPA Gatekeeper', 'Kaniko', 'SonarQube'], labs: ['Semgrep', 'Bandit', 'OWASP ZAP'] },
  { name: 'Offensive & audit', shipped: ['Nmap', 'HardeningKitty', 'Hayabusa', 'Suricata', 'Wireshark', 'BloodHound'], labs: ['Burp Suite', 'PingCastle', 'Metasploit', 'Wazuh', 'Sigma'] },
  { name: 'GRC', shipped: ['CIA asset inventory', 'Risk register', 'Remediation roadmap', 'MITRE ATT&CK'], labs: ['EBIOS RM', 'ISO 27001', 'NIS2', 'CIS Benchmarks'] },
  { name: 'Build', shipped: ['Python', 'TypeScript', 'Next.js', 'React', 'PostgreSQL', 'FastAPI', 'Electron', 'Playwright'], labs: ['Flask', 'Node.js', 'Selenium', 'Postman'] },
];

export const timeline = [
  { when: 'Jul 2026 · Sep 2026', org: 'Baïfall Dream', role: 'Internship, Paris', detail: 'Wrote the spec for a B2B e-invoicing platform (95 requirements) and built its Factur-X engine: multi-tenant isolation with PostgreSQL RLS, Argon2id, 950+ tests, validated by FNFE with 0 errors.', active: true },
  { when: '2025 · now', org: 'SUPINFO Lille', role: 'Programme Grande École, M2 Cybersecurity', detail: 'M1 completed 2025-2026. AZ-900 obtained March 2026.', active: false },
  { when: 'Jan 2024 · Dec 2025', org: 'Concentrix', role: 'IT support technician, Netgear', detail: '1500+ network and security incidents, 85% first contact resolution, 40+ procedures written, resolution time cut by 20%.', active: false },
  { when: 'May 2023 · Jan 2024', org: 'Lionbridge', role: 'Software QA tester', detail: '200,000+ localized strings validated with an error rate under 0.5% over 8 months.', active: false },
  { when: 'Jan 2022 · May 2023', org: 'Testronic', role: 'Software QA tester', detail: '1,500+ web and mobile test cases run, 90+ critical defects caught before production.', active: false },
  { when: '2021 · 2024', org: 'Vistula University', role: 'Bachelor in Computer Engineering', detail: 'Warsaw, Poland.', active: false },
];

export const stats = [
  { value: 4, suffix: 'yrs', label: 'IT experience across 3 companies' },
  { value: 1500, suffix: '+', label: 'network security incidents handled' },
  { value: 85, suffix: '%', label: 'first contact resolution' },
  { value: 19, suffix: '', label: 'projects with code or reports behind them' },
];
