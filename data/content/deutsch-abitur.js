// Ausgearbeitete Themen: Deutsch – Oberstufe (Epochen, Sprache)
import { ch, txt, EX } from './_helpers.js';

export default {
  'deutsch--epochen': {
    summary: 'Literaturepochen ordnen Texte in ihre Zeit ein: Welche Ideen prägten die Autoren, welche Themen und Formen waren typisch? Wer die Epochen kennt, kann Gedichte und Dramen im Abitur sicher deuten.',
    goals: ['Die wichtigsten Epochen zeitlich ordnen', 'Leitideen, Themen und Formen den Epochen zuordnen', 'Zentrale Autoren und Werke kennen', 'Einen Text begründet einer Epoche zuordnen'],
    lernzettel: [
      { h: 'Vom Barock zur Romantik' },
      { tbl: { head: ['Epoche', 'Zeit (ca.)', 'Leitideen', 'Autoren und Werke'], rows: [
        ['Barock', '1600–1720', 'Vergänglichkeit (vanitas), memento mori, carpe diem; Dreißigjähriger Krieg', 'Andreas Gryphius: „Es ist alles eitel“ (Sonett)'],
        ['Aufklärung', '1720–1800', 'Vernunft, Toleranz, Mündigkeit – Kant: „Sapere aude!“', 'Lessing: „Nathan der Weise“ (1779, Ringparabel), Fabeln'],
        ['Sturm und Drang', '1765–1785', 'Gefühl, Genie, Natur, Freiheit, Auflehnung gegen Regeln', 'Goethe: „Die Leiden des jungen Werthers“ (1774); Schiller: „Die Räuber“ (1781)'],
        ['Weimarer Klassik', '1786–1805', 'Humanität, Harmonie, Maß, Ideal des edlen Menschen', 'Goethe: „Iphigenie auf Tauris“; Schiller: „Wilhelm Tell“ (1804)'],
        ['Romantik', '1795–1835', 'Sehnsucht, Fantasie, Traum, Nacht, Natur, Wandern; „blaue Blume“', 'Eichendorff: „Mondnacht“, „Aus dem Leben eines Taugenichts“; E. T. A. Hoffmann: „Der Sandmann“'],
      ] } },
      { h: 'Vom Vormärz bis nach 1945' },
      { tbl: { head: ['Epoche', 'Zeit (ca.)', 'Leitideen', 'Autoren und Werke'], rows: [
        ['Vormärz', '1815–1848', 'politische Literatur, Kritik an Zensur und Fürsten', 'Büchner: „Woyzeck“, „Der Hessische Landbote“; Heine'],
        ['Realismus', '1848–1890', 'wirklichkeitsnahe, aber „verklärte“ Darstellung des Bürgertums', 'Fontane: „Effi Briest“; Storm: „Der Schimmelreiter“'],
        ['Naturalismus', '1880–1900', 'genaue Abbildung des Elends, Milieu und Vererbung bestimmen den Menschen; Sekundenstil', 'Hauptmann: „Die Weber“, „Bahnwärter Thiel“'],
        ['Expressionismus', '1910–1925', 'Großstadt, Weltende, Ich-Zerfall, Krieg; Schrei, starke Bilder', 'van Hoddis: „Weltende“; Heym; Trakl; Benn'],
        ['Neue Sachlichkeit', '1920–1933', 'nüchterner Blick auf Großstadt und Gesellschaft der Weimarer Republik', 'Döblin: „Berlin Alexanderplatz“; Kästner; Keun: „Das kunstseidene Mädchen“'],
        ['Exil- und Nachkriegsliteratur', '1933–1960', 'Exil, Schuld, Zerstörung; Trümmerliteratur, Gruppe 47', 'Brecht; Borchert; Böll; Celan: „Todesfuge“'],
      ] } },
      { h: 'Epochen zuordnen – so gehst du vor' },
      { ol: ['Thema und Motive bestimmen (Natur, Großstadt, Vergänglichkeit, Vernunft …)', 'Haltung des Sprechers: Gefühl oder Vernunft? Harmonie oder Zerrissenheit?', 'Form prüfen: strenges Sonett, Volksliedstrophe, freie Verse, Reihungsstil', 'Zuordnung mit mindestens zwei Belegen aus dem Text begründen'] },
      { note: 'Epochengrenzen sind Hilfskonstruktionen und überlappen sich. Im Abitur zählt die begründete Zuordnung am Text, nicht das auswendig gelernte Jahr.', kind: 'Tipp' },
    ],
    merkzettel: [['Barock', 'vanitas, memento mori'], ['Aufklärung', 'Vernunft, Toleranz – Lessing'], ['Sturm und Drang', 'Gefühl, Genie – Werther'], ['Klassik', 'Humanität, Harmonie'], ['Romantik', 'Sehnsucht, Nacht, blaue Blume'], ['Naturalismus', 'Milieu, Sekundenstil'], ['Expressionismus', 'Großstadt, Weltende, Ich-Zerfall']],
    exercises: [
      ch('Welche Epoche stellt die Vernunft in den Mittelpunkt?', ['Romantik', 'Aufklärung', 'Sturm und Drang', 'Expressionismus'], 1, 'Aufklärung: „Sapere aude – Habe Mut, dich deines eigenen Verstandes zu bedienen!“ (Kant).'),
      ch('Welches Werk gehört zum Sturm und Drang?', ['„Nathan der Weise“', '„Die Leiden des jungen Werthers“', '„Effi Briest“', '„Berlin Alexanderplatz“'], 1, 'Goethes Briefroman (1774) ist das Hauptwerk des Sturm und Drang.'),
      ch('Ein Gedicht handelt von Sehnsucht, Mondnacht und einer fernen Heimat. Welche Epoche liegt nahe?', ['Barock', 'Aufklärung', 'Romantik', 'Neue Sachlichkeit'], 2, 'Sehnsucht, Nacht und Natur sind zentrale Motive der Romantik.'),
      ch('Welche Leitidee gehört zum Barock?', ['Humanität', 'Vergänglichkeit (vanitas)', 'Großstadtkritik', 'Milieutheorie'], 1, 'Vanitas und memento mori prägen die Barocklyrik.'),
      ch('Wer schrieb „Nathan der Weise“ mit der berühmten Ringparabel?', ['Goethe', 'Schiller', 'Lessing', 'Büchner'], 2, 'Gotthold Ephraim Lessing, 1779 – ein Schlüsselwerk der Aufklärung.'),
      ch('Was ist der „Sekundenstil“?', ['Gedichte, die man in Sekunden liest', 'eine genaue, fast zeitdeckende Wiedergabe von Wirklichkeit im Naturalismus', 'ein Reimschema', 'eine Erzählform der Romantik'], 1, 'Der Naturalismus wollte die Wirklichkeit möglichst exakt abbilden.'),
      ch('Ein Gedicht von 1911 reiht Bilder von Zerstörung aneinander: Dächer fliegen, Züge stürzen von Brücken, das Meer steigt. Welche Epoche und welcher Beleg passen am besten?', ['Romantik – wegen der Naturbilder', 'Expressionismus – Weltende-Motiv und Reihungsstil', 'Klassik – wegen der Harmonie', 'Aufklärung – wegen der Vernunft'], 1, 'Untergangsvisionen im Reihungsstil sind typisch für den Expressionismus (vgl. van Hoddis, „Weltende“).', EX),
    ],
    exam: 'Epochenwissen wird im Abitur bei Gedichtanalyse und -vergleich sowie bei Dramen- und Romananalysen erwartet. Welche Werke Pflichtlektüre sind, legt jedes Land fest.',
  },

  'deutsch--sprachwandel': {
    summary: 'Sprache verändert sich ständig – durch neue Technik, Kontakt mit anderen Sprachen und gesellschaftlichen Wandel. Im Abitur untersuchst du Sprachwandel, Sprachvarietäten und Kommunikation.',
    goals: ['Ursachen von Sprachwandel erklären', 'Arten des Bedeutungswandels unterscheiden', 'Sprachvarietäten benennen', 'Kommunikationsmodelle anwenden'],
    lernzettel: [
      { h: 'Ursachen von Sprachwandel' },
      { ul: ['<strong>Sprachkontakt:</strong> Entlehnungen, heute vor allem Anglizismen (Download, Meeting)', '<strong>technischer Wandel:</strong> neue Dinge brauchen neue Wörter (streamen, Akku)', '<strong>Sprachökonomie:</strong> Verkürzungen (Kita, Abi, LOL)', '<strong>gesellschaftlicher Wandel:</strong> Anredeformen, geschlechtergerechte Sprache'] },
      { h: 'Bedeutungswandel' },
      { tbl: { head: ['Art', 'Beispiel'], rows: [['Bedeutungserweiterung', 'Maus: Tier → auch Eingabegerät'], ['Bedeutungsverengung', 'Hochzeit: mhd. „hôchgezît“ = hohes Fest → nur noch Eheschließung'], ['Bedeutungsverbesserung', 'Marschall: Pferdeknecht → hoher militärischer Rang'], ['Bedeutungsverschlechterung', 'Weib: neutral „Frau“ → abwertend; gemein: „gemeinsam“ → „niederträchtig“']] } },
      { h: 'Sprachvarietäten' },
      { tbl: { head: ['Varietät', 'Merkmal'], rows: [['Standardsprache', 'überregional, Norm (Duden)'], ['Dialekt', 'regional (Bairisch, Plattdeutsch)'], ['Soziolekt', 'Sprache einer Gruppe: Jugendsprache, Fachsprache'], ['Ethnolekt', 'durch Mehrsprachigkeit geprägt, z. B. „Kiezdeutsch“'], ['Idiolekt', 'Sprachgebrauch einer einzelnen Person']] } },
      { p: '<strong>Pseudoanglizismen</strong> klingen englisch, werden im Englischen aber nicht so verwendet: Handy (engl. mobile phone), Beamer (projector), Public Viewing.' },
      { h: 'Kommunikationsmodelle' },
      { ul: ['<strong>Paul Watzlawick:</strong> „Man kann nicht nicht kommunizieren.“ Jede Nachricht hat einen Inhalts- und einen Beziehungsaspekt.', '<strong>Friedemann Schulz von Thun:</strong> Vier Seiten einer Nachricht – Sachinhalt, Selbstoffenbarung, Beziehung, Appell („Vier-Ohren-Modell“).'] },
      { h: 'Sprache und Denken' },
      { p: 'Die <strong>Sapir-Whorf-Hypothese</strong> besagt, dass die Sprache das Denken beeinflusst (sprachliche Relativität). In der starken Form gilt sie heute als widerlegt, in einer schwachen Form wird sie weiter diskutiert.' },
      { note: 'In Erörterungen zum Sprachwandel gibt es keine „richtige“ Meinung. Bewertet wird, ob du Positionen sachlich darstellst und deine eigene begründest.', kind: 'Tipp' },
    ],
    merkzettel: [['Ursachen', 'Kontakt, Technik, Ökonomie, Gesellschaft'], ['Erweiterung', 'Maus'], ['Verengung', 'Hochzeit'], ['Verschlechterung', 'Weib, gemein'], ['Soziolekt', 'Gruppensprache'], ['Watzlawick', 'Man kann nicht nicht kommunizieren'], ['Schulz von Thun', 'Sache, Selbstoffenbarung, Beziehung, Appell']],
    exercises: [
      ch('„Hochzeit“ bedeutete früher „hohes Fest“, heute nur noch „Eheschließung“. Welche Art Bedeutungswandel ist das?', ['Bedeutungserweiterung', 'Bedeutungsverengung', 'Bedeutungsverbesserung', 'Bedeutungsverschlechterung'], 1, 'Die Bedeutung ist enger geworden.'),
      ch('„Gemein“ bedeutete früher „gemeinsam“, heute „niederträchtig“. Welche Art ist das?', ['Bedeutungsverbesserung', 'Bedeutungsverschlechterung', 'Bedeutungsverengung', 'Entlehnung'], 1, 'Das Wort hat eine negative Wertung bekommen.'),
      ch('Wie nennt man die Sprache einer sozialen Gruppe, z. B. Jugendsprache?', ['Dialekt', 'Idiolekt', 'Soziolekt', 'Standardsprache'], 2, 'Soziolekt = gruppenspezifische Sprache.'),
      ch('Welches Wort ist ein Pseudoanglizismus?', ['Computer', 'Handy', 'Software', 'Internet'], 1, 'Im Englischen sagt man „mobile phone“ oder „cell phone“.'),
      ch('Von wem stammt der Satz „Man kann nicht nicht kommunizieren“?', ['Schulz von Thun', 'Watzlawick', 'Sapir', 'Duden'], 1, 'Paul Watzlawick, erstes Axiom seiner Kommunikationstheorie.'),
      txt('Nenne die vier Seiten einer Nachricht nach Schulz von Thun: Sachinhalt, Selbstoffenbarung, Beziehung und …', 'Appell', 'Der Appell ist das, wozu der Sender den Empfänger veranlassen möchte.'),
      ch('Eine Lehrerin sagt: „Das Fenster ist offen.“ Ein Schüler steht auf und schließt es. Auf welche Seite der Nachricht hat er reagiert?', ['Sachinhalt', 'Selbstoffenbarung', 'Beziehung', 'Appell'], 3, 'Er hat die Aufforderung („Schließ das Fenster!“) herausgehört.', EX),
    ],
    exam: 'Sprachreflexion ist im Abitur ein eigener Aufgabentyp: Analyse eines Sachtextes zu Sprache (z. B. Anglizismen, Jugendsprache, gendergerechte Sprache) mit anschließender Erörterung.',
  },
};
