// Prüfungsseiten: Aufbau, Dauer, Hilfsmittel und Bewertung einzelner Prüfungen.
// Nur Angaben, die in der verlinkten amtlichen Quelle stehen – nichts geschätzt.
// Die Länder ändern Details jährlich; verbindlich ist immer der aktuelle Erlass bzw.
// die Information der Schule. Jede Seite nennt deshalb Stand und Quelle.
//
// facts: [Überschrift, Text oder Liste]; Texte dürfen einfaches HTML enthalten.

export const EXAM_PAGES = [
  // ───────── Nordrhein-Westfalen: Zentrale Prüfungen 10 ─────────
  { id: 'nw-zp10-deutsch', land: 'NW', subject: 'deutsch', levels: ['esa', 'msa'],
    title: 'ZP10 Deutsch', exam: 'Zentrale Prüfungen 10 (EESA und MSA)',
    lead: 'Landesweit gleiche schriftliche Prüfung am Ende von Klasse 10. Sie ist Teil des Abschlussverfahrens: Die Zeugnisnote ergibt sich aus Prüfungsnote und Jahresnote.',
    facts: [
      ['Dauer', ['Erweiterter Erster Schulabschluss (EESA): 125 Minuten', 'Mittlerer Schulabschluss (MSA): 150 Minuten', 'dazu 10 Minuten Bonuszeit zur Orientierung und 10 Minuten Auswahlzeit']],
      ['Aufbau', ['Zwei Prüfungsteile; Teil I ist nach 30 Minuten abzugeben (ggf. plus Bonuszeit), danach folgt Teil II', 'Ihr wählt selbst zwischen zwei Aufgabenstellungen – eine Auswahl durch die Lehrkraft gibt es nicht']],
      ['Hilfsmittel', 'Wörterbücher zur deutschen Rechtschreibung müssen im Prüfungsraum einsehbar sein. Sie dürfen keine Notizen oder Zusätze enthalten.'],
      ['Bewertung', ['Punkte nach verbindlichen Bewertungsbögen, nur ganze Punkte', 'Inhalt und Darstellungsleistung werden getrennt ausgewiesen', '„ausreichend“ ab etwa 45 % der Höchstpunktzahl, „ungenügend“ unter etwa 18 %', 'Erst- und Zweitkorrektur durch Lehrkräfte der eigenen Schule']],
      ['Mündliche Prüfung', 'Weichen Vornote und Prüfungsnote um zwei Noten ab, könnt ihr eine mündliche Prüfung wählen; ab drei Noten Abweichung ist sie Pflicht. Gewichtung dann 5 (Vornote) : 3 (Prüfung) : 2 (mündlich).'],
    ],
    stand: 'Oktober 2026', source: { label: 'Standardsicherung NRW – ZP10: Fragen und Antworten', url: 'https://www.standardsicherung.schulministerium.nrw.de/zentrale-pruefungen-10/zp10-fragen-und-antworten' } },

  { id: 'nw-zp10-mathe', land: 'NW', subject: 'mathe', levels: ['esa', 'msa'],
    title: 'ZP10 Mathematik', exam: 'Zentrale Prüfungen 10 (EESA und MSA)',
    lead: 'Landesweit gleiche schriftliche Prüfung am Ende von Klasse 10, in zwei Teilen: zuerst ohne Taschenrechner, dann mit.',
    facts: [
      ['Dauer', ['EESA: 90 Minuten', 'MSA: 120 Minuten', 'dazu 10 Minuten Bonuszeit, die ihr Teil I oder Teil II zurechnen könnt']],
      ['Aufbau', ['Prüfungsteil I: 30 Minuten, danach abgeben (ggf. plus Bonuszeit)', 'Prüfungsteil II: mit Hilfsmitteln; wer Teil I früher abgibt, kann sofort mit Teil II beginnen']],
      ['Hilfsmittel', ['Teil I: nur Zirkel und Geodreieck', 'Teil II: Zirkel, Geodreieck, Formelsammlung (handelsüblich oder die des Ministeriums) und der im Unterricht eingeführte Taschenrechner – der Speicher wird vorher gelöscht']],
      ['Bewertung', ['Punkte nach verbindlichen Bewertungsbögen; jeder sachlich richtige Lösungsweg zählt', 'Umgang mit Maßeinheiten und Nachvollziehbarkeit der Darstellung werden gesondert bewertet', 'Teil II zählt entsprechend seiner längeren Bearbeitungszeit mehr', '„ausreichend“ ab etwa 45 % der Höchstpunktzahl']],
      ['Mündliche Prüfung', 'Bei zwei Noten Abweichung zwischen Vornote und Prüfungsnote freiwillig, ab drei Noten verpflichtend.'],
    ],
    stand: 'Oktober 2026', source: { label: 'Standardsicherung NRW – ZP10: Fragen und Antworten', url: 'https://www.standardsicherung.schulministerium.nrw.de/zentrale-pruefungen-10/zp10-fragen-und-antworten' } },

  { id: 'nw-zp10-englisch', land: 'NW', subject: 'englisch', levels: ['esa', 'msa'],
    title: 'ZP10 Englisch', exam: 'Zentrale Prüfungen 10 (EESA und MSA)',
    lead: 'Landesweit gleiche schriftliche Prüfung am Ende von Klasse 10. Sie beginnt mit dem Hörverstehen.',
    facts: [
      ['Dauer', ['EESA: 90 Minuten', 'MSA: 120 Minuten', 'dazu 10 Minuten Bonuszeit (nur für Teil II); im MSA zusätzlich 10 Minuten Auswahlzeit']],
      ['Aufbau', ['Prüfungsteil I: Hörverstehen (ca. 20 Minuten)', 'Weitere Prüfungsteile: Leseverstehen, Wortschatz und Schreiben', 'Im MSA wählt ihr zwischen zwei Aufgabenstellungen, im EESA gibt es keine Auswahl']],
      ['Hilfsmittel', 'Keine – auch keine Wörterbücher.'],
      ['Bewertung', ['Hören, Lesen, Wortschatz und Schreiben gehen mit festen Anteilen in die Note ein; ein Rechenmodell gleicht unterschiedlich viele Teilaufgaben aus', 'Inhalt, Darstellung und Sprachrichtigkeit werden getrennt ausgewiesen', '„ausreichend“ ab etwa 45 % der Höchstpunktzahl']],
      ['Mündliche Prüfung', 'Bei zwei Noten Abweichung zwischen Vornote und Prüfungsnote freiwillig, ab drei Noten verpflichtend.'],
    ],
    stand: 'Oktober 2026', source: { label: 'Standardsicherung NRW – ZP10: Fragen und Antworten', url: 'https://www.standardsicherung.schulministerium.nrw.de/zentrale-pruefungen-10/zp10-fragen-und-antworten' } },

  // ───────── Hamburg: ESA und MSA ─────────
  { id: 'hh-esa-msa-deutsch', land: 'HH', subject: 'deutsch', levels: ['esa', 'msa'],
    title: 'ESA und MSA Deutsch', exam: 'Zentrale schriftliche Prüfung Hamburg 2027',
    lead: 'Ein Aufgabensatz zu einer Textgrundlage, den ihr am Stück bearbeitet. Schwerpunktthemen gibt es nicht.',
    facts: [
      ['Dauer', ['ESA: 135 Minuten', 'MSA: 155 Minuten']],
      ['Aufbau', ['Drei Prüfungsteile: Leseverstehen · Sprachgebrauch untersuchen / Sprachwissen · Schreiben', 'Textgrundlage im ESA: pragmatische Texte (Sachtexte), ggf. mit Schaubildern oder Tabellen', 'Textgrundlage im MSA: ein literarischer oder pragmatischer Text oder eine Zusammenstellung von Texten', 'MSA: ein bis zwei markierte Aufgaben auf der oberen Anforderungsebene – nötig für die Note E 1, nicht für die MSA-Note 1']],
      ['Hilfsmittel', 'Rechtschreibwörterbuch'],
      ['Grundlage', 'Bildungsplan Stadtteilschule, Rahmenplan Deutsch (2022), „Mindestanforderungen“ für den jeweiligen Abschluss. Die Operatoren (Arbeitsaufträge) stehen im Anhang der Regelungen.'],
    ],
    stand: 'Prüfung 2027', source: { label: 'Behörde für Schule – Regelungen für die zentralen schriftlichen Prüfungsaufgaben MSA 2027', url: 'https://www.hamburg.de/politik-und-verwaltung/behoerden/bsfb/themen/zentrale-pruefungen/msa-2027-1195942' },
    more: [{ label: 'Regelungen ESA 2027', url: 'https://www.hamburg.de/politik-und-verwaltung/behoerden/bsfb/themen/zentrale-pruefungen/esa-2027-1195940' }] },

  { id: 'hh-esa-msa-mathe', land: 'HH', subject: 'mathe', levels: ['esa', 'msa'],
    title: 'ESA und MSA Mathematik', exam: 'Zentrale schriftliche Prüfung Hamburg 2027',
    lead: 'Zuerst ein Teil ohne Taschenrechner und Formelsammlung; erst nach dessen Abgabe gibt es die Hilfsmittel und die übrigen Aufgaben.',
    facts: [
      ['Dauer', ['ESA: 120 Minuten, davon Richtwert 40 Minuten für Teil I', 'MSA: 135 Minuten, davon Richtwert 45 Minuten für Aufgabe I']],
      ['Aufbau ESA', ['Teil I: Multiple-Choice-Aufgaben zu allen Leitideen, ohne Taschenrechner und Formelsammlung', 'Teil II: kürzere Aufgaben zu allen Leitideen, mit Hilfsmitteln']],
      ['Aufbau MSA', ['Aufgabe I (hilfsmittelfrei): Multiple Choice und kurze Aufgaben zu Basiskompetenzen', 'Aufgabe II (Pflicht): Körper und ebene Figuren – Prismen, Zylinder, Pyramiden, Kegel, Kugeln; Pythagoras, Trigonometrie einschließlich Sinussatz', 'Wahl zwischen Aufgabe III (lineare und quadratische Funktionen) und Aufgabe IV (Daten und Zufall)']],
      ['Hilfsmittel', 'Nach Abgabe des hilfsmittelfreien Teils: Taschenrechner (nicht programmierbar, nicht grafikfähig), Schreib- und Zeichengeräte, die zugelassene Formelsammlung (liegt den Prüfungsunterlagen bei) und ein Rechtschreibwörterbuch. Die Operatorenliste liegt immer bei.'],
    ],
    stand: 'Prüfung 2027', source: { label: 'Behörde für Schule – Regelungen für die zentralen schriftlichen Prüfungsaufgaben MSA 2027', url: 'https://www.hamburg.de/politik-und-verwaltung/behoerden/bsfb/themen/zentrale-pruefungen/msa-2027-1195942' },
    more: [{ label: 'Regelungen ESA 2027', url: 'https://www.hamburg.de/politik-und-verwaltung/behoerden/bsfb/themen/zentrale-pruefungen/esa-2027-1195940' }] },

  // ───────── Bayern: Abitur ─────────
  { id: 'by-abi-mathe', land: 'BY', subject: 'mathe', levels: ['abi'],
    title: 'Abitur Mathematik', exam: 'Schriftliche Abiturprüfung am neunjährigen Gymnasium, ab 2026',
    lead: 'Alle schreiben auf erhöhtem Anforderungsniveau. Neu ab 2026: eigene Aufgabenauswahl im hilfsmittelfreien Teil A und ein etwas kürzerer Teil B.',
    facts: [
      ['Dauer', '300 Minuten insgesamt. Den Zeitpunkt, zu dem ihr Teil A abgebt und die Hilfsmittel erhaltet, bestimmt ihr selbst – spätestens 110 Minuten nach Beginn.'],
      ['Aufbau', ['Prüfungsteil A (ohne Hilfsmittel), 30 BE: Pflichtteil mit vier Aufgaben à 5 BE (zweimal Analysis, je einmal Stochastik und Geometrie) und Wahlteil, in dem ihr zwei von sechs Aufgaben à 5 BE auswählt', 'Prüfungsteil B (mit Hilfsmitteln), 70 BE: Analysis 30, Stochastik 20, Geometrie 20 – welche Aufgaben bearbeitet werden, wählt der Fachausschuss der Schule aus', 'Varianten „klassisch“ und MMS (mit mathematischer Software)']],
      ['Bewertung', ['100 Bewertungseinheiten (BE), bisher 120', '15 Notenpunkte ab 95 BE, 5 Punkte (ausreichend) ab 45 BE, 1 Punkt ab 20 BE', 'Pflichtaufgaben in Teil A liegen in den Anforderungsbereichen I und II, jede Wahlaufgabe erreicht zumindest teilweise Bereich III']],
      ['Mündlich', 'Am neunjährigen Gymnasium kann Mathematik auch als Kolloquium geprüft werden, ebenfalls auf erhöhtem Niveau.'],
    ],
    stand: 'KMS vom 23.07.2024, gültig ab Abitur 2026', source: { label: 'ISB Bayern – Abiturprüfung Mathematik (mit KMS und illustrierenden Aufgaben)', url: 'https://www.isb.bayern.de/schularten/gymnasium/leistungserhebungen/abiturpruefung/mathematik/' } },
];

export const EXAM_PAGE_BY_ID = Object.fromEntries(EXAM_PAGES.map((p) => [p.id, p]));
