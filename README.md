# Lernatlas

All-in-One-Lernseite für Hauptschule, Realschule und Gymnasium: Themensuche, Lernzettel, Merkzettel, Videos, Übungen mit Lösungskontrolle und ein Archiv offizieller Prüfungsquellen aller 16 Bundesländer.

## Starten

Die Seite ist rein statisch (HTML, CSS, JavaScript-Module) und braucht keinen Build-Schritt. Wegen der ES-Module muss sie über einen lokalen Server laufen, nicht per Doppelklick:

```bash
python -m http.server 8090 --directory lernatlas
```

Dann http://localhost:8090 öffnen.

## Aufbau

```
lernatlas/
├── index.html               Grundgerüst, Kopfzeile, Suchdialog
├── manifest.webmanifest     PWA: Name, Farben, Icons
├── sw.js                    Service Worker (offline), Dateiliste generiert
├── assets/icons/            App-Icons (192, 512, maskable, Apple)
├── assets/css/main.css      Design-System (Tokens, Hell/Dunkel, Druckansicht)
├── assets/css/fonts.css     generiert: @font-face für die lokalen Schriften
├── assets/fonts/            Schriften als woff2 + Lizenztexte (SIL OFL 1.1)
├── assets/js/
│   ├── app.js               Router (#/…), alle Ansichten, globale Events
│   ├── search.js            Suche (umlaut- und tippfehlertolerant)
│   ├── cards.js             Karteikarten: Lernkartei nach Leitner, Fälligkeiten
│   ├── plan.js              Lernplan: Wochenplan bis zum Prüfungstermin
│   ├── exercise.js          Übungs-Engine (choice, number, numbers, text, match, cloze, order, Graph)
│   ├── render.js            Lernzettel-Blöcke → HTML
│   └── store.js             Schulform, Bundesland, Fortschritt, Karteikarten, Prüfungstermine (localStorage)
├── tools/exams/deeplinks.py erzeugt data/exam-files.js (direkte Links auf Länder-PDFs)
├── tools/bundle/build_html.py packt alles in eine Datei: dist/lernatlas.html (per Doppelklick, ohne Server)
├── tools/fonts/fetch_fonts.py lädt die Schriften einmalig von Google und legt sie lokal ab
├── tools/pwa/                build_sw.py (nach jeder Änderung ausführen), icons.py
├── tools/linkcheck.py       prüft alle Links in data/ (monatlich: python tools/linkcheck.py)
├── tools/videos/            Skripte zum Kuratieren und Prüfen von Videos (Python)
└── data/
    ├── catalog.js           Alle Fächer und Themen je Schulform
    ├── exams.js             Prüfungsarchiv: bundesweit + 16 Länder
    ├── exam-files.js        generiert: direkte Prüfungs-PDFs je Land/Fach/Jahr
    ├── exam-pages.js        Prüfungsseiten: Aufbau, Dauer, Hilfsmittel (amtliche Quellen)
    ├── exam-practice.js     eigene Übungssätze im Prüfungsstil zu den Prüfungsseiten
    ├── abi-focus.js         Abitur Deutsch: Lektüren und Themenfelder (IQB-Pool und Landesvorgaben)
    ├── land-info.js         je Land: Weg zum Abitur am Gymnasium, Fachname Ethik
    ├── legal.js             Angaben für Impressum und Datenschutz (vor Livegang ausfüllen)
    ├── sources.js           Videokanäle und Nachschlagewerke je Fach
    └── content/             Ausgearbeitete Themen (Lernzettel, Merkzettel, Übungen)
        ├── index.js         führt alle Inhaltsdateien zusammen
        ├── videos.js        geprüfte YouTube-Videos je Thema (Phase 3)
        ├── _helpers.js      Kurzschreibweisen ch(), num(), nums(), txt(), match(), cloze(), order(), plot(), EX
        ├── aufgabentypen.js Aufgaben der Typen Zuordnen, Lückentext, Reihenfolge, Graph ablesen
        ├── mathe-*.js       zahlen, algebra, geometrie, daten, analysis, oberstufe (+ mathe.js)
        ├── deutsch-*.js     sprache, texte, abitur (Epochen, Sprachwandel)
        ├── englisch-*.js    grammar, skills, abitur (+ sprachen.js aus Phase 1)
        ├── physik.js, chemie.js, biologie.js   Sek I (+ naturwissenschaften.js aus Phase 1)
        ├── physik-, chemie-, biologie-oberstufe.js   Oberstufe
        ├── geschichte.js, politik.js, erdkunde.js, wirtschaft.js   (+ gesellschaft.js aus Phase 1)
        ├── franzoesisch.js, spanisch.js, latein.js   weitere Fremdsprachen
        └── informatik.js, werte.js, musisch.js, praxis.js, paedagogik-psychologie.js   Nebenfächer
```

