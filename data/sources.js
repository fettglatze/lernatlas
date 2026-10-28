// Verlässliche Quellen je Fach.
// Videos: Wir verlinken gezielte YouTube-Suchen auf etablierten Bildungskanälen
// (statt ungeprüfter Einzel-Video-IDs). Geprüfte Einzelvideos stehen in content/videos.js
// (erzeugt mit tools/videos/) – sie werden datensparsam (2-Klick) eingebettet.

const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

const CH = {
  lehrerschmidt: { name: 'Lehrerschmidt', note: 'Lehrer, Mathe & Deutsch, Sek I' },
  jung:          { name: 'Mathe by Daniel Jung', note: 'Mathe bis Abitur & Studium' },
  mathematrick:  { name: 'MathemaTrick', note: 'Mathe Sek I, sehr kleinschrittig' },
  simpleclub:    { name: 'simpleclub', note: 'Kurze Erklärvideos, alle Fächer' },
  mw_deutsch:    { name: 'musstewissen Deutsch', note: 'funk (ARD/ZDF)' },
  mw_physik:     { name: 'musstewissen Physik', note: 'funk (ARD/ZDF)' },
  mw_chemie:     { name: 'musstewissen Chemie', note: 'funk (ARD/ZDF)' },
  mw_mathe:      { name: 'musstewissen Mathe', note: 'funk (ARD/ZDF)' },
  mrv:           { name: 'Mr V Englisch', note: 'Englischlehrer, Grammatik & Abi' },
  wissen2go:     { name: 'MrWissen2go Geschichte', note: 'funk (ARD/ZDF)' },
  terrax:        { name: 'Terra X', note: 'ZDF-Dokumentationen' },
  lesch:         { name: 'Terra X Lesch & Co', note: 'ZDF, Physik & Naturwissenschaft' },
  planetschule:  { name: 'planet schule', note: 'SWR/WDR Schulfernsehen' },
  ardalpha:      { name: 'ARD alpha', note: 'Bildungskanal des BR' },
  bpb:           { name: 'bpb', note: 'Bundeszentrale für politische Bildung' },
  morpheus:      { name: 'The Morpheus Tutorials', note: 'Informatik & Programmieren' },
};

const VIDEO_CHANNELS = {
  mathe:      ['lehrerschmidt', 'jung', 'mathematrick', 'simpleclub'],
  deutsch:    ['mw_deutsch', 'lehrerschmidt', 'simpleclub', 'planetschule'],
  englisch:   ['mrv', 'simpleclub', 'lehrerschmidt'],
  physik:     ['mw_physik', 'simpleclub', 'lesch', 'planetschule'],
  chemie:     ['mw_chemie', 'simpleclub', 'planetschule'],
  biologie:   ['simpleclub', 'planetschule', 'terrax'],
  informatik: ['simpleclub', 'morpheus'],
  geschichte: ['wissen2go', 'terrax', 'simpleclub', 'planetschule'],
  erdkunde:   ['simpleclub', 'terrax', 'planetschule'],
  politik:    ['wissen2go', 'bpb', 'simpleclub'],
  wirtschaft: ['simpleclub', 'ardalpha'],
  _default:   ['simpleclub', 'planetschule', 'ardalpha'],
};

// Nachschlagewerke & Lernportale (öffentlich-rechtlich, gemeinnützig oder fachlich etabliert)
const REF = {
  serlo:     { name: 'Serlo', desc: 'Gemeinnützige, freie Lernplattform (Mathe, Bio, Chemie …)', url: (q) => `https://de.serlo.org/search?q=${encodeURIComponent(q)}` },
  leifi:     { name: 'LEIFI Physik', desc: 'Physik-Portal der Joachim Herz Stiftung', url: (q) => `https://www.leifiphysik.de/suche?search_api_fulltext=${encodeURIComponent(q)}` },
  bpb:       { name: 'bpb.de', desc: 'Bundeszentrale für politische Bildung', url: (q) => `https://www.bpb.de/themen/suche/?term=${encodeURIComponent(q)}` },
  lemo:      { name: 'LeMO', desc: 'Lebendiges Museum Online (DHM & Haus der Geschichte)', url: () => 'https://www.dhm.de/lemo/' },
  duden:     { name: 'Duden', desc: 'Rechtschreibung & Grammatik', url: (q) => `https://www.duden.de/suchen/dudenonline/${encodeURIComponent(q)}` },
  bc:        { name: 'British Council LearnEnglish', desc: 'Grammar reference & exercises', url: () => 'https://learnenglish.britishcouncil.org/' },
  infschule: { name: 'inf-schule', desc: 'Informatik-Lernplattform von Lehrkräften', url: () => 'https://inf-schule.de/' },
  bundestag: { name: 'bundestag.de', desc: 'Offizielle Seite des Deutschen Bundestags', url: () => 'https://www.bundestag.de/' },
  wiki:      { name: 'Wikipedia', desc: 'Zum Nachschlagen – Angaben stets gegenprüfen', url: (q) => `https://de.wikipedia.org/w/index.php?search=${encodeURIComponent(q)}` },
};

