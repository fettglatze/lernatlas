"""Link-Checker für Lernatlas.

Prüft alle festen Links in data/*.js und data/content/*.js (ohne videos.js –
Video-IDs prüft tools/videos/build.py). Suchlinks mit ${...} werden mit einem
Beispielbegriff gefüllt. Aufruf aus dem Projektordner:

    python tools/linkcheck.py            # Bericht auf der Konsole
    python tools/linkcheck.py --md FILE  # zusätzlich als Markdown-Bericht

Gedacht für einen monatlichen Lauf. Exit-Code 1, wenn ein Link kaputt ist.
"""
import concurrent.futures, glob, io, os, re, subprocess, sys, urllib.parse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
UA = 'Mozilla/5.0 (Lernatlas-Linkcheck; +https://github.com/)'
BS = 'https://www.bildungsserver.de/onlineressource.html?onlineressourcen_id='
# Seiten, die Skripte per Bot-Sperre (403) abweisen, im Browser aber laden – zuletzt
# im Browser geprüft im Oktober 2026. Werden als Hinweis statt als Defekt gemeldet.
BOT_BLOCKED = {'learnenglish.britishcouncil.org'}

def collect():
    links = {}
    files = glob.glob(os.path.join(ROOT, 'data', '*.js')) + glob.glob(os.path.join(ROOT, 'data', 'content', '*.js'))
    for f in files:
        if f.endswith('videos.js'):
            continue
        rel = os.path.relpath(f, ROOT).replace(os.sep, '/')
        for n, line in enumerate(io.open(f, encoding='utf-8'), 1):
            for m in re.finditer(r"[`'](https?://[^`'\s]+)[`']", line):
                if m.group(1).startswith(BS):
                    continue  # Definition der BS()-Kurzform, echte IDs folgen unten
                url = re.sub(r'[$][{][^}]*[}]', 'Bruchrechnung', m.group(1))
                links.setdefault(url, []).append(f'{rel}:{n}')
            for m in re.finditer(r'BS[(](\d+)[)]', line):
                links.setdefault(BS + m.group(1), []).append(f'{rel}:{n}')
    return links

def check(url):
    # curl statt urllib: nutzt den Zertifikatsspeicher des Systems wie ein Browser
    # (Pythons eigene CA-Liste scheitert an manchen Behördenservern).
    status, final = 'Fehler', url
    for head in (True, False):
        cmd = ['curl', '-s', '-L', '-o', os.devnull, '-w', '%{http_code} %{url_effective}',
               '-A', UA, '-H', 'Accept-Language: de-DE', '--max-time', '25'] + (['-I'] if head else []) + [url]
        out = subprocess.run(cmd, capture_output=True, text=True).stdout.split(' ', 1)
        code = int(out[0]) if out and out[0].isdigit() else 0
        status, final = (code or 'Verbindungsfehler'), (out[1] if len(out) > 1 else url)
        if code == 200:
            break
    return status, final

def main():
    links = collect()
    with concurrent.futures.ThreadPoolExecutor(8) as ex:
        results = dict(zip(links, ex.map(check, links)))
    bad, moved, blocked = [], [], []
    for url, (status, final) in sorted(results.items()):
        if status == 403 and urllib.parse.urlsplit(url).hostname in BOT_BLOCKED:
            blocked.append((url, links[url]))
        elif status != 200:
            bad.append((url, status, links[url]))
        elif final.rstrip('/') != url.rstrip('/'):
            moved.append((url, final, links[url]))
    lines = [f'# Linkprüfung: {len(links)} Links, {len(bad)} defekt, {len(moved)} umgeleitet', '']
    if bad:
        lines += ['## Defekt', ''] + [f'- `{s}` {u} ({", ".join(w)})' for u, s, w in bad] + ['']
    if blocked:
        lines += ['## Bot-Sperre (im Browser prüfen)', ''] + [f'- {u} ({", ".join(w)})' for u, w in blocked] + ['']
    if moved:
        lines += ['## Umgeleitet', ''] + [f'- {u} → {f} ({", ".join(w)})' for u, f, w in moved] + ['']
    text = '\n'.join(lines)
    sys.stdout.buffer.write(text.encode('utf-8') + b'\n')
    if '--md' in sys.argv:
        io.open(sys.argv[sys.argv.index('--md') + 1], 'w', encoding='utf-8').write(text + '\n')
    sys.exit(1 if bad else 0)

if __name__ == '__main__':
    main()
