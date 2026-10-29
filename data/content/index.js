import mathe from './mathe.js';
import matheZahlen from './mathe-zahlen.js';
import matheAlgebra from './mathe-algebra.js';
import matheGeometrie from './mathe-geometrie.js';
import matheDaten from './mathe-daten.js';
import matheAnalysis from './mathe-analysis.js';
import matheOberstufe from './mathe-oberstufe.js';
import sprachen from './sprachen.js';
import deutschSprache from './deutsch-sprache.js';
import deutschTexte from './deutsch-texte.js';
import deutschAbitur from './deutsch-abitur.js';
import englischGrammar from './englisch-grammar.js';
import englischSkills from './englisch-skills.js';
import englischAbitur from './englisch-abitur.js';
import naturwissenschaften from './naturwissenschaften.js';
import physik from './physik.js';
import chemie from './chemie.js';
import biologie from './biologie.js';
import physikOberstufe from './physik-oberstufe.js';
import chemieOberstufe from './chemie-oberstufe.js';
import biologieOberstufe from './biologie-oberstufe.js';
import gesellschaft from './gesellschaft.js';
import geschichte from './geschichte.js';
import politik from './politik.js';
import erdkunde from './erdkunde.js';
import wirtschaft from './wirtschaft.js';
import franzoesisch from './franzoesisch.js';
import spanisch from './spanisch.js';
import latein from './latein.js';
import informatik from './informatik.js';
import werte from './werte.js';
import musisch from './musisch.js';
import praxis from './praxis.js';
import paedagogikPsychologie from './paedagogik-psychologie.js';
import videos from './videos.js';
import aufgabentypen from './aufgabentypen.js';

export const CONTENT = {
  ...mathe, ...matheZahlen, ...matheAlgebra, ...matheGeometrie, ...matheDaten, ...matheAnalysis, ...matheOberstufe,
  ...sprachen, ...deutschSprache, ...deutschTexte, ...deutschAbitur,
  ...englischGrammar, ...englischSkills, ...englischAbitur,
  ...naturwissenschaften, ...physik, ...chemie, ...biologie, ...physikOberstufe, ...chemieOberstufe, ...biologieOberstufe,
  ...gesellschaft, ...geschichte, ...politik, ...erdkunde, ...wirtschaft,
  ...franzoesisch, ...spanisch, ...latein, ...informatik, ...werte, ...musisch, ...praxis, ...paedagogikPsychologie,
};

// Aufgaben der Typen Zuordnen, Lückentext, Reihenfolge und Graph ablesen hinten anhängen,
// damit die Nummern (und damit der gespeicherte Fortschritt) der bestehenden Aufgaben gleich bleiben
for (const [id, list] of Object.entries(aufgabentypen)) {
  if (CONTENT[id]) CONTENT[id].exercises = [...CONTENT[id].exercises, ...list];
}

// Gesichtete Videos (videos.js) an die Themen hängen
for (const [id, list] of Object.entries(videos)) {
  if (CONTENT[id]) CONTENT[id].videos = list;
}
