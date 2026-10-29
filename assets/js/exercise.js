// Übungs-Engine mit Lösungsüberprüfung.
//
// Aufgaben-Typen (in data/content/*.js):
//   { type: 'choice',  q, options: [], answer: index, why }
//   { type: 'number',  q, answer, tol?, unit?, unitBefore?, why }
//   { type: 'numbers', q, answers: [], labels?, ordered?, why }
//                      – mehrere Werte; ohne `ordered` ist die Reihenfolge egal (Lösungsmenge),
//                        mit `ordered` + `labels` z. B. ein Wertepaar x/y
//   { type: 'text',    q, accept: [], placeholder?, loose?, caseSensitive?, why }
//                      – `loose`: Terme vergleichen (Leerzeichen, ·/*, ²/^2 egal)
//   { type: 'match',   q, pairs: [[links, rechts], …], why }      – Zuordnen über Auswahllisten
//   { type: 'cloze',   q, text, caseSensitive?, why }             – Lückentext, Lücken als [[Lösung|Alternative]]
//   { type: 'order',   q, items: [in richtiger Reihenfolge], why } – Reihenfolge mit ↑/↓ herstellen
// Optional bei allen: exam (Prüfungsstil-Etikett), display (Lösungstext überschreiben), tol
// (ohne tol: ganzzahlige Lösungen exakt, sonst 0,1 % Spielraum),
// graph: { x: [min, max, schritt], y: [min, max, schritt], xLabel?, yLabel?, series: [{ points: [[x, y], …], dots? }] }
//   – zeichnet ein Koordinatensystem über die Eingabe („Graph ablesen“)

import { store } from './store.js';

const KEYS = 'ABCDEFGH';

export function parseNumber(raw) {
  let s = String(raw).trim()
    .replace(/[−–]/g, '-')
    .replace(/^[a-z]\s*[₁₂12]?\s*=\s*/i, '')   // "x = 3", "x1=3"
    .replace(/[^\d.,/\-]/g, '');                // Einheiten, Leerzeichen
  if (!s) return NaN;
  if (s.includes('/')) {
    const [a, b] = s.split('/').map((p) => parseNumber(p));
    return b ? a / b : NaN;
  }
  if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.'); // 1.234,5 → 1234.5
  return Number(s);
}

// Ganzzahlige Lösungen (Jahreszahlen, Anzahlen) müssen exakt stimmen, sonst 0,1 % Spielraum für Rundung
const defaultTol = (target) => (Number.isInteger(target) ? 0.005 : Math.max(0.005, Math.abs(target) * 0.001));
const near = (v, target, tol) => Math.abs(v - target) <= (tol ?? defaultTol(target));

