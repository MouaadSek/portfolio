// Skill dictionary for the recruiter match page.
// level: shipped = used in a listed project or job, labs = coursework / labs only, gap = not covered (shown honestly).

export type Level = 'shipped' | 'labs' | 'gap';
export interface Skill { k: string; en: string; fr: string; re: string[]; level: Level; proj: string[] }

export const skills: Skill[] = [
  { k: 'kubernetes', en: 'Kubernetes', fr: 'Kubernetes', re: ['kubernetes', 'k8s', 'helm', 'openshift'], level: 'shipped', proj: ['P-09', 'P-10', 'P-12'] },
  { k: 'docker', en: 'Docker and containers', fr: 'Docker et conteneurs', re: ['docker', 'conteneur', 'container', 'podman'], level: 'shipped', proj: ['P-09', 'P-10', 'P-03'] },
  { k: 'azure', en: 'Azure', fr: 'Azure', re: ['azure', 'entra id'], level: 'shipped', proj: ['P-13', 'P-15'] },
  { k: 'aws', en: 'AWS', fr: 'AWS', re: ['\\baws\\b', 'amazon web services'], level: 'gap', proj: [] },
  { k: 'gcp', en: 'Google Cloud', fr: 'Google Cloud', re: ['\\bgcp\\b', 'google cloud'], level: 'gap', proj: [] },
  { k: 'terraform', en: 'Terraform and IaC', fr: 'Terraform et IaC', re: ['terraform', 'infrastructure as code', '\\biac\\b', 'pulumi'], level: 'shipped', proj: ['P-13', 'P-15'] },
  { k: 'ansible', en: 'Ansible', fr: 'Ansible', re: ['ansible'], level: 'shipped', proj: ['P-13', 'P-15'] },
  { k: 'cicd', en: 'CI/CD pipelines', fr: 'Pipelines CI/CD', re: ['ci/cd', 'ci-cd', 'cicd', 'pipeline', 'gitlab', 'github actions', 'jenkins', 'intégration continue', 'continuous integration'], level: 'shipped', proj: ['P-09', 'P-10', 'P-11'] },
  { k: 'devsecops', en: 'DevSecOps', fr: 'DevSecOps', re: ['devsecops', 'shift.left', 'security by design', 'secure by design'], level: 'shipped', proj: ['P-09', 'P-10', 'P-06'] },
  { k: 'scan', en: 'Vulnerability and dependency scanning', fr: 'Scan de vulnérabilités et dépendances', re: ['trivy', '\\bsast\\b', '\\bdast\\b', '\\bsca\\b', 'snyk', 'sonarqube', 'vulnérabilit', 'vulnerabilit', 'cve'], level: 'shipped', proj: ['P-09', 'P-11'] },
  { k: 'policy', en: 'Policy as code', fr: 'Policy as code', re: ['\\bopa\\b', 'gatekeeper', 'rego', 'kyverno', 'policy as code'], level: 'shipped', proj: ['P-09'] },
  { k: 'cloudsec', en: 'Cloud security', fr: 'Sécurité cloud', re: ['cloud security', 'sécurité cloud', 'sécurité du cloud', 'cspm', 'cnapp', 'cloud'], level: 'shipped', proj: ['P-09', 'P-13', 'P-15'] },
  { k: 'audit', en: 'Security audits and hardening', fr: 'Audits et durcissement', re: ['audit', 'hardening', 'durcissement', '\\bcis\\b', 'benchmark'], level: 'shipped', proj: ['P-16', 'P-17', 'P-18'] },
  { k: 'network', en: 'Network security', fr: 'Sécurité réseau', re: ['réseau', 'network', 'firewall', 'pare-feu', 'vlan', '802\\.1x', 'radius', 'nftables', 'iptables', '\\bvpn\\b', 'fortinet', 'palo alto'], level: 'shipped', proj: ['P-17'] },
  { k: 'ids', en: 'Detection and traffic analysis', fr: 'Détection et analyse de trafic', re: ['suricata', '\\bids\\b', '\\bips\\b', 'snort', 'wireshark', 'pcap', 'forensic', 'forensique'], level: 'shipped', proj: ['P-17', 'P-16'] },
  { k: 'siem', en: 'SIEM and SOC tooling', fr: 'SIEM et outils SOC', re: ['siem', '\\bsoc\\b', 'splunk', 'qradar', 'elastic', '\\belk\\b', 'wazuh', 'sentinel', '\\bkql\\b', 'edr', 'xdr'], level: 'labs', proj: ['P-14'] },
  { k: 'ad', en: 'Active Directory', fr: 'Active Directory', re: ['active directory', 'bloodhound', 'kerberos', '\\bgpo\\b', 'ldap'], level: 'shipped', proj: ['P-18'] },
  { k: 'iam', en: 'Identity and access', fr: 'Identités et accès', re: ['\\biam\\b', 'identit', 'rbac', '\\bsso\\b', '\\bmfa\\b', 'oauth', 'authentification', 'authentication'], level: 'shipped', proj: ['P-06', 'P-03', 'P-09'] },
  { k: 'pentest', en: 'Pentest and offensive security', fr: 'Pentest et sécurité offensive', re: ['pentest', 'test d.intrusion', 'penetration', 'burp', 'metasploit', 'owasp', 'offensi', 'red team'], level: 'labs', proj: ['P-16'] },
  { k: 'grc', en: 'GRC, risk and compliance', fr: 'GRC, risques et conformité', re: ['\\bgrc\\b', 'iso.?27001', 'nis.?2', 'ebios', 'rgpd', 'gdpr', 'risque', '\\brisk', 'conformité', 'compliance', '\\bdora\\b', 'pci'], level: 'labs', proj: ['P-16', 'P-06'] },
  { k: 'python', en: 'Python', fr: 'Python', re: ['python', 'fastapi', 'flask', 'django'], level: 'shipped', proj: ['P-02', 'P-06', 'P-10'] },
  { k: 'js', en: 'TypeScript and JavaScript', fr: 'TypeScript et JavaScript', re: ['typescript', 'javascript', 'node\\.?js', 'react', 'next\\.?js'], level: 'shipped', proj: ['P-01', 'P-03', 'P-05'] },
  { k: 'sql', en: 'SQL and databases', fr: 'SQL et bases de données', re: ['\\bsql\\b', 'postgres', 'mysql', 'sqlite', 'base de données', 'bases de données', 'database'], level: 'shipped', proj: ['P-01', 'P-03', 'P-13'] },
  { k: 'linux', en: 'Linux', fr: 'Linux', re: ['linux', '\\bbash\\b', 'rocky', 'ubuntu', 'debian', 'rhel', 'red hat'], level: 'shipped', proj: ['P-13', 'P-17'] },
  { k: 'monitoring', en: 'Monitoring and SRE', fr: 'Supervision et SRE', re: ['monitoring', 'supervision', 'prometheus', 'grafana', '\\bsre\\b', 'observabilit', 'alerting'], level: 'shipped', proj: ['P-14', 'P-13'] },
  { k: 'web', en: 'Web application security', fr: 'Sécurité des applications web', re: ['application web', 'applications web', 'web application', 'appsec', '\\bxss\\b', 'csrf', '\\bcsp\\b', '\\bapi\\b'], level: 'shipped', proj: ['P-01', 'P-03', 'P-06'] },
  { k: 'pki', en: 'Cryptography and PKI', fr: 'Cryptographie et PKI', re: ['\\bpki\\b', 'cryptograph', '\\btls\\b', 'certificat', 'openssl', 'chiffrement', 'encryption'], level: 'shipped', proj: ['P-19'] },
  { k: 'support', en: 'IT support and incident handling', fr: 'Support IT et gestion d’incidents', re: ['helpdesk', 'help desk', '\\bitil\\b', 'support utilisateur', 'support informatique', 'it support', 'technical support', 'gestion des incidents', 'incident management', 'incident response', 'réponse aux incidents'], level: 'shipped', proj: [] },
  { k: 'english', en: 'English (C1)', fr: 'Anglais (C1)', re: ['anglais', 'english'], level: 'shipped', proj: [] },
  { k: 'german', en: 'German (A2)', fr: 'Allemand (A2)', re: ['allemand', 'german', 'deutsch'], level: 'labs', proj: [] },
  { k: 'dutch', en: 'Dutch', fr: 'Néerlandais', re: ['néerlandais', 'neerlandais', 'dutch', 'nederlands'], level: 'gap', proj: [] },
];

export const examples = {
  en: `Alternance - DevSecOps / Cloud Security Engineer (12 months)
We are looking for an apprentice to join our platform security team in Lyon.
Missions: integrate security controls into our GitLab CI/CD pipelines (SAST, dependency scanning, Trivy), harden our Kubernetes clusters on Azure, write Terraform modules, take part in vulnerability management and ISO 27001 compliance.
Profile: Master's degree in cybersecurity, Python, Linux, Docker, good English. AWS is a plus.`,
  fr: `Alternance - Ingénieur DevSecOps / Sécurité Cloud (12 mois)
Nous recherchons un alternant pour rejoindre notre équipe sécurité plateforme à Lyon.
Missions : intégrer des contrôles de sécurité dans nos pipelines GitLab CI/CD (SAST, scan de dépendances, Trivy), durcir nos clusters Kubernetes sur Azure, écrire des modules Terraform, participer à la gestion des vulnérabilités et à la conformité ISO 27001.
Profil : Master en cybersécurité, Python, Linux, Docker, bon niveau d’anglais. AWS est un plus.`,
};
