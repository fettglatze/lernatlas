# Lernatlas – Roadmap

Stand: 28.10.2026 · Phase 1 abgeschlossen, Phase 2 abgeschlossen (alle 291 Katalogthemen ausgearbeitet) · Phase 3 abgeschlossen (405 geprüfte Videos für 236 von 291 Themen) · Phase 4: Schritte 1, 2, 4 fertig, Schritt 3 begonnen (6 Prüfungsseiten)

## Phase 1 – Fundament ✅

- Design-System: Papier und Tinte, eine Signalfarbe, Fächer als Kacheln im Stil des Periodensystems, Hell- und Dunkelmodus, Druckansicht
- Katalog: 25 Fächer, 291 Themen, jeweils Hauptschule, Realschule und Gymnasium zugeordnet
- Suche: verträgt Umlaute und kleine Tippfehler, filtert nach Schulform, Tastenkürzel `/`
- Themenseiten mit Tabs: Lernzettel, Merkzettel, Videos, Übungen, Prüfung, Quellen
- Übungs-Engine: Auswahl, Zahl, Lösungsmenge und Texteingabe, mit Feedback, Lösungsweg und lokal gespeichertem Fortschritt
- 15 Pilotthemen komplett ausgearbeitet, 88 Aufgaben automatisch geprüft
- Prüfungsarchiv: IQB-Pools bundesweit und Quellen für alle 16 Länder, Zugang jeweils gekennzeichnet
- Für alle übrigen Themen: Videosuche auf etablierten Kanälen und Links zu Nachschlagewerken

## Phase 2 – Inhalte: Prüfungsfächer zuerst ✅

Reihenfolge nach Prüfungsrelevanz:

1. ✅ **ESA/MSA – Mathe, Deutsch, Englisch:** Alle Themen aus Klasse 5–10, die in den zentralen Prüfungen vorkommen (ZP10, Quali, MSA). 66 neue Themen, insgesamt 81 Themen und 504 Aufgaben. Alle Aufgaben werden automatisch geprüft: falsche Antworten werden abgelehnt, richtige und alle erlaubten Schreibweisen angenommen.
   - Mathe: Zahlen, Algebra und Funktionen, Geometrie, Daten und Zufall (31 von 42 Themen, mit Schritt 2 alle 42)
   - Deutsch: Rechtschreibung, Grammatik, Schreibformen, Literatur und Medien (26 von 28)
   - Englisch: Tenses, Grammar, Skills, UK und USA (19 von 23)
   - Offen sind in diesen Fächern nur Themen, die es ausschließlich am Gymnasium gibt (Oberstufe), siehe Schritte 2 und 3.
2. ✅ **Abitur – Mathe:** 11 Themen in `mathe-analysis.js` (Sinus/Kosinus, ganzrationale Funktionen, Ableitungsregeln, Kurvendiskussion, Extremwertaufgaben, Integral, e-Funktion) und `mathe-oberstufe.js` (Vektoren, Geraden und Ebenen, Binomialverteilung, Normalverteilung mit Hypothesentests). Mathe ist damit vollständig: 42 von 42 Themen. Gesamtstand: 92 Themen, 582 Aufgaben.
3. ✅ **Abitur – Deutsch und Englisch:** `deutsch-abitur.js` (Literaturepochen, Sprache und Sprachwandel) und `englisch-abitur.js` (Participles, Analysing Fiction, Globalisation, Post-colonialism). Deutsch 28 von 28, Englisch 23 von 23. Gesamtstand: 98 Themen, 620 Aufgaben.
4. ✅ **Naturwissenschaften Sek I:** 48 Themen in `physik.js` (17), `chemie.js` (13) und `biologie.js` (18). Mit den Pilotthemen sind alle Sek-I-Themen von Physik, Chemie und Biologie ausgearbeitet; offen sind nur die Oberstufenthemen (Physik 5, Chemie 5, Biologie 2). Gesamtstand: 146 Themen, 912 Aufgaben.
5. ✅ **Gesellschaftsfächer Sek I:** 55 Themen in `geschichte.js` (22), `politik.js` (13), `erdkunde.js` (13) und `wirtschaft.js` (7). Mit den Pilotthemen (Weimarer Republik, Gewaltenteilung) sind alle Sek-I-Themen der vier Fächer ausgearbeitet; offen ist nur „Konjunktur & Wirtschaftspolitik“ (Oberstufe). Zahleneingaben mit ganzzahliger Lösung (Jahreszahlen) müssen jetzt exakt stimmen. Gesamtstand: 201 Themen, 1240 Aufgaben.
6. ✅ **Weitere Fremdsprachen und Nebenfächer:** 77 Themen in `franzoesisch.js` (9), `spanisch.js` (6), `latein.js` (10), `informatik.js` (11), `werte.js` (10, Religion + Ethik/Philosophie), `musisch.js` (15, Kunst, Musik, Sport, Darstellendes Spiel), `praxis.js` (9, AWT, Technik, Hauswirtschaft) und `paedagogik-psychologie.js` (7). Damit hat jedes Katalogthema außer 13 Oberstufenthemen (Physik 5, Chemie 5, Biologie 2, Wirtschaftspolitik) einen Lernzettel. Gesamtstand: 278 Themen, 1702 Aufgaben.
7. ✅ **Oberstufe Naturwissenschaften und Wirtschaftspolitik:** 13 Themen in `physik-oberstufe.js` (5: elektrisches und magnetisches Feld, Schwingungen und Wellen, Quantenphysik, Atommodelle), `chemie-oberstufe.js` (5: Kunststoffe, Gleichgewicht, Reaktionsgeschwindigkeit, Elektrochemie, Naturstoffe), `biologie-oberstufe.js` (2: Neurobiologie, Stoffwechsel) und `wirtschaft.js` (Konjunktur & Wirtschaftspolitik). Damit hat jedes Katalogthema Lernzettel, Merkzettel und Übungen. Gesamtstand: 291 Themen, 1780 Aufgaben.

