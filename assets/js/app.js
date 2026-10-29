// Lernatlas – App: Router, Ansichten, Suche
import { SCHOOLS, GROUPS, SUBJECTS, SUBJECT_BY_ID, TOPIC_BY_ID, ALL_TOPICS } from '../../data/catalog.js';
import { CONTENT } from '../../data/content/index.js';
import { LANDS, NATIONAL, LEVELS } from '../../data/exams.js';
import { EXAM_FILES } from '../../data/exam-files.js';
import { EXAM_PAGES, EXAM_PAGE_BY_ID } from '../../data/exam-pages.js';
import { PRACTICE } from '../../data/exam-practice.js';
import { IQB_DEUTSCH, ABI_FOCUS } from '../../data/abi-focus.js';
import { LAND_INFO, ETHIK_SOURCE } from '../../data/land-info.js';
import { videoLinks, referenceLinks, CURRICULA, LEARNING_SOURCES } from '../../data/sources.js';
import { store } from './store.js';
import { search, highlight, escapeHtml } from './search.js';
import { renderBlocks } from './render.js';
import { renderExercise } from './exercise.js';
import { cardId, isDue, rate, startedTopics, deckStats, nextDue, today, INTERVALS, MAX_BOX } from './cards.js';
import { daysUntil, buildPlan } from './plan.js';

const $ = (sel, root = document) => root.querySelector(sel);
const main = $('#main');

// ───────────────────────── Hilfen ─────────────────────────
const schoolBadges = (list) => `<span class="badges">${Object.values(SCHOOLS).map((s) =>
  `<span class="badge${list.includes(s.id) ? '' : ' is-off'}" title="${s.name}">${s.short}</span>`).join('')}</span>`;

const kLabel = (k) => (/^[EQ]/.test(k) ? `Oberstufe ${k}` : `Kl. ${k}`);
const status = (full) => full ? '<span class="status status--full">Ausgearbeitet</span>' : '<span class="status">Linksammlung</span>';
const countFull = (s) => s.areas.reduce((n, a) => n + a.topics.filter((t) => CONTENT[t.id]).length, 0);
const countTopics = (s) => s.areas.reduce((n, a) => n + a.topics.length, 0);
const fitsSchool = (t) => !store.school || t.schools.includes(store.school);

function el(s, { href = `#/fach/${s.id}`, dim = false, tag = 'a' } = {}) {
  return `<${tag} class="el${dim ? ' is-dim' : ''}" data-g="${s.g}" ${tag === 'a' ? `href="${href}"` : ''}>
    <span class="el__no"><span>${String(s.no).padStart(2, '0')}</span><span>${countTopics(s)}</span></span>
    <span class="el__sym">${s.sym}</span>
    <span class="el__name">${s.name}</span>
  </${tag}>`;
}

function topicRow(t, { showSubject = true } = {}) {
  const s = SUBJECT_BY_ID[t.subject];
  return `<a class="row" href="#/thema/${t.id}" style="--g: var(--g-${s.g})">
    <span class="row__sym">${s.sym}</span>
    <span><span class="row__title">${t.title}</span>${showSubject ? `<span class="row__sub">${s.name} · ${t.area}</span>` : ''}</span>
    ${schoolBadges(t.schools)}
    <span class="row__k">${kLabel(t.k)}</span>
  </a>`;
}

function pagehead({ crumbs = [], title, lead = '', meta = '', side = '' }) {
  return `<header class="pagehead"><div class="wrap">
    ${crumbs.length ? `<nav class="crumbs" aria-label="Brotkrumen"><a href="#/">Start</a>${crumbs.map(([l, h]) =>
      `<span aria-hidden="true">/</span>${h ? `<a href="${h}">${l}</a>` : `<span>${l}</span>`}`).join('')}</nav>` : ''}
    ${side ? `<div class="subjecthead">${side}<div>` : ''}
      <h1>${title}</h1>
      ${lead ? `<p class="pagehead__lead">${lead}</p>` : ''}
      ${meta ? `<div class="pagehead__meta">${meta}</div>` : ''}
    ${side ? '</div></div>' : ''}
  </div></header>`;
}

const metaItem = (label, value) => `<div><span class="label">${label}</span><strong>${value}</strong></div>`;

function schoolChips(attr = 'data-school') {
  return `<button class="chip${!store.school ? ' is-on' : ''}" ${attr}="">Alle</button>` +
    Object.values(SCHOOLS).map((s) => `<button class="chip${store.school === s.id ? ' is-on' : ''}" ${attr}="${s.id}">${s.name}</button>`).join('');
}

// ───────────────────────── Ansichten ─────────────────────────
function viewHome() {
  const featured = ALL_TOPICS.filter((t) => CONTENT[t.id]);
  const bySubject = SUBJECTS.map((s) => ({ s, total: ALL_TOPICS.filter((t) => t.subject === s.id).length, done: featured.filter((t) => t.subject === s.id).length }))
    .filter((x) => x.done).sort((a, b) => b.done - a.done);
  const suggestions = ['Pythagoras', 'das oder dass', 'Fotosynthese', 'Weimarer Republik', 'If-Clauses', 'Ohmsches Gesetz', 'pq-Formel'];
  const groupsUsed = Object.entries(GROUPS);

  return `
  <section class="hero"><div class="wrap hero__grid">
    <div>
      <p class="label"><b>●</b> Hauptschule · Realschule · Gymnasium</p>
      <h1 style="margin-top:14px">Alles bis zum <em>Abschluss</em> – an einem Ort, sauber sortiert.</h1>
      <button class="bigsearch" type="button" data-action="open-search">
        <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4.5 4.5"/></svg>
        Welches Thema lernst du gerade?
        <kbd>/</kbd>
      </button>
      <div class="suggest">${suggestions.map((s) => `<button class="chip" data-q="${s}">${s}</button>`).join('')}</div>
    </div>
    <div>
      <p class="hero__lead">Lernzettel, Merkzettel, Videos von geprüften Kanälen, Übungen mit Sofort-Kontrolle – und die offiziellen Prüfungsarchive aller 16 Länder.</p>
      <p class="label" style="margin:22px 0 10px">Meine Schulform</p>
      <div class="schoolcards">${Object.values(SCHOOLS).map((s) => `
        <button class="schoolcard${store.school === s.id ? ' is-on' : ''}" data-school="${store.school === s.id ? '' : s.id}">
          <span class="label">${s.short} · ${s.grades}</span>
          <strong>${s.name}</strong>
          <small>${s.exam}</small>
        </button>`).join('')}
      </div>
    </div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="section__head">
      <span class="label"><b>01</b> — Fächer</span>
      <div><h2>Das Fächerregister</h2><p>${SUBJECTS.length} Fächer, ${ALL_TOPICS.length} Themen. ${store.school ? `Ausgegraut: nicht an der ${SCHOOLS[store.school].name}.` : 'Wähle oben deine Schulform, um passend zu filtern.'}</p></div>
      <a class="section__more" href="#/faecher">Alle Fächer als Liste →</a>
    </div>
    <div class="groupkey">${groupsUsed.map(([g, n]) => `<span style="--g: var(--g-${g})"><i></i>${n}</span>`).join('')}</div>
    <div class="elgrid">${SUBJECTS.map((s) => el(s, { dim: store.school && !s.schools.includes(store.school) })).join('')}</div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="section__head">
      <span class="label"><b>02</b> — Prüfungen</span>
      <div><h2>Alte Prüfungen, offiziell</h2><p>Wir verlinken direkt zu Kultusministerien, Landesinstituten und dem IQB – mit ehrlicher Angabe, was frei zugänglich ist.</p></div>
      <a class="section__more" href="#/pruefungen">Zum Prüfungsarchiv →</a>
    </div>
    <div class="exams3">${['esa', 'msa', 'abi'].map((l) => `
      <a href="#/pruefungen?level=${l}">
        <span class="label">${SCHOOLS[LEVELS[l].school].name}</span>
        <h3>${LEVELS[l].name}</h3>
        <p>${LEVELS[l].desc}</p>
      </a>`).join('')}
    </div>
  </div></section>

  <section class="section"><div class="wrap">
    <div class="section__head">
      <span class="label"><b>03</b> — Ausgearbeitet</span>
      <div><h2>Komplett aufbereitete Themen</h2><p>${featured.length} Themen mit Lernzettel, Merkzettel, Videos, Übungen und Prüfungsbezug. Weitere folgen laufend – alle anderen haben bereits geprüfte Video- und Quellenlinks.</p></div>
    </div>
    <div class="rows">${bySubject.map(({ s, total, done }) => `<a class="row" href="#/fach/${s.id}?nur=fertig" style="--g: var(--g-${s.g})">
      <span class="row__sym">${s.sym}</span>
      <span><span class="row__title">${s.name}</span><span class="row__sub">${done} von ${total} Themen ausgearbeitet</span></span>
      <span class="row__k">${Math.round((done / total) * 100)} %</span>
    </a>`).join('')}</div>
  </div></section>`;
}

