// Lernatlas – Fächer- und Themenkatalog
// Orientierung: KMK-Bildungsstandards (ESA, MSA, AHR) und Lehrpläne der Länder
// (u. a. LehrplanPLUS Bayern, Kernlehrpläne NRW, Bildungsplan BW).
// Klassenstufen sind Richtwerte – je nach Bundesland verschiebt sich ein Thema um 1–2 Jahre.
//
// Kurzformat eines Themas: [slug, Titel, Klasse, Schulformen, Suchbegriffe]
//   Schulformen: Buchstaben h (Hauptschule), r (Realschule), g (Gymnasium); leer = Fach-Standard

export const SCHOOLS = {
  hs:  { id: 'hs',  name: 'Hauptschule', short: 'HS', letter: 'h', exam: 'Erster Schulabschluss (ESA)', grades: '5–9/10',
         desc: 'Mittelschule, Werkrealschule, Hauptschulzweig an Gesamt-, Ober- und Sekundarschulen.' },
  rs:  { id: 'rs',  name: 'Realschule',  short: 'RS', letter: 'r', exam: 'Mittlerer Schulabschluss (MSA)', grades: '5–10',
         desc: 'Realschule, Realschule plus, Oberschule, Regelschule, Realschulzweig an Gesamtschulen.' },
  gym: { id: 'gym', name: 'Gymnasium',   short: 'GY', letter: 'g', exam: 'Allgemeine Hochschulreife (Abitur)', grades: '5–12/13',
         desc: 'Gymnasium, gymnasiale Oberstufe an Gesamtschulen und beruflichen Gymnasien.' },
};

export const GROUPS = {
  sprache: 'Sprachen',
  mint:    'Mathematik & Naturwissenschaften',
  gesell:  'Gesellschaft',
  werte:   'Religion & Ethik',
  musisch: 'Kunst, Musik & Sport',
  praxis:  'Arbeit & Technik',
};