const REF_BY_SUBJECT = {
  mathe: ['serlo'], physik: ['leifi', 'serlo'], chemie: ['serlo', 'wiki'], biologie: ['serlo', 'wiki'],
  informatik: ['infschule', 'serlo'], deutsch: ['duden', 'wiki'], englisch: ['bc'],
  geschichte: ['lemo', 'bpb'], politik: ['bpb', 'bundestag'], erdkunde: ['bpb', 'wiki'],
  wirtschaft: ['bpb'], _default: ['wiki'],
};

export function videoLinks(topic, subject, query) {
  const q = query || topic.title;
  const ids = VIDEO_CHANNELS[subject.id] || VIDEO_CHANNELS._default;
  return ids.map((id) => ({ ...CH[id], url: yt(`${CH[id].name} ${q}`) }));
}

export function referenceLinks(topic, subject, query) {
  const q = query || topic.title;
  const ids = REF_BY_SUBJECT[subject.id] || REF_BY_SUBJECT._default;
  return ids.map((id) => ({ name: REF[id].name, desc: REF[id].desc, url: REF[id].url(q) }));
}

// Für die Quellen-Seite
export const CURRICULA = [
  { name: 'KMK – Bildungsstandards', url: 'https://www.kmk.org/bildungsministerkonferenz/bildungsthemen/bildungsstandards.html',
    desc: 'Länderübergreifende Standards für ESA, MSA und Abitur (Deutsch, Mathe, Fremdsprachen, Naturwissenschaften).' },
  { name: 'IQB – Institut zur Qualitätsentwicklung im Bildungswesen', url: 'https://www.iqb.hu-berlin.de/de/',
    desc: 'Koordiniert die gemeinsamen Abituraufgabenpools und VERA-Vergleichsarbeiten.' },
  { name: 'LehrplanPLUS Bayern', url: 'https://www.lehrplanplus.bayern.de/', desc: 'Lehrpläne aller bayerischen Schularten.' },
  { name: 'Kernlehrpläne NRW', url: 'https://lehrplannavigator.nrw.de/', desc: 'Lehrpläne der Schulformen in Nordrhein-Westfalen.' },
  { name: 'Bildungspläne Baden-Württemberg', url: 'https://www.bildungsplaene-bw.de/', desc: 'Bildungspläne 2016 für alle Schularten in BW.' },
  { name: 'Deutscher Bildungsserver', url: 'https://www.bildungsserver.de/', desc: 'Wegweiser des DIPF (Leibniz-Institut) zu Bildungsangeboten aller Länder.' },
];

export const LEARNING_SOURCES = [
  { name: 'Serlo', url: 'https://de.serlo.org/', desc: 'Gemeinnützig, werbefrei, freie Lizenz (CC BY-SA).' },
  { name: 'LEIFI Physik', url: 'https://www.leifiphysik.de/', desc: 'Physik von Klasse 5 bis Abitur, Joachim Herz Stiftung.' },
  { name: 'bpb – Bundeszentrale für politische Bildung', url: 'https://www.bpb.de/', desc: 'Politik, Zeitgeschichte, Gesellschaft – staatlich, überparteilich.' },
  { name: 'LeMO', url: 'https://www.dhm.de/lemo/', desc: 'Deutsche Geschichte des 19.–21. Jh. (Deutsches Historisches Museum).' },
  { name: 'planet schule', url: 'https://www.planet-schule.de/', desc: 'Schulfernsehen von SWR und WDR.' },
  { name: 'inf-schule', url: 'https://inf-schule.de/', desc: 'Informatik-Lernumgebung, von Lehrkräften erstellt.' },
  { name: 'Duden', url: 'https://www.duden.de/', desc: 'Referenz für Rechtschreibung und Grammatik.' },
];
