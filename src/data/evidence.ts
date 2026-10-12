// Real excerpts from each project, shown in the "Evidence" section of the case studies.
// Code is copied from the repos and reports, trimmed for length, never invented.

export interface Evidence {
  file: string;
  lang: 'yaml' | 'typescript' | 'python' | 'sql' | 'bash' | 'plaintext';
  caption: { en: string; fr: string };
  code: string;
}

export const evidence: Record<string, Evidence[]> = {
  'supply-chain-security': [
    {
      file: 'gatekeeper/templates/no-latest-template.yaml',
      lang: 'yaml',
      caption: {
        en: 'Admission policy in Rego: any pod using the latest tag, or no tag at all, is rejected by the Kubernetes API.',
        fr: 'Politique d’admission en Rego : tout pod qui utilise le tag latest, ou aucun tag, est refusé par l’API Kubernetes.',
      },
      code: `apiVersion: templates.gatekeeper.sh/v1
kind: ConstraintTemplate
metadata:
  name: k8snolatestimage
spec:
  crd:
    spec:
      names:
        kind: K8sNoLatestImage
  targets:
    - target: admission.k8s.gatekeeper.sh
      rego: |
        package k8snolatestimage
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          endswith(container.image, ":latest")
          msg := sprintf("BLOQUE : image '%v' utilise le tag latest.", [container.image])
        }
        violation[{"msg": msg}] {
          container := input.review.object.spec.containers[_]
          not contains(container.image, ":")
          msg := sprintf("BLOQUE : image '%v' n'a pas de tag.", [container.image])
        }`,
    },
    {
      file: '.gitlab-ci.yml',
      lang: 'yaml',
      caption: {
        en: 'The CI gate: Trivy exits with code 1 on any CRITICAL or HIGH finding, so the push stage never runs.',
        fr: 'La barrière CI : Trivy sort en code 1 sur toute vulnérabilité CRITICAL ou HIGH, donc l’étape de push ne s’exécute jamais.',
      },
      code: `variables:
  IMAGE_TAG: "$CI_REGISTRY_IMAGE:$CI_COMMIT_SHORT_SHA"
  TRIVY_SEVERITY: "CRITICAL,HIGH"

stages: [build, scan, push]

trivy-image-scan:
  stage: scan
  script:
    - trivy image --input image.tar --severity "$TRIVY_SEVERITY" --exit-code 1 --format table
    - trivy image --input image.tar --format json --output trivy-report.json
  allow_failure: false

safety-scan:
  stage: scan
  script:
    - pip install safety
    - safety check -r app/requirements.txt --full-report --output text
  allow_failure: false`,
    },
  ],

  travistello: [
    {
      file: 'src/lib/outbound.ts',
      lang: 'typescript',
      caption: {
        en: 'Every outbound link goes through this check: only http(s), never embedded credentials. Destinations come from the database, never from the URL.',
        fr: 'Chaque lien sortant passe par ce contrôle : uniquement http(s), jamais d’identifiants intégrés. Les destinations viennent de la base, jamais de l’URL.',
      },
      code: `export const getSafeOutboundURL = (value: null | string | undefined) => {
  if (!value) return null;

  try {
    const url = new URL(value);

    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return null;

    return url;
  } catch {
    return null;
  }
};`,
    },
    {
      file: 'src/app/go/[token]/route.ts',
      lang: 'typescript',
      caption: {
        en: 'The /go/[token] redirect: the token is looked up server-side, inactive offers return 404, and bots never create click records.',
        fr: 'La redirection /go/[token] : le token est résolu côté serveur, les offres inactives renvoient 404, et les bots ne créent jamais de clic.',
      },
      code: `export async function GET(request: NextRequest, { params }: RouteContext) {
  const { token } = await params;
  const offers = await payload.find({
    collection: "offers",
    limit: 1,
    where: {
      and: [
        { publicToken: { equals: token } },
        { status: { equals: "active" } },
      ],
    },
  });
  const offer = offers.docs[0];

  if (!offer || !isPublicOffer(offer))
    return new NextResponse("Offer not found.", { status: 404 });

  const destination = getSafeOutboundURL(offer.affiliateUrl || offer.destinationUrl);
  if (!destination)
    return new NextResponse("Offer destination is unavailable.", { status: 503 });

  const bot = isLikelyBot(request.headers.get("user-agent"));
  // ... only non-bot clicks are recorded, with no IP address
}`,
    },
  ],

  jobpilot: [
    {
      file: 'src/jobpilot/state.py',
      lang: 'python',
      caption: {
        en: 'The only function allowed to change an application status: illegal transitions raise, and every change is written to the audit log in the same transaction.',
        fr: 'La seule fonction autorisée à modifier un statut : les transitions illégales lèvent une exception, et chaque changement est journalisé dans la même transaction.',
      },
      code: `def transition(
    db: sqlite3.Connection,
    application_id: int,
    to_status: str,
    *,
    detail: dict | None = None,
) -> str:
    """Move an application to to_status if legal; log a status_change event."""
    frm = current_status(db, application_id)
    allowed = LEGAL.get(frm, set())
    if to_status not in allowed:
        raise IllegalTransition(
            f"application {application_id}: {frm} -> {to_status} not allowed "
            f"(legal: {sorted(allowed) or 'none, terminal'})"
        )

    now = _utc_now()
    db.execute(
        "UPDATE applications SET status = ?, last_event_at = ? WHERE id = ?",
        (to_status, now, application_id),
    )
    payload = {"from": frm, "to": to_status, **(detail or {})}
    log_event(db, application_id, "status_change", payload, commit=False)
    db.commit()
    return to_status`,
    },
  ],

  ladress: [
    {
      file: 'supabase/migrations/001_initial_schema.sql',
      lang: 'sql',
      caption: {
        en: 'Row-level security: visitors can only insert a reservation, never read one. Reading and managing is reserved to admins.',
        fr: 'Sécurité au niveau des lignes : un visiteur peut seulement créer une réservation, jamais en lire une. Lecture et gestion sont réservées aux admins.',
      },
      code: `ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can insert reservations"
  ON public.reservations FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "admins can manage reservations"
  ON public.reservations FOR ALL
  TO authenticated
  USING (is_admin());`,
    },
    {
      file: 'src/lib/rate-limit.ts',
      lang: 'typescript',
      caption: {
        en: 'Per-endpoint rate limits on the public forms. The comment flags the known limitation, picked up in the lessons below.',
        fr: 'Limites de débit par endpoint sur les formulaires publics. Le commentaire signale la limite connue, reprise dans le retour d’expérience.',
      },
      code: `import { RateLimiterMemory } from 'rate-limiter-flexible'

// NOTE: In-memory limiters reset on cold starts in serverless environments.
// For production, swap to RateLimiterRedis or RateLimiterPostgres.

const limiters = {
  reservation: new RateLimiterMemory({ points: 5, duration: 3600 }),
  devis: new RateLimiterMemory({ points: 3, duration: 3600 }),
  contact: new RateLimiterMemory({ points: 5, duration: 3600 }),
} as const`,
    },
  ],

  'canritco-audit': [
    {
      file: 'Audit/nmap_scan.txt',
      lang: 'plaintext',
      caption: {
        en: 'Raw evidence behind risks R5 and R6: only two ports exposed, and 445 gives access to the over-permissive SMB share.',
        fr: 'La preuve brute derrière les risques R5 et R6 : seuls deux ports exposés, et le 445 donne accès au partage SMB trop permissif.',
      },
      code: `Starting Nmap 7.98 ( https://nmap.org ) at 2026-03-15 00:53 +0100
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00096s latency).
Not shown: 998 closed tcp ports (reset)
PORT    STATE SERVICE       VERSION
135/tcp open  msrpc         Microsoft Windows RPC
445/tcp open  microsoft-ds?
Service Info: OS: Windows; CPE: cpe:/o:microsoft:windows

Nmap done: 1 IP address (1 host up) scanned in 6.66 seconds`,
    },
    {
      file: 'Audit/hardeningkitty_report_canritco-pc01.csv',
      lang: 'plaintext',
      caption: {
        en: 'First lines of the 621-check CIS baseline export, the source of the 3.24 / 6 score and the password policy recommendations.',
        fr: 'Premières lignes de l’export de la baseline CIS (621 contrôles), source du score de 3,24 / 6 et des recommandations sur les mots de passe.',
      },
      code: `"ID","Category","Name","Severity","Result","Recommended","TestResult"
"1.1.1","Account Policies","Length of password history maintained","Low","None","24","Failed"
"1.1.2","Account Policies","Maximum password age","Passed","42","365","Passed"`,
    },
  ],

  netsecure: [
    {
      file: 'configurations/firewall.nft',
      lang: 'bash',
      caption: {
        en: 'Default-deny forwarding between VLANs: admins reach everything, employees only DNS and the file server, guests only the Internet.',
        fr: 'Filtrage inter-VLAN en refus par défaut : les admins accèdent à tout, les employés seulement au DNS et au serveur de fichiers, les invités seulement à Internet.',
      },
      code: `table inet filter {
    chain forward {
        type filter hook forward priority 0;
        policy drop;

        ct state established,related accept

        # admin VLAN: full access
        ip saddr 10.10.10.0/24 accept

        # employees: internal DNS and file server only
        ip saddr 10.10.20.0/24 ip daddr 10.10.30.10 udp dport 53 accept
        ip saddr 10.10.20.0/24 ip daddr 10.10.30.20 tcp dport 445 accept

        # Internet to DMZ web server
        ip daddr 10.10.40.10 tcp dport 443 accept

        # guests: Internet only, no internal access
        ip saddr 10.10.50.0/24 ip daddr 10.10.0.0/8 drop
        ip saddr 10.10.50.0/24 accept

        log prefix "FORWARD_DROP: " drop
    }
}`,
    },
    {
      file: 'configurations/netsecure.rules',
      lang: 'plaintext',
      caption: {
        en: 'Custom Suricata rules written for the threats found in the capture, including a threshold to catch the SYN scan.',
        fr: 'Règles Suricata écrites pour les menaces trouvées dans la capture, dont un seuil pour détecter le scan SYN.',
      },
      code: `# telnet
alert tcp any any -> any 23 (msg:"NETSECURE TELNET CONNECTION DETECTED"; sid:1000001; rev:1;)

# port scan: 5 SYN in 10 seconds from the same source
alert tcp any any -> any any (flags:S; msg:"NETSECURE POSSIBLE PORT SCAN"; threshold:type both, track by_src, count 5, seconds 10; sid:1000002; rev:1;)

# session cookie in clear text (session hijacking)
alert tcp any any -> any any (content:"Cookie:"; msg:"NETSECURE SESSION COOKIE OBSERVED"; sid:1000006; rev:1;)`,
    },
  ],
};
