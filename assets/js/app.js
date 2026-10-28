// Lernatlas – App: Router, Ansichten, Suche
import { SCHOOLS, GROUPS, SUBJECTS, SUBJECT_BY_ID, TOPIC_BY_ID, ALL_TOPICS } from '../../data/catalog.js';
import { CONTENT } from '../../data/content/index.js';
import { LANDS, NATIONAL, LEVELS } from '../../data/exams.js';
import { videoLinks, referenceLinks, CURRICULA, LEARNING_SOURCES } from '../../data/sources.js';
import { store } from './store.js';
import { search, highlight, escapeHtml } from './search.js';
import { renderBlocks } from './render.js';
import { renderExercise } from './exercise.js';

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
    meta: metaItem('Themen', countTopics(s)) + metaItem('Ausgearbeitet', countFull(s)) + metaItem('Schulformen', s.schools.map((x) => SCHOOLS[x].name).join(', ')),
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
      <div class="actions"><button class="btn" data-action="print">Merkzettel drucken</button><button class="btn btn--ghost" data-tab-go="uebungen">Wissen testen →</button></div>`,
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
      return `<div class="prose" style="max-width:none">
        ${c?.exam ? `<h2>Prüfungsbezug</h2><p>${c.exam}</p>` : `<h2>Prüfungsbezug</h2><p>Das Thema ist relevant für: ${levels.map((l) => LEVELS[l].name).join(', ')}.</p>`}
        <h2>Originalaufgaben ${land ? `in ${land.name}` : ''}</h2>
        ${land ? '' : `<p>Wähle dein Bundesland, um die passenden Prüfungsarchive zu sehen: <a href="#/pruefungen">Bundesland wählen →</a></p>`}
        ${landLinks.length ? `<div>${landLinks.map(examRow).join('')}</div>` : land ? `<p class="muted">Für ${land.name} ist uns zu diesem Abschluss kein öffentliches Archiv bekannt.</p>` : ''}
        ${nat.length ? `<h3>Bundesweit</h3><div>${nat.map(examRow).join('')}</div>` : ''}
      </div>`;
    },
    quellen: () => `<div class="prose" style="max-width:none">
        <h2>Zum Nachlesen</h2>
        <div class="linkgrid">
          ${(c?.sources || []).map((q) => `<a class="linkcard" href="${q.url}" target="_blank" rel="noopener"><span class="label">Primärquelle</span><strong>${q.label}</strong><span class="linkcard__go">Öffnen ↗</span></a>`).join('')}
          ${referenceLinks(t, s, c?.videoQuery).map((r) => `<a class="linkcard" href="${r.url}" target="_blank" rel="noopener"><span class="label">Nachschlagen</span><strong>${r.name}</strong><span>${r.desc}</span><span class="linkcard__go">„${t.title}“ suchen ↗</span></a>`).join('')}
        </div>
        <h2>Lehrplan</h2>
        <p>Das Thema ist in den Bildungsstandards der KMK bzw. in den Lehrplänen der Länder verankert. Wie Inhalte geprüft werden, steht unter <a href="#/quellen">Quellen &amp; Methodik</a>.</p>
      </div>`,
  };

  return pagehead({
    crumbs: [['Fächer', '#/faecher'], [s.name, `#/fach/${s.id}`], [t.area]],
    title: t.title,
    lead: c ? c.summary : `Thema im Fach ${s.name}, ${kLabel(t.k)}.`,
    meta: metaItem('Fach', `<a href="#/fach/${s.id}">${s.name}</a>`) + metaItem('Stufe', kLabel(t.k)) + metaItem('Schulformen', schoolBadges(t.schools)) + metaItem('Status', status(!!c)),
  }) + `
  <div class="tabs"><div class="wrap tabs__inner" role="tablist">
    ${tabs.map(([k, label, n]) => `<button class="tab" role="tab" data-tab="${k}" aria-selected="${k === active}">${label}${n ? ` <span class="tab__n">${n}</span>` : ''}</button>`).join('')}
  </div></div>
  <div class="wrap topicbody" data-topic="${id}">
    <div>${tabs.map(([k]) => `<section class="panel" role="tabpanel" data-panel="${k}" ${k === active ? '' : 'hidden'}>${panels[k]()}</section>`).join('')}</div>
    <aside class="aside">
      ${c ? `<div class="aside__box"><span class="label">Dein Stand</span><div class="progress"><i data-bar></i></div><p class="muted" style="font-size:14px;margin:8px 0 0" data-score-text></p></div>` : ''}
      <div class="aside__box"><span class="label">Im selben Bereich</span><ul>${siblings.slice(0, 8).map((x) => `<li><a href="#/thema/${x.id}">${x.title}</a>${CONTENT[x.id] ? ' <span class="status status--full" title="ausgearbeitet"></span>' : ''}</li>`).join('')}</ul></div>
      <div class="aside__box"><span class="label">Abschlussprüfung</span><ul><li><a href="#/pruefungen">Prüfungsarchiv ${store.land ? `(${store.land})` : ''} →</a></li></ul></div>
    </aside>
  </div>`;
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

function viewExams(params) {
  const level = params.get('level') || '';
  const land = LANDS.find((l) => l.code === (params.get('land') || store.land));
  const lv = (x) => !level || x.level === level;

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
      ${land.links.filter(lv).map(examRow).join('') || (land.note ? '' : '<p class="muted" style="padding:14px 4px">Für diesen Abschluss ist uns kein öffentliches Angebot bekannt. Frage deine Lehrkräfte nach Übungsaufgaben aus den Vorjahren.</p>')}
    </section>` : '<p class="empty" style="margin-bottom:40px">Wähle oben dein Bundesland, um die Prüfungsarchive deines Landes zu sehen.</p>'}

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
  else if (a === 'suche') { html = viewSearch(params); title = 'Suche · Lernatlas'; }
  else if (a === 'quellen') { html = viewSources(); title = 'Quellen · Lernatlas'; }
  else html = viewNotFound();

  main.innerHTML = html;
  document.title = title;
  document.querySelectorAll('[data-nav]').forEach((n) => n.classList.toggle('is-active', n.dataset.nav === a || (a === 'fach' && n.dataset.nav === 'faecher')));
  if (path !== lastPath) window.scrollTo(0, 0);
  lastPath = path;

  if (a === 'thema') mountTopic(b);
}

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

function syncHeader() { $('[data-action="school"]').value = store.school; }

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
