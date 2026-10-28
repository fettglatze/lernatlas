// Ausgearbeitete Themen: Spanisch
import { ch, txt, num, EX } from './_helpers.js';

const F = { placeholder: 'Verbform eingeben' };

export default {
  'spanisch--ser-estar': {
    summary: 'Spanisch hat zwei Verben für „sein“: ser und estar. Ser beschreibt, was etwas ist, estar, wie oder wo etwas ist – diese Unterscheidung gehört zu den wichtigsten Grundlagen.',
    goals: ['ser und estar konjugieren', 'Die Verwendung von ser erklären', 'Die Verwendung von estar erklären', 'Bedeutungsunterschiede erkennen'],
    lernzettel: [
      { h: 'Konjugation (Präsens)' },
      { tbl: { head: ['', 'ser', 'estar'], rows: [['yo', 'soy', 'estoy'], ['tú', 'eres', 'estás'], ['él / ella / usted', 'es', 'está'], ['nosotros/as', 'somos', 'estamos'], ['vosotros/as', 'sois', 'estáis'], ['ellos / ellas / ustedes', 'son', 'están']] } },
      { h: 'Wann ser, wann estar?' },
      { tbl: { head: ['ser', 'estar'], rows: [['Identität, Name: Soy Ana.', 'Ort, Lage: Madrid está en España.'], ['Herkunft, Nationalität: Es de México.', 'Zustand, Befinden: Estoy cansado.'], ['Beruf: Es profesora.', 'vorübergehende Eigenschaft: La sopa está fría.'], ['Charakter, dauerhafte Eigenschaft: Es simpático.', 'Verlaufsform: Estoy comiendo.'], ['Uhrzeit, Datum: Son las tres.', '']] } },
      { note: 'Manche Adjektive ändern ihre Bedeutung: <em>ser listo</em> = klug sein, <em>estar listo</em> = fertig sein; <em>ser aburrido</em> = langweilig sein, <em>estar aburrido</em> = sich langweilen.', kind: 'Achtung' },
      { p: 'Für das Vorhandensein („es gibt“) verwendet man <strong>hay</strong>: <em>Hay un parque cerca.</em> Für bestimmte Dinge an einem Ort dagegen estar: <em>El parque está cerca.</em>' },
    ],
    merkzettel: [['ser', 'Identität, Herkunft, Charakter, Uhrzeit'], ['estar', 'Ort, Zustand, Befinden'], ['soy / estoy', 'ich bin'], ['son las tres', 'Uhrzeit mit ser'], ['estar + Gerundio', 'Verlaufsform'], ['hay', 'es gibt']],
    exercises: [
      txt('Ergänze ser oder estar: Yo ___ de Alemania.', ['soy'], 'Herkunft → ser.', F),
      txt('Ergänze: Hoy María ___ enferma.', ['está'], 'Zustand → estar.', F),
      txt('Ergänze: Nosotros ___ en la playa.', ['estamos'], 'Ort → estar.', F),
      txt('Ergänze: ___ las cinco y media.', ['Son', 'son'], 'Uhrzeit → ser (Plural bei ab 2 Uhr).', F),
      ch('Was bedeutet „Pablo está aburrido“?', ['Pablo ist ein langweiliger Mensch.', 'Pablo langweilt sich (gerade).', 'Pablo ist klug.', 'Pablo ist fertig.'], 1, 'estar aburrido = sich langweilen.'),
      ch('Welcher Satz ist korrekt?', ['Mi hermano está médico.', 'Mi hermano es médico.', 'Mi hermano es en Madrid.', 'Mi hermano soy médico.'], 1, 'Beruf → ser.', EX),
    ],
    exam: 'Lückentexte mit ser, estar und hay gehören zu den häufigsten Grammatikaufgaben im Spanischunterricht.',
  },

  'spanisch--preterito-indefinido': {
    summary: 'Mit dem pretérito indefinido erzählt man abgeschlossene Handlungen in der Vergangenheit, oft mit Zeitangaben wie ayer oder el año pasado.',
    goals: ['Das indefinido regelmäßiger Verben bilden', 'Wichtige unregelmäßige Formen kennen', 'Signalwörter erkennen', 'Vergangene Ereignisse erzählen'],
    lernzettel: [
      { h: 'Regelmäßige Verben' },
      { tbl: { head: ['', 'hablar', 'comer', 'vivir'], rows: [['yo', 'hablé', 'comí', 'viví'], ['tú', 'hablaste', 'comiste', 'viviste'], ['él/ella', 'habló', 'comió', 'vivió'], ['nosotros', 'hablamos', 'comimos', 'vivimos'], ['vosotros', 'hablasteis', 'comisteis', 'vivisteis'], ['ellos/ellas', 'hablaron', 'comieron', 'vivieron']] } },
      { note: 'Akzente beachten: <em>hablé</em> (ich sprach) – <em>hablo</em> (ich spreche) – <em>habló</em> (er sprach).', kind: 'Achtung' },
      { h: 'Wichtige unregelmäßige Verben' },
      { tbl: { head: ['Verb', 'yo', 'él/ella', 'ellos'], rows: [['ser / ir', 'fui', 'fue', 'fueron'], ['tener', 'tuve', 'tuvo', 'tuvieron'], ['estar', 'estuve', 'estuvo', 'estuvieron'], ['hacer', 'hice', 'hizo', 'hicieron'], ['poder', 'pude', 'pudo', 'pudieron'], ['decir', 'dije', 'dijo', 'dijeron']] } },
      { p: 'ser und ir haben im indefinido dieselben Formen – der Zusammenhang entscheidet: <em>Fui a Madrid</em> (Ich fuhr nach Madrid) – <em>Fue un día bonito</em> (Es war ein schöner Tag).' },
      { h: 'Signalwörter' },
      { p: '<em>ayer, anteayer, el lunes pasado, la semana pasada, el año pasado, hace dos años, en 2019, de repente</em>' },
    ],
    merkzettel: [['-ar', '-é, -aste, -ó, -amos, -asteis, -aron'], ['-er/-ir', '-í, -iste, -ió, -imos, -isteis, -ieron'], ['ser/ir', 'fui, fue …'], ['hacer', 'hice, hizo'], ['tener', 'tuve'], ['Signal', 'ayer, el año pasado']],
    exercises: [
      txt('Indefinido: Ayer yo ___ (hablar) con mi abuela.', ['hablé'], 'yo hablé – mit Akzent.', F),
      txt('Indefinido: El año pasado nosotros ___ (vivir) en Sevilla.', ['vivimos'], 'Gleich wie im Präsens – der Kontext entscheidet.', F),
      txt('Indefinido: ¿Qué ___ (hacer) tú el fin de semana?', ['hiciste'], 'hacer → hiciste.', F),
      txt('Indefinido: Ellos ___ (ir) al cine.', ['fueron'], 'ir → fueron.', F),
      ch('Was bedeutet „Fue un viaje fantástico“?', ['Ich ging auf eine Reise.', 'Es war eine fantastische Reise.', 'Er wird reisen.', 'Wir reisen.'], 1, 'fue von ser.'),
      txt('Indefinido: Mi hermano ___ (tener) un accidente.', ['tuvo'], 'tener → tuvo (ohne Akzent).', { ...F, ...EX }),
    ],
    exam: 'Das indefinido wird beim Erzählen geprüft (z. B. „Escribe sobre tus últimas vacaciones“).',
  },

  'spanisch--preterito-imperfecto': {
    summary: 'Das imperfecto beschreibt, wie etwas früher war: Gewohnheiten, Zustände und Hintergründe. Zusammen mit dem indefinido entsteht eine lebendige Erzählung.',
    goals: ['Das imperfecto bilden', 'Die drei unregelmäßigen Verben kennen', 'imperfecto und indefinido unterscheiden', 'Signalwörter zuordnen'],
    lernzettel: [
      { h: 'Bildung' },
      { tbl: { head: ['', 'hablar', 'comer / vivir'], rows: [['yo', 'hablaba', 'comía / vivía'], ['tú', 'hablabas', 'comías'], ['él/ella', 'hablaba', 'comía'], ['nosotros', 'hablábamos', 'comíamos'], ['vosotros', 'hablabais', 'comíais'], ['ellos', 'hablaban', 'comían']] } },
      { h: 'Nur drei unregelmäßige Verben' },
      { p: '<strong>ser:</strong> era, eras, era, éramos, erais, eran · <strong>ir:</strong> iba, ibas, iba, íbamos, ibais, iban · <strong>ver:</strong> veía, veías, veía …' },
      { h: 'imperfecto oder indefinido?' },
      { tbl: { head: ['imperfecto', 'indefinido'], rows: [['Gewohnheit: De niño, jugaba al fútbol cada día.', 'einmalige Handlung: Un día marqué tres goles.'], ['Beschreibung: Hacía sol y la casa era grande.', 'Abfolge: Llegué, comí y me fui.'], ['laufende Handlung (Hintergrund): Leía …', '… cuando sonó el teléfono. (neue Handlung)']] } },
      { p: 'Signalwörter imperfecto: <em>siempre, normalmente, a menudo, cada día, de niño, antes</em>. Indefinido: <em>ayer, un día, de repente, el año pasado</em>.' },
    ],
    merkzettel: [['-ar', '-aba, -abas, -aba …'], ['-er/-ir', '-ía, -ías, -ía …'], ['ser', 'era'], ['ir', 'iba'], ['imperfecto', 'Gewohnheit, Beschreibung'], ['indefinido', 'einmalig, abgeschlossen']],
    exercises: [
      txt('Imperfecto: De pequeño, yo ___ (jugar) en el parque.', ['jugaba'], '-ar → -aba.', F),
      txt('Imperfecto: Nosotros ___ (vivir) en un pueblo.', ['vivíamos'], '-ir → -íamos.', F),
      txt('Imperfecto von ser: La casa ___ muy bonita.', ['era'], 'ser → era.', F),
      ch('„Leía un libro cuando mi madre ___.“', ['llamaba', 'llamó'], 1, 'Neue Handlung unterbricht → indefinido.'),
      ch('„Antes siempre ___ en autobús al colegio.“', ['iba', 'fui'], 0, 'Gewohnheit (siempre, antes) → imperfecto.'),
      ch('Warum steht in „Hacía calor y los niños jugaban“ das imperfecto?', ['weil es eine Abfolge von Handlungen ist', 'weil Umstände und Hintergrund beschrieben werden', 'weil die Handlung plötzlich ist', 'weil es Zukunft ist'], 1, 'Beschreibung → imperfecto.', EX),
    ],
    exam: 'Typisch sind Lückentexte, in denen zwischen indefinido und imperfecto gewählt werden muss.',
  },

  'spanisch--subjuntivo': {
    summary: 'Der subjuntivo drückt Wünsche, Gefühle, Zweifel und Aufforderungen aus. Er steht meist nach que – und im Spanischen kommt er sehr häufig vor.',
    goals: ['Den presente de subjuntivo bilden', 'Unregelmäßige Formen kennen', 'Auslöser des subjuntivo erkennen', 'Wünsche und Meinungen ausdrücken'],
    lernzettel: [
      { h: 'Bildung' },
      { p: 'Ausgangspunkt ist die yo-Form im Präsens ohne -o: <em>hablo → habl-, tengo → teng-</em>. Dann der „Vokaltausch“: -ar-Verben bekommen -e-Endungen, -er/-ir-Verben -a-Endungen.' },
      { tbl: { head: ['', 'hablar', 'comer', 'tener'], rows: [['yo', 'hable', 'coma', 'tenga'], ['tú', 'hables', 'comas', 'tengas'], ['él/ella', 'hable', 'coma', 'tenga'], ['nosotros', 'hablemos', 'comamos', 'tengamos'], ['vosotros', 'habléis', 'comáis', 'tengáis'], ['ellos', 'hablen', 'coman', 'tengan']] } },
      { h: 'Unregelmäßig' },
      { p: '<strong>ser:</strong> sea · <strong>ir:</strong> vaya · <strong>estar:</strong> esté · <strong>saber:</strong> sepa · <strong>haber:</strong> haya · <strong>dar:</strong> dé' },
      { h: 'Auslöser' },
      { ul: ['Wunsch, Wille: <em>quiero que, espero que, ojalá</em>', 'Gefühl: <em>me alegra que, me molesta que, tengo miedo de que</em>', 'Aufforderung: <em>te pido que, es necesario que</em>', 'Zweifel, verneinte Meinung: <em>dudo que, no creo que</em>', 'Konjunktionen: <em>para que, cuando</em> (bei Zukunft)'] },
      { note: '<em>Creo que</em> steht mit dem Indikativ, <em>no creo que</em> mit dem subjuntivo: Creo que viene. – No creo que venga.', kind: 'Achtung' },
    ],
    merkzettel: [['Stamm', 'yo-Form ohne -o'], ['-ar', '→ -e'], ['-er/-ir', '→ -a'], ['ser', 'sea'], ['ir', 'vaya'], ['ojalá', '+ subjuntivo']],
    exercises: [
      txt('Quiero que tú ___ (hablar) con él.', ['hables'], '-ar → -es.', F),
      txt('Espero que vosotros ___ (tener) suerte.', ['tengáis'], 'tengo → teng- + -áis.', F),
      txt('Ojalá ___ (hacer) buen tiempo mañana.', ['haga'], 'hago → haga.', F),
      txt('Es importante que ___ (ser) puntuales. (nosotros)', ['seamos'], 'ser → seamos.', F),
      ch('Nach welchem Ausdruck steht der Indikativ?', ['espero que', 'no creo que', 'creo que', 'ojalá'], 2, 'Bejahte Meinung → Indikativ.'),
      ch('Welcher Satz ist korrekt?', ['Dudo que él viene.', 'Dudo que él venga.', 'Creo que él venga.', 'Quiero que tú vienes.'], 1, 'dudar que + subjuntivo.', EX),
    ],
    exam: 'Der subjuntivo wird ab Klasse 10 geprüft, oft in Meinungsäußerungen und Briefen (Espero que …, Es necesario que …).',
  },

  'spanisch--latinoamerica': {
    summary: 'In fast allen Ländern Mittel- und Südamerikas wird Spanisch gesprochen. Lateinamerika ist geprägt von indigenen Kulturen, der Kolonialzeit und großen sozialen Gegensätzen.',
    goals: ['Spanischsprachige Länder Lateinamerikas nennen', 'Die Kolonialgeschichte in Grundzügen darstellen', 'Indigene Kulturen kennen', 'Aktuelle Herausforderungen beschreiben'],
    lernzettel: [
      { h: 'Spanisch in Amerika' },
      { p: 'Spanisch ist Amtssprache in 18 Ländern Lateinamerikas, darunter Mexiko, Kolumbien, Argentinien, Peru, Venezuela und Chile. In Brasilien wird dagegen Portugiesisch gesprochen. Die meisten Spanischsprachigen der Welt leben in Lateinamerika – das Land mit den meisten ist Mexiko.' },
      { h: 'Geschichte' },
      { tbl: { head: ['Zeit', 'Ereignis'], rows: [['vor 1492', 'Hochkulturen der Azteken (Mexiko), Maya (Mittelamerika) und Inka (Andenraum)'], ['1492', 'Kolumbus erreicht im Auftrag Spaniens Amerika'], ['1519–1521', 'Hernán Cortés erobert das Aztekenreich'], ['1532–1533', 'Francisco Pizarro erobert das Inkareich'], ['16.–19. Jh.', 'Kolonialzeit: Ausbeutung, Zwangsarbeit, Epidemien, Sklavenhandel'], ['um 1810–1825', 'Unabhängigkeitskriege (Simón Bolívar, José de San Martín)']] } },
      { h: 'Gesellschaft heute' },
      { ul: ['Vielfalt: indigene, europäische, afrikanische und gemischte Wurzeln', 'Indigene Sprachen wie Quechua, Guaraní oder Nahuatl werden bis heute gesprochen.', 'Herausforderungen: Ungleichheit, Armut, Gewalt durch Drogenkartelle, Migration, Abholzung des Amazonas, politische Krisen'] },
      { note: 'Wortschatzunterschiede: In vielen Ländern Lateinamerikas sagt man <em>ustedes</em> statt <em>vosotros</em>, in Argentinien <em>vos</em> statt <em>tú</em>. Das Handy heißt in Spanien <em>móvil</em>, in Lateinamerika meist <em>celular</em>.', kind: 'Hinweis' },
    ],
    merkzettel: [['1492', 'Kolumbus erreicht Amerika'], ['Azteken', 'Mexiko'], ['Inka', 'Andenraum'], ['Simón Bolívar', 'Unabhängigkeit'], ['Brasilien', 'Portugiesisch'], ['ustedes', 'statt vosotros']],
    exercises: [
      ch('Welche Sprache wird in Brasilien gesprochen?', ['Spanisch', 'Portugiesisch', 'Französisch', 'Englisch'], 1, 'Brasilien war portugiesische Kolonie.'),
      ch('Welches Volk hatte sein Reich im Andenraum?', ['die Azteken', 'die Maya', 'die Inka', 'die Wikinger'], 2, 'Hauptstadt Cusco, berühmt: Machu Picchu.'),
      num('In welchem Jahr erreichte Kolumbus Amerika?', 1492, 'Im Auftrag der spanischen Krone.', { placeholder: 'Jahreszahl' }),
      ch('Welches Land hat die meisten Spanischsprachigen der Welt?', ['Spanien', 'Argentinien', 'Mexiko', 'Kolumbien'], 2, 'Mexiko hat weit über 120 Millionen Einwohner.'),
      ch('Was sagt man in weiten Teilen Lateinamerikas statt „vosotros“?', ['nosotros', 'ustedes', 'ellos', 'vos'], 1, 'ustedes für „ihr“.'),
      ch('Welche Folge der Kolonialzeit ist richtig?', ['Die indigenen Kulturen blieben unberührt.', 'Viele Indigene starben durch Gewalt, Zwangsarbeit und eingeschleppte Krankheiten; Spanisch und Christentum wurden durchgesetzt.', 'Lateinamerika wurde reich.', 'Es gab keine Sklaverei.'], 1, 'Die Folgen prägen Gesellschaften bis heute.', EX),
    ],
    exam: 'Lateinamerika ist ein häufiges Abiturthema – mit Texten zu Migration, Indigenen, Umwelt oder Diktaturen.',
  },

  'spanisch--espana': {
    summary: 'Spanien ist ein vielfältiges Land mit Regionen, eigenen Sprachen und einer bewegten Geschichte – von der Diktatur Francos bis zur modernen Demokratie in der EU.',
    goals: ['Regionen und Sprachen Spaniens nennen', 'Die Franco-Diktatur und den Übergang zur Demokratie einordnen', 'Aktuelle Themen Spaniens kennen', 'Landeskundlichen Wortschatz anwenden'],
    lernzettel: [
      { h: 'Land und Regionen' },
      { p: 'Hauptstadt ist <strong>Madrid</strong>, weitere große Städte sind Barcelona, Valencia und Sevilla. Spanien besteht aus 17 autonomen Gemeinschaften (<em>comunidades autónomas</em>), z. B. Andalucía, Cataluña, País Vasco, Galicia.' },
      { h: 'Sprachen' },
      { tbl: { head: ['Sprache', 'Region'], rows: [['Castellano (Spanisch)', 'Amtssprache im ganzen Land'], ['Català (Katalanisch)', 'Katalonien, Valencia, Balearen'], ['Euskera (Baskisch)', 'Baskenland, Teile Navarras'], ['Galego (Galicisch)', 'Galicien']] } },
      { h: 'Geschichte im 20. Jahrhundert' },
      { tbl: { head: ['Jahr', 'Ereignis'], rows: [['1936–1939', 'Spanischer Bürgerkrieg'], ['1939–1975', 'Diktatur von Francisco Franco'], ['1975', 'Tod Francos, Juan Carlos I. wird König'], ['1978', 'demokratische Verfassung (Transición)'], ['1986', 'EG-Beitritt (heute EU)']] } },
      { h: 'Aktuelle Themen' },
      { p: 'Unabhängigkeitsbestrebungen in Katalonien, hohe Jugendarbeitslosigkeit, Tourismus und Overtourism, Wassermangel und Hitze durch den Klimawandel, Migration über das Mittelmeer.' },
    ],
    merkzettel: [['Madrid', 'Hauptstadt'], ['comunidades autónomas', '17'], ['Català, Euskera, Galego', 'weitere Sprachen'], ['Franco', 'Diktatur 1939–1975'], ['1978', 'Verfassung'], ['1986', 'EG-Beitritt']],
    exercises: [
      txt('Wie heißt die Hauptstadt Spaniens?', ['Madrid'], 'Madrid liegt in der Mitte des Landes.'),
      num('Aus wie vielen autonomen Gemeinschaften besteht Spanien?', 17, 'Dazu kommen die autonomen Städte Ceuta und Melilla.'),
      ch('Welche Sprache wird im Baskenland gesprochen?', ['Català', 'Euskera', 'Galego', 'Portugués'], 1, 'Euskera ist mit keiner anderen bekannten Sprache verwandt.'),
      ch('Wer regierte Spanien von 1939 bis 1975 als Diktator?', ['Juan Carlos I.', 'Francisco Franco', 'Felipe VI.', 'Simón Bolívar'], 1, 'Nach dem Bürgerkrieg.'),
      num('In welchem Jahr erhielt Spanien seine demokratische Verfassung?', 1978, 'Abschluss der Transición.', { placeholder: 'Jahreszahl' }),
      ch('Was versteht man unter der „Transición“?', ['den Bürgerkrieg', 'den friedlichen Übergang von der Franco-Diktatur zur Demokratie nach 1975', 'die Eroberung Amerikas', 'den EU-Austritt'], 1, 'Oft als Vorbild für friedliche Demokratisierung gesehen.', EX),
    ],
    exam: 'Landeskunde zu Spanien wird über Lese- und Hörtexte geprüft, in der Oberstufe auch mit Themen wie Katalonien oder historischer Erinnerung.',
  },
};
