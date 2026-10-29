// Aufgaben der Typen Zuordnen, Lückentext, Reihenfolge und Graph ablesen.
// Werden in index.js hinten an die bestehenden Übungen des Themas gehängt.
import { num, nums, match, cloze, order, plot } from './_helpers.js';

export default {
  'mathe--lineare-funktionen': [
    num('Der Graph zeigt eine lineare Funktion. Lies die <strong>Steigung m</strong> ab.', 2,
      'Vom Punkt (0 | 1) aus geht es 1 nach rechts und 2 nach oben bis (1 | 3). Also m = 2 – die Funktion heißt f(x) = 2x + 1.',
      { graph: { x: [-3, 4, 1], y: [-3, 8, 1], xLabel: 'x', yLabel: 'y', series: [{ points: [[-3, -5], [4, 9]] }], alt: 'Gerade durch die Punkte (0|1) und (1|3)' } }),
    num('Lies die <strong>Nullstelle</strong> der dargestellten Geraden ab.', 6,
      'Die Gerade schneidet die x-Achse bei x = 6. Ihre Gleichung ist f(x) = −0,5x + 3.',
      { graph: { x: [-2, 8, 1], y: [-2, 5, 1], xLabel: 'x', yLabel: 'y', series: [{ points: [[-2, 4], [8, -1]] }], alt: 'Fallende Gerade durch (0|3) und (6|0)' } }),
    match('Ordne jeder Funktionsgleichung die passende Beschreibung ihres Graphen zu.', [
      ['f(x) = 2x + 1', 'steigt und schneidet die y-Achse bei 1'],
      ['f(x) = −x + 4', 'fällt und schneidet die y-Achse bei 4'],
      ['f(x) = 3', 'verläuft parallel zur x-Achse'],
      ['f(x) = 0,5x', 'steigt und geht durch den Ursprung'],
    ], 'Das Vorzeichen von m entscheidet über steigend oder fallend, b ist der y-Achsenabschnitt. Ist m = 0, verläuft die Gerade waagerecht.'),
  ],

  'mathe--quadratische-funktionen': [
    nums('Lies den <strong>Scheitelpunkt</strong> der Parabel ab.', [2, -1],
      'Der tiefste Punkt liegt bei S(2 | −1). Die Funktion lautet in Scheitelpunktform f(x) = (x − 2)² − 1.',
      { ordered: true, labels: ['x', 'y'], graph: { x: [-1, 5, 1], y: [-2, 8, 1], xLabel: 'x', yLabel: 'y', series: [{ points: plot((x) => (x - 2) ** 2 - 1, -1, 5, 0.1) }], alt: 'Nach oben geöffnete Parabel mit Scheitel bei (2|−1)' } }),
  ],

  'mathe--diagramme': [
    num('Das Liniendiagramm zeigt den Temperaturverlauf an einem Sommertag (Beispieldaten). Um wie viel Uhr war es am wärmsten?', 14,
      'Der höchste Punkt der Kurve liegt bei 14 Uhr mit 27 °C.',
      { unit: 'Uhr', graph: { x: [6, 22, 2], y: [10, 30, 5], xLabel: 'Uhrzeit', yLabel: '°C', series: [{ dots: true, points: [[6, 14], [8, 17], [10, 21], [12, 25], [14, 27], [16, 26], [18, 23], [20, 19], [22, 16]] }], alt: 'Temperaturkurve von 6 bis 22 Uhr mit Höchstwert 27 °C um 14 Uhr' } }),
    num('Wie viel Grad wärmer war es um 12 Uhr als um 8 Uhr? (gleiches Diagramm)', 8,
      'Um 12 Uhr zeigt das Diagramm 25 °C, um 8 Uhr 17 °C. Der Unterschied beträgt 25 − 17 = 8 °C.',
      { unit: '°C', graph: { x: [6, 22, 2], y: [10, 30, 5], xLabel: 'Uhrzeit', yLabel: '°C', series: [{ dots: true, points: [[6, 14], [8, 17], [10, 21], [12, 25], [14, 27], [16, 26], [18, 23], [20, 19], [22, 16]] }], alt: 'Temperaturkurve von 6 bis 22 Uhr' } }),
  ],

  'physik--geschwindigkeit': [
    num('Das Weg-Zeit-Diagramm zeigt die Fahrt eines Radfahrers mit konstanter Geschwindigkeit. Bestimme die Geschwindigkeit.', 5,
      'In 10 s legt er 50 m zurück: v = s : t = 50 m : 10 s = 5 m/s.',
      { unit: 'm/s', graph: { x: [0, 12, 2], y: [0, 60, 10], xLabel: 't in s', yLabel: 's in m', series: [{ points: [[0, 0], [12, 60]] }], alt: 'Ursprungsgerade durch (10 s | 50 m)' } }),
  ],

  'deutsch--das-dass': [
    cloze('Setze <em>das</em>, <em>Das</em> oder <em>dass</em> ein. Achte am Satzanfang auf die Großschreibung.',
      'Ich hoffe, [[dass]] du morgen kommst. Das Buch, [[das]] ich gerade lese, ist spannend. Er sagt, [[dass]] [[das]] Wetter schön wird. [[Das]] habe ich nicht gewusst.',
      'Ersatzprobe: Lässt sich das Wort durch <em>dieses, jenes</em> oder <em>welches</em> ersetzen, schreibt man <em>das</em>. Sonst ist es die Konjunktion <em>dass</em>.',
      { caseSensitive: true }),
  ],

  'deutsch--epochen': [
    order('Bringe die Literaturepochen in die zeitliche Reihenfolge – die älteste nach oben.',
      ['Barock', 'Aufklärung', 'Sturm und Drang', 'Klassik', 'Romantik', 'Naturalismus', 'Expressionismus'],
      'Barock (17. Jh.) → Aufklärung (18. Jh.) → Sturm und Drang (ca. 1765–1785) → Klassik → Romantik (um 1800) → Naturalismus (ca. 1880–1900) → Expressionismus (ca. 1910–1925).'),
  ],

  'deutsch--stilmittel': [
    match('Ordne jedem Beispiel das passende Stilmittel zu.', [
      ['„Milch macht müde Männer munter.“', 'Alliteration'],
      ['„Ich kam, ich sah, ich siegte.“', 'Anapher'],
      ['„Die Sonne lacht.“', 'Personifikation'],
      ['„Er ist stark wie ein Bär.“', 'Vergleich'],
      ['„Das Leben ist eine Achterbahn.“', 'Metapher'],
    ], 'Der Vergleich nutzt „wie“ oder „als“, die Metapher setzt das Bild direkt ein. Die Anapher wiederholt den Satzanfang, die Alliteration den Anlaut.'),
  ],

  'englisch--if-clauses': [
    cloze('Complete the conditional sentences with the correct verb form.',
      'If it rains tomorrow, we [[will stay|\'ll stay]] at home. If I [[had]] more time, I would learn Spanish. If she had studied harder, she [[would have passed|\'d have passed]] the test.',
      'Type I: if + simple present → will. Type II: if + simple past → would + infinitive. Type III: if + past perfect → would have + past participle.'),
  ],

  'geschichte--weimarer-republik': [
    order('Bringe die Ereignisse in die richtige zeitliche Reihenfolge – das früheste nach oben.',
      ['Ausrufung der Republik', 'Die Weimarer Verfassung tritt in Kraft', 'Hitlerputsch in München', 'Beginn der Weltwirtschaftskrise mit dem New Yorker Börsenkrach', 'Hitler wird Reichskanzler'],
      'November 1918 → August 1919 → November 1923 → Oktober 1929 → 30. Januar 1933.'),
  ],

  'biologie--zelle': [
    match('Ordne jedem Zellbestandteil seine Aufgabe zu.', [
      ['Zellkern', 'enthält die Erbinformation (DNA)'],
      ['Mitochondrium', 'Zellatmung – stellt Energie bereit'],
      ['Chloroplast', 'Fotosynthese (nur in Pflanzenzellen)'],
      ['Zellmembran', 'grenzt die Zelle ab und regelt den Stoffaustausch'],
      ['Ribosom', 'baut Proteine auf'],
    ], 'Chloroplasten, Zellwand und große Vakuole gibt es nur in Pflanzenzellen. Zellkern, Mitochondrien, Membran und Ribosomen haben Tier- und Pflanzenzellen.'),
  ],
};
