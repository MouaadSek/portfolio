// Recruiter CTF: 5 flags hidden across the site. Only SHA-256 hashes live here,
// so reading this file does not give the answers away.

const HASHES = [
  '1567f544a32e0484c91e60774e2fff1999e6a3e63671ab000ee1ec7dacd31c80', // page source
  '6c8847f043f7d55c2e7ce1142850763600666327b9cf192f487a094d729c6dd7', // robots.txt
  '7de311310995a1ea9352f7a619138367f850bbeb726b83b21e31946b766589ca', // security.txt
  '50e5959b2a7a7cd2a52aea4df3be26cc26dd2a7b7a88992613d1214542222082', // response header
  '9d2b7a53cbf7d952f438be7c2b51ae6ca2f9b0902e20eef6d5d8fe44de044ecc', // console
];
const KEY = 'msk-ctf-v1';

export function found(): number[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
function save(list: number[]) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* storage blocked: progress lives for this page only */ }
}
const session: number[] = [];

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export type SubmitResult = { status: 'new' | 'dup' | 'wrong'; index: number; total: number };

export async function submit(flag: string): Promise<SubmitResult> {
  const hash = await sha256(flag.trim());
  const index = HASHES.indexOf(hash);
  const list = Array.from(new Set([...found(), ...session]));
  if (index === -1) return { status: 'wrong', index, total: list.length };
  if (list.includes(index)) return { status: 'dup', index, total: list.length };
  list.push(index); session.push(index); save(list);
  return { status: 'new', index, total: list.length };
}

export const progress = () => Array.from(new Set([...found(), ...session]));
export const TOTAL = HASHES.length;

/** Flag 5: a message for people who open the developer console. */
export function consoleHint() {
  console.log(
    '%c mouaad.sek %c You opened the console. Good instinct.\n\nCTF 5/5 is right here, encoded: TVNLe2MwbnMwbDNfd2gxc3AzcnN9\nDecode it, then type "submit <flag>" in the terminal on the home page.',
    'background:#b8f25a;color:#0a0c0b;font-weight:bold;padding:2px 6px;border-radius:4px',
    'color:#c4cec8',
  );
}
