// Skills constellation: tools and projects as a force-directed graph on a canvas.
// Hover or pick a tool to light up the projects that use it.

type Node = { id: string; kind: 'tool' | 'project'; label: string; track?: string; href?: string; x: number; y: number; vx: number; vy: number; deg: number };
type Data = { tools: string[]; projects: { id: string; title: string; track: string; href?: string; tools: string[] }[]; colors: Record<string, string> };

export function initGraph(root: HTMLElement, reduced: boolean) {
  const data: Data = JSON.parse(root.dataset.graph!);
  const canvas = root.querySelector<HTMLCanvasElement>('canvas')!;
  const ctx = canvas.getContext('2d')!;
  const panel = root.querySelector<HTMLElement>('[data-g-panel]')!;
  const panelTitle = root.querySelector<HTMLElement>('[data-g-title]')!;
  const panelList = root.querySelector<HTMLElement>('[data-g-list]')!;
  const chips = root.querySelectorAll<HTMLButtonElement>('[data-g-tool]');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0;

  const nodes: Node[] = [];
  const byId = new Map<string, Node>();
  const add = (n: Omit<Node, 'x' | 'y' | 'vx' | 'vy' | 'deg'>) => {
    const node = { ...n, x: 0, y: 0, vx: 0, vy: 0, deg: 0 };
    nodes.push(node); byId.set(n.id, node);
  };
  data.tools.forEach((t) => add({ id: `t:${t}`, kind: 'tool', label: t }));
  data.projects.forEach((p) => add({ id: `p:${p.id}`, kind: 'project', label: p.title, track: p.track, href: p.href }));
  const edges: [Node, Node][] = [];
  data.projects.forEach((p) => p.tools.forEach((t) => {
    const a = byId.get(`p:${p.id}`)!, b = byId.get(`t:${t}`);
    if (b) { edges.push([a, b]); a.deg++; b.deg++; }
  }));
  const neighbors = new Map<Node, Set<Node>>();
  nodes.forEach((n) => neighbors.set(n, new Set()));
  edges.forEach(([a, b]) => { neighbors.get(a)!.add(b); neighbors.get(b)!.add(a); });

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const first = w === 0;
    const sx = first ? 1 : r.width / w, sy = first ? 1 : r.height / h;
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (first) {
      // seeded layout: tools on an inner ring, projects outside, then relax
      nodes.forEach((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 * 7.3;
        const rad = (n.kind === 'tool' ? 0.25 : 0.42) * Math.min(w, h);
        n.x = w / 2 + Math.cos(a) * rad; n.y = h / 2 + Math.sin(a) * rad;
      });
      for (let i = 0; i < 300; i++) step(Math.max(1, (w / 8) * (1 - i / 300)));
    } else nodes.forEach((n) => { n.x *= sx; n.y *= sy; });
  };

  // Fruchterman-Reingold layout. temp controls how far nodes may move per step.
  function step(temp: number) {
    const k = Math.sqrt((w * h) / nodes.length) * 0.5;
    nodes.forEach((n) => { n.vx = 0; n.vy = 0; });
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y; const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const f = (k * k) / d;
        a.vx += (dx / d) * f; a.vy += (dy / d) * f; b.vx -= (dx / d) * f; b.vy -= (dy / d) * f;
      }
    }
    edges.forEach(([a, b]) => {
      const dx = a.x - b.x, dy = a.y - b.y; const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const f = (d * d) / k;
      a.vx -= (dx / d) * f; a.vy -= (dy / d) * f; b.vx += (dx / d) * f; b.vy += (dy / d) * f;
    });
    nodes.forEach((n) => {
      // gentle pull to the centre, stronger vertically for a wide layout
      n.vx += (w / 2 - n.x) * 0.55; n.vy += (h / 2 - n.y) * 1.1;
      const d = Math.sqrt(n.vx * n.vx + n.vy * n.vy) || 0.01;
      n.x += (n.vx / d) * Math.min(d, temp); n.y += (n.vy / d) * Math.min(d, temp);
      const pad = n.kind === 'tool' ? 56 : 16;
      n.x = Math.max(pad, Math.min(w - pad, n.x)); n.y = Math.max(28, Math.min(h - 16, n.y));
    });
  }

  let hover: Node | null = null;
  let pinned: Node | null = null;
  const focus = () => pinned ?? hover;
  const radius = (n: Node) => (n.kind === 'tool' ? 4 + Math.min(n.deg, 8) * 1.1 : 4.5);

  const draw = (t: number) => {
    ctx.clearRect(0, 0, w, h);
    const f = focus();
    const lit = f ? new Set([f, ...neighbors.get(f)!]) : null;
    edges.forEach(([a, b]) => {
      const on = lit && lit.has(a) && lit.has(b) && (a === f || b === f);
      ctx.strokeStyle = on ? 'rgba(184,242,90,.65)' : lit ? 'rgba(36,48,42,.35)' : 'rgba(46,58,51,.7)';
      ctx.lineWidth = on ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });
    nodes.forEach((n) => {
      const dim = lit && !lit.has(n);
      const r = radius(n) + (n === f ? 2 + Math.sin(t / 300) : 0);
      if (n.kind === 'tool') {
        ctx.fillStyle = dim ? 'rgba(15,19,17,.9)' : '#0f1311';
        ctx.strokeStyle = dim ? 'rgba(184,242,90,.15)' : 'rgba(184,242,90,.9)';
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        const small = w < 640;
        if (!small || n === f || n.deg >= 4 || (lit && lit.has(n))) {
          ctx.font = `500 ${small ? 10 : 11}px "JetBrains Mono Variable", monospace`;
          ctx.fillStyle = dim ? 'rgba(140,154,146,.25)' : n === f ? '#d6ff8f' : '#c4cec8';
          const tw = ctx.measureText(n.label).width;
          ctx.textAlign = 'left';
          ctx.fillText(n.label, Math.max(4, Math.min(w - tw - 4, n.x - tw / 2)), n.y - r - 6);
        }
      } else {
        const col = data.colors[n.track!] ?? '#c4cec8';
        ctx.globalAlpha = dim ? 0.18 : 1;
        ctx.fillStyle = col;
        ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2);
        ctx.globalAlpha = 1;
        if ((lit && lit.has(n) && !dim) || n === hover) {
          ctx.font = '500 12px Geist, sans-serif';
          ctx.fillStyle = '#e8ede9'; ctx.textAlign = 'left';
          const tw = ctx.measureText(n.label).width;
          const right = n.x + 10, left = n.x - tw - 10;
          const tx = right + tw < w - 4 ? right : left > 4 ? left : Math.max(4, w - tw - 4);
          ctx.fillText(n.label, tx, n.y + 4);
        }
      }
    });
  };

  const showPanel = (n: Node | null) => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(!!n && c.dataset.gTool === n.label)));
    if (!n || n.kind !== 'tool') { panel.hidden = true; return; }
    panel.hidden = false;
    panelTitle.textContent = n.label;
    panelList.replaceChildren();
    [...neighbors.get(n)!].forEach((p) => {
      const li = document.createElement('li');
      const el = document.createElement(p.href ? 'a' : 'span');
      if (p.href) (el as HTMLAnchorElement).href = p.href;
      el.className = p.href ? 'text-fg hover:text-accent' : 'text-fg-2';
      el.textContent = p.label;
      li.appendChild(el); panelList.appendChild(li);
    });
  };

  const pick = (x: number, y: number) => {
    let best: Node | null = null, bd = 22 * 22;
    nodes.forEach((n) => { const d = (n.x - x) ** 2 + (n.y - y) ** 2; if (d < bd) { bd = d; best = n; } });
    return best as Node | null;
  };
  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    hover = pick(e.clientX - r.left, e.clientY - r.top);
    canvas.style.cursor = hover ? 'pointer' : 'default';
  });
  canvas.addEventListener('pointerleave', () => { hover = null; });
  canvas.addEventListener('click', (e) => {
    const r = canvas.getBoundingClientRect();
    const n = pick(e.clientX - r.left, e.clientY - r.top);
    if (n?.kind === 'project' && n.href) { window.location.href = n.href; return; }
    pinned = n && n !== pinned ? n : null;
    showPanel(pinned);
  });
  chips.forEach((c) => c.addEventListener('click', () => {
    const n = byId.get(`t:${c.dataset.gTool}`)!;
    pinned = pinned === n ? null : n;
    showPanel(pinned);
  }));

  resize();
  window.addEventListener('resize', resize);
  let running = false;
  const loop = (t: number) => { if (!reduced) step(0.35); draw(t); if (running) requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => {
    const was = running; running = e.isIntersecting;
    if (running && !was) requestAnimationFrame(loop);
  }).observe(canvas);
  draw(0);
}
