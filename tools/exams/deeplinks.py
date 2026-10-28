"""Deep-Links ins Prüfungsarchiv: liest die Download-Listen der Länder, die ihre
Prüfungen frei veröffentlichen, und schreibt data/exam-files.js (je Land,
Abschluss, Fach und Jahr die direkten PDF-Links).

Quellen (alle offiziell, Stand Oktober 2026):
  HB  Senatorin für Kinder und Bildung – Prüfungsunterlagen (Abitur, MSA, BBR)
  ST  Bildungsserver Sachsen-Anhalt – Abiturprüfung (seit 2023)
  BY  ISB – Abiturprüfungen Gymnasium und Abschlussprüfungen Realschule

Aufruf aus dem Projektordner (danach tools/linkcheck.py laufen lassen):

    python tools/exams/deeplinks.py

Wir kopieren keine Aufgaben, sondern verlinken nur auf die Dateien der Länder.
Ändert ein Land seine Seite, findet das Skript weniger Dateien – die Ausgabe
zeigt die Anzahl je Quelle, damit das auffällt.
"""
import html, io, os, re, subprocess, sys, urllib.parse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/130 Safari/537.36'

HB = 'https://www.bildung.bremen.de/prufungsunterlagen-226880'
ST = 'https://www.bildung-lsa.de/informationsportal/unterricht/gymnasium/schulformbezogene_informationen/abiturpruefung.htm'
ISB = 'https://www.isb.bayern.de/schularten/'
ISB_PAGES = [  # (Abschluss, Lernatlas-Fach, Fachname, Pfad)
    ('abi', 'mathe', 'Mathematik', 'gymnasium/leistungserhebungen/abiturpruefung/mathematik/'),
    ('abi', 'physik', 'Physik', 'gymnasium/leistungserhebungen/abiturpruefung/physik/'),
    ('abi', 'informatik', 'Informatik', 'gymnasium/leistungserhebungen/abiturpruefung/informatik/'),
    ('abi', 'kunst', 'Kunst', 'gymnasium/leistungserhebungen/abiturpruefung/kunst/'),
    ('msa', 'mathe', 'Mathematik', 'realschule/leistungserhebungen/abschlusspruefungen/mathematik/'),
    ('msa', 'physik', 'Physik', 'realschule/leistungserhebungen/abschlusspruefungen/physik/'),
    ('msa', 'kunst', 'Kunst', 'realschule/leistungserhebungen/abschlusspruefungen/kunst/'),
    ('msa', 'technik', 'Werken', 'realschule/leistungserhebungen/abschlusspruefungen/werken/'),
    ('msa', 'hauswirtschaft', 'Ernährung und Gesundheit', 'realschule/leistungserhebungen/abschlusspruefungen/ernaehrung-und-gesundheit/'),
]

# Fachnamen der Länder → Lernatlas-Fach (None: Fach gibt es bei Lernatlas nicht,
# es erscheint dann nur im Länderarchiv, nicht auf Themenseiten)
SUBJECT = {
    'biologie': 'biologie', 'chemie': 'chemie', 'deutsch': 'deutsch', 'englisch': 'englisch',
    'französisch': 'franzoesisch', 'franzoesisch': 'franzoesisch', 'franzoesisich': 'franzoesisch',
    'geschichte': 'geschichte', 'mathematik': 'mathe', 'physik': 'physik', 'politik': 'politik',
    'spanisch': 'spanisch', 'tuerkisch': None, 'italienisch': None, 'russisch': None,
    'betriebs- und volkswirtschaftslehre': 'wirtschaft', 'gesundheit': None,
    'informationstechnik': 'informatik', 'ingenieurwissenschaften': 'technik',
}
NAME = {'tuerkisch': 'Türkisch', 'franzoesisch': 'Französisch', 'franzoesisich': 'Französisch'}

def fetch(url):
    out = subprocess.run(['curl', '-s', '-L', '-A', UA, '-H', 'Accept-Language: de-DE', '--max-time', '60', url],
                         capture_output=True).stdout
    try:
        return out.decode('utf-8')
    except UnicodeDecodeError:  # Sachsen-Anhalt meldet UTF-8, liefert aber Windows-1252
        return out.decode('cp1252', errors='replace')

def text(s):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s))).strip()

def links(page, base):
    """(Position, absolute URL, Linktext) für jede PDF auf der Seite."""
    for m in re.finditer(r'<a [^>]*href="([^"]+[.]pdf)"[^>]*>(.*?)</a>', page, re.S | re.I):
        yield m.start(), urllib.parse.urljoin(base, html.unescape(m.group(1))), text(m.group(2))