function viewSubjects() {
  return pagehead({ crumbs: [['Fächer']], title: 'Alle Fächer', lead: 'Sortiert nach Fachgruppen. Bezeichnungen unterscheiden sich je nach Bundesland – wir nennen die gängigen Varianten mit.' }) +
  `<div class="wrap" style="padding:36px var(--gutter) 72px">
    <div class="filterbar"><span class="label">Schulform</span>${schoolChips()}</div>
    ${Object.entries(GROUPS).map(([g, name]) => {
      const list = SUBJECTS.filter((s) => s.g === g && (!store.school || s.schools.includes(store.school)));
      if (!list.length) return '';
      return `<section class="area"><div class="area__head"><h2>${name}</h2><span class="label">${list.length} Fächer</span></div>
        <div class="rows">${list.map((s) => `
          <a class="row" href="#/fach/${s.id}" style="--g: var(--g-${s.g})">
            <span class="row__sym">${s.sym}</span>
            <span><span class="row__title">${s.name}</span><span class="row__sub">${s.alt ? s.alt + ' · ' : ''}${s.desc}</span></span>
            ${schoolBadges(s.schools)}
            <span class="row__k">${countTopics(s)} Themen</span>
          </a>`).join('')}</div></section>`;
    }).join('')}
  </div>`;
}

function viewSubject(id, params) {
  const s = SUBJECT_BY_ID[id];
  if (!s) return viewNotFound();
  const onlyFull = params.get('nur') === 'fertig';
  const areas = s.areas.map((a) => ({ ...a, topics: a.topics.filter((t) => fitsSchool(t) && (!onlyFull || CONTENT[t.id])) }));
  const visible = areas.filter((a) => a.topics.length);

  return pagehead({
    crumbs: [['Fächer', '#/faecher'], [s.name]],
    side: el(s, { tag: 'div' }),
    title: s.name,
    lead: `${s.alt ? `<span class="muted">auch: ${s.alt}.</span> ` : ''}${s.desc}`,
    meta: metaItem('Themen', countTopics(s)) + metaItem('Ausgearbeitet', countFull(s)) + metaItem('Schulformen', s.schools.map((x) => SCHOOLS[x].name).join(', ')) + landNameMeta(s),
  }) + `
  <div class="wrap layout2">
    <nav class="toc" aria-label="Bereiche"><p class="label">Bereiche</p>
      ${visible.map((a, i) => `<a href="#area-${i}" data-scroll>${a.name}</a>`).join('')}
    </nav>
    <div>
      <div class="filterbar">
        <span class="label">Schulform</span>${schoolChips()}
        <span style="flex:1"></span>
        <a class="chip${onlyFull ? ' is-on' : ''}" href="#/fach/${s.id}${onlyFull ? '' : '?nur=fertig'}">Nur ausgearbeitete</a>
      </div>
      ${visible.length ? visible.map((a, i) => `
        <section class="area" id="area-${i}">
          <div class="area__head"><h2>${a.name}</h2><span class="label">${a.topics.length} Themen</span></div>
          <div class="rows">${a.topics.map((t) => `
            <a class="row" href="#/thema/${t.id}" style="--g: var(--g-${s.g})">
              <span class="row__sym">${s.sym}</span>
              <span><span class="row__title">${t.title}</span><span class="row__sub">${kLabel(t.k)}</span></span>
              ${schoolBadges(t.schools)}
              ${status(!!CONTENT[t.id])}
            </a>`).join('')}</div>
        </section>`).join('') : `<p class="empty">Für diese Auswahl gibt es hier noch keine Themen.${store.school ? ' Tipp: Schulform auf „Alle“ stellen.' : ''}</p>`}
      <p class="muted" style="font-size:14px;margin-top:32px">Klassenstufen sind Richtwerte nach KMK-Standards und Länderlehrplänen; je nach Bundesland liegt ein Thema ein bis zwei Jahre früher oder später. E = Einführungsphase, Q1/Q2 = Qualifikationsphase.</p>
    </div>
  </div>`;
}

