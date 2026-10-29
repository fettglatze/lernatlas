"""Lädt die Schriften einmalig von Google Fonts und legt sie lokal ab.

Erzeugt assets/fonts/*.woff2 und assets/css/fonts.css. Die Seite selbst
fragt danach nie mehr bei Google an (DSGVO, LG München 20.01.2022).
Behalten werden nur die Zeichensätze latin und latin-ext; alles andere
fällt per unicode-range auf Systemschriften zurück.

Aufruf: python tools/fonts/fetch_fonts.py
Danach: python tools/pwa/build_sw.py
"""
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FONTS = ROOT / 'assets' / 'fonts'
CSS = ROOT / 'assets' / 'css' / 'fonts.css'
URL = ('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400'
       '&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap')
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
KEEP = ('latin', 'latin-ext')


def curl(url, out=None):
    # curl statt urllib: Pythons CA-Speicher scheitert hier an manchen Zertifikaten.
    args = ['curl', '-sSfL', '-A', UA, url]
    if out:
        args += ['-o', str(out)]
    return subprocess.run(args, check=True, capture_output=True, text=out is None).stdout


def slug(family):
    return family.lower().replace(' ', '-')


def main():
    css = curl(URL)
    blocks = re.findall(r'/\* ([\w-]+) \*/\s*@font-face \{(.*?)\}', css, re.S)
    faces = {}
    for subset, body in blocks:
        if subset not in KEEP:
            continue
        prop = dict(re.findall(r'\s*([\w-]+):\s*([^;]+);', body))
        family = prop['font-family'].strip("'")
        src = re.search(r'url\(([^)]+)\)', prop['src']).group(1)
        key = (family, prop['font-style'], subset, src, prop['unicode-range'])
        faces.setdefault(key, []).append(int(prop['font-weight']))

    FONTS.mkdir(parents=True, exist_ok=True)
    for old in FONTS.glob('*.woff2'):
        old.unlink()
    out = ['/* Generiert von tools/fonts/fetch_fonts.py – nicht von Hand ändern.',
           '   Lizenz aller Schriften: SIL Open Font License 1.1, Texte in assets/fonts/OFL-*.txt */', '']
    for (family, style, subset, src, unicode_range), weights in faces.items():
        # Ein Link für mehrere Stärken heißt: variable Schrift, also Bereich angeben.
        lo, hi = min(weights), max(weights)
        name = f"{slug(family)}-{style}-{lo if lo == hi else f'{lo}-{hi}'}-{subset}.woff2"
        curl(src, FONTS / name)
        out += ['@font-face {',
                f"  font-family: '{family}';",
                f'  font-style: {style};',
                f"  font-weight: {lo if lo == hi else f'{lo} {hi}'};",
                '  font-display: swap;',
                f"  src: url('../fonts/{name}') format('woff2');",
                f'  unicode-range: {unicode_range};',
                '}']
        print(f'{name}: {(FONTS / name).stat().st_size // 1024} KB')
    CSS.write_text('\n'.join(out) + '\n', encoding='utf-8')
    print(f'{CSS.relative_to(ROOT)}: {len(faces)} Schnitte')


if __name__ == '__main__':
    main()