def fname(url):
    return urllib.parse.unquote(url.rsplit('/', 1)[1])[:-4]

def year_of(*parts):
    for p in parts:
        m = re.search(r'(?<![0-9])(20[0-3][0-9])(?![0-9])', p)
        if m:
            return int(m.group(1))
    return None

SHORT = [(r'erhöhtes Anforderungsniveau', 'eA'), (r'grundlegendes Anforderungsniveau', 'gA'),
         (r'Hauptermin', ''), (r'Abituraufgabe', ''), (r'Haushalt und Ernährung', ''),
         (r'gruppe', 'Gruppe'), (r'Material', 'Material'), (r'mit Astro', 'Astrophysik')]

def short(label):
    for a, b in SHORT:
        label = re.sub(a, b, label)
    return re.sub(r'\s+', ' ', label).strip(' ,') or 'Aufgaben'

def subj(name):
    key = name.lower().split(' (')[0].strip()
    return SUBJECT.get(key, None), NAME.get(key, name.strip())

# ───────── Bremen ─────────
def bremen():
    page = fetch(HB)
    heads = [(m.start(), text(m.group(1))) for m in re.finditer(r'<h2[^>]*>(.*?)</h2>', page, re.S)]
    level_of = lambda h: 'abi' if h.startswith('Abitur') else 'msa' if 'Mittlerer' in h else 'esa'
    rows = []
    for pos, url, _ in links(page, HB):
        head = [h for p, h in heads if p < pos]
        if not head:
            continue
        level, n = level_of(head[-1]), fname(url)
        if 'Lehrerhandreichung' in n or 'Musterklausur' in n:
            continue
        y = year_of(n)
        if y is None:  # zapMat_MSA10_Teil1_12_A → 2012
            m = re.search(r'_(1[0-9])_[AB]$', n)
            y = 2000 + int(m.group(1)) if m else None
        if level == 'abi':
            m = re.match(r'(MAT|[A-Za-zäöü]+)', n)
            name = 'Mathematik' if m.group(1) in ('MAT', 'Mathematik') else m.group(1)
            parts = [k for k in ('GK', 'LK') if re.search(k, n)] + \
                    [k for k in ('CAS', 'GTR', 'WTR', 'TR') if re.search(r'(?<![A-Z])' + k + r'(?![A-Z])', n)][:1] + \
                    [f'Teil {t}' for t in re.findall(r'Teil([12])', n)]
        else:
            low = n.lower()
            name = 'Deutsch' if 'deu' in low else 'Englisch' if 'eng' in low else 'Mathematik'
            parts = (['einfache BBR'] if 'EinfBBR' in n else ['erweiterte BBR'] if level == 'esa' else []) + (['GyO'] if 'GyO' in n else []) + \
                    [f'Teil {t}' for t in re.findall(r'Teil[ _-]?([12])(?![_ -]?Teil)', n)] + \
                    re.findall(r'(?:^|_)([AB])(?:_|$)', n.replace('-', '_'))[-1:]
        sid, nice = subj(name)
        rows.append(('HB', level, sid, nice, y, short(' '.join(dict.fromkeys(parts))), url, HB))
    return rows

# ───────── Sachsen-Anhalt ─────────
def sachsen_anhalt():
    page = fetch(ST)
    # Fächer stehen als aufklappbare <summary> über den Jahrgängen (<h4>)
    heads = [(m.start(), text(m.group(1))) for m in re.finditer(r'<summary[^>]*>(.*?)</summary>', page, re.S)]
    rows = []
    for pos, url, label in links(page, ST):
        head = [h for p, h in heads if p < pos]
        if not head:
            continue
        sid, nice = subj(head[-1])
        n = fname(url)
        niveau = 'eA' if 'eAN' in n else 'gA' if 'gAN' in n else ''
        teil = 'Teil 1' if '_HV' in n or 'Teil1' in n else 'Teil 2/3' if '_S_SM' in n else 'Teil 2' if 'Teil2' in n else ''
        ab = (re.search(r'Aufgaben?_([AB])(?:_|$)', n, re.I) or [None, ''])[1].upper()
        if 'Lizenz' in label or 'Originalbild' in label:
            label = ''
        parts = [p for p in (niveau, teil, ab and f'Aufgabe {ab}') if p] or [label or 'Aufgaben']
        rows.append(('ST', 'abi', sid, nice, year_of(n), short(' '.join(parts)), url, ST))
    return rows

