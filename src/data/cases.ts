// Case studies for the 6 flagship projects. Facts come from the repos and reports.

export type Art = 'scorecard' | 'pipeline' | 'funnel' | 'bistro' | 'riskgrid' | 'vlans';

export interface CaseStudy {
  slug: string;
  id: string;
  art: Art;
  live?: boolean;
  track: string;
  status: string;
  title: string;
  summary: string; // card text
  outcome: string; // one-liner on the case page
  tags: string[];
  meta: { role: string; when: string; stack: string; link?: { label: string; href: string } };
  context: string[];
  flowTitle: string;
  flow: string[];
  tableTitle: string;
  tableHead: [string, string, string];
  table: [string, string, string][];
  results: { value: string; label: string }[];
  lessons: string;
}

export const cases: CaseStudy[] = [
  {
    slug: 'travistello',
    id: 'CF-01',
    art: 'scorecard',
    live: true,
    track: 'Product · Live',
    status: 'IN PRODUCTION',
    title: 'Travistello',
    summary: 'Travel gear research platform where every score shows its evidence. 28 products, 6 comparison sets, live in production.',
    outcome: 'A product decision platform where every score is derived from a versioned model and cited sources, and where trust rules are enforced in the code, not in a disclaimer.',
    tags: ['Next.js 16', 'Payload CMS', 'PostgreSQL', 'Three.js'],
    meta: { role: 'Solo, from design to production', when: '2026', stack: 'Next.js 16, React 19, TypeScript, Payload 3, Neon Postgres, Three.js, Vercel, Vitest, Playwright', link: { label: 'travistello.com', href: 'https://travistello.com' } },
    context: [
      'Most gear review sites hide how their scores are made, mix "we tested it" with "we read about it", and send clicks through redirects anyone can abuse.',
      'Travistello is the opposite bet: a catalog where every product, variant, spec, source and score is a typed record, and where the platform itself refuses to publish anything it cannot back up.',
    ],
    flowTitle: 'From raw evidence to a click',
    flow: ['Product + variant', 'Evidence sources', 'Versioned score', 'Offer', 'Compare', 'Tracked redirect'],
    tableTitle: 'Trust and security rules in the code',
    tableHead: ['RULE', 'LAYER', 'PREVENTS'],
    table: [
      ['Opaque /go/[token] redirects with server-owned destinations', 'Routing', 'Open redirect'],
      ['Outbound clicks store no IP address, bots are filtered out', 'Analytics', 'Tracking abuse'],
      ['Score weights must total 100%, the overall score is derived', 'Data model', 'Hand-tuned scores'],
      ['Research-based and hands-on reviews are distinct data states', 'Data model', 'Fake reviews'],
      ['Every media record needs rights owner and usage basis', 'CMS', 'Licensing issues'],
      ['Affiliate programs and click data restricted to admins', 'CMS roles', 'Data exposure'],
    ],
    results: [
      { value: '28', label: 'products published across 5 pillars' },
      { value: '6', label: 'comparison sets' },
      { value: '3', label: 'delivery slices, all live and verified' },
    ],
    lessons: 'The hard part was never the features, it was the trust rules: deciding what the platform must refuse to show. Next: activate affiliate programs and add the first hands-on reviews as their own data state.',
  },
  {
    slug: 'supply-chain-security',
    id: 'CF-02',
    art: 'pipeline',
    track: 'DevSecOps',
    status: 'CONTAINED',
    title: 'Supply chain security on Kubernetes',
    summary: 'A pipeline that blocks critical CVEs before push, and a cluster that refuses unapproved registries, latest tags and root pods.',
    outcome: 'A vulnerable image never reaches the registry, and a non-compliant pod never reaches the cluster. Two gates: one in CI, one at admission.',
    tags: ['Trivy', 'OPA Gatekeeper', 'GitLab CI'],
    meta: { role: 'Solo, personal lab', when: 'M1, 2026', stack: 'GitLab CI, Docker, Trivy, Safety, Kubernetes (kind), OPA Gatekeeper, Rego', link: { label: 'supply-chain-security', href: 'https://github.com/MouaadSek/supply-chain-security' } },
    context: [
      'Most container attacks do not start in production. They start with a vulnerable base image, an outdated dependency, or a pod that runs as root because nobody said no.',
      'The goal: make the insecure path impossible by default, in the pipeline and in the cluster, without relying on developers to remember the rules.',
    ],
    flowTitle: 'Two gates between a commit and the cluster',
    flow: ['git push', 'Trivy + Safety', 'Registry', 'Kubernetes API', 'Gatekeeper decision'],
    tableTitle: 'What gets refused',
    tableHead: ['CONTROL', 'LAYER', 'ACTION'],
    table: [
      ['Image with a CRITICAL or HIGH CVE', 'CI · Trivy', 'BLOCK'],
      ['Vulnerable Python dependency', 'CI · Safety', 'BLOCK'],
      ['Image from an unapproved registry', 'Admission · Rego', 'DENY'],
      ['Image using the latest tag', 'Admission · Rego', 'DENY'],
      ['Pod running as root', 'Admission · Rego', 'DENY'],
      ['Writable root filesystem, extra capabilities', 'Manifest', 'HARDENED'],
    ],
    results: [
      { value: '2', label: 'enforcement gates, CI and admission' },
      { value: '3', label: 'Gatekeeper policies written in Rego' },
      { value: '0', label: 'images pushed when a scan fails' },
    ],
    lessons: 'Gatekeeper checks where an image comes from, not whether my pipeline really built it. Next step: sign images with Cosign in CI, verify signatures at admission, and generate an SBOM for every build.',
  },
  {
    slug: 'jobpilot',
    id: 'CF-03',
    art: 'funnel',
    track: 'Product · Automation',
    status: 'RUNNING HOURLY',
    title: 'JobPilot',
    summary: 'A personal job search engine: collects offers from 8 source types, removes cross-source duplicates, scores them and tailors CVs.',
    outcome: 'One local system replaces a dozen job boards, inbox alerts and copy-pasted CVs, with 2,100+ automated tests keeping it honest.',
    tags: ['Python', 'FastAPI', 'SQLite', 'Playwright'],
    meta: { role: 'Solo, personal product', when: '2026', stack: 'Python, Typer, FastAPI, SQLite, APScheduler, httpx, Playwright, sentence-transformers, Electron shell' },
    context: [
      'Applying for internships in France means watching France Travail, Welcome to the Jungle, HelloWork, La Bonne Alternance, LinkedIn and Indeed alerts. The same offer shows up four times with different wording, and every application needs its own CV.',
      'JobPilot turns that into a pipeline: pluggable sources, one data model, one review queue, and documents generated per offer.',
    ],
    flowTitle: 'From 8 source types to one review queue',
    flow: ['Sources', 'Normalize', 'Deduplicate', 'Score', 'Review queue', 'Tailored CV'],
    tableTitle: 'Engineering decisions',
    tableHead: ['DECISION', 'AREA', 'WHY'],
    table: [
      ['Idempotent ingestion on content hash and source ID', 'Data', 'No double offers'],
      ['One function owns every status change, logged to an audit table', 'State', 'Traceability'],
      ['Mail alerts read over IMAP in read-only peek mode', 'Security', 'Never alters inbox'],
      ['LLM calls log metadata only, never keys or prompts', 'Security', 'No secret leaks'],
      ['Duplicates matched on mission text, not company boilerplate', 'Matching', 'Real dedup'],
      ['Every source implements one interface, mockable in tests', 'Architecture', 'Pluggable'],
    ],
    results: [
      { value: '2,121', label: 'automated tests' },
      { value: '8', label: 'source connector types' },
      { value: '1h', label: 'collection cycle, in the background' },
    ],
    lessons: 'Collecting offers is easy, knowing that two different postings are the same job is the real problem. Next: a cleaner web dashboard, and sharing the matching engine as a standalone library.',
  },
  {
    slug: 'ladress',
    id: 'CF-04',
    art: 'bistro',
    track: 'Product · Real business',
    status: 'DELIVERED',
    title: "L'Adress restaurant website",
    summary: 'Website for a Lille bistro: menu, gallery, events, online reservations and quote requests, with a protected admin.',
    outcome: 'A restaurant site the owners can run themselves, with forms that are validated, rate-limited and backed by row-level security.',
    tags: ['Next.js 15', 'Supabase', 'Tailwind', 'Resend'],
    meta: { role: 'Solo, built for the restaurant', when: '2026', stack: 'Next.js 15 App Router, Tailwind CSS 4, Supabase (Postgres, Auth, Storage), Resend, Docker, Vercel' },
    context: [
      'A small restaurant needs more than a menu page: table reservations, event quotes, a photo gallery and news, all editable without calling a developer.',
      'Public forms on a small business site are also the first thing bots find, so security had to be part of the build, not an afterthought.',
    ],
    flowTitle: 'From a visitor form to the owner inbox',
    flow: ['Visitor form', 'Zod validation', 'Rate limiter', 'Supabase + RLS', 'Email to owner'],
    tableTitle: 'Security built in',
    tableHead: ['CONTROL', 'LAYER', 'PROTECTS'],
    table: [
      ['Row-level security policies on every table', 'Database', 'Data access'],
      ['Admin area behind authentication middleware', 'App', 'Back office'],
      ['Schema validation on every form input', 'API', 'Injection, junk'],
      ['Rate limiting on public endpoints', 'API', 'Spam, abuse'],
      ['Service-role key kept server-only', 'Secrets', 'Key exposure'],
      ['Content-Security-Policy and security headers', 'HTTP', 'Clickjacking, XSS'],
    ],
    results: [
      { value: '11', label: 'public pages, French, SEO-ready' },
      { value: '16', label: 'row-level security policies' },
      { value: '3', label: 'public form flows with owner emails' },
    ],
    lessons: 'Clients do not ask for row-level security, but they suffer when it is missing. Next: replace the in-memory rate limiter with a shared store so it survives scaling.',
  },
  {
    slug: 'canritco-audit',
    id: 'CF-05',
    art: 'riskgrid',
    track: 'Security audit',
    status: 'REPORT DELIVERED',
    title: 'Canritco infrastructure audit',
    summary: 'Asset inventory scored on CIA, exposure mapping, 621 CIS checks, top 10 risks and a 90-day remediation roadmap.',
    outcome: 'An external-consultant style audit of a 600-employee company endpoint: evidence first, then a prioritized plan management can act on.',
    tags: ['Nmap', 'HardeningKitty', 'Hayabusa', 'PowerShell'],
    meta: { role: 'Team of 2, security consultants', when: 'March 2026, 2 weeks', stack: 'Nmap, HardeningKitty (CIS Windows 11), Hayabusa, PowerShell, VMware', link: { label: 'infrastructure-security-assessment', href: 'https://github.com/MouaadSek/infrastructure-security-assessment' } },
    context: [
      'Canritco is a fictional French company with 600 employees and a mixed Windows estate. We acted as external consultants hired to audit a standard employee workstation.',
      'The brief: inventory the assets, map the exposure, identify the top risks, and hand over a 90-day plan, with proof attached to every finding.',
    ],
    flowTitle: 'Audit method',
    flow: ['CIA inventory', 'Nmap exposure', 'CIS baseline', 'Log timeline', 'Risk register', '90-day plan'],
    tableTitle: 'Top risks found',
    tableHead: ['RISK', 'EVIDENCE', 'LEVEL'],
    table: [
      ['BitLocker disabled on the workstation', 'manage-bde', 'CRITICAL'],
      ['Shared local admin account, no traceability', 'Local users export', 'HIGH'],
      ['SMB share open to Everyone', 'net share', 'HIGH'],
      ['TeamViewer installed as shadow IT', 'Software inventory', 'HIGH'],
      ['Ports 135 and 445 exposed', 'Nmap scan', 'MEDIUM'],
      ['Partial CIS compliance, score 3.24 / 6', 'HardeningKitty', 'MEDIUM'],
    ],
    results: [
      { value: '621', label: 'CIS baseline checks run' },
      { value: '10', label: 'risks ranked, each with proof' },
      { value: '90', label: 'day roadmap in 3 phases' },
    ],
    lessons: 'A finding without proof is an opinion. Every risk in the register points to a raw export. Next time: automate the collection with one PowerShell script so the audit can be repeated every quarter.',
  },
  {
    slug: 'netsecure',
    id: 'CF-06',
    art: 'vlans',
    track: 'Network security',
    status: 'REMEDIATED',
    title: 'NetSecure Corp network audit',
    summary: 'PCAP forensics, an 8-step attack chain mapped to MITRE ATT&CK, then a segmented redesign with 802.1X, nftables and Suricata.',
    outcome: 'From a flat network where one foothold meant total access, to five segmented VLANs with default-deny filtering and detection on every flagged threat.',
    tags: ['Wireshark', 'Suricata', 'nftables', '802.1X'],
    meta: { role: 'Solo', when: 'May 2026', stack: 'Wireshark, Suricata, nftables, FreeRADIUS, 802.1X, VLANs, MITRE ATT&CK' },
    context: [
      'NetSecure Corp is a fictional 200-employee company with a head office and two branches. Its network was flat (10.0.0.0/16), with switches managed over Telnet using default passwords, no DMZ, no IDS and a weak Wi-Fi key.',
      'The job: prove the risk from captured traffic, chain it into a realistic attack, then redesign and harden the network.',
    ],
    flowTitle: 'Attack chain reconstructed from the capture',
    flow: ['Weak Wi-Fi key', 'SYN scan', 'Telnet creds', 'ARP spoofing', 'Session hijack', 'Exfiltration'],
    tableTitle: 'Findings and fixes',
    tableHead: ['FINDING', 'FIX', 'LEVEL'],
    table: [
      ['Telnet admin credentials in clear text', 'SSH with keys', 'CRITICAL'],
      ['ARP spoofing: one MAC claiming 3 IPs', 'DAI + DHCP snooping', 'CRITICAL'],
      ['Flat network, total lateral movement', '5 VLANs', 'CRITICAL'],
      ['Session cookie over plain HTTP', 'TLS + DMZ', 'HIGH'],
      ['Port scan went unnoticed', 'Suricata rules', 'HIGH'],
      ['No access control on ports', '802.1X + RADIUS', 'HIGH'],
    ],
    results: [
      { value: '12', label: 'vulnerabilities: 4 critical, 6 high, 2 medium' },
      { value: '5', label: 'VLANs with default-deny nftables' },
      { value: '6', label: 'custom Suricata detection rules' },
    ],
    lessons: 'The capture was only 76 packets, and it was enough to own the whole network. Next: validate DAI and port security on real switch images in a GNS3 lab, not only on paper.',
  },
];
