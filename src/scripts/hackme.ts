// "Try to hack me": the visitor's payload is injected into the page on purpose,
// with a method that WOULD execute scripts (createContextualFragment).
// The Content-Security-Policy is the only thing stopping it, and every block
// is shown live from the browser's own securitypolicyviolation events.
// It only ever runs the visitor's own input, in their own browser.

type Strings = { noCsp: string; injected: string; blocked: string; nothing: string; inline: string; removed: string };

export function initHackMe(root: HTMLElement) {
  const s: Strings = JSON.parse(root.dataset.hackme!);
  const input = root.querySelector<HTMLTextAreaElement>('[data-hm-input]')!;
  const run = root.querySelector<HTMLButtonElement>('[data-hm-run]')!;
  const stage = root.querySelector<HTMLElement>('[data-hm-stage]')!;
  const log = root.querySelector<HTMLElement>('[data-hm-log]')!;
  const status = root.querySelector<HTMLElement>('[data-hm-status]')!;

  const entry = (text: string, cls: string) => {
    const li = document.createElement('li');
    li.className = cls;
    const time = document.createElement('span');
    time.className = 'mr-3 text-faint';
    time.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const msg = document.createElement('span');
    msg.textContent = text;
    li.append(time, msg);
    log.prepend(li);
  };

  // 1. Make sure a CSP is actually enforced before arming the demo.
  //    The probe is harmless: if it runs, the policy is missing and the demo stays disabled.
  (window as any).__cspProbe = false;
  const probe = document.createElement('script');
  probe.textContent = 'window.__cspProbe = true;';
  document.head.appendChild(probe);
  probe.remove();
  if ((window as any).__cspProbe === true) {
    status.textContent = s.noCsp;
    status.className = 'font-mono text-xs text-amber';
    run.disabled = true;
    return;
  }

  let count = 0;
  let armed = false;
  document.addEventListener('securitypolicyviolation', (e) => {
    if (!armed) return; // ignore the harmless probe above
    count++;
    const what = e.blockedURI && e.blockedURI !== 'inline' ? e.blockedURI : s.inline;
    entry(`${s.blocked} ${e.effectiveDirective}: ${what}`, 'text-[#ff8a5c]');
  });

  // presets
  root.querySelectorAll<HTMLButtonElement>('[data-hm-preset]').forEach((b) =>
    b.addEventListener('click', () => { input.value = b.dataset.hmPreset!; input.focus(); }));

  run.addEventListener('click', () => {
    armed = true;
    const before = count;
    stage.replaceChildren();
    // meta and base tags are stripped so the demo cannot redirect the page
    const range = document.createRange();
    range.selectNodeContents(stage);
    const frag = range.createContextualFragment(input.value);
    const stripped = frag.querySelectorAll('meta, base');
    stripped.forEach((n) => n.remove());
    if (stripped.length) entry(s.removed, 'text-faint');
    stage.appendChild(frag);
    entry(s.injected, 'text-fg-2');
    // event handlers fire asynchronously (img error, svg load): check a moment later
    setTimeout(() => { if (count === before) entry(s.nothing, 'text-accent'); }, 700);
  });
}
