// Abitur Deutsch: verbindliche Lektüren und Themenfelder.
// Nur aus amtlichen Dokumenten (IQB, Kultusministerien); jede Angabe nennt ihre Quelle.
// Die Länder entscheiden selbst, wie sie die gemeinsamen Vorgaben übernehmen –
// maßgeblich sind die Landesvorgaben und die Schule.

const IQB_URL = 'https://www.iqb.hu-berlin.de/media/documents/D_Inhaltliche_Vereinbarungen_zur_Gestaltung_der_Aufgaben_WqvCFvf.pdf';

// Ländergemeinsamer Abituraufgabenpool (IQB), Stand der Vereinbarung: 05.01.2026
export const IQB_DEUTSCH = {
  source: { label: 'IQB – Inhaltliche Vereinbarungen zur Gestaltung der Aufgaben (Deutsch)', url: IQB_URL },
  stand: '05.01.2026',
  // Jahre der Lektüren 5/6 laut KMS Bayern vom 06.03.2024; 7/8 folgen im Dreijahrestakt
  readings: [
    { years: '2026–2028', works: ['Heinrich von Kleist: Der zerbrochne Krug (Drama) – 12. Auftritt in der gekürzten und der Variant-Fassung', 'Jenny Erpenbeck: Heimsuchung (Epik)'] },
    { years: '2029–2031', works: ['Bertolt Brecht: Der gute Mensch von Sezuan (Drama)', 'Charlotte Gneuß: Gittersee (Epik)'] },
  ],
  fields: [
    { nr: 2, years: 'bis 2027', title: 'Sprache in politisch-gesellschaftlichen Verwendungszusammenhängen',
      points: ['politisch-gesellschaftliche Kommunikation zwischen Verständigung und Strategie', 'sprachliche Merkmale politisch-gesellschaftlicher Kommunikation', 'schriftlicher und mündlicher Sprachgebrauch in unterschiedlichen Medien'] },
    { nr: 3, years: '2027–2029', title: 'Literatur um 1800',
      points: ['Spiegelung kultur- und geistesgeschichtlicher Entwicklungen in der Literatur', 'literaturgeschichtliche Entwicklungen unter besonderer Berücksichtigung der Romantik', 'zentrale Themen und Motive der Romantik, auch in Texten des 20./21. Jahrhunderts'] },
    { nr: 4, years: '2028–2030', title: 'Sprache und Kommunikation in analogen und digitalen Medien',
      points: ['Erscheinungsformen von Sprache und Kommunikation in analogen und digitalen Medien', 'Konzeptionalität und Medialität, Nähe- und Distanzsprachlichkeit (Koch/Oesterreicher)', 'Multimodalität in der Kommunikation', 'Chancen und Herausforderungen für private und öffentliche Kommunikation'] },
    { nr: 5, years: 'folgt auf Themenfeld 3', title: 'Deutschsprachige Literatur der Aufklärung und des Sturm und Drang',
      points: ['Spiegelung geistes-, kultur- und gesellschaftsgeschichtlicher Entwicklungen', 'Rationalität und Gefühl, Individuum und Gesellschaft als Spannungsfelder', 'zentrale Themen und Motive, auch in Texten des 20./21. Jahrhunderts'] },
  ],
};

