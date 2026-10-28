# Lernatlas – Roadmap

Stand: 28.10.2026 · Phase 1 abgeschlossen, Phase 2 abgeschlossen (alle 291 Katalogthemen ausgearbeitet) · nächster Schritt: Phase 3

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

## Phase 3 – Videos kuratieren

- Pro ausgearbeitetem Thema 1–3 gesichtete Einzelvideos (`videos: [{ yt, title, channel }]`)
- Einbettung über youtube-nocookie erst nach Klick (2-Klick-Lösung) ist schon eingebaut

## Phase 4 – Prüfungsarchiv vertiefen

- Deep-Links je Land, Fach und Jahr, wo die Länder Aufgaben frei veröffentlichen (Bayern/ISB, Bremen, MV, Sachsen-Anhalt, IQB)
- Eigene Seiten je Prüfung (z. B. „ZP10 Mathe NRW“) mit Aufbau, Dauer, Hilfsmitteln und Bewertung
- Eigene Übungsaufgaben im Prüfungsstil, wo keine Originale frei verfügbar sind
- Link-Checker-Skript, das monatlich tote Links meldet

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