function viewTopic(id, params) {
  const t = TOPIC_BY_ID[id];
  if (!t) return viewNotFound();
  const s = SUBJECT_BY_ID[t.subject];
  const c = CONTENT[id];
  const tabs = c
    ? [['lernzettel', 'Lernzettel'], ['merkzettel', 'Merkzettel'], ['videos', 'Videos'], ['uebungen', 'Übungen', c.exercises.length], ['pruefung', 'Prüfung'], ['quellen', 'Quellen']]
    : [['ueberblick', 'Überblick'], ['videos', 'Videos'], ['pruefung', 'Prüfung'], ['quellen', 'Quellen']];
  const active = tabs.some(([k]) => k === params.get('tab')) ? params.get('tab') : tabs[0][0];
  const siblings = s.areas.find((a) => a.name === t.area).topics.filter((x) => x.id !== t.id);

  const panels = {
    lernzettel: () => `<div class="prose">
        <h2>Das lernst du hier</h2><ul class="goals">${c.goals.map((g) => `<li>${g}</li>`).join('')}</ul>
        ${renderBlocks(c.lernzettel)}
        <div class="actions"><button class="btn" data-tab-go="uebungen">Jetzt üben →</button><button class="btn btn--ghost" data-action="print">Lernzettel drucken</button></div>
      </div>`,
    merkzettel: () => `<div class="memo">
        <div class="memo__head"><h2>${t.title}</h2><span class="label">${s.sym} · ${kLabel(t.k)}</span></div>
        <dl>${c.merkzettel.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
      </div>
      <div class="actions"><a class="btn" href="#/karten/${id}">Als Karteikarten lernen${cardHint(id, c)}</a><button class="btn btn--ghost" data-action="print">Merkzettel drucken</button><button class="btn btn--ghost" data-tab-go="uebungen">Wissen testen →</button></div>`,
    uebungen: () => `<div class="scoreline"><span class="label">Fortschritt</span><strong data-score>0/${c.exercises.length}</strong><div class="progress"><i data-bar></i></div><button class="chip" data-action="reset">Zurücksetzen</button></div><div data-exercises></div>`,
    ueberblick: () => `<div class="pending">
        <p class="label"><b>●</b> In Bearbeitung</p>
        <h2>Lernzettel & Übungen folgen</h2>
        <p>Für „${t.title}“ erstellen wir gerade Lernzettel, Merkzettel und Übungen. Bis dahin findest du unter <a href="#/thema/${id}?tab=videos" data-tab-link="videos">Videos</a> passende Erklärungen geprüfter Bildungskanäle und unter <a href="#/thema/${id}?tab=quellen" data-tab-link="quellen">Quellen</a> verlässliche Nachschlagewerke.</p>
        ${t.keywords ? `<p class="muted">Stichworte: ${t.keywords}</p>` : ''}
      </div>`,
    videos: () => {
      const verified = c?.videos || [];
      return `<div class="prose" style="max-width:none">
        ${verified.length ? `<h2>Empfohlene Videos</h2><div class="linkgrid">${verified.map((v) => `
          <div><div class="ytbox" data-yt="${v.yt}"><div><p>Beim Abspielen wird eine Verbindung zu YouTube (Google) hergestellt.</p><button class="btn" data-action="yt">Video laden</button></div></div><p class="label" style="margin-top:6px">${v.channel} · ${v.title}</p></div>`).join('')}</div>` : ''}
        <h2>Erklärvideos auf etablierten Kanälen</h2>
        <p class="muted">Gezielte Suche nach „${t.title}“ auf Kanälen von Lehrkräften und öffentlich-rechtlichen Angeboten. Öffnet YouTube in einem neuen Tab.</p>
        <div class="linkgrid">${videoLinks(t, s, c?.videoQuery).map((v) => `
          <a class="linkcard" href="${v.url}" target="_blank" rel="noopener">
            <span class="label">YouTube</span><strong>${v.name}</strong><span>${v.note}</span><span class="linkcard__go">Videos zu „${t.title}“ ↗</span>
          </a>`).join('')}</div>
      </div>`;
    },
    pruefung: () => {
      const levels = [...new Set(t.schools.map((x) => ({ hs: 'esa', rs: 'msa', gym: 'abi' }[x])))];
      const land = LANDS.find((l) => l.code === store.land);
      const landLinks = land ? land.links.filter((l) => levels.includes(l.level)) : [];
      const nat = NATIONAL.filter((n) => levels.includes(n.level) && (n.level !== 'abi' || matchesSubject(n.title, s)));
      const files = EXAM_FILES.filter((g) => g.subject === s.id && levels.includes(g.level));
      const ownFiles = files.filter((g) => g.land === land?.code);
      const otherFiles = files.filter((g) => g.land !== land?.code);
      const pages = EXAM_PAGES.filter((p) => p.subject === s.id && p.levels.some((l) => levels.includes(l)) && (!land || p.land === land.code));
      return `<div class="prose" style="max-width:none">
        ${c?.exam ? `<h2>Prüfungsbezug</h2><p>${c.exam}</p>` : `<h2>Prüfungsbezug</h2><p>Das Thema ist relevant für: ${levels.map((l) => LEVELS[l].name).join(', ')}.</p>`}
        ${land ? `<p class="muted">In ${land.name} heißen die Abschlüsse: ${levels.map((l) => `<strong>${land.names[l]}</strong>`).join(', ')}.</p>` : ''}
        ${land && levels.includes('abi') ? `<h2>Weg zum Abitur in ${land.name}</h2>${gymInfo(land.code)}` : ''}
        ${pages.length ? `<h2>So läuft die Prüfung ab</h2><div>${pages.map(examPageRow).join('')}</div>` : ''}
        ${s.id === 'deutsch' && levels.includes('abi') ? `<h2>Abitur: Lektüren und Themenfelder</h2>
          <p>${land && abiFocusOf(land.code).length ? `Für ${land.name} erfasst: ${abiFocusOf(land.code).map((f) => f.title).join(', ')}.` : 'Verbindliche Lektüren und Themenfelder des gemeinsamen Abituraufgabenpools, dazu Landesvorgaben.'}</p>
          <div>${abiFocusRow()}</div>` : ''}
        <h2>Originalaufgaben ${land ? `in ${land.name}` : ''}</h2>
        ${land ? '' : `<p>Wähle dein Bundesland, um die passenden Prüfungsarchive zu sehen: <a href="#/pruefungen">Bundesland wählen →</a></p>`}
        ${landLinks.length ? `<div>${landLinks.map(examRow).join('')}</div>` : land ? `<p class="muted">Für ${land.name} ist uns zu diesem Abschluss kein öffentliches Archiv bekannt.</p>` : ''}
        ${ownFiles.length ? `<h3>Nach Jahrgang</h3><div>${ownFiles.map((g, i) => fileGroup(g, i === 0)).join('')}</div>` : ''}
        ${nat.length ? `<h3>Bundesweit</h3><div>${nat.map(examRow).join('')}</div>` : ''}
        ${otherFiles.length ? `<h3>Frei verfügbar aus anderen Ländern</h3>
          <p class="muted" style="font-size:14px">Andere Länder, gleiches Fach: gut zum Üben, aber Aufbau und Schwerpunkte können von deiner Prüfung abweichen.</p>
          <div>${otherFiles.map((g) => fileGroup(g, false, true)).join('')}</div>` : ''}
      </div>`;
    },
    quellen: () => `<div class="prose" style="max-width:none">
        <h2>Zum Nachlesen</h2>
        <div class="linkgrid">
          ${(c?.sources || []).map((q) => `<a class="linkcard" href="${q.url}" target="_blank" rel="noopener"><span class="label">Primärquelle</span><strong>${q.label}</strong><span class="linkcard__go">Öffnen ↗</span></a>`).join('')}
          ${referenceLinks(t, s, c?.videoQuery).map((r) => `<a class="linkcard" href="${r.url}" target="_blank" rel="noopener"><span class="label">Nachschlagen</span><strong>${r.name}</strong><span>${r.desc}</span><span class="linkcard__go">„${t.title}“ suchen ↗</span></a>`).join('')}
        </div>
        <h2>Lehrplan</h2>
        ${landNow() ? `<p>Wo das Thema in deinem Bundesland steht, findest du im offiziellen Lehrplanportal: <a href="${landNow().curriculum.url}" target="_blank" rel="noopener">${landNow().curriculum.name} ↗</a> – dort das Fach ${s.name} und deine Schulform wählen.</p>` : `<p>Wähle oben dein Bundesland, dann erscheint hier der Link zum Lehrplan deines Landes.</p>`}
        <p>Das Thema ist in den Bildungsstandards der KMK bzw. in den Lehrplänen der Länder verankert. Wie Inhalte geprüft werden, steht unter <a href="#/quellen">Quellen &amp; Methodik</a>.</p>
      </div>`,
  };

  return pagehead({
    crumbs: [['Fächer', '#/faecher'], [s.name, `#/fach/${s.id}`], [t.area]],
    title: t.title,
    lead: c ? c.summary : `Thema im Fach ${s.name}, ${kLabel(t.k)}.`,
    meta: metaItem('Fach', `<a href="#/fach/${s.id}">${s.name}</a>`) + metaItem('Stufe', kLabel(t.k)) + metaItem('Schulformen', schoolBadges(t.schools)) + landNameMeta(s) + metaItem('Status', status(!!c)),
  }) + `
  <div class="tabs"><div class="wrap tabs__inner" role="tablist">
    ${tabs.map(([k, label, n]) => `<button class="tab" role="tab" data-tab="${k}" aria-selected="${k === active}">${label}${n ? ` <span class="tab__n">${n}</span>` : ''}</button>`).join('')}
  </div></div>
  <div class="wrap topicbody" data-topic="${id}">
    <div>${tabs.map(([k]) => `<section class="panel" role="tabpanel" data-panel="${k}" ${k === active ? '' : 'hidden'}>${panels[k]()}</section>`).join('')}</div>
    <aside class="aside">
      ${c ? `<div class="aside__box"><span class="label">Dein Stand</span><div class="progress"><i data-bar></i></div><p class="muted" style="font-size:14px;margin:8px 0 0" data-score-text></p></div>` : ''}
      ${upcoming().filter((x) => x.topics.includes(id)).map((x) => `<div class="aside__box"><span class="label">Lernplan</span><p style="margin:4px 0 0"><a href="#/plan">${examTitle(x)}</a><br><span class="muted" style="font-size:14px">${daysUntil(x.date) === 0 ? 'heute' : `in ${daysUntil(x.date)} ${daysUntil(x.date) === 1 ? 'Tag' : 'Tagen'}`}${topicDone(id) ? ' · Thema erledigt' : ''}</span></p></div>`).join('')}
      <div class="aside__box"><span class="label">Im selben Bereich</span><ul>${siblings.slice(0, 8).map((x) => `<li><a href="#/thema/${x.id}">${x.title}</a>${CONTENT[x.id] ? ' <span class="status status--full" title="ausgearbeitet"></span>' : ''}</li>`).join('')}</ul></div>
      <div class="aside__box"><span class="label">Abschlussprüfung</span><ul><li><a href="#/pruefungen">Prüfungsarchiv ${store.land ? `(${store.land})` : ''} →</a></li></ul></div>
    </aside>
  </div>`;
}

const landNow = () => LANDS.find((l) => l.code === store.land);

// Fachbezeichnung im gewählten Land, bisher nur Ethik (KMK-Bericht)
function landNameMeta(s) {
  const land = landNow();
  if (s.id !== 'ethik' || !land) return '';
  return metaItem(`Fachname in ${land.code}`, `${LAND_INFO[land.code].ethik} <a href="${ETHIK_SOURCE.url}" target="_blank" rel="noopener" title="${ETHIK_SOURCE.label}">↗</a>`);
}

function gymInfo(code) {
  const i = LAND_INFO[code];
  return i ? `<p>${i.gym} <span class="muted" style="font-size:14px">Quelle: <a href="${i.source.url}" target="_blank" rel="noopener">${i.source.label} ↗</a></span></p>` : '';
}

function matchesSubject(title, s) {
  const map = { mathe: 'Mathematik', deutsch: 'Deutsch', englisch: 'Englisch', franzoesisch: 'Französisch', biologie: 'Biologie', chemie: 'Chemie', physik: 'Physik' };
  return map[s.id] ? title.includes(map[s.id]) : title.includes('Bildungsserver');
}

const ACCESS = { frei: 'Frei', login: 'Login über Schule', beispiel: 'Beispielaufgaben', info: 'Wegweiser' };
function examRow(x) {
  return `<a class="examrow" href="${x.url}" target="_blank" rel="noopener">
    <span><strong>${x.title}</strong><small>${x.desc}</small></span>
    <span class="access access--${x.access}">${ACCESS[x.access]}</span>
    <span class="arrow">↗</span>
  </a>`;
}

function examPageRow(p, showLand = false) {
  const landName = LANDS.find((l) => l.code === p.land)?.name;
  return `<a class="examrow" href="#/pruefung/${p.id}">
    <span><strong>${p.title}${showLand ? ` <span class="muted">· ${landName}</span>` : ''}</strong><small>${p.exam} · Stand ${p.stand}</small></span>
    <span class="access access--info">Überblick</span>
    <span class="arrow">→</span>
  </a>`;
}

// Eigener Übungssatz im Prüfungsstil; die Aufgaben hängt mountPractice() ein.
const practiceKey = (set) => `uebung:${set.id}`;
const practiceCount = (set) => set.parts.reduce((n, pt) => n + (pt.exercises?.length || 0), 0);
function practiceSet(set) {
  return `<section class="examblock practice" data-practice="${set.id}" style="margin-top:40px">
    <div class="examblock__head"><h2>${set.title}</h2><span class="muted">eigene Aufgaben im Prüfungsstil – keine Originalprüfung</span></div>
    <p style="max-width:70ch">${set.lead}</p>
    <div class="scoreline"><span class="label">Fortschritt</span><strong data-score>0/${practiceCount(set)}</strong><div class="progress"><i data-bar></i></div><button class="chip" data-action="reset-practice">Zurücksetzen</button></div>
    ${set.parts.map((pt, i) => `<div class="practice__part">
      <h3>${pt.title}</h3>${pt.note ? `<p class="label">${pt.note}</p>` : ''}
      ${pt.passage ? `<div class="passage">${pt.passage}</div>` : ''}
      ${pt.exercises ? `<div data-part="${i}"></div>` : ''}
      ${pt.task ? `<div class="ex"><div class="ex__head"><span class="label"><b>Schreibauftrag</b></span><span class="label">ohne automatische Prüfung</span></div><div class="ex__body">
        <div class="ex__q"><p>${pt.task.q}</p></div>
        <p class="label" style="margin:0 0 8px">Checkliste zum Überarbeiten</p>
        <ul class="checklist">${pt.task.checklist.map((c) => `<li><label><input type="checkbox"> ${c}</label></li>`).join('')}</ul>
      </div></div>` : ''}
    </div>`).join('')}
  </section>`;
}