// Landesvorgaben je Prüfungsjahr
export const ABI_FOCUS = [
  { land: 'BY', year: '2027', title: 'Abitur 2027 in Bayern',
    items: [
      ['Lektüren', 'Die ländergemeinsamen Lektüren (Kleist, Erpenbeck) gelten 2026–2028 auch in Bayern und werden als Ganzschrift im Unterricht gelesen. Mindestens eine Prüfungsaufgabe bezieht sich auf eine der beiden.'],
      ['Themenfelder', 'Eine der Wahlaufgaben bezieht sich 2027 auf Themenfeld 3 „Literatur um 1800“ oder Themenfeld 2 „Sprache in politisch-gesellschaftlichen Verwendungszusammenhängen“; 2028 und 2029 auf Themenfeld 3 oder Themenfeld 4.'],
    ],
    sources: [
      { label: 'KMS ländergemeinsame Lektüren 2026–2028', url: 'https://www.isb.bayern.de/fileadmin/user_upload/Gymnasium/Leistungserhebungen/Abiturpruefung/Deutsch/KMS_Laendergemeinsame_Lektueren_2026-2028.pdf' },
      { label: 'KMS Themenfeld 2027–2029', url: 'https://www.isb.bayern.de/fileadmin/user_upload/Gymnasium/Faecher/Deutsch/Abitur/1607_KMS_Deutsch_Themenfeld_2027_2028_2029.pdf' },
    ] },
  { land: 'NW', year: '2027', title: 'Zentralabitur 2027 in NRW',
    items: [
      ['Fokussierungen', ['Lektüren: u. a. Kleist, „Der zerbrochne Krug“ (12. Auftritt in beiden Fassungen) und Erpenbeck, „Heimsuchung“', 'Literatur um 1800', 'Sprache in politisch-gesellschaftlichen Verwendungszusammenhängen']],
      ['Prüfung', 'Vier Aufgaben zur Auswahl. Arbeitszeit einschließlich Auswahlzeit: Grundkurs 255, Leistungskurs 315 Minuten.'],
      ['Hilfsmittel', 'Wörterbuch zur deutschen Rechtschreibung und unkommentierte Ausgaben der genannten Lektüren.'],
    ],
    sources: [{ label: 'Vorgaben Zentralabitur 2027 Deutsch (Gymnasium/Gesamtschule)', url: 'https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/deutsch_2027_gg.pdf' }] },
  { land: 'NW', year: '2028', title: 'Zentralabitur 2028 in NRW',
    items: [
      ['Fokussierungen', ['Lektüren: u. a. Kleist, „Der zerbrochne Krug“ und Erpenbeck, „Heimsuchung“', 'Literatur um 1800', 'Sprache und Kommunikation in analogen und digitalen Medien']],
      ['Prüfung', 'Arbeitszeit einschließlich Auswahlzeit: Grundkurs 255, Leistungskurs 315 Minuten.'],
    ],
    sources: [{ label: 'Vorgaben Zentralabitur 2028 Deutsch (Gymnasium/Gesamtschule)', url: 'https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/deutsch_2028_gg.pdf' }] },
  { land: 'HH', year: '2028', title: 'Abitur 2028 in Hamburg',
    items: [
      ['Schwerpunkte', ['Aufgabe I: Literatur um 1800', 'Aufgabe II: Kleist, „Der zerbrochne Krug“ – mit Analyse der Figurensprache (Symbolik, sprachlich-rhetorische Mittel)', 'Aufgabe III: Erzählte Identität – Herkunft, Heimat, Fremdheit, Zugehörigkeit; Referenzwerke: Spielfilm „Mittagsstunde“ (Lars Jessen, 2022) und Roman „Dschinns“ (Fatma Aydemir, 2022)', 'Aufgabe IV: Sprache und Kommunikation in analogen und digitalen Medien']],
      ['Prüfung', 'Vier Aufgaben, eine davon wird gewählt. Erhöhtes Niveau 315, grundlegendes Niveau 255 Minuten, keine gesonderte Lese- oder Auswahlzeit.'],
      ['Hilfsmittel', 'Ausgaben der verbindlichen Referenztexte ohne Notizen und ohne Materialanhang, Rechtschreibwörterbuch.'],
    ],
    sources: [{ label: 'Behörde für Schule – Abitur 2028: Regelungen + Hinweise + Beispiele', url: 'https://www.hamburg.de/politik-und-verwaltung/behoerden/bsfb/themen/zentrale-pruefungen/abitur-2028-1184110' }] },
];