Ziel je Thema: 5–7 Aufgaben, die letzte im Stil von Prüfungsaufgaben (Kennzeichnung „Prüfungsstil“).
Fachliche Prüfung: Jedes Thema sollte vor dem Livegang von einer Fachlehrkraft gegengelesen werden.

## Phase 3 – Videos kuratieren ✅

- Pro ausgearbeitetem Thema 1–3 gesichtete Einzelvideos (`videos: [{ yt, title, channel }]`)
- Einbettung über youtube-nocookie erst nach Klick (2-Klick-Lösung) ist schon eingebaut

1. ✅ **Mathe, Deutsch, Englisch:** 136 Videos für 86 von 93 Themen in `data/content/videos.js` (wird in `index.js` an die Themen gehängt). Kanäle: Lehrerschmidt, Mathe by Daniel Jung, MathemaTrick, simpleclub, musstewissen, Mr V Englisch, Duden Learnattack. Jede ID per YouTube-oEmbed geprüft (Video existiert, Kanal stimmt); Auswahl nach Titel, Inhalte nicht vollständig angesehen. Ohne passendes Video bisher: s/ss/ß, Fremdwörter, Materialgestütztes Schreiben, Sprachwandel, Medien, Future, Modal Verbs. Werkzeuge: `tools/videos/`.
2. ✅ **Naturwissenschaften und Informatik:** 132 Videos für 70 von 74 Themen (Physik 23/23, Chemie 19/19, Biologie 18/21, Informatik 10/11). Zusätzliche Kanäle: planet schule, The Morpheus Tutorials. Ohne passendes Video bisher: Kennzeichen des Lebendigen, Pubertät & Sexualität, Mensch & Umwelt, Künstliche Intelligenz. Gesamtstand: 268 Videos für 156 Themen.
3. ✅ **Gesellschaftsfächer:** 83 Videos für 47 von 58 Themen (Geschichte 21/23, Erdkunde 13/13, Politik 9/14, Wirtschaft 4/8). Kanäle: MrWissen2go Geschichte (heißt bei YouTube jetzt „MrWissen2go Geschichte | Terra X“), MrWissen2go, simpleclub, planet schule, bpb. Bewusst ausgelassen: datierte Wahl- und Meinungsvideos. Ohne passendes Video bisher: Quellenanalyse, Karikaturen, Wahlen, Parteien, Partizipation, Rechtsstaat, Medien & Demokratie, Verbraucherbildung, Berufsorientierung, Unternehmen, Arbeitsrecht. Gesamtstand: 351 Videos für 203 Themen.
4. ✅ **Weitere Fremdsprachen und Nebenfächer:** 54 Videos für 33 von 66 Themen (Französisch 6/9, Spanisch 4/6, Latein 7/10, Religion 4/5, Pädagogik/Psychologie 3/7, Ethik 1/5, Kunst 1/4, Sport 2/4, AWT 2/3, Technik 1/3, Hauswirtschaft 2/3, Musik 0/5, Darstellendes Spiel 0/2). Für Musik, DS und die meisten Ethik-Themen bieten die festgelegten Kanäle nichts Passendes.

Ergebnis Phase 3: 405 Videos für 236 von 291 Themen. Die übrigen 55 Themen zeigen weiterhin die Suchlinks auf etablierte Kanäle. Offen für später: passende seriöse Kanäle für Musik, Ethik/Philosophie und Darstellendes Spiel finden und mit `tools/videos/` nachtragen; Stichproben der Videos durch Lehrkräfte.

