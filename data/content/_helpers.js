// Kleine Satzhilfen für Inhalte
export const fr = (z, n) => `<span class="frac"><span>${z}</span><span>${n}</span></span>`;

// Kurzschreibweisen für Aufgaben (siehe assets/js/exercise.js)
export const ch = (q, options, answer, why, extra = {}) => ({ type: 'choice', q, options, answer, why, ...extra });
export const num = (q, answer, why, extra = {}) => ({ type: 'number', q, answer, why, ...extra });
export const nums = (q, answers, why, extra = {}) => ({ type: 'numbers', q, answers, why, ...extra });
export const txt = (q, accept, why, extra = {}) => ({ type: 'text', q, accept: [].concat(accept), why, ...extra });
export const match = (q, pairs, why, extra = {}) => ({ type: 'match', q, pairs, why, ...extra });
export const cloze = (q, text, why, extra = {}) => ({ type: 'cloze', q, text, why, ...extra });
export const order = (q, items, why, extra = {}) => ({ type: 'order', q, items, why, ...extra });

// Punkte für einen Funktionsgraphen (Aufgabentyp „Graph ablesen“)
export const plot = (f, from, to, step = 0.1) => {
  const pts = [];
  for (let x = from; x <= to + step / 2; x += step) pts.push([Math.round(x * 1e6) / 1e6, f(x)]);
  return pts;
};

// Markiert eine Aufgabe als „Prüfungsstil“ (Sachaufgabe wie in ESA/MSA)
export const EX = { exam: true };
export const ex = (extra) => ({ exam: true, ...extra });
