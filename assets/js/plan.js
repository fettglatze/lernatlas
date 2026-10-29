// Lernplan bis zum Prüfungstermin: offene Themen gleichmäßig auf die Wochen verteilen,
// die letzte Woche bleibt für die Wiederholung. Der Plan wird bei jedem Aufruf neu berechnet
// und passt sich so dem Lernstand an.
import { today, inDays } from './cards.js';

const DAY = 864e5;
export const daysUntil = (date) => Math.round((new Date(`${date}T00:00`) - new Date(`${today()}T00:00`)) / DAY);

export function buildPlan(topics, date, isDone) {
  const days = daysUntil(date);
  if (days < 0) return { days, blocks: [] };
  const open = topics.filter((t) => !isDone(t));
  // Ab zwei Wochen Vorlauf sind die letzten sieben Tage vor der Prüfung Wiederholung.
  const reviewDays = days >= 14 ? 7 : 0;
  const learnDays = Math.max(1, days - reviewDays);
  const learnWeeks = Math.ceil(learnDays / 7);
  const per = Math.ceil(open.length / learnWeeks);
  const blocks = [];
  for (let w = 0; w < learnWeeks; w++) {
    const part = open.slice(w * per, (w + 1) * per);
    if (part.length) blocks.push({ from: inDays(w * 7), to: inDays(Math.min(w * 7 + 6, learnDays - 1)), topics: part });
  }
  if (reviewDays) blocks.push({ from: inDays(learnDays), to: inDays(days - 1), review: true });
  return { days, open: open.length, blocks };
}
