// Lab map: every project, grouped by the infrastructure it runs on.
// Hosts either point at an evidenced project (P-xx, from site.ts) or are labs and
// coursework (L-xx) done in class or in a home lab, with no public artifact.
// Numbers in comments are the line in the original project bank, for traceability.

export type Zone = 'core' | 'also';
export type LabHost = { id: string; en: string; fr: string; stack: string[] };
export type Platform = {
  key: string;
  net: string;
  zone: Zone;
  en: { name: string; base: string };
  fr: { name: string; base: string };
  hosts: (string | LabHost)[]; // string = existing P-xx id
};

export const platforms: Platform[] = [
  {
    key: 'products', net: '10.0.1.0/24', zone: 'core',
    en: { name: 'Products in production', base: 'Vercel · VPS · PostgreSQL · Docker' },
    fr: { name: 'Produits en production', base: 'Vercel · VPS · PostgreSQL · Docker' },
    hosts: ['P-01', 'P-02', 'P-03', 'P-04', 'P-05', 'P-06', 'P-07', 'P-08'],
  },
  {
    key: 'k8s', net: '10.0.2.0/24', zone: 'core',
    en: { name: 'Kubernetes & GitLab delivery', base: 'kind cluster · GitLab runner · container registry · Trivy' },
    fr: { name: 'Kubernetes & livraison GitLab', base: 'Cluster kind · runner GitLab · registre d’images · Trivy' },
    hosts: [
      'P-09', 'P-10', 'P-11', 'P-12',
      { id: 'L-01', en: 'Secure CI/CD with automated security gates', fr: 'CI/CD sécurisée avec contrôles automatisés', stack: ['GitLab CI', 'Semgrep', 'Bandit', 'OWASP ZAP', 'Trivy', 'Docker', 'Flask'] }, // 2
      { id: 'L-02', en: 'Container orchestration and automated deploys', fr: 'Orchestration de conteneurs et déploiement automatisé', stack: ['Docker', 'Kubernetes', 'GitLab CI', 'Nginx', 'PostgreSQL'] }, // 38
      { id: 'L-03', en: 'Kubernetes hardening and compliance', fr: 'Durcissement et conformité Kubernetes', stack: ['Kubernetes', 'kind', 'NetworkPolicies', 'Pod Security Standards', 'Trivy'] }, // 55
    ],
  },
  {
    key: 'azure', net: '10.0.3.0/24', zone: 'core',
    en: { name: 'Azure tenant', base: 'Entra ID · VNet + NSG · Log Analytics · Terraform state' },
    fr: { name: 'Tenant Azure', base: 'Entra ID · VNet + NSG · Log Analytics · état Terraform' },
    hosts: [
      'P-13', 'P-15',
      { id: 'L-04', en: 'Cloud detection with Sentinel', fr: 'Détection cloud avec Sentinel', stack: ['Azure Sentinel', 'KQL', 'Log Analytics', 'NSG Flow Logs', 'Entra ID'] }, // 14, 54
      { id: 'L-05', en: 'Azure hardening and compliance', fr: 'Durcissement et conformité Azure', stack: ['Azure IAM', 'NSG', 'Defender for Cloud', 'VM', 'VNet'] }, // 29, 53
      { id: 'L-06', en: 'Azure IAM governance', fr: 'Gouvernance IAM Azure', stack: ['Entra ID', 'RBAC', 'Conditional Access', 'MFA', 'Azure Policy'] }, // 34
      { id: 'L-07', en: 'Secure multi-tier Azure infrastructure', fr: 'Infrastructure Azure multi-tiers sécurisée', stack: ['Terraform', 'PowerShell', 'NSG', 'Azure Monitor'] }, // 36
    ],
  },
  {
    key: 'ad', net: '10.0.4.0/24', zone: 'core',
    en: { name: 'Active Directory lab', base: 'Proxmox · Windows Server · pfSense' },
    fr: { name: 'Lab Active Directory', base: 'Proxmox · Windows Server · pfSense' },
    hosts: [
      'P-18',
      { id: 'L-08', en: 'Active Directory audit and hardening', fr: 'Audit et durcissement Active Directory', stack: ['PingCastle', 'BloodHound', 'GPO', 'LAPS'] }, // 33
      { id: 'L-09', en: 'Active Directory penetration test', fr: 'Test d’intrusion Active Directory', stack: ['BloodHound', 'Mimikatz', 'Rubeus', 'PowerView'] }, // 39
      { id: 'L-10', en: 'Identity lifecycle automation', fr: 'Automatisation du cycle de vie des identités', stack: ['PowerShell', 'Active Directory', 'GPO', 'Scheduled Tasks'] }, // 35
      { id: 'L-11', en: 'Multi-server virtualization', fr: 'Virtualisation multi-serveurs', stack: ['Proxmox', 'Windows Server', 'pfSense', 'Zabbix'] }, // 37
      { id: 'L-12', en: 'Centralized AD and network services', fr: 'AD et services réseau centralisés', stack: ['Active Directory', 'DNS', 'DHCP', 'pfSense'] }, // 46, 51
      { id: 'L-13', en: 'IT fleet management automation', fr: 'Automatisation de la gestion de parc', stack: ['PowerShell', 'GPO', 'Intune', 'Windows Server'] }, // 50
    ],
  },
  {
    key: 'soc', net: '10.0.5.0/24', zone: 'core',
    en: { name: 'Detection stack', base: 'Elasticsearch · Kibana · Wazuh manager · Filebeat' },
    fr: { name: 'Stack de détection', base: 'Elasticsearch · Kibana · manager Wazuh · Filebeat' },
    hosts: [
      'P-14',
      { id: 'L-14', en: 'SOC lab: intrusion detection and response', fr: 'SOC lab : détection d’intrusion et réponse', stack: ['ELK', 'Filebeat', 'Wazuh', 'Sigma', 'Windows event logs'] }, // 12
      { id: 'L-15', en: 'Endpoint compromise detection', fr: 'Détection de compromission sur les postes', stack: ['Wazuh', 'Elasticsearch', 'Kibana', 'OSSEC rules'] }, // 48
    ],
  },
  {
    key: 'range', net: '10.0.6.0/24', zone: 'core',
    en: { name: 'Attack range & AppSec', base: 'Kali · OWASP Juice Shop · DVWA · VirtualBox' },
    fr: { name: 'Range offensif & AppSec', base: 'Kali · OWASP Juice Shop · DVWA · VirtualBox' },
    hosts: [
      'P-16',
      { id: 'L-16', en: 'Web security audit', fr: 'Audit de sécurité web', stack: ['Burp Suite', 'SQLmap', 'OWASP ZAP', 'Juice Shop', 'DVWA'] }, // 1, 40, 43
      { id: 'L-17', en: 'Application threat modeling', fr: 'Modélisation des menaces applicatives', stack: ['STRIDE', 'DFD', 'Code review', 'Flask', 'REST API'] }, // 3
      { id: 'L-18', en: 'Attack simulation and remediation', fr: 'Simulation d’attaques et remédiation', stack: ['Kali', 'Nmap', 'Metasploit', 'Hydra', 'OpenVAS'] }, // 41, 49
    ],
  },
  {
    key: 'net', net: '10.0.7.0/24', zone: 'core',
    en: { name: 'Network lab', base: 'GNS3 · Cisco IOS · Linux routers' },
    fr: { name: 'Lab réseau', base: 'GNS3 · Cisco IOS · routeurs Linux' },
    hosts: [
      'P-17', 'P-19',
      { id: 'L-19', en: 'Multi-site routing and IPsec', fr: 'Routage multi-sites et IPsec', stack: ['GNS3', 'Cisco IOS', 'OSPF', 'BGP', 'VLANs', 'IPsec'] }, // 45
      { id: 'L-20', en: 'Network monitoring and alerting', fr: 'Supervision réseau et alertes', stack: ['Zabbix', 'SNMP', 'Grafana', 'Python'] }, // 47
    ],
  },
  {
    key: 'grc', net: '10.0.8.0/24', zone: 'core',
    en: { name: 'Governance & risk', base: 'ISO 27001:2022 · NIS2 · EBIOS RM · CIS Benchmarks' },
    fr: { name: 'Gouvernance & risques', base: 'ISO 27001:2022 · NIS2 · EBIOS RM · CIS Benchmarks' },
    hosts: [
      { id: 'L-21', en: 'ISO 27001 compliance audit and NIS2 roadmap', fr: 'Audit de conformité ISO 27001 et feuille de route NIS2', stack: ['ISO 27001', 'ISO 27002', 'NIS2', 'CIS Benchmarks'] }, // 11, 28
      { id: 'L-22', en: 'EBIOS RM risk analysis', fr: 'Analyse de risques EBIOS RM', stack: ['EBIOS RM', 'Asset mapping', 'Risk matrix', 'Treatment plan'] }, // 13, 27
    ],
  },
  {
    key: 'apps', net: '10.1.1.0/24', zone: 'also',
    en: { name: 'Application backends', base: 'Docker Compose · PostgreSQL · MongoDB · Redis' },
    fr: { name: 'Backends applicatifs', base: 'Docker Compose · PostgreSQL · MongoDB · Redis' },
    hosts: [
      { id: 'L-23', en: 'Multi-module e-commerce REST API', fr: 'API REST e-commerce multi-modules', stack: ['Flask', 'PostgreSQL', 'JWT', 'Swagger', 'Pytest'] }, // 4
      { id: 'L-24', en: 'Real-time ticketing backend', fr: 'Backend de tickets temps réel', stack: ['Node.js', 'Express', 'MongoDB', 'Redis', 'WebSocket'] }, // 5
      { id: 'L-25', en: 'Data collection microservices', fr: 'Microservices de collecte de données', stack: ['Python', 'RabbitMQ', 'Docker', 'PostgreSQL'] }, // 6
      { id: 'L-26', en: 'Job application tracker', fr: 'Suivi de candidatures', stack: ['React', 'Flask', 'PostgreSQL', 'JWT', 'Docker'] }, // 24
      { id: 'L-27', en: 'Collaborative notes platform', fr: 'Plateforme de notes collaborative', stack: ['Vue.js', 'Express', 'MongoDB', 'WebSocket'] }, // 25
      { id: 'L-28', en: 'Dynamic portfolio and blog', fr: 'Portfolio et blog dynamique', stack: ['Next.js', 'PostgreSQL', 'Vercel', 'REST API'] }, // 26
    ],
  },
  {
    key: 'qa', net: '10.1.2.0/24', zone: 'also',
    en: { name: 'Test automation', base: 'GitHub Actions · Docker' },
    fr: { name: 'Automatisation des tests', base: 'GitHub Actions · Docker' },
    hosts: [
      { id: 'L-29', en: 'End-to-end test framework', fr: 'Framework de tests de bout en bout', stack: ['Python', 'Selenium', 'Pytest', 'GitHub Actions', 'Docker'] }, // 42
      { id: 'L-30', en: 'API test automation in CI', fr: 'Tests d’API automatisés en CI', stack: ['Postman', 'Newman', 'GitHub Actions', 'JSON Schema'] }, // 44
    ],
  },
  {
    key: 'data', net: '10.1.3.0/24', zone: 'also',
    en: { name: 'Data & ML', base: 'Python · Pandas · Jupyter' },
    fr: { name: 'Data & ML', base: 'Python · Pandas · Jupyter' },
    hosts: [
      { id: 'L-31', en: 'Automated log collection pipeline', fr: 'Pipeline de collecte de logs automatisé', stack: ['Airflow', 'PostgreSQL', 'Grafana', 'Pandas'] }, // 15
      { id: 'L-32', en: 'Incident and performance BI dashboard', fr: 'Tableau de bord BI incidents et performance', stack: ['Power BI', 'SQL', 'DAX', 'Python ETL'] }, // 16
      { id: 'L-33', en: 'Large-scale data lake', fr: 'Data lake à grande échelle', stack: ['Azure Data Factory', 'PySpark', 'BigQuery', 'Docker'] }, // 17
      { id: 'L-34', en: 'Automatic IT incident classification', fr: 'Classification automatique d’incidents IT', stack: ['scikit-learn', 'Pandas', 'NLTK', 'Jupyter'] }, // 30
      { id: 'L-35', en: 'Network anomaly detection with deep learning', fr: 'Détection d’anomalies réseau par deep learning', stack: ['TensorFlow', 'Keras', 'Pandas', 'Colab'] }, // 31
      { id: 'L-36', en: 'Tech support chatbot (NLP)', fr: 'Chatbot de support technique (NLP)', stack: ['spaCy', 'Flask', 'SQLite', 'Hugging Face'] }, // 32
    ],
  },
  {
    key: 'itsm', net: '10.1.4.0/24', zone: 'also',
    en: { name: 'Delivery & IT service', base: 'Jira · Confluence · ITIL' },
    fr: { name: 'Pilotage & service IT', base: 'Jira · Confluence · ITIL' },
    hosts: [
      { id: 'L-37', en: 'Azure cloud deployment: scoping and project lead', fr: 'Déploiement cloud Azure : cadrage et pilotage', stack: ['Jira', 'Confluence', 'Gantt', 'Azure'] }, // 7, 10
      { id: 'L-38', en: 'Change management for a monitoring migration', fr: 'Conduite du changement : migration de supervision', stack: ['RACI', 'Risk matrix', 'Notion'] }, // 8
      { id: 'L-39', en: 'IT support process standardization and knowledge base', fr: 'Standardisation du support IT et base de connaissances', stack: ['ITIL', 'Confluence', 'Salesforce'] }, // 9, 52
    ],
  },
];

export const labCount = platforms.flatMap((p) => p.hosts).filter((h) => typeof h !== 'string').length;