# ───────── Bayern (ISB) ─────────
def isb():
    rows = []
    for level, sid, nice, path in ISB_PAGES:
        base = ISB + path
        page = fetch(base)
        for _, url, label in links(page, base):
            y = year_of(label, fname(url))
            if y is None or 'KMS' in label or 'KMBek' in url:
                continue
            lab = re.sub(r'[(]PDF[^)]*[)]', '', label)
            lab = re.sub(r'Abiturpr\S*|Abschlusspr\S*|Aufgaben|' + re.escape(nice) + r'|20[0-3][0-9]|Hau?pttermin|[:–-]', ' ', lab, flags=re.I)
            lab = re.sub(r'[()]', '', re.sub(r'\s+', ' ', lab)).strip()
            n = fname(url).lower()
            termin = 'Nachtermin' if re.search(r'nachtermin|(?<![a-z])nt(?![a-z])', label.lower() + ' ' + n) else ''
            loes = 'Lösung' if re.search(r'l(ö|oe)sung', label.lower() + n) else ''
            lab = re.sub(r'Nachtermin|Lösung\w*|Lösungsvorschlag|Lösungsmuster', '', lab, flags=re.I).strip(' ,')
            parts = [p for p in (lab, termin, loes) if p]
            rows.append(('BY', level, sid, nice, y, short(' '.join(parts)), url, base))
    return rows

SOURCE = {'HB': 'Bremen – Prüfungsunterlagen', 'ST': 'Bildungsserver Sachsen-Anhalt', 'BY': 'ISB Bayern'}

def emit(rows):
    groups = {}
    for land, level, sid, nice, y, label, url, page in rows:
        if y is None:
            continue
        g = groups.setdefault((land, level, nice), {'subject': sid, 'page': page, 'years': {}})
        files = g['years'].setdefault(y, [])
        if url not in [u for _, u in files]:
            files.append((label, url))
    # „A“ am Ende nur behalten, wenn es im selben Jahr auch eine B-Fassung gibt
    for g in groups.values():
        for y, files in g['years'].items():
            if not any(re.search(r'(^| )B$', l) for l, _ in files):
                g['years'][y] = [(re.sub(r' A$', '', l) if l != 'A' else 'Aufgaben', u) for l, u in files]
    q = lambda s: "'" + s.replace('\\', '\\\\').replace("'", "\\'") + "'"
    out = ['// Generiert von tools/exams/deeplinks.py – nicht von Hand bearbeiten.',
           '// Direkte Links auf die Prüfungsdateien der Länder, je Land, Abschluss, Fach und Jahr.',
           '// subject: Lernatlas-Fach (null = Fach gibt es hier nicht, nur im Länderarchiv sichtbar).',
           '', 'export const EXAM_FILES = [']
    for (land, level, nice), g in sorted(groups.items(), key=lambda kv: (kv[0][0], ['esa', 'msa', 'abi'].index(kv[0][1]), kv[0][2])):
        out.append(f"  {{ land: '{land}', level: '{level}', subject: {q(g['subject']) if g['subject'] else 'null'}, name: {q(nice)}, "
                   f"source: {q(SOURCE[land])}, page: {q(g['page'])},")
        out.append('    years: [')
        for y in sorted(g['years'], reverse=True):
            out.append(f"      [{y}, [{', '.join(f'[{q(l)}, {q(u)}]' for l, u in g['years'][y])}]],")
        out.append('    ] },')
    out.append('];')
    io.open(os.path.join(ROOT, 'data', 'exam-files.js'), 'w', encoding='utf-8', newline='\n').write('\n'.join(out) + '\n')
    return groups

def main():
    rows = []
    for name, fn in (('Bremen', bremen), ('Sachsen-Anhalt', sachsen_anhalt), ('ISB Bayern', isb)):
        r = fn()
        print(f'{name}: {len(r)} Dateien, {sum(1 for x in r if x[4] is None)} ohne Jahr (ausgelassen)')
        rows += r
    groups = emit(rows)
    print(f'data/exam-files.js: {len(groups)} Fächer/Abschlüsse, {sum(len(f) for g in groups.values() for f in g["years"].values())} Dateien')
    if '--list' in sys.argv:
        for (land, level, nice), g in sorted(groups.items()):
            ys = sorted(g['years'])
            print(f'  {land} {level} {nice:28} {g["subject"] or "-":14} {ys[0]}–{ys[-1]}  ' +
                  ' | '.join(l for l, _ in g['years'][ys[-1]]))

if __name__ == '__main__':
    main()