## Routen

| Route | Inhalt |
|---|---|
| `#/` | Start mit Suche, Fächerregister, Prüfungen |
| `#/faecher` | Alle Fächer nach Fachgruppen |
| `#/fach/<id>` | Themen eines Fachs nach Bereichen |
| `#/thema/<fach>--<slug>?tab=…` | Themenseite (Tabs: lernzettel, merkzettel, videos, uebungen, pruefung, quellen) |
| `#/pruefungen?level=esa\|msa\|abi\|vera` | Prüfungsarchiv |
| `#/suche?q=…` | Suchergebnisse |
| `#/quellen` | Quellen & Methodik |

## Neues Thema ausarbeiten

1. Das Thema muss in `data/catalog.js` stehen (ID = `fach--slug`).
2. In der passenden Datei unter `data/content/` einen Eintrag mit dieser ID anlegen:

```js
'fach--slug': {
  summary: 'Ein bis zwei Sätze',
  goals: ['Lernziel 1', 'Lernziel 2'],
  lernzettel: [ { h: 'Überschrift' }, { p: 'Text' }, { f: 'a² + b² = c²', label: 'Formel' },
                { ex: { t: 'Beispiel', lines: ['…'] } }, { tbl: { head: [], rows: [[]] } },
                { note: 'Text', kind: 'Tipp' }, { ul: ['…'] } ],
  merkzettel: [ ['Begriff', 'Erklärung'] ],
  exercises: [
    { type: 'choice', q: 'Frage', options: ['A', 'B'], answer: 0, why: 'Erklärung' },
    { type: 'number', q: 'Frage', answer: 4.8, unit: 'm', why: '…' },
    { type: 'numbers', q: 'Löse …', answers: [2, -4], why: '…' },
    { type: 'text', q: 'Frage', accept: ['antwort', 'variante'], why: '…' },
  ],
  exam: 'Prüfungsbezug',
  sources: [ { label: 'Titel', url: 'https://…' } ],     // optional
  videos: [ { yt: 'VIDEO_ID', title: '…', channel: '…' } ], // optional, nur geprüfte Videos
}
```

Eine neue Datei muss in `data/content/index.js` importiert werden. Das Thema gilt danach automatisch als „Ausgearbeitet“ und wird auf der Startseite im Fachzähler mitgezählt.

### Optionen für Aufgaben

| Option | Typ | Wirkung |
|---|---|---|
| `exam: true` (oder `EX`) | alle | Kennzeichnung „Prüfungsstil“ |
| `tol: 0.06` | number, numbers | erlaubte Abweichung (Standard: 0,1 %, mindestens 0,005; ganzzahlige Lösungen wie Jahreszahlen müssen exakt stimmen) |
| `ordered: true`, `labels: ['x', 'y']` | numbers | Reihenfolge zählt, eigene Feldnamen |
| `display: '1/6'` | number, numbers | so wird die Lösung angezeigt |
| `unit`, `unitBefore` | number | Einheit hinter oder vor dem Feld |
| `loose: true` | text | ignoriert Leerzeichen, `·`/`*`, ² = ^2 (für Terme) |
| `caseSensitive: true` | text | Groß- und Kleinschreibung zählt |
| `placeholder` | text | Platzhalter im Eingabefeld |

### Automatischer Test

Im Browser auf der laufenden Seite: jede Themenseite öffnen, je Aufgabe zuerst eine falsche Antwort eintragen (muss abgelehnt werden), dann die richtige (muss angenommen werden), bei Texteingaben zusätzlich alle erlaubten Schreibweisen. Aktueller Stand: 291 Themen, 1780 Aufgaben, 0 Fehler; 405 Videos für 236 Themen, alle IDs per oEmbed bestätigt. Gerundete Eingaben wie „1,61“ für ln(5) oder „8/3“ werden ebenfalls angenommen.