## Phase 4 – Prüfungsarchiv vertiefen

1. ✅ **Link-Checker und Linkpflege:** `tools/linkcheck.py` prüft alle festen Links in `data/` (per curl, damit Behördenzertifikate wie im Browser akzeptiert werden), meldet Defekte, Umleitungen und bekannte Bot-Sperren; für einen monatlichen Lauf gedacht. Erster Lauf: 12 Links auf neue Adressen umgestellt (u. a. ISB Bayern, ISQ Berlin, Hamburg, Bremen, KMK, Lehrplannavigator NRW), mebis-Prüfungsarchiv auf die vom Kultusministerium genannte Adresse. bildung-mv.de war nicht erreichbar → zwei Bildungsserver-Wegweiser für MV ergänzt. Stand: 59 Links, 1 nicht erreichbar (bildung-mv.de, begründet behalten).
2. ✅ **Deep-Links je Land, Fach und Jahr:** `tools/exams/deeplinks.py` liest die Download-Listen von Bremen (Abitur, MSA, BBR), Sachsen-Anhalt (Abitur seit 2023) und ISB Bayern (Abitur, Realschule) und erzeugt `data/exam-files.js`: 839 direkte PDF-Links in 41 Fach-/Abschlussgruppen, alle per Link-Checker erreichbar. Im Prüfungsarchiv erscheinen sie je Land aufklappbar nach Jahrgang; auf Themenseiten zuerst für das eigene Land, darunter als „frei verfügbar aus anderen Ländern“. MV (Seite nicht erreichbar) und IQB (Fachseiten schon verlinkt) bleiben bei den Übersichtslinks.
3. 🔶 **Prüfungsseiten (erster Satz):** `data/exam-pages.js` + Route `#/pruefung/<id>` mit Aufbau, Dauer, Hilfsmitteln und Bewertung – nur aus amtlichen Quellen, jeweils mit Stand und Quellenlink. Fertig: NRW ZP10 Deutsch/Mathe/Englisch (Standardsicherung-FAQ), Hamburg ESA/MSA Deutsch und Mathe 2027 (Regelungen der Behörde), Bayern Abitur Mathematik ab 2026 (KMS 23.07.2024). Verlinkt im Prüfungsarchiv (Übersicht und je Land) und auf Themenseiten („So läuft die Prüfung ab“).
   - Offen: weitere Länder und Fächer. Für BW, NI, BE/BB fanden sich nur ältere Erlasse oder widersprüchliche Schulangaben – erst aufnehmen, wenn eine aktuelle amtliche Quelle vorliegt.
4. ✅ **Eigene Übungssätze im Prüfungsstil:** `data/exam-practice.js`, eingebunden auf den Prüfungsseiten mit Fortschritt und Zurücksetzen. Fünf Sätze mit 44 automatisch geprüften Aufgaben plus zwei Schreibaufträgen mit Checkliste: ZP10 Mathe Teil I (NRW, Originale nur mit Login), Hamburg MSA Mathe Aufgabe I + II, Bayern Abitur Mathe Teil A, Deutsch-Sachtext (NRW + Hamburg), Englisch-Reading (NRW). Alle Texte und Aufgaben selbst verfasst; jede Lösung im Browser gegen die Engine getestet. Neue Prüfungsseiten bekommen ihren Satz im selben Format.

## Phase 5 – Bundesland-Modus

- Themen nach Landeslehrplan zuordnen (Klassenstufe und Fachbezeichnung je Land)
- Landesspezifische Inhalte: Sternchenthemen BW, Pflichtlektüren, Abi-Schwerpunkte

## Phase 6 – Lernwerkzeuge

- Karteikarten-Modus mit Wiederholung in Abständen (aus den Merkzetteln)
- Prüfungs-Countdown und Lernplan nach Prüfungstermin
- Neue Aufgabentypen: Zuordnen, Lückentext, Reihenfolge, Graph ablesen
- Offline-Nutzung als PWA

## Vor dem Livegang (Pflicht)

- [ ] **Schriften lokal hosten** statt über Google Fonts. Das LG München hat Google-Fonts-Einbindungen 2022 als DSGVO-Verstoß gewertet.
- [ ] **Impressum** (§ 5 DDG) und **Datenschutzerklärung**
- [ ] Hosting festlegen (statisch, z. B. GitHub Pages oder Netlify mit EU-Region)
- [ ] Alle Inhalte fachlich gegenlesen lassen
- [ ] Barrierefreiheit prüfen (Kontraste, Screenreader, Tastaturbedienung)