function mountPractice(examId) {
  for (const set of PRACTICE.filter((x) => x.for.includes(examId))) {
    const root = $(`[data-practice="${set.id}"]`);
    if (!root) continue;
    const key = practiceKey(set), total = practiceCount(set);
    const update = () => {
      const solved = Object.values(store.progressOf(key)).filter((v) => v === true).length;
      root.querySelector('[data-bar]').style.width = `${Math.round((solved / total) * 100)}%`;
      root.querySelector('[data-score]').textContent = `${solved}/${total}`;
    };
    let n = 0;
    set.parts.forEach((pt, i) => {
      const box = root.querySelector(`[data-part="${i}"]`);
      (pt.exercises || []).forEach((ex) => box.appendChild(renderExercise(ex, n++, key, update)));
    });
    update();
  }
}

// Abitur Deutsch: gemeinsamer Pool (IQB) plus Landesvorgaben je Prüfungsjahr
const abiFocusOf = (code) => ABI_FOCUS.filter((f) => f.land === code);
function abiFocusRow() {
  return `<a class="examrow" href="#/abi-deutsch">
    <span><strong>Abitur Deutsch: Lektüren und Themenfelder</strong><small>Gemeinsamer Aufgabenpool und Landesvorgaben · Stand ${IQB_DEUTSCH.stand}</small></span>
    <span class="access access--info">Überblick</span>
    <span class="arrow">→</span>
  </a>`;
}

function viewAbiDeutsch() {
  const land = landNow();
  const val = (v) => Array.isArray(v) ? `<ul>${v.map((x) => `<li>${x}</li>`).join('')}</ul>` : `<p>${v}</p>`;
  const src = (q) => `<a href="${q.url}" target="_blank" rel="noopener">${q.label} ↗</a>`;
  const block = (f) => `<section class="examblock" style="margin-top:32px">
      <div class="examblock__head"><h2>${f.title}</h2><span class="muted">${LANDS.find((l) => l.code === f.land).name}</span></div>
      <dl class="examfacts">${f.items.map(([k, v]) => `<div><dt>${k}</dt><dd>${val(v)}</dd></div>`).join('')}</dl>
      <p>Quelle: ${f.sources.map(src).join(' · ')}</p>
    </section>`;
  const own = land ? abiFocusOf(land.code) : [];
  const others = ABI_FOCUS.filter((f) => f.land !== land?.code);
  return pagehead({
    crumbs: [['Prüfungen', '#/pruefungen'], ['Abitur Deutsch']],
    title: 'Abitur Deutsch: Lektüren und Themenfelder',
    lead: 'Viele Länder nutzen Aufgaben aus dem gemeinsamen Abituraufgabenpool des IQB. Dafür gibt es verbindliche Lektüren und Themenfelder – die Länder legen fest, was davon in ihrem Abitur gilt.',
    meta: metaItem('Fach', '<a href="#/fach/deutsch">Deutsch</a>') + metaItem('Abschluss', LEVELS.abi.short) + metaItem('Stand', IQB_DEUTSCH.stand),
  }) + `
  <div class="wrap" style="padding:36px var(--gutter) 72px">
    ${land ? (own.length ? own.map(block).join('') : `<p class="note"><strong>${land.name}</strong>Für dein Land haben wir noch keine Landesvorgaben erfasst. Maßgeblich sind die Abiturvorgaben deines Kultusministeriums und die Informationen deiner Schule.</p>`)
      : '<p class="muted">Wähle oben dein Bundesland, dann stehen die Vorgaben deines Landes zuerst.</p>'}

    <section class="examblock" style="margin-top:32px">
      <div class="examblock__head"><h2>Gemeinsamer Aufgabenpool</h2><span class="muted">Vereinbarung der Länder, Stand ${IQB_DEUTSCH.stand}</span></div>
      <h3 class="filehead">Verbindliche Lektüren</h3>
      <dl class="examfacts">${IQB_DEUTSCH.readings.map((r) => `<div><dt>Abitur ${r.years}</dt><dd>${val(r.works)}</dd></div>`).join('')}</dl>
      <h3 class="filehead">Themenfelder</h3>
      <dl class="examfacts">${IQB_DEUTSCH.fields.map((f) => `<div><dt>Themenfeld ${f.nr} · ${f.years}</dt><dd><p><strong>${f.title}</strong></p>${val(f.points)}</dd></div>`).join('')}</dl>
      <p>Quelle: ${src(IQB_DEUTSCH.source)}</p>
    </section>

    ${others.length ? `<h2 style="margin-top:40px">Vorgaben anderer Länder</h2>${others.map(block).join('')}` : ''}
    <p class="note"><strong>Hinweis</strong>Zusammengefasst aus den amtlichen Dokumenten. Verbindlich sind die aktuellen Vorgaben deines Landes und die Informationen deiner Schule.</p>
    <p class="muted"><a href="#/fach/deutsch">Alle Themen im Fach Deutsch →</a> &nbsp;·&nbsp; <a href="#/pruefungen?level=abi">Abitur-Archive →</a></p>
  </div>`;
}

function viewExamPage(id) {
  const p = EXAM_PAGE_BY_ID[id];
  if (!p) return viewNotFound();
  const land = LANDS.find((l) => l.code === p.land);
  const s = SUBJECT_BY_ID[p.subject];
  const files = EXAM_FILES.filter((g) => g.land === p.land && g.subject === p.subject && p.levels.includes(g.level));
  const links = land.links.filter((l) => p.levels.includes(l.level));
  const sets = PRACTICE.filter((x) => x.for.includes(p.id));
  const val = (v) => Array.isArray(v) ? `<ul>${v.map((x) => `<li>${x}</li>`).join('')}</ul>` : `<p>${v}</p>`;
  return pagehead({
    crumbs: [['Prüfungen', '#/pruefungen'], [land.name, `#/pruefungen?land=${land.code}`], [p.title]],
    title: p.title,
    lead: p.lead,
    meta: metaItem('Land', land.name) + metaItem('Abschluss', p.levels.map((l) => LEVELS[l].short).join(' · ')) + metaItem('Fach', `<a href="#/fach/${s.id}">${s.name}</a>`) + metaItem('Stand', p.stand),
  }) + `
  <div class="wrap" style="padding:36px var(--gutter) 72px">
    <p class="label" style="margin-bottom:6px">${p.exam}</p>
    <dl class="examfacts">${p.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${val(v)}</dd></div>`).join('')}</dl>
    <p class="note"><strong>Hinweis</strong>Zusammengefasst aus der amtlichen Quelle unten. Die Länder passen Details jedes Jahr an – verbindlich sind der aktuelle Erlass und die Informationen eurer Schule.</p>
    <p>Quelle: <a href="${p.source.url}" target="_blank" rel="noopener">${p.source.label} ↗</a>${(p.more || []).map((m) => ` · <a href="${m.url}" target="_blank" rel="noopener">${m.label} ↗</a>`).join('')}</p>

    ${sets.map(practiceSet).join('')}

    ${files.length || links.length ? `<section class="examblock" style="margin-top:40px">
      <div class="examblock__head"><h2>Originalaufgaben</h2><span class="muted">Originalaufgaben und Archive aus ${land.name}</span></div>
      ${files.map((g, i) => fileGroup(g, i === 0)).join('')}
      ${links.map(examRow).join('')}
    </section>` : ''}
    <p class="muted"><a href="#/fach/${s.id}">Alle Themen im Fach ${s.name} →</a> &nbsp;·&nbsp; <a href="#/pruefungen?land=${land.code}">Prüfungsarchiv ${land.name} →</a></p>
  </div>`;
}

// Eine Zeile je Fach und Abschluss; aufgeklappt stehen alle Jahrgänge mit direkten Dateilinks.
function fileGroup(g, open = false, showLand = false) {
  const years = g.years.map(([y]) => y);
  const count = g.years.reduce((n, [, f]) => n + f.length, 0);
  const landName = LANDS.find((l) => l.code === g.land)?.name;
  return `<details class="filegroup"${open ? ' open' : ''}>
    <summary><span><strong>${g.name}</strong><small>${showLand ? `${landName} · ` : ''}${LEVELS[g.level].name} · ${Math.min(...years)}–${Math.max(...years)} · ${count} Dateien</small></span>
      <span class="access access--frei">Frei</span><span class="arrow" aria-hidden="true">+</span></summary>
    <div class="filegroup__years">${g.years.map(([y, f]) => `<div class="fileyear"><b>${y}</b><span>${f.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`).join('')}</span></div>`).join('')}
      <p class="muted">Quelle: <a href="${g.page}" target="_blank" rel="noopener">${g.source} ↗</a> · PDF-Dateien des Landes, öffnen in neuem Tab</p></div>
  </details>`;
}

