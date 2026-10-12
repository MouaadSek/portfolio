// Lab map: draws the network wiring between subnets, sends packets along it,
// and lights up every host that uses a given shared tool.

const NS = 'http://www.w3.org/2000/svg';
type Route = { net: HTMLElement; path: SVGPathElement; len: number };
type Pkt = { route: Route; at: number; dot: SVGCircleElement };

export function initLabs(root: HTMLElement) {
  const d: { tools: { name: string; re: string }[]; line: string } = JSON.parse(root.dataset.labs!);
  const map = root.querySelector<HTMLElement>('[data-lab-map]')!;
  const svg = map.querySelector<SVGSVGElement>('[data-lab-wires]')!;
  const core = map.querySelector<HTMLElement>('[data-lab-core]')!;
  const nets = [...map.querySelectorAll<HTMLElement>('[data-net]')];
  const toolBtns = [...root.querySelectorAll<HTMLButtonElement>('[data-tool]')];
  const proofBtns = [...root.querySelectorAll<HTMLButtonElement>('[data-proof]')];
  const clearBtn = root.querySelector<HTMLButtonElement>('[data-tool-clear]')!;
  const toolLine = root.querySelector<HTMLElement>('[data-tool-line]')!;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let tool: number | null = null;
  let proof = 'all';
  let routes: Route[] = [];
  const wires = new Map<HTMLElement, SVGPathElement>();

  const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string>) => {
    const node = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => node.setAttribute(k, v));
    return node;
  };

  // ---------- wiring ----------
  const draw = () => {
    const m = map.getBoundingClientRect();
    const x0 = 14;
    const c = core.getBoundingClientRect();
    const coreY = c.top - m.top + c.height / 2;
    const coreX = c.left - m.left;
    svg.replaceChildren();
    wires.clear();
    routes = [];
    let lastBus = coreY;
    const branches: SVGPathElement[] = [];
    nets.forEach((net) => {
      const r = net.getBoundingClientRect();
      const top = r.top - m.top;
      const nx = r.left - m.left + 28;
      const bus = top - 24;
      lastBus = Math.max(lastBus, bus);
      const w = el('path', { d: `M${x0} ${bus} H${nx} V${top}`, class: 'lab-wire' });
      branches.push(w);
      wires.set(net, w);
      const full = el('path', { d: `M${coreX} ${coreY} H${x0} V${bus} H${nx} V${top}`, fill: 'none', stroke: 'none' });
      svg.appendChild(full);
      routes.push({ net, path: full, len: full.getTotalLength() });
    });
    svg.appendChild(el('path', { d: `M${coreX} ${coreY} H${x0} V${lastBus}`, class: 'lab-trunk' }));
    branches.forEach((b) => svg.appendChild(b));
    apply(false);
  };

  // ---------- filters ----------
  const apply = (announce = true) => {
    const rx = tool === null ? null : new RegExp(d.tools[tool].re, 'i');
    let total = 0;
    let netsHit = 0;
    nets.forEach((net) => {
      let hits = 0;
      net.querySelectorAll<HTMLElement>('[data-host]').forEach((h) => {
        const okTool = !rx || rx.test(h.dataset.tools ?? '');
        const okProof = proof === 'all' || (proof === 'ev' ? h.dataset.ev === '1' : h.dataset.ev === '0');
        const hit = okTool && okProof;
        h.classList.toggle('is-dim', !hit);
        h.classList.toggle('is-hit', hit && !!rx);
        if (hit) hits++;
      });
      total += hits;
      if (hits) netsHit++;
      net.classList.toggle('is-lit', !!rx && hits > 0);
      net.classList.toggle('is-off', hits === 0);
      wires.get(net)?.classList.toggle('is-lit', !!rx && hits > 0);
    });
    toolBtns.forEach((b, i) => b.setAttribute('aria-pressed', String(i === tool)));
    proofBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.proof === proof)));
    clearBtn.hidden = tool === null;
    if (announce || tool !== null) {
      toolLine.textContent = tool === null ? '' : d.line.replace('{tool}', d.tools[tool].name).replace('{n}', String(total)).replace('{p}', String(netsHit));
    }
  };

  toolBtns.forEach((b, i) => b.addEventListener('click', () => { tool = tool === i ? null : i; apply(); }));
  clearBtn.addEventListener('click', () => { tool = null; apply(); });
  proofBtns.forEach((b) => b.addEventListener('click', () => { proof = b.dataset.proof ?? 'all'; apply(); }));

  new ResizeObserver(() => draw()).observe(map);
  draw();

  // ---------- packets ----------
  if (reduced) return;
  const pkts: Pkt[] = [];
  let visible = false;
  let last = 0;
  let spawnIn = 0;
  let running = false;
  const start = () => { if (!running && visible && !document.hidden) { running = true; last = 0; requestAnimationFrame(tick); } };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; start(); }).observe(map);

  function tick(now: number) {
    if (!visible || document.hidden) { running = false; return; }
    const dt = last ? Math.min(now - last, 50) : 16;
    last = now;
    spawnIn -= dt;
    const pool = routes.filter((r) => !r.net.classList.contains('is-off'));
    if (spawnIn <= 0 && pkts.length < 7 && pool.length) {
      const route = pool[Math.floor(Math.random() * pool.length)];
      const dot = el('circle', { r: '3', class: 'lab-pkt' });
      svg.appendChild(dot);
      pkts.push({ route, at: 0, dot });
      spawnIn = 380 + Math.random() * 420;
    }
    for (let i = pkts.length - 1; i >= 0; i--) {
      const p = pkts[i];
      p.at += dt * 0.42;
      if (p.at >= p.route.len || !p.route.path.isConnected) { p.dot.remove(); pkts.splice(i, 1); continue; }
      const pt = p.route.path.getPointAtLength(p.at);
      p.dot.setAttribute('cx', pt.x.toFixed(1));
      p.dot.setAttribute('cy', pt.y.toFixed(1));
    }
    requestAnimationFrame(tick);
  }
  document.addEventListener('visibilitychange', start);
}
