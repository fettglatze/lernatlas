"""Packt die ganze Seite in eine einzelne HTML-Datei: dist/lernatlas.html.

Die Datei lässt sich per Doppelklick öffnen, ohne Server. ES-Module laden
über file:// nicht, deshalb werden alle Module hier zu einem Skript
zusammengefasst und Schriften als data:-URLs eingebettet. Fortschritt wird
wie gewohnt im localStorage gespeichert; Offline-Modus (Service Worker)
gibt es in dieser Fassung nicht.

Aufruf: python tools/bundle/build_html.py
"""
import base64
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'dist' / 'lernatlas.html'

IMPORT = re.compile(r"^import\s+(?:\{([^}]*)\}|(\w+))\s+from\s+'([^']+)';?[ \t]*$", re.M)
EXPORT_DECL = re.compile(r'^export\s+(const|function)\s+(\w+)', re.M)


def key(path):
    return path.relative_to(ROOT).as_posix()


def transform(path):
    """Ein Modul als Funktion, die ihre Exporte zurückgibt."""
    src = path.read_text(encoding='utf-8')
    deps = []

    def imp(m):
        names, default, spec = m.groups()
        dep = (path.parent / spec).resolve()
        deps.append(dep)
        if default:
            return f"const {default} = __m[{json.dumps(key(dep))}].default;"
        binds = ', '.join(n.strip().replace(' as ', ': ') for n in names.split(',') if n.strip())
        return f"const {{ {binds} }} = __m[{json.dumps(key(dep))}];"

    src = IMPORT.sub(imp, src)
    names = [n for _, n in EXPORT_DECL.findall(src)]
    src = EXPORT_DECL.sub(lambda m: f'{m.group(1)} {m.group(2)}', src)
    has_default = bool(re.search(r'^export default ', src, re.M))
    src = re.sub(r'^export default ', 'const __default = ', src, flags=re.M)
    leftover = re.findall(r'^\s*(?:import|export)\s.*$', src, re.M)
    if leftover:
        raise SystemExit(f'{key(path)}: unbekannte Form {leftover[0]!r}')
    ret = ', '.join(names + (['default: __default'] if has_default else []))
    body = f"__m[{json.dumps(key(path))}] = (() => {{\n{src}\nreturn {{ {ret} }};\n}})();\n"
    return body, deps


def bundle(entry):
    done, order = set(), []

    def visit(p, stack=()):
        if p in done:
            return
        if p in stack:
            raise SystemExit('Zirkulärer Import: ' + ' → '.join(key(x) for x in (*stack, p)))
        body, deps = transform(p)
        for d in deps:
            visit(d, (*stack, p))
        done.add(p)
        order.append(body)

    visit(entry)
    return '"use strict";\nconst __m = {};\n' + ''.join(order), len(order)


def inline_fonts(css):
    def rep(m):
        f = ROOT / 'assets' / 'css' / m.group(1)
        return "url('data:font/woff2;base64," + base64.b64encode(f.read_bytes()).decode() + "')"
    return re.sub(r"url\('(\.\./fonts/[^']+)'\)", rep, css)


def main():
    html = (ROOT / 'index.html').read_text(encoding='utf-8')
    js, n = bundle(ROOT / 'assets' / 'js' / 'app.js')
    css = inline_fonts((ROOT / 'assets/css/fonts.css').read_text(encoding='utf-8')) + '\n' + (ROOT / 'assets/css/main.css').read_text(encoding='utf-8')

    # Was über file:// nicht geht oder nicht gebraucht wird, fliegt raus.
    html = re.sub(r'\s*<link rel="(manifest|apple-touch-icon|preload)"[^>]*>', '', html)
    html = re.sub(r'\s*<!-- Schriften liegen lokal[^>]*-->', '', html)
    html = html.replace('  <link rel="stylesheet" href="assets/css/fonts.css">\n', '')
    html = html.replace('<link rel="stylesheet" href="assets/css/main.css">', f'<style>\n{css}</style>')
    # Kein Service Worker: sw.js liegt nicht neben der Datei, und über file:// geht er ohnehin nicht.
    sw = "if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {"
    assert sw in js, 'SW-Registrierung in app.js nicht gefunden'
    js = js.replace(sw, 'if (false) {')
    js = js.replace('</script', '<\\/script')
    html = html.replace('<script type="module" src="assets/js/app.js"></script>', f'<script type="module">\n{js}</script>')
    assert '<style>' in html and '__m = {}' in html, 'index.html hat sich geändert – Platzhalter nicht gefunden'

    OUT.parent.mkdir(exist_ok=True)
    OUT.write_text(html, encoding='utf-8')
    print(f'{OUT.relative_to(ROOT)}: {n} Module, {OUT.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