function viewExams(params) {
  const level = params.get('level') || '';
  const land = LANDS.find((l) => l.code === (params.get('land') || store.land));
  const lv = (x) => !level || x.level === level;
  const landFiles = land ? EXAM_FILES.filter((g) => g.land === land.code && lv(g)) : [];
  const landPages = land ? EXAM_PAGES.filter((p) => p.land === land.code && (!level || p.levels.includes(level))) : [];
  const landAbi = land && (!level || level === 'abi') && abiFocusOf(land.code).length > 0;

  return pagehead({
    crumbs: [['Prüfungen']],
    title: 'Prüfungsarchiv',
    lead: 'Alte Abschlussprüfungen, Musteraufgaben und Vergleichsarbeiten – direkt von den offiziellen Stellen. Prüfungen sind Ländersache: Wähle dein Bundesland.',
  }) + `
  <div class="wrap" style="padding:36px var(--gutter) 72px">
    <div class="factbox">
      <div><span class="label">Frei verfügbar</span><strong>IQB-Abituraufgaben, Bayern, Bremen, MV, Sachsen-Anhalt</strong></div>
      <div><span class="label">Login über die Schule</span><strong>u. a. NRW, Sachsen, Hessen – Zugang bei der Schulleitung erfragen</strong></div>
      <div><span class="label">Kein Landesarchiv</span><strong>Rheinland-Pfalz (dezentrales Abitur), Saarland</strong></div>
    </div>

    <p class="label" style="margin-bottom:10px">Bundesland</p>
    <div class="lands">${LANDS.map((l) => `<button class="land${land?.code === l.code ? ' is-on' : ''}" data-land="${l.code}"><b>${l.code}</b><span>${l.name}</span></button>`).join('')}</div>

    <div class="filterbar"><span class="label">Abschluss</span>
      <a class="chip${!level ? ' is-on' : ''}" href="#/pruefungen">Alle</a>
      ${Object.entries(LEVELS).map(([k, v]) => `<a class="chip${level === k ? ' is-on' : ''}" href="#/pruefungen?level=${k}">${v.name}</a>`).join('')}
    </div>

    ${land ? `<section class="examblock">
      <div class="examblock__head"><h2>${land.name}</h2>
        <span class="muted">${['esa', 'msa', 'abi'].map((k) => `<span class="label">${LEVELS[k].short}</span> ${land.names[k]}`).join(' &nbsp;·&nbsp; ')}</span></div>
      ${land.note ? `<p class="note" style="margin:14px 0">${land.note}</p>` : ''}
      ${!level || level === 'abi' ? `<div style="margin:14px 0">${gymInfo(land.code)}</div>` : ''}
      ${landPages.length || landAbi ? `<h3 class="filehead">Prüfungen im Detail – Aufbau, Dauer, Hilfsmittel</h3>${landPages.map(examPageRow).join('')}${landAbi ? abiFocusRow() : ''}<h3 class="filehead">Archive und Aufgaben</h3>` : ''}
      ${land.links.filter(lv).map(examRow).join('') || (land.note ? '' : '<p class="muted" style="padding:14px 4px">Für diesen Abschluss ist uns kein öffentliches Angebot bekannt. Frage deine Lehrkräfte nach Übungsaufgaben aus den Vorjahren.</p>')}
      ${landFiles.length ? `<h3 class="filehead">Direkt zu den Aufgaben – nach Fach und Jahr</h3>${landFiles.map((g) => fileGroup(g)).join('')}` : ''}
    </section>` : '<p class="empty" style="margin-bottom:40px">Wähle oben dein Bundesland, um die Prüfungsarchive deines Landes zu sehen.</p>'}

    ${land ? '' : `<section class="examblock">
      <div class="examblock__head"><h2>Prüfungen im Detail</h2><span class="muted">Aufbau, Dauer, Hilfsmittel – nach amtlichen Vorgaben</span></div>
      ${EXAM_PAGES.filter((p) => !level || p.levels.includes(level)).map((p) => examPageRow(p, true)).join('')}
      ${!level || level === 'abi' ? abiFocusRow() : ''}
    </section>`}

    <section class="examblock">
      <div class="examblock__head"><h2>Bundesweit</h2><span class="muted">gilt für alle Länder</span></div>
      ${NATIONAL.filter(lv).map(examRow).join('') || '<p class="muted" style="padding:14px 4px">Keine bundesweiten Einträge für diesen Filter.</p>'}
    </section>

    <p class="muted" style="font-size:14px;max-width:75ch">Original-Prüfungsaufgaben sind urheberrechtlich geschützt. Lernatlas kopiert sie deshalb nicht, sondern verlinkt auf die Stellen, die sie veröffentlichen. Verlage (z. B. Stark, Prüfungshefte) bieten kostenpflichtige Sammlungen mit Lösungen an. Linkstand: Oktober 2026 – defekte Links bitte melden.</p>
  </div>`;
}

function viewSearch(params) {
  const q = params.get('q') || '';
  const { topics, subjects } = search(q, { school: store.school, limit: 200 });
  const fitting = topics.filter((r) => r.fits);
  const other = topics.filter((r) => !r.fits);
  return pagehead({ crumbs: [['Suche']], title: q ? `„${escapeHtml(q)}“` : 'Suche', lead: q ? `${topics.length} Themen gefunden.` : 'Gib oben einen Suchbegriff ein.' }) + `
  <div class="wrap" style="padding:36px var(--gutter) 72px">
    <div class="filterbar"><span class="label">Schulform</span>${schoolChips()}</div>
    ${subjects.length ? `<div class="elgrid" style="margin-bottom:36px;max-width:640px">${subjects.map((s) => el(s)).join('')}</div>` : ''}
    ${fitting.length ? `<div class="rows">${fitting.map((r) => topicRow(r.topic)).join('')}</div>` : q ? '<p class="empty">Keine Treffer. Versuche einen allgemeineren Begriff oder prüfe die Schreibweise.</p>' : ''}
    ${other.length ? `<h2 class="label" style="margin:40px 0 10px">Andere Schulformen</h2><div class="rows">${other.map((r) => topicRow(r.topic)).join('')}</div>` : ''}
  </div>`;
}

function viewSources() {
  const item = (x) => `<div class="srcitem"><a href="${x.url}" target="_blank" rel="noopener">${x.name} ↗</a><p>${x.desc}</p></div>`;
  return pagehead({ crumbs: [['Quellen']], title: 'Quellen & Methodik', lead: 'Woher die Inhalte kommen und wie wir mit Quellen umgehen.' }) + `
  <div class="wrap" style="padding:36px var(--gutter) 72px">
    <div class="layout2" style="padding:0">
      <nav class="toc"><p class="label">Inhalt</p><a href="#q1" data-scroll>Grundsätze</a><a href="#q2" data-scroll>Lehrpläne</a><a href="#q3" data-scroll>Lernportale</a><a href="#q4" data-scroll>Videos</a></nav>
      <div class="prose" style="max-width:76ch">
        <h2 id="q1">Grundsätze</h2>
        <ol>
          <li><strong>Lehrplannah:</strong> Themen und Klassenstufen orientieren sich an den Bildungsstandards der Kultusministerkonferenz und an den Lehrplänen der Länder.</li>
          <li><strong>Offizielle Prüfungsquellen:</strong> Alte Prüfungen verlinken wir ausschließlich bei Kultusministerien, Landesinstituten, dem IQB, dem Deutschen Bildungsserver oder klar gekennzeichneten Lehrkraft-Sammlungen.</li>
          <li><strong>Eigene Lernzettel:</strong> Lernzettel, Merkzettel und Übungen sind eigene Texte. Sie werden fachlich geprüft und nennen weiterführende Quellen.</li>
          <li><strong>Keine Kopien:</strong> Prüfungsaufgaben und fremde Texte werden nicht übernommen, sondern verlinkt (Urheberrecht).</li>
          <li><strong>Datensparsam:</strong> Keine Konten, kein Tracking. Fortschritt und Einstellungen bleiben lokal im Browser. Videos werden erst nach Klick geladen.</li>
        </ol>
        <h2 id="q2">Lehrpläne & Standards</h2>
        <div class="srclist">${CURRICULA.map(item).join('')}</div>
        <h3>Lehrplanportale der Länder</h3>
        <div class="srclist">${LANDS.map((l) => item({ name: `${l.name}: ${l.curriculum.name}`, url: l.curriculum.url, desc: 'Offizielles Portal des Landes' })).join('')}</div>
        <h2 id="q3">Lernportale & Nachschlagewerke</h2>
        <div class="srclist">${LEARNING_SOURCES.map(item).join('')}</div>
        <h2 id="q4">Videos</h2>
        <p>Wir verweisen auf Kanäle von Lehrkräften (z. B. Lehrerschmidt, Mathe by Daniel Jung, Mr V Englisch), auf öffentlich-rechtliche Angebote (funk-Formate wie musstewissen und MrWissen2go, Terra X, planet schule, ARD alpha) sowie auf simpleclub. Einzelne Videos werden nur nach redaktioneller Sichtung fest eingebunden.</p>
      </div>
    </div>
  </div>`;
}

function viewNotFound() {
  return pagehead({ title: 'Seite nicht gefunden', lead: 'Diese Seite gibt es nicht (mehr). <a href="#/">Zur Startseite</a> oder oben ein Thema suchen.' });
}

// ───────────────────────── Router ─────────────────────────
function parseHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [path, qs] = raw.split('?');
  return { parts: path.split('/').filter(Boolean).map(decodeURIComponent), params: new URLSearchParams(qs || '') };
}