const SUBJECTS_RAW = [
  // ───────────────────────── Sprachen ─────────────────────────
  { id: 'deutsch', sym: 'De', name: 'Deutsch', g: 'sprache', schools: 'hrg',
    desc: 'Rechtschreibung, Grammatik, Texte schreiben und analysieren, Literatur.',
    areas: [
      ['Rechtschreibung & Zeichensetzung', [
        ['das-dass', 'das oder dass', '5–7', '', 'dass das Konjunktion Artikel Relativpronomen'],
        ['kommasetzung', 'Kommasetzung', '6–9', '', 'Komma Nebensatz Aufzählung Infinitivgruppe'],
        ['gross-kleinschreibung', 'Groß- und Kleinschreibung', '5–7', '', 'Nominalisierung Substantivierung'],
        ['s-laute', 's, ss oder ß', '5–6', '', 'ss ß s-Laut'],
        ['getrennt-zusammen', 'Getrennt- und Zusammenschreibung', '7–9', '', ''],
        ['fremdwoerter', 'Fremdwörter richtig schreiben', '7–9', '', ''],
      ]],
      ['Grammatik', [
        ['wortarten', 'Wortarten', '5–6', '', 'Nomen Verb Adjektiv Pronomen Präposition'],
        ['satzglieder', 'Satzglieder', '5–7', '', 'Subjekt Prädikat Objekt Adverbiale'],
        ['zeitformen', 'Zeitformen (Tempora)', '5–6', '', 'Präsens Präteritum Perfekt Plusquamperfekt Futur'],
        ['aktiv-passiv', 'Aktiv und Passiv', '7–8', '', 'Vorgangspassiv Zustandspassiv'],
        ['konjunktiv', 'Konjunktiv I und II', '8–10', '', 'indirekte Rede Konjunktiv'],
        ['satzarten', 'Haupt- und Nebensätze', '6–8', '', 'Satzgefüge Satzreihe Konjunktion'],
      ]],
      ['Schreiben', [
        ['erzaehlung', 'Erzählung schreiben', '5–6', '', 'Erlebniserzählung Spannungsbogen'],
        ['bericht', 'Bericht & Protokoll', '6–8', '', 'W-Fragen sachlich'],
        ['beschreibung', 'Beschreibung (Vorgang, Person, Bild)', '5–7', '', ''],
        ['inhaltsangabe', 'Inhaltsangabe', '7–9', '', 'Präsens Einleitungssatz'],
        ['eroerterung', 'Erörterung', '8–Q2', '', 'lineare dialektische Argument These Pro Contra'],
        ['bewerbung', 'Bewerbung & Lebenslauf', '8–10', 'hr', 'Anschreiben Praktikum Ausbildung'],
        ['sachtext-analyse', 'Sachtextanalyse', '9–Q2', 'rg', 'pragmatischer Text Argumentationsstruktur'],
        ['materialgestuetztes-schreiben', 'Materialgestütztes Schreiben', '9–Q2', 'rg', 'Materialien informierend argumentierend'],
      ]],
      ['Literatur & Textanalyse', [
        ['epik', 'Epik: Merkmale erzählender Texte', '7–10', '', 'Erzähler Erzählperspektive Erzählzeit'],
        ['lyrik', 'Gedichtanalyse', '7–Q2', '', 'Metrum Reim Strophe Stilmittel Lyrik'],
        ['drama', 'Drama analysieren', '9–Q2', 'rg', 'Akt Szene Dialog Monolog geschlossenes offenes Drama'],
        ['stilmittel', 'Rhetorische Stilmittel', '7–Q2', '', 'Metapher Anapher Alliteration Personifikation'],
        ['kurzgeschichte', 'Kurzgeschichte', '8–10', '', 'offener Anfang offenes Ende Alltag'],
        ['epochen', 'Literaturepochen im Überblick', 'E–Q2', 'g', 'Aufklärung Sturm und Drang Klassik Romantik Expressionismus'],
        ['sprachwandel', 'Sprache und Sprachwandel', 'Q1–Q2', 'g', 'Jugendsprache Anglizismen Sprachvarietäten'],
        ['medien', 'Medien und Mediennutzung', '7–10', '', 'Nachricht Kommentar Werbung'],
      ]],
    ] },

  { id: 'englisch', sym: 'En', name: 'Englisch', g: 'sprache', schools: 'hrg',
    desc: 'Grammar, vocabulary, reading, writing and mediation.',
    areas: [
      ['Tenses', [
        ['simple-present', 'Simple Present vs. Present Progressive', '5–6', '', 'present continuous signal words'],
        ['past-vs-present-perfect', 'Simple Past vs. Present Perfect', '6–8', '', 'since for already yet ago'],
        ['past-progressive', 'Past Progressive', '6–7', '', 'past continuous while when'],
        ['past-perfect', 'Past Perfect', '7–9', '', 'had done'],
        ['future', 'Future: will, going to, present progressive', '6–8', '', 'Zukunft'],
      ]],
      ['Grammar', [
        ['if-clauses', 'If-Clauses (Typ I–III)', '7–10', '', 'conditional sentences Bedingungssätze'],
        ['passive', 'Passive Voice', '8–10', '', 'Passiv by-agent'],
        ['reported-speech', 'Reported Speech', '8–10', '', 'indirekte Rede backshift'],
        ['relative-clauses', 'Relative Clauses', '7–9', '', 'who which that whose contact clauses'],
        ['gerund-infinitive', 'Gerund vs. Infinitive', '9–Q1', 'rg', 'ing-form to-infinitive'],
        ['adjective-adverb', 'Adjectives and Adverbs', '6–8', '', 'comparison steigerung -ly'],
        ['modal-verbs', 'Modal Verbs & Substitutes', '6–8', '', 'can must have to be allowed to'],
        ['participles', 'Participle Constructions', 'E–Q2', 'g', 'Partizipialkonstruktionen'],
      ]],
      ['Skills', [
        ['summary', 'Writing a Summary', '9–Q2', 'rg', 'Zusammenfassung'],
        ['comment', 'Writing a Comment / Argumentative Essay', '9–Q2', 'rg', 'opinion linking words'],
        ['mediation', 'Mediation', '8–Q2', '', 'Sprachmittlung'],
        ['letter-email', 'Formal and Informal E-Mails', '7–10', '', 'letter of application'],
        ['analysis-fiction', 'Analysing Fiction', 'E–Q2', 'g', 'narrative perspective characterisation'],
        ['stylistic-devices', 'Stylistic Devices', '10–Q2', 'rg', 'metaphor alliteration'],
      ]],
      ['Topics (Landeskunde)', [
        ['uk', 'The United Kingdom', '7–10', '', 'Great Britain Brexit monarchy'],
        ['usa', 'The USA – the American Dream', '8–Q2', '', 'American Dream civil rights'],
        ['globalisation', 'Globalisation', 'E–Q2', 'g', 'global village'],
        ['postcolonial', 'Post-colonialism (India, Nigeria, Australia)', 'Q1–Q2', 'g', 'Commonwealth empire'],
      ]],
    ] },

  { id: 'franzoesisch', sym: 'Fr', name: 'Französisch', g: 'sprache', schools: 'rg',
    desc: 'Zweite oder dritte Fremdsprache an Realschule und Gymnasium.',
    areas: [
      ['Grammatik', [
        ['present', 'Le présent (être, avoir, -er-Verben)', '6–7', '', 'Präsens Konjugation'],
        ['passe-compose', 'Le passé composé', '7–8', '', 'avoir être accord'],
        ['imparfait', 'L’imparfait vs. passé composé', '8–9', '', ''],
        ['futur', 'Le futur simple / composé', '8–9', '', ''],
        ['subjonctif', 'Le subjonctif', '10–Q1', 'g', ''],
        ['pronoms', 'Pronoms (objet, y, en)', '8–10', '', ''],
      ]],
      ['Themen', [
        ['francophonie', 'La Francophonie', '10–Q2', 'g', ''],
        ['paris', 'Paris et la France', '7–10', '', ''],
        ['relations-franco-allemandes', 'Relations franco-allemandes', 'Q1–Q2', 'g', 'Élysée-Vertrag'],
      ]],
    ] },

  { id: 'spanisch', sym: 'Es', name: 'Spanisch', g: 'sprache', schools: 'rg',
    desc: 'Fremdsprache ab Klasse 6, 8 oder in der Oberstufe.',
    areas: [
      ['Gramática', [
        ['ser-estar', 'Ser vs. estar', '6–8', '', ''],
        ['preterito-indefinido', 'Pretérito indefinido', '8–9', '', ''],
        ['preterito-imperfecto', 'Pretérito imperfecto', '8–10', '', ''],
        ['subjuntivo', 'El subjuntivo', '10–Q1', '', ''],
      ]],
      ['Temas', [
        ['latinoamerica', 'Latinoamérica', 'Q1–Q2', 'g', ''],
        ['espana', 'España hoy', '9–Q2', '', ''],
      ]],
    ] },

  { id: 'latein', sym: 'La', name: 'Latein', g: 'sprache', schools: 'g',
    desc: 'Grammatik, Übersetzungstechnik, römische Kultur und Literatur.',
    areas: [
      ['Grammatik', [
        ['deklinationen', 'Deklinationen (a-, o-, 3.)', '5–7', '', 'Kasus'],
        ['konjugationen', 'Konjugationen & Tempora', '5–7', '', ''],
        ['aci', 'AcI – Accusativus cum Infinitivo', '6–8', '', ''],
        ['ablativus-absolutus', 'Ablativus absolutus', '7–9', '', 'Abl abs'],
        ['partizip', 'Participium coniunctum', '7–9', '', 'PC'],
        ['konjunktiv-latein', 'Konjunktiv im Gliedsatz', '8–10', '', 'cum ut ne'],
      ]],
      ['Literatur & Kultur', [
        ['caesar', 'Caesar: De bello Gallico', '9–10', '', ''],
        ['ovid', 'Ovid: Metamorphosen', '10–Q2', '', ''],
        ['cicero', 'Cicero: Reden und Philosophie', 'Q1–Q2', '', ''],
        ['roemischer-alltag', 'Römischer Alltag', '5–7', '', 'Familie Sklaven Forum'],
      ]],
    ] },

  // ──────────────────── Mathematik & Naturwissenschaften ────────────────────
  { id: 'mathe', sym: 'Ma', name: 'Mathematik', g: 'mint', schools: 'hrg',
    desc: 'Zahlen, Algebra, Funktionen, Geometrie, Stochastik und Analysis.',
    areas: [
      ['Zahlen & Rechnen', [
        ['grundrechenarten', 'Grundrechenarten & Rechengesetze', '5', '', 'Punkt vor Strich Klammer Distributivgesetz'],
        ['teilbarkeit', 'Teilbarkeit, ggT und kgV', '5–6', '', 'Primzahlen Teiler Vielfache'],
        ['bruchrechnung', 'Bruchrechnung', '6', '', 'Brüche kürzen erweitern addieren multiplizieren dividieren'],
        ['dezimalzahlen', 'Dezimalzahlen', '6', '', 'Kommazahlen runden'],
        ['negative-zahlen', 'Negative Zahlen (ganze & rationale Zahlen)', '6–7', '', 'Zahlenstrahl Vorzeichen'],
        ['prozentrechnung', 'Prozentrechnung', '7', '', 'Prozentsatz Grundwert Prozentwert Rabatt'],
        ['zinsrechnung', 'Zinsrechnung', '7–8', '', 'Zinsen Kapital Zinssatz Zinseszins'],
        ['dreisatz', 'Dreisatz & Zuordnungen', '7', '', 'proportional antiproportional'],
        ['potenzen', 'Potenzen & Potenzgesetze', '9–10', '', 'Exponent Zehnerpotenz wissenschaftliche Schreibweise'],
        ['wurzeln', 'Wurzeln & reelle Zahlen', '9', '', 'Quadratwurzel irrational'],
        ['logarithmus', 'Logarithmen', '10', 'rg', 'log Exponentialgleichung'],
      ]],
      ['Algebra & Gleichungen', [
        ['terme', 'Terme aufstellen und vereinfachen', '7–8', '', 'Variable zusammenfassen ausmultiplizieren'],
        ['binomische-formeln', 'Binomische Formeln', '8', 'rg', 'quadratische Ergänzung'],
        ['lineare-gleichungen', 'Lineare Gleichungen lösen', '7–8', '', 'Äquivalenzumformung'],
        ['gleichungssysteme', 'Lineare Gleichungssysteme', '8–9', '', 'Einsetzungsverfahren Additionsverfahren Gleichsetzungsverfahren'],
        ['quadratische-gleichungen', 'Quadratische Gleichungen & pq-Formel', '9', 'rg', 'pq-Formel abc-Formel Mitternachtsformel Diskriminante'],
      ]],
      ['Funktionen', [
        ['lineare-funktionen', 'Lineare Funktionen', '8', '', 'Steigung y-Achsenabschnitt Gerade Steigungsdreieck'],
        ['quadratische-funktionen', 'Quadratische Funktionen (Parabeln)', '9', 'rg', 'Scheitelpunkt Normalparabel Scheitelpunktform'],
        ['exponentialfunktionen', 'Exponentielles Wachstum', '10', 'rg', 'Wachstumsfaktor Halbwertszeit'],
        ['trigonometrische-funktionen', 'Sinus- und Kosinusfunktion', '10', 'g', 'Periode Amplitude Bogenmaß'],
        ['potenzfunktionen', 'Potenzfunktionen & ganzrationale Funktionen', '10–E', 'g', 'Polynom Symmetrie'],
      ]],
      ['Geometrie', [
        ['winkel', 'Winkel & Winkelsätze', '5–7', '', 'Scheitelwinkel Nebenwinkel Stufenwinkel'],
        ['dreiecke', 'Dreiecke & Kongruenz', '7', '', 'Kongruenzsätze Innenwinkelsumme'],
        ['flaecheninhalt', 'Flächeninhalt & Umfang', '5–8', '', 'Rechteck Dreieck Trapez Parallelogramm'],
        ['kreis', 'Kreis: Umfang und Fläche', '8–9', '', 'Pi Radius Durchmesser'],
        ['pythagoras', 'Satz des Pythagoras', '9', '', 'Hypotenuse Kathete rechtwinkliges Dreieck'],
        ['trigonometrie', 'Trigonometrie im rechtwinkligen Dreieck', '9–10', 'rg', 'Sinus Kosinus Tangens Gegenkathete Ankathete'],
        ['koerper', 'Körper: Volumen & Oberfläche', '6–10', '', 'Quader Würfel Prisma Zylinder Kegel Pyramide Kugel'],
        ['strahlensaetze', 'Ähnlichkeit & Strahlensätze', '9', 'rg', 'zentrische Streckung'],
      ]],
      ['Daten & Zufall', [
        ['diagramme', 'Daten & Diagramme', '5–7', '', 'Säulendiagramm Kreisdiagramm Mittelwert Median'],
        ['wahrscheinlichkeit', 'Wahrscheinlichkeitsrechnung', '7–9', '', 'Laplace Baumdiagramm Pfadregel'],
        ['kombinatorik', 'Kombinatorik', '9–10', 'rg', 'Fakultät Permutation'],
      ]],
      ['Analysis (Oberstufe)', [
        ['ableitung', 'Ableitung – Grundlagen', 'E', 'g', 'Differenzialrechnung Tangente Steigung Potenzregel'],
        ['ableitungsregeln', 'Ableitungsregeln (Produkt-, Ketten-, Quotientenregel)', 'E–Q1', 'g', ''],
        ['kurvendiskussion', 'Kurvendiskussion', 'Q1', 'g', 'Extrempunkte Wendepunkte Nullstellen Monotonie'],
        ['extremwertaufgaben', 'Extremwertaufgaben', 'Q1', 'g', 'Optimierung Nebenbedingung'],
        ['integral', 'Integralrechnung', 'Q1', 'g', 'Stammfunktion Flächenberechnung Hauptsatz'],
        ['e-funktion', 'e-Funktion & Logarithmusfunktion', 'Q1–Q2', 'g', 'ln Exponentialfunktion'],
      ]],
      ['Analytische Geometrie & Stochastik (Oberstufe)', [
        ['vektoren', 'Vektoren', 'Q1–Q2', 'g', 'Betrag Skalarprodukt'],
        ['geraden-ebenen', 'Geraden & Ebenen im Raum', 'Q2', 'g', 'Parameterform Koordinatenform Lagebeziehung'],
        ['binomialverteilung', 'Binomialverteilung', 'Q2', 'g', 'Bernoulli Erwartungswert'],
        ['normalverteilung', 'Normalverteilung & Hypothesentests', 'Q2', 'g', 'Signifikanz Fehler 1. Art'],
      ]],
    ] },

  { id: 'physik', sym: 'Ph', name: 'Physik', g: 'mint', schools: 'hrg',
    desc: 'Mechanik, Elektrizität, Optik, Wärme, Atom- und Kernphysik.',
    areas: [
      ['Mechanik', [
        ['geschwindigkeit', 'Geschwindigkeit & gleichförmige Bewegung', '7–8', '', 'v = s/t'],
        ['beschleunigung', 'Beschleunigte Bewegung', '9–10', '', 'freier Fall'],
        ['kraefte', 'Kräfte & Newtonsche Gesetze', '7–9', '', 'Newton Trägheit Gewichtskraft'],
        ['energie', 'Energie & Energieerhaltung', '8–10', '', 'kinetische potentielle Energie Lageenergie'],
        ['arbeit-leistung', 'Arbeit & Leistung', '8–9', '', 'Watt Joule'],
        ['hebel', 'Hebel & einfache Maschinen', '7–8', '', 'Flaschenzug Drehmoment'],
        ['druck', 'Druck & Auftrieb', '8–9', '', 'Pascal Archimedes'],
      ]],
      ['Elektrizität', [
        ['stromkreis', 'Der elektrische Stromkreis', '6–8', '', 'Reihenschaltung Parallelschaltung Leiter'],
        ['ohmsches-gesetz', 'Ohmsches Gesetz', '8–9', '', 'Widerstand Spannung Stromstärke URI'],
        ['elektrische-leistung', 'Elektrische Leistung & Energie', '9', '', 'kWh Stromrechnung'],
        ['magnetismus', 'Magnetismus & Elektromagnetismus', '7–9', '', 'Spule Elektromagnet'],
        ['induktion', 'Induktion & Transformator', '9–10', '', 'Generator Lenzsche Regel'],
      ]],
      ['Optik, Wärme, Akustik', [
        ['licht', 'Licht & Schatten, Reflexion', '6–7', '', 'Spiegel Reflexionsgesetz'],
        ['brechung', 'Brechung & Linsen', '8–9', '', 'Sammellinse Brennweite'],
        ['waerme', 'Temperatur & Wärme', '7–9', '', 'Teilchenmodell Aggregatzustände'],
        ['schall', 'Schall & Schwingungen', '7–8', '', 'Frequenz Amplitude Hertz'],
      ]],
      ['Atom- und Kernphysik', [
        ['radioaktivitaet', 'Radioaktivität', '9–10', '', 'Alpha Beta Gamma Strahlung Halbwertszeit'],
        ['kernspaltung', 'Kernspaltung & Kernfusion', '10', '', 'Kernkraftwerk'],
      ]],
      ['Oberstufe', [
        ['elektrisches-feld', 'Elektrisches Feld & Kondensator', 'Q1', 'g', 'Feldstärke Kapazität'],
        ['magnetisches-feld', 'Magnetisches Feld & Lorentzkraft', 'Q1', 'g', ''],
        ['schwingungen-wellen', 'Mechanische Schwingungen & Wellen', 'Q1', 'g', 'Interferenz Doppelspalt'],
        ['quantenphysik', 'Quantenphysik (Photoeffekt, Welle-Teilchen)', 'Q2', 'g', 'Photon h Planck'],
        ['atommodelle', 'Atommodelle & Spektren', 'Q2', 'g', 'Bohr Energieniveau'],
      ]],
    ] },

  { id: 'chemie', sym: 'Ch', name: 'Chemie', g: 'mint', schools: 'hrg',
    desc: 'Stoffe, Teilchen, Reaktionen, Säuren und Basen, organische Chemie.',
    areas: [
      ['Grundlagen', [
        ['stoffe', 'Stoffe & Stoffeigenschaften', '7', '', 'Reinstoff Gemisch Trennverfahren'],
        ['teilchenmodell', 'Teilchenmodell & Aggregatzustände', '7', '', ''],
        ['chemische-reaktion', 'Die chemische Reaktion', '7–8', '', 'Edukte Produkte Energie exotherm endotherm'],
        ['atombau', 'Atombau & Periodensystem', '8–9', '', 'Proton Neutron Elektron Schalenmodell PSE Valenzelektronen'],
        ['reaktionsgleichungen', 'Reaktionsgleichungen aufstellen', '8–9', '', 'ausgleichen Koeffizienten'],
      ]],
      ['Bindungen & Reaktionen', [
        ['ionenbindung', 'Ionenbindung & Salze', '9', '', 'Kation Anion Ionengitter'],
        ['elektronenpaarbindung', 'Elektronenpaarbindung & Molekülbau', '9', '', 'kovalente Bindung Lewis polare Bindung'],
        ['metallbindung', 'Metalle & Metallbindung', '9', '', 'Elektronengas'],
        ['redox', 'Oxidation & Reduktion (Redoxreaktionen)', '9–10', '', 'Elektronenübertragung Oxidationszahl'],
        ['saeuren-basen', 'Säuren, Basen & pH-Wert', '9–10', '', 'Neutralisation Protonen Lauge Indikator'],
        ['stoechiometrie', 'Stöchiometrie: Stoffmenge & Mol', '9–10', 'rg', 'molare Masse Avogadro'],
      ]],
      ['Organische Chemie', [
        ['kohlenwasserstoffe', 'Kohlenwasserstoffe (Alkane, Alkene, Alkine)', '10', '', 'Methan homologe Reihe Nomenklatur'],
        ['alkohole', 'Alkohole', '10', '', 'Ethanol Hydroxygruppe'],
        ['carbonsaeuren', 'Carbonsäuren & Ester', '10–Q1', 'rg', 'Veresterung'],
        ['kunststoffe', 'Kunststoffe', 'Q1–Q2', 'g', 'Polymerisation Polykondensation'],
      ]],
      ['Oberstufe', [
        ['chemisches-gleichgewicht', 'Chemisches Gleichgewicht', 'Q1', 'g', 'Le Chatelier Massenwirkungsgesetz'],
        ['reaktionsgeschwindigkeit', 'Reaktionsgeschwindigkeit & Katalyse', 'E–Q1', 'g', ''],
        ['elektrochemie', 'Elektrochemie (Galvanische Zelle, Elektrolyse)', 'Q1–Q2', 'g', 'Batterie Akku Spannungsreihe'],
        ['naturstoffe', 'Naturstoffe (Fette, Kohlenhydrate, Proteine)', 'Q2', 'g', ''],
      ]],
    ] },

  { id: 'biologie', sym: 'Bi', name: 'Biologie', g: 'mint', schools: 'hrg',
    desc: 'Zellen, Mensch, Pflanzen, Ökologie, Genetik und Evolution.',
    areas: [
      ['Zellen & Lebewesen', [
        ['kennzeichen-lebewesen', 'Kennzeichen des Lebendigen', '5', '', ''],
        ['zelle', 'Die Zelle (Pflanzen- & Tierzelle)', '5–8', '', 'Zellkern Zellwand Mitochondrien Mikroskop'],
        ['zellteilung', 'Mitose & Meiose', '9–10', '', 'Zellteilung Chromosomen'],
        ['wirbeltiere', 'Wirbeltiere im Vergleich', '5–6', '', 'Fische Amphibien Reptilien Vögel Säugetiere'],
      ]],
      ['Mensch & Gesundheit', [
        ['verdauung', 'Ernährung & Verdauung', '5–8', '', 'Nährstoffe Enzyme Dünndarm'],
        ['atmung-blutkreislauf', 'Atmung & Blutkreislauf', '6–8', '', 'Herz Lunge Blut'],
        ['nervensystem', 'Nervensystem & Sinnesorgane', '8–9', '', 'Neuron Reflex Auge Ohr'],
        ['hormone', 'Hormone', '8–10', '', 'Insulin Diabetes'],
        ['immunsystem', 'Immunsystem', '8–10', '', 'Antikörper Impfung Viren Bakterien'],
        ['sexualitaet', 'Pubertät & Sexualität', '6–8', '', 'Verhütung'],
        ['sucht', 'Sucht & Drogen', '7–9', '', 'Nikotin Alkohol'],
      ]],
      ['Pflanzen & Ökologie', [
        ['fotosynthese', 'Fotosynthese', '7–Q1', '', 'Photosynthese Chlorophyll Glucose Zellatmung'],
        ['oekosystem', 'Ökosysteme', '7–Q1', '', 'Wald See Nahrungskette Nahrungsnetz biotisch abiotisch'],
        ['stoffkreislauf', 'Stoffkreisläufe & Energiefluss', '8–Q1', '', 'Kohlenstoffkreislauf Produzenten Konsumenten Destruenten'],
        ['umweltschutz', 'Mensch & Umwelt', '7–10', '', 'Klimawandel Biodiversität'],
      ]],
      ['Genetik & Evolution', [
        ['mendel', 'Mendelsche Regeln', '9–10', '', 'dominant rezessiv Erbgang'],
        ['dna', 'DNA & Proteinbiosynthese', '9–Q2', '', 'Transkription Translation Gen'],
        ['gentechnik', 'Gentechnik', '10–Q2', '', 'CRISPR PCR'],
        ['evolution', 'Evolution', '9–Q2', '', 'Darwin Selektion Mutation Artbildung'],
        ['neurobiologie', 'Neurobiologie', 'Q1–Q2', 'g', 'Aktionspotential Synapse Ruhepotential'],
        ['stoffwechsel', 'Stoffwechsel & Enzyme', 'E–Q1', 'g', 'Enzymkinetik Zellatmung ATP'],
      ]],
    ] },

  { id: 'informatik', sym: 'If', name: 'Informatik', g: 'mint', schools: 'hrg',
    desc: 'Algorithmen, Programmieren, Daten, Netze und Informatik & Gesellschaft.',
    areas: [
      ['Grundlagen', [
        ['information-daten', 'Information & Daten', '5–7', '', 'Bit Byte Codierung'],
        ['binaersystem', 'Zahlensysteme (Binär, Hex)', '7–9', '', 'Dualsystem'],
        ['algorithmen', 'Algorithmen & Struktogramme', '7–9', '', 'Schleife Verzweigung Ablaufplan'],
        ['programmieren-python', 'Programmieren mit Python', '8–Q2', '', 'Variablen Schleifen Funktionen'],
        ['datenbanken', 'Datenbanken & SQL', '9–Q2', 'rg', 'Tabelle SELECT Relation'],
      ]],
      ['Netze & Gesellschaft', [
        ['internet', 'Internet & Netzwerke', '8–10', '', 'IP TCP Router'],
        ['datenschutz', 'Datenschutz & Datensicherheit', '7–10', '', 'DSGVO Passwort Verschlüsselung'],
        ['ki', 'Künstliche Intelligenz', '9–Q2', '', 'maschinelles Lernen neuronales Netz'],
      ]],
      ['Oberstufe', [
        ['oop', 'Objektorientierte Programmierung', 'Q1', 'g', 'Klasse Objekt Vererbung UML'],
        ['sortieralgorithmen', 'Such- & Sortierverfahren', 'Q1', 'g', 'Bubblesort Binäre Suche Komplexität'],
        ['automaten', 'Automaten & formale Sprachen', 'Q2', 'g', 'Grammatik endlicher Automat'],
      ]],
    ] },

  // ───────────────────────── Gesellschaft ─────────────────────────
  { id: 'geschichte', sym: 'Ge', name: 'Geschichte', g: 'gesell', schools: 'hrg',
    desc: 'Von der Antike bis zur Gegenwart – Quellen verstehen und Zusammenhänge erklären.',
    areas: [
      ['Antike & Mittelalter', [
        ['steinzeit', 'Ur- und Frühgeschichte', '5–6', '', 'Steinzeit Sesshaftigkeit'],
        ['aegypten', 'Das alte Ägypten', '5–6', '', 'Pharao Pyramiden Nil'],
        ['griechenland', 'Antikes Griechenland', '6', '', 'Polis Athen Demokratie'],
        ['rom', 'Das Römische Reich', '6', '', 'Republik Kaiserzeit'],
        ['mittelalter', 'Lebenswelten im Mittelalter', '7', '', 'Lehnswesen Ständegesellschaft Burg Stadt'],
      ]],
      ['Frühe Neuzeit & 19. Jahrhundert', [
        ['reformation', 'Reformation', '7–8', '', 'Luther Thesen'],
        ['absolutismus', 'Absolutismus & Aufklärung', '8', '', 'Ludwig XIV Kant Montesquieu'],
        ['franzoesische-revolution', 'Französische Revolution', '8', '', '1789 Menschenrechte Bastille'],
        ['industrialisierung', 'Industrialisierung & soziale Frage', '8–9', '', 'Dampfmaschine Arbeiter'],
        ['revolution-1848', 'Revolution 1848/49', '8–9', '', 'Paulskirche'],
        ['kaiserreich', 'Reichsgründung & Kaiserreich', '8–9', '', 'Bismarck 1871'],
        ['imperialismus', 'Imperialismus', '9', '', 'Kolonien'],
      ]],
      ['20. Jahrhundert', [
        ['erster-weltkrieg', 'Erster Weltkrieg', '9', '', '1914 1918 Versailler Vertrag'],
        ['weimarer-republik', 'Weimarer Republik', '9–Q2', '', '1918 1933 Inflation Verfassung Hitlerputsch'],
        ['nationalsozialismus', 'Nationalsozialismus', '9–Q2', '', 'Machtergreifung Gleichschaltung NS-Diktatur'],
        ['holocaust', 'Holocaust & Verfolgung', '9–Q2', '', 'Shoah Nürnberger Gesetze'],
        ['zweiter-weltkrieg', 'Zweiter Weltkrieg', '9', '', '1939 1945'],
        ['kalter-krieg', 'Kalter Krieg', '10', '', 'Ost-West-Konflikt Kuba-Krise NATO Warschauer Pakt'],
        ['brd-ddr', 'BRD und DDR', '10–Q2', '', 'Teilung Mauerbau 17. Juni Wirtschaftswunder Stasi'],
        ['wiedervereinigung', 'Mauerfall & Wiedervereinigung', '10–Q2', '', '1989 1990 friedliche Revolution'],
        ['europaeische-einigung', 'Europäische Einigung', '10–Q2', '', 'EU EWG'],
      ]],
      ['Methoden', [
        ['quellenanalyse', 'Quellenanalyse', '6–Q2', '', 'Textquelle Bildquelle Karikatur'],
        ['karikatur', 'Karikaturen interpretieren', '8–Q2', '', ''],
      ]],
    ] },

  { id: 'erdkunde', sym: 'Ek', name: 'Erdkunde', alt: 'Geographie', g: 'gesell', schools: 'hrg',
    desc: 'Physische Geographie, Mensch und Raum, globale Herausforderungen.',
    areas: [
      ['Orientierung & Methoden', [
        ['karten', 'Karten lesen & Maßstab', '5', '', 'Gradnetz Atlas'],
        ['klimadiagramm', 'Klimadiagramme auswerten', '6–8', '', 'Niederschlag Temperatur humid arid'],
      ]],
      ['Physische Geographie', [
        ['plattentektonik', 'Plattentektonik, Vulkane & Erdbeben', '7–9', '', 'Erdaufbau Subduktion'],
        ['klimazonen', 'Klima- & Vegetationszonen', '7–8', '', 'Tropen Wüste Savanne'],
        ['wetter', 'Wetter & Klima', '6–8', '', 'Luftdruck Wind Wolken'],
        ['klimawandel', 'Klimawandel', '8–Q2', '', 'Treibhauseffekt CO2'],
        ['boden', 'Böden & Landwirtschaft', '7–Q1', '', 'Bodenprofil'],
      ]],
      ['Mensch & Raum', [
        ['stadt', 'Stadtentwicklung & Verstädterung', '8–Q2', '', 'Urbanisierung Megastadt'],
        ['bevoelkerung', 'Bevölkerungsentwicklung & Migration', '9–Q2', '', 'Bevölkerungspyramide demographischer Wandel'],
        ['globalisierung', 'Globalisierung & Welthandel', '9–Q2', '', 'Weltwirtschaft'],
        ['entwicklungslaender', 'Disparitäten & Entwicklung', '9–Q2', '', 'HDI Entwicklungsländer'],
        ['energie-rohstoffe', 'Energie & Rohstoffe', '8–Q2', '', 'erneuerbare Energien'],
        ['tourismus', 'Tourismus', '7–9', '', ''],
      ]],
    ] },

  { id: 'politik', sym: 'Po', name: 'Politik', alt: 'Sozialkunde, Gemeinschaftskunde, PoWi', g: 'gesell', schools: 'hrg',
    desc: 'Demokratie, Grundgesetz, Wahlen, Recht, Europa und internationale Politik.',
    areas: [
      ['Demokratie in Deutschland', [
        ['grundgesetz', 'Grundgesetz & Grundrechte', '7–10', '', 'Menschenwürde Artikel 1'],
        ['gewaltenteilung', 'Gewaltenteilung', '8–10', '', 'Legislative Exekutive Judikative Bundestag'],
        ['verfassungsorgane', 'Verfassungsorgane des Bundes', '9–Q2', '', 'Bundestag Bundesrat Bundesregierung Bundespräsident Bundesverfassungsgericht'],
        ['wahlen', 'Wahlen & Wahlsystem', '8–Q2', '', 'Erststimme Zweitstimme Wahlgrundsätze'],
        ['parteien', 'Parteien & Interessenverbände', '9–Q2', '', 'Lobbyismus'],
        ['gesetzgebung', 'Gesetzgebungsverfahren', '9–Q2', '', 'Bundesrat Vermittlungsausschuss'],
        ['foederalismus', 'Föderalismus', '9–Q2', '', 'Bund Länder Kommunen'],
        ['partizipation', 'Politische Beteiligung', '7–10', '', 'Bürgerinitiative Demonstration Petition'],
      ]],
      ['Recht & Gesellschaft', [
        ['rechtsstaat', 'Rechtsstaat & Jugendstrafrecht', '8–10', '', 'Strafmündigkeit Gericht'],
        ['sozialstaat', 'Sozialstaat & soziale Sicherung', '9–Q2', '', 'Sozialversicherung Rente'],
        ['medien-politik', 'Medien & Demokratie', '8–Q2', '', 'Fake News Pressefreiheit'],
      ]],
      ['Europa & Welt', [
        ['eu', 'Die Europäische Union', '9–Q2', '', 'EU-Parlament Kommission Rat'],
        ['internationale-politik', 'Internationale Politik & UNO', '10–Q2', 'rg', 'Vereinte Nationen Sicherheitsrat NATO'],
        ['frieden', 'Frieden & Sicherheit', '10–Q2', '', 'Konflikte Terrorismus'],
      ]],
    ] },

  { id: 'wirtschaft', sym: 'Wi', name: 'Wirtschaft', alt: 'Wirtschaft & Beruf, WBS, Sozialwissenschaften', g: 'gesell', schools: 'hrg',
    desc: 'Verbraucher, Markt, Unternehmen, Arbeit, Berufsorientierung und Wirtschaftspolitik.',
    areas: [
      ['Haushalt & Markt', [
        ['verbraucher', 'Verbraucherbildung & Kaufvertrag', '7–9', '', 'Gewährleistung Widerruf'],
        ['geld-konto', 'Geld, Konto & Kredit', '7–10', '', 'Girokonto Zinsen Schulden'],
        ['markt-preisbildung', 'Markt & Preisbildung', '8–Q1', '', 'Angebot Nachfrage Gleichgewichtspreis'],
        ['soziale-marktwirtschaft', 'Soziale Marktwirtschaft', '9–Q2', '', 'Wirtschaftsordnung'],
      ]],
      ['Arbeit & Unternehmen', [
        ['berufsorientierung', 'Berufsorientierung & Praktikum', '8–10', 'hr', 'Ausbildung duales System'],
        ['unternehmen', 'Das Unternehmen', '9–Q1', '', 'Rechtsformen GmbH AG'],
        ['arbeitsrecht', 'Arbeitsrecht & Tarifautonomie', '9–Q2', '', 'Gewerkschaft Mindestlohn'],
        ['wirtschaftspolitik', 'Konjunktur & Wirtschaftspolitik', 'Q1–Q2', 'g', 'Inflation BIP EZB'],
      ]],
    ] },

  { id: 'paedagogik', sym: 'Pä', name: 'Pädagogik', alt: 'Erziehungswissenschaft', g: 'gesell', schools: 'g',
    desc: 'Wahlfach der Oberstufe (u. a. NRW, Niedersachsen, Hessen).',
    areas: [
      ['Themen', [
        ['erziehung', 'Erziehung & Erziehungsstile', 'E', '', 'Baumrind autoritativ'],
        ['lerntheorien', 'Lerntheorien', 'E–Q1', '', 'Konditionierung Bandura Modelllernen'],
        ['entwicklung', 'Entwicklung (Piaget, Erikson, Freud)', 'Q1', '', 'Stufenmodell'],
        ['sozialisation', 'Sozialisation & Identität', 'Q1–Q2', '', 'Hurrelmann'],
      ]],
    ] },

  { id: 'psychologie', sym: 'Ps', name: 'Psychologie', g: 'gesell', schools: 'g',
    desc: 'Wahlfach der Oberstufe in mehreren Ländern.',
    areas: [
      ['Themen', [
        ['wahrnehmung', 'Wahrnehmung', 'E–Q1', '', ''],
        ['gedaechtnis', 'Lernen & Gedächtnis', 'E–Q1', '', 'Mehrspeichermodell'],
        ['sozialpsychologie', 'Sozialpsychologie', 'Q1–Q2', '', 'Konformität Milgram Asch'],
      ]],
    ] },

  // ───────────────────────── Religion & Ethik ─────────────────────────
  { id: 'religion', sym: 'Re', name: 'Religion', alt: 'evangelisch, katholisch, islamisch', g: 'werte', schools: 'hrg',
    desc: 'Weltreligionen, Bibel, Ethik aus religiöser Sicht.',
    areas: [
      ['Themen', [
        ['weltreligionen', 'Weltreligionen im Überblick', '5–8', '', 'Judentum Christentum Islam Hinduismus Buddhismus'],
        ['bibel', 'Die Bibel', '5–7', '', 'Altes Testament Neues Testament'],
        ['jesus', 'Jesus von Nazareth', '6–Q1', '', 'Gleichnisse Bergpredigt'],
        ['gottesfrage', 'Die Frage nach Gott', '9–Q2', '', 'Theodizee Religionskritik'],
        ['kirche', 'Kirche & Kirchengeschichte', '7–Q1', '', 'Reformation Ökumene'],
      ]],
    ] },

  { id: 'ethik', sym: 'Et', name: 'Ethik', alt: 'Philosophie, Werte und Normen, LER, Praktische Philosophie', g: 'werte', schools: 'hrg',
    desc: 'Moral, Gerechtigkeit, Freiheit – Ersatzfach zu Religion.',
    areas: [
      ['Themen', [
        ['werte-normen', 'Werte & Normen', '5–8', '', 'Moral'],
        ['gerechtigkeit', 'Gerechtigkeit', '8–Q2', '', 'Rawls'],
        ['freiheit', 'Freiheit & Verantwortung', '9–Q2', '', 'Determinismus'],
        ['ethische-theorien', 'Ethische Theorien', 'Q1–Q2', 'g', 'Kant kategorischer Imperativ Utilitarismus Aristoteles'],
        ['erkenntnistheorie', 'Erkenntnistheorie', 'Q1–Q2', 'g', 'Rationalismus Empirismus Descartes'],
      ]],
    ] },

  // ───────────────────────── Kunst, Musik & Sport ─────────────────────────
  { id: 'kunst', sym: 'Ku', name: 'Kunst', g: 'musisch', schools: 'hrg',
    desc: 'Bildanalyse, Gestaltung, Kunstgeschichte.',
    areas: [
      ['Themen', [
        ['farbenlehre', 'Farbenlehre', '5–7', '', 'Farbkreis Itten Komplementärfarben'],
        ['perspektive', 'Perspektive & Raumdarstellung', '7–9', '', 'Fluchtpunkt Zentralperspektive'],
        ['bildanalyse', 'Bildanalyse', '8–Q2', '', 'Werkanalyse Komposition'],
        ['kunstepochen', 'Kunstepochen', '9–Q2', '', 'Renaissance Barock Impressionismus Expressionismus Moderne'],
      ]],
    ] },

  { id: 'musik', sym: 'Mu', name: 'Musik', g: 'musisch', schools: 'hrg',
    desc: 'Musiklehre, Musikgeschichte und Musik hören.',
    areas: [
      ['Themen', [
        ['notenlehre', 'Notenlehre & Rhythmus', '5–6', '', 'Notenwerte Takt Violinschlüssel'],
        ['tonleitern', 'Tonleitern & Intervalle', '6–9', '', 'Dur Moll Quinte'],
        ['akkorde', 'Akkorde & Harmonielehre', '8–Q2', '', 'Dreiklang Kadenz'],
        ['musikepochen', 'Musikepochen', '7–Q2', '', 'Barock Klassik Romantik'],
        ['popmusik', 'Pop- und Rockmusik', '7–10', '', ''],
      ]],
    ] },

  { id: 'sport', sym: 'Sp', name: 'Sport', g: 'musisch', schools: 'hrg',
    desc: 'Sporttheorie – v. a. für Sport als Abiturfach.',
    areas: [
      ['Sporttheorie', [
        ['trainingslehre', 'Trainingslehre', '9–Q2', '', 'Superkompensation Belastung'],
        ['motorische-faehigkeiten', 'Konditionelle & koordinative Fähigkeiten', '9–Q2', '', 'Ausdauer Kraft Schnelligkeit'],
        ['bewegungslehre', 'Bewegungslehre & Biomechanik', 'Q1–Q2', 'g', ''],
        ['sportbiologie', 'Sportbiologie', 'Q1–Q2', 'g', 'Herz-Kreislauf Muskulatur'],
      ]],
    ] },

  { id: 'ds', sym: 'Ds', name: 'Darstellendes Spiel', alt: 'Theater', g: 'musisch', schools: 'rg',
    desc: 'Theaterpraxis und -theorie.',
    areas: [
      ['Themen', [
        ['theaterformen', 'Theaterformen', '9–Q2', '', 'episches Theater Brecht'],
        ['szenisches-spiel', 'Szenisches Spiel & Präsenz', '7–Q2', '', ''],
      ]],
    ] },

  // ───────────────────────── Arbeit & Technik ─────────────────────────
  { id: 'awt', sym: 'At', name: 'Arbeit – Wirtschaft – Technik', alt: 'Arbeitslehre, WAT, AWT', g: 'praxis', schools: 'hr',
    desc: 'Praxisorientiertes Fach an Haupt- und Realschulen.',
    areas: [
      ['Themen', [
        ['arbeitswelt', 'Arbeitswelt & Berufe', '7–10', '', 'Berufsfelder'],
        ['betriebspraktikum', 'Betriebspraktikum', '8–9', '', 'Praktikumsbericht'],
        ['projektarbeit', 'Projektprüfung & Präsentation', '8–10', '', 'Projekt Präsentation'],
      ]],
    ] },

  { id: 'technik', sym: 'Te', name: 'Technik', g: 'praxis', schools: 'hrg',
    desc: 'Technisches Zeichnen, Werkstoffe, Elektrotechnik.',
    areas: [
      ['Themen', [
        ['technisches-zeichnen', 'Technisches Zeichnen', '7–10', '', 'Dreitafelprojektion'],
        ['werkstoffe', 'Werkstoffe & Fertigung', '7–10', '', 'Holz Metall Kunststoff'],
        ['elektrotechnik', 'Elektrotechnik-Grundlagen', '8–10', '', 'Schaltplan'],
      ]],
    ] },

  { id: 'hauswirtschaft', sym: 'Hw', name: 'Ernährung & Gesundheit', alt: 'Hauswirtschaft, AES', g: 'praxis', schools: 'hr',
    desc: 'Ernährung, Haushalt und Gesundheit.',
    areas: [
      ['Themen', [
        ['ernaehrung', 'Ausgewogene Ernährung', '6–10', '', 'Ernährungspyramide Nährstoffe'],
        ['hygiene', 'Küchenhygiene', '6–8', '', ''],
        ['nachhaltig-konsum', 'Nachhaltiger Konsum', '8–10', '', ''],
      ]],
    ] },
];

// ───────── Aufbereitung ─────────
const LETTER = { h: 'hs', r: 'rs', g: 'gym' };
const toSchools = (str) => [...str].map((c) => LETTER[c]).filter(Boolean);

export const SUBJECTS = SUBJECTS_RAW.map((s, i) => {
  const subjectSchools = toSchools(s.schools);
  const areas = s.areas.map(([name, topics]) => ({
    name,
    topics: topics.map(([slug, title, k, sch, kw]) => ({
      id: `${s.id}--${slug}`,
      slug, title, k,
      schools: sch ? toSchools(sch) : subjectSchools,
      keywords: kw || '',
      subject: s.id,
      area: name,
    })),
  }));
  return { ...s, no: i + 1, schools: subjectSchools, areas };
});

export const SUBJECT_BY_ID = Object.fromEntries(SUBJECTS.map((s) => [s.id, s]));
export const ALL_TOPICS = SUBJECTS.flatMap((s) => s.areas.flatMap((a) => a.topics));
export const TOPIC_BY_ID = Object.fromEntries(ALL_TOPICS.map((t) => [t.id, t]));
