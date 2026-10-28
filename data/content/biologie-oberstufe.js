// Ausgearbeitete Themen: Biologie (Oberstufe)
import { ch, num, txt, EX, ex } from './_helpers.js';

const U = (unit, more = {}) => ({ unit, ...more });

export default {
  'biologie--neurobiologie': {
    summary: 'Nervenzellen übertragen Informationen elektrisch und chemisch. Ruhepotenzial, Aktionspotenzial und Synapse erklären, wie ein Reiz zum Signal wird – und wie Gifte und Drogen eingreifen.',
    goals: ['Den Bau einer Nervenzelle beschreiben', 'Ruhe- und Aktionspotenzial erklären', 'Die Erregungsleitung vergleichen', 'Die Vorgänge an einer chemischen Synapse darstellen'],
    lernzettel: [
      { h: 'Bau der Nervenzelle' },
      { p: 'Dendriten nehmen Signale auf, der Zellkörper verrechnet sie, am <strong>Axonhügel</strong> entsteht das Aktionspotenzial, das Axon leitet es weiter bis zu den Endknöpfchen (Synapsen). Viele Axone sind von einer <strong>Myelinscheide</strong> umhüllt, die an den Ranvier’schen Schnürringen unterbrochen ist.' },
      { h: 'Ruhepotenzial (ca. −70 mV)' },
      { ul: ['Innen viele K⁺ und organische Anionen, außen viele Na⁺ und Cl⁻', 'Die Membran ist in Ruhe vor allem für K⁺ durchlässig: K⁺ strömt aus, bis elektrische Anziehung und Konzentrationsgefälle im Gleichgewicht sind.', 'Die <strong>Natrium-Kalium-Pumpe</strong> hält die Gradienten aufrecht: 3 Na⁺ hinaus, 2 K⁺ hinein, unter ATP-Verbrauch.'] },
      { h: 'Aktionspotenzial' },
      { ol: ['Reiz überschreitet den Schwellenwert (ca. −50 mV)', '<strong>Depolarisation:</strong> spannungsgesteuerte Na⁺-Kanäle öffnen, Na⁺ strömt ein (bis ca. +30 mV)', '<strong>Repolarisation:</strong> Na⁺-Kanäle schließen, K⁺-Kanäle öffnen, K⁺ strömt aus', '<strong>Hyperpolarisation</strong> und Refraktärzeit, dann wieder Ruhepotenzial'] },
      { note: '<strong>Alles-oder-Nichts-Prinzip:</strong> Ein Aktionspotenzial entsteht vollständig oder gar nicht. Die Reizstärke wird über die <strong>Frequenz</strong> der Aktionspotenziale codiert.', kind: 'Merke' },
      { h: 'Erregungsleitung' },
      { p: '<strong>kontinuierlich</strong> (marklose Axone, langsam) oder <strong>saltatorisch</strong> von Schnürring zu Schnürring (myelinisierte Axone, bis über 100 m/s).' },
      { h: 'Chemische Synapse' },
      { ol: ['AP erreicht das Endknöpfchen, Ca²⁺ strömt ein', 'Vesikel schütten den Transmitter (z. B. Acetylcholin) in den synaptischen Spalt', 'Transmitter bindet an Rezeptoren der Folgezelle, Na⁺-Kanäle öffnen → EPSP', 'Enzym (Acetylcholinesterase) spaltet den Transmitter, das Signal endet'] },
    ],
    merkzettel: [['Ruhepotenzial', 'ca. −70 mV'], ['Na⁺/K⁺-Pumpe', '3 Na⁺ raus, 2 K⁺ rein'], ['Depolarisation', 'Na⁺ strömt ein'], ['Alles oder nichts', 'Reizstärke = Frequenz'], ['saltatorisch', 'von Schnürring zu Schnürring'], ['Synapse', 'Ca²⁺, Transmitter, Rezeptor']],
    exercises: [
      num('Welchen Wert hat das Ruhepotenzial einer typischen Nervenzelle ungefähr?', -70, 'Innen negativ gegenüber außen.', U('mV')),
      num('Wie viele Na⁺-Ionen transportiert die Natrium-Kalium-Pumpe pro Zyklus nach außen?', 3, 'Und 2 K⁺ nach innen.'),
      ch('Welche Ionen strömen bei der Depolarisation in die Zelle?', ['K⁺', 'Na⁺', 'Cl⁻', 'Ca²⁺'], 1, 'Spannungsgesteuerte Na⁺-Kanäle öffnen sich.'),
      ch('Wie codiert eine Nervenzelle einen stärkeren Reiz?', ['durch höhere Aktionspotenziale', 'durch eine höhere Frequenz der Aktionspotenziale', 'durch längere Axone', 'gar nicht'], 1, 'Alles-oder-Nichts-Prinzip.'),
      txt('Wie heißt die schnelle Erregungsleitung in myelinisierten Axonen?', ['saltatorisch', 'saltatorische Erregungsleitung'], 'Von Schnürring zu Schnürring.'),
      ch('Das Pfeilgift Curare blockiert die Acetylcholin-Rezeptoren an der motorischen Endplatte. Welche Folge hat das?', ['Dauerkontraktion der Muskeln', 'Lähmung, weil der Muskel keine Erregung erhält', 'schnellere Reizleitung', 'keine Folge'], 1, 'Der Transmitter kann nicht mehr binden; die Atemmuskulatur fällt aus.', EX),
    ],
    exam: 'Typisch: Potenzialverläufe aus Messkurven deuten und Wirkungen von Giften, Medikamenten oder Drogen an der Synapse erklären.',
  },

  'biologie--stoffwechsel': {
    summary: 'Enzyme beschleunigen fast alle Reaktionen im Körper, die Zellatmung gewinnt aus Glucose die Energieform ATP. Enzymkinetik und Hemmung erklären, wie Zellen ihren Stoffwechsel steuern.',
    goals: ['Bau und Wirkungsweise von Enzymen erklären', 'Einflüsse von Temperatur und pH-Wert beschreiben', 'Kompetitive und nicht-kompetitive Hemmung unterscheiden', 'Die Teilschritte der Zellatmung zuordnen'],
    lernzettel: [
      { h: 'Enzyme' },
      { p: 'Enzyme sind Proteine, die als <strong>Biokatalysatoren</strong> die Aktivierungsenergie senken. Das Substrat bindet am <strong>aktiven Zentrum</strong> (Schlüssel-Schloss-Prinzip, genauer: induzierte Passform). Enzyme sind <strong>substrat- und wirkungsspezifisch</strong>.' },
      { ul: ['Temperatur: Aktivität steigt bis zum Optimum (beim Menschen ca. 37 °C), danach Denaturierung', 'pH-Wert: jedes Enzym hat ein pH-Optimum (Pepsin im Magen ca. pH 2, Amylase im Mund ca. pH 7)'] },
      { h: 'Enzymkinetik' },
      { p: 'Mit steigender Substratkonzentration nähert sich die Reaktionsgeschwindigkeit einem Maximum v<sub>max</sub> (Sättigung). Die <strong>Michaelis-Konstante K<sub>M</sub></strong> ist die Substratkonzentration bei ½ v<sub>max</sub>; ein kleines K<sub>M</sub> bedeutet hohe Affinität.' },
      { tbl: { head: ['Hemmung', 'Mechanismus', 'v_max', 'K_M'], rows: [['kompetitiv', 'Hemmstoff konkurriert ums aktive Zentrum', 'unverändert', 'steigt'], ['nicht-kompetitiv (allosterisch)', 'Hemmstoff bindet anderswo, verändert das Enzym', 'sinkt', 'unverändert']] } },
      { h: 'Zellatmung' },
      { f: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O', label: 'Bruttogleichung, ΔG < 0' },
      { tbl: { head: ['Schritt', 'Ort'], rows: [['Glykolyse', 'Cytoplasma'], ['oxidative Decarboxylierung und Citratzyklus', 'Mitochondrienmatrix'], ['Atmungskette', 'innere Mitochondrienmembran (liefert den Großteil des ATP)']] } },
      { note: 'Ohne Sauerstoff bleibt nur die Glykolyse mit anschließender Gärung (Milchsäure im Muskel, Alkohol bei Hefe) – mit viel geringerer ATP-Ausbeute.', kind: 'Hinweis' },
    ],
    merkzettel: [['Enzym', 'Biokatalysator, senkt EA'], ['aktives Zentrum', 'Substratbindung'], ['Optimum', 'Temperatur, pH'], ['KM', 'Substratkonz. bei ½ vmax'], ['kompetitiv', 'KM ↑, vmax gleich'], ['Atmungskette', 'innere Mitochondrienmembran']],
    exercises: [
      ch('Wie beschleunigen Enzyme Reaktionen?', ['Sie liefern Energie.', 'Sie senken die Aktivierungsenergie.', 'Sie erhöhen die Temperatur.', 'Sie werden verbraucht.'], 1, 'Wie jeder Katalysator.'),
      ch('Was passiert mit einem menschlichen Enzym bei 60 °C?', ['Es wird schneller.', 'Es denaturiert und verliert seine Funktion.', 'Nichts.', 'Es teilt sich.'], 1, 'Die Raumstruktur des aktiven Zentrums wird zerstört.'),
      ch('Wie wirkt sich ein kompetitiver Hemmstoff auf v_max aus?', ['v_max sinkt.', 'v_max bleibt gleich, wird aber erst bei höherer Substratkonzentration erreicht.', 'v_max steigt.', 'Die Reaktion stoppt immer.'], 1, 'Viel Substrat verdrängt den Hemmstoff.'),
      num('Wie viele O₂-Moleküle werden bei der Zellatmung pro Glucosemolekül verbraucht?', 6, 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O'),
      ch('Wo findet die Glykolyse statt?', ['in der Mitochondrienmatrix', 'im Cytoplasma', 'an der inneren Mitochondrienmembran', 'im Zellkern'], 1, 'Sie braucht keinen Sauerstoff.'),
      ch('Ein Enzym erreicht v_max = 10 µmol/min. Bei 2 mmol/L Substrat beträgt die Geschwindigkeit 5 µmol/min. Was folgt daraus?', ['K_M = 2 mmol/L', 'K_M = 5 mmol/L', 'K_M = 10 mmol/L', 'Das Enzym ist gehemmt.'], 0, 'Bei ½ v_max entspricht die Substratkonzentration K_M.', EX),
    ],
    exam: 'Typisch: Diagramme zur Enzymaktivität (Temperatur, pH, Substratkonzentration, Hemmung) auswerten und Zellatmung mit Gärung vergleichen.',
  },
};
