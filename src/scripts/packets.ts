// Hero background: network packets flowing toward a firewall.
// Legit packets (lime) pass, malicious ones (orange) are dropped with a small burst.
// The pointer acts as a shield that drops malicious packets around it.

type Packet = { x: number; y: number; vx: number; lane: number; bad: boolean; r: number; alive: boolean };
type Spark = { x: number; y: number; vx: number; vy: number; life: number };

export function initPackets(canvas: HTMLCanvasElement, counter: HTMLElement | null, reduced: boolean) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let w = 0, h = 0, wallX = 0, lanes: number[] = [];
  let packets: Packet[] = [];
  let sparks: Spark[] = [];
  let blocked = 0;
  const pointer = { x: -999, y: -999, active: false };
  const LIME = '184,242,90', BAD = '255,138,92', LINE = '36,48,42';

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    wallX = w > 900 ? w * 0.6 : w * 0.82;
    const n = Math.max(6, Math.round(h / 64));
    lanes = Array.from({ length: n }, (_, i) => (h / (n + 1)) * (i + 1));
  };

  const spawn = () => {
    const lane = Math.floor(Math.random() * lanes.length);
    const bad = Math.random() < 0.33;
    packets.push({ x: -10, y: lanes[lane], vx: 2.2 + Math.random() * 2.6, lane, bad, r: bad ? 2.6 : 2, alive: true });
  };

  const burst = (x: number, y: number) => {
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI * 2, s = 0.6 + Math.random() * 1.8;
      sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1 });
    }
    blocked++;
    if (counter) counter.textContent = blocked.toLocaleString();
  };

  const drawStatic = () => {
    ctx.clearRect(0, 0, w, h);
    lanes.forEach((y) => { ctx.strokeStyle = `rgba(${LINE},.55)`; ctx.setLineDash([2, 6]); ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); });
    ctx.setLineDash([]);
    ctx.strokeStyle = `rgba(${LIME},.22)`; ctx.beginPath(); ctx.moveTo(wallX, 0); ctx.lineTo(wallX, h); ctx.stroke();
  };

  let last = performance.now(), acc = 0, raf = 0, visible = true;
  const frame = (t: number) => {
    const dt = Math.min(48, t - last) / 16.67; last = t;
    acc += dt;
    if (acc > 2.2) { spawn(); acc = 0; }
    drawStatic();

    // firewall glow
    const g = ctx.createLinearGradient(wallX - 30, 0, wallX + 2, 0);
    g.addColorStop(0, `rgba(${LIME},0)`); g.addColorStop(1, `rgba(${LIME},.08)`);
    ctx.fillStyle = g; ctx.fillRect(wallX - 30, 0, 32, h);

    // shield
    if (pointer.active) {
      ctx.strokeStyle = `rgba(${LIME},.35)`; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(pointer.x, pointer.y, 46, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = `rgba(${LIME},.04)`; ctx.fill();
    }

    for (const p of packets) {
      if (!p.alive) continue;
      p.x += p.vx * dt;
      if (p.bad) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        if (pointer.active && dx * dx + dy * dy < 46 * 46) { p.alive = false; burst(p.x, p.y); continue; }
        if (p.x >= wallX) { p.alive = false; burst(wallX, p.y); continue; }
      }
      if (p.x > w + 20) { p.alive = false; continue; }
      const col = p.bad ? BAD : LIME;
      // trail
      ctx.strokeStyle = `rgba(${col},.25)`; ctx.lineWidth = p.r;
      ctx.beginPath(); ctx.moveTo(p.x - 7 * p.vx, p.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.fillStyle = `rgba(${col},.95)`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }
    packets = packets.filter((p) => p.alive);

    for (const s of sparks) {
      s.x += s.vx * dt; s.y += s.vy * dt; s.life -= 0.035 * dt;
      ctx.fillStyle = `rgba(${BAD},${Math.max(0, s.life)})`;
      ctx.fillRect(s.x, s.y, 1.6, 1.6);
    }
    sparks = sparks.filter((s) => s.life > 0);
    ctx.lineWidth = 1;
    if (visible) raf = requestAnimationFrame(frame);
  };

  resize();
  window.addEventListener('resize', resize);
  if (reduced) { drawStatic(); return; }

  const host = canvas.parentElement!;
  host.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.active = true;
  });
  host.addEventListener('pointerleave', () => { pointer.active = false; });

  // pause when the hero is off screen
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) { last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); }
  }).observe(canvas);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { visible = false; } else { visible = true; last = performance.now(); raf = requestAnimationFrame(frame); }
  });
}
