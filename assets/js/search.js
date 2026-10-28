// Clientseitige Themensuche: umlauttolerant, mit Präfix- und leichter Tippfehler-Toleranz.
import { ALL_TOPICS, SUBJECTS, SUBJECT_BY_ID } from '../../data/catalog.js';
import { CONTENT } from '../../data/content/index.js';

export function norm(s) {
  return String(s).toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

// Levenshtein mit frühem Abbruch (nur für kurze Distanzen gebraucht)
function within1(a, b) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) { i++; j++; continue; }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else { i++; j++; }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

const INDEX = ALL_TOPICS.map((t) => {
  const s = SUBJECT_BY_ID[t.subject];
  const title = norm(t.title);
  const extra = norm(`${t.keywords} ${t.area}`);
  const subj = norm(`${s.name} ${s.alt || ''}`);
  return { t, s, title, titleWords: title.split(' '), words: `${title} ${extra}`.split(' '), subj, full: !!CONTENT[t.id] };
});

const SUBJECT_INDEX = SUBJECTS.map((s) => ({ s, key: norm(`${s.name} ${s.alt || ''} ${s.sym}`) }));

function tokenScore(tok, e) {
  if (e.titleWords.includes(tok)) return 30;
  if (e.titleWords.some((w) => w.startsWith(tok))) return 22;
  if (e.title.includes(tok)) return 16;
  if (e.words.some((w) => w.startsWith(tok))) return 10;
  if (e.subj.split(' ').some((w) => w.startsWith(tok))) return 6;
  if (tok.length >= 5 && e.words.some((w) => within1(tok, w))) return 7;
  return 0;
}

export function search(query, { school = '', limit = 40 } = {}) {
  const q = norm(query);
  if (!q) return { topics: [], subjects: [] };
  const toks = q.split(' ').filter(Boolean);

  const subjects = SUBJECT_INDEX
    .filter(({ key }) => toks.every((tok) => key.split(' ').some((w) => w.startsWith(tok))))
    .map(({ s }) => s);

  const topics = [];
  for (const e of INDEX) {
    let score = 0;
    for (const tok of toks) {
      const sc = tokenScore(tok, e);
      if (!sc) { score = 0; break; }
      score += sc;
    }
    if (!score) continue;
    if (e.title === q) score += 40;
    else if (e.title.startsWith(q)) score += 15;
    if (e.full) score += 4;
    const fits = !school || e.t.schools.includes(school);
    if (!fits) score -= 25;
    topics.push({ topic: e.t, subject: e.s, score, fits, full: e.full });
  }
  topics.sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title, 'de'));
  return { topics: topics.slice(0, limit), subjects };
}

export function highlight(text, query) {
  const toks = norm(query).split(' ').filter((t) => t.length > 1);
  if (!toks.length) return escapeHtml(text);
  // Markiert Wortanfänge, die (normalisiert) mit einem Suchwort beginnen
  return text.split(/(\s+)/).map((w) => {
    const n = norm(w);
    const hit = toks.find((t) => n.startsWith(t));
    if (!hit) return escapeHtml(w);
    // Länge im Original grob abschätzen (Umlaute zählen als 2 Zeichen im Normalisat)
    let len = 0, acc = '';
    while (len < w.length && norm(acc).length < hit.length) acc += w[len++];
    return `<mark>${escapeHtml(w.slice(0, len))}</mark>${escapeHtml(w.slice(len))}`;
  }).join('');
}

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
