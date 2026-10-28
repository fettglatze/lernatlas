// Rendert Lernzettel-Blöcke aus data/content/*.js in HTML.
// Inhalte sind von der Redaktion verfasst (vertrauenswürdig) und dürfen einfaches HTML enthalten.
//
// Block-Typen:
//   { h }            Zwischenüberschrift      { h3 }  kleinere Überschrift
//   { p }            Absatz                   { ul: [] } / { ol: [] }  Listen
//   { f, label }     Formelkasten             { ex: { t, lines: [] } }  Beispiel
//   { tbl: { head, rows } }  Tabelle         { note, kind }  Hinweis (Tipp/Achtung)

export function renderBlocks(blocks) {
  return blocks.map(renderBlock).join('');
}

function renderBlock(b) {
  if (b.h) return `<h2>${b.h}</h2>`;
  if (b.h3) return `<h3>${b.h3}</h3>`;
  if (b.p) return `<p>${b.p}</p>`;
  if (b.ul) return `<ul>${b.ul.map((li) => `<li>${li}</li>`).join('')}</ul>`;
  if (b.ol) return `<ol>${b.ol.map((li) => `<li>${li}</li>`).join('')}</ol>`;
  if (b.f) return `<div class="formula">${b.label ? `<small>${b.label}</small>` : ''}${b.f}</div>`;
  if (b.ex) return `<div class="example"><div class="label">${b.ex.t || 'Beispiel'}</div><div class="example__body">${b.ex.lines.map((l) => `<p>${l}</p>`).join('')}</div></div>`;
  if (b.tbl) return `<table class="tbl"><thead><tr>${b.tbl.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.tbl.rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
  if (b.note) return `<div class="note"><strong>${b.kind || 'Hinweis'}</strong>${b.note}</div>`;
  return '';
}
