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

/* ---------- copy code blocks ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy-code]').forEach((btn) => btn.addEventListener('click', async () => {
  const code = btn.closest('figure')?.querySelector('code')?.textContent ?? '';
  try { await navigator.clipboard.writeText(code); } catch { /* clipboard blocked */ }
  const old = btn.textContent;
  btn.textContent = document.body.dataset.copied ?? 'Copied';
  setTimeout(() => (btn.textContent = old), 1500);
}));

/* ---------- interactive terminal ---------- */
type TermData = {
  lang: string; email: string; cv: string; pdf: string; alt: string; home: string;
  cases: { id: string; slug: string; title: string; track: string; href: string }[];
  skills: { name: string; tools: string[] }[];
  t: Record<string, any>;
};
const termEl = document.querySelector<HTMLElement>('[data-terminal]');
if (termEl) {
  const d: TermData = JSON.parse(termEl.dataset.terminal!);
  const T = d.t;
  const out = termEl.querySelector<HTMLElement>('[data-term-out]')!;
  const form = termEl.querySelector<HTMLFormElement>('[data-term-form]')!;
  const input = termEl.querySelector<HTMLInputElement>('[data-term-input]')!;
  const history: string[] = [];
  let hIdx = 0;
  const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');

  const line = (text: string, cls = '') => {
    const el = document.createElement('div');
    if (cls) el.className = cls;
    el.textContent = text;
    out.appendChild(el);
  };
  const row = (left: string, right: string, leftCls = 'text-accent') => {
    const el = document.createElement('div');
    el.className = 'grid grid-cols-[110px_1fr] gap-2';
    const a = document.createElement('span'); a.className = leftCls; a.textContent = left;
    const b = document.createElement('span'); b.className = 'text-muted'; b.textContent = right;
    el.append(a, b); out.appendChild(el);
  };
  const go = (href: string, delay = 450) => setTimeout(() => { window.location.href = href; }, delay);

  const commands: Record<string, (args: string[]) => void> = {
    help: () => { (T.help as [string, string][]).forEach(([c, desc]) => row(c, desc)); line(T.helpFoot, 'text-faint'); },
    whoami: () => (T.whoami as string[]).forEach((l) => line(l)),
    projects: () => { line(T.projectsHead, 'text-faint'); d.cases.forEach((c) => row(c.id, `${c.title} · ${c.track}`)); },
    ls: () => commands.projects([]),
    open: (args) => {
      const q = (args[0] ?? '').toLowerCase();
      if (!q) return line(T.openUsage, 'text-faint');
      const c = d.cases.find((x) => x.id === q || x.slug === q || x.slug.startsWith(q) || x.title.toLowerCase().includes(q));
      if (!c) return line(fill(T.noCase, { q }), 'text-amber');
      line(fill(T.opening, { title: c.title }), 'text-accent'); go(c.href);
    },
    cat: (args) => (args.join(' ').includes('shadow') ? line(T.shadow, 'text-[#ff8a5c]') : commands.open(args)),
    skills: () => d.skills.forEach((g) => row(g.name.split(' ')[0].toLowerCase(), g.tools.join(', '))),
    cv: (args) => {
      if (args[0] === 'pdf') { line(T.cvPdf, 'text-accent'); const a = document.createElement('a'); a.href = d.pdf; a.download = ''; document.body.appendChild(a); a.click(); a.remove(); return; }
      line(T.cvOpen, 'text-accent'); go(d.cv);
    },
    contact: async () => {
      try { await navigator.clipboard.writeText(d.email); line(fill(T.copied, { email: d.email }), 'text-accent'); }
      catch { line(fill(T.emailShown, { email: d.email })); }
    },
    email: () => commands.contact([]),
    hire: () => { line(T.hire, 'text-accent'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }), 300); },
    lang: () => { line(T.lang, 'text-accent'); go(d.alt); },
    security: () => { line(T.security, 'text-accent'); go(`${d.home === '/' ? '' : '/fr'}/security`); },
    clear: () => { out.innerHTML = ''; },
    sudo: () => line(T.sudo, 'text-[#ff8a5c]'),
    rm: () => line(T.rm, 'text-[#ff8a5c]'),
    nmap: () => (T.nmap as string[]).forEach((l, i) => line(l, i === 2 ? 'text-faint' : '')),
    exit: () => line(T.exit, 'text-faint'),
    coffee: () => line(T.coffee, 'text-amber'),
    hello: () => line(T.hello), hi: () => line(T.hello), bonjour: () => line(T.hello), salut: () => line(T.hello),
  };
  const visible = ['help', 'whoami', 'projects', 'open', 'skills', 'cv', 'contact', 'hire', 'lang', 'clear', 'security'];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    input.value = '';
    if (!raw) return;
    history.push(raw); hIdx = history.length;
    const echo = document.createElement('div');
    echo.className = 'mt-2';
    const p = document.createElement('span'); p.className = 'text-accent'; p.textContent = '$ ';
    const c = document.createElement('span'); c.className = 'text-fg'; c.textContent = raw;
    echo.append(p, c); out.appendChild(echo);
    const [cmd, ...args] = raw.split(/\s+/);
    const fn = commands[cmd.toLowerCase()];
    if (fn) fn(args); else line(fill(T.notFound, { cmd }), 'text-amber');
    out.scrollTop = out.scrollHeight;
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && history.length) { e.preventDefault(); hIdx = Math.max(0, hIdx - 1); input.value = history[hIdx]; }
    if (e.key === 'ArrowDown' && history.length) { e.preventDefault(); hIdx = Math.min(history.length, hIdx + 1); input.value = history[hIdx] ?? ''; }
    if (e.key === 'Tab' && input.value.trim()) {
      const [cmd, arg] = input.value.trim().split(/\s+/);
      if (arg === undefined) { const m = visible.find((v) => v.startsWith(cmd.toLowerCase())); if (m) { e.preventDefault(); input.value = m + ' '; } }
      else if (cmd === 'open') { const a = arg.toLowerCase(); const byId = a.startsWith('cf'); const m = d.cases.find((x) => (byId ? x.id : x.slug).startsWith(a)); if (m) { e.preventDefault(); input.value = `open ${byId ? m.id : m.slug}`; } }
    }
  });
  termEl.addEventListener('click', (e) => { if (!(e.target as HTMLElement).closest('a,button') && !window.getSelection()?.toString()) input.focus({ preventScroll: true }); });
}
