"""Schreibt die Liste aller eigenen Dateien und eine Versionskennung in sw.js.

Nach jeder Änderung an Inhalten, Skripten oder Styles ausführen:
    python tools/pwa/build_sw.py
Die Version ist ein Hash über alle Dateien. Ändert sich etwas, installiert der Browser den
Service Worker neu und legt einen frischen Cache an.
"""
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PATTERNS = ['index.html', 'manifest.webmanifest', 'assets/**/*.css', 'assets/**/*.js', 'assets/**/*.png',
            'assets/**/*.woff2', 'data/**/*.js']

files = sorted({p for pat in PATTERNS for p in ROOT.glob(pat) if p.is_file()})
digest = hashlib.sha256()
for p in files:
    digest.update(p.relative_to(ROOT).as_posix().encode())
    digest.update(p.read_bytes())
version = digest.hexdigest()[:12]
names = ['./'] + [p.relative_to(ROOT).as_posix() for p in files]

sw = ROOT / 'sw.js'
block = (f"// PRECACHE-START – erzeugt von tools/pwa/build_sw.py, nicht von Hand ändern\n"
         f"const VERSION = '{version}';\n"
         f"const FILES = {json.dumps(names, ensure_ascii=False, indent=2)};\n"
         f"// PRECACHE-END")
text = sw.read_text(encoding='utf-8')
text, n = re.subn(r'// PRECACHE-START.*?// PRECACHE-END', lambda _: block, text, flags=re.S)
assert n == 1, 'Markierungen PRECACHE-START/END in sw.js nicht gefunden'
sw.write_text(text, encoding='utf-8')
print(f'sw.js: {len(names)} Dateien, Version {version}')