let lastPath = '';
function route() {
  const { parts, params } = parseHash();
  const [a, b] = parts;
  const path = parts.join('/');
  let html, title = 'Lernatlas';

  if (!a) html = viewHome();
  else if (a === 'faecher') { html = viewSubjects(); title = 'Fächer · Lernatlas'; }
  else if (a === 'fach') { html = viewSubject(b, params); title = `${SUBJECT_BY_ID[b]?.name || 'Fach'} · Lernatlas`; }
  else if (a === 'thema') { html = viewTopic(b, params); title = `${TOPIC_BY_ID[b]?.title || 'Thema'} · Lernatlas`; }
  else if (a === 'pruefungen') { html = viewExams(params); title = 'Prüfungsarchiv · Lernatlas'; }
  else if (a === 'abi-deutsch') { html = viewAbiDeutsch(); title = 'Abitur Deutsch: Lektüren und Themenfelder · Lernatlas'; }
  else if (a === 'pruefung') { html = viewExamPage(b); title = `${EXAM_PAGE_BY_ID[b]?.title || 'Prüfung'} · Lernatlas`; }
  else if (a === 'plan') { html = viewPlan(); title = 'Lernplan · Lernatlas'; }
  else if (a === 'karten') { html = viewCards(b, params); title = 'Karteikarten · Lernatlas'; }
  else if (a === 'suche') { html = viewSearch(params); title = 'Suche · Lernatlas'; }
  else if (a === 'quellen') { html = viewSources(); title = 'Quellen · Lernatlas'; }
  else html = viewNotFound();

  main.innerHTML = html;
  document.title = title;
  document.querySelectorAll('[data-nav]').forEach((n) => n.classList.toggle('is-active', n.dataset.nav === a || (a === 'fach' && n.dataset.nav === 'faecher') || (a === 'pruefung' && n.dataset.nav === 'pruefungen')));
  if (path !== lastPath) window.scrollTo(0, 0);
  lastPath = path;
  setMenu(false);

  if (a === 'thema') mountTopic(b);
  if (a === 'pruefung') mountPractice(b);
  if (a === 'karten') mountCards();
}

// ───────────────────────── Lernplan ─────────────────────────
const WEEKDAY = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const longDate = (d) => WEEKDAY.format(new Date(`${d}T00:00`));
const shortDate = (d) => d.slice(8, 10) + '.' + d.slice(5, 7) + '.';

// Ein Thema gilt als erledigt, wenn alle Übungen gelöst sind.
const solvedOf = (id) => Object.values(store.progressOf(id)).filter((v) => v === true).length;
const topicDone = (id) => CONTENT[id] && solvedOf(id) >= CONTENT[id].exercises.length;
const examTitle = (x) => x.name || `${SUBJECT_BY_ID[x.subject].name} – Prüfung`;
const plannable = (sid) => SUBJECT_BY_ID[sid].areas.flatMap((a) => a.topics).filter((t) => CONTENT[t.id]);
const upcoming = () => store.exams.filter((x) => daysUntil(x.date) >= 0).sort((a, b) => a.date.localeCompare(b.date));

function countdown(days) {
  if (days === 0) return '<strong class="countdown__n">Heute</strong><span>ist Prüfung</span>';
  if (days === 1) return '<strong class="countdown__n">1</strong><span>Tag bis zur Prüfung</span>';
  return `<strong class="countdown__n">${days}</strong><span>Tage bis zur Prüfung${days >= 14 ? ` · ${Math.floor(days / 7)} Wochen` : ''}</span>`;
}

function planTopicRow(id) {
  const t = TOPIC_BY_ID[id], c = CONTENT[id];
  const done = topicDone(id);
  const due = startedTopics().includes(id) ? deckStats(id, c.merkzettel.length).due : null;
  return `<li class="plantopic${done ? ' is-done' : ''}">
    <a href="#/thema/${id}"><strong>${t.title}</strong></a>
    <span class="plantopic__links">
      <a href="#/thema/${id}?tab=lernzettel">Lernzettel</a>
      <a href="#/thema/${id}?tab=uebungen">Übungen ${solvedOf(id)}/${c.exercises.length}</a>
      <a href="#/karten/${id}">Karten${due ? ` · ${due} fällig` : ''}</a>
    </span>
  </li>`;
}

function examCard(x) {
  const s = SUBJECT_BY_ID[x.subject];
  const topics = x.topics.filter((id) => CONTENT[id]);
  const plan = buildPlan(topics, x.date, topicDone);
  const done = topics.filter(topicDone).length;
  const pct = topics.length ? Math.round((done / topics.length) * 100) : 0;
  const all = plannable(x.subject);
  const areas = [...new Set(all.map((t) => t.area))];
  return `<section class="examblock plan" data-exam="${x.id}">
    <div class="plan__head">
      <div><p class="label">${s.name} · ${longDate(x.date)}</p><h2>${examTitle(x)}</h2></div>
      <div class="countdown">${plan.days < 0 ? '<strong class="countdown__n">–</strong><span>Prüfung vorbei</span>' : countdown(plan.days)}</div>
    </div>
    <div class="scoreline"><span class="label">Themen erledigt</span><strong>${done}/${topics.length}</strong><div class="progress"><i style="width:${pct}%"></i></div></div>
    ${!topics.length ? '<p class="muted">Noch keine Themen ausgewählt. Wähle unten die Themen, die in der Prüfung drankommen.</p>'
      : plan.days < 0 ? '' : `
      ${plan.blocks.map((b, i) => `<div class="planweek${i === 0 ? ' is-now' : ''}">
        <p class="label">${i === 0 ? 'Diese Woche' : `Woche ${i + 1}`} · ${shortDate(b.from)}–${shortDate(b.to)}</p>
        ${b.review ? `<p><strong>Wiederholen statt Neues:</strong> fällige <a href="#/karten?faellig">Karteikarten</a>, Übungen mit Fehlern noch einmal rechnen, Merkzettel durchgehen. Am Tag vor der Prüfung nur noch leicht wiederholen.</p>`
          : `<ul class="plantopics">${b.topics.map(planTopicRow).join('')}</ul>`}
      </div>`).join('')}
      ${plan.open === 0 ? '<p class="note"><strong>Alles erledigt</strong>Alle Übungen der ausgewählten Themen sind gelöst. Halte das Wissen mit den Karteikarten frisch.</p>' : ''}
      ${done ? `<details class="plandone"><summary>Erledigt (${done})</summary><ul class="plantopics">${topics.filter(topicDone).map(planTopicRow).join('')}</ul></details>` : ''}`}
    <details class="planpick"${topics.length ? '' : ' open'}>
      <summary>Themen auswählen (${topics.length} von ${all.length})</summary>
      <p class="muted" style="font-size:14px">Nur ausgearbeitete Themen mit Übungen. Welche Themen drankommen, sagt dir deine Lehrkraft.</p>
      ${areas.map((a) => `<fieldset><legend class="label">${a}</legend>${all.filter((t) => t.area === a).map((t) =>
        `<label><input type="checkbox" data-plan-topic="${t.id}"${x.topics.includes(t.id) ? ' checked' : ''}> ${t.title} <span class="muted">${kLabel(t.k)}</span></label>`).join('')}</fieldset>`).join('')}
    </details>
    <div class="actions"><button class="chip" data-plan-remove>Prüfung entfernen</button></div>
  </section>`;
}

function viewPlan() {
  const subjects = SUBJECTS.filter((s) => plannable(s.id).length);
  const exams = [...upcoming(), ...store.exams.filter((x) => daysUntil(x.date) < 0)];
  return pagehead({
    crumbs: [['Lernplan']],
    title: 'Lernplan',
    lead: 'Trag deine Prüfungstermine ein. Der Plan verteilt die offenen Themen auf die Wochen bis dahin und hält die letzte Woche für die Wiederholung frei. Er passt sich an, sobald du Übungen löst. Alles bleibt in diesem Browser.',
  }) + `
  <div class="wrap" style="padding:36px var(--gutter) 72px">
    ${exams.map(examCard).join('') || '<p class="empty">Noch keine Prüfung eingetragen.</p>'}
    <section class="examblock" style="margin-top:40px">
      <div class="examblock__head"><h2>Prüfung eintragen</h2><span class="muted">Den Termin erfährst du von deiner Schule oder aus dem Terminplan deines Kultusministeriums.</span></div>
      <form class="planform" data-plan-form>
        <label><span class="label">Fach</span><select name="subject" required>${subjects.map((s) => `<option value="${s.id}">${s.name}</option>`).join('')}</select></label>
        <label><span class="label">Datum</span><input type="date" name="date" min="${today()}" required></label>
        <label><span class="label">Name (optional)</span><input type="text" name="name" maxlength="60" placeholder="z. B. Klassenarbeit Brüche"></label>
        <button class="btn" type="submit">Eintragen</button>
      </form>
    </section>
  </div>`;
}

