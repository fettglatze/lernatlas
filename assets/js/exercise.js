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
// Optional bei allen: exam (Prüfungsstil-Etikett), display (Lösungstext überschreiben), tol
// (ohne tol: ganzzahlige Lösungen exakt, sonst 0,1 % Spielraum)

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

export function solutionText(ex) {
  if (ex.display) return ex.display;
  switch (ex.type) {
    case 'choice': return ex.options[ex.answer];
    case 'number': return `${ex.unitBefore ? (ex.unit || '') + ' ' : ''}${String(ex.answer).replace('.', ',')}${!ex.unitBefore && ex.unit ? ' ' + ex.unit : ''}`;
    case 'numbers': return ex.labels
      ? ex.answers.map((a, i) => `${ex.labels[i]} = ${fmt(a)}`).join(', ')
      : ex.answers.map(fmt).join(' und ');
    case 'text': return ex.accept[0];
    default: return '';
  }
}

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
  }
  return null;
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
  }
  return '';
}

const TYPE_LABEL = { choice: 'Auswahl', number: 'Rechnen', numbers: 'Lösungsmenge', text: 'Eingabe' };

export function renderExercise(ex, idx, topicId, onChange) {
  const el = document.createElement('article');
  el.className = 'ex';
  el.innerHTML = `
    <div class="ex__head"><span class="label"><b>${String(idx + 1).padStart(2, '0')}</b></span><span class="label">${ex.exam ? '<b>Prüfungsstil</b>' : TYPE_LABEL[ex.type] || ''}</span><span class="label ex__state"></span></div>
    <div class="ex__body">
      <div class="ex__q"><p>${ex.q}</p></div>
      ${inputHtml(ex, idx)}
      <div class="ex__foot">
        <button type="button" class="btn" data-do="check">Prüfen</button>
        <button type="button" class="btn btn--ghost" data-do="solve" hidden>Lösung zeigen</button>
      </div>
      <div class="fb" hidden aria-live="polite"></div>
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
    el.querySelectorAll('input').forEach((i) => { i.classList.toggle('is-right', ok); i.classList.toggle('is-wrong', !ok); });
  }

  function finish() {
    done = true;
    el.querySelectorAll('input, .opt').forEach((n) => { n.disabled = true; });
    el.querySelector('[data-do="check"]').disabled = true;
    solveBtn.hidden = true;
  }

  el.addEventListener('click', (e) => {
    const opt = e.target.closest('.opt');
    if (opt && !done) {
      el.querySelectorAll('.opt').forEach((o) => { o.classList.remove('is-picked', 'is-wrong'); o.setAttribute('aria-checked', 'false'); });
      opt.classList.add('is-picked');
      opt.setAttribute('aria-checked', 'true');
      return;
    }
    const act = e.target.closest('[data-do]')?.dataset.do;
    if (act === 'check') {
      const ok = check(ex, el);
      if (ok === null) { say('fb--bad', '<p>Bitte gib zuerst eine Antwort ein.</p>'); return; }
      tries++;
      if (ok) {
        markChoice(true); markInputs(true);
        say('fb--ok', `<p><strong>Richtig!</strong> ${ex.why || ''}</p>`);
        store.record(topicId, idx, true);
        state.textContent = '✓ gelöst';
        finish();
      } else {
        markChoice(false); markInputs(false);
        say('fb--bad', `<p><strong>Noch nicht richtig.</strong> ${tries === 1 ? 'Prüfe deinen Rechenweg und versuche es noch einmal.' : 'Du kannst dir die Lösung anzeigen lassen.'}</p>`);
        store.record(topicId, idx, false);
        solveBtn.hidden = false;
      }
      onChange?.();
    }
    if (act === 'solve') {
      markChoice(true);
      say('fb--sol', `<p><strong>Lösung:</strong> ${strip(solutionText(ex))}</p>${ex.why ? `<p>${ex.why}</p>` : ''}`);
      finish();
      onChange?.();
    }
  });

  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.matches('input')) el.querySelector('[data-do="check"]').click();
  });

  return el;
}
