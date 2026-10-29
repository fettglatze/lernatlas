// Lokaler Zustand: Schulform, Bundesland, Theme, Lernfortschritt.
// Alles bleibt im Browser (localStorage) – keine Konten, keine Übertragung.

const KEY = 'lernatlas:v1';
const defaults = { school: '', land: '', theme: '', progress: {}, cards: {}, exams: [] };

function load() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return { ...defaults }; }
}

const state = load();
const listeners = new Set();

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* privater Modus o. Ä. */ }
  listeners.forEach((fn) => fn(state));
}

export const store = {
  get school() { return state.school; },
  get land() { return state.land; },
  get theme() { return state.theme; },
  setSchool(v) { state.school = v; save(); },
  setLand(v) { state.land = v; save(); },
  setTheme(v) { state.theme = v; save(); },

  // progress[topicId] = { [exerciseIndex]: true|false }  (true = beim ersten Versuch richtig oder später gelöst)
  progressOf(topicId) { return state.progress[topicId] || {}; },
  record(topicId, idx, ok) {
    const p = state.progress[topicId] || (state.progress[topicId] = {});
    if (p[idx] !== true) p[idx] = ok;
    save();
  },
  resetTopic(topicId) { delete state.progress[topicId]; save(); },

  // cards["<topicId>#<index>"] = { box: 1–5, due: 'JJJJ-MM-TT' }  (Karteikarten aus den Merkzetteln)
  get cards() { return state.cards; },
  setCard(id, v) { state.cards[id] = v; save(); },
  // exams = [{ id, subject, date: 'JJJJ-MM-TT', name, topics: [topicId] }]  (selbst eingetragene Prüfungstermine)
  get exams() { return state.exams; },
  addExam(exam) { state.exams.push(exam); save(); },
  updateExam(id, patch) { const x = state.exams.find((e) => e.id === id); if (x) { Object.assign(x, patch); save(); } },
  removeExam(id) { state.exams = state.exams.filter((e) => e.id !== id); save(); },
  resetCards(topicId) { Object.keys(state.cards).filter((k) => k.startsWith(`${topicId}#`)).forEach((k) => delete state.cards[k]); save(); },
  onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
};