document.addEventListener('submit', (e) => {
  const f = e.target.closest('[data-plan-form]');
  if (!f) return;
  e.preventDefault();
  const d = new FormData(f);
  const subject = d.get('subject');
  // Ohne Vorauswahl: Welche Themen drankommen, weiß nur die Schule.
  store.addExam({ id: Date.now().toString(36), subject, date: d.get('date'), name: String(d.get('name') || '').trim(), topics: [] });
  route();
});
document.addEventListener('change', (e) => {
  const box = e.target.closest('[data-plan-topic]');
  if (!box) return;
  const id = box.closest('[data-exam]').dataset.exam;
  const x = store.exams.find((v) => v.id === id);
  const topics = box.checked ? [...x.topics, box.dataset.planTopic] : x.topics.filter((t) => t !== box.dataset.planTopic);
  store.updateExam(id, { topics });
  const open = [...document.querySelectorAll('details.planpick')].map((dt) => dt.open);
  const y = window.scrollY;
  route();
  document.querySelectorAll('details.planpick').forEach((dt, i) => { dt.open = open[i]; });
  window.scrollTo(0, y);
});
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-plan-remove]');
  if (!b) return;
  const id = b.closest('[data-exam]').dataset.exam;
  if (confirm(`„${examTitle(store.exams.find((v) => v.id === id))}“ aus dem Lernplan entfernen?`)) { store.removeExam(id); route(); }
});

// ───────────────────────── Karteikarten ─────────────────────────
// Lernsitzung im Speicher; die Bewertungen landen über cards.js im localStorage.
let session = null;
const fmtDate = (d) => d.split('-').reverse().join('.');

function cardHint(id, c) {
  if (!startedTopics().includes(id)) return '';
  const { due } = deckStats(id, c.merkzettel.length);
  return due ? ` · ${due} fällig` : ' · alles wiederholt';
}

function cardQueue(topicIds, all) {
  return topicIds.flatMap((tid) => (CONTENT[tid]?.merkzettel || []).map((_, i) => ({ tid, i })))
    .filter((x) => all || isDue(store.cards[cardId(x.tid, x.i)]));
}

function viewCards(topicId, params) {
  if (topicId) {
    const t = TOPIC_BY_ID[topicId], c = CONTENT[topicId];
    if (!t || !c) return viewNotFound();
    const s = SUBJECT_BY_ID[t.subject];
    session = { queue: cardQueue([topicId], params.has('alle')), known: 0, again: 0, topicId };
    return pagehead({
      crumbs: [['Karteikarten', '#/karten'], [s.name, `#/fach/${s.id}`], [t.title, `#/thema/${topicId}?tab=merkzettel`]],
      title: t.title,
      lead: 'Karteikarten aus dem Merkzettel. Erst selbst überlegen, dann aufdecken und ehrlich bewerten.',
    }) + '<div class="wrap cardwrap" data-cards></div>';
  }
  if (params.has('faellig')) {
    session = { queue: cardQueue(startedTopics(), false), known: 0, again: 0 };
    return pagehead({ crumbs: [['Karteikarten', '#/karten'], ['Fällige Karten']], title: 'Fällige Karten', lead: 'Alle Karten aus deinen Themen, die heute dran sind.' }) + '<div class="wrap cardwrap" data-cards></div>';
  }
  session = null;
  const decks = startedTopics().filter((id) => CONTENT[id] && TOPIC_BY_ID[id])
    .map((id) => ({ id, t: TOPIC_BY_ID[id], next: nextDue(id, CONTENT[id].merkzettel.length), ...deckStats(id, CONTENT[id].merkzettel.length) }));
  const due = decks.reduce((n, d) => n + d.due, 0);
  return pagehead({
    crumbs: [['Karteikarten']],
    title: 'Karteikarten',
    lead: 'Lernkartei aus den Merkzetteln: Was du weißt, kommt in größeren Abständen wieder, was du nicht weißt, gleich noch einmal. Dein Stand bleibt nur in diesem Browser.',
  }) + `
  <div class="wrap" style="padding:36px var(--gutter) 72px">
    ${decks.length ? `<div class="factbox">
        <div><span class="label">Heute fällig</span><strong>${due} ${due === 1 ? 'Karte' : 'Karten'}</strong></div>
        <div><span class="label">Themen in deiner Kartei</span><strong>${decks.length}</strong></div>
        <div><span class="label">Sicher gelernt (Fach ${MAX_BOX})</span><strong>${decks.reduce((n, d) => n + d.boxes[MAX_BOX - 1], 0)}</strong></div>
      </div>
      ${due ? `<div class="actions" style="margin:0 0 28px"><a class="btn" href="#/karten?faellig">Fällige Karten lernen (${due}) →</a></div>` : '<p class="muted">Für heute ist alles wiederholt.</p>'}
      <section class="examblock"><div class="examblock__head"><h2>Deine Themen</h2><span class="muted">Balken: Karten je Fach, links neu, rechts sicher gelernt</span></div>
        ${decks.map((d) => `<a class="examrow" href="#/karten/${d.id}">
          <span><strong>${d.t.title}</strong><small>${SUBJECT_BY_ID[d.t.subject].name} · ${d.due ? `${d.due} fällig` : `nächste Wiederholung ${d.next ? fmtDate(d.next) : '–'}`}</small></span>
          <span class="boxes" aria-label="Karten je Fach">${[d.fresh, ...d.boxes].map((n, b) => `<i title="${b ? `Fach ${b}` : 'Neu'}: ${n}" style="--n:${n}"></i>`).join('')}</span>
          <span class="arrow">→</span>
        </a>`).join('')}
      </section>`
      : `<p class="empty">Noch keine Karten. Öffne ein ausgearbeitetes Thema und wähle im Reiter „Merkzettel“ <strong>Als Karteikarten lernen</strong>. <a href="#/faecher">Zu den Fächern →</a></p>`}
    <section class="examblock" style="margin-top:40px"><div class="examblock__head"><h2>So funktioniert die Kartei</h2></div>
      <dl class="examfacts">
        <div><dt>Gewusst</dt><dd><p>Die Karte rückt ein Fach weiter und kommt erst später wieder: ${INTERVALS.slice(1).map((n, i) => `Fach ${i + 1} nach ${n} ${n === 1 ? 'Tag' : 'Tagen'}`).join(', ')}.</p></dd></div>
        <div><dt>Nochmal</dt><dd><p>Die Karte fällt zurück in Fach 1 und kommt in derselben Runde noch einmal.</p></dd></div>
        <div><dt>Tastatur</dt><dd><p>Leertaste deckt auf, <kbd>1</kbd> heißt „Nochmal“, <kbd>2</kbd> heißt „Gewusst“.</p></dd></div>
      </dl>
    </section>
  </div>`;
}

function mountCards() {
  const root = $('[data-cards]');
  if (!root || !session) return;
  const card = session.queue[0];
  if (!card) {
    const done = session.known + session.again;
    const next = session.topicId ? nextDue(session.topicId, CONTENT[session.topicId].merkzettel.length) : null;
    root.innerHTML = `<div class="flash flash--end">
      <p class="label">${done ? 'Runde beendet' : 'Nichts fällig'}</p>
      <h2>${done ? `${session.known} gewusst, ${session.again}× nochmal` : 'Für heute ist alles wiederholt.'}</h2>
      ${next ? `<p class="muted">Nächste Wiederholung: ${fmtDate(next)}</p>` : ''}
      <div class="actions" style="justify-content:center">
        ${session.topicId ? `<a class="btn" href="#/thema/${session.topicId}?tab=uebungen">Übungen zum Thema →</a><a class="btn btn--ghost" href="#/karten/${session.topicId}?alle">Alle Karten üben</a>` : ''}
        <a class="btn btn--ghost" href="#/karten">Zur Kartei</a>
      </div></div>`;
    return;
  }
  const [front, back] = CONTENT[card.tid].merkzettel[card.i];
  const box = store.cards[cardId(card.tid, card.i)]?.box;
  root.innerHTML = `
    <div class="flashbar"><span class="label">Noch ${session.queue.length} · ${session.known} gewusst</span><span class="label">${box ? `Fach ${box}` : 'Neu'}</span></div>
    <article class="flash">
      ${session.topicId ? '' : `<p class="label">${TOPIC_BY_ID[card.tid].title}</p>`}
      <div class="flash__front">${front}</div>
      <div class="flash__back" data-back hidden>${back}</div>
    </article>
    <div class="actions flash__actions">
      <button class="btn" data-card="show">Aufdecken <kbd>Leertaste</kbd></button>
      <button class="btn btn--ghost" data-card="again" hidden>Nochmal <kbd>1</kbd></button>
      <button class="btn" data-card="known" hidden>Gewusst <kbd>2</kbd></button>
    </div>`;
  root.querySelector('[data-card="show"]').focus({ preventScroll: true });
}

function cardAction(kind) {
  const root = $('[data-cards]');
  if (!root || !session?.queue.length) return;
  const shown = !root.querySelector('[data-back]').hidden;
  if (kind === 'show' && !shown) {
    root.querySelector('[data-back]').hidden = false;
    root.querySelector('[data-card="show"]').hidden = true;
    root.querySelectorAll('[data-card="again"], [data-card="known"]').forEach((b) => { b.hidden = false; });
    root.querySelector('[data-card="known"]').focus({ preventScroll: true });
    return;
  }
  if (!shown || (kind !== 'again' && kind !== 'known')) return;
  const card = session.queue.shift();
  rate(cardId(card.tid, card.i), kind === 'known');
  if (kind === 'known') session.known++;
  else { session.again++; session.queue.push(card); }
  mountCards();
}