function normText(s, ex = {}) {
  let v = String(s).trim().replace(/[’`´]/g, "'").replace(/[„“”]/g, '"').replace(/\s+/g, ' ').replace(/[.!]$/, '');
  if (!ex.caseSensitive) v = v.toLowerCase();
  if (ex.loose) v = v.replace(/²/g, '^2').replace(/³/g, '^3').replace(/[−–]/g, '-').replace(/[\s·*]/g, '');
  return v;
}

function strip(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  return d.textContent;
}

const fmt = (n) => String(n).replace('.', ',').replace('-', '−');

// Lücken im Lückentext: [[Lösung|Alternative]]
const GAP = /\[\[([^\]]+)\]\]/g;
const gapsOf = (ex) => [...ex.text.matchAll(GAP)].map((m) => m[1].split('|'));

// Feste Mischung je Aufgabe, damit die Reihenfolge beim Neuladen gleich bleibt
function shuffled(list, seedText) {
  let h = 7;
  for (const c of seedText) h = (h * 31 + c.charCodeAt(0)) | 0;
  let s = h >>> 0 || 1;
  const rnd = () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 2 ** 32;
  const a = list.map((v, i) => [v, i]);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  if (a.length > 1 && a.every(([, i], k) => i === k)) a.push(a.shift());
  return a;
}

export function solutionText(ex) {
  if (ex.display) return ex.display;
  switch (ex.type) {
    case 'choice': return ex.options[ex.answer];
    case 'number': return `${ex.unitBefore ? (ex.unit || '') + ' ' : ''}${String(ex.answer).replace('.', ',')}${!ex.unitBefore && ex.unit ? ' ' + ex.unit : ''}`;
    case 'numbers': return ex.labels
      ? ex.answers.map((a, i) => `${ex.labels[i]} = ${fmt(a)}`).join(', ')
      : ex.answers.map(fmt).join(' und ');
    case 'text': return ex.accept[0];
    case 'match': return ex.pairs.map(([l, r]) => `${l} → ${r}`).join('; ');
    case 'cloze': return ex.text.replace(GAP, (_, g) => g.split('|')[0]);
    case 'order': return ex.items.map((it, i) => `${i + 1}. ${it}`).join(' · ');
    default: return '';
  }
}

// Ergebnis: null (noch keine Antwort), true/false; bei match/cloze/order zusätzlich je Teil richtig/falsch
function check(ex, root) {
  switch (ex.type) {
    case 'choice': {
      const picked = root.querySelector('.opt.is-picked');
      if (!picked) return null;
      return Number(picked.dataset.i) === ex.answer;
    }
    case 'number': {
      const v = parseNumber(root.querySelector('input').value);
      if (Number.isNaN(v)) return null;
      return near(v, ex.answer, ex.tol);
    }
    case 'numbers': {
      const vals = [...root.querySelectorAll('input')].map((i) => parseNumber(i.value));
      if (vals.some(Number.isNaN)) return null;
      if (ex.ordered) return vals.every((v, i) => near(v, ex.answers[i], ex.tol));
      const rest = [...ex.answers];
      for (const v of vals) {
        const k = rest.findIndex((a) => near(v, a, ex.tol));
        if (k < 0) return false;
        rest.splice(k, 1);
      }
      return rest.length === 0;
    }
    case 'text': {
      const v = normText(root.querySelector('input').value, ex);
      if (!v) return null;
      return ex.accept.some((a) => normText(a, ex) === v);
    }
    case 'match': {
      const sel = [...root.querySelectorAll('.match select')];
      if (sel.some((s) => s.value === '')) return null;
      return parts(sel, sel.map((s) => Number(s.value) === Number(s.dataset.i)));
    }
    case 'cloze': {
      const gaps = gapsOf(ex);
      const inp = [...root.querySelectorAll('.gap')];
      if (inp.some((i) => !i.value.trim())) return null;
      return parts(inp, inp.map((i, k) => gaps[k].some((a) => normText(a, ex) === normText(i.value, ex))));
    }
    case 'order': {
      const li = [...root.querySelectorAll('.order li')];
      return parts(li, li.map((l, k) => Number(l.dataset.i) === k));
    }
  }
  return null;
}

function parts(nodes, oks) {
  nodes.forEach((n, k) => { n.classList.toggle('is-right', oks[k]); n.classList.toggle('is-wrong', !oks[k]); });
  return oks.every(Boolean);
}

function inputHtml(ex, idx) {
  const id = `ex-${idx}`;
  switch (ex.type) {
    case 'choice':
      return `<div class="opts" role="radiogroup">${ex.options.map((o, i) =>
        `<button type="button" class="opt" role="radio" aria-checked="false" data-i="${i}"><span class="opt__k">${KEYS[i]}</span><span>${o}</span></button>`).join('')}</div>`;
    case 'number':
      return `<div class="ansrow">${ex.unitBefore && ex.unit ? `<span class="unit">${ex.unit}</span>` : ''}<input id="${id}" inputmode="decimal" autocomplete="off" placeholder="Zahl eingeben" aria-label="Antwort">${!ex.unitBefore && ex.unit ? `<span class="unit">${ex.unit}</span>` : ''}</div>`;
    case 'numbers':
      return `<div class="ansrow">${ex.answers.map((_, i) => {
        const label = ex.labels ? ex.labels[i] : `x${'₁₂₃₄'[i]}`;
        return `<span class="unit">${label} =</span><input inputmode="decimal" autocomplete="off" aria-label="${label}" style="width:110px">`;
      }).join('')}</div>`;
    case 'text':
      return `<div class="ansrow"><input id="${id}" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${ex.placeholder || 'Antwort eingeben'}" aria-label="Antwort" style="width:min(360px,100%)"></div>`;
    case 'match': {
      const right = shuffled(ex.pairs.map((p) => p[1]), `${ex.q}|match`);
      return `<div class="match">${ex.pairs.map(([l], i) => `<label class="match__row"><span>${l}</span>
        <select data-i="${i}" aria-label="Zuordnung für ${strip(l)}"><option value="">– wählen –</option>${right.map(([r, j]) => `<option value="${j}">${strip(r)}</option>`).join('')}</select></label>`).join('')}</div>`;
    }
    case 'cloze': {
      let k = 0;
      return `<p class="cloze">${ex.text.replace(GAP, (_, g) => {
        const w = Math.max(...g.split('|').map((a) => a.length));
        return `<input class="gap" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Lücke ${++k}" style="width:${Math.max(4, w + 2)}ch">`;
      })}</p>`;
    }
    case 'order':
      return `<ol class="order">${shuffled(ex.items, `${ex.q}|order`).map(([it, i]) => `<li data-i="${i}"><span>${it}</span>
        <span class="order__mv"><button type="button" data-mv="-1" aria-label="Nach oben">↑</button><button type="button" data-mv="1" aria-label="Nach unten">↓</button></span></li>`).join('')}</ol>`;
  }
  return '';
}

// Koordinatensystem als SVG für „Graph ablesen“
function graphSvg(g) {
  const W = 420, H = 300, L = 44, R = 14, T = 14, B = 38;
  const [x0, x1, xs] = g.x, [y0, y1, ys] = g.y;
  const px = (x) => L + ((x - x0) / (x1 - x0)) * (W - L - R);
  const py = (y) => H - B - ((y - y0) / (y1 - y0)) * (H - T - B);
  const ticks = (a, b, s) => { const t = []; for (let v = a; v <= b + s / 1000; v += s) t.push(Math.round(v * 1e6) / 1e6); return t; };
  const xt = ticks(x0, x1, xs), yt = ticks(y0, y1, ys);
  const ax = Math.min(Math.max(0, y0), y1), ay = Math.min(Math.max(0, x0), x1);
  const series = g.series.map((s) => `<polyline class="graph__line" points="${s.points.map(([x, y]) => `${px(x).toFixed(1)},${py(y).toFixed(1)}`).join(' ')}"/>${s.dots ? s.points.map(([x, y]) => `<circle class="graph__dot" cx="${px(x).toFixed(1)}" cy="${py(y).toFixed(1)}" r="3.5"/>`).join('') : ''}`).join('');
  return `<svg class="graph" viewBox="0 0 ${W} ${H}" role="img" aria-label="${g.alt || 'Diagramm zur Aufgabe'}">
    <defs><clipPath id="gc${W}${xt.length}${yt.length}"><rect x="${L}" y="${T}" width="${W - L - R}" height="${H - T - B}"/></clipPath></defs>
    ${xt.map((v) => `<line class="graph__grid" x1="${px(v)}" x2="${px(v)}" y1="${T}" y2="${H - B}"/>`).join('')}
    ${yt.map((v) => `<line class="graph__grid" y1="${py(v)}" y2="${py(v)}" x1="${L}" x2="${W - R}"/>`).join('')}
    <line class="graph__axis" x1="${L}" x2="${W - R}" y1="${py(ax)}" y2="${py(ax)}"/>
    <line class="graph__axis" y1="${T}" y2="${H - B}" x1="${px(ay)}" x2="${px(ay)}"/>
    ${xt.map((v) => `<text class="graph__tick" x="${px(v)}" y="${H - B + 16}" text-anchor="middle">${fmt(v)}</text>`).join('')}
    ${yt.map((v) => `<text class="graph__tick" x="${L - 6}" y="${py(v) + 4}" text-anchor="end">${fmt(v)}</text>`).join('')}
    ${g.xLabel ? `<text class="graph__label" x="${W - R}" y="${H - 4}" text-anchor="end">${g.xLabel}</text>` : ''}
    ${g.yLabel ? `<text class="graph__label" x="4" y="${T - 2}" dominant-baseline="hanging">${g.yLabel}</text>` : ''}
    <g clip-path="url(#gc${W}${xt.length}${yt.length})">${series}</g>
  </svg>`;
}

const TYPE_LABEL = { choice: 'Auswahl', number: 'Rechnen', numbers: 'Lösungsmenge', text: 'Eingabe', match: 'Zuordnen', cloze: 'Lückentext', order: 'Reihenfolge' };

// Lösung in die Bedienelemente eintragen (Zuordnen, Lückentext, Reihenfolge)
function fillSolution(ex, el) {
  if (ex.type === 'match') el.querySelectorAll('.match select').forEach((s) => { s.value = s.dataset.i; });
  if (ex.type === 'cloze') { const g = gapsOf(ex); el.querySelectorAll('.gap').forEach((i, k) => { i.value = g[k][0]; }); }
  if (ex.type === 'order') {
    const ol = el.querySelector('.order');
    [...ol.children].sort((a, b) => a.dataset.i - b.dataset.i).forEach((li) => ol.appendChild(li));
  }
  el.querySelectorAll('.match select, .gap, .order li').forEach((n) => { n.classList.remove('is-wrong'); n.classList.add('is-right'); });
}

export function renderExercise(ex, idx, topicId, onChange) {
  const el = document.createElement('article');
  el.className = 'ex';
  el.innerHTML = `
    <div class="ex__head"><span class="label"><b>${String(idx + 1).padStart(2, '0')}</b></span><span class="label">${ex.exam ? '<b>Prüfungsstil</b>' : ex.graph ? 'Graph ablesen' : TYPE_LABEL[ex.type] || ''}</span><span class="label ex__state"></span></div>
    <div class="ex__body">
      <div class="ex__q"><p>${ex.q}</p></div>
      ${ex.graph ? graphSvg(ex.graph) : ''}
      ${inputHtml(ex, idx)}
      <div class="ex__foot">
        <button type="button" class="btn" data-do="check">Prüfen</button>
        <button type="button" class="btn btn--ghost" data-do="solve" hidden>Lösung zeigen</button>
      </div>
      <div class="fb" aria-live="polite"></div>
    </div>`;

  const fb = el.querySelector('.fb');
  const solveBtn = el.querySelector('[data-do="solve"]');
  const state = el.querySelector('.ex__state');
  let tries = 0, done = false;

  const prior = store.progressOf(topicId)[idx];
  if (prior === true) state.textContent = '✓ gelöst';

  const say = (cls, html) => { fb.className = `fb ${cls}`; fb.innerHTML = html; fb.hidden = false; };

  function markChoice(final) {
    if (ex.type !== 'choice') return;
    el.querySelectorAll('.opt').forEach((o) => {
      const i = Number(o.dataset.i);
      o.classList.remove('is-right', 'is-wrong');
      if (final && i === ex.answer) o.classList.add('is-right');
      else if (o.classList.contains('is-picked') && i !== ex.answer) o.classList.add('is-wrong');
    });
  }

  function markInputs(ok) {
    if (['match', 'cloze', 'order'].includes(ex.type)) return; // werden je Teil in check() markiert
    el.querySelectorAll('input').forEach((i) => { i.classList.toggle('is-right', ok); i.classList.toggle('is-wrong', !ok); });
  }

  function finish() {
    done = true;
    el.querySelectorAll('input, select, .opt, [data-mv]').forEach((n) => { n.disabled = true; });
    el.querySelector('[data-do="check"]').disabled = true;
    solveBtn.hidden = true;
  }

  const hint = () => (ex.type === 'order' ? 'Grün markierte Einträge stehen schon richtig.'
    : ['match', 'cloze'].includes(ex.type) ? 'Rot markierte Stellen stimmen noch nicht.'
      : 'Prüfe deinen Rechenweg und versuche es noch einmal.');

  el.addEventListener('click', (e) => {
    const opt = e.target.closest('.opt');
    if (opt && !done) {
      el.querySelectorAll('.opt').forEach((o) => { o.classList.remove('is-picked', 'is-wrong'); o.setAttribute('aria-checked', 'false'); });
      opt.classList.add('is-picked');
      opt.setAttribute('aria-checked', 'true');
      return;
    }
    const mv = e.target.closest('[data-mv]');
    if (mv && !done) {
      const li = mv.closest('li');
      const to = Number(mv.dataset.mv) < 0 ? li.previousElementSibling : li.nextElementSibling?.nextElementSibling;
      if (Number(mv.dataset.mv) < 0 && !to) return;
      li.parentNode.insertBefore(li, to || null);
      el.querySelectorAll('.order li').forEach((n) => n.classList.remove('is-right', 'is-wrong'));
      mv.focus();
      return;
    }
    const act = e.target.closest('[data-do]')?.dataset.do;
    if (act === 'check') {
      const ok = check(ex, el);
      if (ok === null) { say('fb--bad', `<p>${ex.type === 'match' || ex.type === 'cloze' ? 'Bitte fülle zuerst alle Felder aus.' : 'Bitte gib zuerst eine Antwort ein.'}</p>`); return; }
      tries++;
      if (ok) {
        markChoice(true); markInputs(true);
        say('fb--ok', `<p><strong>Richtig!</strong> ${ex.why || ''}</p>`);
        store.record(topicId, idx, true);
        state.textContent = '✓ gelöst';
        finish();
      } else {
        markChoice(false); markInputs(false);
        say('fb--bad', `<p><strong>Noch nicht richtig.</strong> ${tries === 1 ? hint() : 'Du kannst dir die Lösung anzeigen lassen.'}</p>`);
        store.record(topicId, idx, false);
        solveBtn.hidden = false;
      }
      onChange?.();
    }
    if (act === 'solve') {
      markChoice(true);
      fillSolution(ex, el);
      say('fb--sol', `<p><strong>Lösung:</strong> ${strip(solutionText(ex))}</p>${ex.why ? `<p>${ex.why}</p>` : ''}`);
      finish();
      onChange?.();
    }
  });

  el.addEventListener('change', (e) => {
    if (e.target.matches('.match select')) e.target.classList.remove('is-right', 'is-wrong');
  });

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('input')) el.querySelector('[data-do="check"]').click();
  });

  return el;
}
