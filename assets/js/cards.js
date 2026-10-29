// Karteikarten mit Wiederholung in Abständen (Lernkartei nach Leitner, 5 Fächer).
// Gewusst: eine Stufe höher, nächste Abfrage nach INTERVALS Tagen. Nicht gewusst: zurück in Fach 1, heute noch einmal.
import { store } from './store.js';

export const INTERVALS = [0, 1, 3, 7, 14, 30];
export const MAX_BOX = 5;

const iso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const today = () => iso(new Date());
export const inDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return iso(d); };

export const cardId = (topicId, i) => `${topicId}#${i}`;
export const isDue = (card) => !card || card.due <= today();

export function rate(id, known) {
  const box = known ? Math.min(MAX_BOX, (store.cards[id]?.box || 0) + 1) : 1;
  store.setCard(id, { box, due: known ? inDays(INTERVALS[box]) : today() });
}

// Themen, deren Karten schon einmal gelernt wurden
export function startedTopics() {
  return [...new Set(Object.keys(store.cards).map((k) => k.split('#')[0]))];
}

export function deckStats(topicId, count) {
  const cards = Array.from({ length: count }, (_, i) => store.cards[cardId(topicId, i)]);
  return {
    due: cards.filter(isDue).length,
    fresh: cards.filter((c) => !c).length,
    boxes: Array.from({ length: MAX_BOX }, (_, b) => cards.filter((c) => c?.box === b + 1).length),
  };
}

// Nächster Termin, an dem eine Karte des Themas wieder fällig wird
export function nextDue(topicId, count) {
  const dates = Array.from({ length: count }, (_, i) => store.cards[cardId(topicId, i)]?.due).filter(Boolean).sort();
  return dates.find((d) => d > today()) || null;
}
