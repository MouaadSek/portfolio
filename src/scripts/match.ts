// Recruiter match: everything runs in the browser, the job offer never leaves the page.

type Skill = { k: string; label: string; re: string[]; level: 'shipped' | 'labs' | 'gap'; proj: string[] };
type Proj = { id: string; title: string; context: string; href: string };
type Data = { lang: string; site: string; skills: Skill[]; projects: Proj[]; example: string; t: Record<string, string> };

const norm = (s: string) => s.toLowerCase().normalize('NFC');

export function initMatch(root: HTMLElement) {
  const d: Data = JSON.parse(root.dataset.match!);
  const T = d.t;
  const $ = <E extends HTMLElement>(sel: string) => root.querySelector<E>(sel)!;
  const input = $<HTMLTextAreaElement>('[data-m-input]');
  const results = $('[data-m-results]');
  const empty = $('[data-m-empty]');
  const fill = (s: string, v: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');
  const compiled = d.skills.map((s) => ({ ...s, rx: s.re.map((r) => new RegExp(r, 'i')) }));

  const chip = (text: string, cls: string) => {
    const li = document.createElement('li'); li.className = cls; li.textContent = text; return li;
  };
  const list = (items: string[], lang: string) => {
    if (items.length <= 1) return items.join('');
    const and = lang === 'fr' ? ' et ' : ' and ';
    return items.slice(0, -1).join(', ') + and + items[items.length - 1];
  };

  const analyze = () => {
    const text = norm(input.value);
    if (text.trim().length < 40) { results.hidden = true; empty.hidden = false; empty.textContent = T.tooShort; return; }
    const hits = compiled.filter((s) => s.rx.some((r) => r.test(text)));
    const shipped = hits.filter((s) => s.level === 'shipped');
    const labs = hits.filter((s) => s.level === 'labs');
    const gaps = hits.filter((s) => s.level === 'gap');
    if (!hits.length) { results.hidden = true; empty.hidden = false; empty.textContent = T.noHits; return; }

    const score = Math.round(((shipped.length + labs.length * 0.5) / hits.length) * 100);

    // projects ranked by how many requested skills they cover
    const counts = new Map<string, number>();
    [...shipped, ...labs].forEach((s) => s.proj.forEach((p) => counts.set(p, (counts.get(p) ?? 0) + 1)));
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
      .map(([id]) => d.projects.find((p) => p.id === id)).filter(Boolean) as Proj[];

    // availability lines from the contract and location
    const avail: string[] = [];
    if (/alternance|apprenti|apprentissage|work.?study/.test(text)) avail.push(T.availAlt);
    if (/\bstage\b|stagiaire|internship|\bintern\b|fin d.études/.test(text)) avail.push(T.availStage);
    if (/\bcdi\b|\bcdd\b|permanent|full.?time|temps plein/.test(text) && !avail.length) avail.push(T.availCdi);
    if (/belgi|bruxelles|brussels|liège|gand|anvers|antwerp/.test(text)) avail.push(T.availBe);
    avail.push(T.availMobile);

    // render
    empty.hidden = true; results.hidden = false;
    $('[data-m-score]').textContent = `${score}%`;
    const ring = root.querySelector<SVGCircleElement>('[data-m-ring]')!;
    const c = 2 * Math.PI * 52;
    ring.setAttribute('stroke-dasharray', `${(score / 100) * c} ${c}`);
    $('[data-m-scoreline]').textContent = fill(T.scoreLine, { n: String(shipped.length + labs.length), total: String(hits.length) });

    const chips = $('[data-m-chips]'); chips.replaceChildren();
    shipped.forEach((s) => chips.appendChild(chip(s.label, 'rounded-md border border-[#2a3a18] bg-[#17200f] px-2.5 py-1.5 font-mono text-xs text-accent-2')));
    labs.forEach((s) => chips.appendChild(chip(s.label, 'rounded-md border border-dashed border-[#2e3a33] px-2.5 py-1.5 font-mono text-xs text-muted')));

    const gapBox = $('[data-m-gaps]');
    const gapList = $('[data-m-gaplist]'); gapList.replaceChildren();
    gapBox.hidden = !gaps.length;
    gaps.forEach((s) => gapList.appendChild(chip(s.label, 'rounded-md border border-[#3a2c10] bg-[#1e1708] px-2.5 py-1.5 font-mono text-xs text-amber')));

    const projBox = $('[data-m-projects]'); projBox.replaceChildren();
    top.forEach((p) => {
      const a = document.createElement('a');
      a.href = p.href; a.className = 'spot card flex flex-col gap-1.5 p-4 text-fg';
      const id = document.createElement('span'); id.className = 'font-mono text-[11px] text-accent'; id.textContent = p.id;
      const ti = document.createElement('span'); ti.className = 'font-display text-lg font-semibold leading-tight'; ti.textContent = p.title;
      const cx = document.createElement('span'); cx.className = 'text-[13px] text-dim'; cx.textContent = p.context;
      a.append(id, ti, cx); projBox.appendChild(a);
    });

    const availBox = $('[data-m-avail]'); availBox.replaceChildren();
    avail.forEach((l) => availBox.appendChild(chip(l, 'flex items-start gap-2 text-[15px] text-fg-2')));

    const summary = [
      fill(T.sumCover, { n: String(shipped.length + labs.length), total: String(hits.length) }),
      shipped.length ? fill(T.sumShipped, { list: list(shipped.map((s) => s.label), d.lang) }) : '',
      labs.length ? fill(T.sumLabs, { list: list(labs.map((s) => s.label), d.lang) }) : '',
      gaps.length ? fill(T.sumGaps, { list: list(gaps.map((s) => s.label), d.lang) }) : '',
      top.length ? fill(T.sumProjects, { list: list(top.map((p) => p.title), d.lang) }) : '',
      avail.slice(0, -1).join(' '),
      T.availMobile,
      fill(T.sumLink, { site: d.site }),
    ].filter(Boolean).join(' ');
    $('[data-m-summary]').textContent = summary;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  $('[data-m-run]').addEventListener('click', analyze);
  $('[data-m-example]').addEventListener('click', () => { input.value = d.example; analyze(); });
  $('[data-m-copy]').addEventListener('click', async (e) => {
    const btn = e.currentTarget as HTMLElement;
    try { await navigator.clipboard.writeText($('[data-m-summary]').textContent ?? ''); } catch { /* blocked */ }
    const old = btn.textContent; btn.textContent = T.copied; setTimeout(() => (btn.textContent = old), 1500);
  });
}
