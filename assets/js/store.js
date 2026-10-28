// Lokaler Zustand: Schulform, Bundesland, Theme, Lernfortschritt.
// Alles bleibt im Browser (localStorage) – keine Konten, keine Übertragung.

const KEY = 'lernatlas:v1';
const defaults = { school: '', land: '', theme: '', progress: {} };

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
  onChange(fn) { listeners.add(fn); return () => listeners.delete(fn); },
};
