// Eigene Übungssätze im Prüfungsstil – für Prüfungen, deren Originale nicht frei
// zugänglich sind (NRW: Login über die Schule, Hamburg: nur Beispiele) oder als
// Ergänzung. Alle Aufgaben und Texte sind selbst verfasst, keine Originalaufgaben.
// Aufbau und Hilfsmittel folgen der jeweiligen Prüfungsseite (exam-pages.js).
//
// for: Prüfungsseiten, auf denen der Satz erscheint
// parts: [{ title, note, passage?, exercises?, task? }]
//   passage – eigener Lesetext (HTML), steht vor den Aufgaben des Teils
//   task    – offener Schreibauftrag { q, checklist[] }, ohne automatische Prüfung

import { fr, ch, num, nums, txt } from './content/_helpers.js';

export const PRACTICE = [
  // ───────── Mathematik: Basisaufgaben ohne Taschenrechner ─────────
  { id: 'zp10-mathe-teil1', for: ['nw-zp10-mathe'], title: 'Übungssatz: Prüfungsteil I',
    lead: 'Zehn voneinander unabhängige Basisaufgaben auf MSA-Niveau. Stell dir 30 Minuten auf die Uhr und arbeite nur mit Zirkel und Geodreieck.',
    parts: [{ title: 'Teil I – ohne Taschenrechner und Formelsammlung', note: 'Richtzeit 30 Minuten', exercises: [
      num(`Berechne ${fr(3, 4)} + ${fr(2, 5)}. Gib das Ergebnis als Dezimalzahl an.`, 1.15, `Hauptnenner 20: ${fr(15, 20)} + ${fr(8, 20)} = ${fr(23, 20)} = 1,15.`),
      num('Wie viel sind 15 % von 240 €?', 36, '10 % sind 24 €, 5 % sind 12 €, zusammen 36 €.', { unit: '€' }),
      num('Löse die Gleichung 3x − 7 = 2x + 5.', 12, 'Auf beiden Seiten 2x abziehen: x − 7 = 5, also x = 12.'),
      num('Ein rechtwinkliges Dreieck hat die Katheten 6 cm und 8 cm. Wie lang ist die Hypotenuse?', 10, 'c² = 6² + 8² = 36 + 64 = 100, also c = 10 cm.', { unit: 'cm' }),
      num('Eine Gerade verläuft durch die Punkte P(0 | 2) und Q(3 | 8). Bestimme ihre Steigung m.', 2, 'm = (8 − 2) : (3 − 0) = 6 : 3 = 2.'),
      ch('Ein fairer Würfel wird einmal geworfen. Wie groß ist die Wahrscheinlichkeit für eine Augenzahl größer als 4?', [fr(1, 6), fr(1, 3), fr(1, 2), fr(2, 3)], 1, `Günstig sind 5 und 6, also 2 von 6 Ergebnissen: ${fr(2, 6)} = ${fr(1, 3)}.`),
      num('Schreibe 2,5 · 10³ als Dezimalzahl.', 2500, 'Mal 10³ heißt: Komma drei Stellen nach rechts – 2500.'),
      num('Bestimme den Median der Werte 3, 7, 4, 9, 7.', 7, 'Geordnet: 3, 4, 7, 7, 9. Der mittlere Wert ist 7.'),
      num('Ein Pullover kostet 80 €. Er wird um 25 % reduziert. Was kostet er jetzt?', 60, '25 % von 80 € sind 20 €; 80 € − 20 € = 60 €.', { unit: '€' }),
      nums('Löse die Gleichung x² = 49.', [7, -7], 'Zwei Lösungen, weil 7² = 49 und (−7)² = 49.'),
    ] }] },

  // ───────── Mathematik Hamburg MSA: hilfsmittelfrei + Pflichtaufgabe Körper ─────────
  { id: 'hh-msa-mathe', for: ['hh-esa-msa-mathe'], title: 'Übungssatz: MSA Aufgabe I und II',
    lead: 'Erst kurze Auswahlaufgaben ohne Hilfsmittel, dann eine Pflichtaufgabe zu Körpern, Pythagoras und Trigonometrie mit Taschenrechner – wie in der Hamburger MSA-Prüfung aufgebaut.',
    parts: [
      { title: 'Aufgabe I – ohne Taschenrechner und Formelsammlung', note: 'Richtwert in der Prüfung: 45 Minuten für Aufgabe I', exercises: [
        ch('Welcher Term ist gleichwertig zu 2(x + 3)?', ['2x + 3', '2x + 6', 'x + 6', '2x + 5'], 1, 'Ausmultiplizieren: 2 · x + 2 · 3 = 2x + 6.'),
        ch('Welche Zahl ist am größten?', ['0,7', fr(3, 4), '70 %', '0,69'], 1, `${fr(3, 4)} = 0,75; die anderen sind 0,7 bzw. 0,69.`),
        ch('Wie viele Liter passen in 1 m³?', ['10', '100', '1000', '10 000'], 2, '1 m³ = 1000 dm³ und 1 dm³ = 1 Liter.'),
        ch('Welche Aussage über die Funktion f(x) = −2x + 4 stimmt?', ['Der Graph steigt.', 'Der Graph schneidet die y-Achse bei 4.', 'Die Nullstelle ist x = 4.', 'Die Steigung ist 4.'], 1, 'f(0) = 4, also y-Achsenabschnitt 4. Die Steigung ist −2 (fallend), die Nullstelle x = 2.'),
      ] },
      { title: 'Aufgabe II – Wasserturm (mit Taschenrechner)', note: 'Formelsammlung erlaubt. Runde auf zwei Nachkommastellen.',
        passage: '<p>Ein Wasserturm hat einen zylinderförmigen Tank mit dem Radius r = 4 m und der Höhe h = 6 m. Obendrauf sitzt ein kegelförmiges Dach mit demselben Radius und einer Höhe von 3 m.</p>',
        exercises: [
          num('Berechne das Volumen des Tanks.', 301.59, 'V = π · r² · h = π · 16 · 6 = 96π ≈ 301,59 m³.', { unit: 'm³', tol: 0.05 }),
          num('Berechne die Länge der Mantellinie s des Kegeldachs.', 5, 'Pythagoras mit Radius und Höhe: s² = 4² + 3² = 25, also s = 5 m.', { unit: 'm' }),
          num('Das Dach wird neu gedeckt. Berechne die Mantelfläche des Kegels.', 62.83, 'M = π · r · s = π · 4 · 5 = 20π ≈ 62,83 m².', { unit: 'm²', tol: 0.05 }),
          num('Für die Wartung lehnt eine 7 m lange Leiter am Turm. Ihr Fuß steht 2 m vom Turm entfernt. Welchen Winkel bildet die Leiter mit dem Boden?', 73.4, 'cos α = 2 : 7, also α ≈ 73,40°.', { unit: '°', tol: 0.05 }),
          num('Vom Turm aus werden zwei Punkte A und B angepeilt. Im Dreieck ABT gilt a = 8 m, α = 50° und β = 60°. Berechne die Seite b mit dem Sinussatz.', 9.04, 'b = a · sin β : sin α = 8 · sin 60° : sin 50° ≈ 9,04 m.', { unit: 'm', tol: 0.01 }),
        ] },
    ] },

  // ───────── Mathematik Bayern Abitur: Teil A ─────────
  { id: 'by-abi-mathe-teil-a', for: ['by-abi-mathe'], title: 'Übungssatz: Prüfungsteil A',
    lead: 'Aufgaben im Stil des hilfsmittelfreien Teils: vier Pflichtaufgaben (zweimal Analysis, Stochastik, Geometrie) und eine Wahlaufgabe mit höherem Anspruch. Ohne Taschenrechner und Merkhilfe.',
    parts: [
      { title: 'Pflichtteil – Analysis', exercises: [
        num('Gegeben ist f(x) = x³ − 3x. Berechne f′(2).', 9, 'f′(x) = 3x² − 3, also f′(2) = 12 − 3 = 9.'),
        nums('Bestimme die Stellen, an denen f(x) = x³ − 3x eine waagrechte Tangente hat.', [1, -1], 'f′(x) = 3x² − 3 = 0 ⇔ x² = 1 ⇔ x = 1 oder x = −1.'),
        num('Berechne das Integral von 0 bis 2 über (2x + 1) dx.', 6, 'Stammfunktion x² + x; (4 + 2) − 0 = 6.'),
        num('Gegeben ist g(x) = 2 · e<sup>x − 1</sup>. Berechne g′(1).', 2, 'g′(x) = 2 · e<sup>x − 1</sup> (Kettenregel, innere Ableitung 1), also g′(1) = 2 · e⁰ = 2.'),
      ] },
      { title: 'Pflichtteil – Stochastik', exercises: [
        num('In einer Urne liegen 3 rote und 2 blaue Kugeln. Es werden zwei Kugeln ohne Zurücklegen gezogen. Berechne die Wahrscheinlichkeit, dass beide rot sind.', 0.3, `${fr(3, 5)} · ${fr(2, 4)} = ${fr(6, 20)} = 0,3.`),
        num('Eine Münze wird dreimal geworfen. Wie groß ist die Wahrscheinlichkeit, dass nie „Zahl“ fällt?', 0.125, `(${fr(1, 2)})³ = ${fr(1, 8)} = 0,125.`),
      ] },
      { title: 'Pflichtteil – Geometrie', exercises: [
        num('Berechne den Abstand der Punkte A(1 | 2 | 3) und B(3 | 0 | 4).', 3, 'AB = (2, −2, 1); Länge √(4 + 4 + 1) = √9 = 3.'),
        ch('Welche Lage haben die Vektoren u = (1, 2, 2) und v = (2, −1, 0) zueinander?', ['parallel', 'orthogonal', 'gleich lang', 'weder noch'], 1, 'Skalarprodukt 1 · 2 + 2 · (−1) + 2 · 0 = 0, also stehen sie senkrecht aufeinander.'),
      ] },
      { title: 'Wahlaufgabe – Anforderungsbereich III', exercises: [
        nums('Für welche Werte von a ist die Gerade y = a · x eine Tangente an den Graphen von f(x) = x² + 1?', [2, -2], 'Gleichsetzen: x² − ax + 1 = 0. Genau ein Berührpunkt, wenn die Diskriminante a² − 4 = 0 ist, also a = 2 oder a = −2.', { labels: ['a₁', 'a₂'] }),
      ] },
    ] },

  // ───────── Deutsch: Leseverstehen, Sprachwissen, Schreiben ─────────
  { id: 'deutsch-sachtext', for: ['nw-zp10-deutsch', 'hh-esa-msa-deutsch'], title: 'Übungssatz: Sachtext „Handyfreie Pause“',
    lead: 'Ein eigener Sachtext mit Aufgaben zu Leseverstehen und Sprachwissen und einem Schreibauftrag – aufgebaut wie die Prüfungsteile, aber kürzer.',
    parts: [
      { title: 'Leseverstehen', note: 'Lies den Text zuerst ganz.',
        passage: `<h4>Handyfreie Pause – ein Versuch an der Gesamtschule Lindenhof</h4>
<p>Seit Beginn des Schuljahres bleiben die Smartphones an der Gesamtschule Lindenhof in den großen Pausen in der Tasche. Die Schulkonferenz hatte die Regel zunächst für ein halbes Jahr beschlossen. Danach sollte eine Umfrage zeigen, ob sie beibehalten wird.</p>
<p>An der Umfrage beteiligten sich 412 Schülerinnen und Schüler. 58 Prozent gaben an, dass sie in den Pausen mehr mit anderen reden als vorher. Gleichzeitig wünschte sich fast die Hälfte, das Handy wenigstens in der Mittagspause nutzen zu dürfen, etwa um Nachrichten der Eltern zu lesen.</p>
<p>Schulleiterin Petra Marx zieht eine vorsichtige Bilanz: „Auf dem Schulhof ist es lauter geworden – im guten Sinn. Dass die Regel allen gefällt, behaupten wir aber nicht.“ Die Schülervertretung schlägt deshalb einen Kompromiss vor: Die großen Pausen bleiben handyfrei, in der Mittagspause gibt es eine Ecke, in der Smartphones erlaubt sind.</p>`,
        exercises: [
          ch('Wie lange galt die Regel zunächst?', ['ein Schuljahr', 'ein halbes Jahr', 'drei Monate', 'unbegrenzt'], 1, 'Absatz 1: „zunächst für ein halbes Jahr beschlossen“.'),
          ch('Was gaben 58 Prozent der Befragten an?', ['Sie vermissen ihr Handy sehr.', 'Sie reden in den Pausen mehr mit anderen.', 'Sie wollen die Regel abschaffen.', 'Sie nutzen das Handy heimlich.'], 1, 'Absatz 2, erster Satz nach der Teilnehmerzahl.'),
          ch('Wie bewertet die Schulleiterin den Versuch?', ['begeistert und ohne Einschränkung', 'vorsichtig positiv', 'eindeutig negativ', 'gar nicht'], 1, 'Sie sieht eine positive Wirkung, betont aber, dass die Regel nicht allen gefällt.'),
          ch('Welche Absicht verfolgt der Text vor allem?', ['unterhalten', 'informieren', 'zum Kauf auffordern', 'eine Geschichte erzählen'], 1, 'Ein Sachtext, der über Regel, Umfrage und Vorschläge berichtet.'),
        ] },
      { title: 'Sprachwissen', exercises: [
        txt('Setze ein: „Die Schulleiterin sagt, ___ die Regel nicht allen gefällt.“ (das oder dass)', 'dass', 'Konjunktion, die einen Nebensatz einleitet; „dies“ oder „welches“ passt nicht – also „dass“.'),
        ch('Welcher Satz ist richtig gesetzt?', ['Die Pause, die handyfrei ist gefällt vielen.', 'Die Pause die handyfrei ist, gefällt vielen.', 'Die Pause, die handyfrei ist, gefällt vielen.', 'Die Pause die, handyfrei ist gefällt vielen.'], 2, 'Ein eingeschobener Relativsatz wird vorne und hinten durch Komma abgetrennt.'),
        ch('Welche Wortart ist „vorsichtig“ in „Sie zieht eine vorsichtige Bilanz“?', ['Nomen', 'Verb', 'Adjektiv', 'Adverb'], 2, '„vorsichtige“ beschreibt das Nomen „Bilanz“ näher und wird dekliniert – ein Adjektiv.'),
        txt('Wandle ins Präteritum um: „Die Schülervertretung schlägt einen Kompromiss vor.“ Schreibe den ganzen Satz.', ['Die Schülervertretung schlug einen Kompromiss vor'], 'Präteritum von „vorschlagen“: schlug … vor.'),
      ] },
      { title: 'Schreiben', task: {
        q: 'Soll die Regel an deiner Schule eingeführt werden? Schreibe für die Schülerzeitung eine begründete Stellungnahme (ca. 250 Wörter). Nutze dazu auch Informationen aus dem Text.',
        checklist: ['Einleitung mit Anlass und deiner Position', 'mindestens zwei Argumente mit Begründung und Beispiel', 'ein Gegenargument aufgreifen und entkräften', 'Informationen aus dem Text sinnvoll einbauen (z. B. Umfrage, Kompromiss)', 'Schluss mit Fazit oder Appell', 'Rechtschreibung mit dem Wörterbuch prüfen'] } },
    ] },

  // ───────── Englisch: Reading, Vocabulary, Writing ─────────
  { id: 'englisch-reading', for: ['nw-zp10-englisch'], title: 'Übungssatz: Reading „The rooftop garden“',
    lead: 'Ein eigener Lesetext mit Aufgaben zu Leseverstehen und Wortschatz und einem Schreibauftrag. Wie in der Prüfung ohne Wörterbuch.',
    parts: [
      { title: 'Reading comprehension', note: 'Read the text first.',
        passage: `<h4>The rooftop garden</h4>
<p>When the students of Riverside Secondary School looked at the flat roof above their canteen, they saw grey gravel and a few pigeons. Today they see tomatoes, beans and three beehives. The idea came from Maya, 15, who had read about a rooftop farm in New York. "At first the teachers laughed," she remembers. "Then they asked how much it would cost."</p>
<p>The answer was less than expected. A local builder checked that the roof was strong enough and gave the wooden boxes for free. Parents donated soil and seeds. Since last spring, a team of twenty students has looked after the garden twice a week.</p>
<p>The vegetables go straight to the school kitchen. "Our salad has never been fresher," says the cook, Mr Hughes. The honey is sold at the summer fair, and the money pays for new plants. Not everything has worked, though: in July the team lost half of the strawberries to a heatwave. "Now we know we need a better watering system," Maya says.</p>`,
        exercises: [
          ch('What was on the roof before the garden?', ['solar panels', 'grey gravel and some pigeons', 'a playground', 'old furniture'], 1, 'Paragraph 1: "grey gravel and a few pigeons".'),
          ch('Where did Maya get the idea?', ['from a TV programme', 'from her teacher', 'from reading about a rooftop farm in New York', 'from a trip to London'], 2, 'Paragraph 1: she "had read about a rooftop farm in New York".'),
          ch('Who gave the wooden boxes?', ['the parents', 'a local builder', 'the school kitchen', 'the city council'], 1, 'Paragraph 2: the builder "gave the wooden boxes for free".'),
          ch('What happens to the money from the honey?', ['It goes to a charity.', 'It pays for new plants.', 'The students keep it.', 'It pays the cook.'], 1, 'Paragraph 3: "the money pays for new plants".'),
          ch('What went wrong in July?', ['The bees flew away.', 'The roof was damaged.', 'A heatwave destroyed half of the strawberries.', 'Nobody looked after the garden.'], 2, 'Paragraph 3: they "lost half of the strawberries to a heatwave".'),
        ] },
      { title: 'Vocabulary', exercises: [
        txt('Find a word in paragraph 2 that means "gave something without asking for money".', ['donated'], '"Parents donated soil and seeds."'),
        txt('Find the opposite of "weaker" in paragraph 2.', ['stronger', 'strong'], '"strong enough" – the opposite of "weaker" is "stronger".'),
        txt('Complete with the correct form of the verb: "Since last spring, the team ___ (look) after the garden."', ['has looked', "has been looking"], 'With "since" + point in time we use the present perfect.'),
      ] },
      { title: 'Writing', task: {
        q: 'Your school wants to start a project like the rooftop garden. Write an email to your head teacher (about 150 words): suggest a project, explain why it is a good idea and say how students could help.',
        checklist: ['suitable greeting and ending (Dear …, Best wishes / Yours sincerely)', 'clear suggestion in the first lines', 'at least two reasons', 'how students could help', 'linking words (first, also, because, however)', 'check tenses and spelling – no dictionary in the exam'] } },
    ] },
];
