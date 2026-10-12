// All interactivity lives here: no inline scripts, so a strict CSP holds.
const root = document.documentElement;
root.classList.add('js');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
  { rootMargin: '0px 0px -8% 0px' },
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

/* ---------- pointer spotlight on cards ---------- */
document.querySelectorAll<HTMLElement>('.spot').forEach((el) => {
  el.addEventListener('pointermove', (ev) => {
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${ev.clientX - r.left}px`);
    el.style.setProperty('--my', `${ev.clientY - r.top}px`);
  });
});

/* ---------- nav border once scrolled ---------- */
const nav = document.querySelector<HTMLElement>('[data-nav]');
const onScroll = () => nav?.classList.toggle('border-line', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- animated counters ---------- */
const counters = document.querySelectorAll<HTMLElement>('[data-count]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target as HTMLElement;
    cio.unobserve(el);
    const end = Number(el.dataset.count);
    if (reduced) { el.textContent = end.toLocaleString(el.dataset.locale ?? 'en-US'); return; }
    const t0 = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(end * eased).toLocaleString(el.dataset.locale ?? 'en-US');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.6 });
counters.forEach((c) => cio.observe(c));

/* ---------- terminal typing ---------- */
const term = document.querySelector<HTMLElement>('[data-type]');
if (term && !reduced) {
  const text = term.dataset.type ?? '';
  term.textContent = '';
  let i = 0;
  const step = () => { term.textContent = text.slice(0, ++i); if (i < text.length) setTimeout(step, 45 + Math.random() * 50); };
  setTimeout(step, 500);
}

/* ---------- project filters ---------- */
const chips = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
const rows = document.querySelectorAll<HTMLElement>('[data-track]');
const shown = document.querySelector<HTMLElement>('[data-shown]');
chips.forEach((chip) => chip.addEventListener('click', () => {
  const f = chip.dataset.filter!;
  chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
  let n = 0;
  rows.forEach((r) => { const on = f === 'All' || r.dataset.track === f; r.hidden = !on; if (on) n++; });
  if (shown) shown.textContent = String(n);
}));

/* ---------- copy email ---------- */
async function copyEmail(btn?: HTMLElement) {
  const email = document.body.dataset.email ?? 'mouaadsekkourii@gmail.com';
  try { await navigator.clipboard.writeText(email); } catch { /* clipboard blocked */ }
  if (btn) { const old = btn.textContent; btn.textContent = document.body.dataset.copied ?? 'Copied'; setTimeout(() => (btn.textContent = old), 1500); }
}
document.querySelectorAll<HTMLElement>('[data-copy-email]').forEach((b) => b.addEventListener('click', () => copyEmail(b.querySelector('[data-copy-label]') as HTMLElement ?? b)));

/* ---------- command palette ---------- */
const dlg = document.querySelector<HTMLDialogElement>('[data-palette]');
if (dlg) {
  const input = dlg.querySelector<HTMLInputElement>('[data-palette-input]')!;
  const items = Array.from(dlg.querySelectorAll<HTMLLIElement>('[data-item]'));
  const empty = dlg.querySelector<HTMLElement>('[data-palette-empty]')!;
  let active = 0;
  const visible = () => items.filter((i) => !i.hidden);
  const select = (idx: number) => {
    const v = visible();
    if (!v.length) return;
    active = (idx + v.length) % v.length;
    v.forEach((el, k) => el.setAttribute('aria-selected', String(k === active)));
    v[active].scrollIntoView({ block: 'nearest' });
  };
  const run = (el?: HTMLElement) => {
    if (!el) return;
    if (el.dataset.action === 'copy-email') { copyEmail(); dlg.close(); return; }
    const href = el.dataset.href;
    if (!href) return;
    dlg.close();
    if (href.startsWith('http')) window.open(href, '_blank', 'noopener');
    else window.location.href = href;
  };
  const open = () => { input.value = ''; filter(); dlg.showModal(); input.focus(); };
  const filter = () => {
    const q = input.value.trim().toLowerCase();
    items.forEach((i) => (i.hidden = !!q && !q.split(/\s+/).every((w) => i.dataset.text!.includes(w))));
    empty.hidden = visible().length > 0;
    select(0);
  };
  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); select(active + 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); select(active - 1); }
    if (e.key === 'Enter') { e.preventDefault(); run(visible()[active]); }
  });
  items.forEach((i) => {
    i.addEventListener('click', () => run(i));
    i.addEventListener('pointermove', () => select(visible().indexOf(i)));
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  document.querySelectorAll('[data-palette-open]').forEach((b) => b.addEventListener('click', open));
  input.closest('dialog')!.addEventListener('keydown', (e) => e.stopPropagation());
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); dlg.open ? dlg.close() : open(); }
  });
}
