// Angaben für Impressum und Datenschutzerklärung.
// Vor dem Livegang ausfüllen: Solange ein Feld null ist, zeigen beide Seiten
// einen gut sichtbaren Hinweis „Noch nicht vollständig“.
// Die Texte sind eine Vorlage nach dem Stand der Seite, keine Rechtsberatung.

export const OPERATOR = {
  name: null,          // Vor- und Nachname (bei Vereinen: Name und Rechtsform)
  street: null,        // Straße und Hausnummer – ladungsfähig, kein Postfach
  city: null,          // PLZ und Ort
  email: null,
  phone: null,         // freiwillig; § 5 DDG verlangt einen schnellen elektronischen Kontakt
  responsible: null,   // Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV (Name, Anschrift), falls abweichend
};

// Hosting-Anbieter, sobald festgelegt (siehe ROADMAP „Vor dem Livegang“).
export const HOSTER = {
  name: null,          // z. B. Firma, Anschrift
  privacyUrl: null,    // Datenschutzhinweise des Anbieters
  dpa: false,          // Auftragsverarbeitungsvertrag (Art. 28 DSGVO) abgeschlossen?
};

export const LEGAL_STAND = '29.10.2026';

export const LAW = {
  ddg5: 'https://www.gesetze-im-internet.de/ddg/__5.html',
  tdddg25: 'https://www.gesetze-im-internet.de/ttdsg/__25.html',
  dsgvo: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32016R0679',
  googlePrivacy: 'https://policies.google.com/privacy?hl=de',
  dpf: 'https://www.dataprivacyframework.gov/list',
  authorities: 'https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html',
};

export const missingLegal = () => [
  ...Object.entries({ name: 'Name', street: 'Anschrift', city: 'PLZ und Ort', email: 'E-Mail' })
    .filter(([k]) => !OPERATOR[k]).map(([, label]) => label),
  ...(!HOSTER.name ? ['Hosting-Anbieter'] : []),
];
