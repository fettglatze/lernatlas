// Kleine Satzhilfen für Inhalte
export const fr = (z, n) => `<span class="frac"><span>${z}</span><span>${n}</span></span>`;

// Kurzschreibweisen für Aufgaben (siehe assets/js/exercise.js)
export const ch = (q, options, answer, why, extra = {}) => ({ type: 'choice', q, options, answer, why, ...extra });
export const num = (q, answer, why, extra = {}) => ({ type: 'number', q, answer, why, ...extra });
export const nums = (q, answers, why, extra = {}) => ({ type: 'numbers', q, answers, why, ...extra });
export const txt = (q, accept, why, extra = {}) => ({ type: 'text', q, accept: [].concat(accept), why, ...extra });

// Markiert eine Aufgabe als „Prüfungsstil“ (Sachaufgabe wie in ESA/MSA)
export const EX = { exam: true };
export const ex = (extra) => ({ exam: true, ...extra });