document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-card]');
  if (b) cardAction(b.dataset.card);
});
document.addEventListener('keydown', (e) => {
  if (!session || !$('[data-cards]') || e.ctrlKey || e.metaKey || e.altKey || e.target.closest?.('input, textarea, select')) return;
  const kind = { ' ': 'show', Enter: 'show', 1: 'again', 2: 'known' }[e.key];
  if (!kind) return;
  e.preventDefault();
  cardAction(kind);
});

function mountTopic(id) {
  const c = CONTENT[id];
  if (!c) return;
  const box = $('[data-exercises]');
  const update = () => {
    const p = store.progressOf(id);
    const solved = Object.values(p).filter((v) => v === true).length;
    const pct = Math.round((solved / c.exercises.length) * 100);
    document.querySelectorAll('[data-bar]').forEach((b) => { b.style.width = `${pct}%`; });
    const sc = $('[data-score]'); if (sc) sc.textContent = `${solved}/${c.exercises.length}`;
    const st = $('[data-score-text]'); if (st) st.textContent = `${solved} von ${c.exercises.length} Übungen gelöst`;
  };
  if (box) c.exercises.forEach((ex, i) => box.appendChild(renderExercise(ex, i, id, update)));
  update();
}

function selectTab(key) {
  const tabs = document.querySelectorAll('[data-tab]');
  if (![...tabs].some((t) => t.dataset.tab === key)) return;
  tabs.forEach((t) => t.setAttribute('aria-selected', String(t.dataset.tab === key)));
  document.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== key; });
  const { parts } = parseHash();
  history.replaceState(null, '', `#/${parts.join('/')}?tab=${key}`);
  const bar = $('.tabs');
  if (bar && window.scrollY > bar.offsetTop) window.scrollTo({ top: bar.offsetTop - 64 + 1 });
}

// ───────────────────────── Suche (Dialog) ─────────────────────────
const dlg = $('.searchdlg');
const dlgInput = $('input', dlg);
const dlgResults = $('.searchdlg__results', dlg);
let sel = -1;

function openSearch(prefill = '') {
  dlgInput.value = prefill;
  renderHits();
  dlg.showModal();
  dlgInput.focus();
  dlgInput.select();
}

function renderHits() {
  const q = dlgInput.value;
  sel = -1;
  if (!q.trim()) {
    const full = ALL_TOPICS.filter((t) => CONTENT[t.id] && fitsSchool(t)).slice(0, 8);
    dlgResults.innerHTML = `<div class="hit__group label">Ausgearbeitete Themen</div>${full.map((t) => hitHtml(t, '')).join('')}`;
    return;
  }
  const { topics, subjects } = search(q, { school: store.school, limit: 12 });
  if (!topics.length && !subjects.length) {
    dlgResults.innerHTML = `<p class="searchdlg__empty">Nichts gefunden für „${escapeHtml(q)}“. Versuche einen anderen Begriff.</p>`;
    return;
  }
  dlgResults.innerHTML =
    (subjects.length ? `<div class="hit__group label">Fächer</div>${subjects.slice(0, 3).map((s) => `
      <a class="hit" href="#/fach/${s.id}"><span class="row__sym" style="color:var(--g-${s.g})">${s.sym}</span><span><span class="hit__title">${highlight(s.name, q)}</span><span class="hit__meta">${countTopics(s)} Themen</span></span><span></span></a>`).join('')}` : '') +
    (topics.length ? `<div class="hit__group label">Themen</div>${topics.map((r) => hitHtml(r.topic, q, r.fits)).join('')}
      <a class="hit" href="#/suche?q=${encodeURIComponent(q)}"><span></span><span class="hit__title">Alle Ergebnisse anzeigen →</span><span></span></a>` : '');
}

function hitHtml(t, q, fits = true) {
  const s = SUBJECT_BY_ID[t.subject];
  return `<a class="hit" href="#/thema/${t.id}" ${fits ? '' : 'style="opacity:.6"'}>
    <span class="row__sym" style="color:var(--g-${s.g})">${s.sym}</span>
    <span><span class="hit__title">${highlight(t.title, q)}</span><span class="hit__meta">${s.name} · ${kLabel(t.k)}${fits ? '' : ' · andere Schulform'}</span></span>
    ${status(!!CONTENT[t.id])}
  </a>`;
}

dlgInput.addEventListener('input', renderHits);
dlg.addEventListener('keydown', (e) => {
  const hits = [...dlgResults.querySelectorAll('.hit')];
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    sel = Math.max(0, Math.min(hits.length - 1, sel + (e.key === 'ArrowDown' ? 1 : -1)));
    hits.forEach((h, i) => h.classList.toggle('is-sel', i === sel));
    hits[sel]?.scrollIntoView({ block: 'nearest' });
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const q = dlgInput.value.trim();
    if (hits[sel]) location.hash = hits[sel].getAttribute('href');
    else if (q) location.hash = `#/suche?q=${encodeURIComponent(q)}`;
    dlg.close();
  }
});
dlgResults.addEventListener('click', (e) => { if (e.target.closest('.hit')) dlg.close(); });
dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });

// ───────────────────────── Globale Events ─────────────────────────
document.addEventListener('click', (e) => {
  const t = e.target;
  const action = t.closest('[data-action]')?.dataset.action;
  if (action === 'open-search') openSearch();
  if (action === 'close-search') dlg.close();
  if (action === 'print') window.print();
  if (action === 'theme') toggleTheme();
  if (action === 'menu') setMenu(!$('.topbar').classList.contains('is-open'));
  else if (!t.closest('.mainnav') || t.closest('.mainnav a')) setMenu(false);
  if (action === 'reset-practice') { const set = t.closest('[data-practice]')?.dataset.practice; if (set) { store.resetTopic(`uebung:${set}`); const y = window.scrollY; route(); window.scrollTo(0, y); } }
  if (action === 'reset') { const id = $('[data-topic]')?.dataset.topic; if (id) { store.resetTopic(id); route(); selectTab('uebungen'); } }
  if (action === 'yt') {
    const box = t.closest('[data-yt]');
    box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(box.dataset.yt)}?autoplay=1" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen title="Video"></iframe>`;
  }

  const q = t.closest('[data-q]')?.dataset.q;
  if (q) openSearch(q);

  const sch = t.closest('[data-school]');
  if (sch && sch.tagName === 'BUTTON') { store.setSchool(sch.dataset.school); syncHeader(); route(); }

  const land = t.closest('[data-land]')?.dataset.land;
  if (land) {
    store.setLand(land);
    syncHeader();
    const { params } = parseHash();
    params.delete('land');
    const qs = params.toString();
    if (location.hash.startsWith('#/pruefungen')) { history.replaceState(null, '', `#/pruefungen${qs ? '?' + qs : ''}`); route(); }
  }

  const tab = t.closest('[data-tab]')?.dataset.tab || t.closest('[data-tab-go]')?.dataset.tabGo;
  if (tab) selectTab(tab);
  const tabLink = t.closest('[data-tab-link]')?.dataset.tabLink;
  if (tabLink) { e.preventDefault(); selectTab(tabLink); }

  const scroll = t.closest('[data-scroll]');
  if (scroll) { e.preventDefault(); document.querySelector(scroll.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' }); }
});

$('[data-action="school"]').addEventListener('change', (e) => { store.setSchool(e.target.value); route(); });
$('[data-action="land"]').insertAdjacentHTML('beforeend', LANDS.map((l) => `<option value="${l.code}">${l.name}</option>`).join(''));
$('[data-action="land"]').addEventListener('change', (e) => { store.setLand(e.target.value); route(); });

document.addEventListener('keydown', (e) => {
  const typing = e.target instanceof Element && e.target.closest('input, textarea, select');
  if (e.key === '/' && !typing && !dlg.open) { e.preventDefault(); openSearch(); }
});

// Tabs per Pfeiltaste
document.addEventListener('keydown', (e) => {
  if (!(e.target instanceof Element) || !e.target.matches('[data-tab]') ||!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const i = tabs.indexOf(e.target) + (e.key === 'ArrowRight' ? 1 : -1);
  const next = tabs[(i + tabs.length) % tabs.length];
  next.focus(); selectTab(next.dataset.tab);
});

// Menü für schmale Bildschirme
function setMenu(open) {
  $('.topbar').classList.toggle('is-open', open);
  const b = $('[data-action="menu"]');
  b.setAttribute('aria-expanded', String(open));
  b.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $('.topbar').classList.contains('is-open')) { setMenu(false); $('[data-action="menu"]').focus(); }
});

function syncHeader() { $('[data-action="school"]').value = store.school; $('[data-action="land"]').value = store.land; }

function applyTheme() {
  if (store.theme) document.documentElement.dataset.theme = store.theme;
  else delete document.documentElement.dataset.theme;
}
function toggleTheme() {
  const dark = store.theme ? store.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  store.setTheme(dark ? 'light' : 'dark');
  applyTheme();
}

applyTheme();
syncHeader();
window.addEventListener('hashchange', route);
route();

// ───────────────────────── Offline (PWA) ─────────────────────────
// sw.js speichert alle eigenen Dateien; ohne Netz läuft die Seite aus dem Cache weiter.
if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => { /* z. B. privater Modus – Seite läuft trotzdem */ });
}
const syncOnline = () => { $('.offline').hidden = navigator.onLine; };
window.addEventListener('online', syncOnline);
window.addEventListener('offline', syncOnline);
syncOnline();
